import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { SeatingSpace, rooms } from './config'
import { compareAsc } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import { getDay, parse } from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import MyCalendar from "./MyCalendar";
import eventsList from "./events";
import moment from "moment";
const MeetingForm = () => {
    const [booking, setBooking] = useState({
        title: '',
        capacity: '',
        room: '',
        startTime: new Date(),

        endTime: moment(new Date()).add(1, 'hour'),


    })
    const [events, setEvents] = useState(eventsList)

    const [roomOption, setRoomOtpion] = useState([])
    const [message, setMessage] = useState({
        error: false,
        success: false,
        display: false,
        msg: '',
        msgType: '',
        severity: ''
    })
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
    const handleCalFormSubmit = (e) => {
        e.preventDefault()

        setTimeout(() => setMessage({ display: false }), 5000);

        //check for title
        if (!e.target[0].value) return setMessage({
            display: true,
            msg: 'Please enter meeting title.',
            msgType: 'Error',
            severity: 'error'
        })

        //check for capacity
        if (e.target[1].value == 0) return setMessage({
            display: true,
            msg: 'Please select capacity.',
            msgType: 'Error',
            severity: 'error'
        })

        //check for date and time: end time cannot be smaller than start time
        const result = compareAsc(booking.endTime, booking.startTime)
        console.log('dates', { 'start': booking.startTime, 'end': booking.endTime, result })
        if (result == -1) {
            return setMessage({
                display: true,
                msg: 'End Time cannot be less than start time',
                msgType: 'Error',
                severity: 'error'
            })
        }
        // console.log('dates', { 'start': booking.startTime, 'end': booking.endTime, result })

        console.log('final res', booking)
        let NewEvents = eventsList
        NewEvents.push({
            title: booking.title,
            start: booking.startTime,
            end: booking.endTime
        })
        console.log('NewEvents', NewEvents)
        setEvents(NewEvents)
        //  localStorage.setItem('events', JSON.stringify(events))

    }
    return (
        <Container sx={{ border: "none", width: "80%", padding: "10px 10px" }} my={5}>
            {message.display && (<div style={{ width: '50%', padding: '5px', margin: '0 auto' }}>
                <Alert severity={message.severity}>

                    {message.msg}
                </Alert>
            </div>)
            }
            <form onSubmit={handleCalFormSubmit}>
                <Grid container item justify="space-between" gap={2} my={1}>
                    <Grid xs={12} item >
                        <TextField fullWidth sx={{ width: "60%", margin: "0 auto" }}
                            id='title'
                            label='Meeting Title'
                            variant='standard'
                            name='name'
                            placeholder='Title of the meeting...'
                            onChange={(e) => setBooking({ ...booking, title: e.target.value })}
                        />
                    </Grid>
                    <Grid xs={2} item>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id='capacity-label'>Capacity</InputLabel>
                            <Select
                                labelId='capacity-label'
                                id='capacity-select'
                                value={booking.capacity}
                                label='Capacity'
                                onChange={(e) => {
                                    // setCapacityOtpion(e.target.value)
                                    //get the room
                                    let myroom = rooms.filter((room) => {
                                        return room.capacity <= e.target.value
                                    })
                                    //  console.log('myroom', myroom);
                                    setRoomOtpion(myroom)
                                    setBooking({ ...booking, room: myroom[0].title || "", capacity: e.target.value })
                                }}
                            ><MenuItem value={0} disabled>select</MenuItem>
                                {

                                    SeatingSpace.map((item) => {
                                        return (<MenuItem value={item.value} key={item.value}>{item.title}</MenuItem>)
                                    })
                                }

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={2} item>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id='room-label'>Rooms</InputLabel>
                            <Select
                                labelId='room-label'
                                id='room-select'
                                value={booking.room}
                                label='Rooms'
                                onChange={(e) => {
                                    console.log('room selected', e.target.value);
                                    setBooking({ ...booking, room: e.target.value })
                                }}
                            >
                                {
                                    roomOption.map((item) => {
                                        return (<MenuItem value={item.title} key={item.title}>{`${item.title} (${item.capacity} seater)`}</MenuItem>)
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={3} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label='Start Time'
                                disablePast
                                shouldDisableYear={(e) => true}
                                renderInput={(params) => <TextField {...params} />}

                                format="DD-MM-YYYY"
                                value={booking.startTime}
                                onChange={(newValue) => {
                                    console.log('new ', newValue);
                                    const { $D: date, $M: month, $y: year, $H: hour, $m: min } = newValue
                                    // setStartDate(newValue);
                                    setBooking({ ...booking, startTime: newValue.$d })
                                    console.log('start date', {
                                        'complete': newValue,
                                        'derived': new Date(year, month, date, hour, min)
                                    })
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid xs={3} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label='End Time'
                                disablePast
                                renderInput={(params) => <TextField {...params} />}
                                value={booking.endTime}
                                onChange={(newValue) => {
                                    // const { $D: date, $M: month, $y: year, $H: hour, $m: min } = newValue
                                    //setEndDate(newValue);
                                    setBooking({ ...booking, endTime: newValue.$d })
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>



                <Button variant='contained' type='submit'>
                    Book
                </Button>
            </form>
            <h4>Availability for {booking.room}</h4>
            <MyCalendar localizer={localizer} eventSet={events} />
        </Container >
    )
}

export default MeetingForm