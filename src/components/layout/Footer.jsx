import React, { useState } from 'react';
import { FaInstagram, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import monseesLogo from '../../assets/monsees.svg';
import footerData from '../../data/footer.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [copyMessage, setCopyMessage] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyMessage(`${type} copied!`);
        setTimeout(() => setCopyMessage(''), 2000);
      },
      () => {
        setCopyMessage('Failed to copy');
        setTimeout(() => setCopyMessage(''), 2000);
      }
    );
  };

  return (
    <footer className="bg-dark text-pastel-light pt-8 pb-6 relative">
      {/* Dividing line at the top of footer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-800"></div>
      
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left section - Location and phone */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="leading-relaxed text-sm">{footerData.footer.address}</span>
            </div>
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <button 
                className="text-sm hover:text-accent transition-colors duration-200"
                onClick={() => copyToClipboard(footerData.footer.phone, 'Phone number')}
              >
                {footerData.footer.phone}
              </button>
            </div>
            <div className="flex items-start">
              <FaEnvelope className="h-5 w-5 mr-3 mt-0.5 text-accent" />
              <button 
                className="text-sm hover:text-accent transition-colors duration-200"
                onClick={() => copyToClipboard(footerData.footer.email, 'Email')}
              >
                {footerData.footer.email}
              </button>
            </div>
          </div>

          {/* Middle section - Opening hours */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-accent text-sm font-medium mb-2 uppercase tracking-wide">Openingstijden</h3>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <span>Zondag:</span>
              <span>{footerData.footer.openingHours.sunday}</span>
              
              <span>Maandag:</span>
              <span>{footerData.footer.openingHours.monday}</span>
              
              <span>Dinsdag:</span>
              <span>{footerData.footer.openingHours.tuesday}</span>
              
              <span>Woensdag:</span>
              <span>{footerData.footer.openingHours.wednesday}</span>
              
              <span>Donderdag:</span>
              <span>{footerData.footer.openingHours.thursday}</span>
              
              <span>Vrijdag:</span>
              <span>{footerData.footer.openingHours.friday}</span>
              
              <span>Zaterdag:</span>
              <span>{footerData.footer.openingHours.saturday}</span>
            </div>
          </div>

          {/* Right section - Social media */}
          <div className="flex flex-col">
            <h3 className="text-accent text-sm font-medium mb-4 uppercase tracking-wide">Volg Ons</h3>
            <div className="flex items-center space-x-6 mb-6">
              <a href={footerData.footer.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pastel-light hover:text-accent transition-colors duration-200" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href={footerData.footer.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-pastel-light hover:text-accent transition-colors duration-200" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
              <a href={footerData.footer.socialMedia.monsees} target="_blank" rel="noopener noreferrer" className="text-pastel-light hover:text-accent transition-colors duration-200" aria-label="Monsees">
                <img 
                  src={monseesLogo} 
                  alt="Monsees" 
                  className="h-6 w-auto" 
                  style={{ 
                    filter: 'brightness(0) invert(1)',
                    transition: 'filter 0.2s ease-in-out'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(49%) sepia(83%) saturate(2404%) hue-rotate(348deg) brightness(98%) contrast(95%)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'brightness(0) invert(1)';
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copy feedback message */}
        {copyMessage && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300">
            {copyMessage}
          </div>
        )}
        
        {/* Copyright at bottom */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
          <p className="text-xs font-medium opacity-80">© {currentYear} BASE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 