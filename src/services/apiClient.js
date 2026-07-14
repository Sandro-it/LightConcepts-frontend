import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

apiClient.interceptors.request.use(
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

export default apiClient;
