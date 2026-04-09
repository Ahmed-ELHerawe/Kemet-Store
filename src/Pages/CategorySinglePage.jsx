import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import { ShoppingCart, Star, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function CategorySinglePage({ product }) {
  const navigate = useNavigate();
  const addToCart = useStore(state => state.addToCart);

  const [selectedSize, setSelectedSize] = useState("M");

  // استخدام useMemo لتجنب اعادة تعريف الصور في كل render
  const productImages = useMemo(() => product.images && product.images.length > 0 ? product.images : [product.image], [product.images, product.image]);
  const [mainImage, setMainImage] = useState(productImages[0]);

  if (!product) return <div className="pt-32 text-center">Product not found</div>;

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      
      {/* Back Button */}
      <div className="pt-32 px-4 max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] uppercase text-xs tracking-widest font-bold mb-12"
        >
          <ArrowLeft size={16} /> Back to Collection
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Product Images */}
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
                <img src={img} alt={`thumbnail-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-serif text-[#0A0A0A] tracking-widest uppercase mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-[#D4AF37] font-serif tracking-widest mb-6">{product.price} EGP</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating || 0) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300"}
              />
            ))}
            <span className="text-xs text-gray-400 font-bold ml-2">({product.rating || 0}/5)</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed font-light text-lg italic font-serif mb-8">
            {product.description || "No description available."}
          </p>

          {/* Size Selection */}
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Select Size</h3>
            <div className="flex gap-4">
              {["S", "M", "L", "XL"].map(size => (
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

          {/* Add to Cart */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => addToCart({ ...product, size: selectedSize })}
              className="bg-[#D4AF37] text-[#0A0A0A] uppercase font-bold py-3 px-6 rounded-md hover:bg-[#b88e2f] transition-colors"
            >
              Add to Royal Cart
            </button>
          </div>

          {/* Features */}
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
    </div>
  );
}