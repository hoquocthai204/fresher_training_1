import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const apiKey = "zzsKNL_6z8zy9RwBI4zfNg";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "vi",

        ns: ["default"],
        defaultNS: "default",

        supportedLngs: ["en", "vi", "ja", "am", "km", "ko", "th", "af", "id", "de"],

        backend: {
            loadPath: loadPath
        }
    })