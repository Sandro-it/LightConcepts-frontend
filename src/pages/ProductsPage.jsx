// import { Link } from "react-router-dom";
// import ProductList from "../components/ProductList";
// import styles from "../styles/ProductsPage.module.css";

// const ProductsPage = () => {
//   return (
//     <div className={styles.productsPage}>
//       <h2>Всі товари</h2>
//       <div className={styles.categoryLinks}>
//         <Link to="/lights-category" className={styles.categoryLink}>
//           Світильники
//         </Link>
//         <Link to="/candles-category" className={styles.categoryLink}>
//           Свічки
//         </Link>
//         <Link to="/furniture-category" className={styles.categoryLink}>
//           Меблі
//         </Link>
//       </div>
//       <ProductList />
//     </div>
//   );
// };

// export default ProductsPage;

//=================================================================================//

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import styles from "../styles/ProductsPage.module.css";

const ProductsPage = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.productsPage}>
      <h2>Всі товари</h2>
      <div className={styles.categoryLinks}>
        <Link to="/lights-category" className={styles.categoryLink}>
          Світильники
        </Link>
        <Link to="/candles-category" className={styles.categoryLink}>
          Свічки
        </Link>
        <Link to="/furniture-category" className={styles.categoryLink}>
          Меблі
        </Link>
      </div>
      <ProductList />
      {/* Кнопка "Повернутися на початок" */}
      {showScrollToTop && (
        <button className={styles.scrollToTop} onClick={scrollToTop}></button>
      )}
    </div>
  );
};

export default ProductsPage;
