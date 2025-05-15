import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUtensils, FaCocktail, FaInfoCircle } from 'react-icons/fa';
import { setLanguage } from '../../utils/language';
import Logo from '../Logo';
// Import CSS moved to index.css through imports

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

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const newScrolledState = currentScrollY > 80; 
    setScrolled(newScrolledState);
  }, []);

  useEffect(() => {
    if (typeof initialIsScrolled === 'boolean') {
      setScrolled(initialIsScrolled);
    }
    handleScroll();
  }, [initialIsScrolled, handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(handleScroll, 100);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prevState => {
      const newState = !prevState;
      if (newState) {
        scrollPositionRef.current = window.scrollY;
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      return newState;
    });
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Restore scroll position when menu closes
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  const changeLanguage = useCallback((lang) => {
    setLangDropdownOpen(false);
    const basePath = getBasePath(location.pathname);
    setLanguage(lang);
    const newPath = lang === 'en' ? `/en${basePath}` : basePath;
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
  
  const mobileMenuVariants = {
    closed: { opacity: 0, transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] } },
    open: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.07, delayChildren: 0.1 } }
  };
  
  const mobileMenuItemVariants = { closed: { y: -10, opacity: 0 }, open: { y: 0, opacity: 1 } };
  
  const mobileDropdownVariants = {
    closed: { opacity: 0, y: -10, height: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    open: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3, ease: "easeOut" } }
  };
  
  const topBarVariants = { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 5 } };
  const middleBarVariants = { closed: { opacity: 1 }, open: { opacity: 0 } };
  const bottomBarVariants = { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } };

  useEffect(() => {
    const checkScreenWidth = () => setIsNarrowScreen(window.innerWidth <= 1159);
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`}
      data-scrolled={scrolled ? 'true' : 'false'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-full">
          {/* Hamburger Button */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={toggleMobileMenu}
              className="relative z-[1001] inline-flex items-center justify-center p-2 rounded-md text-magnolia hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/30 h-10 w-10 bg-onyx/70 border border-gold/30"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
            >
              <motion.div animate={mobileMenuOpen ? "open" : "closed"} initial={false} className="flex flex-col justify-between w-5 h-3.5">
                <motion.span variants={topBarVariants} className="block h-0.5 w-full bg-current rounded-full" style={{ originX: "0.5", originY: "0" }} transition={{ duration: 0.3, ease: "easeInOut" }}></motion.span>
                <motion.span variants={middleBarVariants} className="block h-0.5 w-full bg-current rounded-full" transition={{ duration: 0.2, ease: "easeInOut" }}></motion.span>
                <motion.span variants={bottomBarVariants} className="block h-0.5 w-full bg-current rounded-full" style={{ originX: "0.5", originY: "1" }} transition={{ duration: 0.3, ease: "easeInOut" }}></motion.span>
              </motion.div>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center space-x-8">
            <Link to={getLocalizedPath('/', currentLang)} className={`font-medium ${currentPath === '/' ? 'text-gold' : 'text-magnolia hover:text-gold transition-colors duration-300'}`}>{t('navigation.home')}</Link>
            <div className="relative" ref={menuDropdownRef} onMouseEnter={openMenuDropdown} onMouseLeave={closeMenuDropdown}>
              <Link to={getLocalizedPath('/menu', currentLang)} onClick={handleMenuLinkClick} className={`font-medium inline-flex items-center ${(currentPath === '/menu' || currentPath === '/menu/food' || currentPath === '/menu/drinks') ? 'text-gold' : 'text-magnolia hover:text-gold transition-colors duration-300'}`} aria-expanded={menuDropdownOpen}>
                {t('navigation.menu')}
                <svg className={`ml-1 h-4 w-4 text-gold transition-transform duration-300 ${menuDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </Link>
              <AnimatePresence>
                {menuDropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.1 }} className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-onyx/90 border border-gold/30 backdrop-blur-md ring-1 ring-gold/20 z-50 py-1 overflow-hidden">
                    <Link to={getLocalizedPath('/menu/food', currentLang)} onClick={handleMenuLinkClick} className={`block px-4 py-2.5 text-sm ${(currentPath === '/menu' || currentPath === '/menu/food') ? 'text-gold bg-onyx/80' : 'text-magnolia hover:text-gold hover:bg-onyx/70'} transition-all duration-150 w-full text-left`}><div className="flex items-center"><span className="mr-2 text-gold">🍽️</span>{currentLang === 'nl' ? 'Eten' : 'Food'}</div></Link>
                    <Link to={getLocalizedPath('/menu/drinks', currentLang)} onClick={handleMenuLinkClick} className={`block px-4 py-2.5 text-sm ${currentPath === '/menu/drinks' ? 'text-gold bg-onyx/80' : 'text-magnolia hover:text-gold hover:bg-onyx/70'} transition-all duration-150 w-full text-left`}><div className="flex items-center"><span className="mr-2 text-gold">🍹</span>{currentLang === 'nl' ? 'Dranken' : 'Drinks'}</div></Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to={getLocalizedPath('/about', currentLang)} className={`font-medium ${currentPath === '/about' ? 'text-gold' : 'text-magnolia hover:text-gold transition-colors duration-300'}`}>{t('navigation.about')}</Link>
            <Link to={getLocalizedPath('/reservations', currentLang)} className={`font-medium ${currentPath === '/reservations' ? 'text-gold' : 'text-magnolia hover:text-gold transition-colors duration-300'}`}>{t('navigation.reservations')}</Link>
          </div>
          
          {/* Logo */}
          <div className="navbar-logo-wrapper">
            <Link to={getLocalizedPath('/', currentLang)} className="flex-shrink-0 relative">
              <div className="logo-container navbar-logo transition-all duration-300"><Logo /></div>
            </Link>
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center">
            <div className="hidden xl:block relative" ref={langDropdownRef}>
              <button type="button" onClick={toggleLangDropdown} className="inline-flex items-center px-3 py-1.5 border border-gold/30 rounded-md text-magnolia bg-onyx/70 hover:bg-onyx/90 transition-all duration-300 shadow-sm hover:shadow-gold/10" aria-expanded={langDropdownOpen}>
                <span className="mr-1.5 font-medium text-sm">{currentLang === 'nl' ? '🇳🇱 NL' : '🇬🇧 EN'}</span>
                <svg className={`h-3.5 w-3.5 text-gold transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.1 }} className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-onyx/90 border border-gold/30 backdrop-blur-md ring-1 ring-gold/20 z-50 overflow-hidden">
                    <div className="p-3 grid grid-cols-1 gap-2">
                      <button onClick={() => changeLanguage('nl')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center ${currentLang === 'nl' ? 'bg-gold text-onyx shadow-md' : 'bg-onyx/80 border border-gold/30 text-magnolia hover:text-gold hover:border-gold/50'} transition-all duration-150 justify-center`}><div className="flex items-center"><span className="mr-2 text-base">🇳🇱</span><span>Nederlands</span></div></button>
                      <button onClick={() => changeLanguage('en')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center ${currentLang === 'en' ? 'bg-gold text-onyx shadow-md' : 'bg-onyx/80 border border-gold/30 text-magnolia hover:text-gold hover:border-gold/50'} transition-all duration-150 justify-center`}><div className="flex items-center"><span className="mr-2 text-base">🇬🇧</span><span>English</span></div></button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Mobile Language Switcher (Icon only, dropdown appears inside mobile menu) */}
            <div className="md:hidden relative">
              <button onClick={toggleMobileMenu} className="flex items-center justify-center h-10 px-3 rounded-md bg-onyx/70 border border-gold/30 shadow-sm" aria-label={t('navigation.openMenu')}>
                 <span className="text-base mr-1.5">{currentLang === 'nl' ? '🇳🇱' : '🇬🇧'}</span>
                 <span className="text-sm text-magnolia">{currentLang === 'nl' ? 'NL' : 'EN'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* === MOBILE MENU === */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="xl:hidden fixed inset-0 z-[1050] bg-red-500"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="w-full h-full flex flex-col py-6 bg-onyx/90 backdrop-blur-md shadow-xl overflow-y-auto">
              {/* Mobile Menu Header */}
              <div className="px-4 sm:px-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="logo-container">
                    <Link to={getLocalizedPath('/', currentLang)} className="block" onClick={() => setMobileMenuOpen(false)}>
                      <Logo className="h-10 w-auto" />
                    </Link>
                  </div>
                  {/* Consider adding an explicit close button here if hamburger toggle feels insufficient */}
                </div>
              </div>
              {/* Mobile Menu Navigation */}
              <div className="mt-6 relative">
                <nav className="grid gap-y-4 px-5 sm:gap-x-8 text-center">
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to={getLocalizedPath('/', currentLang)}
                      className={`flex items-center justify-center text-base font-medium py-2.5 px-4 max-w-[160px] mx-auto rounded-lg bg-onyx/40 ${currentPath === '/' ? 'text-gold' : 'text-magnolia hover:text-gold'} transition-all duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaHome className="mr-2 text-gold/80" /> {t('navigation.home')}
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to={getLocalizedPath('/menu', currentLang)}
                      className={`flex items-center justify-center text-base font-medium py-2.5 px-4 max-w-[160px] mx-auto rounded-lg bg-onyx/40 ${(currentPath === '/menu' || currentPath === '/menu/food' || currentPath === '/menu/drinks') ? 'text-gold' : 'text-magnolia hover:text-gold'} transition-all duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaUtensils className="mr-2 text-gold/80" /> {t('navigation.menu')}
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to={getLocalizedPath('/about', currentLang)}
                      className={`flex items-center justify-center text-base font-medium py-2.5 px-4 max-w-[160px] mx-auto rounded-lg bg-onyx/40 ${currentPath === '/about' ? 'text-gold' : 'text-magnolia hover:text-gold'} transition-all duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaInfoCircle className="mr-2 text-gold/80" /> {t('navigation.about')}
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to={getLocalizedPath('/reservations', currentLang)}
                      className={`flex items-center justify-center text-base font-medium py-2.5 px-4 max-w-[160px] mx-auto rounded-lg bg-onyx/40 ${currentPath === '/reservations' ? 'text-gold' : 'text-magnolia hover:text-gold'} transition-all duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaCocktail className="mr-2 text-gold/80" /> {t('navigation.reservations')}
                    </Link>
                  </motion.div>
                  {/* Mobile Menu Language Dropdown */}
                  <motion.div variants={mobileMenuItemVariants}>
                    <button
                      onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                      className={`w-full inline-flex items-center justify-center text-base font-medium py-2.5 px-4 max-w-[160px] mx-auto rounded-lg bg-onyx/40 ${langDropdownOpen ? 'text-gold' : 'text-magnolia hover:text-gold'} transition-all duration-200`}
                      aria-expanded={langDropdownOpen}
                    >
                      <span>{currentLang === 'nl' ? t('language.label_nl') : t('language.label_en')}</span>
                      <svg className={`ml-1 -mr-1 h-5 w-5 text-gold transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                    <AnimatePresence>
                      {langDropdownOpen && (
                        <motion.div
                          className="w-full max-w-[160px] mx-auto mt-2 rounded-lg overflow-hidden bg-onyx/90 border border-gold/20 backdrop-blur-sm"
                          initial="closed" animate="open" exit="closed" variants={mobileDropdownVariants}
                        >
                          <button onClick={() => { changeLanguage('en'); setMobileMenuOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm ${currentLang === 'en' ? 'text-gold bg-onyx/60' : 'text-magnolia hover:text-gold hover:bg-onyx/60'} transition-colors duration-150`}>{t('language.english')}</button>
                          <button onClick={() => { changeLanguage('nl'); setMobileMenuOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm ${currentLang === 'nl' ? 'text-gold bg-onyx/60' : 'text-magnolia hover:text-gold hover:bg-onyx/60'} transition-colors duration-150`}>{t('language.dutch')}</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.defaultProps = {
  isScrolled: false,
  // currentLang: 'nl', // propCurrentLang should be used or i18n.language
};

Navbar.displayName = 'Navbar';

export default Navbar; 