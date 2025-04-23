import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lang = 'en'; // Default to Dutch
  
  useEffect(() => {
    // Check if user has already made their choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // If no consent found, show the banner immediately
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    setIsVisible(false);
  };

  const handleNecessaryOnly = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 mx-4 sm:mx-6 z-50">
      <div className="max-w-md mx-auto bg-dark/95 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden border border-gray-800">
        <div className="p-4">
          <h3 className="text-accent font-medium text-sm mb-2">Cookie Settings</h3>
          <p className="text-pastel-light text-xs mb-3">
            We use cookies to improve your experience. Choose your preference below.
          </p>
          <div className="flex items-center justify-end space-x-3">
            <button 
              onClick={handleNecessaryOnly} 
              className="px-3 py-1.5 text-xs text-pastel-light hover:text-white transition-colors cursor-pointer"
              style={{ cursor: 'pointer' }}
            >
              Necessary Only
            </button>
            <button 
              onClick={handleAcceptAll} 
              className="px-3 py-1.5 bg-accent hover:bg-accent/90 text-white text-xs transition-colors rounded-sm cursor-pointer"
              style={{ cursor: 'pointer' }}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 