// src/components/Calendar.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';

const Calendar = () => {
  const events: EventInput[] = [
    {
      title: 'Read a book',
      date: '2025-04-25',
      extendedProps: {
        type: 'reading',
        status: 'complete'
      }
    },
    {
      title: 'Go for a run',
      date: '2025-04-26',
      extendedProps: {
        type: 'fitness',
        status: 'incomplete'
      }
    }
  ];

  return (
    <div className="calendar-container">
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
