// Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher"; // Імпортуємо LanguageSwitcher
import ThemeToggle from "./ThemeToggle"; // Імпортуємо ThemeToggle
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Імпортуємо іконки
import MainMenu from "./MainMenu";
import MobileMenu from "./MobileMenu";
import styles from "../styles/Header.module.css"; // Імпортуємо стилі

const Header = () => {
  const { t } = useTranslation(); // Використовуємо useTranslation
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerNavContainer}>
          <button className={styles.headerMenuButton} onClick={toggleMenu}>
            ☰
          </button>
          <div className={styles.headerNavAndSwitchersContainer}>
            <nav
              className={`${styles.headerNav} ${
                menuOpen ? styles.headerNavOpen : ""
              }`}
              onClick={closeMenu}
            >
              <MainMenu closeMenu={closeMenu} />
            </nav>
            <div className={styles.headerSwitchersContainer}>
              <LanguageSwitcher /> {/* Інтегруємо LanguageSwitcher */}
              <ThemeToggle /> {/* Інтегруємо ThemeToggle */}
              <Link className={styles.headerIconButton} to="/cart">
                <FaShoppingCart />
              </Link>
              <Link className={styles.headerIconButton} to="/login">
                <FaUser />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.headerOverlay} onClick={closeMenu}></div>
      )}
      <MobileMenu closeMenu={closeMenu} menuOpen={menuOpen} />
    </header>
  );
};

export default Header;
