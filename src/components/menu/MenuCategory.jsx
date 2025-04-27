import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';

function MenuCategory({ category }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Safety checks
  if (!category || !Array.isArray(category.items)) {
    return <div className="text-red-500">Error: Invalid category data</div>;
  }

  // Check if this is a drinks category
  const isDrinks = category.id === 'drinks' || (category.parentId === 'drinks');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      {category.items.map((item, index) => {
        // Add safety checks for required properties
        if (!item || !item.name || !item.description) {
          console.error('Invalid menu item:', item);
          return null;
        }

        // Ensure name and description exist for the current language
        const name = item.name && (item.name[currentLang] || item.name.en || item.name.nl || 'Unnamed Item');
        const description = item.description && (item.description[currentLang] || item.description.en || item.description.nl || '');
        
        // Improved allergen handling
        let allergens = [];
        if (item.allergens) {
          // Check if allergens is an object with language keys
          if (typeof item.allergens === 'object' && !Array.isArray(item.allergens)) {
            // Try to get allergens for current language, fallback to English, then Dutch, or empty array
            allergens = item.allergens[currentLang] || item.allergens.en || item.allergens.nl || [];
          } else if (Array.isArray(item.allergens)) {
            // If allergens is directly an array
            allergens = item.allergens;
          }
        }
        
        return (
          <div 
            key={item.id || index} 
            className="h-auto min-h-[120px] transition-all duration-300" 
            style={{ animationDelay: `${index * 50}ms` }}
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