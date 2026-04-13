import React from "react";
import useStore from "../../store";
import { Sun, Moon } from "lucide-react"; // إذا ما عندك، ممكن تستخدم SVG أو أي أيقونة ثانية

export default function ThemeToggle() {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      title="Toggle Dark Mode"
      className="fixed bottom-20 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full 
        bg-gray-800 text-yellow-400 dark:bg-[#D4AF37] dark:text-gray-900 shadow-lg hover:scale-110 
        transition-transform duration-300 "
    >
      {theme === "dark" ? 
      <Sun size={24} /> 
      : <Moon size={24} />}
    </button>
  );
}