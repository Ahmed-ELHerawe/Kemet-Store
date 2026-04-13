import { Crown, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const galleryImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80",
  ];
const navigate = useNavigate();
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">

      {/* شبكة الصور الخلفية – نفس شكل الكود الثاني */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 opacity-30 md:opacity-40">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className={`w-full rounded-2xl overflow-hidden ${
              index % 2 === 0
                ? "h-[60vh] md:h-[80vh] mt-0 md:mt-12"
                : "h-[50vh] md:h-[70vh] -mt-10 md:-mt-20"
            }`}
          >
            <img
          src={img}
          alt="موضة"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 opacity-100"
        />
          </div>
        ))}
      </div>

      {/* Overlay لتوضيح النص */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10"></div>

      {/* المحتوى */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center mt-20">
        <div className="mb-6 flex items-center justify-center gap-4 animate-bounce">
          <div className="h-[2px] w-16 bg-[#D4AF37]"></div>
          <Crown size={24} className="text-[#D4AF37]" />
          <div className="h-[2px] w-16 bg-[#D4AF37]"></div>
        </div>

        <h1 className="text-5xl md:text-8xl font-serif text-white mb-4 tracking-widest drop-shadow-[0_10px_10px_rgba(212,175,55,0.3)] uppercase">
          <span className="text-[#D4AF37] font-bold">Kemet</span> Boutique
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light tracking-[0.3em] font-serif italic max-w-2xl">
          Where Ancient Royalty Meets Modern Luxury
        </p>

        <button
        onClick={() => navigate("/categories")}
        className="group relative px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 overflow-hidden font-bold tracking-widest uppercase text-xs">
          <div className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <span className="relative z-10 flex items-center gap-3">
            EXPLORE THE DYNASTY
            <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
          </span>
        </button>
      </div>
    </header>
  );
}