import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = "https://116.203.106.75:1337"; // Змінюємо відповідно до адреси сервера
        const response = await axios.get(
          `${backendUrl}/api/products?populate=*`
        );
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження продуктів:", error);
        setError("Не вдалося завантажити товари");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
