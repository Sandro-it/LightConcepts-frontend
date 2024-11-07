import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../styles/MobileMenu.module.css";

const MobileMenu = ({ closeMenu, menuOpen }) => {
  const { t } = useTranslation();

  return (
    <nav
      className={`${styles.mobileMenu} ${
        menuOpen ? styles.mobileMenuOpen : ""
      }`}
      onClick={closeMenu}
    >
      <ul className={styles.mobileMenuNavLinks}>
        <li>
          <Link className={styles.mobileMenuNavLink} to="/" onClick={closeMenu}>
            {t("home")}
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileMenuNavLink}
            to="/resilience"
            onClick={closeMenu}
          >
            {t("resilience")}
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileMenuNavLink}
            to="/products"
            onClick={closeMenu}
          >
            {t("products")}
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileMenuNavLink}
            to="/contact"
            onClick={closeMenu}
          >
            {t("contact")}
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileMenuNavLink}
            to="/shipping"
            onClick={closeMenu}
          >
            {t("shipping")}
          </Link>
        </li>
        <li>
          {/* <Link
            className={styles.mobileMenuNavLink}
            to="/cart"
            onClick={closeMenu}
          >
            {t("cart")}
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileMenuNavLink}
            to="/login"
            onClick={closeMenu}
          >
            {t("login")}
          </Link> */}
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
