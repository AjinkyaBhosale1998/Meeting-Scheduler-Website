import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../src/css/CalendarView.css";

interface CalendarProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

const CalendarView = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  return (
    <div className="calendar-container">
      <h3>Calendar</h3>
      <Calendar
        onChange={(date) => setSelectedDate(date as Date)}
        value={selectedDate}
      />
    </div>
  );
};
export default CalendarView;
