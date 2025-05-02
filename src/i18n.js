import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getLanguage } from './utils/language';

// Check if URL starts with language code and remember it
const checkUrlLanguage = () => {
  // With HashRouter, we need to check both pathname and hash
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  
  // Check if URL starts with /en (direct load with language prefix)
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  
  // Check if hash contains language prefix like /#/en/
  if (hash.includes('#/en/') || hash === '#/en') {
    return 'en';
  }
  
  // If no language in URL, use stored preference
  return null;
};

// Get initial language - URL has priority over stored preference
const urlLang = checkUrlLanguage();
const storedLang = getLanguage();
const initialLang = urlLang || storedLang;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'nl',
    lng: initialLang,
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    defaultNS: 'common',
    
    ns: ['common', 'home', 'menu', 'about'],
    
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      lookupCookie: 'base_language',
      lookupLocalStorage: 'base_language',
      caches: ['localStorage', 'cookie'],
    },
    
    react: {
      useSuspense: true,
    },
  });

export default i18n; 