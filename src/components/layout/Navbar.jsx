import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className="w-full z-40 transition-all duration-300 bg-dark"
    >
      <div className="max-w-screen-xl mx-auto px-6 py-4 relative">
        {/* Top Bar Separator (visible when scrolled) */}
        {scrolled && (
          <div className="absolute inset-x-0 bottom-0 h-px bg-gray-800"></div>
        )}
        
        <div className="flex items-center justify-between">        
          {/* Logo - centered and larger */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <Logo className="w-40 sm:w-52 md:w-60" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-start">
            <ul className="flex items-start space-x-6 pt-1">
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
          
          {/* Hamburger Menu Button (Mobile Only) - Fixed position with high z-index */}
          <button 
            className="block md:hidden text-pastel-light focus:outline-none z-50 fixed top-6 right-6"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            style={{ position: 'fixed', top: '1.5rem', right: '1.5rem' }}
          >
            <div className="w-10 h-8 flex flex-col items-end justify-center">
              <span className={`block h-1 bg-pastel-light rounded-full transition-all duration-300 ease-out ${mobileMenuOpen ? 'w-10 transform rotate-45 translate-y-1.5' : 'w-10'}`}></span>
              <span className={`block h-1 bg-pastel-light rounded-full my-1.5 transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-0 w-0' : 'w-8'}`}></span>
              <span className={`block h-1 bg-pastel-light rounded-full transition-all duration-300 ease-out ${mobileMenuOpen ? 'w-10 transform -rotate-45 -translate-y-1.5' : 'w-6'}`}></span>
            </div>
          </button>
          
          {/* Empty div for desktop layout balance */}
          <div className="hidden md:block md:flex-1"></div>
          
          {/* Mobile Menu */}
          <div 
            className={`fixed inset-0 bg-dark/98 backdrop-blur-lg flex flex-col items-center justify-center z-40 transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <nav className="w-full max-w-sm">
              <ul className="flex flex-col items-center space-y-8">
                <li className="w-full text-center">
                  <Link 
                    to="/" 
                    className={`block relative text-lg py-2 uppercase tracking-widest font-heading ${isActive('/') ? 'text-accent font-medium' : 'text-pastel-light'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                    {isActive('/') && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                    )}
                  </Link>
                </li>
                <li className="w-full text-center">
                  <Link 
                    to="/menu" 
                    className={`block relative text-lg py-2 uppercase tracking-widest font-heading ${isActive('/menu') ? 'text-accent font-medium' : 'text-pastel-light'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Menu
                    {isActive('/menu') && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                    )}
                  </Link>
                </li>
                <li className="w-full text-center">
                  <Link 
                    to="/about" 
                    className={`block relative text-lg py-2 uppercase tracking-widest font-heading ${isActive('/about') ? 'text-accent font-medium' : 'text-pastel-light'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Over Ons
                    {isActive('/about') && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                    )}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 