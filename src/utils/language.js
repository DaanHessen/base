import Cookies from 'js-cookie';
import i18n from 'i18next';

const LANGUAGE_KEY = 'base_language';
const DEFAULT_LANGUAGE = 'nl';
const COOKIE_EXPIRES = 365;

export const getLanguage = () => {
  // Try localStorage first, then cookie, then default
  const localStorageLang = localStorage.getItem(LANGUAGE_KEY);
  const cookieLang = Cookies.get(LANGUAGE_KEY);
  
  // Return the first available value, with priority to localStorage
  return localStorageLang || cookieLang || DEFAULT_LANGUAGE;
};

export const setLanguage = (lang) => {
  if (lang !== getLanguage()) {
    // Save to both localStorage and cookies for redundancy
    localStorage.setItem(LANGUAGE_KEY, lang);
    Cookies.set(LANGUAGE_KEY, lang, { expires: COOKIE_EXPIRES, sameSite: 'strict' });
    
    // Update i18next
    i18n.changeLanguage(lang);
    
    // Dispatch event for any listeners
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
  }
}; 