import React, { useState, useCallback, useEffect } from 'react';
import { FaInstagram, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import monseesLogo from '../../assets/monsees-optimized.svg';

const SocialIconLink = ({ href, label, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-magnolia hover:text-gold transition-colors duration-200 group"
    aria-label={label}
  >
    {children}
  </a>
);

// Implement SVG hover effect matching other icons
const MonseesLink = ({ href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-magnolia hover:text-gold transition-colors duration-200 group flex items-center" 
    aria-label={label}
  >
    <svg 
      viewBox="0 0 96 24" 
      className="h-4 md:h-6 w-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="monsees-gradient" gradientUnits="userSpaceOnUse" fy="90%">
          <stop offset="0" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
        <mask id="monsees-mask">
          <image href={monseesLogo} width="96" height="24" />
        </mask>
      </defs>
      <rect width="96" height="24" fill="url(#monsees-gradient)" mask="url(#monsees-mask)" />
    </svg>
  </a>
);

function Footer() {
  const currentYear = new Date().getFullYear();
  const [copyMessage, setCopyMessage] = useState('');
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  const openMaps = (address) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const encodedAddress = encodeURIComponent(address);
    const url = isIOS ? `maps://maps.apple.com/?q=${encodedAddress}` : `https://maps.google.com/?q=${encodedAddress}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(
      () => setCopyMessage(`${type} ${currentLang === 'nl' ? 'gekopieerd!' : 'copied!'}`),
      () => setCopyMessage(currentLang === 'nl' ? 'Kopiëren mislukt' : 'Failed to copy')
    ).finally(() => setTimeout(() => setCopyMessage(''), 2000));
  };
  
  const handlePhoneClick = () => {
    const phoneNumber = t('footer.contact.phone').replace(/\s+/g, '');
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      copyToClipboard(t('footer.contact.phone'), t('footer.contact.phoneType', 'Phone number'));
    }
  };
  
  const handleEmailClick = () => {
    const email = t('footer.contact.email');
    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      const subject = encodeURIComponent(currentLang === 'nl' ? 'Contact vanuit website' : 'Contact from website');
      window.location.href = `mailto:${email}?subject=${subject}`;
    }
  };

  return (
    <footer className="bg-onyx text-magnolia pt-8 pb-6 relative border-t border-gold/10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-4">
              {t('footer.contact.title')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="w-4 h-4 text-gold flex-shrink-0" />
                <button 
                  className="text-sm hover:text-gold transition-colors duration-200 text-left"
                  onClick={() => openMaps(t('footer.address'))}
                >
                  {t('footer.address')}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="w-4 h-4 text-gold flex-shrink-0" />
                <button 
                  className="text-sm hover:text-gold transition-colors duration-200"
                  onClick={handlePhoneClick}
                >
                  {t('footer.contact.phone')}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-4 h-4 text-gold flex-shrink-0" />
                <button 
                  className="text-sm hover:text-gold transition-colors duration-200"
                  onClick={handleEmailClick}
                >
                  {t('footer.contact.email')}
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-4">
              {t('footer.openingHours.title')}
            </h3>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {[ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <React.Fragment key={day}>
                  <span className="text-magnolia/80">{t(`footer.${day}`)}</span>
                  <span>{t(`footer.openingHours.${day}`)}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className="space-y-4">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-4">
              {t('footer.follow')}
            </h3>
            <div className="flex items-center space-x-6">
              <SocialIconLink href="https://instagram.com/base" label="Instagram">
                <FaInstagram size={24} />
              </SocialIconLink>
              <SocialIconLink href="https://linkedin.com/company/base" label="LinkedIn">
                <FaLinkedin size={24} />
              </SocialIconLink>
              <MonseesLink href="https://brasseriemonsees.nl" label="Brasserie Monsees" />
            </div>
          </div>

          {/* Column 4: Contact Button */}
          <div className="space-y-4">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-4">
              {t('footer.newsletter.title')}
            </h3>
            <div>
              <a 
                href={`mailto:${t('footer.contact.email')}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150 shadow-[4px_4px_0px_rgba(197,167,95,0.6)] hover:shadow-[2px_2px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] text-center whitespace-nowrap text-sm sm:text-base"
              >
                <FaEnvelope className="mr-2" />
                {t('reservation.sendEmail')}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile layout - more compact */}
        <div className="md:hidden">
          {/* Contact & Hours in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-3">
                {t('footer.contact.title')}
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <button 
                    className="text-xs hover:text-gold transition-colors duration-200 text-left"
                    onClick={() => openMaps(t('footer.address'))}
                  >
                    {t('footer.address')}
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <FaPhone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <button 
                    className="text-xs hover:text-gold transition-colors duration-200"
                    onClick={handlePhoneClick}
                  >
                    {t('footer.contact.phone')}
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <button 
                    className="text-xs hover:text-gold transition-colors duration-200"
                    onClick={handleEmailClick}
                  >
                    {t('footer.contact.email')}
                  </button>
                </div>
              </div>
            </div>

            {/* Hours - Compact */}
            <div>
              <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-3">
                {t('footer.openingHours.title')}
              </h3>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {[ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <React.Fragment key={day}>
                    <span className="text-magnolia/80">{t(`footer.${day}`)}</span>
                    <span>{t(`footer.openingHours.${day}`)}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Social & Email */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0 sm:space-x-4">
            {/* Social Icons */}
            <div className="flex items-center justify-center space-x-5">
              <SocialIconLink href="https://instagram.com/base" label="Instagram">
                <FaInstagram size={20} />
              </SocialIconLink>
              <SocialIconLink href="https://linkedin.com/company/base" label="LinkedIn">
                <FaLinkedin size={20} />
              </SocialIconLink>
              <MonseesLink href="https://brasseriemonsees.nl" label="Brasserie Monsees" />
            </div>
            
            {/* Email Button */}
            <div>
              <a 
                href={`mailto:${t('footer.contact.email')}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150 shadow-[3px_3px_0px_rgba(197,167,95,0.6)] hover:shadow-[1px_1px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] text-center whitespace-nowrap text-xs"
              >
                <FaEnvelope className="mr-1.5" />
                {t('reservation.sendEmail')}
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright - same for both layouts */}
        <div className="mt-8 pt-4 border-t border-dim-gray/20 flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="mt-3 md:mt-0 text-center md:text-left">
            <p className="text-xs text-gray-400">
              {t('footer.copyright').replace('{year}', currentYear)}
            </p>
          </div>
          
          {copyMessage && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-dim-gray px-4 py-2 rounded-md text-magnolia text-sm animate-fade-in-up z-50">
              {copyMessage}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer; 