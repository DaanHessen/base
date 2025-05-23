import React, { useRef, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';

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
    <div className="relative mb-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-magnolia mb-3 sm:mb-4 leading-tight">
        {children}
      </h2>
      <div className="w-12 sm:w-14 md:w-16 h-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.3)] mb-4 sm:mb-6"></div>
    </div>
  );

  const CategoryHeading = ({ children }) => (
    <div className="relative mb-8 mt-4">
      <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-gold inline-block pr-4">
        {children}
        <span className="absolute bottom-[-6px] left-0 w-3/4 h-px bg-gold/50"></span>
      </h3>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{t('menu:seo.title')}</title>
        <meta name="description" content={t('menu:seo.description')} />
        <link rel="canonical" href={`${window.location.origin}/menu/${currentLang === 'en' ? 'en/' : ''}`} />
        {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/menu/en/`} />}
        {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}/menu/`} />}
        <meta name="og:title" content={t('menu:seo.title')} />
        <meta name="og:description" content={t('menu:seo.description')} />
      </Helmet>
      
      <section className="py-14 pt-28 sm:pt-32 md:pt-40 lg:pt-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 w-full">
          <div id="food" ref={foodRef} className="mb-16 home-title">
            <SectionHeading>
              {currentLang === 'nl' ? 'Eten' : 'Food'}
            </SectionHeading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {foodCategories.map((category) => (
                <div 
                  id={`category-${category.id}`} 
                  key={category.id}
                  className="menu-category-item transition-all duration-150 hover:translate-y-[-5px]"
                >
                  <CategoryHeading>
                    {category.name[currentLang]}
                  </CategoryHeading>
                  
                  <MenuCategory category={category} />
                </div>
              ))}
            </div>
          </div>

          {drinksCategory && (
            <div id="drinks" ref={drinksRef} className="home-content">
              <SectionHeading>
                {drinksCategory.name[currentLang]}
              </SectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {drinksCategory.subcategories.map((subcat) => (
                  <div 
                    id={`category-${subcat.id}`} 
                    key={subcat.id}
                    className="menu-category-item transition-all duration-150 hover:translate-y-[-5px] w-full"
                  >
                    <CategoryHeading>
                      {subcat.name[currentLang]}
                    </CategoryHeading>
                    
                    <MenuCategory category={{ ...subcat, items: subcat.items, parentId: 'drinks' }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default memo(Menu); 