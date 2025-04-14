import React from 'react';
import MenuItem from './MenuItem';

const MenuCategory = ({ category }) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-heading font-semibold text-white mb-8 pb-2 border-b border-gray-700 relative">
        {category.name}
        <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-accent"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.items.map(item => (
          <MenuItem 
            key={item.id} 
            name={item.name} 
            description={item.description} 
            price={item.price}
            allergens={item.allergens} 
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory; 