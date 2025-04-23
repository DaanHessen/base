import React, { memo } from 'react';
import MenuItem from './MenuItem';

const MenuCategory = ({ category, language }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {category.items.map(item => (
        <div key={item.id} className="h-48">
          <MenuItem 
            name={item.name[language]} 
            description={item.description[language]} 
            price={item.price}
            allergens={item.allergens[language]} 
            vegan={item.vegan}
            language={language}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(MenuCategory); 