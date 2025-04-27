import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getLanguage } from './utils/language';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'nl',
    lng: getLanguage(),
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