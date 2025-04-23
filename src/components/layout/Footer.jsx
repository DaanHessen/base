import React, { useState, useEffect } from 'react';
import { FaInstagram, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import monseesLogo from '../../assets/monsees.svg';
import footerData from '../../data/footer.json';
import { getLanguage } from '../../utils/language';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [copyMessage, setCopyMessage] = useState('');
  const [language, setLanguage] = useState(() => {
    return getLanguage();
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(getLanguage());
    };

    handleLanguageChange();

    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  const openMaps = (address) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const encodedAddress = encodeURIComponent(address);
    
    if (isIOS) {
      window.open(`maps://maps.apple.com/?q=${encodedAddress}`, '_blank');
    } else {
      window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
    }
  };

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
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-800"></div>
      
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <button 
                className="text-sm hover:text-accent transition-colors duration-200 text-left"
                onClick={() => openMaps(footerData.footer.address)}
              >
                {footerData.footer.address}
              </button>
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

          <div className="flex flex-col space-y-2">
            <h3 className="text-accent text-sm font-medium mb-2 uppercase tracking-wide">
              {footerData.footer.translations.openingHours[language]}
            </h3>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <span>{footerData.footer.translations.days.sunday[language]}:</span>
              <span>{typeof footerData.footer.openingHours.sunday === 'object' ? footerData.footer.openingHours.sunday[language] : footerData.footer.openingHours.sunday}</span>
              
              <span>{footerData.footer.translations.days.monday[language]}:</span>
              <span>{typeof footerData.footer.openingHours.monday === 'object' ? footerData.footer.openingHours.monday[language] : footerData.footer.openingHours.monday}</span>
              
              <span>{footerData.footer.translations.days.tuesday[language]}:</span>
              <span>{typeof footerData.footer.openingHours.tuesday === 'object' ? footerData.footer.openingHours.tuesday[language] : footerData.footer.openingHours.tuesday}</span>
              
              <span>{footerData.footer.translations.days.wednesday[language]}:</span>
              <span>{typeof footerData.footer.openingHours.wednesday === 'object' ? footerData.footer.openingHours.wednesday[language] : footerData.footer.openingHours.wednesday}</span>
              
              <span>{footerData.footer.translations.days.thursday[language]}:</span>
              <span>{typeof footerData.footer.openingHours.thursday === 'object' ? footerData.footer.openingHours.thursday[language] : footerData.footer.openingHours.thursday}</span>
              
              <span>{footerData.footer.translations.days.friday[language]}:</span>
              <span>{typeof footerData.footer.openingHours.friday === 'object' ? footerData.footer.openingHours.friday[language] : footerData.footer.openingHours.friday}</span>
              
              <span>{footerData.footer.translations.days.saturday[language]}:</span>
              <span>{typeof footerData.footer.openingHours.saturday === 'object' ? footerData.footer.openingHours.saturday[language] : footerData.footer.openingHours.saturday}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-accent text-sm font-medium mb-4 uppercase tracking-wide">
              {footerData.footer.translations.followUs[language]}
            </h3>
            <div className="flex items-center space-x-6 mb-6">
              <a href={footerData.footer.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pastel-light hover:text-accent transition-colors duration-200" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href={footerData.footer.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-pastel-light hover:text-accent transition-colors duration-200" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
              <a 
                href={footerData.footer.socialMedia.monsees} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="monsees-link transition-all duration-200" 
                aria-label="Monsees"
              >
                <img 
                  src={monseesLogo} 
                  alt="Monsees" 
                  className="h-6 w-auto transition-all duration-200"
                  style={{
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        {copyMessage && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300">
            {copyMessage}
          </div>
        )}
        
        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
          <p className="text-xs font-medium opacity-80">© {currentYear} BASE</p>
        </div>
      </div>

      <style jsx="true">{`
        .monsees-link img {
          transition: filter 0.2s ease-in-out;
        }
        .monsees-link:hover img {
          filter: brightness(0) saturate(100%) invert(49%) sepia(83%) saturate(2404%) hue-rotate(348deg) brightness(98%) contrast(95%) !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer; 