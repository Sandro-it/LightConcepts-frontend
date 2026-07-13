import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import apiClient from "../services/apiClient";
import ProductCard from "../components/ProductCard";
import styles from "../styles/CategoryPage.module.css";

const CategoryPage = ({ config }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          `/products?filters[${config.filterField}][name][$eq]=${config.filterValue}&populate=*`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Помилка завантаження товарів:", error);
        setError("Не вдалося завантажити товари");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [config.filterField, config.filterValue]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  const backButtonClassName = `${styles.backButton} ${
    config.backButtonVariant === "sub"
      ? styles.backButtonSub
      : styles.backButtonTop
  }`;

  return (
    <div className={styles.categoryPage}>
      <Link to={config.backTo} className={backButtonClassName}>
        {config.backLabel}
      </Link>
      <h2>{config.title}</h2>
      {config.subCategoryLinks && (
        <div className={styles.subCategoryLinks}>
          {config.subCategoryLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.subCategoryLink}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

CategoryPage.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    filterField: PropTypes.oneOf(["category", "sub_category"]).isRequired,
    filterValue: PropTypes.string.isRequired,
    backTo: PropTypes.string.isRequired,
    backLabel: PropTypes.string.isRequired,
    backButtonVariant: PropTypes.oneOf(["top", "sub"]).isRequired,
    subCategoryLinks: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default CategoryPage;
