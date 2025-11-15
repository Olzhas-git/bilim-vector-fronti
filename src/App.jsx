import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import Post from './components/Post';
import AboutUs from './components/AboutUs';
import EventDetail from './components/EventDetail';
import NewsPage from './components/NewsPage';
import EventsPage from './components/EventsPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

