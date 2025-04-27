import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Streaks from './components/Streaks';
import FriendActivity from './components/FriendsActivity';
import Dropdown from './components/Dropdown';
import './App.css';

const App: React.FC = () => {
  const [calendarEvents, setCalendarEvents] = useState<{ title: string; date: string }[]>([]);

  const fetchCalendarEvents = async () => {
    try {
      const response = await fetch('https://your-database-api-url.com/FetchDatabaseData'); // <-- your real fetch URL here
      const data = await response.json();

      console.log("Fetched database data:", data);

      const allEvents: { title: string; date: string }[] = [];

      for (const entry of data) {
        const goalSuggestions = entry.goalSuggestions || [];
        const mappedEvents = goalSuggestions.map((item: any) => ({
          title: item.activity || "No Activity",
          date: item.date || "No Date"
        }));
        allEvents.push(...mappedEvents);
      }

      console.log("Mapped database events:", allEvents);

      setCalendarEvents(allEvents);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    }
  };

  useEffect(() => {
    fetchCalendarEvents(); // Fetch once when app loads
  }, []);

  return (
    <div className="page-container">
      {/* TOP HALF */}
      <div className="top-row">
        <div className="calendar-section">
          <Calendar events={calendarEvents} />
        </div>
        <div className="streaks-section">
          <Dropdown setCalendarEvents={setCalendarEvents} fetchCalendarEvents={fetchCalendarEvents} />
          <Streaks />
        </div>
      </div>

      {/* BOTTOM HALF */}
      <div className="bottom-row">
        <FriendActivity />
      </div>
    </div>
  );
};

export default App;
