import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaPhone, FaClock } from 'react-icons/fa';
import './Reservation.css';

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

  // Phone number for reservations
  const phoneNumber = "+31 35 623 2366"; // Replace with actual phone number

  return (
    <div className={`reservation-widget ${className || ''}`}>
      <div className="reservation-container">
        {restaurantId ? (
          // Only show the iframe when we have a restaurant ID
          <>
            <iframe
              ref={iframeRef}
              src={`https://formitable.com/widgets/v1/${restaurantId}?type=standalone&language=${currentLang}&accent=%23d4af37`}
              title="Reservation Form"
              frameBorder="0"
              className={`reservation-iframe ${iframeStatus === 'success' ? 'loaded' : 'loading'}`}
              loading="lazy"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            ></iframe>
            
            {/* Show a loading state if the iframe hasn't loaded yet */}
            {iframeStatus === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-4 text-center">
                  <div className="spinner mb-4 mx-auto"></div>
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
                    href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                    className="reservation-button"
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
          <div className="reservation-fallback">
            <div className="reservation-fallback-icon-container">
              <FaCalendarAlt className="reservation-icon" />
            </div>
            
            <h3 className="reservation-title">{t('reservation.notConfigured')}</h3>
            
            <div className="reservation-info-box my-4">
              <div className="flex items-center justify-center mb-3">
                <FaPhone className="text-gold mr-2" />
                <span className="text-magnolia font-medium">{phoneNumber}</span>
              </div>
              
              <div className="flex items-center justify-center">
                <FaClock className="text-gold mr-2" />
                <span className="text-thistle text-sm">{t('reservation.openingHours')}</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <a 
                href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                className="reservation-button w-full block text-center"
              >
                <FaPhone className="mr-2" />
                {t('reservation.callUs')}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation; 