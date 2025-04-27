import React, { useState, useEffect, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const { t } = useTranslation('common');
  
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        
        setTimeout(() => {
          setIsAnimated(true);
        }, 25);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setIsAnimated(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    }, 200);
  }, []);

  const handleNecessaryOnly = useCallback(() => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setIsAnimated(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    }, 200);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-4 mx-4 sm:mx-6 z-50">
        <div className={`max-w-md mx-auto bg-dark/95 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden border border-gray-800 transition-all duration-300 transform ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-4">
            <h3 className="text-gold font-medium text-sm mb-2">{t('cookieConsent.title')}</h3>
            <p className="text-pastel-light text-xs mb-3">
              {t('cookieConsent.description')}
            </p>
            <div className="cursor-pointer flex items-center justify-end space-x-3">
              <button
                onClick={handleNecessaryOnly}
                className="cursor-pointer px-3 py-1.5 text-xs text-pastel-light hover:text-white transition-colors"
                aria-label="Accept only necessary cookies"
                type="button"
              >
                {t('buttons.decline')}
              </button>
              <button
                onClick={handleAcceptAll}
                className="cursor-pointer px-3 py-1.5 bg-gold hover:bg-gold/90 text-onyx text-xs transition-colors rounded-sm"
                aria-label="Accept all cookies"
                type="button"
              >
                {t('cookieConsent.accept')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(CookieConsent); 