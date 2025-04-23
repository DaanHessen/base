import React, { useState } from 'react';
import { FaLeaf } from 'react-icons/fa';

const VeganIcon = () => (
  <FaLeaf className="w-5 h-5 text-green-500" />
);

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
      className="group relative overflow-hidden rounded-lg border border-gray-800/80 backdrop-blur-sm bg-gray-900/30 h-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
      
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <h3 className="text-lg sm:text-xl font-heading font-semibold text-white group-hover:text-accent transition-colors duration-300">{name}</h3>
            {vegan && (
              <div className="ml-2 flex items-center" title={translations[language].vegan}>
                <VeganIcon />
              </div>
            )}
          </div>
          <span className="text-accent font-bold ml-3 flex-shrink-0">{price}</span>
        </div>
        
        <p className="text-pastel-light mb-4 font-body text-xs sm:text-sm leading-relaxed">{description}</p>
        
        {hasAllergens && (
          <div 
            className={`mt-auto pt-2 border-t border-gray-800/50 transition-all duration-300 ${
              isHovered || window.innerWidth < 768 ? 'opacity-100' : 'opacity-60'
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

export default MenuItem; 