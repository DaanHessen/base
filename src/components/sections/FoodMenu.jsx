import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';

function FoodMenu() {
  const { t, i18n } = useTranslation(['menu', 'common']);
  const currentLang = i18n.language;

  // Define the order of categories
  const categoryOrder = ['voorgerechten', 'tussengerechten', 'hoofdgerechten', 'desserts', 'sides'];
  
  // Get all food categories and sort them according to our order
  const allFoodCategories = menuData.categories.filter(cat => cat.id !== 'drinks');
  const foodCategories = [...allFoodCategories].sort((a, b) => {
    return categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id);
  });

  // Styled category heading
  const CategoryHeading = ({ children }) => (
    <div className="relative mb-6 sm:mb-8 mt-4 sm:mt-6 overflow-hidden">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-gold inline-block pr-4">
        {children}
        <span className="absolute bottom-[-5px] left-0 w-1/2 h-px bg-gold/50"></span>
        <span className="absolute bottom-[-5px] left-[50%] w-1/2 h-px bg-gold/20"></span>
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
      
      <section className="py-14 pt-32 sm:pt-40 md:pt-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="home-title mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-magnolia mb-4 sm:mb-6 leading-tight">
              {t('menu:food.title')}
            </h1>
            <div className="w-14 sm:w-16 md:w-20 h-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]"></div>
          </div>
          
          {/* Categories selection on mobile */}
          <div className="md:hidden overflow-x-auto pb-4 mb-4 whitespace-nowrap no-scrollbar">
            <div className="flex space-x-3">
              {foodCategories.map((category) => (
                <button 
                  key={category.id}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`category-${category.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-4 py-2 text-sm rounded-full border border-gold/30 bg-onyx/70 text-gold whitespace-nowrap flex-shrink-0 hover:bg-gold/20 transition-all duration-150"
                >
                  {category.name[currentLang]}
                </button>
              ))}
            </div>
          </div>
          
          {/* Desktop order: voorgerechten & hoofdgerechten in first row, tussengerechten & desserts in second row, sides centered in third row */}
          <div className="home-content">
            {/* Mobile view - all categories in one column */}
            <div className="block md:hidden">
            {foodCategories.map((category) => (
              <div 
                id={`category-${category.id}`} 
                key={category.id}
                  className="menu-category-item mb-10 transition-all duration-150 hover:translate-y-[-2px] scroll-mt-28"
                >
                  <CategoryHeading>
                    {category.name[currentLang]}
                  </CategoryHeading>
                  
                  <MenuCategory category={category} />
                </div>
              ))}
            </div>
            
            {/* Desktop view - custom grid layout */}
            <div className="hidden md:block">
              {/* First row: voorgerechten & hoofdgerechten */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10 mb-16">
                {foodCategories
                  .filter(cat => cat.id === 'voorgerechten' || cat.id === 'hoofdgerechten')
                  .sort((a, b) => a.id === 'voorgerechten' ? -1 : 1)
                  .map((category) => (
                    <div 
                      id={`category-${category.id}`} 
                      key={category.id}
                      className="menu-category-item transition-all duration-150 hover:translate-y-[-5px] scroll-mt-28 w-full"
                    >
                      <CategoryHeading>
                        {category.name[currentLang]}
                      </CategoryHeading>
                      
                      <MenuCategory category={category} />
                    </div>
                  ))}
              </div>
              
              {/* Second row: tussengerechten & desserts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10 mb-16">
                {foodCategories
                  .filter(cat => cat.id === 'tussengerechten' || cat.id === 'desserts')
                  .sort((a, b) => a.id === 'tussengerechten' ? -1 : 1)
                  .map((category) => (
                    <div 
                      id={`category-${category.id}`} 
                      key={category.id}
                      className="menu-category-item transition-all duration-150 hover:translate-y-[-5px] scroll-mt-28 w-full"
                    >
                      <CategoryHeading>
                        {category.name[currentLang]}
                      </CategoryHeading>
                      
                      <MenuCategory category={category} />
                    </div>
                  ))}
              </div>
              
              {/* Third row: sides centered */}
              <div className="md:w-1/2 mx-auto">
                {foodCategories
                  .filter(cat => cat.id === 'sides')
                  .map((category) => (
                    <div 
                      id={`category-${category.id}`} 
                      key={category.id}
                      className="menu-category-item transition-all duration-150 hover:translate-y-[-5px] scroll-mt-28 w-full"
                    >
                      <CategoryHeading>
                        {category.name[currentLang]}
                      </CategoryHeading>
                      
                      <MenuCategory category={category} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(FoodMenu); 