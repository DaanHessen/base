import React, { useState, memo } from 'react';
import { FaLeaf } from 'react-icons/fa';

const VeganIcon = memo(() => (
  <FaLeaf className="w-4 h-4 text-green-500" />
));

VeganIcon.displayName = 'Vegan';

const MenuItem = ({ name, description, price, allergens = [], vegan, language }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const hasAllergens = allergens && allergens.length > 0;
  
  const translations = {
    nl: {
      allergens: "Allergenen",
      vegan: "Veganistisch"
    },
    en: {
      allergens: "Allergens",
      vegan: "Vegan"
    }
  };
  
  return (
    <div 
      className="flex flex-col p-3 sm:p-3.5 border border-dim-gray/20 rounded-lg bg-onyx/30 transition-all duration-300 hover:shadow-[0_4px_20px_-2px_rgba(197,167,95,0.2)] hover:bg-dim-gray/10 hover:border-gold/30 group h-full w-full relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      {/* Gold accent line that appears on hover */}
      <div className="absolute top-0 left-0 w-0 h-1 bg-gold transition-all duration-300 group-hover:w-full"></div>
      
      <div className="p-2 sm:p-3 flex flex-col h-full relative">
        <div className="flex justify-between items-start mb-1.5">
          <div className="flex items-center max-w-[70%]">
            <h3 className="text-base font-heading font-semibold text-magnolia group-hover:text-gold transition-colors duration-300 truncate">{name}</h3>
            {vegan && (
              <div className="ml-1.5 flex-shrink-0" title={translations[language].vegan}>
                <VeganIcon />
              </div>
            )}
          </div>
          <span className="text-gold font-bold ml-1 flex-shrink-0 text-base bg-onyx/60 px-2 py-0.5 rounded">{price}</span>
        </div>
        
        <p className="text-thistle/90 font-body text-sm leading-relaxed flex-grow line-clamp-2">{description}</p>
        
        {hasAllergens && (
          <div 
            className={`mt-auto pt-1.5 border-t border-gray-800/30 transition-all duration-300 ${
              isHovered || window.innerWidth < 768 ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <p className="text-xs text-gray-400/90 flex items-center">
              <span className="mr-1 text-xs">⚠</span>
              <span className="truncate">{translations[language].allergens}: {allergens.join(', ')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MenuItem); 