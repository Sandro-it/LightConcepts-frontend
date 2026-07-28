import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "../styles/AccountLayout.module.css";

const ACCOUNT_LINKS = [
  { to: "/account", label: "Обліковий запис" },
  { to: "/orders", label: "Мої замовлення" },
  { to: "/addresses", label: "Мої адреси" },
  { to: "/favorites", label: "Обране" },
];

const AccountLayout = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.accountPage}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <nav className={styles.subMenu}>
        {ACCOUNT_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? `${styles.subMenuLink} ${styles.subMenuLinkActive}`
                : styles.subMenuLink
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  );
};

export default AccountLayout;
