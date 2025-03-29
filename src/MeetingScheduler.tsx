import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CalendarView from "./CalendarView";
import MeetingForm from "./MeetingForm";
import ScheduledMeetings from "./ScheduledMeetings";
import './css/mediaQueries.css';

interface Meeting {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  duration: string;
  note: string;
}

const MeetingScheduler = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleScheduleMeeting = (meeting: Meeting) => {
    setMeetings([...meetings, meeting]);
  };

  return (
    <div className="container" style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {/* <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> */}
      <MeetingForm onSchedule={handleScheduleMeeting} />
      <ToastContainer />
      <ScheduledMeetings meetings={meetings} />
    </div>
  );
};

export default MeetingScheduler;
