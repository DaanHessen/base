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

const MonseesLink = ({ href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-magnolia hover:text-gold transition-colors duration-200 group flex items-center justify-center w-full h-full"
    aria-label={label}
  >
    <svg
      viewBox="0 0 96 24" 
      className="w-full h-auto max-h-[20px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="monsees-footer-gradient" gradientUnits="userSpaceOnUse" fy="90%">
          <stop offset="0" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
        <mask id="monsees-footer-mask">
          <image href={monseesLogo} width="96" height="24" />
        </mask>
      </defs>
      <rect width="96" height="24" fill="url(#monsees-footer-gradient)" mask="url(#monsees-footer-mask)" />
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
    <footer className="bg-onyx text-magnolia pt-8 pb-6 relative border-t border-gold/20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="hidden md:grid md:grid-cols-12 gap-8">
          <div className="col-span-4 bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 hover:border-gold/30 transition-all duration-300 shadow-lg hover:shadow-xl">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-5 pb-2 border-b border-gold/20">
              {t('footer.contact.title')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <button 
                  className="text-sm hover:text-gold transition-colors duration-200 text-left"
                  onClick={() => openMaps(t('footer.address'))}
                >
                  {t('footer.address')}
                </button>
              </div>
              <div className="flex items-start space-x-3">
                <FaPhone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <button 
                  className="text-sm hover:text-gold transition-colors duration-200"
                  onClick={handlePhoneClick}
                >
                  {t('footer.contact.phone')}
                </button>
              </div>
              <div className="flex items-start space-x-3">
                <FaEnvelope className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <button 
                  className="text-sm hover:text-gold transition-colors duration-200"
                  onClick={handleEmailClick}
                >
                  {t('footer.contact.email')}
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-4 bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 hover:border-gold/30 transition-all duration-300 shadow-lg hover:shadow-xl">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-5 pb-2 border-b border-gold/20">
              {t('footer.openingHours.title')}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <React.Fragment key={day}>
                  <span className="text-gold/90 font-medium">{t(`footer.${day}`)}</span>
                  <span>{t(`footer.openingHours.${day}`)}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="col-span-4 bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 hover:border-gold/30 transition-all duration-300 shadow-lg hover:shadow-xl">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-5 pb-2 border-b border-gold/20">
              {t('footer.follow')}
            </h3>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <SocialIconLink href="https://www.instagram.com/base_by_monsees/" label="Instagram">
                  <div className="bg-gold/10 hover:bg-gold/20 p-2.5 rounded-md transition-colors duration-200 w-[42px] h-[42px] flex items-center justify-center">
                    <FaInstagram size={22} />
                  </div>
                </SocialIconLink>
                <SocialIconLink href="https://www.linkedin.com/company/brasserie-monsees-hilversum/" label="LinkedIn">
                  <div className="bg-gold/10 hover:bg-gold/20 p-2.5 rounded-md transition-colors duration-200 w-[42px] h-[42px] flex items-center justify-center">
                    <FaLinkedin size={22} />
                  </div>
                </SocialIconLink>
                <SocialIconLink href="https://brasseriemonsees.nl" label="Brasserie Monsees">
                  <div className="bg-gold/10 hover:bg-gold/20 p-2.5 rounded-md transition-colors duration-200 flex items-center justify-center w-20 h-[42px]">
                    <MonseesLink href="https://brasseriemonsees.nl" label="Brasserie Monsees" />
                  </div>
                </SocialIconLink>
              </div>
              <div className="mt-2">
                <a 
                  href={`mailto:${t('footer.contact.email')}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-md transition-all duration-200 shadow-md hover:shadow-lg text-center whitespace-nowrap text-sm"
                >
                  <FaEnvelope className="mr-2" />
                  {t('reservation.sendEmail')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-5 rounded-lg border border-gold/20 shadow-md">
              <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-3 pb-1.5 border-b border-gold/20">
                {t('footer.contact.title')}
              </h3>
              <div className="space-y-3 mt-3">
                <div className="flex items-start space-x-2.5">
                  <FaMapMarkerAlt className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <button 
                    className="text-xs hover:text-gold transition-colors duration-200 text-left"
                    onClick={() => openMaps(t('footer.address'))}
                  >
                    {t('footer.address')}
                  </button>
                </div>
                <div className="flex items-start space-x-2.5">
                  <FaPhone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <button 
                    className="text-xs hover:text-gold transition-colors duration-200"
                    onClick={handlePhoneClick}
                  >
                    {t('footer.contact.phone')}
                  </button>
                </div>
                <div className="flex items-start space-x-2.5">
                  <FaEnvelope className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <button 
                    className="text-xs hover:text-gold transition-colors duration-200"
                    onClick={handleEmailClick}
                  >
                    {t('footer.contact.email')}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-5 rounded-lg border border-gold/20 shadow-md">
              <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-3 pb-1.5 border-b border-gold/20">
                {t('footer.openingHours.title')}
              </h3>
              <div className="grid grid-cols-2 gap-1.5 text-xs mt-3">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <React.Fragment key={day}>
                    <span className="text-gold/90 font-medium">{t(`footer.${day}`)}</span>
                    <span>{t(`footer.openingHours.${day}`)}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-5 rounded-lg border border-gold/20 shadow-md">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-3 pb-1.5 border-b border-gold/20">
              {t('footer.follow')}
            </h3>
            <div className="flex flex-col space-y-4 mt-3">
              <div className="flex items-center justify-between">
                <SocialIconLink href="https://instagram.com/base" label="Instagram">
                  <div className="bg-gold/10 hover:bg-gold/20 p-2.5 rounded-md transition-colors duration-200 w-[42px] h-[42px] flex items-center justify-center">
                    <FaInstagram size={18} />
                  </div>
                </SocialIconLink>
                <SocialIconLink href="https://linkedin.com/company/base" label="LinkedIn">
                  <div className="bg-gold/10 hover:bg-gold/20 p-2.5 rounded-md transition-colors duration-200 w-[42px] h-[42px] flex items-center justify-center">
                    <FaLinkedin size={18} />
                  </div>
                </SocialIconLink>
                <SocialIconLink href="https://brasseriemonsees.nl" label="Brasserie Monsees">
                  <div className="bg-gold/10 hover:bg-gold/20 p-2.5 rounded-md transition-colors duration-200 flex items-center justify-center w-[42px] h-[42px]">
                    <MonseesLink href="https://brasseriemonsees.nl" label="Brasserie Monsees" />
                  </div>
                </SocialIconLink>
              </div>
              <a 
                href={`mailto:${t('footer.contact.email')}`}
                className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-md transition-all duration-200 shadow-md hover:shadow-lg text-center whitespace-nowrap text-xs"
              >
                <FaEnvelope className="mr-1.5" />
                {t('reservation.sendEmail')}
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-3 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center">
          <div className="mt-2 md:mt-0 text-center md:text-left">
            <p className="text-xs text-magnolia/70">
              {t('footer.copyright').replace('{year}', currentYear)}
            </p>
          </div>
          
          {copyMessage && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-dim-gray px-4 py-2 rounded-md text-magnolia text-sm animate-fade-in-up z-50 shadow-lg">
              {copyMessage}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer; 