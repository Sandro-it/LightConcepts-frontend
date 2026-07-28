import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { getImageUrl } from "../utils/getImageUrl";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import styles from "../styles/ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [specsOpen, setSpecsOpen] = useState(false);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(
          `/products?filters[id][$eq]=${id}&populate=*`
        );
        const productData = response.data.data[0];
        if (productData) {
          setProduct(productData);

          const mainImageUrl = getImageUrl(
            productData.mainImage?.formats?.large?.url ||
              productData.mainImage?.url
          );
          setSelectedImage(mainImageUrl);
        } else {
          setError("Продукт не знайдено");
        }
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження деталей товару:", error);
        setError("Помилка завантаження деталей товару");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Продукт не знайдено</p>;

  const {
    name = "Назва відсутня",
    description = "Опис відсутній",
    price,
    available,
    article = "Не вказано",
    category,
    sub_category,
    specifications,
    additionalImages = [],
  } = product;

  const categoryName = category?.name || "Категорія не вказана";
  const subCategoryName = sub_category?.name || "Підкатегорія не вказана";
  const favorite = isFavorite(product.id);

  const generateCategoryPath = (category) => {
    if (!category) return "#";
    switch (category.toLowerCase()) {
      case "світильники":
        return "/lights-category";
      case "бра":
        return "/bra";
      case "настінні світильники":
        return "/wall-lights";
      case "підвісні світильники":
        return "/pendant-lights";
      case 'світильники "стімпанк"':
        return "/steampunk-lights";
      case "свічки":
        return "/candles-category";
      case "меблі":
        return "/furniture-category";
      case '"незламність"':
        return "/resilience";
      default:
        return "#";
    }
  };

  const handleThumbnailClick = (url) => {
    setSelectedImage(url);
  };

  const toggleSpecifications = () => {
    setSpecsOpen(!specsOpen);
  };

  return (
    <div className={styles.productDetail}>
      <div className={styles.backButtonContainer}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Назад
        </button>
      </div>

      <div className={styles.leftColumn}>
        <h4>
          <Link to={generateCategoryPath(categoryName)} className={styles.link}>
            {categoryName}
          </Link>{" "}
          /{" "}
          <Link
            to={generateCategoryPath(subCategoryName)}
            className={styles.link}
          >
            {subCategoryName}
          </Link>
        </h4>
        <img
          src={selectedImage ? selectedImage : "/placeholder.jpg"}
          alt={name}
          className={styles.mainImage}
        />
        <div className={styles.thumbnailContainer}>
          {additionalImages.map((image, index) => {
            const imageUrl = getImageUrl(
              image.formats?.large?.url || image.url
            );
            return (
              <img
                key={index}
                src={imageUrl}
                alt={`Додаткове зображення ${index + 1}`}
                className={`${styles.thumbnail} ${
                  selectedImage === imageUrl ? styles.selectedThumbnail : ""
                }`}
                onClick={() => handleThumbnailClick(imageUrl)}
              />
            );
          })}
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.productInfo}>
          <h2>{name}</h2>
          <p>Артикул: {article}</p>
          <p className={styles.price}>
            {price ? `${price} грн` : "Ціна не вказана"}
          </p>
          <p className={styles.status}>
            {available ? "В наявності" : "Немає в наявності"}
          </p>
          <button
            type="button"
            className={styles.favoriteButton}
            onClick={() => toggleFavorite(product.id)}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
            {favorite ? "В обраному" : "Додати в обране"}
          </button>
        </div>

        <div className={styles.addToCartSection}>
          <input
            type="number"
            min="1"
            defaultValue="1"
            className={styles.quantitySelector}
          />
          <button className={styles.addToCartButton}>Додати до кошика</button>
        </div>

        <div
          className={`${styles.specifications} ${specsOpen ? styles.open : ""}`}
          onClick={toggleSpecifications}
        >
          <h3>Характеристики</h3>
          {specsOpen && (
            <div className={styles.specificationList}>
              {specifications &&
                Object.entries(specifications).map(([key, value], index) => (
                  <p key={index}>
                    <strong>{key}: </strong> {value}
                  </p>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
