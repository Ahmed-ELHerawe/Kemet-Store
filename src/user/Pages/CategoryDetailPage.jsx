import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../store";
import { ChevronRight } from "lucide-react";

export default function CategoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = useStore(state => state.categories) || [];
  const products = useStore(state => state.products) || [];

  // البحث عن الكاتيجوري
  const category = useMemo(
    () => categories.find(cat => cat.id === parseInt(id)),
    [categories, id]
  );

  if (!category) return <div className="pt-32 text-center">Category not found</div>;

  // تصفية المنتجات التابعة للكاتيجوري
  const categoryProducts = useMemo(
    () => products.filter(p => p.categoryId === category.id),
    [products, category.id]
  );

  return (
    <div className="pt-32 pb-24 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        {/* Back Button */}
        <button 
          onClick={() => navigate("/categories")}
          className="text-[#D4AF37] text-xs tracking-[0.3em] font-bold mb-12 flex items-center gap-2 hover:gap-4 transition-all"
        >
          ← Back to Vault
        </button>

        {/* Category Header */}
        <div className="relative h-[40vh] bg-[#0A0A0A] overflow-hidden rounded-lg mb-16">
          <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFBF7]"></div>
          <div className="absolute bottom-6 left-6 z-10">
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-widest uppercase">{category.name}</h1>
            <div className="h-[2px] w-24 bg-[#D4AF37] mt-4"></div>
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="relative group cursor-pointer border border-[#D4AF37]/10 overflow-hidden rounded-lg bg-white hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-4 flex flex-col items-start">
                  <h3 className="text-lg font-serif tracking-widest text-[#0A0A0A] uppercase mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#D4AF37] font-bold text-sm">{product.price} EGP</p>
                  <button className="mt-2 flex items-center gap-2 text-[#D4AF37] text-[10px] font-bold uppercase border-b border-[#D4AF37]/30 pb-1 group-hover:border-[#D4AF37] transition-all">
                    View Product <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-serif italic tracking-widest">
              No products yet in this dynasty… more treasures coming soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}