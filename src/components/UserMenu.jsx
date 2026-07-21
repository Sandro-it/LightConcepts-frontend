import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../styles/UserMenu.module.css";
import { logout } from "../services/authService";

const UserMenu = ({ username, onLogout, onClose, onOpenAccount }) => {
  const handleLogout = () => {
    logout();
    onLogout();
    if (onClose) onClose();
  };

  const handleMenuItemClick = () => {
    if (onClose) onClose();
  };

  const handleAccountClick = () => {
    if (onOpenAccount) onOpenAccount();
    if (onClose) onClose();
  };

  return (
    <div className={styles.userMenu}>
      {username && (
        <div className={styles.userMenuGreeting}>Вітаємо, {username}!</div>
      )}
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
        <li onClick={handleAccountClick} style={{ cursor: "pointer" }}>
          Обліковий запис
        </li>
        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          Вийти
        </li>
      </ul>
    </div>
  );
};

UserMenu.propTypes = {
  username: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenAccount: PropTypes.func.isRequired,
};

export default UserMenu;
