import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./EventModal";

export default function MyCalendar({ localizer, eventSet, room }) {
  const [openModal, setOpenModal] = useState(false)
  const [data, setEventData] = useState()
  const handleSelectEvent = (event) => {

    console.log('event details:', event);
    setEventData(event)
    setOpenModal(true)
    // window.alert(event.title + ' ' + event.room)
  }

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  const handleCloseModal = () => {
    console.log('inclose modal');
    setOpenModal(false)
  }
  return (
    <Fragment>
      <h4>Availability for {room}</h4>
      <Calendar
        style={{ height: 800, margin: "10px 50px" }}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={eventSet.filter((events) => events.room === room)}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        // onSelectSlot={handleSelectSlot}
        // selectable
        startAccessor="start" endAccessor="end"
        scrollToTime={scrollToTime}
      />
      {data && (<EventModal openModal={openModal} data={data} handleCloseModal={handleCloseModal} />)}
    </Fragment>
  )
}

MyCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}