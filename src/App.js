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
// import { Analytics } from "@vercel/analytics/react";

const AppContent = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const initialMount = useRef(true);
  
  useEffect(() => {
    // Hash router already has # in the path, so we don't need to handle /en twice
    // Just check if the path after # contains 'en'
    const isEnglishPath = location.pathname.startsWith('/en');
    const currentLang = i18n.language;
    
    if (initialMount.current) {
      initialMount.current = false;
      // On initial load, set language based on stored preference, not URL
      return;
    }
    
    if ((isEnglishPath && currentLang !== 'en') || (!isEnglishPath && currentLang === 'en')) {
      i18n.changeLanguage(isEnglishPath ? 'en' : 'nl');
    }
  }, [location.pathname, i18n]);
  
  return (
    <Routes location={location}>
      {/* We don't need separate routes for each language since HashRouter handles paths differently */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/menu" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/menu/food" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/menu/drinks" element={<Layout><DrinksMenu /></Layout>} />
      <Route path="/about" element={<Layout><AboutUs /></Layout>} />
      <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
      
      {/* Keep these for direct loading of English URLs */}
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
  // Handle mobile viewport height calculation
  useEffect(() => {
    // Fix for mobile viewport height issues
    const setVhVariable = () => {
      // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set the initial value
    setVhVariable();

    // Add event listener for window resize
    window.addEventListener('resize', setVhVariable);
    window.addEventListener('orientationchange', setVhVariable);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setVhVariable);
      window.removeEventListener('orientationchange', setVhVariable);
    };
  }, []);

  return (
    <Router>
      <AppContent />
      {/* <Analytics /> */}
    </Router>
  );
}

export default App;
