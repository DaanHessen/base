import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import { HelmetProvider } from 'react-helmet-async';

// Set custom viewport height property for mobile browsers
const setViewportHeight = () => {
  // Small delay to ensure we get accurate height after orientation change
  setTimeout(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, 100);
};

// Set on initial load
setViewportHeight();

// Update on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
  // Run multiple times to catch iOS Safari's delayed height update
  setViewportHeight();
  setTimeout(setViewportHeight, 200);
  setTimeout(setViewportHeight, 500);
});

// Also update on page load and DOMContentLoaded
window.addEventListener('load', setViewportHeight);
document.addEventListener('DOMContentLoaded', setViewportHeight);

const LoadingIndicator = () => (
  <div className="min-h-screen flex items-center justify-center bg-onyx">
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<LoadingIndicator />}>
        <App />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);
