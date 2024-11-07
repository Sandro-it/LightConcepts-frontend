import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import styles from "../styles/LightsCategoryPage.module.css";

const LightsCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/api/products?filters[category][name][$eq]=Світильники&populate=*`
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
    <div className={styles.lightsCategoryPage}>
      <Link to="/products" className={styles.backButton}>
        Назад до товарів
      </Link>
      <h2>Світильники</h2>
      <div className={styles.subCategoryLinks}>
        <Link to="/bra" className={styles.subCategoryLink}>
          Бра
        </Link>
        <Link to="/wall-lights" className={styles.subCategoryLink}>
          Настінні світильники
        </Link>
        <Link to="/pendant-lights" className={styles.subCategoryLink}>
          Підвісні світильники
        </Link>
        <Link to="/steampunk-lights" className={styles.subCategoryLink}>
          Світильники Стімпанк
        </Link>
      </div>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LightsCategoryPage;
