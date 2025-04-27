import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLeaf } from 'react-icons/fa';

const VeganIcon = memo(() => (
  <FaLeaf className="w-4 h-4 text-green-500" />
));

VeganIcon.displayName = 'Vegan';

function MenuItem({ name, description, price, allergens, vegan, isDrinks }) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation('menu');
  
  const hasAllergens = Array.isArray(allergens) && allergens.length > 0 && allergens[0] !== "";
  const isVegan = vegan === true;
  
  // Don't show allergens/vegan icon for drinks
  const showVeganInfo = !isDrinks && isVegan;
  const showAllergens = !isDrinks && hasAllergens;
  
  return (
    <div 
      className="flex flex-col p-3.5 sm:p-4 border border-dim-gray/30 rounded-lg bg-onyx/60 transition-all duration-150 hover:shadow-[0_4px_20px_-2px_rgba(197,167,95,0.25)] hover:bg-dim-gray/20 hover:border-gold/40 group h-full w-full relative overflow-hidden hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold transition-all duration-150 group-hover:w-full"></div>
      <div className="absolute top-0 right-0 w-0.5 h-0 bg-gold transition-all duration-150 group-hover:h-full"></div>
      <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gold transition-all duration-150 group-hover:w-full"></div>
      <div className="absolute bottom-0 left-0 w-0.5 h-0 bg-gold transition-all duration-150 group-hover:h-full"></div>
      
      <div className="p-2 sm:p-3 flex flex-col h-full relative">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center max-w-[calc(100%-75px)]">
            <h3 className="text-base font-heading font-semibold text-magnolia group-hover:text-gold transition-colors duration-150 truncate">{name}</h3>
            {showVeganInfo && (
              <div className="ml-1.5 flex-shrink-0" title={t('vegan')}>
                <VeganIcon />
              </div>
            )}
          </div>
          <span className="text-gold font-body font-medium price-tag flex-shrink-0 bg-onyx/80 px-2 py-0.5 rounded-md shadow-sm flex items-center justify-center ml-2">{price}</span>
        </div>
        
        <p className="text-thistle/90 font-body text-sm leading-relaxed flex-grow line-clamp-3">{description}</p>
        
        {showAllergens && (
          <div 
            className={`mt-auto pt-1.5 border-t border-gray-800/40 transition-all duration-150 ${
              isHovered || window.innerWidth < 768 ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <p className="text-xs text-gray-400/90 flex items-center">
              <span className="mr-1 text-xs">⚠</span>
              <span className="truncate">{t('allergens')}: {allergens.join(', ')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(MenuItem); 