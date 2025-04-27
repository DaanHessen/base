import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';

const Layout = memo(({ children }) => {
  const location = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      const img = new Image();
      img.src = '/home_placeholder.jpg';
      img.onload = () => setImageLoaded(true);
      
      return () => {
        img.onload = null;
      };
    } else {
      setImageLoaded(false);
    }
  }, [isHomePage]);

  const backgroundStyle = isHomePage ? {
    // Only show background color before image loads
    backgroundColor: !imageLoaded ? 'var(--onyx)' : 'transparent',
    backgroundImage: `url('/home_placeholder.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    // Adding a subtle overlay with our new color palette - increased opacity
    boxShadow: 'inset 0 0 0 2000px rgba(62, 62, 62, 0.4)', // onyx with increased transparency
    // Add opacity transition for smoother appearance
    transition: 'opacity 0.3s ease-in-out',
    opacity: imageLoaded ? 1 : 0
  } : {
    backgroundColor: 'var(--onyx)'
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={backgroundStyle}
    >
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout; 