import React, { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";

export default function CategoriesPage() {
  const { categories } = useStore();
  const navigate = useNavigate();

  // ✅ تحسين الأداء
  const processedCategories = useMemo(() => {
    return categories.map((cat, idx) => ({
      ...cat,
      isLarge: idx === 0 || idx === 3,
    }));
  }, [categories]);

  return (
    <div className=" animate-fade-in pt-32 pb-24 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            <span className="text-[#D4AF37] tracking-[0.5em] text-[10px] uppercase font-bold">
              Discover
            </span>
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-widest uppercase mb-6">
            The Sovereign Vault
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed italic">
            Explore our curated collections where every piece tells a story of
            an ancient dynasty, meticulously crafted for the modern connoisseur.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {processedCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.id}`)}
              className={`relative group overflow-hidden cursor-pointer border border-white/5 bg-[#111] transition-all duration-700
                ${cat.isLarge ? "md:col-span-8 h-[500px]" : "md:col-span-4 h-[500px]"}
              `}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-[1.5s]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end items-start">
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2 group-hover:translate-x-2 transition-transform duration-500">
                  {cat.count}
                </span>

                <h3 className="text-white text-3xl md:text-4xl font-serif tracking-widest uppercase mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {cat.name}
                </h3>

                <h4
                  className="text-gray-400 text-sm font-serif italic mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"
                  dir="rtl"
                >
                  {cat.titleAr}
                </h4>

                <p className="text-gray-300 text-xs font-light max-w-xs leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 translate-y-4 group-hover:translate-y-0">
                  {cat.description}
                </p>

                {/* ✅ منع propagation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/categories/${cat.id}`);
                  }}
                  className="flex items-center gap-4 text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase border-b border-[#D4AF37]/30 pb-1 group-hover:border-[#D4AF37] transition-all"
                >
                  View Collection <ChevronRight size={14} />
                </button>
              </div>

              {/* Corners */}
              <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#D4AF37]/30 group-hover:w-12 group-hover:h-12 group-hover:border-[#D4AF37] transition-all duration-500"></div>
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#D4AF37]/30 group-hover:w-12 group-hover:h-12 group-hover:border-[#D4AF37] transition-all duration-500"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}