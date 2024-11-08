// import { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "../styles/ProductList.module.css";
// import ProductCard from "./ProductCard";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const backendUrl = "https://api.svitli.com.ua"; // Виправлено на HTTPS

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           '${backendUrl}/api/products?populate=*'
//         );
//         setProducts(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Помилка завантаження продуктів:", error);
//         setError("Не вдалося завантажити товари");
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p>Завантаження...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.productList}>
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;

//==============================================================================================//

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
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/api/products?populate=*`
        );

        // Перевірка структури відповіді
        if (response.data && response.data.data) {
          console.log("Отримані продукти зі Strapi:", response.data.data);
          setProducts(response.data.data);
        } else {
          console.error(
            "Некоректна структура відповіді від API:",
            response.data
          );
          setError("Некоректна відповідь від сервера");
        }
      } catch (error) {
        console.error("Помилка завантаження продуктів:", error);
        setError("Не вдалося завантажити товари");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  // Перевірка наявності продуктів перед рендерингом
  if (!products || products.length === 0) {
    return <p>Товари не знайдені або їх немає в наявності.</p>;
  }

  console.log("Products list для відображення:", products);

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
