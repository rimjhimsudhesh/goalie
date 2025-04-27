import React from 'react'
import CalendarView from './components/Calendar'
import Streaks from './components/Streaks'
import FriendActivity from './components/FriendsActivity'
import Dropdown from './components/Dropdown'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="page-container">
      
      {/* TOP HALF */}
      <div className="top-row">
        <div className="calendar-section">
          <CalendarView />
        </div>
        <div className="streaks-section">
          <Dropdown />
          <Streaks />
        </div>
      </div>

      {/* BOTTOM HALF */}
      <div className="bottom-row">
        <FriendActivity />
      </div>

    </div>
  )
}

export default App
