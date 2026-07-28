import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getFavoriteIds, setFavoriteIds } from "../services/favoritesService";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIdsState] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFavoriteIdsState([]);
      return;
    }
    setLoading(true);
    try {
      const ids = await getFavoriteIds();
      setFavoriteIdsState(ids);
    } catch (error) {
      console.error("Помилка завантаження обраного:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const isFavorite = (productId) => favoriteIds.includes(productId);

  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Увійдіть в акаунт, щоб додавати товари в обране.");
      return;
    }

    const alreadyFavorite = favoriteIds.includes(productId);
    const newIds = alreadyFavorite
      ? favoriteIds.filter((id) => id !== productId)
      : [...favoriteIds, productId];

    setFavoriteIdsState(newIds);

    try {
      await setFavoriteIds(newIds);
    } catch (error) {
      console.error("Помилка оновлення обраного:", error);
      setFavoriteIdsState(favoriteIds);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        toggleFavorite,
        loading,
        reloadFavorites: loadFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites має використовуватись всередині FavoritesProvider"
    );
  }
  return context;
};
