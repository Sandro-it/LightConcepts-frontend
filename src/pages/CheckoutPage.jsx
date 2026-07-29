import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { getCurrentUser } from "../services/authService";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("branch");
  const [novaPoshtaCity, setNovaPoshtaCity] = useState("");
  const [novaPoshtaWarehouse, setNovaPoshtaWarehouse] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser()
        .then((data) => {
          if (data.username) setRecipientName(data.username);
          if (data.phone) setRecipientPhone(data.phone);
        })
        .catch(() => {});
    }
  }, []);

  if (items.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Оформлення замовлення</h2>
        <p>Кошик порожній.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!recipientName || !recipientPhone) {
      setError("Заповніть ім'я та телефон.");
      return;
    }

    setSubmitting(true);
    try {
      const order = await createOrder({
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice,
        recipientName,
        recipientPhone,
        deliveryMethod,
        novaPoshtaCity,
        novaPoshtaWarehouse,
        comment,
        paymentMethod: "cash_on_delivery",
        status: "new",
      });

      clearCart();
      navigate("/order-success", { state: { orderId: order.id } });
    } catch (err) {
      console.error("Помилка оформлення замовлення:", err);
      setError("Не вдалося оформити замовлення. Спробуйте ще раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Оформлення замовлення</h2>

      <div
        style={{
          background: "#fff3cd",
          padding: "10px 15px",
          borderRadius: "4px",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        Оплата — готівкою при отриманні. Перед відправкою ми зв'яжемось із
        вами для невеликої передоплати (200–300 грн) — це покриває вартість
        пересилки, якщо посилку доведеться повернути без поважної причини.
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label>Ім'я одержувача</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Телефон</label>
          <input
            type="tel"
            value={recipientPhone}
            onChange={(e) => setRecipientPhone(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Спосіб доставки</label>
          <select
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="branch">Нова Пошта — відділення</option>
            <option value="postomat">Нова Пошта — поштомат</option>
            <option value="courier">Кур'єр</option>
          </select>
        </div>

        <div>
          <label>Місто</label>
          <input
            type="text"
            value={novaPoshtaCity}
            onChange={(e) => setNovaPoshtaCity(e.target.value)}
            placeholder="Наприклад: Київ"
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Відділення / номер поштомату</label>
          <input
            type="text"
            value={novaPoshtaWarehouse}
            onChange={(e) => setNovaPoshtaWarehouse(e.target.value)}
            placeholder="Наприклад: Відділення №5"
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Коментар до замовлення</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <h3>Разом: {totalPrice} грн</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "10px 20px",
            background: "#0275d8",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {submitting ? "Оформлення..." : "Підтвердити замовлення"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
