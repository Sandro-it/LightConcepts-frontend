// import { Link } from "react-router-dom";
// import styles from "../styles/ProductCard.module.css";

// const ProductCard = ({ product }) => {
//   const backendUrl = "http://116.203.106.75:1337"; // Виправлено на IP-адресу сервера
//   const imageUrl = product?.mainImage?.formats?.thumbnail?.url
//     ? `${backendUrl}${product.mainImage.formats.thumbnail.url}`
//     : product?.mainImage?.url
//     ? `${backendUrl}${product.mainImage.url}`
//     : "/placeholder.jpg";

//   return (
//     <Link to={`/products/${product.id}`} className={styles.productLink}>
//       <div className={styles.productCard}>
//         <img
//           src={imageUrl}
//           alt={product.name || "Невідомий продукт"}
//           className={styles.productImage}
//         />
//         <div className={styles.productInfo}>
//           <h3 className={styles.productName}>{product.name || "Без назви"}</h3>
//           <p className={styles.productPrice}>
//             {product.price ? `${product.price} грн` : "Ціна не вказана"}
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

//==============================HTTPS=================================//

import { Link } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  const backendUrl = "https://api.svitli.com.ua"; // Виправлено на HTTPS
  const imageUrl = product?.mainImage?.formats?.thumbnail?.url
    ? `${backendUrl}${product.mainImage.formats.thumbnail.url}`
    : product?.mainImage?.url
    ? `${backendUrl}${product.mainImage.url}`
    : "/placeholder.jpg";

  return (
    <Link to={`/products/${product.id}`} className={styles.productLink}>
      <div className={styles.productCard}>
        <img
          src={imageUrl}
          alt={product.name || "Невідомий продукт"}
          className={styles.productImage}
        />
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
