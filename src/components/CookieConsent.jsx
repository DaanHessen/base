import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true and can't be changed
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made their choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // If no consent found, show the banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // If consent exists, parse it
      try {
        setPreferences(JSON.parse(consent));
      } catch (error) {
        console.error('Error parsing cookie consent', error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleOpenCookieSettings = () => {
    setIsVisible(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 bg-dark bg-opacity-95 shadow-xl backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-accent font-medium text-lg mb-2">Cookie Consent</h3>
            <p className="text-pastel-light text-sm mb-2">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <div className="space-y-2 mt-3">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="necessary" 
                  checked={preferences.necessary} 
                  disabled 
                  className="mr-2 text-accent cursor-not-allowed" 
                />
                <label htmlFor="necessary" className="text-sm text-pastel-light flex flex-col">
                  <span className="font-medium">Necessary</span>
                  <span className="text-xs opacity-70">Essential for the website to function properly</span>
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="analytics" 
                  checked={preferences.analytics}
                  onChange={() => handlePreferenceChange('analytics')}
                  className="mr-2 text-accent cursor-pointer" 
                />
                <label htmlFor="analytics" className="text-sm text-pastel-light flex flex-col cursor-pointer">
                  <span className="font-medium">Analytics</span>
                  <span className="text-xs opacity-70">Help us improve our website by collecting anonymous usage data</span>
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="marketing" 
                  checked={preferences.marketing}
                  onChange={() => handlePreferenceChange('marketing')}  
                  className="mr-2 text-accent cursor-pointer" 
                />
                <label htmlFor="marketing" className="text-sm text-pastel-light flex flex-col cursor-pointer">
                  <span className="font-medium">Marketing</span>
                  <span className="text-xs opacity-70">Allow us to provide personalized content and advertisements</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 w-full md:w-auto">
            <button 
              onClick={handleRejectAll} 
              className="px-4 py-2 border border-gray-700 text-pastel-light text-sm hover:bg-gray-800 transition-colors rounded-sm"
            >
              Reject All
            </button>
            <button 
              onClick={handleSavePreferences} 
              className="px-4 py-2 border border-gray-700 text-pastel-light text-sm hover:bg-gray-800 transition-colors rounded-sm"
            >
              Save Preferences
            </button>
            <button 
              onClick={handleAcceptAll} 
              className="px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm transition-colors rounded-sm"
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