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
      className="overflow-hidden rounded-md bg-gray-900/20 backdrop-blur-sm border border-gray-800/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:bg-gray-900/30 hover:border-accent/30 group h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <div className="p-3.5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-1.5">
          <div className="flex items-center">
            <h3 className="text-base font-heading font-semibold text-white group-hover:text-accent transition-colors duration-300">{name}</h3>
            {vegan && (
              <div className="ml-1.5 flex-shrink-0" title={translations[language].vegan}>
                <VeganIcon />
              </div>
            )}
          </div>
          <span className="text-accent font-bold ml-2 flex-shrink-0 text-base">{price}</span>
        </div>
        
        <p className="text-pastel-light/90 font-body text-sm leading-relaxed flex-grow line-clamp-2">{description}</p>
        
        {hasAllergens && (
          <div 
            className={`mt-auto pt-1.5 border-t border-gray-800/30 transition-all duration-300 ${
              isHovered || window.innerWidth < 768 ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <p className="text-xs text-gray-400/90 flex items-center">
              <span className="mr-1.5 text-xs">⚠</span>
              <span className="truncate">{translations[language].allergens}: {allergens.join(', ')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MenuItem); 