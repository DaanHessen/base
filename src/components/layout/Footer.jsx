import React from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import monseesLogo from '../../assets/monsees.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-pastel-dark py-4">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between">
          {/* Left section - Location and phone */}
          <div className="w-full md:w-auto mb-2 md:mb-0">
            <div className="flex items-start mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-pastel-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="leading-relaxed text-sm">Biersteeg 10, 1211 GC Hilversum, Nederland</span>
            </div>
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-pastel-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm">+12 345 6789</span>
            </div>
          </div>

          {/* Middle section - Copyright */}
          <div className="w-full md:w-auto text-center mb-2 md:mb-0">
            <p className="text-xs">© {currentYear} BASE</p>
          </div>

          {/* Right section - Opening hours and icons */}
          <div className="w-full md:w-auto flex flex-col items-end">
            <div className="mb-2">
              <p className="text-sm leading-relaxed">Woensdag - Zaterdag: 12:00 - 23:00</p>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pastel-light hover:text-accent transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.brasseriemonsees.nl/" target="_blank" rel="noopener noreferrer" className="text-pastel-light transition-colors group" aria-label="Monsees">
                <img 
                  src={monseesLogo} 
                  alt="Monsees" 
                  className="h-5 w-auto transition-all duration-200" 
                  style={{ 
                    filter: 'brightness(0) invert(1)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(49%) sepia(83%) saturate(2404%) hue-rotate(348deg) brightness(98%) contrast(95%)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'brightness(0) invert(1)';
                  }}
                />
              </a>
              <a href="mailto:info@base.nl" className="text-pastel-light hover:text-accent transition-colors flex items-center space-x-1" aria-label="Email us">
                <FaEnvelope size={18} />
                <span className="text-sm font-medium">Contact</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 