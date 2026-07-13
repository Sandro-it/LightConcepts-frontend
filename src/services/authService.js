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
