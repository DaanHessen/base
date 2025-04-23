import React, { useState, memo } from 'react';
import { FaLeaf } from 'react-icons/fa';

const VeganIcon = memo(() => (
  <FaLeaf className="w-5 h-5 text-green-500" />
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
      className="overflow-hidden rounded-lg bg-gray-700/40 border border-gray-600/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:bg-gray-700/60 hover:border-accent/30 group h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start">
            <h3 className="text-lg font-heading font-semibold text-white group-hover:text-accent transition-colors duration-300 pr-2">{name}</h3>
            {vegan && (
              <div className="ml-1 mt-1 flex-shrink-0" title={translations[language].vegan}>
                <VeganIcon />
              </div>
            )}
          </div>
          <span className="text-accent font-bold ml-2 flex-shrink-0 text-lg">{price}</span>
        </div>
        
        <p className="text-pastel-light font-body text-sm leading-relaxed flex-grow line-clamp-3">{description}</p>
        
        {hasAllergens && (
          <div 
            className={`mt-auto pt-2 border-t border-gray-600/30 transition-all duration-300 ${
              isHovered || window.innerWidth < 768 ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <p className="text-xs text-gray-400 flex items-center">
              <span className="mr-2">⚠</span>
              <span>{translations[language].allergens}: {allergens.join(', ')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MenuItem); 