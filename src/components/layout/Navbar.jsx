import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll state for styling
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-lg shadow-lg' : ''
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex items-center px-6 pt-24 pb-4">
        <nav className="flex-1 flex justify-start">
          <ul className="flex items-center space-x-6">
            <li>
              <Link 
                to="/" 
                className={`relative transition-all duration-300 py-2 text-xs uppercase tracking-widest font-heading ${isActive('/') ? 'text-accent font-medium' : 'text-pastel-light hover:text-accent'}`}
              >
                Home
                {isActive('/') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/menu" 
                className={`relative transition-all duration-300 py-2 text-xs uppercase tracking-widest font-heading ${isActive('/menu') ? 'text-accent font-medium' : 'text-pastel-light hover:text-accent'}`}
              >
                Menu
                {isActive('/menu') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`relative transition-all duration-300 py-2 text-xs uppercase tracking-widest font-heading ${isActive('/about') ? 'text-accent font-medium' : 'text-pastel-light hover:text-accent'}`}
              >
                Over Ons
                {isActive('/about') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex-shrink-0 flex justify-center absolute left-1/2 transform -translate-x-1/2 top-4">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        
        <div className="flex-1"></div>
      </div>
    </header>
  );
};

export default Navbar; 