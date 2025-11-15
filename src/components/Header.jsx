import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoImage from '../assets/logo.png';
import LoginModal from './LoginModal';
import './Header.css';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <div className="header-top">
        <div className="header-content">
          <div className="logo-section">
            <Link to="/">
              <img src={logoImage} alt="Logo" className="logo-image" />
            </Link>
          </div>
          <div className="header-right">
            {/* <div className="top-nav">
              <a href="#" className="nav-link">Преподавательский состав</a>
              <a href="#" className="nav-link">Медиа</a>
              <a href="#" className="nav-link">Выпускники</a>
              <a href="#" className="nav-link">My NU</a>
            </div> */}
            <div className="header-actions">
              {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#333' }}>
                    {user?.username || user?.email || 'Пайдаланушы'}
                  </span>
                  <button 
                    onClick={logout} 
                    className="social-icon sign-in-icon" 
                    aria-label="Шығу"
                    title="Шығу"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)} 
                  className="social-icon sign-in-icon" 
                  aria-label="Кіру"
                  title="Кіру"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <a href="https://www.instagram.com/bilim_vectory/?igsh=MTl6cWRya3FiM2tmZA%3D%3D#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://t.me/bilim_vectory" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.169 1.858-.896 6.375-1.266 8.473-.152.896-.527 1.193-.866 1.223-.721.06-1.266-.397-1.963-.777-1.096-.6-1.716-.973-2.78-1.56-1.22-.66-.431-1.023.268-1.616.184-.157 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.118.095.151.223.167.312.016.09.036.293.02.453z" fill="currentColor"/>
                </svg>
              </a>
              <div className="language-selector">
                <span>KZ</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              {/* <button className="icon-button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="icon-button menu-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <nav className="main-nav">
        <div className="nav-content">
          <Link to="/news" className="main-nav-link">Жаңалықтар</Link>
          <Link to="/events" className="main-nav-link">Оқиғалар</Link>
          <Link to="/about-us" className="main-nav-link">Біз туралы</Link>
          {/* <a href="#" className="main-nav-link">Поступление</a>
          <a href="#" className="main-nav-link">Обучение</a>
          <a href="#" className="main-nav-link">Наука</a>
          <a href="#" className="main-nav-link">Студенческая жизнь</a>
          <a href="#" className="main-nav-link">Школы</a>
          <a href="#" className="main-nav-link">Институциональный репозиторий</a> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;

