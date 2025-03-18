import { useState } from "react";
import CalendarView from "./CalendarView";
import MeetingForm from "./MeetingForm";
import ScheduledMeetings from "./ScheduledMeetings";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleScheduleMeeting = (meeting: Meeting) => {
    setMeetings([...meetings, meeting]);
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", padding: "20px" }}>
      <CalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <MeetingForm onSchedule={handleScheduleMeeting} />
      <ScheduledMeetings meetings={meetings} />
    </div>
  );
};

export default MeetingScheduler;
