import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'en', // Idioma padrão
        resources: {
            en: {
                translation: {
                    Olá: 'Hello',
                },
            },
            pt: {
                translation: {
                    Olá: 'Olá',
                },
            },
        },
        fallbackLng: 'en', // Idioma de fallback caso a tradução não exista
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false, // React já escapa os valores por padrão
        },
    });

export default i18n;
