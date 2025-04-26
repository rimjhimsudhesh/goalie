import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);


  const handleAddEvent = () => {
    if (!selectedGoal || !selectedDate) return;

    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.addEvent({
      title: selectedGoal,
      start: selectedDate,
      backgroundColor: '#3b82f6', // blue
      extendedProps: {
        type: selectedGoal.toLowerCase(),
        status: 'incomplete'
      }
    });

    setSelectedGoal('');
    setSelectedDate('');
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo.event);
    
    const eventEl = clickInfo.el;
    const rect = eventEl.getBoundingClientRect();
    
    setPopupPosition({
      x: rect.left,
      y: rect.top + rect.height + 5, // 5px below the event
    });
  
    setIsModalOpen(true);
  };

  const handleCompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedEvent) return;

    if (e.target.checked) {
      selectedEvent.setExtendedProp('status', 'complete');
      selectedEvent.setProp('backgroundColor', '#22c55e'); // green
    } else {
      selectedEvent.setExtendedProp('status', 'incomplete');
      selectedEvent.setProp('backgroundColor', '#3b82f6'); // blue
    }
  };

  const handleDelete = () => {
    if (!selectedEvent) return;

    if (confirm(`Are you sure you want to delete "${selectedEvent.title}"?`)) {
      selectedEvent.remove();
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-wrapper relative">
      <div className="controls mb-4">
        <select
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">Select Goal</option>
          <option value="Reading">Reading</option>
          <option value="Fitness">Fitness</option>
          <option value="Meditation">Meditation</option>
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 mr-2"
        />

        <button
          onClick={handleAddEvent}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Goal
        </button>
      </div>

      {isModalOpen && selectedEvent && popupPosition && (
  <div
    className="fixed bg-white p-4 rounded shadow-lg z-50"
    style={{
      top: popupPosition.y + 10, // slight offset down
      left: popupPosition.x + 10, // slight offset right
    }}
  >
    <h2 className="font-bold text-lg mb-2">{selectedEvent.title}</h2>

    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id="complete"
        checked={selectedEvent.extendedProps.status === 'complete'}
        onChange={handleCompleteChange}
        className="mr-2"
      />
      <label htmlFor="complete">Complete</label>
    </div>

    <div className="flex justify-between">
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
      <button
        onClick={closeModal}
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}


      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
        themeSystem='bootstrap5'
        initialView="dayGridMonth"
        events={[]} // Start empty
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  );
};

export default Calendar;
