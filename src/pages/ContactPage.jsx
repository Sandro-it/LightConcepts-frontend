import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "../styles/ContactPage.module.css";

const EMAILJS_SERVICE_ID = "service_zvjw07e";
const EMAILJS_TEMPLATE_ID = "template_1t46cz2";
const EMAILJS_PUBLIC_KEY = "PIdhZCQIIsNZvzxvB";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          title: "Нове повідомлення з сайту SvitliIdei",
          time: new Date().toLocaleString("uk-UA"),
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Помилка відправки повідомлення:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>Контакти</h1>
      <p>
        Питання щодо замовлення, ідея для нового світильника чи просто
        привіт — пишіть будь-яким зручним способом.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          margin: "20px 0",
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Телефон:</strong> +380969135651
        </p>
        <p style={{ margin: 0 }}>
          <strong>Telegram:</strong>{" "}
          <a
            href="https://t.me/SvitliIdei"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            t.me/SvitliIdei
          </a>
        </p>
        <p style={{ margin: 0 }}>
          <strong>Viber:</strong>{" "}
          <a
            href="viber://chat?number=%2B380969135651"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            +380969135651
          </a>
        </p>
        <p style={{ margin: 0 }}>
          <strong>WhatsApp:</strong>{" "}
          <a
            href="https://wa.me/380969135651"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            +380969135651
          </a>
        </p>
      </div>

      <div style={{ margin: "30px 0" }}>
        <h2>Про нас</h2>
        <p>
          Все почалося як хобі — під час карантину, коли з'явилось трохи
          вільного часу і бажання спробувати щось зробити своїми руками. З
          того часу маленька ідея переросла в справжню майстерню:
          світильники, свічки та меблі, кожен виріб — ручної роботи, з
          увагою до деталей. А коли почалась повномасштабна війна, ми
          додали до нашої справи ще одну — виготовляємо та відправляємо на
          фронт ліхтарі "Незламність" для наших захисників. Раді ділитися
          своїми світлими ідеями з вами.
        </p>
      </div>

      <h2>Або напишіть нам прямо тут</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <div>
          <label>Ім'я</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>
        <div>
          <label>Пошта (щоб ми могли відповісти)</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>
        <div>
          <label>Повідомлення</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            className={styles.formTextarea}
          />
        </div>

        {status === "success" && (
          <p style={{ color: "green" }}>Дякуємо! Ваше повідомлення надіслано.</p>
        )}
        {status === "error" && (
          <p style={{ color: "red" }}>
            Не вдалося надіслати. Спробуйте ще раз або скористайтесь
            Telegram/Viber/WhatsApp вище.
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          style={{
            padding: "10px 20px",
            background: "#0275d8",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {sending ? "Надсилання..." : "Надіслати"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
