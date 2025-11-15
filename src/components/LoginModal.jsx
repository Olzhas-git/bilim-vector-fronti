import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
    if (isLogin) {
      // Handle login
        const result = await login(formData.email, formData.password);
        if (result.success) {
          onClose();
          setFormData({ email: '', password: '', name: '', confirmPassword: '' });
        } else {
          setError(result.error || 'Кіру қатесі');
        }
    } else {
      // Handle registration
      if (formData.password !== formData.confirmPassword) {
          setError('Құпия сөздер сәйкес келмейді');
          setIsSubmitting(false);
        return;
      }
        const result = await register({
          email: formData.email,
          name: formData.name,
          password: formData.password,
        });
        if (result.success) {
          onClose();
          setFormData({ email: '', password: '', name: '', confirmPassword: '' });
        } else {
          setError(result.error || 'Тіркелу қатесі');
        }
      }
    } catch (err) {
      setError(err.message || 'Қате орын алды');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">{isLogin ? 'Кіру' : 'Тіркелу'}</h2>
          <div className="modal-tabs">
            <button
              className={`tab-button ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Кіру
            </button>
            <button
              className={`tab-button ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Тіркелу
            </button>
          </div>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {error && (
            <div className="form-error" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', background: '#fee', borderRadius: '4px' }}>
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Аты-жөні</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Аты-жөніңізді енгізіңіз"
                required={!isLogin}
                disabled={isSubmitting}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Электрондық пошта</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Құпия сөз</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Құпия сөзіңізді енгізіңіз"
              required
              disabled={isSubmitting}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Құпия сөзді растау</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Құпия сөзді қайталаңыз"
                required={!isLogin}
                disabled={isSubmitting}
              />
            </div>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Мені есте сақта</span>
              </label>
              <a href="#" className="forgot-password">Құпия сөзді ұмыттыңыз ба?</a>
            </div>
          )}

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Жүктелуде...' : (isLogin ? 'Кіру' : 'Тіркелу')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

