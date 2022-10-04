import React, { useEffect, useState } from 'react'
import './App.css';
import MeetingApp from "./calender/MeetingForm";
import MyCalendar from "./calender/MyCalendar";


function App() {


  return (
    <div className="App">
      <h4>Welcome to Meeting Room Booking App</h4>
      <h3>Book a Meeting Room</h3>
      <MeetingApp />

    </div>
  );
}

export default App;
