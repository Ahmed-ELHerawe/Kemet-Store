import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

export default function CartFloatingButton() {
  const cartItems = useStore((state) => state.cartItems);
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCount === 0) return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="fixed bottom-35 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full 
        bg-gray-800 text-yellow-400 dark:bg-[#D4AF37] dark:text-gray-900 shadow-lg hover:scale-110 
        transition-transform duration-300 " // يظهر فقط في الموبايل
    >
      <ShoppingCart size={24} />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {cartCount}
      </span>
    </button>
  );
}