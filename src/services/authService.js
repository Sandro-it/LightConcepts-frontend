// import axios from "axios";

// const AUTH_API_URL = "https://api.svitli.com.ua/api/auth"; // URL до вашого API авторизації

// // 1. Налаштування базового інстансу axios
// const axiosInstance = axios.create({
//   baseURL: AUTH_API_URL,
// });

// // 2. Додавання токена до заголовків запитів
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Отримуємо токен із localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log("Додаємо токен до заголовків:", config.headers.Authorization);
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Помилка в запиті Axios:", error);
//     return Promise.reject(error);
//   }
// );

// // 3. Запити для авторизації
// export const login = async (email, password) => {
//   try {
//     console.log("Відправляємо запит на авторизацію:", {
//       identifier: email,
//       password: password,
//     });
//     const response = await axiosInstance.post("/local", {
//       identifier: email,
//       password: password,
//     });
//     console.log("Успішний логін, відповідь сервера:", response.data);

//     // Зберігаємо токен після успішного входу
//     localStorage.setItem("token", response.data.jwt);
//     console.log("Токен збережено в localStorage:", response.data.jwt);

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Помилка авторизації:",
//       error.response ? error.response.data : error
//     );
//     throw error;
//   }
// };

// export const register = async (username, email, password) => {
//   try {
//     console.log("Відправляємо запит на реєстрацію:", {
//       username: username,
//       email: email,
//       password: password,
//     });
//     const response = await axiosInstance.post("/local/register", {
//       username: username,
//       email: email,
//       password: password,
//     });
//     console.log("Успішна реєстрація, відповідь сервера:", response.data);

//     // Зберігаємо токен після успішної реєстрації
//     localStorage.setItem("token", response.data.jwt);
//     console.log("Токен збережено в localStorage:", response.data.jwt);

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Помилка реєстрації:",
//       error.response ? error.response.data : error
//     );
//     throw error;
//   }
// };

// export const checkAuthStatus = async () => {
//   try {
//     console.log("Перевіряємо статус авторизації...");
//     const response = await axiosInstance.get("/status");
//     console.log("Статус авторизації отримано:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Помилка перевірки статусу авторизації:",
//       error.response ? error.response.data : error
//     );
//     return null;
//   }
// };

// // 4. Логаут
// export const logout = () => {
//   console.log("Вихід із системи, видалення токена...");
//   localStorage.removeItem("token"); // Видаляємо токен
// };

// // 5. Зміна пароля
// export const changePassword = async (currentPassword, newPassword) => {
//   try {
//     const token = localStorage.getItem("token");
//     console.log("Запит на зміну пароля:", {
//       currentPassword,
//       newPassword,
//     });

//     const response = await axiosInstance.post(
//       "/change-password",
//       {
//         currentPassword,
//         newPassword,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("Пароль змінено успішно:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Помилка зміни пароля:",
//       error.response ? error.response.data : error
//     );
//     throw error.response ? error.response.data : error;
//   }
// };

// // 6. Оновлення даних користувача
// export const updateUser = async (userData) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axiosInstance.put(
//       "/users/me", // Використання ендпоінта для оновлення поточного користувача
//       userData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log("Дані користувача оновлено успішно:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Помилка оновлення даних користувача:",
//       error.response ? error.response.data : error
//     );
//     throw error.response ? error.response.data : error;
//   }
// };

//=============================================================================//

import axios from "axios";

// Базові URL
const AUTH_API_URL = "https://api.svitli.com.ua/api/auth";
const API_BASE_URL = "https://api.svitli.com.ua/api"; // Загальний базовий URL

// Інстанси Axios
const axiosInstance = axios.create({
  baseURL: AUTH_API_URL,
});

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Інтерцептор для додавання токена
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json"; // Заголовок для CORS
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

// Авторизація
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/local", {
      identifier: email,
      password,
    });
    localStorage.setItem("token", response.data.jwt);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Реєстрація
export const register = async (username, email, password) => {
  try {
    const response = await axiosInstance.post("/local/register", {
      username,
      email,
      password,
    });
    localStorage.setItem("token", response.data.jwt);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Зміна пароля
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await apiInstance.post("/auth/change-password", {
      currentPassword,
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Оновлення користувача
export const updateUser = async (userData) => {
  try {
    const response = await apiInstance.put("/users/me", {
      data: userData, // Додаємо дані у форматі "data"
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Завантаження аватара
export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("files", file);
    const response = await apiInstance.post("/upload", formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Вихід із системи
export const logout = () => {
  localStorage.removeItem("token");
};
