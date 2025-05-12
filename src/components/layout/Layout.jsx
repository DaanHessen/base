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
    } else {
      // Make sure to reset background when not on home page
      setBgImage('');
    }
  }, [currentPath, bgImage]);

  // Force background reload on language change
  useEffect(() => {
    const handleLanguageChange = () => {
      // If on home page, reload background
      if (currentPath === '/') {
        setBgImage('');
        setTimeout(() => {
          setBgImage('/home_placeholder.jpg');
        }, 50);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
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
        className={`fixed inset-0 z-0 transition-opacity duration-300 ease-in-out bg-onyx bg-center bg-cover bg-no-repeat ${isHomePage ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'fixed-bg' : 'bg-fixed-custom'}`}
        style={{
          backgroundImage: `url(${bgImage || '/home_placeholder.jpg'})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          boxShadow: 'inset 0 0 0 2000px rgba(62, 62, 62, 0.6)'
        }}
      ></div>
      
      {isHomePage && isMobile && (
        <div className="bg-fixed-container">
          <div 
            style={{
              backgroundImage: `url(${bgImage || '/home_placeholder.jpg'})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              boxShadow: 'inset 0 0 0 2000px rgba(62, 62, 62, 0.6)',
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            className="fixed-bg"
          ></div>
        </div>
      )}
      
      <div className="relative z-10 flex flex-col min-h-screen overflow-x-hidden">
        <Helmet>
          <html lang={currentLang} />
          <title>{t('seo.title')}</title>
          <meta name="description" content={t('seo.description')} />
          <meta name="keywords" content={t('seo.keywords')} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          
          {/* Security headers - Reverted for basic Google Maps */}
          <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https:; frame-src 'self' https://maps.google.com/;" />
          <meta http-equiv="X-Content-Type-Options" content="nosniff" />
          <meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
          <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
          
          {/* Add CSS fix for mobile devices */}
          <style>
            {`
              @media (max-width: 767px) {
                /* Fix iOS 100vh issue with custom viewport height */
                .bg-fixed-container, 
                [style*="height: 100vh"] {
                  height: calc(var(--vh, 1vh) * 100) !important;
                }
                
                /* Prevent content overflow */
                .overflow-container {
                  max-width: 100vw;
                  overflow-x: hidden;
                  word-break: break-word;
                }
                
                /* Ensure text is visible and not cut off */
                h1, h2, h3, p {
                  max-width: 100%;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                }
                
                /* Styling for fixed-nav to ensure background is visible on mobile */
                nav.fixed-nav {
                  transform: translateZ(0);
                  -webkit-transform: translateZ(0);
                  backface-visibility: hidden;
                  perspective: 1000;
                  will-change: transform;
                }
                
                /* Force background color on mobile navbar when scrolled */
                nav.fixed-nav[data-scrolled="true"] {
                  background-color: rgba(62, 62, 62, 0.95) !important;
                  backdrop-filter: blur(4px);
                  -webkit-backdrop-filter: blur(4px);
                }
                
                /* Force background to maintain position and size */
                .bg-fixed-container {
                  height: calc(var(--vh, 1vh) * 100) !important;
                  overflow: hidden;
                  position: fixed;
                  width: 100%;
                  top: 0;
                  left: 0;
                  z-index: -2;
                }
              }
              
              /* Ensure loading on orientation change */
              @media (orientation: landscape) {
                .bg-fixed-container {
                  min-height: 100%;
                }
              }
            `}
          </style>
          
          <link rel="canonical" href={`${window.location.origin}${currentLang === 'en' ? '/en' : ''}${currentPath}`} />
          {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/en${currentPath}`} />}
          {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}${currentPath}`} />}
          
          {/* Open Graph metadata */}
          <meta property="og:site_name" content="BASE" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${window.location.origin}${currentLang === 'en' ? '/en' : ''}${currentPath}`} />
          <meta property="og:title" content={t('seo.title')} />
          <meta property="og:description" content={t('seo.description')} />
          <meta property="og:image" content={`${window.location.origin}/og-image.jpg`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          
          {/* Twitter Card metadata */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t('seo.title')} />
          <meta name="twitter:description" content={t('seo.description')} />
          <meta name="twitter:image" content={`${window.location.origin}/og-image.jpg`} />
          
          {/* Additional SEO tags */}
          <meta name="robots" content="index, follow" />
          <meta name="author" content="BASE Restaurant & bar" />
          <meta name="geo.region" content="NL" />
          <meta name="geo.placename" content="Hilversum" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Helmet>
        <Navbar />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
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
