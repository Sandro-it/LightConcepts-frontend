// import PropTypes from "prop-types";
// import { useState } from "react";
// import styles from "../styles/AuthForm.module.css";

// const AuthForm = ({ onClose, mode = "login" }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [currentMode, setCurrentMode] = useState(mode);
//   const [mouseDownInsideForm, setMouseDownInsideForm] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (formData.name.trim().length < 3 || formData.name.trim().length > 25) {
//       newErrors.name = "Ім'я повинно бути від 3 до 25 символів";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Невірний формат електронної адреси";
//     }

//     // Видалення пробілів перед перевіркою номера телефону
//     const normalizedPhone = formData.phone.replace(/\s+/g, "");
//     if (formData.phone && !/^\+\d{1,3}\d{9,12}$/.test(normalizedPhone)) {
//       newErrors.phone =
//         "Невірний формат телефону (введіть +код країни і номер)";
//     }

//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//     if (!passwordRegex.test(formData.password)) {
//       newErrors.password =
//         "Пароль має містити велику, малу літери та цифру і бути не менше 8 символів";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       if (currentMode === "login") {
//         alert("Вхід успішний!");
//       } else {
//         alert("Реєстрація успішна!");
//       }
//       onClose();
//     }
//   };

//   const handleBackdropMouseDown = (e) => {
//     if (e.target.classList.contains(styles.authFormContainer)) {
//       setMouseDownInsideForm(false);
//     } else {
//       setMouseDownInsideForm(true);
//     }
//   };

//   const handleBackdropMouseUp = (e) => {
//     if (
//       !mouseDownInsideForm &&
//       e.target.classList.contains(styles.authFormContainer)
//     ) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className={styles.authFormContainer}
//       onMouseDown={handleBackdropMouseDown}
//       onMouseUp={handleBackdropMouseUp}
//     >
//       <div
//         className={styles.authForm}
//         onMouseDown={() => setMouseDownInsideForm(true)}
//       >
//         <button onClick={onClose} className={styles.closeButton}>
//           ✕ Закрити
//         </button>
//         <h2>{currentMode === "login" ? "Увійти" : "Зареєструватись"}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <label htmlFor="name">Ваше ім'я</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             {errors.name && <span className={styles.error}>{errors.name}</span>}
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="email">Електронна адреса</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {errors.email && (
//               <span className={styles.error}>{errors.email}</span>
//             )}
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="phone">Номер телефону (необов'язкове)</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//             {errors.phone && (
//               <span className={styles.error}>{errors.phone}</span>
//             )}
//           </div>
//           <div className={styles.formGroup}>
//             <label htmlFor="password">Пароль</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             {errors.password && (
//               <span className={styles.error}>{errors.password}</span>
//             )}
//           </div>
//           <button type="submit" className={styles.submitButton}>
//             {currentMode === "login" ? "Увійти" : "Зареєструватись"}
//           </button>
//         </form>
//         <p
//           className={styles.toggleMode}
//           onClick={() =>
//             setCurrentMode(currentMode === "login" ? "register" : "login")
//           }
//         >
//           {currentMode === "login"
//             ? "Ще не маєте облікового запису? Зареєструватись"
//             : "Вже маєте обліковий запис? Увійти"}
//         </p>
//       </div>
//     </div>
//   );
// };

// AuthForm.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   mode: PropTypes.oneOf(["login", "register"]),
// };

// export default AuthForm;

//==========================================================================================//

import PropTypes from "prop-types";
import { useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { login, register } from "../services/authService";

const AuthForm = ({ onClose, mode = "login", onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [currentMode, setCurrentMode] = useState(mode);
  const [mouseDownInsideForm, setMouseDownInsideForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("Оновлення даних форми:", { ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 3 || formData.name.trim().length > 25) {
      newErrors.name = "Ім'я повинно бути від 3 до 25 символів";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Невірний формат електронної адреси";
    }

    const normalizedPhone = formData.phone.replace(/\s+/g, "");
    if (formData.phone && !/^\+\d{1,3}\d{9,12}$/.test(normalizedPhone)) {
      newErrors.phone =
        "Невірний формат телефону (введіть +код країни і номер)";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Пароль має містити велику, малу літери та цифру і бути не менше 8 символів";
    }

    setErrors(newErrors);
    console.log("Результат валідації форми:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Форма даних перед валідацією:", formData);
    if (validateForm()) {
      try {
        if (currentMode === "login") {
          console.log("Починаємо логін...");
          await login(formData.email, formData.password);
          alert("Вхід успішний!");
        } else {
          console.log("Починаємо реєстрацію...");
          await register(formData.name, formData.email, formData.password);
          alert("Реєстрація успішна!");
        }

        if (onLoginSuccess) {
          onLoginSuccess();
        }
        onClose();
      } catch (error) {
        console.error("Помилка авторизації або реєстрації:", error);
        alert("Помилка авторизації або реєстрації");
      }
    }
  };

  const handleBackdropMouseDown = (e) => {
    if (e.target.classList.contains(styles.authFormContainer)) {
      setMouseDownInsideForm(false);
    } else {
      setMouseDownInsideForm(true);
    }
  };

  const handleBackdropMouseUp = (e) => {
    if (
      !mouseDownInsideForm &&
      e.target.classList.contains(styles.authFormContainer)
    ) {
      onClose();
    }
  };

  return (
    <div
      className={styles.authFormContainer}
      onMouseDown={handleBackdropMouseDown}
      onMouseUp={handleBackdropMouseUp}
    >
      <div
        className={styles.authForm}
        onMouseDown={() => setMouseDownInsideForm(true)}
      >
        <button onClick={onClose} className={styles.closeButton}>
          ✕ Закрити
        </button>
        <h2>{currentMode === "login" ? "Увійти" : "Зареєструватись"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Ваше ім'я</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Електронна адреса</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Номер телефону (необов'язкове)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <button type="submit" className={styles.submitButton}>
            {currentMode === "login" ? "Увійти" : "Зареєструватись"}
          </button>
        </form>
        <p
          className={styles.toggleMode}
          onClick={() =>
            setCurrentMode(currentMode === "login" ? "register" : "login")
          }
        >
          {currentMode === "login"
            ? "Ще не маєте облікового запису? Зареєструватись"
            : "Вже маєте обліковий запис? Увійти"}
        </p>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["login", "register"]),
  onLoginSuccess: PropTypes.func.isRequired,
};

export default AuthForm;
