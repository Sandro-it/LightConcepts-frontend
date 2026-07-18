import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  const imageUrl = getImageUrl(product?.mainImage?.url);

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
