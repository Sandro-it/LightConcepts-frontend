import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import styles from "../styles/SteampunkLightsCategoryPage.module.css";

const SteampunkLightsCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/api/products?filters[sub_category][name][$eq]=Світильники "Стімпанк"&populate=*`
        );
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження товарів:", error);
        setError("Не вдалося завантажити товари");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.steampunkLightsCategoryPage}>
      <Link to="/lights-category" className={styles.backButton}>
        Назад до Світильників
      </Link>
      <h2>Світильники Стімпанк</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SteampunkLightsCategoryPage;
