import { Link } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  console.log("Product data received in ProductCard:", product);

  // Оновлений шлях до зображення з використанням VITE_BACKEND_URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const imageUrl = product?.mainImage?.url
    ? `${backendUrl}${product.mainImage.url}`
    : "/placeholder.jpg";

  return (
    <Link to={`/products/${product.id}`} className={styles.productLink}>
      <div className={styles.productCard}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name || "Невідомий продукт"}
            className={styles.productImage}
          />
        ) : (
          <div className={styles.productImagePlaceholder}>
            Зображення відсутнє
          </div>
        )}
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name || "Без назви"}</h3>
          <p className={styles.productPrice}>
            {product.price ? `${product.price} грн` : "Ціна не вказана"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
