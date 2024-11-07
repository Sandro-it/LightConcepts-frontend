import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import styles from "../styles/FurnitureCategoryPage.module.css";

const FurnitureCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/api/products?filters[category][name][$eq]=Меблі&populate=*`
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
    <div className={styles.furnitureCategoryPage}>
      <Link to="/products" className={styles.backButton}>
        Назад до товарів
      </Link>
      <h2>Меблі</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FurnitureCategoryPage;
