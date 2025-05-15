import React, { memo, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';
import { motion, AnimatePresence } from 'framer-motion';

function Layout({ children }) {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  const [bgImage, setBgImage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const bgRef = useRef(null);
  const mainRef = useRef(null);
  const layoutContentRef = useRef(null);
  
  const getBasePath = (path) => {
    if (path.startsWith('/en')) return path.substring(3);
    return path;
  };
  
  const currentPath = getBasePath(location.pathname);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Handle scroll events to set navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = isMobile 
        ? (layoutContentRef.current?.scrollTop || 0) 
        : window.scrollY;
        
      if (scrollPosition > 5) {
        setIsScrolled(true);
        document.querySelector('.fixed-nav')?.setAttribute('data-scrolled', 'true');
      } else {
        setIsScrolled(false);
        document.querySelector('.fixed-nav')?.setAttribute('data-scrolled', 'false');
      }
    };
    
    // Listen to the correct scroll event based on device
    if (isMobile && layoutContentRef.current) {
      layoutContentRef.current.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initial check - set scrolled by default
    setTimeout(() => {
      setIsScrolled(true);
      document.querySelector('.fixed-nav')?.setAttribute('data-scrolled', 'true');
    }, 100);
    
    return () => {
      if (layoutContentRef.current) {
        layoutContentRef.current.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]); // Dependency on isMobile to re-attach listeners when it changes

  useEffect(() => {
    const isHome = currentPath === '/';
    setIsHomePage(isHome);
    
    if (isHome) {
      const img = new Image();
      img.src = '/home_placeholder.jpg';
      img.onload = () => {
        setBgImage('/home_placeholder.jpg');
      };
      
      const timeout = setTimeout(() => {
        if (!bgImage) setBgImage('/home_placeholder.jpg');
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      setBgImage('');
    }
  }, [currentPath, bgImage]);

  useEffect(() => {
    const handleLanguageChange = () => {
      if (currentPath === '/') {
        setBgImage('');
        setTimeout(() => {
          setBgImage('/home_placeholder.jpg');
        }, 50);
      }
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [currentPath, i18n]);

  React.useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Add safe area insets as CSS variables
      if ('visualViewport' in window) {
        document.documentElement.style.setProperty(
          '--safe-area-inset-top',
          `${window.visualViewport.offsetTop}px`
        );
        document.documentElement.style.setProperty(
          '--safe-area-inset-bottom',
          `${Math.max(0, window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop)}px`
        );
      }
    };

    setVH();
    
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Apply styles to html and body for proper height handling
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.position = 'relative';
    document.body.style.overflow = 'hidden'; // Prevent body scrolling on all devices
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      // Reset styles on component unmount
      document.documentElement.style.height = '';
      document.body.style.height = '';
      document.body.style.margin = '';
      document.body.style.position = '';
      document.body.style.overflow = '';
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-onyx overflow-hidden" id="root-container">
      <div 
        ref={bgRef}
        className={`fixed inset-0 z-0 transition-opacity duration-300 ease-in-out bg-onyx bg-center bg-cover bg-no-repeat ${isHomePage ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'fixed-bg' : 'bg-fixed-custom'}`}
        style={{
          backgroundImage: `url(${bgImage || '/home_placeholder.jpg'})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          boxShadow: 'inset 0 0 0 2000px rgba(62, 62, 62, 0.6)'
        }}
      ></div>
      
      {isHomePage && isMobile && (
        <div className="bg-fixed-container">
          <div 
            style={{
              backgroundImage: `url(${bgImage || '/home_placeholder.jpg'})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              boxShadow: 'inset 0 0 0 2000px rgba(62, 62, 62, 0.6)',
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            className="fixed-bg"
          ></div>
        </div>
      )}
      
      <div 
        ref={layoutContentRef}
        className="layout-content relative z-10 flex flex-col min-h-screen overflow-y-auto"
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          height: '100vh',
          height: 'calc(var(--vh, 1vh) * 100)',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <Helmet>
          <html lang={currentLang} />
          <title>{t('seo.title')}</title>
          <meta name="description" content={t('seo.description')} />
          <meta name="keywords" content={t('seo.keywords')} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
          
          <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.formitable.com https://maps.googleapis.com https://maps.google.com https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com https://fonts.cdnfonts.com; connect-src 'self' https:; frame-src 'self' https://maps.google.com https://www.google.com https://formitable.com; media-src 'self';" />
          <meta http-equiv="X-Content-Type-Options" content="nosniff" />
          <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
          
          {/* CSS styles have been moved to external files:
             - base.css: Global styles and variables
             - layout.css: Layout specific styles
             - navbar.css: Navigation styles
             - responsive.css: Media queries and responsive adjustments
          */}
          
          {/* activeRouteConfig?.header && (
            <div className="hero-header">
              {activeRouteConfig.header}
            </div>
          )} */}
          
          <link rel="canonical" href={`${window.location.origin}${currentLang === 'en' ? '/en' : ''}${currentPath}`} />
          {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/en${currentPath}`} />}
          {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}${currentPath}`} />}
          <link rel="alternate" hrefLang="x-default" href={`${window.location.origin}${currentPath}`} />
          
          <meta property="og:site_name" content="BASE" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${window.location.origin}${currentLang === 'en' ? '/en' : ''}${currentPath}`} />
          <meta property="og:title" content={t('seo.title')} />
          <meta property="og:description" content={t('seo.description')} />
          <meta property="og:image" content={`${window.location.origin}/og-image.jpg`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content={currentLang === 'en' ? 'en_US' : 'nl_NL'} />
          
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t('seo.title')} />
          <meta name="twitter:description" content={t('seo.description')} />
          <meta name="twitter:image" content={`${window.location.origin}/og-image.jpg`} />
          <meta name="twitter:site" content="@baserestaurant" />
          
          <meta name="robots" content="index, follow" />
          <meta name="author" content="BASE Restaurant & bar" />
          <meta name="geo.region" content="NL" />
          <meta name="geo.placename" content="Hilversum" />
          <meta name="geo.position" content="52.223958;5.17502" />
          <meta name="ICBM" content="52.223958, 5.17502" />
          
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "BASE Restaurant & Bar",
              "image": `${window.location.origin}/og-image.jpg`,
              "@id": `${window.location.origin}/#restaurant`,
              "url": window.location.origin,
              "telephone": t('footer.contact.phone'),
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Biersteeg 10, Kampstraat 22",
                "addressLocality": "Hilversum",
                "postalCode": "1211 GC",
                "addressCountry": "NL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 52.223958,
                "longitude": 5.17502
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Monday",
                  "opens": "17:00",
                  "closes": "22:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Sunday"],
                  "opens": "12:00",
                  "closes": "22:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Friday", "Saturday"],
                  "opens": "12:00",
                  "closes": "23:00"
                }
              ],
              "priceRange": "€€",
              "servesCuisine": ["Dutch", "International", "European"],
              "paymentAccepted": "Credit Card, Cash",
              "currenciesAccepted": "EUR"
            })}
          </script>
        </Helmet>
        
        <Navbar
          isScrolled={isScrolled}
          currentLang={currentLang}
        />
        
        <main ref={mainRef} className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              className={`min-h-full w-full flex flex-col ${ 
                !isHomePage ? 'pt-[114px]' : ''
              }`}
              style={{ 
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <Footer />
        
        <CookieConsent />
      </div>
    </div>
  );
}

Layout.displayName = 'Layout';

export default memo(Layout); 
