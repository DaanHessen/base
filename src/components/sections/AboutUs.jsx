import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaParking } from 'react-icons/fa';
import Image from '../../assets/loes-en-sander.jpg';
import { Helmet } from 'react-helmet-async';

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
    // Use a generic map URL for the example, replace API_KEY
    // return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${address}&zoom=16`;
    // For demonstration without a key, using a simple OpenStreetMap embed:
    const coords = "51.8131,4.6716"; // Approximate coordinates for Dordrecht Houtmarkt
    return `https://www.openstreetmap.org/export/embed.html?bbox=4.669,51.812,4.674,51.814&layer=mapnik&marker=${coords}`;
  }, [t]);

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
          <div className="space-y-16">
            <div className="home-title">
              <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-white mb-2">
                {t('about:title')}
              </h1>
              <div className="w-16 sm:w-20 h-1 bg-gold mb-6"></div>
            </div>
            
            <div className="home-subtitle">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  {[0, 1].map((index) => (
                    <div key={index} className={`${index > 0 ? 'mt-8' : ''}`}>
                      <h3 className="text-lg sm:text-xl font-heading font-semibold text-white mb-3">
                        {t(`about:sections.${index}.title`)}
                      </h3>
                      <div className="text-pastel-light font-body text-sm sm:text-base leading-relaxed">
                        {t(`about:sections.${index}.content`)}
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
          
            <div className="home-content">
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white mb-2">
                {t('about:location.title')}
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gold mb-6"></div>
              
              <div className="bg-gray-900/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-800/30">
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
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gold text-3xl mt-1 mr-4" />
                        <div>
                          <h4 className="text-white font-medium mb-1">
                            {currentLang === 'nl' ? 'Adres' : 'Address'}
                          </h4>
                          <p className="text-pastel-light text-sm">{t('about:location.address')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaParking className="text-gold text-5xl mt-1 mr-4 ml-1" />
                        <div>
                          <h4 className="text-white font-medium mb-1">
                            {currentLang === 'nl' ? 'Parkeren' : 'Parking'}
                          </h4>
                          <p className="text-pastel-light text-sm">{t('about:location.parking')}</p>
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
    </>
  );
}

export default memo(AboutUs); 