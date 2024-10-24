import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail"; // Сторінка для деталей продукту
import ProductsPage from "./pages/ProductsPage"; // Сторінка для списку всіх продуктів
import "./App.css"; // Стилі для App

const App = () => {
  return (
    <div className="app-container">
      {/* Визначаємо маршрути */}
      <Routes>
        {/* Головна сторінка - список продуктів */}
        <Route path="/" element={<ProductsPage />} />

        {/* Деталі продукту */}
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default App;
