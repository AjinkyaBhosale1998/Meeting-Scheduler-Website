import { formatDateTime } from "./utils/validationUtils";
import '../src/css/ScheduledMeetings.css';

const ScheduledMeetings = ({ meetings }) => {
  return (
    <div className="scheduled-meetings">
      <h2>Scheduled Meetings</h2>
      {meetings.length === 0 ? <p>No meetings scheduled.</p> : (
        <ul>
          {meetings.map((meeting, index) => (
            <li key={index} className="meeting-item">
              <h5>{meeting.title}</h5>
              <p><strong>Start:</strong> {formatDateTime(meeting.startDate, meeting.startTime)}</p>
              <p><strong>End:</strong> {formatDateTime(meeting.endDate, meeting.endTime)}</p>
              <p><strong>Duration:</strong> {meeting.duration}</p>
              {meeting.note && <p><strong>Note:</strong> {meeting.note}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScheduledMeetings;
