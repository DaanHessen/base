import React, { useState } from 'react';

const MenuItem = ({ name, description, price, allergens = ['gluten', 'dairy', 'nuts'] }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="p-6 rounded-lg border border-gray-800 backdrop-blur-sm bg-gray-900/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-heading font-semibold text-white">{name}</h3>
        <span className="text-accent font-bold ml-2">{price}</span>
      </div>
      <p className="text-gray-300 mb-4 font-body text-sm">{description}</p>
      
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 rounded-b-lg transition-all duration-300 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <p className="text-xs text-gray-400">Allergens: {allergens.join(', ')}</p>
      </div>
    </div>
  );
};

export default MenuItem; 