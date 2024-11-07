// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header"; // Додамо Header компонент
// import Footer from "./components/Footer"; // Додамо Footer компонент
// import ProductsPage from "./pages/ProductsPage";
// import ProductDetail from "./pages/ProductDetail";
// import LightsCategoryPage from "./pages/LightsCategoryPage";
// import BraCategoryPage from "./pages/BraCategoryPage";
// import { useTranslation } from "react-i18next";
// // Інші імпорти можна додати за потреби
// import "./App.css"; // Стилі для App

// const App = () => {
//   const { t } = useTranslation(); // Використовуємо хук перекладу

//   return (
//     <div className="app">
//       {/* Контейнер для всього додатку */}
//       <div className="container">
//         <Header /> {/* Відображення Header компоненту */}
//       </div>
//       <main className="content container">
//         <Routes>
//           {/* Головна сторінка з переліком всіх товарів */}
//           <Route path="/" element={<ProductsPage />} />

//           {/* Сторінка деталей товару */}
//           <Route path="/products/:id" element={<ProductDetail />} />

//           {/* Сторінки категорій */}
//           <Route path="/lights-category" element={<LightsCategoryPage />} />
//           <Route path="/bra" element={<BraCategoryPage />} />
//           {/* Додати інші маршрути для інших сторінок категорій за необхідності */}
//         </Routes>
//       </main>
//       <Footer /> {/* Відображення Footer компоненту */}
//     </div>
//   );
// };

// export default App;

//==========================================================================================//

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
        </Routes>
      </main>
      <Footer /> {/* Додаємо Footer компонент внизу */}
    </div>
  );
};

export default App;
