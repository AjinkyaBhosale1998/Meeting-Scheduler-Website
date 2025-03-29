import { useEffect, useState } from "react";
import '../src/css/MeetingForm.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { calculateDuration, calculateEndTime, validateMeetingData } from "../src/utils/validationUtils";
import { Calendar, Clock, AlertCircle, CheckCircle, PhoneCall } from 'lucide-react';

const MeetingForm = ({ onSchedule }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      
      setTimeout(() => {
        onSchedule({ title, startDate, startTime, endDate, endTime, duration });
        
        // Show success toast when the meeting is scheduled
        toast.success("Meeting scheduled successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTitle(""); 
        setIsSubmitting(false);
      }, 600);
    } else {
      // Show error toast for validation error
      toast.error(validationError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="meeting-form">
      <h2><span style={{ color: "#4995e6" }}>Quick</span> Connect <PhoneCall color="#4995e6"/></h2>

      <div className="form-group">
        <label htmlFor="title">Agenda Title</label>
        <input 
          id="title"
          className={`inputboxtext ${error && !title ? "error" : ""}`} 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter meeting title..."
        />
        {/* {error && !title && <div className="error">Agenda title is required.</div>} */}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">
            <Calendar size={16} className="icon" />
            Start Date
          </label>
          <input 
            id="startDate"
            type="date" 
            value={startDate} 
            min={getTodayDate()} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">
            <Clock size={16} className="icon" />
            Start Time
          </label>
          <input 
            id="startTime"
            type="time" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)} 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="endDate">
            <Calendar size={16} className="icon" />
            End Date
          </label>
          <input 
            id="endDate"
            type="date" 
            value={endDate} 
            min={startDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">
            <Clock size={16} className="icon" />
            End Time
          </label>
          <input 
            id="endTime"
            type="time" 
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)} 
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <div className="duration-display">
          {error ? (
            <AlertCircle size={16} className="error-icon" />
          ) : (
            <CheckCircle size={16} className="success-icon" />
          )}
          <input 
            id="duration"
            type="text" 
            value={error && error !== "Agenda Title is required." ? error : duration}
            className={`inputboxtext ${error && error !== "Agenda Title is required." ? "error" : ""}`}
            disabled 
          />
        </div>
      </div>

      <button 
        className={`schedule-btn ${isSubmitting ? 'submitting' : ''}`} 
        onClick={scheduleMeeting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Scheduling...' : 'Schedule'}
      </button>
    </div>
  );
};

export default MeetingForm;