import React, { useState } from 'react';

const MenuItem = ({ name, description, price, allergens = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Show allergens only if they exist and are not empty
  const hasAllergens = allergens && allergens.length > 0;
  
  return (
    <div 
      className="group relative overflow-hidden rounded-lg border border-gray-800/80 backdrop-blur-sm bg-gray-900/30 h-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent border with gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-heading font-semibold text-white group-hover:text-accent transition-colors duration-300">{name}</h3>
          <span className="text-accent font-bold ml-3 flex-shrink-0">{price}</span>
        </div>
        
        <p className="text-pastel-light mb-4 font-body text-sm leading-relaxed">{description}</p>
        
        {/* Allergens info - conditionally shown */}
        {hasAllergens && (
          <div 
            className={`mt-auto pt-2 border-t border-gray-800/50 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <p className="text-xs text-gray-400 flex items-center">
              <span className="mr-2">⚠</span>
              <span>Allergenen: {allergens.join(', ')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem; 