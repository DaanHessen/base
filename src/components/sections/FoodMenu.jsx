import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';

function FoodMenu() {
  const { t, i18n } = useTranslation(['menu', 'common']);
  const currentLang = i18n.language;

  const foodCategories = menuData.categories.filter(cat => cat.id !== 'drinks');

  // Styled category heading
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
        <title>{`${t('menu:food.title')} - ${t('common:seo.title')}`}</title>
        <meta name="description" content={t('menu:food.description')} />
        <link rel="canonical" href={`${window.location.origin}/menu/food/${currentLang === 'en' ? 'en/' : ''}`} />
        {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/menu/food/en/`} />}
        {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}/menu/food/`} />}
      </Helmet>
      
      <section className="py-14 pt-40 sm:pt-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 w-full">
          <div className="home-title">
            <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-magnolia mb-6 leading-tight">
              {t('menu:food.title')}
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-gold mb-8"></div>
          </div>
          
          <div className="home-content grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
      </section>
    </>
  );
}

export default memo(FoodMenu); 