import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import CategoriesPage from "./Pages/CategoriesPage";
import CategoryDetailPage from "./Pages/CategoryDetailPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrdersPage from "./Pages/OrdersPage";
import ConnectUs from "./Pages/ConnectUs";
import Navbar from "./component/Navbar";
import useStore from "./store";
import ThemeToggle from "./component/ThemeToggle";
import CartFloatingButton from "./component/CartFloatingButton";

export default function App() {
  // ✅ هنا نستدعي المتغير theme من الـ store
  const theme = useStore((state) => state.theme);
  

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id" element={<CategoryDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/connect" element={<ConnectUs />} />

          </Routes>
          <CartFloatingButton/>
          <ThemeToggle/>

        </BrowserRouter>

      </div>
    </div>
  );
}