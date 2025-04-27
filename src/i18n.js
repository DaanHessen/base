import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getLanguage } from './utils/language';

i18n
  // Load translations from /public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: 'nl',
    lng: getLanguage(),
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Backend options
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Default namespace
    defaultNS: 'common',
    
    // Namespaces to load
    ns: ['common', 'home', 'menu', 'about'],
    
    // Detector options
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      lookupCookie: 'base_language',
      caches: ['cookie'],
    },
    
    react: {
      useSuspense: true,
    },
  });

export default i18n; 