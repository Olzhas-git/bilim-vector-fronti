import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Білім Векторы</h3>
            <p className="footer-description">
              Студенттік клуб - білімге құштарлықты арттыру және идеялармен бөлісу үшін.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Байланыстар</h4>
            <ul className="footer-links">
              <li>
                <Link to="/news">Жаңалықтар</Link>
              </li>
              <li>
                <Link to="/events">Оқиғалар</Link>
              </li>
               <li>
                <Link to="/about-us">Біз туралы</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Байланыс</h4>
            <ul className="footer-contact">
              <li>Абай атындағы Қазақ ұлттық педагогикалық университеті</li>
              <li>Педагогика және психология факультеті</li>
              <li>Бастауыш білім беру кафедрасы</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Әлеуметтік желілер</h4>
            <div className="footer-social">
              <a href="https://www.instagram.com/bilim_vectory/?igsh=MTl6cWRya3FiM2tmZA%3D%3D#" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://t.me/bilim_vectory" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Telegram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.169 1.858-.896 6.375-1.266 8.473-.152.896-.527 1.193-.866 1.223-.721.06-1.266-.397-1.963-.777-1.096-.6-1.716-.973-2.78-1.56-1.22-.66-.431-1.023.268-1.616.184-.157 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.118.095.151.223.167.312.016.09.036.293.02.453z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Білім Векторы. Барлық құқықтар қорғалған.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

