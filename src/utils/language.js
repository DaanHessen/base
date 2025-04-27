import Cookies from 'js-cookie';
import i18n from 'i18next';

const LANGUAGE_COOKIE = 'base_language';
const DEFAULT_LANGUAGE = 'nl';
const COOKIE_EXPIRES = 365;

export const getLanguage = () => {
  return Cookies.get(LANGUAGE_COOKIE) || DEFAULT_LANGUAGE;
};

export const setLanguage = (lang) => {
  if (lang !== getLanguage()) {
    Cookies.set(LANGUAGE_COOKIE, lang, { expires: COOKIE_EXPIRES, sameSite: 'strict' });
    
    // Update i18n instance
    i18n.changeLanguage(lang);
    
    // Dispatch a custom event for components that need to respond to language changes
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
  }
}; 