import React, { memo, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';
import { motion, AnimatePresence } from 'framer-motion';

function Layout({ children }) {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  const [bgImage, setBgImage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  // const nodeRef = useRef(null); 
  const bgRef = useRef(null);
  
  const getBasePath = (path) => {
    if (path.startsWith('/en')) return path.substring(3);
    return path;
  };
  
  const currentPath = getBasePath(location.pathname);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const isHome = currentPath === '/';
    setIsHomePage(isHome);
    
    if (isHome) {
      const img = new Image();
      img.src = '/home_placeholder.jpg';
      img.onload = () => {
        setBgImage('/home_placeholder.jpg');
      };
      
      const timeout = setTimeout(() => {
        if (!bgImage) setBgImage('/home_placeholder.jpg');
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentPath]);

  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-onyx overflow-x-hidden">
      <div 
        ref={bgRef}
        className={`fixed inset-0 z-0 transition-opacity duration-300 ease-in-out bg-onyx bg-center bg-cover bg-no-repeat ${isHomePage ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${bgImage || '/home_placeholder.jpg'})`,
          backgroundPosition: isMobile ? 'center center' : 'center',
          backgroundSize: 'cover',
          boxShadow: 'inset 0 0 0 2000px rgba(62, 62, 62, 0.6)'
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Helmet>
          <html lang={currentLang} />
          <title>{t('seo.title')}</title>
          <meta name="description" content={t('seo.description')} />
          <meta name="keywords" content={t('seo.keywords')} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
          <link rel="canonical" href={`${window.location.origin}${currentLang === 'en' ? '/en' : ''}${currentPath}`} />
          {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/en${currentPath}`} />}
          {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}${currentPath}`} />}
        </Helmet>
        <Navbar />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </div>
  );
}

Layout.displayName = 'Layout';

export default memo(Layout); 