import apiClient from "./apiClient";

// Авторизація
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/local", {
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
    const response = await apiClient.post("/auth/local/register", {
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

// Поточний користувач
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get("/users/me");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Зміна пароля
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await apiClient.post("/auth/change-password", {
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
    const response = await apiClient.put("/users/me", {
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
    const response = await apiClient.post("/upload", formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Вихід із системи
export const logout = () => {
  localStorage.removeItem("token");
};
