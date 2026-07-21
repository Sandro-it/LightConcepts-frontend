import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../styles/UserAccount.module.css";
import {
  changePassword,
  getCurrentUser,
  updateUser,
  uploadAvatar,
} from "../services/authService";

const AccountModal = ({ onClose }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
  const [mouseDownOnBackdrop, setMouseDownOnBackdrop] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser()
        .then((data) => {
          setUserData({
            username: data.username || "",
            email: data.email || "",
            avatar: data.avatar?.url || "",
          });
        })
        .catch((err) => {
          console.error("Помилка завантаження даних:", err);
        });
    }
  }, []);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevData) => ({ ...prevData, [name]: value }));
  };

  const validatePasswords = () => {
    const newErrors = {};
    if (!passwords.currentPassword) {
      newErrors.currentPassword = "Введіть поточний пароль.";
    }
    if (!passwords.newPassword || passwords.newPassword.length < 8) {
      newErrors.newPassword = "Новий пароль має бути не менше 8 символів.";
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await updateUser(userData);
      setMessage("Дані користувача успішно оновлено!");
    } catch (error) {
      setMessage("Помилка оновлення даних.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      try {
        await changePassword(passwords.currentPassword, passwords.newPassword);
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
        setPasswordFormOpen(false);
        // Успішна зміна пароля закриває все вікно облікового запису
        onClose();
      } catch (error) {
        setErrors({ submit: "Помилка зміни пароля. Перевірте поточний пароль." });
      }
    }
  };

  const handleCancelPassword = () => {
    setPasswordFormOpen(false);
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const handleUploadAvatar = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        const uploadResponse = await uploadAvatar(file);
        const avatarId = uploadResponse[0].id;

        await updateUser({ avatar: avatarId });
        alert("Аватар успішно оновлено!");
        window.location.reload();
      };
      fileInput.click();
    } catch (error) {
      alert("Помилка завантаження аватара.");
    }
  };

  // Клік по підкладці (поза панеллю) закриває все вікно
  const handleBackdropMouseDown = (e) => {
    setMouseDownOnBackdrop(e.target === e.currentTarget);
  };

  const handleBackdropMouseUp = (e) => {
    if (mouseDownOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onMouseDown={handleBackdropMouseDown}
      onMouseUp={handleBackdropMouseUp}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        zIndex: 1000,
        padding: "40px 16px",
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "480px",
          width: "100%",
        }}
        className={styles.container}
      >
        <button
          onClick={onClose}
          aria-label="Закрити"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h1>Обліковий запис</h1>
        <div className={styles.avatarContainer}>
          <img
            src={userData.avatar || "https://via.placeholder.com/120"}
            alt="Аватар користувача"
            className={styles.avatarImage}
          />
          <button className={styles.avatarButton} onClick={handleUploadAvatar}>
            Завантажити новий аватар
          </button>
        </div>
        <form onSubmit={handleUpdateUser}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Ім'я</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleUserDataChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Електронна пошта</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleUserDataChange}
            />
          </div>
          <button type="submit">Оновити дані</button>
          {message && <p className={styles.message}>{message}</p>}
        </form>

        <div className={styles.formGroup}>
          {!passwordFormOpen ? (
            <button type="button" onClick={() => setPasswordFormOpen(true)}>
              Змінити пароль
            </button>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="currentPassword">Поточний пароль</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  autoFocus
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                />
                {errors.currentPassword && (
                  <span className={styles.error}>{errors.currentPassword}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">Новий пароль</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
                {errors.newPassword && (
                  <span className={styles.error}>{errors.newPassword}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Підтвердьте новий пароль</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {errors.confirmPassword && (
                  <span className={styles.error}>{errors.confirmPassword}</span>
                )}
              </div>
              {errors.submit && (
                <span className={styles.error}>{errors.submit}</span>
              )}
              <button type="submit">Змінити пароль</button>
              <button type="button" onClick={handleCancelPassword}>
                Скасувати
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

AccountModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AccountModal;
