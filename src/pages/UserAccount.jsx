import { useState, useEffect, useRef } from "react";
import styles from "../styles/UserAccount.module.css";
import {
  changePassword,
  getCurrentUser,
  updateUser,
  uploadAvatar,
} from "../services/authService";

const UserAccount = () => {
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
  const passwordSectionRef = useRef(null);

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

  useEffect(() => {
    if (!passwordFormOpen) return;

    const handleClickOutside = (e) => {
      if (
        passwordSectionRef.current &&
        !passwordSectionRef.current.contains(e.target)
      ) {
        setPasswordFormOpen(false);
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [passwordFormOpen]);

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
        setMessage("Пароль успішно змінено!");
      } catch (error) {
        setErrors({ submit: "Помилка зміни пароля. Перевірте поточний пароль." });
      }
    }
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

  return (
    <div className={styles.container}>
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

      <div className={styles.formGroup} ref={passwordSectionRef}>
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
            <button
              type="button"
              onClick={() => {
                setPasswordFormOpen(false);
                setPasswords({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
                setErrors({});
              }}
            >
              Скасувати
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
