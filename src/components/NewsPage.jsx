import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { postsAPI } from '../services/api';
import logo from '../assets/logo.png';
import './NewsPage.css';

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await postsAPI.getAll(100, 0); // Fetch more items for pagination
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Жаңалықтарды жүктеу қатесі');
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Pagination
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = news.slice(startIndex, startIndex + itemsPerPage);

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

  // Transform post data to match expected format
  const transformPost = (post) => {
    const hasImage = post.image && post.image.trim() !== '';
    return {
      id: post.id,
      date: post.created_at || post.updated_at || new Date().toISOString(),
      title: post.title || post.name || '',
      image: hasImage ? post.image : null,
      type: hasImage ? 'large' : 'small',
      category: 'Жаңалық'
    };
  };

  return (
    <div className="app">
      <Header />
      <div className="news-page">
        <div className="news-page-header">
          <div className="news-page-container">
            <h1 className="news-page-title">Жаңалықтар</h1>
            <p className="news-page-subtitle">
              Абай атындағы Қазақ ұлттық педагогикалық университетінің өзекті жаңалықтары мен оқиғалары
            </p>
          </div>
        </div>

        <div className="news-page-container">
          <div className="news-page-content">
            <aside className="news-sidebar">
              <div className="sidebar-section">
                <h3 className="sidebar-title">Танымал жаңалықтар</h3>
                <div className="popular-news">
                  {news.slice(0, 3).map(item => {
                    const transformed = transformPost(item);
                    return (
                      <Link key={item.id} to={`/post/${item.id}`} className="popular-news-item">
                        {transformed.image ? (
                          <img src={transformed.image} alt={transformed.title} className="popular-news-image" />
                        ) : (
                          <img src={logo} alt="Logo" className="popular-news-image" />
                        )}
                        <div className="popular-news-content">
                          <span className="popular-news-date">{formatDate(transformed.date)}</span>
                          <h4 className="popular-news-title">{transformed.title}</h4>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>

            <main className="news-main">
              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>Жаңалықтар жүктелуде...</p>
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                  <p>{error}</p>
                </div>
              ) : (
                <>
                  <div className="news-results">
                    <p className="news-count">
                      Табылған жаңалықтар: <strong>{news.length}</strong>
                    </p>
                  </div>

                  <div className="news-grid-page">
                    {paginatedNews.length === 0 ? (
                      <p style={{ textAlign: 'center', padding: '2rem' }}>Жаңалықтар табылмады</p>
                    ) : (
                      paginatedNews.map(item => {
                        const transformed = transformPost(item);
                        return (
                          <Link key={item.id} to={`/post/${item.id}`} className="news-card-page">
                            <div className="news-card-image-wrapper">
                              {transformed.image ? (
                                <img src={transformed.image} alt={transformed.title} className="news-card-image" />
                              ) : (
                                <img src={logo} alt="Logo" className="news-card-image" />
                              )}
                              <div className="news-card-date-badge">{formatDate(transformed.date)}</div>
                            </div>
                            <div className="news-card-content">
                              <h3 className="news-card-title-page">{transformed.title}</h3>
                              <p className="news-card-excerpt">
                                {item.description || transformed.title}
                              </p>
                              <span className="news-card-read-more">Оқуды жалғастыру →</span>
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

export default NewsPage;

