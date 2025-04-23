import React, { useState, useEffect, useRef } from 'react';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';

const Menu = () => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to Dutch
    return localStorage.getItem('language') || 'nl';
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Save to local storage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  // Animation on mount - reduced timeout for faster animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50); // Reduced from 100ms to 50ms
    
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
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

  return (
    <section className={`min-h-screen py-16 pt-36 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="space-y-24">
          {menuData.categories.map((category, index) => (
            <div 
              id={`category-${category.id}`} 
              key={category.id}
              className={`scroll-mt-36 transition-all duration-500 delay-${Math.min(index * 100, 300)} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-heading font-semibold text-white mb-2">
                    {category[`name-${language}`]}
                  </h2>
                  <div className="w-20 h-1 bg-accent mb-8"></div>
                </div>
                
                {index === 0 && (
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={toggleDropdown}
                      className="px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors duration-300 text-sm flex items-center"
                    >
                      <span className="mr-2">{language === 'nl' ? 'Nederlands' : 'English'}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-dark/95 backdrop-blur-sm border border-gray-800 z-50">
                        <div className="py-1">
                          <button
                            onClick={() => changeLanguage('nl')}
                            className={`block w-full text-left px-4 py-2 text-sm ${language === 'nl' ? 'text-accent' : 'text-pastel-light hover:text-accent'} transition-colors duration-300`}
                          >
                            Nederlands
                          </button>
                          <button
                            onClick={() => changeLanguage('en')}
                            className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-accent' : 'text-pastel-light hover:text-accent'} transition-colors duration-300`}
                          >
                            English
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <MenuCategory category={category} language={language} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu; 