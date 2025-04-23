import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';

const Layout = ({ children }) => {
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
};

export default Layout; 