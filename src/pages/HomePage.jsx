import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { getImageUrl } from "../utils/getImageUrl";
import styles from "../styles/HomePage.module.css";

const SLIDE_DURATION = 4000;
const TRANSITION_MS = 600;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
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
  const loopSlides =
    sliderProducts.length > 0 ? [...sliderProducts, sliderProducts[0]] : [];

  useEffect(() => {
    if (loopSlides.length < 2) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => prev + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [loopSlides.length]);

  useEffect(() => {
    if (loopSlides.length === 0) return;
    if (slideIndex === loopSlides.length - 1) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        setSlideIndex(0);
      }, TRANSITION_MS);
      return () => clearTimeout(timeout);
    }
  }, [slideIndex, loopSlides.length]);

  useEffect(() => {
    if (!transitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => setTransitioning(true));
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [transitioning]);

  const handleSlideClick = () => {
    if (sliderProducts.length === 0) return;
    const realIndex = slideIndex % sliderProducts.length;
    navigate(`/products/${sliderProducts[realIndex].id}`);
  };

  // Знаходимо товар за id серед завантажених (для фіксованих плиток)
  const byId = (id) => products.find((p) => p.id === id);

  const TileImage = ({ id, className }) => {
    const product = byId(id);
    if (!product) return null;
    return (
      <Link to={`/products/${id}`} className={className}>
        <img
          src={getImageUrl(product.mainImage?.url)}
          alt={product.name || "Товар"}
          className={styles.tileImage}
        />
      </Link>
    );
  };

  const LabelPhotoColumn = ({ label, to, photoId }) => (
    <div className={styles.labelPhotoTile}>
      <Link to={to} className={styles.labelPart}>
        <span>{label}</span>
      </Link>
      <TileImage id={photoId} className={styles.photoPart} />
    </div>
  );

  if (loading) return <p style={{ padding: "20px" }}>Завантаження...</p>;

  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>В темні часи добре видно світлих людей</h1>
          <p className={styles.heroQuote}>©Еріх Марія Ремарк</p>
        </div>
        <div className={styles.heroSlider} onClick={handleSlideClick}>
          <div
            className={styles.slideTrack}
            style={{
              transform: `translateX(-${slideIndex * 100}%)`,
              transition: transitioning ? undefined : "none",
            }}
          >
            {loopSlides.map((product, index) => (
              <div className={styles.slide} key={index}>
                <img
                  src={getImageUrl(product.mainImage?.url)}
                  alt={product.name || "Товар"}
                  className={styles.heroImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.blocksWrapper}>
        {/* Блок 1: вертикаль зліва, дві квадратні посередині, плашка+фото справа */}
        <div className={styles.block}>
          <TileImage id={96} className={styles.tallTile} />
          <TileImage id={52} className={styles.squareTileTop} />
          <TileImage id={61} className={styles.squareTileBottom} />
          <LabelPhotoColumn
            label="Світильники"
            to="/lights-category"
            photoId={50}
          />
        </div>

        {/* Блок 2: плашка+фото зліва, вертикаль посередині, дві квадратні справа */}
        <div className={styles.block}>
          <LabelPhotoColumn
            label="Свічки"
            to="/candles-category"
            photoId={82}
          />
          <TileImage id={67} className={styles.tallTileMiddle} />
          <TileImage id={65} className={styles.squareTileTopRight} />
          <TileImage id={69} className={styles.squareTileBottomRight} />
        </div>

        {/* Блок 3: вертикаль зліва, дві квадратні посередині, плашка+фото справа */}
        <div className={styles.block}>
          <TileImage id={81} className={styles.tallTile} />
          <TileImage id={88} className={styles.squareTileTop} />
          <TileImage id={90} className={styles.squareTileBottom} />
          <LabelPhotoColumn
            label="Незламність"
            to="/resilience"
            photoId={78}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
