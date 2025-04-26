import React from 'react'
import './FriendsActivity.css'

type Friend = {
  name: string
  avatarColor: string
  activity: string | null
  isActive: boolean
}

const FriendsActivity: React.FC = () => {
  const mockData: Friend[] = [
    { name: "Alex", avatarColor: "green", activity: "run", isActive: true },
    { name: "Sam", avatarColor: "blue", activity: "read", isActive: false },
    { name: "Taylor", avatarColor: "pink", activity: "piano", isActive: false },
    { name: "Jamie", avatarColor: "pink", activity: "hello", isActive: true },
    { name: "Morgan", avatarColor: "blue", activity: "hi", isActive: false }
  ]

  return (
    <div className="friend-activity-container">

  {/* First: ACTIVE FRIENDS */}
  <div className="active-friends">
    {mockData.map((friend, idx) => (
      friend.isActive && friend.activity && (
        <div key={idx} className="friend-activity-row">
          <div className={`avatar ${friend.avatarColor}`}></div>
          <div className="activity-label">
            {`${friend.activity}ing`}
          </div>
        </div>
      )
    ))}
  </div>

  {/* Then: REMINDERS */}
  <div className="reminder-grid">
    {mockData.map((friend, idx) => (
      !friend.isActive && friend.activity && (
        <div key={idx} className="friend-activity-row">
          <div className={`avatar ${friend.avatarColor}`}></div>
          <div className="reminder-text">
            remind {friend.name.toLowerCase()} to {friend.activity} today
          </div>
        </div>
      )
    ))}
  </div>

</div>
  )
}

export default FriendsActivity
