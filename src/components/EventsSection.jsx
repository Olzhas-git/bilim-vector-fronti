import React from 'react';
import { Link } from 'react-router-dom';
import './EventsSection.css';

const EventsSection = ({ events }) => {
  // Limit to maximum 5 events on main page
  const limitedEvents = events.slice(0, 5);
  
  return (
    <div className="events-section">
      <h2 className="events-title">Оқиғалар</h2>
      <div className="events-list">
        {limitedEvents.map(event => (
          <Link key={event.id} to={`/event/${event.id}`} className="event-item-link">
            <div className="event-item">
              <div className="event-date-block">
                <span className="event-day">{event.day}</span>
                <span className="event-month">{event.month}</span>
              </div>
              <div className="event-content">
                <p className="event-title">{event.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/events" className="all-events-button">
        Барлық оқиғалар
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  );
};

export default EventsSection;

