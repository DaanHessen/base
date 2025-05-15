import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t, i18n } = useTranslation(['home', 'common']);
  const currentLang = i18n.language;
  const [isMobile, setIsMobile] = useState(false);
  
  // Helper function to generate properly localized paths
  const getLocalizedPath = (basePath) => {
    const lang = getLanguage();
    if (lang === 'en') return `/en${basePath}`;
    return basePath;
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    // Rest of the component code
  );
}

export default Home; 