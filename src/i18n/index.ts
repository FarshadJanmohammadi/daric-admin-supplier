import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import faTranslation from './fa/translation.json';

const localResources = {
    fa: {
        translation: faTranslation,
    },
};

i18n.use(LanguageDetector)
    // .use(initReactI18next)
    .init({
        lng: 'fa',
        fallbackLng: 'fa',
        resources: localResources,
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
