import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Set the viewport height CSS variable for mobile devices
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Run immediately and on resize
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

const LoadingIndicator = () => (
  <div className="loading-indicator">
    <div className="flex space-x-2">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<LoadingIndicator />}>
        <App />
        <Analytics mode="auto" debug={false} />
        <SpeedInsights sampleRate={0.5} />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);
