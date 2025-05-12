import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import { HelmetProvider } from 'react-helmet-async';

// Set the viewport height CSS variable for mobile devices
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Fix for iOS Safari 100vh issue
const preventBounce = () => {
  document.body.addEventListener('touchmove', function(e) {
    // Allow scrolling in elements that should scroll
    if (e.target.closest('.scroll-container, .overflow-y-auto, iframe, input, textarea, select')) {
      return;
    }
    
    // Prevent bounce effect for body
    if (document.body.scrollTop <= 0 && e.touches[0].screenY > 0) {
      e.preventDefault();
    }
  }, { passive: false });
};

// Run immediately and on resize
setViewportHeight();
window.addEventListener('resize', () => {
  // Debounce viewport height updates to improve performance
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(setViewportHeight, 150);
});
window.addEventListener('orientationchange', () => {
  // Force immediate update on orientation change
  setViewportHeight();
  // Then update again after animation completes
  setTimeout(setViewportHeight, 300);
});

// Apply iOS fixes
if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
  preventBounce();
}

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
