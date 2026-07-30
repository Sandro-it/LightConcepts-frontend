import { Link } from "react-router-dom";
import {
  FaTelegramPlane,
  FaViber,
  FaWhatsapp,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaPhone,
} from "react-icons/fa";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.phoneRow}>
          <FaPhone className={styles.icon} />
          <span>+380969135651</span>
        </div>

        <div className={styles.iconRow}>
          <div className={styles.socialIcons}>
            <a
              href="https://t.me/SvitliIdei"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane
                className={`${styles.icon} ${styles.iconTelegram}`}
              />
            </a>
            <a
              href="viber://chat?number=%2B380969135651"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaViber className={`${styles.icon} ${styles.iconViber}`} />
            </a>
            <a
              href="https://wa.me/380969135651"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className={`${styles.icon} ${styles.iconWhatsapp}`} />
            </a>
            <Link to="/contact" className={styles.icon}>
              <FaEnvelope className={`${styles.icon} ${styles.iconEmail}`} />
            </Link>
          </div>

          <div className={styles.socialLinks}>
            <a
              href="https://www.facebook.com/svitli.com.ua"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF
                className={`${styles.icon} ${styles.iconFacebook}`}
              />
            </a>
            <a
              href="https://www.instagram.com/svitli.com.ua/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className={`${styles.icon} ${styles.iconInstagram}`}
              />
            </a>
            <a
              href="https://www.pinterest.com/ideisvitli/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPinterestP
                className={`${styles.icon} ${styles.iconPinterest}`}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
