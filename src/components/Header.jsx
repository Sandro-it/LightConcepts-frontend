// // Header.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "./LanguageSwitcher"; // Імпортуємо LanguageSwitcher
// import ThemeToggle from "./ThemeToggle"; // Імпортуємо ThemeToggle
// import { FaShoppingCart, FaUser } from "react-icons/fa"; // Імпортуємо іконки
// import MainMenu from "./MainMenu";
// import MobileMenu from "./MobileMenu";
// import styles from "../styles/Header.module.css"; // Імпортуємо стилі

// const Header = () => {
//   const { t } = useTranslation(); // Використовуємо useTranslation
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.headerContainer}>
//         <div className={styles.headerNavContainer}>
//           <button className={styles.headerMenuButton} onClick={toggleMenu}>
//             ☰
//           </button>
//           <div className={styles.headerNavAndSwitchersContainer}>
//             <nav
//               className={`${styles.headerNav} ${
//                 menuOpen ? styles.headerNavOpen : ""
//               }`}
//               onClick={closeMenu}
//             >
//               <MainMenu closeMenu={closeMenu} />
//             </nav>
//             <div className={styles.headerSwitchersContainer}>
//               <LanguageSwitcher /> {/* Інтегруємо LanguageSwitcher */}
//               <ThemeToggle /> {/* Інтегруємо ThemeToggle */}
//               <Link className={styles.headerIconButton} to="/cart">
//                 <FaShoppingCart />
//               </Link>
//               <Link className={styles.headerIconButton} to="/login">
//                 <FaUser />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {menuOpen && (
//         <div className={styles.headerOverlay} onClick={closeMenu}></div>
//       )}
//       <MobileMenu closeMenu={closeMenu} menuOpen={menuOpen} />
//     </header>
//   );
// };

// export default Header;

//====================================================реєстрація+============================================================//

// // Header.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "./LanguageSwitcher";
// import ThemeToggle from "./ThemeToggle";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import MainMenu from "./MainMenu";
// import MobileMenu from "./MobileMenu";
// import UserMenu from "./UserMenu"; // Імпорт компонента UserMenu
// import styles from "../styles/Header.module.css";

// const Header = () => {
//   const { t } = useTranslation();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     console.log("Main menu toggled"); // Лог для перевірки функції
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   const toggleUserMenu = () => {
//     console.log("User icon clicked"); // Лог для перевірки кліку на іконку
//     setUserMenuOpen(!userMenuOpen);
//   };

//   const closeUserMenu = () => {
//     console.log("User menu closed"); // Лог для перевірки закриття меню
//     setUserMenuOpen(false);
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.headerContainer}>
//         <div className={styles.headerNavContainer}>
//           <button className={styles.headerMenuButton} onClick={toggleMenu}>
//             ☰
//           </button>
//           <div className={styles.headerNavAndSwitchersContainer}>
//             <nav
//               className={`${styles.headerNav} ${
//                 menuOpen ? styles.headerNavOpen : ""
//               }`}
//               onClick={closeMenu}
//             >
//               <MainMenu closeMenu={closeMenu} />
//             </nav>
//             <div className={styles.headerSwitchersContainer}>
//               <LanguageSwitcher />
//               <ThemeToggle />
//               <Link className={styles.headerIconButton} to="/cart">
//                 <FaShoppingCart />
//               </Link>
//               {/* <div
//                 className={styles.userIconContainer}
//                 onClick={toggleUserMenu}
//               >
//                 <FaUser />
//                 {userMenuOpen && <UserMenu closeUserMenu={closeUserMenu} />}
//               </div> */}
//               <div
//                 className={styles.userIconContainer}
//                 style={{ position: "relative" }}
//                 onClick={toggleUserMenu}
//               >
//                 <FaUser />
//                 {userMenuOpen && <UserMenu />}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {menuOpen && (
//         <div className={styles.headerOverlay} onClick={closeMenu}></div>
//       )}
//       <MobileMenu closeMenu={closeMenu} menuOpen={menuOpen} />
//     </header>
//   );
// };

// export default Header;

//======================================ауз перенесено сюди і працює вже==================================//

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "./LanguageSwitcher";
// import ThemeToggle from "./ThemeToggle";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import MainMenu from "./MainMenu";
// import MobileMenu from "./MobileMenu";
// import UserMenu from "./UserMenu";
// import AuthForm from "./AuthForm"; // Імпорт модального вікна авторизації
// import styles from "../styles/Header.module.css";

