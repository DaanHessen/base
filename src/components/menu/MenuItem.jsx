import React, { useState, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLeaf } from 'react-icons/fa';

// TODO: make sure the full description and title are shown. title now has one row and is cut off quickly. description probably has the same problem.

const VeganIcon = memo(() => (
  <FaLeaf className="w-4 h-4 text-green-500" />
));

VeganIcon.displayName = 'Vegan';

function MenuItem({ name, description, price, allergens, vegan, isDrinks }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation('menu');
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  const hasAllergens = Array.isArray(allergens) && allergens.length > 0 && allergens[0] !== "";
  const isVegan = vegan === true;
  
  const showVeganInfo = !isDrinks && isVegan;
  const showAllergens = !isDrinks && hasAllergens;
  
  const translatedAllergens = hasAllergens 
    ? allergens.map(code => {
        try {
          const translated = t(`allergens.${code}`);
          return translated === `allergens.${code}` ? code : translated;
        } catch (e) {
          return code;
        }
      })
    : [];
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      className="flex flex-col p-3 sm:p-4 bg-onyx/70 backdrop-blur-sm border border-gold/30 rounded-lg shadow-lg transition-all duration-150 hover:shadow-[0_4px_20px_-2px_rgba(212,175,55,0.4)] hover:bg-dim-gray/20 hover:border-gold/40 group w-full relative overflow-hidden hover:-translate-y-1 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold/60 shadow-[0_0_5px_0px_rgba(212,175,55,0.2)] transition-all duration-150 group-hover:w-full group-hover:bg-gold group-hover:shadow-[0_0_5px_2px_rgba(212,175,55,0.4)]"></div>
      <div className="absolute top-0 right-0 w-0.5 h-0 bg-gold/60 shadow-[0_0_5px_0px_rgba(212,175,55,0.2)] transition-all duration-150 group-hover:h-full group-hover:bg-gold group-hover:shadow-[0_0_5px_2px_rgba(212,175,55,0.4)]"></div>
      <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gold/60 shadow-[0_0_5px_0px_rgba(212,175,55,0.2)] transition-all duration-150 group-hover:w-full group-hover:bg-gold group-hover:shadow-[0_0_5px_2px_rgba(212,175,55,0.4)]"></div>
      <div className="absolute bottom-0 left-0 w-0.5 h-0 bg-gold/60 shadow-[0_0_5px_0px_rgba(212,175,55,0.2)] transition-all duration-150 group-hover:h-full group-hover:bg-gold group-hover:shadow-[0_0_5px_2px_rgba(212,175,55,0.4)]"></div>
      
      <div className="p-2 sm:p-3 flex flex-col relative">
        <div className="flex justify-between items-start gap-2 mb-2.5">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-heading font-semibold text-magnolia group-hover:text-gold transition-colors duration-150 flex items-center">
              <span className="break-words pr-1 block truncate">{name}</span>
              {showVeganInfo && (
                <div className="ml-1 flex-shrink-0" title={t('vegan')}>
                  <VeganIcon />
                </div>
              )}
            </h3>
          </div>
          <span className="text-gold font-body font-medium price-tag flex-shrink-0 bg-onyx/80 px-2 py-0.5 rounded-md shadow-sm flex items-center justify-center self-start whitespace-nowrap">{price}</span>
        </div>
        
        <div className="">
          <p className={`text-thistle/90 font-body text-sm leading-relaxed mb-2 break-words ${isMobile ? 'line-clamp-2' : ''}`}>
            {description}
          </p>
          
          {description.length > 80 && isMobile && (
            <button 
              onClick={handleToggleExpand}
              className="text-xs text-gold/80 hover:text-gold mt-1 focus:outline-none"
            >
              {isExpanded ? t('readLess') : t('readMore')}
            </button>
          )}
          {!isMobile && description.length > 100 && (
            <button 
              onClick={handleToggleExpand}
              className="text-xs text-gold/80 hover:text-gold mt-1 focus:outline-none"
            >
              {isExpanded ? t('readLess') : t('readMore')}
            </button>
          )}
        </div>
        
        {showAllergens && (
          <div 
            className={`mt-auto pt-1.5 ${!isMobile ? 'border-t border-onyx/80' : ''} transition-all duration-150 ${
              isHovered || isMobile ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <p className="text-xs text-gray-400/90 flex items-start">
              <span className="mr-1 text-xs mt-0.5">⚠</span>
              <span className="leading-tight break-words">{t('allergens.title')}: {translatedAllergens.join(', ')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(MenuItem); 