import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';

function MenuCategory({ category }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  if (!category || !Array.isArray(category.items)) {
    return <div className="text-red-500">Error: Invalid category data</div>;
  }

  const isDrinks = category.id === 'drinks' || (category.parentId === 'drinks');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 px-1 sm:px-0 max-w-full mx-auto">
      {category.items.map((item, index) => {
        if (!item || !item.name || !item.description) {
          console.error('Invalid menu item:', item);
          return null;
        }

        const name = item.name && (item.name[currentLang] || item.name.en || item.name.nl || 'Unnamed Item');
        const description = item.description && (item.description[currentLang] || item.description.en || item.description.nl || '');
        
        let allergens = [];
        if (item.allergens) {
          if (typeof item.allergens === 'object' && !Array.isArray(item.allergens)) {
            allergens = item.allergens[currentLang] || item.allergens.en || item.allergens.nl || [];
          } else if (Array.isArray(item.allergens)) {
            allergens = item.allergens;
          }
        }
        
        return (
          <div 
            key={item.id || index} 
            className="h-auto min-h-[120px] transition-all duration-300 animate-fadeIn w-full"
            style={{ 
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both' 
            }}
          >
            <MenuItem 
              name={name} 
              description={description} 
              price={item.price || '€0.00'} 
              allergens={allergens} 
              vegan={item.vegan}
              isDrinks={isDrinks}
            />
          </div>
        );
      })}
    </div>
  );
}

export default memo(MenuCategory); 