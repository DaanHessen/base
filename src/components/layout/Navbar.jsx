import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUtensils, FaCocktail, FaInfoCircle, FaCalendarAlt, FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { setLanguage } from '../../utils/language';
import Logo from '../Logo';
import './Header.css';

const SocialIconLink = ({ href, label, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-magnolia hover:text-gold transition-colors duration-200 group z-10"
    aria-label={label}
  >
    {children}
  </a>
);

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
    
    // On mobile, we follow the same scrolling behavior as desktop
    handleScroll();
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // On mobile, check scroll position to set the background
        handleScroll();
      }
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll]);

  const changeLanguage = useCallback((lang) => {
    setLangDropdownOpen(false);
    
    const basePath = getBasePath(location.pathname);
    
    setLanguage(lang);
    
    const newPath = lang === 'en' 
      ? `/en${basePath}` 
      : basePath;
    
    // Store the current scroll position to restore it after reload
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    
    // Add a transition class before redirecting
    document.body.classList.add('page-transition');
    
    // Use cleaner redirect approach with proper hash handling
    setTimeout(() => {
      window.location.href = `/#${newPath}`;
      
      // Reload with a slight delay for smoother transition
      setTimeout(() => {
        window.location.reload();
      }, 150);
    }, 50);
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

  // Mobile menu button animations - simplified for better performance
  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    if (langDropdownOpen) setLangDropdownOpen(false);
    
    // Call the callback if provided
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  const topBarVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 6, transition: { duration: 0.2 } }
  };

  const middleBarVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0, transition: { duration: 0.2 } }
  };

  const bottomBarVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -6, transition: { duration: 0.2 } }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.05
      } 
    }
  };

  const mobileMenuItemVariants = {
    closed: { opacity: 0, y: -5, transition: { duration: 0.15 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.15 } }
  };

  const langDropdownMobileVariants = {
    closed: { opacity: 0, scale: 0.95, y: -5, transition: { duration: 0.15 } },
    open: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15 } }
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
        element.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        element.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
      } else {
        element.style.backgroundColor = 'transparent';
        element.style.backdropFilter = 'none';
        element.style.webkitBackdropFilter = 'none';
        element.style.boxShadow = 'none';
        element.style.borderBottom = '1px solid transparent';
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

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@basebymonsees.nl';
  };

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
                className="w-10 h-10 focus:outline-none xl:hidden flex flex-col justify-center items-center relative mobile-menu-button"
                aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                style={{ 
                  zIndex: 9999,
                  position: 'relative'
                }}
              >
                <motion.span
                  className="w-6 h-0.5 bg-gold mb-1.5 block"
                  variants={topBarVariants}
                  animate={mobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.2 }}
                ></motion.span>
                <motion.span
                  className="w-6 h-0.5 bg-gold mb-1.5 block"
                  variants={middleBarVariants}
                  animate={mobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.2 }}
                ></motion.span>
                <motion.span
                  className="w-6 h-0.5 bg-gold block"
                  variants={bottomBarVariants}
                  animate={mobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.2 }}
                ></motion.span>
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
            
            <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out ${
              scrolled 
                ? '-translate-y-1/2 scale-90 lg:scale-95' 
                : '-translate-y-[45%] scale-95 lg:scale-100'
            } z-10 hidden md:block`}>
              <Link to={getLocalizedPath('/', currentLang)} className="flex-shrink-0 relative">
                <div className={`logo-container navbar-logo py-3 ${scrolled ? 'pt-4 pb-3' : 'py-4'}`}> 
                  <Logo 
                    className={`transition-all duration-300 ease-in-out`} 
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
            className="fixed inset-0 bg-onyx bg-opacity-95 z-[1000] md:hidden overscroll-none"
            onClick={toggleMobileMenu}
            style={{ touchAction: 'none' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 flex flex-col items-center justify-between z-[1001] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ touchAction: 'pan-y' }}
            >
              {/* Logo for mobile menu - positioned exactly like the header logo */}
              <div className="absolute top-0 left-0 right-0 flex justify-center mt-10 z-[1002]">
                <Link 
                  to={getLocalizedPath('/', currentLang)} 
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Logo compact={false} className="w-full max-w-[200px]" />
                </Link>
              </div>
              
              <nav className="px-4 py-6 w-full mt-28 flex-1 flex flex-col">
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col items-center justify-center space-y-4 flex-1"
                >
                  <motion.div variants={mobileMenuItemVariants} className="w-full max-w-xs">
                    <Link
                      to={getLocalizedPath('/', currentLang)}
                      className={`flex items-center justify-center py-3 px-4 rounded-md font-medium text-xl ${
                        currentPath === '/' 
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-colors duration-200 w-full`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaHome className="mr-3 text-gold" />
                      {t('navigation.home')}
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={mobileMenuItemVariants} className="w-full max-w-xs">
                    <Link
                      to={getLocalizedPath('/menu/food', currentLang)}
                      className={`flex items-center justify-center py-3 px-4 rounded-md font-medium text-xl ${
                        currentPath === '/menu' || currentPath === '/menu/food'
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-colors duration-200 w-full`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUtensils className="mr-3 text-gold" />
                      {t('navigation.foodMenu')}
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={mobileMenuItemVariants} className="w-full max-w-xs">
                    <Link
                      to={getLocalizedPath('/menu/drinks', currentLang)}
                      className={`flex items-center justify-center py-3 px-4 rounded-md font-medium text-xl ${
                        currentPath === '/menu/drinks'
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-colors duration-200 w-full`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaCocktail className="mr-3 text-gold" />
                      {t('navigation.drinksMenu')}
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={mobileMenuItemVariants} className="w-full max-w-xs">
                    <Link
                      to={getLocalizedPath('/about', currentLang)}
                      className={`flex items-center justify-center py-3 px-4 rounded-md font-medium text-xl ${
                        currentPath === '/about' 
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-colors duration-200 w-full`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaInfoCircle className="mr-3 text-gold" />
                      {t('navigation.about')}
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={mobileMenuItemVariants} className="w-full max-w-xs">
                    <Link
                      to={getLocalizedPath('/reservations', currentLang)}
                      className={`flex items-center justify-center py-3 px-4 rounded-md font-medium text-xl ${
                        currentPath === '/reservations' 
                          ? 'text-gold bg-gold/5' 
                          : 'text-magnolia hover:text-gold hover:bg-gold/5'
                      } transition-colors duration-200 w-full`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaCalendarAlt className="mr-3 text-gold" />
                      {t('navigation.reservations')}
                    </Link>
                  </motion.div>
                </motion.div>
                
                {/* Social media icons at the bottom */}
                <motion.div 
                  variants={mobileMenuItemVariants}
                  className="w-full flex justify-center py-4 mt-auto mb-4"
                >
                  <div className="flex justify-center space-x-6">
                    <SocialIconLink href="https://www.instagram.com/base_by_monsees/" label="Instagram">
                      <div className="bg-gold/10 hover:bg-gold/20 p-4 rounded-full transition-colors duration-200 w-12 h-12 flex items-center justify-center">
                        <FaInstagram size={22} className="text-gold" />
                      </div>
                    </SocialIconLink>
                    <SocialIconLink href="https://www.linkedin.com/company/brasserie-monsees-hilversum/" label="LinkedIn">
                      <div className="bg-gold/10 hover:bg-gold/20 p-4 rounded-full transition-colors duration-200 w-12 h-12 flex items-center justify-center">
                        <FaLinkedin size={22} className="text-gold" />
                      </div>
                    </SocialIconLink>
                    <SocialIconLink href="mailto:info@basebymonsees.nl" label="Email">
                      <div className="bg-gold/10 hover:bg-gold/20 p-4 rounded-full transition-colors duration-200 w-12 h-12 flex items-center justify-center">
                        <FaEnvelope size={22} className="text-gold" />
                      </div>
                    </SocialIconLink>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar; 