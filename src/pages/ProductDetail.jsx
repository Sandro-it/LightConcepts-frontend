import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "../styles/ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [specsOpen, setSpecsOpen] = useState(false);
  const navigate = useNavigate();

  const backendUrl = "https://116.203.106.75:1337"; // Визначаємо тут

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/products?filters[id][$eq]=${id}&populate=*`
        );
        const productData = response.data.data[0];
        if (productData) {
          setProduct(productData);
          const mainImageUrl = productData?.mainImage?.url
            ? `${backendUrl}${productData.mainImage.url}`
            : "/placeholder.jpg";
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

  const {
    name = "Назва відсутня",
    description = "Опис відсутній",
    price = "Ціна не вказана",
    available = false,
    article = "Не вказано",
    category = { name: "Категорія не вказана" },
    sub_category = { name: "Підкатегорія не вказана" },
    specifications = {},
    mainImage = {},
    additionalImages = [],
  } = product || {};

  const categoryName = category?.name || "Категорія не вказана";
  const subCategoryName = sub_category?.name || "Підкатегорія не вказана";

  const generateCategoryPath = (categoryName) => {
    if (typeof categoryName !== "string") return "#";
    switch (categoryName.toLowerCase()) {
      case "світильники":
        return "/lights-category";
      case "бра":
        return "/bra";
      case "настінні світильники":
        return "/wall-lights";
      case "світильник підвісний":
        return "/pendant-lights";
      case 'світильники "стімпанк"':
        return "/steampunk-lights";
      case "свічки":
        return "/candles-category";
      case "меблі":
        return "/furniture-category";
      default:
        return "#";
    }
  };

  const handleThumbnailClick = (url) => {
    setSelectedImage(`${backendUrl}${url}`);
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
          alt={name || "Назва відсутня"}
          className={styles.mainImage}
        />
        <div className={styles.thumbnailContainer}>
          {additionalImages?.map((image, index) => {
            const imageUrl = image?.url ? `${backendUrl}${image.url}` : null;
            return imageUrl ? (
              <img
                key={index}
                src={imageUrl}
                alt={`Зображення ${index + 1}`}
                className={`${styles.thumbnail} ${
                  selectedImage === imageUrl ? styles.selectedThumbnail : ""
                }`}
                onClick={() => handleThumbnailClick(image.url)}
              />
            ) : null;
          })}
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.productInfo}>
          <h2>{name}</h2>
          <p>Артикул: {article}</p>
          <p className={styles.price}>
            {price !== "Ціна не вказана" ? `${price} грн` : price}
          </p>
          <p className={styles.status}>
            {available ? "В наявності" : "Немає в наявності"}
          </p>
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
              {Object.entries(specifications).map(([key, value], index) => (
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
