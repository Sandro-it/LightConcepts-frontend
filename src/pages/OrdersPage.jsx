import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

const statusLabels = {
  new: "Нове",
  confirmed: "Підтверджено",
  shipped: "Відправлено",
  delivered: "Доставлено",
  cancelled: "Скасовано",
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Помилка завантаження замовлень:", err);
        setError("Не вдалося завантажити замовлення.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Мої замовлення</h2>
        <p>Увійдіть в акаунт, щоб бачити список своїх замовлень.</p>
      </div>
    );
  }

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Мої замовлення</h2>
      {orders.length === 0 ? (
        <p>У вас ще немає замовлень.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "15px",
              }}
            >
              <p>
                <strong>Замовлення №{order.id}</strong> —{" "}
                {statusLabels[order.status] || order.status}
              </p>
              <p>Сума: {order.totalPrice} грн</p>
              <ul>
                {(order.items || []).map((item, index) => (
                  <li key={index}>
                    {item.name} — {item.quantity} x {item.price} грн
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
