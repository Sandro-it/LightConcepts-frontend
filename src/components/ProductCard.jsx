import { Link } from "react-router-dom";
import { BACKEND_URL } from "../services/apiClient";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  const imageUrl = product?.mainImage?.url
    ? `${BACKEND_URL}${product.mainImage.url}`
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
