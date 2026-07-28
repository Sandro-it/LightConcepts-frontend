import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getFavoriteProducts } from "../services/favoritesService";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favoriteIds } = useFavorites();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFavoriteProducts();
        setProducts(data);
      } catch (err) {
        console.error("Помилка завантаження обраного:", err);
        setError("Не вдалося завантажити обране");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [favoriteIds]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Обране</h2>
      {products.length === 0 ? (
        <p>Ви ще не додали жодного товару в обране.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
