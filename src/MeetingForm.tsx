import { useEffect, useState } from "react";
import '../src/css/MeetingForm.css';
import { calculateDuration, validateMeetingData } from "../src/utils/validationUtils";

const MeetingForm = ({ onSchedule }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Function to get the current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  // Function to calculate end time (30 mins after start time)
  const calculateEndTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Add 30 mins
    return now.toTimeString().slice(0, 5);
  };

  // Set default values on component mount
  useEffect(() => {
    const today = getTodayDate();
    const nowTime = getCurrentTime();
    const endTime = calculateEndTime();

    setStartDate(today);
    setStartTime(nowTime);
    setEndDate(today);
    setEndTime(endTime);
    setDuration("30 min");
  }, []);

  // Update duration dynamically when end time changes
  useEffect(() => {
    if (startDate && startTime && endDate && endTime) {
      const newDuration = calculateDuration(startDate, startTime, endDate, endTime);
      setDuration(newDuration);
    }
  }, [startDate, startTime, endDate, endTime]);

  const scheduleMeeting = () => {
    const validationError = validateMeetingData(title, startDate, startTime, endDate, endTime);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(""); // Clear any previous errors

    onSchedule({ title, startDate, startTime, endDate, endTime, duration });

    setTitle("");
    setDuration("");
  };

  return (
    <div className="meeting-form">
      <h2>Schedule a Meeting</h2>

      {error && <p className="error-text">{error}</p>}

      <h5>Agenda Title</h5>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <div className="form-row">
        <div>
          <h6>Start Date</h6>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <h6>Start Time</h6>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div>
          <h6>End Date</h6>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <h6>End Time</h6>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
      </div>

      <h5>Duration</h5>
      <input type="text" value={duration} disabled />

      <button className="schedule-btn" onClick={scheduleMeeting}>Schedule</button>
    </div>
  );
};

export default MeetingForm;
