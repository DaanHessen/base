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

  const categoryPairs = [];
  for (let i = 0; i < menuData.categories.length; i += 2) {
    const pair = [menuData.categories[i]];
    if (i + 1 < menuData.categories.length) {
      pair.push(menuData.categories[i + 1]);
    }
    categoryPairs.push(pair);
  }

  return (
    <section className={`py-16 pt-28 sm:pt-36 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-16">
          {categoryPairs.map((pair, pairIndex) => (
            <div key={`pair-${pairIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 last:mb-0">
              {pair.map((category, index) => (
                <div 
                  id={`category-${category.id}`} 
                  key={category.id}
                  className={`scroll-mt-28 sm:scroll-mt-36 transition-all duration-300 delay-${Math.min((pairIndex * 2 + index) * 100, 300)} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} h-full flex flex-col`}
                >
                  <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white mb-2">
                    {category.name[language]}
                  </h2>
                  <div className="w-16 sm:w-20 h-1 bg-accent mb-6"></div>
                  
                  <MenuCategory category={category} language={language} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Menu); 