// const Header = () => {
//   const { t } = useTranslation();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isAuthFormVisible, setAuthFormVisible] = useState(false);
//   const [authMode, setAuthMode] = useState("login");

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   const toggleAuthForm = (mode) => {
//     setAuthMode(mode);
//     setAuthFormVisible(true);
//   };

//   const closeAuthForm = () => {
//     setAuthFormVisible(false);
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.headerContainer}>
//         <div className={styles.headerNavContainer}>
//           <button className={styles.headerMenuButton} onClick={toggleMenu}>
//             ☰
//           </button>
//           <div className={styles.headerNavAndSwitchersContainer}>
//             <nav
//               className={`${styles.headerNav} ${
//                 menuOpen ? styles.headerNavOpen : ""
//               }`}
//               onClick={closeMenu}
//             >
//               <MainMenu closeMenu={closeMenu} />
//             </nav>
//             <div className={styles.headerSwitchersContainer}>
//               <LanguageSwitcher />
//               <ThemeToggle />
//               <Link className={styles.headerIconButton} to="/cart">
//                 <FaShoppingCart />
//               </Link>
//               <div
//                 className={styles.userIconContainer}
//                 style={{ position: "relative" }}
//                 onClick={() => toggleAuthForm("login")}
//               >
//                 <FaUser />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {menuOpen && (
//         <div className={styles.headerOverlay} onClick={closeMenu}></div>
//       )}
//       <MobileMenu closeMenu={closeMenu} menuOpen={menuOpen} />
//       {isAuthFormVisible && (
//         <AuthForm mode={authMode} onClose={closeAuthForm} />
//       )}
//     </header>
//   );
// };

// export default Header;

//=============================================меню зареєстрованого користувача==================================//

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "./LanguageSwitcher";
// import ThemeToggle from "./ThemeToggle";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import MainMenu from "./MainMenu";
// import MobileMenu from "./MobileMenu";
// import UserMenu from "./UserMenu";
// import AuthForm from "./AuthForm";
// import { logout } from "../services/authService";
// import styles from "../styles/Header.module.css";

// const Header = () => {
//   const { t } = useTranslation();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isAuthFormVisible, setAuthFormVisible] = useState(false);
//   const [authMode, setAuthMode] = useState("login");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Перевірка токена в localStorage
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token); // Якщо токен є, вважаємо, що користувач авторизований
//   }, []);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   const toggleAuthForm = (mode) => {
//     setAuthMode(mode);
//     setAuthFormVisible(true);
//   };

//   const closeAuthForm = () => {
//     setAuthFormVisible(false);
//   };

//   const handleLogout = () => {
//     logout(); // Видалення токена
//     setIsAuthenticated(false); // Скидання стану
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.headerContainer}>
//         <div className={styles.headerNavContainer}>
//           <button className={styles.headerMenuButton} onClick={toggleMenu}>
//             ☰
//           </button>
//           <div className={styles.headerNavAndSwitchersContainer}>
//             <nav
//               className={`${styles.headerNav} ${
//                 menuOpen ? styles.headerNavOpen : ""
//               }`}
//               onClick={closeMenu}
//             >
//               <MainMenu closeMenu={closeMenu} />
//             </nav>
//             <div className={styles.headerSwitchersContainer}>
//               <LanguageSwitcher />
//               <ThemeToggle />
//               <Link className={styles.headerIconButton} to="/cart">
//                 <FaShoppingCart />
//               </Link>
//               <div style={{ position: "relative" }}>
//                 {isAuthenticated ? (
//                   <UserMenu onLogout={handleLogout} />
//                 ) : (
//                   <div
//                     className={styles.userIconContainer}
//                     onClick={() => toggleAuthForm("login")}
//                   >
//                     <FaUser />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {menuOpen && (
//         <div className={styles.headerOverlay} onClick={closeMenu}></div>
//       )}
//       <MobileMenu closeMenu={closeMenu} menuOpen={menuOpen} />
//       {isAuthFormVisible && (
//         <AuthForm
//           mode={authMode}
//           onClose={closeAuthForm}
//           onLoginSuccess={() => setIsAuthenticated(true)}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;

//=====================================================================================//

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
import { logout } from "../services/authService";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthFormVisible, setAuthFormVisible] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const userIconRef = useRef(null);

  useEffect(() => {
    // Перевірка токена в localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Якщо токен є, вважаємо, що користувач авторизований
  }, []);

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
    logout(); // Видалення токена
    setIsAuthenticated(false); // Скидання стану
    setUserMenuOpen(false); // Закрити меню користувача
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
                    <div onClick={toggleUserMenu}>
                      <FaUser />
                    </div>
                    {isUserMenuOpen && <UserMenu onLogout={handleLogout} />}
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
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      )}
    </header>
  );
};

export default Header;
