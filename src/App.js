import { Typography } from "@mui/material";
import React from 'react'
import './App.css';
import MeetingApp from "./calender/MeetingForm";

function App() {
  return (
    <div className="App">
      <Typography variant="h4" gutterBottom my={2}>
        Welcome to Meeting Room Booking App !
      </Typography>
      <MeetingApp />
    </div>
  );
}

export default App;
