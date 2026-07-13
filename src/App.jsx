import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Імпортуємо Header компонент
import Footer from "./components/Footer"; // Імпортуємо Footer компонент
import ResiliencePage from "./pages/ResiliencePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail"; // Імпортуємо сторінку деталей товару
import LightsCategoryPage from "./pages/LightsCategoryPage";
import BraCategoryPage from "./pages/BraCategoryPage";
import CandlesCategoryPage from "./pages/CandlesCategoryPage";
import FurnitureCategoryPage from "./pages/FurnitureCategoryPage";
import WallLightsCategoryPage from "./pages/WallLightsCategoryPage";
import PendantLightsCategoryPage from "./pages/PendantLightsCategoryPage";
import SteampunkLightsCategoryPage from "./pages/SteampunkLightsCategoryPage";
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
          <Route path="/lights-category" element={<LightsCategoryPage />} />
          <Route path="/bra" element={<BraCategoryPage />} />
          <Route path="/wall-lights" element={<WallLightsCategoryPage />} />
          <Route
            path="/pendant-lights"
            element={<PendantLightsCategoryPage />}
          />
          <Route
            path="/steampunk-lights"
            element={<SteampunkLightsCategoryPage />}
          />
          <Route path="/candles-category" element={<CandlesCategoryPage />} />
          <Route
            path="/furniture-category"
            element={<FurnitureCategoryPage />}
          />
          <Route path="/account" element={<UserAccount />} />
        </Routes>
      </main>
      <Footer /> {/* Додаємо Footer компонент внизу */}
    </div>
  );
};

export default App;
