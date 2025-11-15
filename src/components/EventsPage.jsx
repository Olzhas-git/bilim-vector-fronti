import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { eventsAPI } from '../services/api';
import './EventsPage.css';

const EventsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await eventsAPI.getAll(100, 0); // Fetch more items for pagination
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Оқиғаларды жүктеу қатесі');
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Pagination
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const formatEventDate = (dateString) => {
    if (!dateString) return { day: '', month: '', full: '' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { day: '', month: '', full: dateString };
    
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthNamesShort = ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел'];
    const monthNamesFull = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'];
    const month = monthNamesShort[monthIndex] || 'Қар';
    const monthName = monthNamesFull[monthIndex] || 'қараша';
    const year = date.getFullYear();
    
    return {
      day: day.toString(),
      month: month,
      full: `${day} ${monthName} ${year}`
    };
  };

  // Transform event data to match expected format
  const transformEvent = (event) => {
    const dateInfo = formatEventDate(event.date || event.created_at);
    return {
      id: event.id,
      day: dateInfo.day,
      month: dateInfo.month,
      title: event.title || event.name || '',
      date: event.date || event.created_at,
      fullDate: dateInfo.full
    };
  };

  return (
    <div className="app">
      <Header />
      <div className="events-page">
        <div className="events-page-header">
          <div className="events-page-container">
            <h1 className="events-page-title">Оқиғалар</h1>
            <p className="events-page-subtitle">
              Абай атындағы Қазақ ұлттық педагогикалық университетінің өзекті оқиғалары мен іс-шаралары
            </p>
          </div>
        </div>

        <div className="events-page-container">
          <div className="events-page-content">
            <aside className="events-sidebar">
              <div className="sidebar-section">
                <h3 className="sidebar-title">Жақындағы оқиғалар</h3>
                <div className="upcoming-events">
                  {events.slice(0, 3).map(event => {
                    const transformed = transformEvent(event);
                    return (
                    <Link key={event.id} to={`/event/${event.id}`} className="upcoming-event-item">
                      <div className="upcoming-event-date">
                          <span className="upcoming-event-day">{transformed.day}</span>
                          <span className="upcoming-event-month">{transformed.month}</span>
                      </div>
                      <div className="upcoming-event-content">
                          <h4 className="upcoming-event-title">{transformed.title}</h4>
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </div>
            </aside>

            <main className="events-main">
              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>Оқиғалар жүктелуде...</p>
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                  <p>{error}</p>
                </div>
              ) : (
                <>
              <div className="events-results">
                <p className="events-count">
                      Табылған оқиғалар: <strong>{events.length}</strong>
                </p>
              </div>

              <div className="events-grid-page">
                    {paginatedEvents.length === 0 ? (
                      <p style={{ textAlign: 'center', padding: '2rem' }}>Оқиғалар табылмады</p>
                    ) : (
                      paginatedEvents.map(event => {
                        const transformed = transformEvent(event);
                        return (
                  <Link key={event.id} to={`/event/${event.id}`} className="event-card-page">
                    <div className="event-card-date-large">
                              <span className="event-card-day">{transformed.day}</span>
                              <span className="event-card-month">{transformed.month.toUpperCase()}</span>
                    </div>
                    <div className="event-card-content">
                              <h3 className="event-card-title-page">{transformed.title}</h3>
                              <p className="event-card-date-full">{transformed.fullDate}</p>
                      <span className="event-card-read-more">Толығырақ →</span>
                    </div>
                  </Link>
                        );
                      })
                    )}
              </div>
                </>
              )}

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    ← Алдыңғы
                  </button>
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Келесі →
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;

