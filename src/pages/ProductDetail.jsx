// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import styles from "../styles/ProductDetail.module.css";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [specsOpen, setSpecsOpen] = useState(false);
//   const navigate = useNavigate();

//   const backendUrl = "http://116.203.106.75:1337"; // Виправлено на IP-адресу сервера

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `${backendUrl}/api/products?filters[id][$eq]=${id}&populate=*`
//         );
//         const productData = response.data.data[0];
//         if (productData) {
//           setProduct(productData);
//           const mainImageUrl = productData.mainImage?.url
//             ? `${backendUrl}${productData.mainImage.url}`
//             : "/placeholder.jpg";
//           setSelectedImage(mainImageUrl);
//         } else {
//           setError("Продукт не знайдено");
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Помилка завантаження деталей товару:", error);
//         setError("Помилка завантаження деталей товару");
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <p>Завантаження...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.productDetail}>
//       <div className={styles.backButtonContainer}>
//         <button onClick={() => navigate(-1)} className={styles.backButton}>
//           Назад
//         </button>
//       </div>

//       <div className={styles.leftColumn}>
//         <img
//           src={selectedImage}
//           alt={product.name || "Зображення продукту"}
//           className={styles.mainImage}
//         />
//         <div className={styles.thumbnailContainer}>
//           {product.additionalImages?.map((image, index) => (
//             <img
//               key={index}
//               src={`${backendUrl}${image.url}`}
//               alt={`Додаткове зображення ${index + 1}`}
//               className={`${styles.thumbnail} ${
//                 selectedImage === `${backendUrl}${image.url}`
//                   ? styles.selectedThumbnail
//                   : ""
//               }`}
//               onClick={() => setSelectedImage(`${backendUrl}${image.url}`)}
//             />
//           ))}
//         </div>
//       </div>

//       <div className={styles.rightColumn}>
//         <h1 className={styles.productName}>{product.name || "Без назви"}</h1>
//         <p className={styles.description}>
//           {product.description || "Опис відсутній"}
//         </p>
//         <p className={styles.price}>
//           {product.price ? `${product.price} грн` : "Ціна не вказана"}
//         </p>
//         <div className={styles.addToCartSection}>
//           {/* Приклад секції додавання до кошика */}
//           <button className={styles.addToCartButton}>Додати до кошика</button>
//         </div>
//         <div
//           className={`${styles.specifications} ${specsOpen ? "open" : ""}`}
//           onClick={() => setSpecsOpen(!specsOpen)}
//         >
//           Характеристики
//           <div className={styles.specificationList}>
//             {/* Список характеристик товару */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

//==============================HTTPS=================================//

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [specsOpen, setSpecsOpen] = useState(false);
  const navigate = useNavigate();

  const backendUrl = "https://api.svitli.com.ua"; // Виправлено на HTTPS

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/products?filters[id][$eq]=${id}&populate=*`
        );
        const productData = response.data.data[0];
        if (productData) {
          setProduct(productData);
          const mainImageUrl = productData.mainImage?.url
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

  return (
    <div className={styles.productDetail}>
      <div className={styles.backButtonContainer}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Назад
        </button>
      </div>

      <div className={styles.leftColumn}>
        <img
          src={selectedImage}
          alt={product.name || "Зображення продукту"}
          className={styles.mainImage}
        />
        <div className={styles.thumbnailContainer}>
          {product.additionalImages?.map((image, index) => (
            <img
              key={index}
              src={`${backendUrl}${image.url}`}
              alt={`Додаткове зображення ${index + 1}`}
              className={`${styles.thumbnail} ${
                selectedImage === `${backendUrl}${image.url}`
                  ? styles.selectedThumbnail
                  : ""
              }`}
              onClick={() => setSelectedImage(`${backendUrl}${image.url}`)}
            />
          ))}
        </div>
      </div>

      <div className={styles.rightColumn}>
        <h1 className={styles.productName}>{product.name || "Без назви"}</h1>
        <p className={styles.description}>
          {product.description || "Опис відсутній"}
        </p>
        <p className={styles.price}>
          {product.price ? `${product.price} грн` : "Ціна не вказана"}
        </p>
        <div className={styles.addToCartSection}>
          <button className={styles.addToCartButton}>Додати до кошика</button>
        </div>
        <div
          className={`${styles.specifications} ${specsOpen ? "open" : ""}`}
          onClick={() => setSpecsOpen(!specsOpen)}
        >
          Характеристики
          <div className={styles.specificationList}>
            {/* Список характеристик товару */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
