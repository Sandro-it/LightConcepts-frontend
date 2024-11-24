import axios from "axios";

const AUTH_API_URL = "https://api.svitli.com.ua/api/auth"; // URL до вашого API авторизації

// 1. Налаштування базового інстансу axios
const axiosInstance = axios.create({
  baseURL: AUTH_API_URL,
});

// 2. Додавання токена до заголовків запитів
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Отримуємо токен із localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Додаємо токен до заголовків:", config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    console.error("Помилка в запиті Axios:", error);
    return Promise.reject(error);
  }
);

// 3. Запити для авторизації
export const login = async (email, password) => {
  try {
    console.log("Відправляємо запит на авторизацію:", {
      identifier: email,
      password: password,
    });
    const response = await axiosInstance.post("/local", {
      identifier: email,
      password: password,
    });
    console.log("Успішний логін, відповідь сервера:", response.data);

    // Зберігаємо токен після успішного входу
    localStorage.setItem("token", response.data.jwt);
    console.log("Токен збережено в localStorage:", response.data.jwt);

    return response.data;
  } catch (error) {
    console.error(
      "Помилка авторизації:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    console.log("Відправляємо запит на реєстрацію:", {
      username: username,
      email: email,
      password: password,
    });
    const response = await axiosInstance.post("/local/register", {
      username: username,
      email: email,
      password: password,
    });
    console.log("Успішна реєстрація, відповідь сервера:", response.data);

    // Зберігаємо токен після успішної реєстрації
    localStorage.setItem("token", response.data.jwt);
    console.log("Токен збережено в localStorage:", response.data.jwt);

    return response.data;
  } catch (error) {
    console.error(
      "Помилка реєстрації:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    console.log("Перевіряємо статус авторизації...");
    const response = await axiosInstance.get("/status");
    console.log("Статус авторизації отримано:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Помилка перевірки статусу авторизації:",
      error.response ? error.response.data : error
    );
    return null;
  }
};

// 4. Логаут
export const logout = () => {
  console.log("Вихід із системи, видалення токена...");
  localStorage.removeItem("token"); // Видаляємо токен
};
