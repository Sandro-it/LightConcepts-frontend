import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import MainMenu from "./MainMenu";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import AuthForm from "./AuthForm";
import { logout, getCurrentUser } from "../services/authService";
import { useFavorites } from "../context/FavoritesContext";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthFormVisible, setAuthFormVisible] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const userIconRef = useRef(null);
  const { reloadFavorites } = useFavorites();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getCurrentUser()
        .then((data) => setUsername(data.username || ""))
        .catch(() => setUsername(""));
    } else {
      setUsername("");
    }
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleAuthForm = (mode) => {
    setAuthMode(mode);
    setAuthFormVisible(true);
  };

  const closeAuthForm = () => {
    setAuthFormVisible(false);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUserMenuOpen(false);
    reloadFavorites();
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (
      userIconRef.current &&
      !userIconRef.current.contains(e.target) &&
      isUserMenuOpen
    ) {
      setUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isUserMenuOpen]);

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
              <LanguageSwitcher />
              <ThemeToggle />
              <Link className={styles.headerIconButton} to="/cart">
                <FaShoppingCart />
              </Link>
              <div
                ref={userIconRef}
                style={{ position: "relative" }}
                className={styles.userIconContainer}
              >
                {isAuthenticated ? (
                  <>
                    <div
                      onClick={toggleUserMenu}
                      title={username || undefined}
                      style={{ cursor: "pointer" }}
                    >
                      <FaUser />
                    </div>
                    {isUserMenuOpen && (
                      <UserMenu
                        username={username}
                        onLogout={handleLogout}
                        onClose={() => setUserMenuOpen(false)}
                      />
                    )}
                  </>
                ) : (
                  <div onClick={() => toggleAuthForm("login")}>
                    <FaUser />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.headerOverlay} onClick={closeMenu}></div>
      )}
      <MobileMenu closeMenu={closeMenu} menuOpen={menuOpen} />
      {isAuthFormVisible && (
        <AuthForm
          mode={authMode}
          onClose={closeAuthForm}
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            reloadFavorites();
          }}
        />
      )}
    </header>
  );
};

export default Header;
