import React, { useState, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLeaf } from 'react-icons/fa';
import './Menu.css';

// TODO: how do I solve the problem where long titles and descriptions are cut off?

const VeganIcon = memo(() => (
  <FaLeaf className="vegan-icon" />
));

VeganIcon.displayName = 'Vegan';

function MenuItem({ name, description, price, allergens, vegan, isDrinks }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation('menu');
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  const hasAllergens = Array.isArray(allergens) && allergens.length > 0 && allergens[0] !== "";
  const isVegan = vegan === true;
  
  const showVeganInfo = !isDrinks && isVegan;
  const showAllergens = !isDrinks && hasAllergens;
  
  const translatedAllergens = hasAllergens 
    ? allergens.map(code => {
        try {
          const translated = t(`allergens.${code}`);
          return translated === `allergens.${code}` ? code : translated;
        } catch (e) {
          return code;
        }
      })
    : [];
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      className="menu-item group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <div className="menu-item-border-top"></div>
      <div className="menu-item-border-right"></div>
      <div className="menu-item-border-bottom"></div>
      <div className="menu-item-border-left"></div>
      
      <div className="p-2 sm:p-3 flex flex-col relative">
        <div className="flex justify-between items-start gap-2 mb-2.5">
          <div className="flex-1 min-w-0">
            <h3 className="menu-item-title">
              <span className="break-words pr-1 block truncate">{name}</span>
              {showVeganInfo && (
                <div className="ml-1 flex-shrink-0" title={t('vegan')}>
                  <VeganIcon />
                </div>
              )}
            </h3>
          </div>
          <span className="menu-item-price">{price}</span>
        </div>
        
        <div className="">
          <p className={`menu-item-description ${isMobile ? 'line-clamp-2' : ''}`}>
            {description}
          </p>
          
          {description.length > 80 && isMobile && (
            <button 
              onClick={handleToggleExpand}
              className="text-xs text-gold/80 hover:text-gold mt-1 focus:outline-none"
            >
              {isExpanded ? t('readLess') : t('readMore')}
            </button>
          )}
          {!isMobile && description.length > 100 && (
            <button 
              onClick={handleToggleExpand}
              className="text-xs text-gold/80 hover:text-gold mt-1 focus:outline-none"
            >
              {isExpanded ? t('readLess') : t('readMore')}
            </button>
          )}
        </div>
        
        {showAllergens && (
          <div 
            className={`menu-item-allergens ${!isMobile ? 'border-t border-onyx/80' : ''} ${
              isHovered || isMobile ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <p className="menu-item-allergens-text">
              <span className="mr-1 text-xs mt-0.5">⚠</span>
              <span className="leading-tight break-words">{t('allergens.title')}: {translatedAllergens.join(', ')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(MenuItem); 