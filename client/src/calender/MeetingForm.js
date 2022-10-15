import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { SeatingSpace, rooms } from "./config";
import { dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import { getDay, parse } from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import MyCalendar from "./MyCalendar";
import eventsList from "./events";
import moment from "moment";
import { nanoid } from "nanoid";
import EventModal from "./EventModal";
import axiosConfig from "../axiosConfig/axiosConfig";

const MeetingForm = () => {
  const [booking, setBooking] = useState({
    title: "test 1",
    capacity: 0,
    room: "",
    allDay: false,
    startTime: new Date(),
    endTime: moment(new Date()).add(1, "hour")._d,
  });
  const [events, setEvents] = useState(eventsList);

  const [roomOption, setRoomOtpion] = useState([]);
  const [message, setMessage] = useState({
    error: false,
    success: false,
    display: false,
    msg: "",
    msgType: "",
    severity: "",
  });
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  const handleCalFormSubmit = async (e) => {
    console.log("form", e);
    e.preventDefault();

    setTimeout(() => setMessage({ display: false }), 7000);

    //check for title
    if (!e.target[0].value)
      return setMessage({
        display: true,
        msg: "Please enter meeting title.",
        msgType: "Error",
        severity: "error",
      });

    //check for capacity
    if (e.target[2].value == 0)
      return setMessage({
        display: true,
        msg: "Please select capacity.",
        msgType: "Error",
        severity: "error",
      });

    // console.log("final res", booking);

    //check for overlapping time
    // let isOverlapp = checkOverlappingTime(booking);
    // if (isOverlapp) {
    //   return setMessage({
    //     display: true,
    //     msg: "Your slot is overlapping with a booking. Kindly select a different slot or room.",
    //     msgType: "Error",
    //     severity: "error",
    //   });
    // }
    let newBooking = {
      title: booking.title,
      start: booking.startTime,
      end: booking.endTime,
      room: booking.room,
      capacity: booking.capacity,
      allDay: booking.allDay,
    };
    console.log("new booking", newBooking);
    try {
      let res = await axiosConfig.post("/", newBooking);
      console.log("res", res);
      setEvents([newBooking]);
      setMessage({
        display: true,
        msg: `Your booking is confirmed. Note Booking id:${res.data.bookingId} for future reference.`,
        msgType: "Success",
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      return setMessage({
        display: true,
        msg: `Error: You are trying to duplicate record`,
        msgType: "Error",
        severity: "error",
      });
    }
  };
  /** Check all day event */
  const checkAllDayEvent = (booking) => {
    let found = events.findIndex(
      (event) =>
        event.allDay &&
        event.room == booking.room &&
        moment(event.start).isSame(booking.startTime, "dates")
    );
    return found;
  };
  /**check overlapping time */
  const checkOverlappingTime = (booking) => {
    let overlap = false;
    let found = events.find(
      (event) =>
        event.room == booking.room &&
        moment(event.start).isSame(booking.startTime, "dates")
    );
    console.log("***** found", found);
    if (found) {
      let format = "hh:mm:ss";
      let time = moment(booking.startTime, format),
        beforeTime = moment(found.start, format),
        afterTime = moment(found.end, format);
      console.log({ time, beforeTime, afterTime });
      if (time.isBetween(beforeTime, afterTime) || time.isSame(beforeTime)) {
        console.log("is between");
        overlap = true;
      }
    }
    return overlap;
  };
  /**validate end time */
  const validateEndTime = (endTime) => {
    let format = "hh:mm:ss";
    let start = moment(booking.startTime, format);
    let end = moment(endTime.$d, format);
    if (end.isBefore(start)) {
      return setMessage({
        display: true,
        msg: "How end Time can be before start time??",
        msgType: "Error",
        severity: "error",
      });
    } else {
      setBooking({ ...booking, endTime: endTime.$d });
    }
  };

  const setEventsBasedOnRoom = async (room) => {
    //get all events for this room
    let events = await axiosConfig.get(`/?roomName=${room}`);
    console.log("events", events);
    setEvents(events.data);
  };
  const handleCapacityChange = (e) => {
    let roomByCapacity = rooms.filter((room) => {
      return room.capacity >= e.target.value;
    });
    console.log("roomByCapacity", roomByCapacity);
    setRoomOtpion(roomByCapacity);
    setBooking({
      ...booking,
      room: roomByCapacity[0].name || "",
      capacity: e.target.value,
    });

    setEventsBasedOnRoom(roomByCapacity[0].name);
  };
  return (
    <Container
      sx={{ border: "none", width: "80%", padding: "10px 10px" }}
      my={5}
    >
      {message.display && (
        <div style={{ width: "50%", padding: "5px", margin: "0 auto" }}>
          <Alert severity={message.severity}>{message.msg}</Alert>
        </div>
      )}
      <form onSubmit={handleCalFormSubmit}>
        <Grid container item justify="space-between" gap={3} my={1}>
          <Grid xs={8} item>
            <TextField
              fullWidth
              id="title"
              label="Meeting Title"
              variant="standard"
              name="name"
              onChange={(e) =>
                setBooking({ ...booking, title: e.target.value })
              }
              value={booking.title}
              //style={{ width: "60%", marginLeft: "0" }}
            />
          </Grid>
          <Grid xs={2} item>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    setBooking({ ...booking, allDay: e.target.checked })
                  }
                />
              }
              label="All Day"
            />
          </Grid>
          {/**capacity */}
          <Grid xs={2} item>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="capacity-label">Capacity</InputLabel>
              <Select
                labelId="capacity-label"
                id="capacity-select"
                value={booking.capacity}
                label="Capacity"
                onChange={(e) => {
                  handleCapacityChange(e);
                }}
              >
                <MenuItem value={0} disabled>
                  select
                </MenuItem>
                {SeatingSpace.map((item) => {
                  return (
                    <MenuItem value={item.value} key={item.value}>
                      {item.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          {/**ROOM */}
          <Grid xs={2} item>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="room-label">Rooms</InputLabel>
              <Select
                labelId="room-label"
                id="room-select"
                value={booking.room}
                label="Rooms"
                onChange={(e) => {
                  console.log("room selected", e.target.value);
                  setEventsBasedOnRoom(e.target.value);
                  setBooking({ ...booking, room: e.target.value });
                }}
              >
                {roomOption.map((item) => {
                  return (
                    <MenuItem
                      value={item.name}
                      key={item.name}
                    >{`${item.name} (${item.capacity} seater)`}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3} item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Time"
                disablePast
                shouldDisableYear={(e) => true}
                renderInput={(params) => <TextField {...params} />}
                ampm={false}
                format="DD-MM-YYYY"
                value={booking.startTime}
                onChange={(newValue) => {
                  setBooking({ ...booking, startTime: newValue.$d });
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid xs={3} item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Time"
                disablePast
                renderInput={(params) => <TextField {...params} />}
                value={booking.endTime}
                disabled={booking.allDay}
                ampm={false}
                onChange={(newValue) => {
                  validateEndTime(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Button variant="contained" type="submit">
          Book
        </Button>
      </form>
      {booking.room && (
        <MyCalendar
          localizer={localizer}
          eventSet={events}
          room={booking.room}
        />
      )}
    </Container>
  );
};

export default MeetingForm;
