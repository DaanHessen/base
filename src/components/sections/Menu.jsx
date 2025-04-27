import React, { useState, useEffect, useCallback, memo } from 'react';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';
import { getLanguage } from '../../utils/language';

const Menu = () => {
  const [language, setLanguage] = useState(getLanguage);
  const [isVisible, setIsVisible] = useState(false);

  const handleLanguageChange = useCallback(() => {
    setLanguage(getLanguage());
  }, []);

  useEffect(() => {
    handleLanguageChange();
    
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [handleLanguageChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`py-14 pt-24 sm:pt-32 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {menuData.categories.map((category, categoryIndex) => (
            <div 
              id={`category-${category.id}`} 
              key={category.id}
              className={`transition-all duration-300 delay-${Math.min(categoryIndex * 100, 300)} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="relative mb-6">
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white mb-3">
                  {category.name[language]}
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gold"></div>
                <div className="w-24 sm:w-32 h-px bg-gold/30 mt-1"></div>
              </div>
              
              <MenuCategory category={category} language={language} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Menu); 