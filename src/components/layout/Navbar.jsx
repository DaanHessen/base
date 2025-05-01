import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUtensils, FaCocktail, FaInfoCircle } from 'react-icons/fa';
import { setLanguage } from '../../utils/language';
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
  const menuTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const scrollPositionRef = useRef(0);
  
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;

  const getBasePath = (path) => {
    if (path.startsWith('/en')) return path.substring(3);
    return path;
  };
  
  const currentPath = getBasePath(location.pathname);
  
  const getLocalizedPath = (basePath, lang) => {
    if (lang === 'en') return `/en${basePath}`;
    return basePath;
  };

  useEffect(() => {
    // Detect if we need to redirect based on URL and current language
    const shouldRedirect = (
      (currentLang === 'en' && !location.pathname.startsWith('/en')) ||
      (currentLang === 'nl' && location.pathname.startsWith('/en'))
    );
    
    if (shouldRedirect) {
      const newPath = currentLang === 'en'
        ? `/en${location.pathname}`
        : location.pathname.replace(/^\/en/, '');
      
      // Use history.replace to avoid creating a new history entry
      window.history.replaceState({}, '', newPath + location.search + location.hash);
    }
  }, [currentLang, location.pathname]);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 10 && !scrolled) {
      setScrolled(true);
      setWasScrolled(true);
    }
    
    if (currentScrollY <= 10 && scrolled) {
      // Remove timeout to eliminate the delay
      setScrolled(false);
      setWasScrolled(false);
    }
  }, [scrolled]);

  useEffect(() => {
    // Use requestAnimationFrame for smoother scrolling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    
    if (mobileMenuOpen) {
      // Store current scroll position before locking
      scrollPositionRef.current = window.scrollY;
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed'; // Use fixed to prevent jump
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position after unlocking
      const scrollY = scrollPositionRef.current;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Only scroll if position was saved
      if (scrollY > 0) {
        window.scrollTo(0, scrollY);
      }
      // Reset scroll position ref
      scrollPositionRef.current = 0;
    }
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      clearTimeout(scrollTimeoutRef.current);
      // Ensure we clean up body styles on component unmount or when menu closes
      if (document.body.style.position === 'fixed') { // Only reset if we set it
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        // No need to scroll here, focus is on cleanup
      }
    };
  }, [handleScroll, mobileMenuOpen]);
  
  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  }, []);

  const toggleLangDropdown = useCallback(() => setLangDropdownOpen(prev => !prev), []);
  
  const openMenuDropdown = useCallback(() => {
    clearTimeout(menuTimeoutRef.current);
    setMenuDropdownOpen(true);
  }, []);

  const closeMenuDropdown = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => {
      setMenuDropdownOpen(false);
    }, 50);
  }, []);
  
  const handleMenuLinkClick = useCallback(() => {
    setMenuDropdownOpen(false);
    
    if (currentPath === '/menu' || currentPath === '/menu/food' || currentPath === '/menu/drinks') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPath]);

  useEffect(() => () => clearTimeout(menuTimeoutRef.current), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) {
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
  
  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1]
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };
  
  const mobileMenuItemVariants = {
    closed: { 
      opacity: 0, 
      y: 10,
      transition: { duration: 0.2 }  
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 } 
    }
  };
  
  // Lang dropdown mobile animation variants
  const langDropdownMobileVariants = {
    closed: { 
      opacity: 0,
      y: -10,
      height: 0,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out will-change-transform ${
        scrolled ? 'bg-onyx/95 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-5 md:py-10'
      }`}
      style={{
        transform: `translate3d(0, 0, 0)`,
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16 md:h-18">
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
                    transition={{ duration: 0.1 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-onyx/90 border border-gold/30 backdrop-blur-md ring-1 ring-gold/20 z-50 py-1 overflow-hidden"
                  >
                    <Link
                      to={getLocalizedPath('/menu/food', currentLang)}
                      onClick={handleMenuLinkClick}
                      className={`block px-4 py-2.5 text-sm ${
                        currentPath === '/menu' || currentPath === '/menu/food' 
                          ? 'text-gold bg-onyx/80' 
                          : 'text-magnolia hover:text-gold hover:bg-onyx/70'
                      } transition-all duration-150 w-full text-left`}
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
                          ? 'text-gold bg-onyx/80' 
                          : 'text-magnolia hover:text-gold hover:bg-onyx/70'
                      } transition-all duration-150 w-full text-left`}
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
          
          <div className="absolute left-1/2 top-1 transform -translate-x-1/2 z-10">
            <Link to={getLocalizedPath('/', currentLang)} className="flex-shrink-0 relative">
              <Logo />
            </Link>
          </div>
          
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
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-onyx/90 border border-gold/30 backdrop-blur-md ring-1 ring-gold/20 z-50 overflow-hidden"
                  >
                    <div className="p-3 grid grid-cols-1 gap-2">
                      <button
                        onClick={() => changeLanguage('nl')}
                        className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center ${
                          currentLang === 'nl' ? 'bg-gold text-onyx shadow-md' : 'bg-onyx/80 border border-gold/30 text-magnolia hover:text-gold hover:border-gold/50'
                        } transition-all duration-150 justify-center`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-base">🇳🇱</span>
                          <span>Nederlands</span>
                        </div>
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center ${
                          currentLang === 'en' ? 'bg-gold text-onyx shadow-md' : 'bg-onyx/80 border border-gold/30 text-magnolia hover:text-gold hover:border-gold/50'
                        } transition-all duration-150 justify-center`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-base">🇬🇧</span>
                          <span>English</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Mobile - Hamburger Button (Left) & Language Button (Right) - Always visible */} 
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Hamburger/Close Button Container */}
            <button
              onClick={toggleMobileMenu}
              className="relative z-[1000] inline-flex items-center justify-center p-2 rounded-md text-magnolia hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/30 h-10 w-10 bg-onyx/70 border border-gold/30"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                initial={false}
                className="space-y-1.5"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 },
                  }}
                  className="block h-0.5 w-5 bg-current"
                ></motion.span>
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="block h-0.5 w-5 bg-current"
                ></motion.span>
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 },
                  }}
                  className="block h-0.5 w-5 bg-current"
                ></motion.span>
              </motion.div>
            </button>

            {/* Mobile language switcher */} 
            <div className="relative">
              <button
                onClick={toggleLangDropdown}
                className="flex items-center justify-center h-10 px-3 rounded-md bg-onyx/70 border border-gold/30 shadow-sm"
                aria-label={`Switch language from ${currentLang === 'nl' ? 'Dutch' : 'English'}`}
              >
                <span className="text-base mr-1.5">{currentLang === 'nl' ? '🇳🇱' : '🇬🇧'}</span>
                <span className="text-sm text-magnolia">{currentLang === 'nl' ? 'NL' : 'EN'}</span>
              </button>
              
              {/* Mobile language dropdown inline */}
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    variants={langDropdownMobileVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute right-0 top-12 w-36 rounded-md shadow-lg bg-onyx/95 border border-gold/30 backdrop-blur-lg z-40 overflow-hidden"
                    ref={langDropdownRef}
                  >
                    <div className="p-2 flex flex-col gap-1">
                      <button
                        onClick={() => changeLanguage('nl')}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${currentLang === 'nl' ? 'bg-gold/90 text-onyx shadow-md' : 'bg-onyx/80 text-magnolia hover:bg-onyx/60'} transition-all duration-150 justify-center`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-base">🇳🇱</span>
                          <span>Nederlands</span>
                        </div>
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${currentLang === 'en' ? 'bg-gold/90 text-onyx shadow-md' : 'bg-onyx/80 text-magnolia hover:bg-onyx/60'} transition-all duration-150 justify-center`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-base">🇬🇧</span>
                          <span>English</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu Overlay - Takes full screen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            // Use fixed positioning, ensure high z-index, cover full screen
            className="md:hidden fixed inset-0 bg-onyx/95 backdrop-blur-sm shadow-xl z-[999] h-screen overflow-y-auto pt-20"
            // Added pt-20 to push content below the fixed header buttons
          >
            <div className="absolute inset-0 bg-pattern opacity-5 z-0"></div>
            
            {/* Mobile Navigation Links: Centered vertically and horizontally within the remaining space */}
            <div 
              className="relative z-10 min-h-full flex flex-col items-center justify-center pb-20" // Added pb-20 to balance pt-20
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="w-full max-w-xs mx-auto px-4 flex flex-col items-center">
                 {/* Links remain the same structure */}
                 <motion.div variants={mobileMenuItemVariants} className="w-full text-center">
                  <Link
                    to={getLocalizedPath('/', currentLang)}
                    className={`flex items-center justify-center text-xl font-medium py-4 ${
                      currentPath === '/' 
                        ? 'text-gold' 
                        : 'text-magnolia hover:text-gold'
                    } transition-all duration-200`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaHome className="mr-3 text-gold/80" />
                    {t('navigation.home')}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileMenuItemVariants} className="w-full text-center border-t border-gold/10 mt-2 pt-2">
                  <Link
                    to={getLocalizedPath('/menu/food', currentLang)}
                    className={`flex items-center justify-center text-xl font-medium py-4 ${
                      currentPath === '/menu' || currentPath === '/menu/food' 
                        ? 'text-gold' 
                        : 'text-magnolia hover:text-gold'
                    } transition-all duration-200`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUtensils className="mr-3 text-gold/80" />
                    {currentLang === 'nl' ? 'Eten' : 'Food'}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileMenuItemVariants} className="w-full text-center border-t border-gold/10 mt-2 pt-2">
                  <Link
                    to={getLocalizedPath('/menu/drinks', currentLang)}
                    className={`flex items-center justify-center text-xl font-medium py-4 ${
                      currentPath === '/menu/drinks' 
                        ? 'text-gold' 
                        : 'text-magnolia hover:text-gold'
                    } transition-all duration-200`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaCocktail className="mr-3 text-gold/80" />
                    {currentLang === 'nl' ? 'Dranken' : 'Drinks'}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileMenuItemVariants} className="w-full text-center border-t border-gold/10 mt-2 pt-2">
                  <Link
                    to={getLocalizedPath('/about', currentLang)}
                    className={`flex items-center justify-center text-xl font-medium py-4 ${
                      currentPath === '/about' 
                        ? 'text-gold' 
                        : 'text-magnolia hover:text-gold'
                    } transition-all duration-200`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaInfoCircle className="mr-3 text-gold/80" />
                    {t('navigation.about')}
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar; 