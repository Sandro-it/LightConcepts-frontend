import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { getImageUrl } from "../utils/getImageUrl";
import styles from "../styles/HomePage.module.css";

const CATEGORY_TILES = [
  { label: "Світильники", to: "/lights-category" },
  { label: "Свічки", to: "/candles-category" },
  { label: "Меблі", to: "/furniture-category" },
  { label: "Незламність", to: "/resilience" },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/products?populate=*");
        setProducts(response.data.data || []);
      } catch (error) {
        console.error("Помилка завантаження товарів для головної:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sliderProducts = products.slice(0, 6);

  useEffect(() => {
    if (sliderProducts.length < 2) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % sliderProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderProducts.length]);

  const currentSlide = sliderProducts[slideIndex];

  const handleSlideClick = () => {
    if (currentSlide) navigate(`/products/${currentSlide.id}`);
  };

  const buildTiles = () => {
    const tiles = [];
    const productPool = products.slice(0, 9);
    let productIndex = 0;
    let categoryIndex = 0;

    for (let i = 0; i < 9; i++) {
      if (i % 3 === 2) {
        tiles.push({
          type: "category",
          ...CATEGORY_TILES[categoryIndex % CATEGORY_TILES.length],
        });
        categoryIndex++;
      } else if (productPool[productIndex]) {
        tiles.push({ type: "product", product: productPool[productIndex] });
        productIndex++;
      }
    }

    return tiles;
  };

  const tiles = buildTiles();

  if (loading) return <p style={{ padding: "20px" }}>Завантаження...</p>;

  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>В темні часи добре видно світлих людей</h1>
          <p className={styles.heroQuote}>©Еріх Марія Ремарк</p>
        </div>
        <div className={styles.heroSlider} onClick={handleSlideClick}>
          {currentSlide ? (
            <img
              src={getImageUrl(currentSlide.mainImage?.url)}
              alt={currentSlide.name || "Товар"}
              className={styles.heroImage}
            />
          ) : (
            <div className={styles.heroImagePlaceholder} />
          )}
        </div>
      </div>

      <div className={styles.tileGrid}>
        {tiles.map((tile, index) =>
          tile.type === "category" ? (
            <Link key={index} to={tile.to} className={styles.categoryTile}>
              <span>{tile.label}</span>
            </Link>
          ) : (
            <Link
              key={index}
              to={`/products/${tile.product.id}`}
              className={styles.productTile}
            >
              <img
                src={getImageUrl(tile.product.mainImage?.url)}
                alt={tile.product.name || "Товар"}
                className={styles.productTileImage}
              />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
