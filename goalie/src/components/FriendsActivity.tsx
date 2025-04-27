import React from 'react'
import './FriendsActivity.css'

type Friend = {
  name: string
  avatarColor: string
  activity: string | null
  isActive: boolean
}



const FriendsActivity: React.FC = () => {
  function addIng(word: string): string {
    if (word.endsWith("e") && word !== "be") {
      return word.slice(0, -1) + "ing"; // make "dance" -> "dancing"
    }
    if (word.endsWith("run")) {
      return "running"; // special fix for "run"
    }
    return word + "ing";
  }


  const mockData: Friend[] = [
    { name: "Alex", avatarColor: "green", activity: "run", isActive: true },
    { name: "Sam", avatarColor: "blue", activity: "read", isActive: false },
    { name: "Taylor", avatarColor: "pink", activity: "crochet", isActive: false },
    { name: "Jamie", avatarColor: "pink", activity: "walk", isActive: true },
    { name: "Morgan", avatarColor: "blue", activity: "jump rope", isActive: false }
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
            {addIng(friend.activity)}
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
            remind {friend.name} to {friend.activity} today
          </div>
        </div>
      )
    ))}
  </div>

</div>
  )
}

export default FriendsActivity
