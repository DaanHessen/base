import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import Home from './components/sections/Home';
// import Menu from './components/sections/Menu';
import FoodMenu from './components/sections/FoodMenu';
import DrinksMenu from './components/sections/DrinksMenu';
import AboutUs from './components/sections/AboutUs';
import Reservations from './components/sections/Reservations';

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const AppContent = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const initialMount = useRef(true);
  
  useEffect(() => {
    const isEnglishPath = location.pathname.startsWith('/en');
    const currentLang = i18n.language;
    
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    
    if ((isEnglishPath && currentLang !== 'en') || (!isEnglishPath && currentLang === 'en')) {
      i18n.changeLanguage(isEnglishPath ? 'en' : 'nl');
    }
  }, [location.pathname, i18n]);
  
  return (
    <Routes location={location}>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/menu" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/menu/food" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/menu/drinks" element={<Layout><DrinksMenu /></Layout>} />
      <Route path="/about" element={<Layout><AboutUs /></Layout>} />
      <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
      
      <Route path="/en" element={<Layout><Home /></Layout>} />
      <Route path="/en/menu" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/en/menu/food" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/en/menu/drinks" element={<Layout><DrinksMenu /></Layout>} />
      <Route path="/en/about" element={<Layout><AboutUs /></Layout>} />
      <Route path="/en/reservations" element={<Layout><Reservations /></Layout>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  useEffect(() => {
    const setVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVhVariable();

    window.addEventListener('resize', setVhVariable);
    window.addEventListener('orientationchange', setVhVariable);

    return () => {
      window.removeEventListener('resize', setVhVariable);
      window.removeEventListener('orientationchange', setVhVariable);
    };
  }, []);

  return (
    <Router>
      <AppContent />
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
