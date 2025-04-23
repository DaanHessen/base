import React from 'react';
import MenuItem from './MenuItem';

const MenuCategory = ({ category }) => {
  // Split items into two rows for better layout
  const totalItems = category.items.length;
  const itemsPerRow = Math.ceil(totalItems / 2);
  
  const firstRowItems = category.items.slice(0, itemsPerRow);
  const secondRowItems = category.items.slice(itemsPerRow);

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-heading font-semibold text-white mb-8 pb-2 border-b border-gray-700 relative">
        {category.name}
        <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-accent"></span>
      </h2>
      {/* First row of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {firstRowItems.map(item => (
          <MenuItem 
            key={item.id} 
            name={item.name} 
            description={item.description} 
            price={item.price}
            allergens={item.allergens} 
          />
        ))}
      </div>
      
      {/* Second row of items, if any */}
      {secondRowItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {secondRowItems.map(item => (
            <MenuItem 
              key={item.id} 
              name={item.name} 
              description={item.description} 
              price={item.price}
              allergens={item.allergens} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategory; 