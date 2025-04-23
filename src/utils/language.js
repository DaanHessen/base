import Cookies from 'js-cookie';

const LANGUAGE_COOKIE = 'base_language';
const DEFAULT_LANGUAGE = 'nl';
const COOKIE_EXPIRES = 365;

export const getLanguage = () => {
  return Cookies.get(LANGUAGE_COOKIE) || DEFAULT_LANGUAGE;
};

export const setLanguage = (lang) => {
  if (lang !== getLanguage()) {
    Cookies.set(LANGUAGE_COOKIE, lang, { expires: COOKIE_EXPIRES, sameSite: 'strict' });
    
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
  }
}; 