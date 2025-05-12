import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaPhone } from 'react-icons/fa';

const Reservation = ({ className }) => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const iframeRef = useRef(null);
  const [iframeStatus, setIframeStatus] = useState('loading'); // loading, success, error
  
  // Important: Replace this with your actual Formitable restaurant ID when available
  // Set to null to show the fallback reservation content
  const restaurantId = null;

  useEffect(() => {
    // When restaurantId is available, listen for iframe messages
    if (restaurantId) {
      const checkIframeStatus = () => {
        const iframe = iframeRef.current;
        if (iframe) {
          // Check if iframe loaded properly
          try {
            // This will throw an error if blocked by CORS
            const iframeContent = iframe.contentWindow || iframe.contentDocument;
            if (iframeContent) {
              setIframeStatus('success');
            }
          } catch (error) {
            console.error("Iframe access error:", error);
            setIframeStatus('error');
          }
        }
      };

      // Set a reasonable timeout to check iframe status
      const timeoutId = setTimeout(checkIframeStatus, 5000);

      // Cleanup
      return () => clearTimeout(timeoutId);
    }
  }, [restaurantId]);

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIframeStatus('success');
  };

  // Handle iframe error event 
  const handleIframeError = () => {
    console.error("Failed to load Formitable iframe");
    setIframeStatus('error');
  };

  return (
    <div className={`reservation-widget ${className || ''}`}>
      <div className="bg-onyx/70 backdrop-blur-sm p-3 sm:p-6 border border-gold/30 rounded-lg shadow-lg overflow-hidden h-full">
        {restaurantId ? (
          // Only show the iframe when we have a restaurant ID
          <>
            <iframe
              ref={iframeRef}
              src={`https://formitable.com/widgets/v1/${restaurantId}?type=standalone&language=${currentLang}&accent=%23d4af37`}
              title="Reservation Form"
              frameBorder="0"
              className={`w-full min-h-[400px] transition-opacity duration-300 ${iframeStatus === 'success' ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            ></iframe>
            
            {/* Show a loading state if the iframe hasn't loaded yet */}
            {iframeStatus === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-4 text-center">
                  <div className="spinner mb-4 mx-auto w-8 h-8 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
                  <p className="text-magnolia">{t('reservation.loading')}</p>
                </div>
              </div>
            )}
            
            {/* Show an error message if the iframe failed to load */}
            {iframeStatus === 'error' && (
              <div className="text-center py-4">
                <p className="text-magnolia">{t('reservation.error')}</p>
                <p className="text-sm text-magnolia/80 mt-2">
                  {t('reservation.alternativeContact')}
                </p>
                <div className="mt-6">
                  <a 
                    href={`tel:${t('footer.contact.phone').replace(/\s+/g, '')}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150"
                  >
                    <FaPhone className="mr-2" />
                    {t('reservation.callUs')}
                  </a>
                </div>
              </div>
            )}
          </>
        ) : (
          // Show a fallback reservation interface when restaurantId is not available
          <div className="text-center py-4 sm:py-6 h-full flex flex-col justify-center">
            <FaCalendarAlt className="text-gold text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gold mb-2 sm:mb-3">{t('reservation.notConfigured')}</h3>
            <p className="text-magnolia/90 max-w-lg mx-auto mb-4 sm:mb-6 text-sm sm:text-base">
              {t('reservation.alternativeContact')}
            </p>
            
            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <a 
                href={`tel:${t('footer.contact.phone').replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150 shadow-[2px_2px_0px_rgba(197,167,95,0.6)] text-sm sm:text-base"
              >
                <FaPhone className="mr-2" />
                {t('reservation.callUs')}
              </a>
              
              <p className="text-xs sm:text-sm text-thistle mt-3 sm:mt-4">
                {t('reservation.openingHours')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation; 