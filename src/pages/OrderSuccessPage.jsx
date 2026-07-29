import { Link, useLocation } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Дякуємо за замовлення!</h2>
      {orderId && <p>Номер замовлення: №{orderId}</p>}
      <p>
        Ми зв'яжемось із вами найближчим часом для підтвердження та
        невеликої передоплати (200–300 грн) перед відправкою.
      </p>
      <Link to="/products">Продовжити покупки</Link>
    </div>
  );
};

export default OrderSuccessPage;
