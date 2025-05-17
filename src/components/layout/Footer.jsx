import React, { useState, useEffect } from 'react';
import { FaInstagram, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import monseesLogo from '../../assets/monsees-optimized.svg';
import './Footer.css';

const SocialIconLink = ({ href, label, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-magnolia hover:text-gold transition-colors duration-200 group z-10"
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
    className="text-magnolia hover:text-gold transition-colors duration-200 group flex items-center justify-center w-full h-full z-10"
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
    <footer className="bg-onyx text-magnolia pt-8 pb-6 relative border-t border-gold/20 footer-container" 
      style={{
        marginTop: 'auto',
        marginBottom: 0,
        position: 'relative',
        zIndex: 2,
        width: '100%',
        flexShrink: 0,
        overflow: 'hidden'
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="hidden md:grid md:grid-cols-12 gap-8">
          <div className="col-span-4 bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 hover:border-gold/30 transition-all duration-300 shadow-lg hover:shadow-xl footer-card">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-5 pb-2 border-b border-gold/20">
              {t('footer.contact.title')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <button 
                  className="text-sm hover:text-gold transition-colors duration-200 text-left z-10"
                  onClick={() => openMaps(t('footer.address'))}
                >
                  {t('footer.address')}
                </button>
              </div>
              <div className="flex items-start space-x-3">
                <FaPhone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <button 
                  className="text-sm hover:text-gold transition-colors duration-200 z-10"
                  onClick={handlePhoneClick}
                >
                  {t('footer.contact.phone')}
                </button>
              </div>
              <div className="flex items-start space-x-3">
                <FaEnvelope className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <button 
                  className="text-sm hover:text-gold transition-colors duration-200 z-10"
                  onClick={handleEmailClick}
                >
                  {t('footer.contact.email')}
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-4 bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 hover:border-gold/30 transition-all duration-300 shadow-lg hover:shadow-xl footer-card">
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

          <div className="col-span-4 bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20 hover:border-gold/30 transition-all duration-300 shadow-lg hover:shadow-xl footer-card">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-5 pb-2 border-b border-gold/20">
              {t('footer.follow')}
            </h3>
            <div className="flex flex-col space-y-6">
              <div className="flex justify-center space-x-4">
                <SocialIconLink href="https://www.instagram.com/base_by_monsees/" label="Instagram">
                  <div className="bg-gold/10 hover:bg-gold/20 p-4 rounded-full transition-all duration-300 w-12 h-12 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1">
                    <FaInstagram size={22} className="text-gold" />
                  </div>
                </SocialIconLink>
                <SocialIconLink href="https://www.linkedin.com/company/brasserie-monsees-hilversum/" label="LinkedIn">
                  <div className="bg-gold/10 hover:bg-gold/20 p-4 rounded-full transition-all duration-300 w-12 h-12 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1">
                    <FaLinkedin size={22} className="text-gold" />
                  </div>
                </SocialIconLink>
                <SocialIconLink href="mailto:info@basebymonsees.nl" label="Email">
                  <div className="bg-gold/10 hover:bg-gold/20 p-4 rounded-full transition-all duration-300 w-12 h-12 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1">
                    <FaEnvelope size={22} className="text-gold" />
                  </div>
                </SocialIconLink>
              </div>
              <div className="flex justify-center pt-2">
                <SocialIconLink href="https://brasseriemonsees.nl" label="Brasserie Monsees">
                  <div className="bg-gold/10 hover:bg-gold/20 p-3 rounded-lg transition-all duration-300 w-40 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1">
                    <MonseesLink href="https://brasseriemonsees.nl" label="Brasserie Monsees" />
                  </div>
                </SocialIconLink>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-5 rounded-lg border border-gold/20 shadow-md footer-card">
              <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-3 pb-1.5 border-b border-gold/20">
                {t('footer.contact.title')}
              </h3>
              <div className="space-y-3 mt-3">
                <div className="flex items-start space-x-2.5">
                  <FaMapMarkerAlt className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <button 
                    className="text-xs hover:text-gold transition-colors duration-200 text-left z-10"
                    onClick={() => openMaps(t('footer.address'))}
                  >
                    {t('footer.address')}
                  </button>
                </div>
                <div className="flex items-start space-x-2.5">
                  <FaPhone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <button 
                    className="text-xs hover:text-gold transition-colors duration-200 z-10"
                    onClick={handlePhoneClick}
                  >
                    {t('footer.contact.phone')}
                  </button>
                </div>
                <div className="flex items-start space-x-2.5">
                  <FaEnvelope className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <button 
                    className="text-xs hover:text-gold transition-colors duration-200 z-10"
                    onClick={handleEmailClick}
                  >
                    {t('footer.contact.email')}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-5 rounded-lg border border-gold/20 shadow-md footer-card">
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

          <div className="bg-gradient-to-br from-onyx/80 to-onyx/60 backdrop-blur-sm p-5 rounded-lg border border-gold/20 shadow-md footer-card">
            <h3 className="text-gold text-sm font-medium uppercase tracking-wide mb-3 border-b border-gold/20 pb-1.5">
              {t('footer.follow')}
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center space-x-4 mt-2">
                <SocialIconLink href="https://www.instagram.com/base_by_monsees/" label="Instagram">
                  <div className="bg-gold/10 hover:bg-gold/20 p-3 rounded-full transition-all duration-300 w-10 h-10 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1">
                    <FaInstagram size={18} className="text-gold" />
                  </div>
                </SocialIconLink>
                <SocialIconLink href="https://www.linkedin.com/company/brasserie-monsees-hilversum/" label="LinkedIn">
                  <div className="bg-gold/10 hover:bg-gold/20 p-3 rounded-full transition-all duration-300 w-10 h-10 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1">
                    <FaLinkedin size={18} className="text-gold" />
                  </div>
                </SocialIconLink>
                <SocialIconLink href="mailto:info@basebymonsees.nl" label="Email">
                  <div className="bg-gold/10 hover:bg-gold/20 p-3 rounded-full transition-all duration-300 w-10 h-10 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1">
                    <FaEnvelope size={18} className="text-gold" />
                  </div>
                </SocialIconLink>
              </div>
              <div className="flex justify-center pt-1">
                <SocialIconLink href="https://brasseriemonsees.nl" label="Brasserie Monsees">
                  <div className="bg-gold/10 hover:bg-gold/20 p-2 rounded-lg transition-all duration-300 w-32 h-10 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1">
                    <MonseesLink href="https://brasseriemonsees.nl" label="Brasserie Monsees" />
                  </div>
                </SocialIconLink>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gold/10 text-center">
          <p className="text-sm text-magnolia/60">
            &copy; {currentYear} BASE by Monsees
          </p>
          {copyMessage && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gold text-onyx px-4 py-2 rounded-md text-sm font-medium shadow-lg z-50">
              {copyMessage}
            </div>
          )}
        </div>
      </div>
      
      {/* Add padding at bottom to prevent overscroll on iOS */}
      {isMobile && <div className="h-safe-bottom w-full" style={{ 
        height: 'env(safe-area-inset-bottom, 0px)', 
        margin: 0,
        padding: 0
      }}></div>}
    </footer>
  );
}

export default Footer; 