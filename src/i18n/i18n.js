import i18n from 'i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const SUPPORTED_LANGS = ['en', 'ar'];
const RTL_LANGS = ['ar'];

export const isRtl = (lng) => RTL_LANGS.includes(lng);

const applyDir = (lng) => {
  document.documentElement.dir = isRtl(lng) ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGS,
    keySeparator: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'loop.lang',
      caches: ['localStorage'],
    },
  });

applyDir(i18n.language);
i18n.on('languageChanged', applyDir);

export default i18n;
