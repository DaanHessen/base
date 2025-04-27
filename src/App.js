import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import Home from './components/sections/Home';
import Menu from './components/sections/Menu';
import FoodMenu from './components/sections/FoodMenu';
import DrinksMenu from './components/sections/DrinksMenu';
import AboutUs from './components/sections/AboutUs';

const AppContent = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const lang = pathSegments[1] === 'en' ? 'en' : 'nl';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [location.pathname, i18n]);
  
  return (
    <Routes location={location}>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/menu" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/menu/food" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/menu/drinks" element={<Layout><DrinksMenu /></Layout>} />
      <Route path="/about" element={<Layout><AboutUs /></Layout>} />
      
      <Route path="/en" element={<Layout><Home /></Layout>} />
      <Route path="/en/menu" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/en/menu/food" element={<Layout><FoodMenu /></Layout>} />
      <Route path="/en/menu/drinks" element={<Layout><DrinksMenu /></Layout>} />
      <Route path="/en/about" element={<Layout><AboutUs /></Layout>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
