// LanguageSwitcher.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag"; // Імпортуємо ReactCountryFlag
import styles from "../styles/LanguageSwitcher.module.css"; // Імпортуємо стилі

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "uk"
  );
  let timeoutId;

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language, i18n]);

  const toggleLanguages = () => {
    setShowLanguages(!showLanguages);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setShowLanguages(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowLanguages(false);
    }, 300);
  };

  const changeLanguage = (lng) => {
    setLanguage(lng);
    setShowLanguages(false);
  };

  return (
    <div
      className={styles.languageSwitcher}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={styles.languageButton} onClick={toggleLanguages}>
        {language === "uk" ? (
          <ReactCountryFlag
            countryCode="UA"
            svg
            style={{ width: "1.5em", height: "1.5em" }}
          />
        ) : language === "en" ? (
          <ReactCountryFlag
            countryCode="GB"
            svg
            style={{ width: "1.5em", height: "1.5em" }}
          />
        ) : (
          <ReactCountryFlag
            countryCode="DE"
            svg
            style={{ width: "1.5em", height: "1.5em" }}
          />
        )}
      </button>
      {showLanguages && (
        <ul
          className={styles.languageList}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <li onClick={() => changeLanguage("uk")}>
            <ReactCountryFlag
              countryCode="UA"
              svg
              style={{ width: "1.5em", height: "1.5em" }}
            />{" "}
            Українська
          </li>
          <li onClick={() => changeLanguage("en")}>
            <ReactCountryFlag
              countryCode="GB"
              svg
              style={{ width: "1.5em", height: "1.5em" }}
            />{" "}
            English
          </li>
          <li onClick={() => changeLanguage("de")}>
            <ReactCountryFlag
              countryCode="DE"
              svg
              style={{ width: "1.5em", height: "1.5em" }}
            />{" "}
            Deutsch
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
