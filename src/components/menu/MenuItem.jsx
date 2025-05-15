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
  
  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      className="menu-item group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={(e) => {
        if (isMobile) {
          e.preventDefault();
          setIsHovered(true);
        }
      }}
    >
      <div className="menu-item-border-top"></div>
      <div className="menu-item-border-right"></div>
      <div className="menu-item-border-bottom"></div>
      <div className="menu-item-border-left"></div>
      
      <div className="menu-item-content">
        <div className="menu-item-header">
          <div className="menu-item-title-wrapper">
            <h3 className="menu-item-title">
              <span>{name}</span>
              {showVeganInfo && (
                <div className="menu-item-vegan-icon" title={t('vegan')}>
                  <VeganIcon />
                </div>
              )}
            </h3>
          </div>
          <span className="menu-item-price">{price}</span>
        </div>
        
        <div className="menu-item-description-wrapper">
          <p className={`menu-item-description ${!isExpanded && isMobile ? 'line-clamp-3' : ''}`}>
            {description}
          </p>
          
          {description && description.length > 80 && isMobile && (
            <button 
              onClick={handleToggleExpand}
              className="menu-item-expand-button"
            >
              {isExpanded ? t('readLess') : t('readMore')}
            </button>
          )}
        </div>
        
        {showAllergens && (
          <div className="menu-item-allergens">
            <p className="menu-item-allergens-text">
              <span className="allergen-warning">⚠</span>
              <span className="allergen-list">{t('allergens.title')}: {translatedAllergens.join(', ')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(MenuItem); 