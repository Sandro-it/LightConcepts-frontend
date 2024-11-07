// src/components/MainMenu.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../styles/MainMenu.module.css";

const MainMenu = ({ closeMenu }) => {
  const { t } = useTranslation();
  const [isProductsMenuOpen, setProductsMenuOpen] = useState(false);

  const showProductsMenu = () => setProductsMenuOpen(true);
  const hideProductsMenu = () => setProductsMenuOpen(false);

  // Закриваємо підменю після вибору
  const handleSubMenuClick = () => {
    setProductsMenuOpen(false);
    closeMenu();
  };

  return (
    <ul className={styles.mainMenuNavLinks}>
      <li className={styles.mainMenuNavItem}>
        <Link className={styles.mainMenuNavLink} to="/" onClick={closeMenu}>
          {t("home")}
        </Link>
      </li>
      <li className={styles.mainMenuNavItem}>
        <Link
          className={styles.mainMenuNavLink}
          to="/resilience"
          onClick={closeMenu}
        >
          {t("resilience")}
        </Link>
      </li>
      <li
        className={styles.mainMenuNavItem}
        onMouseEnter={showProductsMenu}
        onMouseLeave={hideProductsMenu}
      >
        <Link
          className={styles.mainMenuNavLink}
          to="/products"
          onClick={closeMenu}
        >
          {t("products")}
        </Link>
        {isProductsMenuOpen && (
          <ul
            className={styles.mainMenuSubMenu}
            onMouseEnter={showProductsMenu}
            onMouseLeave={hideProductsMenu}
          >
            <li>
              <Link
                to="/lights-category"
                className={styles.mainMenuSubMenuItem}
                onClick={handleSubMenuClick}
              >
                {t("categories.lights")}
              </Link>
            </li>
            <li>
              <Link
                to="/candles-category"
                className={styles.mainMenuSubMenuItem}
                onClick={handleSubMenuClick}
              >
                {t("categories.candles")}
              </Link>
            </li>
            <li>
              <Link
                to="/furniture-category"
                className={styles.mainMenuSubMenuItem}
                onClick={handleSubMenuClick}
              >
                {t("categories.furniture")}
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li className={styles.mainMenuNavItem}>
        <Link
          className={styles.mainMenuNavLink}
          to="/contact"
          onClick={closeMenu}
        >
          {t("contact")}
        </Link>
      </li>
      <li className={styles.mainMenuNavItem}>
        <Link
          className={styles.mainMenuNavLink}
          to="/shipping"
          onClick={closeMenu}
        >
          {t("shipping")}
        </Link>
      </li>
    </ul>
  );
};

export default MainMenu;
