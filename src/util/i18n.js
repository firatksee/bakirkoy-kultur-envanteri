import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import translations
import en from "../locales/en.json";

// register imported translations
const resources = {
    en: { translation: en },
};

// get browser language for initial app language
const browserLang = navigator.language || navigator.userLanguage;
const initialLang = browserLang.split("-")[0];

// initiate i18n
i18n.use(initReactI18next).init({
    resources,
    lng: initialLang, // initial language
    fallbackLng: "en", // default language
    interpolation: { escapeValue: false }, // this allows you to include dynamic content,
    // such as user names or dynamically generated values, in your translations
});

// exporting i18n is useful if you need to access i18n functionality outside of React components,
// such as in utility functions, middleware, or other parts of your application
export default i18n;
