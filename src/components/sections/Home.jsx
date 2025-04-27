import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import homeData from '../../data/home.json';
import { getLanguage } from '../../utils/language';

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  
  const [language, setLanguage] = useState(() => {
    return getLanguage();
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(getLanguage());
    };
    
    setLanguage(getLanguage());
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const animateElements = () => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }
      
      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = '1';
          subtitleRef.current.style.transform = 'translateY(0)';
        }
      }, 50);
      
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'translateY(0)';
        }
      }, 75);
    };
    
    setTimeout(animateElements, 25);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center pt-36">
      <div className="max-w-screen-xl w-full px-6">
        <div className="flex flex-col items-start text-left sm:pl-8 md:pl-16">
          <h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-magnolia mb-6 leading-tight opacity-0 transform translate-y-4 transition-all duration-300"
            dangerouslySetInnerHTML={{ __html: homeData.hero.title[language] }}
          >
          </h1>
          
          <h2 
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-thistle mb-8 font-light tracking-wide opacity-0 transform translate-y-4 transition-all duration-300"
          >
            {homeData.hero.subtitle[language]}
          </h2>
          
          <div 
            ref={contentRef}
            className="text-base sm:text-lg text-thistle opacity-0 transform translate-y-4 transition-all duration-300"
          >
            <p className="mb-8 leading-relaxed max-w-2xl">
              {homeData.hero.description[language]}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
              <Link 
                to="/about" 
                className="px-6 py-3 bg-gold hover:bg-gold/90 text-onyx font-medium rounded transition-all duration-300 shadow-[4px_4px_0px_rgba(197,167,95,0.6)] hover:shadow-[2px_2px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                {homeData.buttons.reservation[language]}
              </Link>
              <Link 
                to="/menu" 
                className="px-6 py-3 border-2 border-magnolia/20 text-magnolia hover:bg-magnolia/10 font-medium rounded transition-all duration-300 hover:border-magnolia/40 shadow-[4px_4px_0px_rgba(62,62,62,0.3)] hover:shadow-[2px_2px_0px_rgba(62,62,62,0.5)] hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                {homeData.buttons.menu[language]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home; 