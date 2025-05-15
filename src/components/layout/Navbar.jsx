import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUtensils, FaCocktail, FaInfoCircle, FaCalendarAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { setLanguage } from '../../utils/language';
import Logo from '../Logo';
import './Header.css';

const Navbar = React.forwardRef(({ isScrolled: initialIsScrolled, currentLang: propCurrentLang, onMobileMenuToggle }, ref) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(initialIsScrolled || false);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Show main nav background when scrolled a little
    const newScrolledState = currentScrollY > 5;
    setScrolled(newScrolledState);
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    const localScrollListener = () => {
      handleScroll();
    };

    window.addEventListener('scroll', localScrollListener, { passive: true });

    const initialCheckTimeout = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      clearTimeout(initialCheckTimeout);
      window.removeEventListener('scroll', localScrollListener);
    };
  }, [handleScroll]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    
    setScrolled(true);
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScrolled(true);
      }
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  // Mobile menu button animations
  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    if (langDropdownOpen) setLangDropdownOpen(false);
    
    // Call the callback if provided
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  };

  const topBarVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 6 }
  };

  const middleBarVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };

  const bottomBarVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -6 }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      } 
    }
  };

  const mobileMenuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  const langDropdownMobileVariants = {
    closed: { opacity: 0, scale: 0.9, y: -10 },
    open: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } }
  };

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsNarrowScreen(window.innerWidth < 1280);
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
      
      if (isScrolled) {
        element.style.backgroundColor = 'rgba(42, 42, 42, 0.97)';
        element.style.backdropFilter = 'blur(8px)';
        element.style.webkitBackdropFilter = 'blur(8px)';
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
    <>
      <header
        ref={navRef}
        className={`header ${scrolled ? 'header-scrolled' : 'header-transparent'} fixed-nav`}
        data-scrolled={scrolled}
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
                  to={getLocalizedPath('/menu/food', currentLang)}
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
                      className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-onyx/90 border border-gold/30 backdrop-blur-md ring-1 ring-gold/20 z-50 overflow-hidden"
                    >
                      <div className="py-2">
                        <Link
                          to={getLocalizedPath('/menu/food', currentLang)}
                          onClick={handleMenuLinkClick}
                          className="block px-4 py-2 text-sm text-magnolia hover:bg-gold/10 hover:text-gold transition-colors"
                        >
                          {t('navigation.foodMenu')}
                        </Link>
                        <Link
                          to={getLocalizedPath('/menu/drinks', currentLang)}
                          onClick={handleMenuLinkClick}
                          className="block px-4 py-2 text-sm text-magnolia hover:bg-gold/10 hover:text-gold transition-colors"
                        >
                          {t('navigation.drinksMenu')}
                        </Link>
                      </div>
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
                ? '-translate-y-1/2 scale-90 lg:scale-95' 
                : '-translate-y-[45%] scale-95 lg:scale-100'
            } z-10 hidden md:block`}>
              <Link to={getLocalizedPath('/', currentLang)} className="flex-shrink-0 relative">
                <div className={`logo-container navbar-logo py-3 ${scrolled ? 'pt-4 pb-3' : 'py-4'}`}> 
                  <Logo 
                    className={`transition-transform duration-500 ease-out`} 
                    compact={scrolled}
                  /> 
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
              <div className="xl:hidden relative">
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
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-onyx/90 border border-gold/30 backdrop-blur-md ring-1 ring-gold/20 z-[1001] overflow-hidden"
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
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[1000] md:hidden"
            onClick={toggleMobileMenu}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-onyx/97 shadow-lg backdrop-blur-md z-[1001] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Logo for mobile menu */}
              <div className="flex justify-center py-8 border-b border-gold/20">
                <Link 
                  to={getLocalizedPath('/', currentLang)} 
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Logo compact={false} className="w-32" />
                </Link>
              </div>
              
              <nav className="px-4 py-6 space-y-6">
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="space-y-6"
                >
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to={getLocalizedPath('/', currentLang)}
                      className={`flex items-center py-3 px-4 rounded-md font-medium text-lg ${
                        currentPath === '/' 
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-all duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaHome className="mr-3 text-gold" />
                      {t('navigation.home')}
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to={getLocalizedPath('/menu/food', currentLang)}
                      className={`flex items-center py-3 px-4 rounded-md font-medium text-lg ${
                        currentPath === '/menu' || currentPath === '/menu/food'
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-all duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUtensils className="mr-3 text-gold" />
                      {t('navigation.foodMenu')}
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to={getLocalizedPath('/menu/drinks', currentLang)}
                      className={`flex items-center py-3 px-4 rounded-md font-medium text-lg ${
                        currentPath === '/menu/drinks'
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-all duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaCocktail className="mr-3 text-gold" />
                      {t('navigation.drinksMenu')}
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to={getLocalizedPath('/about', currentLang)}
                      className={`flex items-center py-3 px-4 rounded-md font-medium text-lg ${
                        currentPath === '/about' 
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-all duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaInfoCircle className="mr-3 text-gold" />
                      {t('navigation.about')}
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to={getLocalizedPath('/reservations', currentLang)}
                      className={`flex items-center py-3 px-4 rounded-md font-medium text-lg ${
                        currentPath === '/reservations' 
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-all duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaCalendarAlt className="mr-3 text-gold" />
                      {t('navigation.reservations')}
                    </Link>
                  </motion.div>
                </motion.div>
              </nav>
              
              {/* Social media icons */}
              <div className="social-icons px-6 py-6 border-t border-gold/20 flex justify-center space-x-6 mt-auto">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-onyx/70 border border-gold/30 flex items-center justify-center text-magnolia hover:text-gold hover:border-gold/50 transition-colors duration-200"
                >
                  <FaFacebookF className="text-xl" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-onyx/70 border border-gold/30 flex items-center justify-center text-magnolia hover:text-gold hover:border-gold/50 transition-colors duration-200"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-onyx/70 border border-gold/30 flex items-center justify-center text-magnolia hover:text-gold hover:border-gold/50 transition-colors duration-200"
                >
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar; 