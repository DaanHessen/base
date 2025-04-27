import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo';

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [wasScrolled, setWasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const menuDropdownRef = useRef(null);
  const menuTimeoutRef = useRef(null); // Ref for hover timeout
  const scrollTimeoutRef = useRef(null); // Ref for scroll timeout
  
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;

  // Extract the base path without language prefix
  const getBasePath = (path) => {
    if (path.startsWith('/en')) return path.substring(3);
    return path;
  };
  
  const currentPath = getBasePath(location.pathname);
  
  // Get the right paths for different languages
  const getLocalizedPath = (basePath, lang) => {
    if (lang === 'en') return `/en${basePath}`;
    return basePath;
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Only set scrolled to true immediately when scrolling down from top
    if (currentScrollY > 10 && !scrolled) {
      setScrolled(true);
      setWasScrolled(true);
    }
    
    // When scrolling back to top, track wasScrolled but delay removing the background
    if (currentScrollY <= 10 && scrolled) {
      clearTimeout(scrollTimeoutRef.current);
      
      // Remove background immediately at top
      setScrolled(false);
      setWasScrolled(false);
    }
  }, [scrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Disable body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
      document.body.style.overflow = '';
    };
  }, [handleScroll, mobileMenuOpen]);
  
  const changeLanguage = useCallback((lang) => {
    i18n.changeLanguage(lang);
    setLangDropdownOpen(false);
  }, [i18n]);

  const toggleLangDropdown = useCallback(() => setLangDropdownOpen(prev => !prev), []);
  
  // Menu Dropdown Hover/Click Logic
  const openMenuDropdown = useCallback(() => {
    clearTimeout(menuTimeoutRef.current);
    setMenuDropdownOpen(true);
  }, []);

  const closeMenuDropdown = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => {
      setMenuDropdownOpen(false);
    }, 50); // Reduced delay for faster menu closing
  }, []);
  
  const toggleMenuDropdownOnClick = useCallback(() => {
    clearTimeout(menuTimeoutRef.current); // Clear timeout if clicked
    setMenuDropdownOpen(prev => !prev);
  }, []);
  
  const handleMenuLinkClick = useCallback(() => {
    setMenuDropdownOpen(false);
    
    // Scroll to the top of the page when menu is clicked
    if (currentPath === '/menu' || currentPath === '/menu/food' || currentPath === '/menu/drinks') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPath]);

  // Clear timeout on unmount
  useEffect(() => () => clearTimeout(menuTimeoutRef.current), []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) {
        // Don't close immediately if hover is active
        if (!menuDropdownRef.current?.matches(':hover')) { 
           setMenuDropdownOpen(false); 
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-onyx/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          {/* Left side menu items (desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={getLocalizedPath('/', currentLang)}
              className={`font-medium ${
                currentPath === '/' 
                  ? 'text-gold' 
                  : 'text-magnolia hover:text-gold transition-colors duration-300'
              }`}
            >
              {t('navigation.home')}
            </Link>
            
            {/* Menu Dropdown Container (Handles Hover) */}
            <div 
              className="relative" 
              ref={menuDropdownRef}
              onMouseEnter={openMenuDropdown}
              onMouseLeave={closeMenuDropdown}
            >
              <Link
                to={getLocalizedPath('/menu', currentLang)}
                onClick={handleMenuLinkClick}
                className={`font-medium inline-flex items-center ${
                  currentPath === '/menu' || currentPath === '/menu/food' || currentPath === '/menu/drinks'
                    ? 'text-gold' 
                    : 'text-magnolia hover:text-gold transition-colors duration-300'
                }`}
                aria-expanded={menuDropdownOpen}
              >
                {t('navigation.menu')}
                <svg 
                  className={`ml-1 h-4 w-4 text-gold transition-transform duration-300 ${menuDropdownOpen ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <AnimatePresence>
                {menuDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1 }} // Faster dropdown animation
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-onyx border border-gold/20 backdrop-blur-sm ring-1 ring-gold/30 z-50 py-1 overflow-hidden"
                  >
                    <Link
                      to={getLocalizedPath('/menu/food', currentLang)}
                      onClick={handleMenuLinkClick}
                      className={`block px-4 py-2.5 text-sm ${
                        currentPath === '/menu' || currentPath === '/menu/food' 
                          ? 'text-gold bg-caribbean-current/40' 
                          : 'text-magnolia hover:text-gold hover:bg-caribbean-current/60'
                      } transition-all duration-150 w-full text-left`} // Faster transition
                    >
                      <div className="flex items-center">
                        <span className="mr-2 text-gold">🍽️</span>
                        {currentLang === 'nl' ? 'Eten' : 'Food'}
                      </div>
                    </Link>
                    <Link
                      to={getLocalizedPath('/menu/drinks', currentLang)}
                      onClick={handleMenuLinkClick}
                      className={`block px-4 py-2.5 text-sm ${
                        currentPath === '/menu/drinks' 
                          ? 'text-gold bg-caribbean-current/40' 
                          : 'text-magnolia hover:text-gold hover:bg-caribbean-current/60'
                      } transition-all duration-150 w-full text-left`} // Faster transition
                    >
                      <div className="flex items-center">
                        <span className="mr-2 text-gold">🍹</span>
                        {currentLang === 'nl' ? 'Dranken' : 'Drinks'}
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link
              to={getLocalizedPath('/about', currentLang)}
              className={`font-medium inline-flex items-center ${
                currentPath === '/about' 
                  ? 'text-gold' 
                  : 'text-magnolia hover:text-gold transition-colors duration-300'
              }`}
            >
              {t('navigation.about')}
            </Link>
          </div>
          
          {/* Center logo (absolute positioning for perfect centering) */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 z-50">
            <Link to={getLocalizedPath('/', currentLang)} className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          
          {/* Right side language dropdown */}
          <div className="hidden md:flex items-center">
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={toggleLangDropdown}
                className="inline-flex items-center px-3 py-1.5 border border-gold/30 rounded-md text-magnolia bg-onyx/70 hover:bg-onyx/90 transition-all duration-300 shadow-sm hover:shadow-gold/10"
                aria-expanded={langDropdownOpen}
              >
                <span className="mr-1.5 font-medium text-sm">{currentLang === 'nl' ? '🇳🇱 NL' : '🇬🇧 EN'}</span>
                <svg 
                  className={`h-3.5 w-3.5 text-gold transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-onyx border border-gold/20 backdrop-blur-sm ring-1 ring-gold/30 z-50 overflow-hidden"
                  >
                    <div className="p-2 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => changeLanguage('nl')}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                          currentLang === 'nl' ? 'bg-gold text-onyx' : 'bg-caribbean-current/60 border border-gold/20 text-magnolia hover:bg-caribbean-current/40'
                        } transition-all duration-150 justify-center`}
                      >
                        <span className="mr-2">🇳🇱</span>
                        Nederlands
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                          currentLang === 'en' ? 'bg-gold text-onyx' : 'bg-caribbean-current/60 border border-gold/20 text-magnolia hover:bg-caribbean-current/40'
                        } transition-all duration-150 justify-center`}
                      >
                        <span className="mr-2">🇬🇧</span>
                        English
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-magnolia hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/30 relative z-50"
              aria-expanded={mobileMenuOpen}
            >
              {/* Hamburger/Close Icons */} 
              <svg className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              <svg className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - improved fullscreen design */} 
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-onyx/95 to-onyx/90 backdrop-blur-md flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex-1 flex flex-col justify-center px-6 py-4">              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-6 max-w-sm mx-auto"
              >
                <Link
                  to={getLocalizedPath('/', currentLang)}
                  className={`block py-3 text-center text-xl font-medium rounded-lg ${
                    currentPath === '/' 
                      ? 'text-onyx bg-gold shadow-md' 
                      : 'text-gold border border-gold/30 hover:bg-gold/10'
                  } transition-all duration-200`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.home')}
                </Link>
                
                {/* Food Menu Link */}
                <Link
                  to={getLocalizedPath('/menu/food', currentLang)}
                  className={`flex items-center justify-center py-3 text-xl font-medium rounded-lg ${
                    currentPath === '/menu' || currentPath === '/menu/food' 
                      ? 'text-onyx bg-gold shadow-md' 
                      : 'text-gold border border-gold/30 hover:bg-gold/10'
                  } transition-all duration-200`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-2">🍽️</span>
                  {currentLang === 'nl' ? 'Eten' : 'Food'}
                </Link>
                
                {/* Drinks Menu Link */}
                <Link
                  to={getLocalizedPath('/menu/drinks', currentLang)}
                  className={`flex items-center justify-center py-3 text-xl font-medium rounded-lg ${
                    currentPath === '/menu/drinks' 
                      ? 'text-onyx bg-gold shadow-md' 
                      : 'text-gold border border-gold/30 hover:bg-gold/10'
                  } transition-all duration-200`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-2">🍹</span>
                  {currentLang === 'nl' ? 'Dranken' : 'Drinks'}
                </Link>
                
                {/* About Link */}
                <Link
                  to={getLocalizedPath('/about', currentLang)}
                  className={`block py-3 text-center text-xl font-medium rounded-lg ${
                    currentPath === '/about' 
                      ? 'text-onyx bg-gold shadow-md' 
                      : 'text-gold border border-gold/30 hover:bg-gold/10'
                  } transition-all duration-200`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.about')}
                </Link>
              </motion.div>
            </div>
            
            {/* Language Selection at bottom */}
            <div className="pt-4 pb-8 px-6">
              <div className="text-center text-lg font-medium text-gold mb-4">{t('navigation.selectLanguage')}</div>
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <button
                  onClick={() => {
                    changeLanguage('nl');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-3 rounded-lg text-base font-medium flex items-center justify-center ${
                    currentLang === 'nl' 
                      ? 'bg-gold text-onyx' 
                      : 'bg-transparent border border-gold/50 text-gold'
                  } transition-all duration-200`}
                >
                  <span className="mr-2">🇳🇱</span>
                  Nederlands
                </button>
                <button
                  onClick={() => {
                    changeLanguage('en');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-3 rounded-lg text-base font-medium flex items-center justify-center ${
                    currentLang === 'en' 
                      ? 'bg-gold text-onyx' 
                      : 'bg-transparent border border-gold/50 text-gold'
                  } transition-all duration-200`}
                >
                  <span className="mr-2">🇬🇧</span>
                  English
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar; 