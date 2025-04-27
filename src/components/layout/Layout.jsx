import React, { memo, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';
import { motion } from 'framer-motion';

function Layout({ children }) {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  const [bgImage, setBgImage] = useState('');
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const nodeRef = useRef(null); 
  const bgRef = useRef(null);
  
  // Extract the base path without language prefix
  const getBasePath = (path) => {
    if (path.startsWith('/en')) return path.substring(3);
    return path;
  };
  
  const currentPath = getBasePath(location.pathname);

  // Improved background handling
  useEffect(() => {
    const isHome = currentPath === '/';
    setIsHomePage(isHome);
    
    // Preload the image
    if (isHome) {
      const img = new Image();
      img.src = '/home_placeholder.jpg';
      img.onload = () => {
        setBgImage('/home_placeholder.jpg');
      };
      
      // Set fallback in case image doesn't load
      const timeout = setTimeout(() => {
        if (!bgImage) setBgImage('/home_placeholder.jpg');
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      // When leaving homepage, keep the image but apply zero opacity via CSS
      // This prevents the background from disappearing abruptly
    }
  }, [currentPath]);

  return (
    <div className="flex flex-col min-h-screen bg-onyx">
      {/* Background with improved transition */}
      <div 
        ref={bgRef}
        className={`fixed inset-0 z-0 transition-opacity duration-300 ease-in-out bg-onyx bg-center bg-cover bg-no-repeat bg-fixed ${isHomePage ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${bgImage || '/home_placeholder.jpg'})`,
          boxShadow: 'inset 0 0 0 2000px rgba(62, 62, 62, 0.4)'
        }}
      ></div>
      
      {/* Main Content - Ensure it's above the background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Helmet>
          <html lang={currentLang} />
          <title>{t('seo.title')}</title>
          <meta name="description" content={t('seo.description')} />
          <meta name="keywords" content={t('seo.keywords')} />
          <link rel="canonical" href={`${window.location.origin}${currentLang === 'en' ? '/en' : ''}${currentPath}`} />
          {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/en${currentPath}`} />}
          {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}${currentPath}`} />}
        </Helmet>
        <Navbar />
        
        <main className="flex-grow">
          <TransitionGroup component={null}>
            <CSSTransition
              key={location.pathname}
              nodeRef={nodeRef}
              timeout={300} 
              classNames="page-transition"
              unmountOnExit
            >
              <div ref={nodeRef} className="page-content">
                {children}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </div>
  );
}

Layout.displayName = 'Layout';

export default memo(Layout); 