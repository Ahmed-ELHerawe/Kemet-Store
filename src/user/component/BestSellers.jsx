import React from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";

const BestSellers = () => {
  const bestSellers = useStore((state) => state.bestSellers);
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <span className="text-[#D4AF37] text-[10px] tracking-[0.6em] uppercase font-bold mb-4 block animate-pulse">
            Chosen by History
          </span>
          <h2 className="text-5xl font-serif text-white tracking-[0.2em] uppercase">
            Iconic Treasures
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group relative cursor-pointer"
            >
              <div className="relative bg-[#0F0F0F] overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-[#D4AF37] font-serif text-lg uppercase">
                    {product.name}
                  </h3>
                  <p className="text-white font-bold text-sm mt-2">
                    {product.price} EGP
                  </p>
                  <span className="text-[10px] text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                    VIEW PIECE <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
