import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const EventCard = ({ event }) => {
  const { _id, title, date, department, description, poster } = event;

  return (
    <div className="card event-card">
      <div className="event-card-image">
        {poster ? (
          <img src={poster} alt={title} />
        ) : (
          <div className="event-placeholder-gradient">
            {title.charAt(0)}
          </div>
        )}
        <div className="event-department-badge">
          {department}
        </div>
      </div>
      
      <div className="event-card-content">
        <h3>{title}</h3>
        <p className="event-date">
          <span className="icon">🕒</span> 
          {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p className="event-description">
          {description?.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        <Link to={`/events/${_id}`} className="event-view-link">
          Explore Event <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
