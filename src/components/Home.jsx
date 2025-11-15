import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import NewsSection from './NewsSection';
import EventsSection from './EventsSection';
import { postsAPI, eventsAPI } from '../services/api';
import '../App.css';

const Home = () => {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [postsData, eventsData] = await Promise.all([
          postsAPI.getAll(10, 0).catch(() => []),
          eventsAPI.getAll(10, 0).catch(() => [])
        ]);

        // Transform posts to match NewsSection format
        const transformedNews = (Array.isArray(postsData) ? postsData : []).map(post => ({
          id: post.id,
          date: post.created_at || post.updated_at || new Date().toISOString(),
          title: post.title || post.name || '',
          image: post.image || null,
          type: post.image ? 'large' : 'small',
          category: 'Жаңалық'
        }));

        // Transform events to match EventsSection format
        const transformedEvents = (Array.isArray(eventsData) ? eventsData : []).map(event => {
          const date = new Date(event.date || event.created_at);
          const monthNames = ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел'];
          return {
            id: event.id,
            day: date.getDate().toString(),
            month: monthNames[date.getMonth()] || 'Қар',
            title: event.title || event.name || ''
          };
        });

        setNews(transformedNews);
        setEvents(transformedEvents);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setNews([]);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Жүктелуде...</p>
          </div>
        ) : (
          <>
            <NewsSection news={news} />
            <EventsSection events={events} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;



