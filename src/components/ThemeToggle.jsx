// ThemeToggle.jsx
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Імпортуємо іконки
import styles from "../styles/ThemeToggle.module.css"; // Імпортуємо стилі

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      {theme === "light" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
