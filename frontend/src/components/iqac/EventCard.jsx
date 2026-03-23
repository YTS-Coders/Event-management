import React from 'react';
import '../../styles/dashboard.css';

const EventCard = ({ event, onClick }) => {
  const { title, poster } = event;

  return (
    <div className="iqac-event-card card glass-card" onClick={onClick}>
      <div className="card-thumb">
        {poster ? (
          <img src={poster} alt={title} className="thumb-img" />
        ) : (
          <div className="thumb-placeholder">{title.charAt(0)}</div>
        )}
      </div>
      <div className="card-info">
        <h4>{title}</h4>
      </div>
      <div className="card-hover-overlay">
        Generate IQAC Report →
      </div>
    </div>
  );
};

export default EventCard;
