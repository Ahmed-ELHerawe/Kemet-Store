// src/Pages/ProductPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../store";
import { Star, ArrowLeft, ShieldCheck, Truck, RefreshCw, ShoppingCart } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // استخدم bestSellers كقائمة المنتجات
const bestSellers = useStore((state) => state.bestSellers || []);
const products = useStore((state) => state.products || []);

// دمج بس بدون تغيير أي UI
const allProducts = [...bestSellers, ...products];

const product = allProducts.find((p) => p.id === Number(id));



  const addToCart = useStore((state) => state.addToCart);

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  const [selectedSize, setSelectedSize] = useState("M");

  // دعم مصفوفة صور أو صورة واحدة
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [mainImage, setMainImage] = useState(productImages[0]);

  // إيجاد منتجات مشابهة حسب الفئة
  const productCategoryKey = product.categoryId ?? product.category;
const similarProducts = allProducts.filter(
    (p) => (p.categoryId ?? p.category) === productCategoryKey && p.id !== product.id
  );

  // دالة لعرض السعر بصيغة موحدة
  const displayPrice = (p) => {
    if (typeof p === "number") return `${p.toLocaleString()} EGP`;
    return String(p).includes("EGP") ? p : `${p} EGP`;
  };

  return (
    <div className="bg-[#fdf7f7] min-h-screen">
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors mb-12 uppercase text-xs tracking-widest font-bold"
        >
          <ArrowLeft size={16} /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-white border border-[#D4AF37]/20 overflow-hidden rounded-lg shadow-md">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-white border cursor-pointer overflow-hidden 
                    ${mainImage === img ? "border-[#D4AF37]" : "border-[#D4AF37]/10"} 
                    hover:border-[#D4AF37] transition-colors`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-serif text-[#0A0A0A] tracking-widest uppercase mb-4">
              {product.name}
            </h1>

            <p className="text-2xl text-[#D4AF37] font-serif tracking-widest mb-6">
              {displayPrice(product.price)}
            </p>

            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating || 0) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300"}
                />
              ))}
              <span className="text-xs text-gray-400 font-bold ml-2">({product.rating ?? 0}/5)</span>
            </div>

            <p className="text-gray-700 leading-relaxed font-light text-lg italic font-serif mb-8">
              {product.description}
            </p>

            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Select Size</h3>
              <div className="flex gap-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-md transition-all duration-300 font-bold text-sm
                      ${selectedSize === size ? "bg-[#0A0A0A] text-[#D4AF37]" : "border-gray-200 text-gray-400 hover:border-[#D4AF37]"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => addToCart({ ...product, size: selectedSize, quantity: 1 })}
                className="w-full py-5 bg-[#D4AF37] text-black font-bold tracking-widest uppercase text-xs hover:bg-[#e6c14a] transition-all flex items-center justify-center gap-3"
              >
                <ShoppingCart size={18} /> Add to Royal Cart
              </button>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { selectedProduct: { ...product, size: selectedSize, quantity: 1 } },
                  })
                }
                className="w-full py-5 border border-[#0A0A0A] text-[#0A0A0A] font-bold tracking-widest uppercase text-xs hover:bg-[#0A0A0A] hover:text-white transition-all"
              >
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-[#D4AF37]/10">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={24} className="text-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Authentic Heritage</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={24} className="text-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Global Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw size={24} className="text-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

{similarProducts.length > 0 && (
  <div className="mt-28">
    <h2 className="text-3xl md:text-4xl font-serif text-[#0A0A0A] mb-12 uppercase tracking-widest text-center">
      You Might Also Like
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {similarProducts.map((p) => (
        <div
          key={p.id}
          onClick={() => navigate(`/product/${p.id}`)}
          className="group cursor-pointer bg-[#0F0F0F] border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-500 overflow-hidden"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-all"></div>

            {/* Quick View */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] border-b border-[#D4AF37]/40 pb-1">
                View Product
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="uppercase text-sm tracking-widest text-[#D4AF37] mb-2 group-hover:text-white transition-colors">
              {p.name}
            </h3>

            <p className="text-white font-serif text-lg">
              {displayPrice(p.price)}
            </p>
          </div>

          {/* Decorative Line */}
          <div className="h-[1px] w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-700"></div>
        </div>
      ))}
    </div>
  </div>
)}
      </div>
    </div>
  );
}