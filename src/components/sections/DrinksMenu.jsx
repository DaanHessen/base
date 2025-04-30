import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';

function DrinksMenu() {
  const { t, i18n } = useTranslation(['menu', 'common']);
  const currentLang = i18n.language;
  
  const drinksCategory = menuData.categories.find(cat => cat.id === 'drinks');
  
  if (!drinksCategory) {
    return (
      <div className="py-20 text-center text-magnolia">
        <h2 className="text-2xl">Drinks menu not found</h2>
      </div>
    );
  }
  
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

  // Determine if we have an odd number of subcategories for proper layout
  const hasSubcategories = drinksCategory.subcategories && drinksCategory.subcategories.length > 0;
  const totalSubcategories = hasSubcategories ? drinksCategory.subcategories.length : 0;
  const hasOddNumberOfSubcategories = totalSubcategories % 2 !== 0;
  
  // Get the last subcategory if we have an odd number
  const lastSubcategory = hasOddNumberOfSubcategories && totalSubcategories > 0 
    ? drinksCategory.subcategories[totalSubcategories - 1] 
    : null;
  
  // Get all subcategories except the last one for the main grid
  const mainGridSubcategories = hasSubcategories 
    ? (hasOddNumberOfSubcategories 
        ? drinksCategory.subcategories.slice(0, -1) 
        : drinksCategory.subcategories)
    : [];

  return (
    <>
      <Helmet>
        <title>{`${t('menu:drinks.title')} - ${t('common:seo.title')}`}</title>
        <meta name="description" content={t('menu:drinks.description')} />
        <link rel="canonical" href={`${window.location.origin}/menu/drinks/${currentLang === 'en' ? 'en/' : ''}`} />
        {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/menu/drinks/en/`} />}
        {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}/menu/drinks/`} />}
      </Helmet>
      
      <section className="py-14 pt-32 sm:pt-40 md:pt-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="home-title mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-magnolia mb-4 sm:mb-6 leading-tight">
              {t('menu:drinks.title')}
            </h1>
            <div className="w-14 sm:w-16 md:w-20 h-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]"></div>
          </div>
          
          {/* Categories selection on mobile */}
          {hasSubcategories && (
            <div className="md:hidden overflow-x-auto pb-4 mb-4 whitespace-nowrap no-scrollbar">
              <div className="flex space-x-3">
                {drinksCategory.subcategories.map((subcategory) => (
                  <button 
                    key={subcategory.id}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`subcategory-${subcategory.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="px-4 py-2 text-sm rounded-full border border-gold/30 bg-onyx/70 text-gold whitespace-nowrap flex-shrink-0 hover:bg-gold/20 transition-all duration-150"
                  >
                    {subcategory.name[currentLang]}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Mobile view - all subcategories in one column */}
          <div className="block md:hidden">
            {hasSubcategories && drinksCategory.subcategories.map((subcategory) => (
              <div 
                id={`subcategory-${subcategory.id}`} 
                key={subcategory.id}
                className="menu-category-item mb-10 transition-all duration-150 hover:translate-y-[-2px] scroll-mt-28"
              >
                <CategoryHeading>
                  {subcategory.name[currentLang]}
                </CategoryHeading>
                
                <MenuCategory category={subcategory} />
              </div>
            ))}
          </div>
          
          {/* Desktop view - custom grid layout */}
          <div className="hidden md:block">
            {/* Main grid with all categories except the last one if odd number */}
            {mainGridSubcategories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10 md:gap-y-16 mb-16">
                {mainGridSubcategories.map((subcategory) => (
                  <div 
                    id={`subcategory-${subcategory.id}`} 
                    key={subcategory.id}
                    className="menu-category-item transition-all duration-150 hover:translate-y-[-5px] scroll-mt-28 w-full"
                  >
                    <CategoryHeading>
                      {subcategory.name[currentLang]}
                    </CategoryHeading>
                    
                    <MenuCategory category={subcategory} />
                  </div>
                ))}
              </div>
            )}
            
            {/* Last category centered if odd number */}
            {lastSubcategory && (
              <div className="md:w-1/2 mx-auto">
                <div 
                  id={`subcategory-${lastSubcategory.id}`} 
                  key={lastSubcategory.id}
                  className="menu-category-item transition-all duration-150 hover:translate-y-[-5px] scroll-mt-28 w-full"
                >
                  <CategoryHeading>
                    {lastSubcategory.name[currentLang]}
                  </CategoryHeading>
                  
                  <MenuCategory category={lastSubcategory} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(DrinksMenu); 