import React from 'react';
import MenuItem from './MenuItem';

const MenuCategory = ({ category, language }) => {
  return (
    <div className="mb-8 sm:mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {category.items.map(item => (
          <MenuItem 
            key={item.id} 
            name={item.name[language]} 
            description={item.description[language]} 
            price={item.price}
            allergens={item.allergens[language]} 
            vegan={item.vegan}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory; 