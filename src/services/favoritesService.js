import apiClient from "./apiClient";

// Отримати id обраних товарів поточного користувача
export const getFavoriteIds = async () => {
  try {
    const response = await apiClient.get("/users/me?populate=favorites");
    const favorites = response.data.favorites || [];
    return favorites.map((product) => product.id);
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Отримати повні дані обраних товарів (для сторінки "Обране")
export const getFavoriteProducts = async () => {
  try {
    const response = await apiClient.get(
      "/users/me?populate[favorites][populate]=*"
    );
    return response.data.favorites || [];
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Замінити повний список обраних товарів (масив id)
export const setFavoriteIds = async (ids) => {
  try {
    const response = await apiClient.put("/users/me", { favorites: ids });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
