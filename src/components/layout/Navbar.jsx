import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { getLanguage, setLanguage } from '../../utils/language';

const navTranslations = {
  home: {
    nl: 'Home',
    en: 'Home'
  },
  menu: {
    nl: 'Menu',
    en: 'Menu'
  },
  about: {
    nl: 'Over Ons',
    en: 'About Us'
  },
  selectLanguage: {
    nl: 'Taal kiezen',
    en: 'Select language'
  }
};

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const [language, setLanguageState] = useState(() => {
    return getLanguage();
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageState(getLanguage());
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  const changeLanguage = (lang) => {
    setLanguageState(lang);
    setLanguage(lang);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className="w-full z-40 transition-all duration-300"
    >
      <div className="max-w-screen-xl mx-auto px-6 py-4 relative">
        {scrolled && (
          <div className="absolute inset-x-0 bottom-0 h-px bg-gray-800"></div>
        )}
        
        <div className="flex items-center justify-between">        
          <nav className="hidden md:flex flex-1 justify-start">
            <ul className="flex items-start space-x-6 pt-1">
              <li>
                <Link 
                  to="/" 
                  className={`relative transition-all duration-300 py-2 text-xs uppercase tracking-widest font-heading ${isActive('/') ? 'text-accent font-medium' : 'text-pastel-light hover:text-accent'}`}
                >
                  {navTranslations.home[language]}
                  {isActive('/') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  to="/menu" 
                  className={`relative transition-all duration-300 py-2 text-xs uppercase tracking-widest font-heading ${isActive('/menu') ? 'text-accent font-medium' : 'text-pastel-light hover:text-accent'}`}
                >
                  {navTranslations.menu[language]}
                  {isActive('/menu') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`relative transition-all duration-300 py-2 text-xs uppercase tracking-widest font-heading ${isActive('/about') ? 'text-accent font-medium' : 'text-pastel-light hover:text-accent'}`}
                >
                  {navTranslations.about[language]}
                  {isActive('/about') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 z-30">
            <Link to="/">
              <Logo className="w-48 sm:w-52 md:w-56 lg:w-60 pt-6 sm:pt-8 mt-1 sm:mt-2" />
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 justify-end">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleDropdown}
                className="px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-md transition-colors duration-300 text-xs uppercase tracking-widest font-heading flex items-center border border-accent/20 hover:border-accent/40"
              >
                <span className="mr-2">{language === 'nl' ? 'NL' : 'EN'}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-3 w-3 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-dark/95 backdrop-blur-sm border border-accent/20 z-50 overflow-hidden">
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage('nl')}
                      className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-widest font-heading ${language === 'nl' ? 'bg-accent/20 text-accent' : 'text-pastel-light hover:bg-accent/10 hover:text-accent'} transition-colors duration-300`}
                    >
                      Nederlands
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-widest font-heading ${language === 'en' ? 'bg-accent/20 text-accent' : 'text-pastel-light hover:bg-accent/10 hover:text-accent'} transition-colors duration-300`}
                    >
                      English
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div 
            className="fixed top-5 left-5 z-[9999] block md:hidden"
            style={{
              position: 'fixed !important',
              top: '1.25rem !important',
              left: '1.25rem !important',
              zIndex: '9999 !important',
              display: 'block !important'
            }}
          >
            <button 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="focus:outline-none relative w-7 h-6"
            >
              <span 
                className={`absolute h-0.5 bg-accent rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'top-2.5 w-7 rotate-45' : 'top-0 w-7'
                }`}
              ></span>
              <span 
                className={`absolute top-2.5 h-0.5 bg-accent rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0 w-0' : 'w-5 opacity-100'
                }`}
              ></span>
              <span 
                className={`absolute h-0.5 bg-accent rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'top-2.5 w-7 -rotate-45' : 'top-5 w-3'
                }`}
              ></span>
            </button>
          </div>
          
          <div 
            className={`fixed inset-0 bg-dark/95 backdrop-blur-lg flex flex-col items-center justify-center z-40 transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={handleOverlayClick}
          >
            <nav className="w-full max-w-sm">
              <ul className="flex flex-col items-center space-y-6">
                <li className="w-full text-center">
                  <Link 
                    to="/" 
                    className={`block relative text-2xl py-2 uppercase tracking-widest font-heading ${isActive('/') ? 'text-accent font-medium' : 'text-pastel-light hover:text-accent transition-colors duration-200'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {navTranslations.home[language]}
                    {isActive('/') && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-accent"></span>
                    )}
                  </Link>
                </li>
                <li className="w-full text-center">
                  <Link 
                    to="/menu" 
                    className={`block relative text-2xl py-2 uppercase tracking-widest font-heading ${isActive('/menu') ? 'text-accent font-medium' : 'text-pastel-light hover:text-accent transition-colors duration-200'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {navTranslations.menu[language]}
                    {isActive('/menu') && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-accent"></span>
                    )}
                  </Link>
                </li>
                <li className="w-full text-center">
                  <Link 
                    to="/about" 
                    className={`block relative text-2xl py-2 uppercase tracking-widest font-heading ${isActive('/about') ? 'text-accent font-medium' : 'text-pastel-light hover:text-accent transition-colors duration-200'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {navTranslations.about[language]}
                    {isActive('/about') && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-accent"></span>
                    )}
                  </Link>
                </li>
                
                <li className="w-full text-center pt-8 mt-4 border-t border-gray-800/30">
                  <div className="flex justify-center">
                    <div className="p-4 w-56">
                      <p className="text-xs uppercase tracking-widest text-pastel-light/70 mb-3 text-center">
                        {navTranslations.selectLanguage[language]}
                      </p>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => {
                            changeLanguage('nl');
                            setMobileMenuOpen(false);
                          }}
                          className={`px-5 py-2 rounded-md transition-all duration-300 ${
                            language === 'nl' 
                              ? 'bg-accent text-white shadow-md' 
                              : 'text-pastel-light border border-pastel-light/20 hover:border-pastel-light/40'
                          }`}
                        >
                          NL
                        </button>
                        <button
                          onClick={() => {
                            changeLanguage('en');
                            setMobileMenuOpen(false);
                          }}
                          className={`px-5 py-2 rounded-md transition-all duration-300 ${
                            language === 'en' 
                              ? 'bg-accent text-white shadow-md' 
                              : 'text-pastel-light border border-pastel-light/20 hover:border-pastel-light/40'
                          }`}
                        >
                          EN
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 