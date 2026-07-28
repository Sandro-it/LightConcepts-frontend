import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResiliencePage from "./pages/ResiliencePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import AccountLayout from "./components/AccountLayout";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";
import AddressesPage from "./pages/AddressesPage";
import FavoritesPage from "./pages/FavoritesPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { categories } from "./config/categories";
import { useTranslation } from "react-i18next";
import "./App.css";

const App = () => {
  const { t } = useTranslation();

  return (
    <FavoritesProvider>
      <div className="app">
        <div className="container">
          <Header />
        </div>
        <main className="content container">
          <Routes>
            <Route path="/resilience" element={<ResiliencePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            {Object.values(categories).map((config) => (
              <Route
                key={config.path}
                path={config.path}
                element={<CategoryPage config={config} />}
              />
            ))}
            <Route element={<AccountLayout />}>
              <Route path="/account" element={<AccountPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/addresses" element={<AddressesPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  );
};

export default App;
