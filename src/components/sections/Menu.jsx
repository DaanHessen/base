import React, { useState, useEffect } from 'react';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0]?.id);
  const [visibleCategories, setVisibleCategories] = useState([]);

  useEffect(() => {
    // Initially show all categories
    setVisibleCategories(menuData.categories.map(cat => cat.id));
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen py-16 pt-36">
      <div className="max-w-screen-xl mx-auto px-6">
        <h1 className="text-5xl font-heading font-bold text-center text-white mb-16">Menu</h1>
        
        {/* Horizontal category tabs */}
        <div className="sticky top-24 z-30 bg-dark/80 backdrop-blur-md py-4 px-2 rounded-lg mb-12 border border-gray-800/50 shadow-xl">
          <div className="flex justify-between items-center flex-wrap gap-2">
            {menuData.categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'text-accent font-semibold' 
                    : 'text-pastel-light hover:text-accent'
                }`}
              >
                {category.name}
                {activeCategory === category.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Displayed Menu Categories */}
        <div className="space-y-24">
          {menuData.categories.map(category => (
            <div 
              id={`category-${category.id}`} 
              key={category.id}
              className={`scroll-mt-36 ${visibleCategories.includes(category.id) ? 'block' : 'hidden'}`}
            >
              <div className="mb-10">
                <h2 className="text-3xl font-heading font-semibold text-white mb-2">
                  {category.name}
                </h2>
                <div className="w-20 h-1 bg-accent mb-8"></div>
                {category.description && (
                  <p className="text-pastel-light max-w-2xl mb-8">{category.description}</p>
                )}
              </div>
              
              <MenuCategory category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu; 