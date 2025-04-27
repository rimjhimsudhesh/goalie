import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/index.css';
import '@fullcalendar/daygrid/main.css';

interface CalendarViewProps {
  events: { title: string; date: string }[];
}

const Calendar: React.FC<CalendarViewProps> = ({ events }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
};

export default Calendar;
