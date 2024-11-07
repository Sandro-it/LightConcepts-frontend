// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Підключаємо HttpApi для завантаження перекладів з файлів
  .use(LanguageDetector) // Використовуємо LanguageDetector для автоматичного визначення мови
  .use(initReactI18next) // Ініціалізуємо i18next для React
  .init({
    supportedLngs: ["en", "uk", "uk-UA", "de"], // Додаємо підтримку 'uk-UA' і 'uk'
    fallbackLng: "en", // Встановлюємо англійську як резервну мову
    debug: true, // Включаємо режим відладки

    interpolation: {
      escapeValue: false, // Встановлюємо escapeValue в false для коректного відображення HTML у перекладах
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Вказуємо шлях до файлів перекладу
    },

    detection: {
      order: ["htmlTag", "path", "cookie", "localStorage", "subdomain"], // Порядок визначення мови
      caches: ["cookie"], // Кешування мови в куках
    },

    // Додаємо цей параметр, щоб обробити короткі та довгі варіанти мовних кодів
    load: "languageOnly",
  });

// Додаємо подію для перевірки правильної ініціалізації мови
i18n.on("initialized", (options) => {
  console.log("Detected language after initialization:", i18n.language);

  // Якщо мова не визначена або визначена неправильно, явно встановлюємо її
  if (!i18n.language || i18n.language === "en") {
    const browserLanguage = navigator.language || navigator.userLanguage;
    console.log("Setting language based on browser:", browserLanguage);
    i18n.changeLanguage(browserLanguage.split("-")[0]); // Використовуємо тільки короткий код мови
  }
});

export default i18n;
