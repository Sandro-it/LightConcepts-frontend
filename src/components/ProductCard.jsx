import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getImageUrl } from "../utils/getImageUrl";
import { useFavorites } from "../context/FavoritesContext";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  const imageUrl = getImageUrl(product?.mainImage?.url);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.productLink}>
      <div className={styles.productCard}>
        <button
          type="button"
          className={styles.favoriteButton}
          onClick={handleFavoriteClick}
          aria-label={favorite ? "Прибрати з обраного" : "Додати в обране"}
        >
          {favorite ? <FaHeart /> : <FaRegHeart />}
        </button>
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
