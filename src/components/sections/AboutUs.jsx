import React, { useState, useEffect } from 'react';
import aboutUsData from '../../data/about-us.json';
import { getLanguage } from '../../utils/language';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.message) {
      setFormStatus({
        success: false,
        message: language === 'nl' ? 'Vul alle velden in a.u.b.' : 'Please fill in all fields.'
      });
      return;
    }
    
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setFormStatus({
        success: false,
        message: language === 'nl' ? 'Voer een geldig e-mailadres in' : 'Please enter a valid email address.'
      });
      return;
    }
    
    const subject = `Contact form from ${formData.email}`;
    const body = `Email: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    const mailtoUrl = `mailto:info@base.nl?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    window.location.href = mailtoUrl;
    
    setFormStatus({
      success: true,
      message: language === 'nl' 
        ? 'Uw e-mail client is geopend, verzend het bericht om contact op te nemen.' 
        : 'Your email client has been opened, send the message to contact us.'
    });
    
    setTimeout(() => {
      setFormStatus(null);
      setFormData({
        email: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <section className={`min-h-screen py-16 pt-28 sm:pt-36 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="space-y-12 sm:space-y-16">
          <div className={`transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white mb-2">
                {aboutUsData["about-us"].title[language]}
              </h2>
              <div className="w-16 sm:w-16 h-0.5 bg-accent mb-4 sm:mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className={`group relative overflow-hidden rounded-lg border border-gray-800/80 backdrop-blur-sm bg-gray-900/30 transition-all duration-500 delay-75 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:shadow-lg hover:shadow-accent/5 hover:border-gray-700 p-4 sm:p-6`}>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
                
                <h3 className="text-lg sm:text-xl font-heading font-semibold text-white group-hover:text-accent transition-colors duration-300 mb-4">Lorem Ipsum</h3>
                <p className="text-pastel-light font-body text-xs sm:text-sm leading-relaxed mb-3">
                  {aboutUsData["about-us"].description[language]}
                </p>
              </div>
              
              <div className={`group relative overflow-hidden rounded-lg border border-gray-800/80 backdrop-blur-sm bg-gray-900/30 transition-all duration-500 delay-150 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:shadow-lg hover:shadow-accent/5 hover:border-gray-700`}>
                <div className="w-full h-full aspect-video bg-gradient-to-br from-gray-800/40 to-gray-900/60 flex items-center justify-center overflow-hidden">
                  <div className="text-accent text-opacity-20 font-heading text-7xl sm:text-9xl font-bold">BASE</div>
                </div>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-500 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white mb-2">
                {language === 'nl' ? 'Contact' : 'Contact'}
              </h2>
              <div className="w-16 h-0.5 bg-accent mb-4 sm:mb-6"></div>
            </div>
            
            <div className="mx-auto max-w-md">
              <div className={`group relative overflow-hidden rounded-lg border border-gray-800/80 backdrop-blur-sm bg-gray-900/30 transition-all duration-500 delay-250 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:shadow-lg hover:shadow-accent/5 hover:border-gray-700 p-4 sm:p-6`}>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
                
                <h3 className="text-lg sm:text-xl font-heading font-semibold text-white group-hover:text-accent transition-colors duration-300 mb-4">
                  {language === 'nl' ? 'Contact Formulier' : 'Contact Form'}
                </h3>
                
                {formStatus && (
                  <div className={`mb-4 p-3 text-sm rounded ${formStatus.success ? 'bg-green-900/30 text-green-300 border border-green-800' : 'bg-red-900/30 text-red-300 border border-red-800'}`}>
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-pastel-light mb-2 text-sm">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/70 text-pastel-light border border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-pastel-light mb-2 text-sm">
                      {language === 'nl' ? 'Bericht' : 'Message'}
                    </label>
                    <textarea 
                      id="message" 
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/70 text-pastel-light border border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded transition-all shadow-md hover:shadow-lg w-full"
                  >
                    {language === 'nl' ? 'Versturen' : 'Send'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 