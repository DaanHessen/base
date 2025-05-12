import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Reservation = ({ className }) => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const formitableContainerRef = useRef(null);
  const widgetLoaded = useRef(false);

  useEffect(() => {
    // Skip if widget already loaded or container not available yet
    if (widgetLoaded.current || !formitableContainerRef.current) return;
    
    // Create script element for Formitable
    const script = document.createElement('script');
    script.src = 'https://static.formitable.com/javascript/embed.js';
    script.async = true;
    script.defer = true;
    script.onload = () => loadFormitableWidget();
    
    // Append script to document
    document.body.appendChild(script);
    
    // Flag that we've started loading the widget
    widgetLoaded.current = true;
    
    // Cleanup function
    return () => {
      // Only remove script when component unmounts if needed
      // document.body.removeChild(script);
    };
  }, [formitableContainerRef]);
  
  // Function to load Formitable widget after script loads
  const loadFormitableWidget = () => {
    if (window.Formitable) {
      try {
        // Initialize the widget - replace 'YOUR_RESTAURANT_ID' with your actual ID when available
        // For now using a placeholder that will not work until configured
        window.Formitable.widget({
          // Set the language based on your app's language
          lang: currentLang,
          // Replace with your restaurant ID when available
          restaurantId: 'YOUR_RESTAURANT_ID',
          selector: '#formitable-container',
          // You can customize the appearance
          appearance: {
            style: 'box', // 'inline' or 'box'
            baseColor: '#d4af37' // Gold color to match your theme
          }
        });
      } catch (error) {
        console.error('Error initializing Formitable widget:', error);
      }
    }
  };
  
  // Update widget when language changes
  useEffect(() => {
    if (widgetLoaded.current && window.Formitable) {
      // Remove existing widget
      if (formitableContainerRef.current) {
        formitableContainerRef.current.innerHTML = '';
      }
      
      // Reload widget with new language
      loadFormitableWidget();
    }
  }, [currentLang]);

  return (
    <div className={`reservation-widget ${className || ''}`}>
      <div 
        id="formitable-container" 
        ref={formitableContainerRef}
        className="bg-onyx/70 backdrop-blur-sm p-6 border border-gold/30 rounded-lg shadow-lg"
      >
        <div className="text-center py-4">
          <p className="text-magnolia">{t('reservation.loading')}</p>
          <p className="text-sm text-magnolia/80 mt-2">
            {t('reservation.notConfigured')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservation; 