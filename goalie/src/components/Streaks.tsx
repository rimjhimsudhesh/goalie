import React from 'react';
import './Streaks.css';

const Streaks: React.FC = () => {
    return (
        <div className="streaks-container">
            <h3> # day streak 🔥</h3>

            <div className="streak-item">
                <div className="hobby-name">Running</div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '80%' }}></div>
                </div>
            </div>

            <div className="streak-item">
                <div className="hobby-name">Crocheting</div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '60%' }}></div>
                </div>
            </div>

            <div className="streak-item">
                <div className="hobby-name">Piano Practice</div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '95%' }}/>
                </div>
            </div>
        </div>
    )
}

export default Streaks;