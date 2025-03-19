import { useEffect, useState } from "react";
import '../src/css/MeetingForm.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { calculateDuration, calculateEndTime, validateMeetingData } from "../src/utils/validationUtils";

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

  // Set default values on component mount
  useEffect(() => {
    const today = getTodayDate();
    const nowTime = getCurrentTime();
    const { endDate, endTime } = calculateEndTime(today, nowTime);

    setStartDate(today);
    setStartTime(nowTime);
    setEndDate(endDate);
    setEndTime(endTime);
    setDuration("30 min");
  }, []);

  // Automatically update end date and time when start date or start time changes
  useEffect(() => {
    if (startDate && startTime) {
      const { endDate, endTime } = calculateEndTime(startDate, startTime);
      setEndDate(endDate);
      setEndTime(endTime);
    }
  }, [startDate, startTime]);

  // Recalculate duration dynamically
  useEffect(() => {
    if (startDate && startTime && endDate && endTime) {
      setDuration(calculateDuration(startDate, startTime, endDate, endTime));
    }
  }, [startDate, startTime, endDate, endTime]);

  const scheduleMeeting = () => {
    const validationError = validateMeetingData(title, startDate, startTime, endDate, endTime);
    setError(validationError);

    if (!validationError) {
      onSchedule({ title, startDate, startTime, endDate, endTime, duration });

      // Show success toast when the meeting is scheduled
      toast.success("Meeting scheduled successfully!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTitle(""); // Clear title after scheduling
    }
  };

  return (
    <div className="meeting-form">
      <h2>Schedule a Meeting</h2>

      <h3>Agenda Title</h3>
      <input className="inputboxtext" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <div className="form-row">
        <div>
          <h3>Start Date</h3>
          <input type="date" value={startDate} min={getTodayDate()} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <h3>Start Time</h3>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div>
          <h3>End Date</h3>
          <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <h3>End Time</h3>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
      </div>

      <h5>Duration</h5>
      <input type="text" value={error ? error : duration} className={`inputboxtext ${error ? "error" : ""}`} disabled />

      <button className="schedule-btn" onClick={scheduleMeeting}>Schedule</button>
    </div>
  );
};

export default MeetingForm;