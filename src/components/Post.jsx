import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { postsAPI } from '../services/api';
import './Post.css';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await postsAPI.getById(id);
        setPost(data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Жаңалықты жүктеу қатесі');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="app">
        <Header />
        <div className="post-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Жаңалық жүктелуде...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="app">
        <Header />
        <div className="post-container">
          <div className="post-not-found">
            <h2>{error || 'Жаңалық табылмады'}</h2>
            <button onClick={() => navigate('/')} className="back-button">
              Басты бетке оралу
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="post-container">
        <button onClick={() => navigate('/')} className="back-button">
          ← Артқа
        </button>
        <article className="post">
          {post.image && (
            <div className="post-image-container">
              <img src={post.image} alt={post.title || post.name} className="post-image" />
            </div>
          )}
          <div className="post-content">
            <div className="post-meta">
              <span className="post-date">{formatDate(post.created_at || post.updated_at)}</span>
            </div>
            <h1 className="post-title">{post.title || post.name}</h1>
            <div className="post-body">
              {post.description ? (
                <div dangerouslySetInnerHTML={{ __html: post.description.replace(/\n/g, '<br />') }} />
              ) : (
                <p>Мазмұн қосылмаған.</p>
              )}
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default Post;

