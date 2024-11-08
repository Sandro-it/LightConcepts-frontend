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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/api/products?filters[id][$eq]=${id}&populate=*`
        );
        console.log("Response data:", response.data);
        const productData = response.data.data[0];
        if (productData) {
          setProduct(productData);
          console.log("Product data set:", productData);

          const mainImageUrl = productData.mainImage?.formats?.large?.url
            ? `${backendUrl}${productData.mainImage.formats.large.url}`
            : productData.mainImage?.url
            ? `${backendUrl}${productData.mainImage.url}`
            : "/placeholder.jpg";
          setSelectedImage(mainImageUrl);
          console.log("Main image URL set:", mainImageUrl);
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
  if (error) {
    console.error("Detailed error:", error);
    return <p>{error}</p>;
  }

  if (!product) {
    console.warn("Продукт відсутній після завантаження.");
    return <p>Продукт не знайдено</p>;
  }

  const {
    name = "Назва відсутня",
    description = "Опис відсутній",
    price,
    available,
    article = "Не вказано",
    category,
    sub_category,
    specifications,
    mainImage,
    additionalImages = [],
  } = product;

  const categoryName = category?.name || "Категорія не вказана";
  const subCategoryName = sub_category?.name || "Підкатегорія не вказана";

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
        console.warn("Unknown category:", category);
        return "#";
    }
  };

  const handleThumbnailClick = (url) => {
    console.log("Thumbnail clicked, URL:", url);
    setSelectedImage(url);
  };

  const toggleSpecifications = () => {
    setSpecsOpen(!specsOpen);
    console.log("Specifications toggled:", specsOpen);
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
            const imageUrl = image.formats?.large?.url
              ? `${import.meta.env.VITE_BACKEND_URL}${image.formats.large.url}`
              : `${import.meta.env.VITE_BACKEND_URL}${image.url}`;
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
