import React, { Fragment, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./EventModal";

export default function MyCalendar({ localizer, eventSet, room }) {
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
  return (
    <Fragment>
      <h4>Availability for {room}</h4>
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
      <EventModal openModal={true} />
    </Fragment>
  )
}

MyCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}