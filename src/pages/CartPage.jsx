import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/getImageUrl";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Кошик</h2>
        <p>Кошик порожній.</p>
        <Link to="/products">Перейти до товарів</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Кошик</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {items.map((item) => (
          <div
            key={item.productId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "10px",
            }}
          >
            <img
              src={getImageUrl(item.image)}
              alt={item.name}
              style={{ width: "70px", height: "70px", objectFit: "contain" }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>{item.name}</p>
              <p style={{ margin: 0 }}>{item.price} грн</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.productId, parseInt(e.target.value, 10) || 1)
              }
              style={{ width: "60px" }}
            />
            <button type="button" onClick={() => removeFromCart(item.productId)}>
              Видалити
            </button>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "20px" }}>Разом: {totalPrice} грн</h3>

      <button
        type="button"
        onClick={() => navigate("/checkout")}
        style={{
          padding: "10px 20px",
          background: "#0275d8",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Оформити замовлення
      </button>
    </div>
  );
};

export default CartPage;
