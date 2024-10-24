import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import styles from "../styles/ProductsPage.module.css";

const ProductsPage = () => {
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
    </div>
  );
};

export default ProductsPage;
