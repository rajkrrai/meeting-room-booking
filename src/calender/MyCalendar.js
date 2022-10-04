import React, { Fragment, useState, useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import eventsList from './events'
import moment from "moment";

export default function MyCalendar({ localizer, eventSet }) {
  // const updateEvent = (event || []).map((value) => {
  //   const { $D: date, $M: month, $y: year, $H: hour, $m: min } = value.start;
  //   return {
  //     ...value,
  //     start: moment(value.start),// new Date(year, month, date, hour, min),
  //     end: moment(value.end) //new Date(value.end.$y, value.end.$M, value.end.$D, value.end.$H, value.end.$m)
  //   }
  // })
  // const [myEvents, setEvents] = useState(updateEvent)

  // useEffect(() => {
  //   const eventDB = localStorage.getItem('events') || [{ title: '', start: '', end: '' }]
  //   console.log(eventDB);
  //   if (eventDB.length === 0) {
  //     localStorage.setItem('events', JSON.parse(eventDB))
  //   } else {

  //     //  setEvents(JSON.stringify(localStorage.getItem('events')))
  //   }

  // }, [])

  // const handleSelectSlot = useCallback(
  //   ({ start, end }) => {
  //     const title = window.prompt('New Event name')
  //     if (title) {
  //       setEvents((prev) => [...prev, { start, end, title }])
  //     }
  //   },
  //   [setEvents]
  // )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title + ' ' + event.room),
    []
  )

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )
  // console.log('myEvents ', myEvents);
  return (
    <Fragment>
      <Calendar
        style={{ height: 500, margin: "10px 50px" }}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={eventSet}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        // onSelectSlot={handleSelectSlot}
        // selectable
        startAccessor="start" endAccessor="end"
        scrollToTime={scrollToTime}
      />
    </Fragment>
  )
}

MyCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}