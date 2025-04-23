import React, { useState, useEffect } from 'react';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';
import { getLanguage } from '../../utils/language';

const Menu = () => {
  const [language, setLanguage] = useState(() => {
    return getLanguage();
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(getLanguage());
    };

    handleLanguageChange();
    
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`min-h-screen py-16 pt-28 sm:pt-36 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="space-y-16 sm:space-y-24">
          {menuData.categories.map((category, index) => (
            <div 
              id={`category-${category.id}`} 
              key={category.id}
              className={`scroll-mt-28 sm:scroll-mt-36 transition-all duration-500 delay-${Math.min(index * 100, 300)} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white mb-2">
                  {category.name[language]}
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-accent mb-4 sm:mb-8"></div>
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