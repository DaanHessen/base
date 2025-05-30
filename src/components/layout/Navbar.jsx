import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUtensils, FaCocktail, FaInfoCircle } from 'react-icons/fa';
import { setLanguage } from '../../utils/language';
import Logo from '../Logo';

const Navbar = React.forwardRef(({ isScrolled: initialIsScrolled, currentLang: propCurrentLang }, ref) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(initialIsScrolled || false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const langDropdownRef = useRef(null);
  const menuDropdownRef = useRef(null);
  const menuTimeoutRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const navRef = useRef(null);
  
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
    const isInvalidUrl = (
      (currentLang === 'en' && !location.pathname.startsWith('/en')) ||
      (currentLang === 'nl' && location.pathname.startsWith('/en'))
    );
    
    const hasDoubleEn = location.pathname.startsWith('/en') && location.hash.includes('#/en');
    
    if (isInvalidUrl || hasDoubleEn) {
      const basePath = getBasePath(location.pathname);
      const newPath = currentLang === 'en'
        ? `/en${basePath}`
        : basePath;
      
      window.location.replace(`/#${newPath}`);
    }
  }, [currentLang, location.pathname, location.hash]);

  // Use the scrolled state from Layout component via props
  useEffect(() => {
    setScrolled(initialIsScrolled);
  }, [initialIsScrolled]);

  useEffect(() => {
    if (mobileMenuOpen) {
      const storedScrollY = window.scrollY;
      scrollPositionRef.current = storedScrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${storedScrollY}px`;
      document.body.style.width = '100%';
    } else {
      if (document.body.style.position === 'fixed') {
        const scrollYToRestore = scrollPositionRef.current;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (scrollYToRestore > 0) {
          window.scrollTo(0, scrollYToRestore);
        }
        scrollPositionRef.current = 0;
      }
    }
    
    return () => {
      if (document.body.style.position === 'fixed') {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      }
    };
  }, [mobileMenuOpen]);
  
  const changeLanguage = useCallback((lang) => {
    setLangDropdownOpen(false);
    
    const basePath = getBasePath(location.pathname);
    
    setLanguage(lang);
    
    const newPath = lang === 'en' 
      ? `/en${basePath}` 
      : basePath;
    
    window.location.replace(`/#${newPath}`);
    
    window.location.reload();
  }, [location.pathname]);

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
  }, []);

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

  const topBarVariants = {
    closed: { rotate: 0, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { rotate: 45, y: 5, transition: { duration: 0.3, ease: "easeInOut" } }, 
  };
  const middleBarVariants = {
    closed: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { opacity: 0, transition: { duration: 0.08, ease: "easeInOut" } },
  };
  const bottomBarVariants = {
    closed: { rotate: 0, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { rotate: -45, y: -6, transition: { duration: 0.3, ease: "easeInOut" } }, 
  };

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsNarrowScreen(window.innerWidth <= 1159);
    };
    
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    const applyScrolledStyle = (element, isScrolled) => {
      if (!element) return;
      
      element.setAttribute('data-scrolled', isScrolled ? 'true' : 'false');
      
      if (isScrolled) {
        element.style.backgroundColor = 'rgba(62, 62, 62, 0.95)';
        element.style.backdropFilter = 'blur(4px)';
        element.style.webkitBackdropFilter = 'blur(4px)';
      } else {
        element.style.backgroundColor = 'transparent';
        element.style.backdropFilter = 'none';
        element.style.webkitBackdropFilter = 'none';
      }
    };
    
    if (navRef.current) {
      applyScrolledStyle(navRef.current, scrolled);
    }
    
    if (ref && ref.current) {
      applyScrolledStyle(ref.current, scrolled);
    }
  }, [scrolled, ref]);

  useEffect(() => {
    setScrolled(initialIsScrolled);
  }, [initialIsScrolled]);

  return (
    <nav 
      ref={ref}
      className={`fixed-nav fixed top-0 left-0 right-0 z-50 py-4 ${
        scrolled ? 'bg-onyx/95 backdrop-blur-sm' : 'bg-transparent'
      } transition-all duration-300 ease-in-out`}
      data-scrolled={scrolled ? 'true' : 'false'}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        backgroundColor: scrolled ? 'rgba(62, 62, 62, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(4px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(4px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center xl:hidden">
            <button
              onClick={toggleMobileMenu}
              className="relative z-[1001] inline-flex items-center justify-center p-2 rounded-md text-magnolia hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/30 h-10 w-10 bg-onyx/70 border border-gold/30"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div 
                animate={mobileMenuOpen ? "open" : "closed"} 
                initial={false}
                className="flex flex-col justify-between w-5 h-3.5"
              >
                <motion.span
                  variants={topBarVariants}
                  className="block h-0.5 w-full bg-current rounded-full"
                  style={{ originX: "0.5", originY: "0" }}
                ></motion.span>
                <motion.span
                  variants={middleBarVariants}
                  className="block h-0.5 w-full bg-current rounded-full"
                ></motion.span>
                <motion.span
                  variants={bottomBarVariants}
                  className="block h-0.5 w-full bg-current rounded-full"
                  style={{ originX: "0.5", originY: "1" }}
                ></motion.span>
              </motion.div>
            </button>
          </div>
          <div className="hidden xl:flex items-center space-x-8">
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
              className={`font-medium ${
                currentPath === '/about' 
                  ? 'text-gold' 
                  : 'text-magnolia hover:text-gold transition-colors duration-300'
              }`}
            >
              {t('navigation.about')}
            </Link>

            <Link
              to={getLocalizedPath('/reservations', currentLang)}
              className={`font-medium ${
                currentPath === '/reservations' 
                  ? 'text-gold' 
                  : 'text-magnolia hover:text-gold transition-colors duration-300'
              }`}
            >
              {t('navigation.reservations')}
            </Link>
          </div>
          
          <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 transition-all duration-300 ease-out ${
            scrolled 
              ? '-translate-y-1/2 scale-75 lg:scale-75' 
              : '-translate-y-[45%] scale-90 lg:scale-100'
          } z-10`}>
            <Link to={getLocalizedPath('/', currentLang)} className="flex-shrink-0 relative">
              <div className={`logo-container navbar-logo ${scrolled ? 'py-1' : 'py-2'}`}> 
                <Logo className={`transition-transform duration-300 ease-out`} /> 
              </div>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="hidden xl:block relative" ref={langDropdownRef}>
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
                          currentLang === 'nl' ? 'bg-gold text-onyx shadow-md' : 'bg-onyx/80 border border-gold/30 text-magnolia hover:text-gold hover:border-gold/50'} transition-all duration-150 justify-center`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-base">🇳🇱</span>
                          <span>Nederlands</span>
                        </div>
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center ${
                          currentLang === 'en' ? 'bg-gold text-onyx shadow-md' : 'bg-onyx/80 border border-gold/30 text-magnolia hover:text-gold hover:border-gold/50'} transition-all duration-150 justify-center`}
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
            <div className="md:hidden relative">
              <button
                onClick={toggleLangDropdown}
                className="flex items-center justify-center h-10 px-3 rounded-md bg-onyx/70 border border-gold/30 shadow-sm"
                aria-label={`Switch language from ${currentLang === 'nl' ? 'Dutch' : 'English'}`}
              >
                <span className="text-base mr-1.5">{currentLang === 'nl' ? '🇳🇱' : '🇬🇧'}</span>
                <span className="text-sm text-magnolia">{currentLang === 'nl' ? 'NL' : 'EN'}</span>
              </button>
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
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden fixed inset-0 bg-onyx/95 backdrop-blur-sm shadow-xl z-[1000] h-screen overflow-y-auto pt-16"
          >
            <div className="absolute inset-0 bg-pattern opacity-5 z-0"></div>
            
            <div 
              className="relative z-10 min-h-full flex flex-col items-center justify-center pb-16"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="w-full max-w-xs mx-auto px-4 flex flex-col items-center">
                <motion.div variants={mobileMenuItemVariants} className="w-full text-center">
                  <Link
                    to={getLocalizedPath('/', currentLang)}
                    className={`flex items-center justify-center text-base font-medium py-2.5 px-4 ${
                      currentPath === '/' 
                        ? 'text-gold' 
                        : 'text-magnolia hover:text-gold'
                    } transition-all duration-200 max-w-[160px] mx-auto rounded-lg bg-onyx/40`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaHome className="mr-2 text-gold/80" />
                    {t('navigation.home')}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileMenuItemVariants} className="w-full text-center border-t border-gold/10 mt-1 pt-1">
                  <Link
                    to={getLocalizedPath('/menu/food', currentLang)}
                    className={`flex items-center justify-center text-base font-medium py-2.5 px-4 ${
                      currentPath === '/menu' || currentPath === '/menu/food' 
                        ? 'text-gold' 
                        : 'text-magnolia hover:text-gold'
                    } transition-all duration-200 max-w-[160px] mx-auto rounded-lg bg-onyx/40`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUtensils className="mr-2 text-gold/80" />
                    {currentLang === 'nl' ? 'Eten' : 'Food'}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileMenuItemVariants} className="w-full text-center border-t border-gold/10 mt-1 pt-1">
                  <Link
                    to={getLocalizedPath('/menu/drinks', currentLang)}
                    className={`flex items-center justify-center text-base font-medium py-2.5 px-4 ${
                      currentPath === '/menu/drinks' 
                        ? 'text-gold' 
                        : 'text-magnolia hover:text-gold'
                    } transition-all duration-200 max-w-[160px] mx-auto rounded-lg bg-onyx/40`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaCocktail className="mr-2 text-gold/80" />
                    {currentLang === 'nl' ? 'Dranken' : 'Drinks'}
                  </Link>
                </motion.div>
                
                <motion.div variants={mobileMenuItemVariants} className="w-full text-center border-t border-gold/10 mt-1 pt-1">
                  <Link
                    to={getLocalizedPath('/about', currentLang)}
                    className={`flex items-center justify-center text-base font-medium py-2.5 px-4 ${
                      currentPath === '/about' 
                        ? 'text-gold' 
                        : 'text-magnolia hover:text-gold'
                    } transition-all duration-200 max-w-[160px] mx-auto rounded-lg bg-onyx/40`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaInfoCircle className="mr-2 text-gold/80" />
                    {t('navigation.about')}
                  </Link>
                </motion.div>

                <motion.div variants={mobileMenuItemVariants} className="w-full text-center border-t border-gold/10 mt-1 pt-1">
                  <Link
                    to={getLocalizedPath('/reservations', currentLang)}
                    className={`flex items-center justify-center text-base font-medium py-2.5 px-4 ${
                      currentPath === '/reservations' 
                        ? 'text-gold' 
                        : 'text-magnolia hover:text-gold'
                    } transition-all duration-200 max-w-[160px] mx-auto rounded-lg bg-onyx/40`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold/80" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                    </svg>
                    {t('navigation.reservations')}
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.defaultProps = {
  isScrolled: false
};

Navbar.displayName = 'Navbar';

export default Navbar; 