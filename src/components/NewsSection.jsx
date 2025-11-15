import React from 'react';
import { Link } from 'react-router-dom';
import './NewsSection.css';

const NewsSection = ({ news }) => {
  // Format date function with Kazakh month names
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthNames = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'];
    const month = monthNames[monthIndex] || 'қараша';
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Limit to maximum 4 news items on main page
  const limitedNews = news.slice(0, 4);
  const largeNews = limitedNews.filter(item => item.type === 'large');
  const smallNews = limitedNews.filter(item => item.type === 'small');

  return (
    <div className="news-section">
      <h2 className="section-title">Жаңалықтар</h2>
      <div className="news-grid">
        <div className="news-large-row">
          {largeNews.map(item => (
            <Link key={item.id} to={`/post/${item.id}`} className="news-card-link">
              <div className="news-card large-card">
                <div className="news-image-container">
                  <img src={item.image} alt={item.title} className="news-image" />
                  <div className="date-overlay">{formatDate(item.date)}</div>
                </div>
                <h3 className="news-title">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="news-small-row">
          {smallNews.map(item => (
            <Link key={item.id} to={`/post/${item.id}`} className="news-card-link">
              <div className="news-card small-card">
                <div className="news-card-header">
                  <span className="news-date">{formatDate(item.date)}</span>
                  <button className="details-button" onClick={(e) => e.preventDefault()}>Толығырақ</button>
                </div>
                <h3 className="news-title-small">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Link to="/news" className="all-news-button">
        Барлық жаңалықтар
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  );
};

export default NewsSection;

