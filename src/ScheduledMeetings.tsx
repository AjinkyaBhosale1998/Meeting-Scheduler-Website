import { formatDateTime } from "./utils/validationUtils";
import '../src/css/ScheduledMeetings.css';
import { Clock, Calendar, AlertCircle, ListChecks } from 'lucide-react';

const ScheduledMeetings = ({ meetings }) => {
  return (
    <div className="scheduled-meetings">
      <h2><span style={{ color: "#4995e6",  }}>Scheduled</span> Meetings <ListChecks color="#4995e6"/></h2>
      {meetings.length === 0 ? 
      <div className="no-meetings">
          <AlertCircle size={24} />
          <p>No meetings scheduled.</p>
      </div> : (
        <ul className="meetings-list">
        {meetings.map((meeting, index) => (
          <li key={index} className="meeting-item">
            <div className="meeting-header">
              <h3>{meeting.title}</h3>
              <span className="duration-badge">{meeting.duration}</span>
            </div>
            
            <div className="meeting-details">
              <div className="meeting-detail">
                <Clock size={16} className="icon" />
                <p><strong>Start Date:</strong> {formatDateTime(meeting.startDate, meeting.startTime)}</p>
              </div>
              
              <div className="meeting-detail">
                <Calendar size={16} className="icon" />
                <p><strong>End Date:</strong> {formatDateTime(meeting.endDate, meeting.endTime)}</p>
              </div>
              
              {/* {meeting.note && (
                <div className="meeting-note">
                  <MessageSquare size={16} className="icon" />
                  <p><strong>Note:</strong> {meeting.note}</p>
                </div>
              )} */}
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default ScheduledMeetings;
