import React from "react";
import Hero from "../component/Hero";
import BestSellers from "../component/BestSellers";
import CategoriesSection from "../component/CategoriesSection";
import Footer from "../component/Footer";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import CartFloatingButton from "../component/CartFloatingButton";

export default function HomePage() {
  const cartItems = useStore((state) => state.cartItems || []);
  const navigate = useNavigate();

  return (
    <div className="  font-sans min-h-screen bg-[#FDFBF7]">


      {/* Main Page Sections */}
      <Hero />
      <CategoriesSection />
      <BestSellers />
      <Footer />
    </div>
  );
}