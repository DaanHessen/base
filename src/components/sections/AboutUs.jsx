import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaParking } from 'react-icons/fa';
import Image from '../../assets/loes-en-sander.jpg';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

// Simple Skeleton Component for the Map
const MapSkeleton = () => (
  <div className="w-full h-full min-h-[300px] md:min-h-[350px] bg-gray-800/50 animate-pulse flex items-center justify-center rounded-l-2xl md:rounded-l-none md:rounded-tl-2xl md:rounded-bl-2xl">
    <FaMapMarkerAlt className="text-gold/50 text-4xl" />
  </div>
);

function AboutUs() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { t, i18n } = useTranslation(['about', 'common']);
  const currentLang = i18n.language;

  // Load map after a short delay
  useEffect(() => {
    const mapLoadTimer = setTimeout(() => {
      setMapLoaded(true);
    }, 300);
    
    return () => clearTimeout(mapLoadTimer);
  }, []);

  const mapUrl = useMemo(() => {
    const address = encodeURIComponent(t('about:location.address'));
    // TODO: figure out if it's fucked up to have my api key hardcoded, what the hell will someone do with my maps API key anyway
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.014162410744!2d5.1784721!3d52.2249605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c66b69ba0738fb%3A0x9e7195eb6bb4517!2sBiersteeg%2010%2C%201211%20GC%20Hilversum!5e0!3m2!1snl!2snl!4v1745785019407!5m2!1snl!2snl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`;
  }, [t]);

  // Animation variants (similar to Home.jsx)
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
      
      <section className="py-16 pt-36 sm:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-magnolia mb-6 leading-tight">
                {t('about:title')}
              </h1>
              <div className="w-16 sm:w-20 h-1 bg-gold mb-6"></div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                <div className="md:col-span-2">
                  {[0, 1].map((index) => (
                    <div key={index} className={`${index > 0 ? 'mt-8' : ''}`}>
                      <h3 className="text-lg sm:text-xl font-semibold text-magnolia mb-3">
                        {t(`about:sections.${index}.title`)}
                      </h3>
                      <div className="text-thistle font-light text-base sm:text-lg leading-relaxed">
                        {t(`about:sections.${index}.content`)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-xs sm:max-w-sm mx-auto">
                    <div className="aspect-[3/4] w-full rounded-lg overflow-hidden shadow-lg relative group">
                      <img 
                        src={Image} 
                        alt={t('about:imageAlt', 'Loes & Sander')}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        width="600"
                        height="800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl font-bold text-magnolia mb-4 sm:mb-6 leading-tight tracking-tight">
                {t('about:location.title')}
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gold mb-6"></div>
              
              <div className="bg-onyx/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-800/30">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  <div className="md:col-span-3 h-full">
                    {!mapLoaded ? (
                      <MapSkeleton />
                    ) : (
                      <div className="w-full h-full min-h-[300px] md:min-h-[350px] relative rounded-l-2xl md:rounded-l-none md:rounded-tl-2xl md:rounded-bl-2xl overflow-hidden">
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
                    )}
                  </div>
                  
                  <div className="md:col-span-2 p-6 sm:p-8 md:border-l border-gray-800/30">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gold text-xl sm:text-2xl mt-1 mr-3 shrink-0" />
                        <div>
                          <h4 className="text-magnolia font-medium mb-1">
                            {currentLang === 'nl' ? 'Adres' : 'Address'}
                          </h4>
                          <p className="text-thistle text-sm sm:text-base">{t('about:location.address')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaParking className="text-gold text-xl sm:text-2xl mt-1 mr-3 shrink-0" />
                        <div>
                          <h4 className="text-magnolia font-medium mb-1">
                            {currentLang === 'nl' ? 'Parkeren' : 'Parking'}
                          </h4>
                          <p className="text-thistle text-sm sm:text-base">{t('about:location.parking')}</p>
                        </div>
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