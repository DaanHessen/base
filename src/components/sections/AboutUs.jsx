import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaParking, FaClock, FaPhone } from 'react-icons/fa';
import Image from '../../assets/loes-en-sander.jpg';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const MapSkeleton = () => (
  <div className="w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] bg-gray-800/50 animate-pulse flex items-center justify-center rounded-xl md:rounded-l-none md:rounded-tl-xl md:rounded-bl-xl">
    <FaMapMarkerAlt className="text-gold/50 text-4xl" />
  </div>
);

function AboutUs() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { t, i18n } = useTranslation(['about', 'common']);
  const currentLang = i18n.language;

  useEffect(() => {
    const mapLoadTimer = setTimeout(() => {
      setMapLoaded(true);
    }, 300);
    
    return () => clearTimeout(mapLoadTimer);
  }, []);

  const mapUrl = useMemo(() => {
    const address = encodeURIComponent(t('about:location.address'));
    // Reverting to basic embed URL as API key is not authorized.
    // For production, generate a valid key restricted to your domain.
    // return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${address}`;
    return `https://maps.google.com/maps?q=${address}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }, [t]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('about:seo.title')}</title>
        <meta name="description" content={t('about:seo.description')} />
        <link rel="canonical" href={`${window.location.origin}/about/${currentLang === 'en' ? 'en/' : ''}`} />
        {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/about/en/`} />}
        {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}/about/`} />}
        <meta name="og:title" content={t('about:seo.title')} />
        <meta name="og:description" content={t('about:seo.description')} />
      </Helmet>
      
      <section className="py-14 pt-28 sm:pt-32 md:pt-40 lg:pt-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="space-y-12 sm:space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-magnolia mb-4 sm:mb-6 leading-tight">
                {t('about:title')}
              </h1>
              <div className="w-14 sm:w-16 md:w-20 h-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]"></div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
                {/* Mobile image placement */}
                <div className="block md:hidden">
                  <div className="w-full max-w-xs mx-auto mb-6">
                    <div className="aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl relative group will-change-transform">
                      <img 
                        src={Image} 
                        alt={t('about:imageAlt', 'Loes & Sander')}
                        className="w-full h-full object-cover transform-gpu translate-z-0 transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        width="600"
                        height="800"
                        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
                      />
                      <div className="absolute inset-0 shadow-inner pointer-events-none border border-white/10 rounded-lg"></div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  {[0, 1].map((index) => (
                    <div key={index} className={`${index > 0 ? 'mt-6 sm:mt-8' : ''}`}>
                      <h3 className="text-lg sm:text-xl font-semibold text-gold mb-2 sm:mb-3">
                        {t(`about:sections.${index}.title`)}
                      </h3>
                      <div className="text-thistle font-light text-sm sm:text-base leading-relaxed">
                        {t(`about:sections.${index}.content`)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Desktop image placement */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-full max-w-xs sm:max-w-sm mx-auto">
                    <div className="aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl relative group will-change-transform">
                      <img 
                        src={Image} 
                        alt={t('about:imageAlt', 'Loes & Sander')}
                        className="w-full h-full object-cover transform-gpu translate-z-0 transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        width="600"
                        height="800"
                        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
                      />
                      <div className="absolute inset-0 shadow-inner pointer-events-none border border-white/10 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          
            <motion.div variants={itemVariants}>
              <div className="py-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-magnolia mb-4 sm:mb-6 leading-tight tracking-tight">
                  {t('about:location.title')}
                </h2>
                <div className="w-14 sm:w-16 md:w-20 h-1 bg-gold mb-6 shadow-[0_0_10px_rgba(212,175,55,0.3)]"></div>
              </div>
              
              <div className="bg-onyx/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-800/30">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  <div className="md:col-span-3 h-full">
                    {!mapLoaded ? (
                      <MapSkeleton />
                    ) : (
                      <div className="w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] relative rounded-xl md:rounded-l-none md:rounded-tl-xl md:rounded-bl-xl overflow-hidden">
                        <iframe
                          title="Location Map"
                          width="100%"
                          height="100%"
                          style={{ border: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                          loading="lazy"
                          allowFullScreen
                          src={mapUrl}
                          frameBorder="0"
                          scrolling="no"
                          marginHeight="0"
                          marginWidth="0"
                        ></iframe>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 p-5 sm:p-6 md:p-8 md:border-l border-gray-800/30">
                    <div className="space-y-5 sm:space-y-6">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gold text-xl mt-1 mr-3 shrink-0" />
                        <div>
                          <h4 className="text-magnolia font-medium mb-1">
                            {currentLang === 'nl' ? 'Adres' : 'Address'}
                          </h4>
                          <p className="text-thistle text-sm sm:text-base">{t('about:location.address')}</p>
                        </div>
                      </div>
                      
                      {/* <div className="flex items-start">
                        <FaClock className="text-gold text-xl mt-1 mr-3 shrink-0" />
                        <div>
                          <h4 className="text-magnolia font-medium mb-1">
                            {currentLang === 'nl' ? 'Openingstijden' : 'Opening Hours'}
                          </h4>
                          <p className="text-thistle text-sm sm:text-base">
                            {t('about:location.openingHours', 'Mon-Thu: 16:00-00:00\nFri-Sat: 16:00-01:00\nSun: Closed')}
                          </p>
                        </div>
                      </div> */}
                      
                      <div className="flex items-start">
                        <FaParking className="text-gold text-xl mt-1 mr-3 shrink-0" />
                        <div>
                          <h4 className="text-magnolia font-medium mb-1">
                            {currentLang === 'nl' ? 'Parkeren' : 'Parking'}
                          </h4>
                          <p className="text-thistle text-sm sm:text-base">{t('about:location.parking')}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 mt-2 border-t border-gray-800/30">
                        <a 
                          href="https://maps.google.com/?q=Biersteeg+10,+1211+GC+Hilversum" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full py-3 px-4 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-lg text-gold transition-all duration-200 mt-2"
                        >
                          <span className="mr-2">{currentLang === 'nl' ? 'Routebeschrijving' : 'Get Directions'}</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default memo(AboutUs); 