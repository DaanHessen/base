import React, { memo } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';

const Layout = memo(({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
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