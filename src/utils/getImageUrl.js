import { BACKEND_URL } from "../services/apiClient";

export const getImageUrl = (url) => {
  if (!url) return "/placeholder.jpg";
  return url.startsWith("http") ? url : `${BACKEND_URL}${url}`;
};
