import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from './MenuItem';
import './Menu.css';

function MenuCategory({ category }) {
  const { t, i18n } = useTranslation('menu');
  const currentLang = i18n.language;
  
  if (!category || !category.items || category.items.length === 0) {
    return (
      <div className="py-4 px-3 bg-onyx/50 rounded-md text-center">
        <p className="text-magnolia/70">{t('noItems')}</p>
      </div>
    );
  }
  
  const isDrinks = category.parentId === 'drinks' || category.id === 'drinks';
  
  return (
    <div className="menu-grid">
      {category.items.map((item, index) => {
        const name = item.name && item.name[currentLang] 
          ? item.name[currentLang] 
          : (item.name?.en || item.name?.nl || 'Unnamed Item');
          
        const description = item.description && item.description[currentLang]
          ? item.description[currentLang]
          : (item.description?.en || item.description?.nl || '');
          
        // Get allergens with language-specific handling
        let allergens = [];
        if (item.allergens) {
          if (Array.isArray(item.allergens)) {
            allergens = item.allergens;
          } else if (item.allergens[currentLang]) {
            allergens = item.allergens[currentLang];
          } else if (item.allergens.en) {
            allergens = item.allergens.en;
          } else if (item.allergens.nl) {
            allergens = item.allergens.nl;
          }
        }
        
        return (
          <div 
            key={item.id || index} 
            className="h-auto min-h-[120px] transition-all duration-300 animate-fadeIn w-full self-start"
            style={{ 
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both',
              maxWidth: '100%'
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