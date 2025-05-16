import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaParking, FaClock, FaPhone } from 'react-icons/fa';
import Image from '../../assets/loes-en-sander.jpg';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import './Sections.css';

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
    // Using a different Maps embed URL format to avoid CORS issues
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.0277023245653!2d5.1700394!3d52.2218525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c66b5a9a1bb3f7%3A0xd0a9f0abb29bb2b5!2sBiersteeg%2010%2C%201211%20GC%20Hilversum!5e0!3m2!1sen!2snl!4v1620000000000!5m2!1sen!2snl`;
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
      
      <section className="py-16 sm:py-20 md:py-24 min-h-screen about-us-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-left text-magnolia mb-4">
              {t('about:title')}
            </h1>
            
            <div className="w-12 sm:w-14 md:w-16 h-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.3)] mb-4 sm:mb-6"></div>
          </div>
          
          <motion.div 
            className="space-y-10 sm:space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Mobile image placement - proper sizing and position */}
                <div className="md:hidden flex justify-center items-center mb-6">
                  <div className="w-3/4 sm:w-1/2 max-w-[280px] mx-auto">
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
                  <div className="flex flex-col h-full space-y-4 md:space-y-6">
                    <div className="bg-onyx/70 backdrop-blur-sm p-5 md:p-6 border border-gold/30 rounded-lg shadow-lg flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gold mb-2 sm:mb-3">
                        {t(`about:sections.0.title`)}
                      </h3>
                      <div className="text-magnolia font-light text-sm sm:text-base leading-relaxed">
                        {t(`about:sections.0.content`)}
                      </div>
                    </div>

                    <div className="bg-onyx/70 backdrop-blur-sm p-5 md:p-6 border border-gold/30 rounded-lg shadow-lg flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gold mb-2 sm:mb-3">
                        {t(`about:sections.1.title`)}
                      </h3>
                      <div className="text-magnolia font-light text-sm sm:text-base leading-relaxed">
                        {t(`about:sections.1.content`)}
                      </div>
                    </div>
                  </div>
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
          
            <motion.div variants={itemVariants} className="mt-8 sm:mt-12">
              <div className="bg-onyx/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gold/30">
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
                  
                  <div className="md:col-span-2 p-5 sm:p-6 md:p-8 md:border-l border-gold/30">
                    <div className="space-y-5 sm:space-y-6">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gold text-xl mt-1 mr-3 shrink-0" />
                        <div>
                          <h4 className="text-magnolia font-medium mb-1">
                            {currentLang === 'nl' ? 'Adres' : 'Address'}
                          </h4>
                          <p className="text-magnolia text-sm sm:text-base">{t('about:location.address')}</p>
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
                          <p className="text-magnolia text-sm sm:text-base">{t('about:location.parking')}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 mt-2 border-t border-gold/30">
                        <a 
                          href="https://maps.google.com/?q=Biersteeg+10,+1211+GC+Hilversum" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full px-6 py-3 border border-magnolia/30 text-magnolia hover:bg-magnolia/10 font-medium rounded-lg transition-all duration-150 hover:border-magnolia/50 shadow-[4px_4px_0px_rgba(62,62,62,0.3)] hover:shadow-[2px_2px_0px_rgba(62,62,62,0.5)] hover:translate-x-[1px] hover:translate-y-[1px]"
                        >
                          <span>{currentLang === 'nl' ? 'Routebeschrijving' : 'Get Directions'}</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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