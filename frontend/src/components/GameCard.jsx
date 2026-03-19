import React, { useState } from 'react';
import '../styles/components.css';

const GameCard = ({ game }) => {
  const { name, rules, participantLimit, category, currentParticipants } = game;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card game-card">
      <div className="game-card-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="game-info">
          <span className="game-icon">🎮</span>
          <h4>{name}</h4>
        </div>
        <div className="game-badges">
          <span className="badge badge-brass">{category}</span>
          <span className="accordion-arrow">{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>

      {isOpen && (
        <div className="game-card-details">
          <div className="rules-section">
            <h5>Rules & Guidelines:</h5>
            <p>{rules}</p>
          </div>
          
          <div className="game-slots-premium">
            <div className="slot-bar-header">
              <span>Slots Filled</span>
              <span>{currentParticipants || 0} / {participantLimit}</span>
            </div>
            <div className="slot-progress-bar">
              <div 
                className={`slot-progress ${(currentParticipants || 0) / participantLimit > 0.8 ? 'urgent' : ''}`}
                style={{ width: `${((currentParticipants || 0) / participantLimit) * 100}%` }}
              ></div>
            </div>
            {participantLimit - (currentParticipants || 0) <= 5 && (
              <p className="warning-text">🔥 Only {participantLimit - (currentParticipants || 0)} slots left!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCard;
