import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../styles/UserMenu.module.css";
import { logout } from "../services/authService";

const UserMenu = ({ onLogout, onClose }) => {
  const handleLogout = () => {
    logout(); // Видаляє токен
    onLogout(); // Оновлює стан
    if (onClose) onClose(); // Закриває меню
  };

  const handleMenuItemClick = () => {
    if (onClose) onClose(); // Закриває меню
  };

  return (
    <div className={styles.userMenu}>
      <ul>
        <li>
          <Link to="/orders" onClick={handleMenuItemClick}>
            Мої замовлення
          </Link>
        </li>
        <li>
          <Link to="/addresses" onClick={handleMenuItemClick}>
            Мої адреси
          </Link>
        </li>
        <li>
          <Link to="/favorites" onClick={handleMenuItemClick}>
            Обране
          </Link>
        </li>
        <li>
          <Link to="/account" onClick={handleMenuItemClick}>
            Обліковий запис
          </Link>
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
  onClose: PropTypes.func.isRequired, // Додаємо проп для закриття меню
};

export default UserMenu;
