import React, { useRef, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link } from 'react-router-dom';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';
import '../menu/Menu.css';
import './Sections.css';
import { FaUtensils, FaCocktail } from 'react-icons/fa';

function Menu() {
  const { t, i18n } = useTranslation(['menu', 'common']);
  const currentLang = i18n.language;
  const location = useLocation();
  const foodRef = useRef(null);
  const drinksRef = useRef(null);

  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      if (location.hash === '#food' && foodRef.current) {
        foodRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (location.hash === '#drinks' && drinksRef.current) {
        drinksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
    
    return () => clearTimeout(scrollTimer);
  }, [location.hash]);

  const foodCategories = menuData.categories.filter(cat => cat.id !== 'drinks');
  const drinksCategory = menuData.categories.find(cat => cat.id === 'drinks');

  const SectionHeading = ({ children, id }) => (
    <div className="menu-section-heading">
      <h2>{children}</h2>
    </div>
  );

  const CategoryHeading = ({ children }) => (
    <div className="menu-category-heading">
      <h3>{children}</h3>
    </div>
  );

  // Helper function to get the localized path
  const getLocalizedPath = (path) => {
    return currentLang === 'en' ? `/en${path}` : path;
  };

  return (
    <>
      <Helmet>
        <title>{t('title', { ns: 'menu' })} | BASE by Monsees</title>
        <meta name="description" content={t('description', { ns: 'menu' })} />
      </Helmet>
      
      <section className="py-16 sm:py-20 md:py-24 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-left text-magnolia">
              {t('title', { ns: 'menu' })}
            </h1>
            <div className="w-12 sm:w-14 md:w-16 h-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.3)] mb-4 sm:mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-8">
            {/* Food Menu Card */}
            <div className="group rounded-lg border border-gold/30 overflow-hidden bg-onyx/40 backdrop-blur shadow-md hover:shadow-lg transition-all duration-300 hover:border-gold/50 hover:-translate-y-1">
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/20 text-gold mr-4">
                    <FaUtensils className="text-xl" />
                  </div>
                  <h2 className="text-2xl font-heading font-semibold text-magnolia">{t('food.title', { ns: 'menu' })}</h2>
                </div>
                
                <p className="text-magnolia/80 mb-5">
                  {t('food.description', { ns: 'menu' })}
                </p>
                
                <Link 
                  to={getLocalizedPath('/menu/food')}
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gold/20 border border-gold/50 text-gold hover:bg-gold/30 transition-colors duration-200"
                >
                  {t('buttons.viewMenu', { ns: 'common' })}
                </Link>
              </div>
            </div>
            
            {/* Drinks Menu Card */}
            <div className="group rounded-lg border border-gold/30 overflow-hidden bg-onyx/40 backdrop-blur shadow-md hover:shadow-lg transition-all duration-300 hover:border-gold/50 hover:-translate-y-1">
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/20 text-gold mr-4">
                    <FaCocktail className="text-xl" />
                  </div>
                  <h2 className="text-2xl font-heading font-semibold text-magnolia">{t('drinks.title', { ns: 'menu' })}</h2>
                </div>
                
                <p className="text-magnolia/80 mb-5">
                  {t('drinks.description', { ns: 'menu' })}
                </p>
                
                <Link 
                  to={getLocalizedPath('/menu/drinks')}
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gold/20 border border-gold/50 text-gold hover:bg-gold/30 transition-colors duration-200"
                >
                  {t('buttons.viewMenu', { ns: 'common' })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Menu); 