import React, { memo, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  const [bgImage, setBgImage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const bgRef = useRef(null);
  const mainRef = useRef(null);
  const navbarRef = useRef(null);
  const scrollPositionRef = useRef(0);
  
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

  // Handle mobile menu state
  const handleMobileMenuToggle = (isOpen) => {
    setMobileMenuOpen(isOpen);
    
    if (isOpen) {
      const storedScrollY = window.scrollY;
      scrollPositionRef.current = storedScrollY;
      document.body.classList.add('mobile-menu-open');
      document.body.style.top = `-${storedScrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      const scrollYToRestore = scrollPositionRef.current;
      document.body.classList.remove('mobile-menu-open');
      document.body.style.top = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      setTimeout(() => {
        window.scrollTo(0, scrollYToRestore);
      }, 0);
      scrollPositionRef.current = 0;
    }
  };

  // Handle scroll events to set navbar background and show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
        
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Show back to top button when scrolled down 300px
      if (scrollPosition > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Update iOS viewport height variable for proper mobile height
  useEffect(() => {
    const setVh = () => {
      // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  // Clean up mobile menu class when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  useEffect(() => {
    const path = getBasePath(location.pathname);
    setIsHomePage(path === '/');
    
    // Close mobile menu when changing routes
    if (mobileMenuOpen) {
      handleMobileMenuToggle(false);
    }
    
    // Restore scroll position after language change
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
      }, 100);
    }
  }, [location.pathname, mobileMenuOpen, handleMobileMenuToggle]);

  // Load background image for home page
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
      setBgImage('');
    }
  }, [currentPath, bgImage]);

  useEffect(() => {
    const handleLanguageChange = () => {
      if (currentPath === '/') {
        setBgImage('');
        setTimeout(() => {
          setBgImage('/home_placeholder.jpg');
        }, 50);
      }
      
      // Reset language change flag when completed
      if (window.isLanguageChanging) {
        setTimeout(() => {
          window.isLanguageChanging = false;
        }, 300);
      }
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [currentPath, i18n]);

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
    <div className="flex flex-col min-h-screen bg-onyx" id="root-container">
      <Helmet>
        <meta name="theme-color" content="#3e3e3e" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      {/* Background image for home page */}
      {isHomePage && (
        <div 
          ref={bgRef}
          className={`home-background-container ${bgImage ? 'background-loaded' : ''}`}
        >
          <div 
            className="home-background-inner"
            style={{ backgroundImage: `url(${bgImage || '/home_placeholder.jpg'})` }}
          ></div>
          {/* Add white overlay to balance deep-fried effect */}
          <div className="background-overlay"></div>
        </div>
      )}
      
      {/* Navbar */}
      <Navbar 
        ref={navbarRef}
        isScrolled={isScrolled} 
        currentLang={currentLang}
        onMobileMenuToggle={handleMobileMenuToggle}
      />
      
      {/* Main content */}
      <main 
        ref={mainRef}
        className="flex-grow z-10 relative layout-content"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
        
        {/* Mobile scroll helper - improves scrolling to footer on mobile */}
        {isMobile && <div className="mobile-scroll-helper" aria-hidden="true"></div>}
      </main>
      
      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 bg-gold/90 hover:bg-gold text-onyx rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none"
            aria-label={currentLang === 'nl' ? 'Terug naar boven' : 'Back to top'}
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <Footer />
      
      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}

export default memo(Layout); 
