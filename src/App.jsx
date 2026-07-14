import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Імпортуємо Header компонент
import Footer from "./components/Footer"; // Імпортуємо Footer компонент
import ResiliencePage from "./pages/ResiliencePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail"; // Імпортуємо сторінку деталей товару
import CategoryPage from "./pages/CategoryPage";
import { categories } from "./config/categories";
import UserAccount from "./pages/UserAccount"; // Імпорт сторінки
import { useTranslation } from "react-i18next"; // Імпортуємо useTranslation з react-i18next
import "./App.css"; // Імпортуємо CSS файл зі стилями для App

const App = () => {
  const { t } = useTranslation(); // Використовуємо хук перекладу

  return (
    <div className="app">
      {/* Загальний контейнер додатку */}
      <div className="container">
        <Header /> {/* Додаємо Header компонент зверху */}
      </div>
      <main className="content container">
        {/* Головний контент сторінки з класами "content" та "container" */}
        <Routes>
          <Route path="/resilience" element={<ResiliencePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />{" "}
          {/* Роут для сторінки деталей товару */}
          {Object.values(categories).map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={<CategoryPage config={config} />}
            />
          ))}
          <Route path="/account" element={<UserAccount />} />
        </Routes>
      </main>
      <Footer /> {/* Додаємо Footer компонент внизу */}
    </div>
  );
};

export default App;
