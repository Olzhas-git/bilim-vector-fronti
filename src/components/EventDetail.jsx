import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { eventsAPI } from '../services/api';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await eventsAPI.getById(id);
        setEvent(data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setError('Оқиғаны жүктеу қатесі');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="app">
        <Header />
        <div className="event-detail-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Оқиға жүктелуде...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="app">
        <Header />
        <div className="event-detail-container">
          <div className="event-not-found">
            <h2>{error || 'Оқиға табылмады'}</h2>
            <button onClick={() => navigate('/')} className="back-button">
              Басты бетке оралу
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const dateInfo = formatEventDate(event.date || event.created_at);
  const fullDate = dateInfo.full;

  return (
    <div className="app">
      <Header />
      <div className="event-detail-container">
        <button onClick={() => navigate('/')} className="back-button">
          ← Артқа
        </button>
        <article className="event-detail">

          <div className="event-header">
            <div className="event-date-large">
              <span className="event-day-large">{dateInfo.day}</span>
              <span className="event-month-large">{dateInfo.month.toUpperCase()}</span>
            </div>
            <div className="event-header-content">
              <h1 className="event-detail-title">{event.title || event.name}</h1>
              <div className="event-meta">
                <span className="event-full-date">{fullDate}</span>
              </div>
            </div>
          </div>
          
          {event.image && (
            <div className="event-image-container" style={{ marginBottom: '2rem' }}>
              <img src={event.image} alt={event.title || event.name} style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }} />
            </div>
          )}
          
          <div className="event-body">
            {event.description && (
              <section className="event-section">
                <h2 className="section-heading">Іс-шара сипаттамасы</h2>
                <div className="event-description" dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, '<br />') }} />
              </section>
            )}

            <section className="event-section">
              <h2 className="section-heading">Іс-шара мәліметтері</h2>
              <div className="event-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Күні:</span>
                  <span className="detail-value">{fullDate}</span>
                </div>
                {event.date && (
                  <div className="detail-item">
                    <span className="detail-label">Уақыты:</span>
                    <span className="detail-value">
                      {new Date(event.date).toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>
            </section>

            {event.registration_link && (
              <section className="event-section">
                <h2 className="section-heading">Тіркелу</h2>
                <p className="event-description">
                  Іс-шараға қатысу үшін алдын ала тіркелу қажет.
                  Орын саны шектеулі.
                </p>
                <a 
                  href={event.registration_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="register-button"
                  style={{ display: 'inline-block', textDecoration: 'none' }}
                >
                  Тіркелу
                </a>
              </section>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;

