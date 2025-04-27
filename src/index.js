import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import { HelmetProvider } from 'react-helmet-async';

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
