// // UserMenu.jsx
// import AuthForm from "./AuthForm";
// import PropTypes from "prop-types";
// import styles from "../styles/UserMenu.module.css";

// const UserMenu = ({ closeUserMenu }) => {
//   console.log("UserMenu rendered"); // Лог для перевірки рендерингу компонента
//   return (
//     <div className={styles.userMenu}>
//       <ul>
//         <li>Увійти</li>
//         <li>Зареєструватись</li>
//       </ul>
//     </div>
//   );
// };

// UserMenu.propTypes = {
//   closeUserMenu: PropTypes.func.isRequired,
// };

// export default UserMenu;

//==================================цей працює===========================================//

// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import AuthForm from "./AuthForm";
// import styles from "../styles/UserMenu.module.css";

// const UserMenu = () => {
//   const [isAuthFormVisible, setAuthFormVisible] = useState(false);
//   const [authMode, setAuthMode] = useState("login");

//   const showAuthForm = (mode) => {
//     console.log("Setting mode:", mode);
//     setAuthMode(mode);
//     setAuthFormVisible(true);
//   };

//   const closeAuthForm = () => {
//     setAuthFormVisible(false);
//   };

//   useEffect(() => {
//     console.log("AuthForm visibility (useEffect):", isAuthFormVisible);
//   }, [isAuthFormVisible]);

//   return (
//     <div className={styles.userMenu}>
//       <ul>
//         <li onClick={() => showAuthForm("login")}>Увійти</li>
//         <li onClick={() => showAuthForm("register")}>Зареєструватись</li>
//       </ul>
//       {console.log("Rendering AuthForm (return):", isAuthFormVisible)}
//       {isAuthFormVisible && (
//         <AuthForm mode={authMode} onClose={closeAuthForm} />
//       )}
//     </div>
//   );
// };

// UserMenu.propTypes = {
//   closeUserMenu: PropTypes.func,
// };

// export default UserMenu;

//===================================оновлений============================================//

// import PropTypes from "prop-types";
// import styles from "../styles/UserMenu.module.css";

// const UserMenu = ({ toggleAuthForm }) => {
//   return (
//     <div className={styles.userMenu}>
//       <ul>
//         <li onClick={() => toggleAuthForm("login")}>Увійти</li>
//         <li onClick={() => toggleAuthForm("register")}>Зареєструватись</li>
//       </ul>
//     </div>
//   );
// };

// UserMenu.propTypes = {
//   toggleAuthForm: PropTypes.func.isRequired,
// };

// export default UserMenu;

//=====================================================================================================//

import PropTypes from "prop-types";
import styles from "../styles/UserMenu.module.css";
import { logout } from "../services/authService";

const UserMenu = ({ onLogout }) => {
  const handleLogout = () => {
    logout(); // Видаляє токен
    onLogout(); // Оновлює стан
  };

  return (
    <div className={styles.userMenu}>
      <ul>
        <li>
          <a href="/orders">Мої замовлення</a>
        </li>
        <li>
          <a href="/addresses">Мої адреси</a>
        </li>
        <li>
          <a href="/favorites">Обране</a>
        </li>
        <li>
          <a href="/account">Обліковий запис</a>
        </li>
        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          Вийти
        </li>
      </ul>
    </div>
  );
};

UserMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default UserMenu;
