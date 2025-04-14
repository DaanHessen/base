import React, { useState } from 'react';
import MenuCategory from '../menu/MenuCategory';
import menuData from '../../data/menu.json';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0]?.id);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen py-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <h1 className="text-5xl font-heading font-bold text-center text-white mb-10">Onze Menu</h1>
        
        <div className="flex justify-center mb-16 overflow-x-auto py-2">
          <div className="flex space-x-4">
            {menuData.categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap text-sm font-medium ${
                  activeCategory === category.id 
                    ? 'bg-accent text-white' 
                    : 'bg-gray-800/50 text-pastel-light hover:bg-gray-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-20">
          {menuData.categories.map(category => (
            <div id={`category-${category.id}`} key={category.id}>
              <MenuCategory category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu; 