import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./user/Pages/HomePage";
import ProductPage from "./user/Pages/ProductPage";
import CartPage from "./user/Pages/CartPage";
import CategoriesPage from "./user/Pages/CategoriesPage";
import CategoryDetailPage from "./user/Pages/CategoryDetailPage";
import CheckoutPage from "./user/Pages/CheckoutPage";
import OrdersPage from "./user/Pages/OrdersPage";
import ConnectUs from "./user/Pages/ConnectUs";
import Navbar from "./user/component/Navbar";
import useStore from "./store";
import ThemeToggle from "./user/component/ThemeToggle";
import CartFloatingButton from "./user/component/CartFloatingButton";
import AdminPage from "./Admin/Pages/AdminPage";
import StaffDashboard from "./Staff/Pages/StaffDashboard";


export default function App() {
  // ✅ هنا نستدعي المتغير theme من الـ store
  const theme = useStore((state) => state.theme);
  

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray text-gray-900 dark:text-white transition-colors duration-500">
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
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/staff" element={<StaffDashboard />} />
          </Routes>
          <CartFloatingButton/>
          <ThemeToggle/>

        </BrowserRouter>

      </div>
    </div>
  );
}