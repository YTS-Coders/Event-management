import React from 'react';
import useFetch from '../utils/useFetch';
import { getPublicEvents } from '../api/eventsApi';
import ImageSlider from '../components/ImageSlider';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import '../styles/landing.css';

const LandingPage = () => {
  const { data: events, loading } = useFetch(getPublicEvents);

  return (
    <div className="landing-page">
      <header className="college-header">
        <div className="container">
          <h1>SACRED HEART COLLEGE (AUTONOMOUS)</h1>
          <p>Tiruchengode — Empowering Excellence Since 1953</p>
        </div>
      </header>

      <ImageSlider />

      <section id="events-section" className="events-section container">
        <h2 className="section-title">Upcoming Events</h2>
        
        {loading ? (
          <div className="event-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="card skeleton-card">
                <div className="skeleton" style={{ height: '200px' }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <div className="skeleton" style={{ height: '24px', width: '70%', marginBottom: '1rem' }}></div>
                  <div className="skeleton" style={{ height: '16px', width: '40%', marginBottom: '1rem' }}></div>
                  <div className="skeleton" style={{ height: '60px', width: '100%' }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : events && events.length > 0 ? (
          <div className="event-grid">
            {events.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No upcoming events at the moment. Check back later!</p>
          </div>
        )}
      </section>

      <footer className="college-footer">
        <div className="container">
          <p>&copy; 2026 Sacred Heart College. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
