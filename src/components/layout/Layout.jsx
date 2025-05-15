import React, { memo, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';
import { motion, AnimatePresence } from 'framer-motion';
import './Layout.css';

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
        
      if (scrollPosition > 10) {
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
    
    // Initial check
    handleScroll();
    
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
          minHeight: '100%',
          height: '100%'
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
          
          <style>
            {`
              html, body {
                height: 100%;
                margin: 0;
                padding: 0;
                overscroll-behavior: none;
              }

              #root-container {
                height: 100%;
                display: flex;
                flex-direction: column;
                position: fixed;
                width: 100%;
                top: 0;
                left: 0;
              }
              
              .layout-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                overflow-x: hidden;
                overscroll-behavior-y: none;
                padding-bottom: env(safe-area-inset-bottom, 0px);
                scroll-padding-bottom: env(safe-area-inset-bottom, 0px);
              }
              
              /* Ensure footer sticks at the bottom */
              .footer-container {
                margin-top: auto;
                min-height: max-content;
                flex-shrink: 0;
                position: relative;
                z-index: 1;
                width: 100%;
                background-color: #3e3e3e;
              }

              /* Adjust page content spacing */
              main {
                padding-top: 0;
                display: flex;
                flex-direction: column;
              }

              /* Fix gap between navbar and page content */
              h1, .page-title, .section-title {
                margin-top: 0;
              }

              /* Ensure content fills available space but doesn't overflow */
              .layout-content > main {
                flex: 1 0 auto;
                min-height: 0;
              }

              @media (max-width: 767px) {
                .bg-fixed-container, 
                [style*="height: 100vh"] {
                  height: calc(var(--vh, 1vh) * 100) !important;
                }
                
                .overflow-container {
                  max-width: 100vw;
                  overflow-x: hidden;
                  word-break: break-word;
                }
                
                h1, h2, h3, p {
                  max-width: 100%;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                }
                
                nav.fixed-nav {
                  position: sticky !important;
                  top: 0;
                  z-index: 50;
                  width: 100%;
                  transform: translateZ(0);
                  -webkit-transform: translateZ(0);
                  backface-visibility: hidden;
                  perspective: 1000;
                  will-change: transform;
                  transition: background-color 0.3s ease;
                }
                
                nav.fixed-nav[data-scrolled="true"] {
                  background-color: rgba(62, 62, 62, 0.95) !important;
                  backdrop-filter: blur(4px);
                  -webkit-backdrop-filter: blur(4px);
                }
                
                .bg-fixed-container {
                  height: calc(var(--vh, 1vh) * 100) !important;
                  overflow: hidden;
                  position: fixed;
                  width: 100%;
                  top: 0;
                  left: 0;
                  z-index: -2;
                }

                .footer-container {
                  border-bottom: 0px solid transparent;
                  padding-bottom: max(env(safe-area-inset-bottom, 16px), 16px);
                }

                /* Ensure main content has proper spacing after footer */
                main {
                  min-height: 0;
                  flex: 1 0 auto;
                  padding-bottom: 0;
                  display: flex;
                  flex-direction: column;
                }

                /* Content spacing fix for mobile */
                section, .page-content {
                  padding-top: 0.5rem;
                }

                /* Ensure the layout content doesn't scroll past footer */
                .layout-content::after {
                  content: '';
                  display: block;
                  height: 1px;
                  background-color: transparent;
                  margin-top: -1px;
                }

                /* Fix for iOS Safari and Chrome */
                @supports (-webkit-touch-callout: none) {
                  .layout-content {
                    height: -webkit-fill-available;
                  }
                }
              }
              
              @media (orientation: landscape) {
                .bg-fixed-container {
                  min-height: 100%;
                }
              }

              /* Page specific content spacing */
              .page-container {
                padding-top: 0;
              }

              .page-header {
                margin-top: 0;
                padding-top: 0;
              }

              /* Section spacing within pages */
              section {
                padding-top: 0.5rem;
              }

              /* First section in page needs no padding */
              section:first-child {
                padding-top: 0;
              }
            `}
          </style>
          
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
                  "dayOfWeek": ["Monday", "Tuesday", "Sunday"],
                  "opens": "00:00",
                  "closes": "00:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "15:00",
                  "closes": "22:00"
                }
              ],
              "servesCuisine": "Streetfood",
              "priceRange": "$$",
              "menu": `${window.location.origin}/menu/`,
              "acceptsReservations": "True"
            })}
          </script>
        </Helmet>
        
        <Navbar isScrolled={isScrolled} />
        
        <main ref={mainRef} className="flex-grow flex flex-col w-full mt-0 md:mt-0" style={{ paddingTop: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              className="w-full flex-grow"
              style={{ paddingTop: isMobile ? '0.5rem' : '1rem' }}
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
