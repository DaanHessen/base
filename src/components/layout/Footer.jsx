import React, { useState, useCallback } from 'react';
import { FaInstagram, FaEnvelope, FaLinkedin } from 'react-icons/fa';
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
      className="h-6 md:h-8 w-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="monsees-gradient" gradientUnits="userSpaceOnUse" fy="90%">
          <stop offset="0" stop-color="currentColor" />
          <stop offset="1" stop-color="currentColor" />
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
  
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  
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

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const subject = encodeURIComponent(currentLang === 'nl' ? 'Nieuwsbrief aanmelding/bericht' : 'Newsletter sign-up/message');
    const body = encodeURIComponent(`${currentLang === 'nl' ? 'Bericht van' : 'Message from'}: ${formData.email}\n\n${formData.message}`);
    const mailtoLink = `mailto:${t('footer.contact.email')}?subject=${subject}&body=${body}`;
    
    try {
      window.location.href = mailtoLink;
      setFormStatus('success');
      setFormData({ email: '', message: '' });
      setTimeout(() => setFormStatus(null), 3000);
    } catch (error) {
      console.error('Failed to open mail client:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 3000);
    }
  }, [formData, currentLang, t]);

  return (
    <footer className="bg-onyx text-magnolia pt-8 pb-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-dim-gray/30"></div>
      
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <button 
                className="text-sm hover:text-gold transition-colors duration-200 text-left"
                onClick={() => openMaps(t('footer.address'))}
              >
                {t('footer.address')}
              </button>
            </div>
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <button 
                className="text-sm hover:text-gold transition-colors duration-200"
                onClick={() => copyToClipboard(t('footer.contact.phone'), t('footer.contact.phoneType', 'Phone number'))}
              >
                {t('footer.contact.phone')}
              </button>
            </div>
            <div className="flex items-start">
              <FaEnvelope className="h-5 w-5 mr-3 mt-0.5 text-gold flex-shrink-0" />
              <button 
                className="text-sm hover:text-gold transition-colors duration-200"
                onClick={() => copyToClipboard(t('footer.contact.email'), t('footer.contact.emailType', 'Email'))}
              >
                {t('footer.contact.email')}
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-gold text-sm font-medium mb-2 uppercase tracking-wide">
              {t('footer.openingHours.title')}
            </h3>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {[ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <React.Fragment key={day}>
                  <span>{t(`footer.${day}`)}</span>
                  <span>{t(`footer.openingHours.${day}`)}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-gold text-sm font-medium mb-4 uppercase tracking-wide">
              {t('footer.follow')}
            </h3>
            <div className="flex items-center space-x-6 mb-6">
              <SocialIconLink href="https://instagram.com/base" label="Instagram">
                <FaInstagram size={24} />
              </SocialIconLink>
              <SocialIconLink href="https://linkedin.com/company/base" label="LinkedIn">
                <FaLinkedin size={24} />
              </SocialIconLink>
              <MonseesLink href="https://brasseriemonsees.nl" label="Brasserie Monsees" />
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-gold text-sm font-medium mb-4 uppercase tracking-wide">
              {t('footer.newsletter.title')}
            </h3>
            <form onSubmit={handleSubmit} className="relative">
              <div className="mb-3">
                <label htmlFor="email" className="sr-only">{t('footer.newsletter.email')}</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('footer.newsletter.email')}
                  className="w-full px-4 py-2 bg-dim-gray/20 border border-dim-gray/30 rounded-md text-magnolia focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message"
                  className="w-full px-4 py-2 bg-dim-gray/20 border border-dim-gray/30 rounded-md text-magnolia focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150 shadow-[4px_4px_0px_rgba(197,167,95,0.6)] hover:shadow-[2px_2px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] text-center"
              >
                {t('footer.newsletter.button')}
              </button>
              
              {formStatus === 'success' && (
                <div className="mt-2 text-sm text-green-400">
                  {currentLang === 'nl' ? 'Bedankt voor je bericht!' : 'Thank you for your message!'}
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="mt-2 text-sm text-red-400">
                  {currentLang === 'nl' ? 'Er ging iets mis. Probeer het later opnieuw.' : 'Something went wrong. Please try again later.'}
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-dim-gray/20 flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="mt-4 md:mt-0 text-center md:text-left">
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