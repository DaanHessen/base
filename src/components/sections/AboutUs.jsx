import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import aboutUsData from '../../data/about-us.json';
import { getLanguage } from '../../utils/language';
import { FaMapMarkerAlt, FaParking } from 'react-icons/fa';
import Image from '../../assets/loes-en-sander.jpg';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState(getLanguage);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleLanguageChange = useCallback(() => {
    setLanguage(getLanguage());
  }, []);

  useEffect(() => {
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [handleLanguageChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && !mapLoaded) {
      const mapTimer = setTimeout(() => {
        setMapLoaded(true);
      }, 100);
      
      return () => clearTimeout(mapTimer);
    }
  }, [isVisible, mapLoaded]);

  const mapUrl = useMemo(() => {
    const address = encodeURIComponent(aboutUsData["about-us"].location.address);
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${address}&zoom=16`;
  }, []);

  return (
    <section className={`py-16 pt-28 sm:pt-36 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-16">
          <div className={`transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-white mb-2">
              {aboutUsData["about-us"].title[language]}
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-accent mb-6"></div>
          </div>
          
          <div className={`transition-all duration-300 delay-75 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                {aboutUsData["about-us"].sections.map((section, index) => (
                  <div key={index} className={`${index > 0 ? 'mt-8' : ''}`}>
                    <h3 className="text-lg sm:text-xl font-heading font-semibold text-white mb-3">
                      {section.title[language]}
                    </h3>
                    <div className="text-pastel-light font-body text-sm sm:text-base leading-relaxed">
                      {section.content[language]}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-[85%] mx-auto">
                  <div className="aspect-[3/4] w-full rounded-lg overflow-hidden shadow-lg relative">
                    <img 
                      src={Image} 
                      alt="Loes & Sander" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="600"
                      height="800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className={`transition-all duration-300 delay-150 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white mb-2">
              {language === 'nl' ? 'Locatie & Bereikbaarheid' : 'Location & Accessibility'}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-accent mb-6"></div>
            
            <div className="bg-gray-900/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-800/30">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                <div className="md:col-span-3 h-full">
                  {mapLoaded ? (
                    <div className="w-full h-full min-h-[300px] md:min-h-[350px] relative">
                      <iframe
                        title="Location Map"
                        width="100%"
                        height="100%"
                        style={{ border: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={mapUrl}
                      ></iframe>
                    </div>
                  ) : (
                    <div className="w-full h-full min-h-[300px] md:min-h-[350px] flex items-center justify-center">
                      <div className="animate-pulse flex flex-col items-center justify-center">
                        <div className="w-16 h-16 flex items-center justify-center mb-4">
                          <FaMapMarkerAlt className="text-accent text-2xl" />
                        </div>
                        <p className="text-accent text-center">
                          {language === 'nl' ? 'Kaart laden...' : 'Loading map...'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2 p-6 sm:p-8 md:border-l border-gray-800/30">
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-accent text-3xl mt-1 mr-4" />
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {language === 'nl' ? 'Adres' : 'Address'}
                        </h4>
                        <p className="text-pastel-light text-sm">{aboutUsData["about-us"].location.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaParking className="text-accent text-5xl mt-1 mr-4 ml-1" />
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {language === 'nl' ? 'Parkeren' : 'Parking'}
                        </h4>
                        <p className="text-pastel-light text-sm">{aboutUsData["about-us"].location.parking[language]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutUs); 