import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { getImageUrl } from "../utils/getImageUrl";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Імпорт компонента картки товару
import styles from "../styles/ResiliencePage.module.css";

const ResiliencePage = () => {
  const [product, setProduct] = useState(null);
  const [resilienceVideo, setResilienceVideo] = useState(null);
  const [firstPhoto, setFirstPhoto] = useState(null);
  const [secondPhoto, setSecondPhoto] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(
          `/products?filters[category][name][$eq]=Ліхтар&filters[sub_category][name][$eq]="Незламність"&populate=*`
        );
        if (response.data.data.length > 0) {
          setProduct(response.data.data[0]);
        }
      } catch (error) {
        console.error("Помилка при завантаженні товару:", error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchResilienceVideo = async () => {
      try {
        const response = await apiClient.get(
          `/resiliences?filters[name][$eq]=Відеоогляд&populate=*`
        );
        if (response.data.data.length > 0) {
          setResilienceVideo(response.data.data[0].resilienceVideo.url);
        }
      } catch (error) {
        console.error("Помилка при завантаженні відео:", error);
      }
    };

    fetchResilienceVideo();
  }, []);

  useEffect(() => {
    const fetchFirstPhoto = async () => {
      try {
        const response = await apiClient.get(
          `/resiliences?filters[name][$eq]=Військові&populate=*`
        );
        if (response.data.data.length > 0) {
          setFirstPhoto(response.data.data[0].resiliencePhoto.url);
        }
      } catch (error) {
        console.error("Помилка при завантаженні першого фото:", error);
      }
    };

    fetchFirstPhoto();
  }, []);

  useEffect(() => {
    const fetchSecondPhoto = async () => {
      try {
        const response = await apiClient.get(
          `/resiliences?filters[name][$eq]=QRCode&populate=*`
        );
        if (response.data.data.length > 0) {
          setSecondPhoto(response.data.data[0].resiliencePhoto2.url);
        }
      } catch (error) {
        console.error("Помилка при завантаженні другого фото:", error);
      }
    };

    fetchSecondPhoto();
  }, []);

  return (
    <div className={styles.resiliencePage}>
      <div className={styles.topSection}>
        <div className={styles.videoContainer}>
          {resilienceVideo && (
            <video
              src={getImageUrl(resilienceVideo)}
              controls
              className={styles.video}
            ></video>
          )}
        </div>
        <div className={styles.descriptionContainer}>
          <p>
            <strong>Темні часи потребують світлих ідей!</strong>
          </p>
          <p>До вашої уваги наш «Ліхтар Незламності»</p>
          <p>Він не потребує зарядки та простий у використанні.</p>
          <p>Ми виготовляємо та відправляємо такі ліхтарі на фронт.</p>
          <p>
            <strong>Долучайтесь до перемоги світла над темрявою.</strong>
          </p>
          <div>
            <span role="img" aria-label="bank">
              🏦
            </span>{" "}
            Банка Монобанку:
            <div>
              <a
                href="https://send.monobank.ua/jar/8aH9LG55uh"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://send.monobank.ua/jar/8aH9LG55uh
              </a>
            </div>
          </div>
          <div>
            <span role="img" aria-label="card">
              💳
            </span>{" "}
            Номер картки банки:
          </div>
          <p>5375411202658725</p>
          <p>Не скаржся на темряву.</p>
          <p>Стань сам маленьким джерелом світла.</p>
          <div>
            <span role="img" aria-label="copyright">
              ©️
            </span>{" "}
            Бернар Вербер
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.productCardContainer}>
          {product && <ProductCard product={product} />}
        </div>
        <div className={styles.photoContainer}>
          {firstPhoto && (
            <img
              src={getImageUrl(firstPhoto)}
              alt="Перше фото"
              className={styles.photo}
            />
          )}
          {secondPhoto && (
            <img
              src={getImageUrl(secondPhoto)}
              alt="Друге фото"
              className={styles.photo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResiliencePage;
