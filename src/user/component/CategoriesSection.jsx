import { useNavigate } from 'react-router-dom';
import useStore from '../../store';

export default function CategoriesSection() {
  const categories = useStore((state) => state.categories);
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-xs font-bold tracking-[0.5em] uppercase block mb-2">
            Curated Collections
          </span>
          <h2 className="text-4xl font-serif text-[#0A0A0A] font-light tracking-widest uppercase">
            Categories
          </h2>
          <div className="h-[1px] w-32 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        <div className="flex gap-8 md:gap-12 overflow-x-auto pb-10 hide-scrollbar justify-start md:justify-center px-4 snap-x">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/categories?category=${category.id}`)}// هنا الكليك يروح على CategoriesPage
              className="flex flex-col items-center gap-5 snap-center shrink-0 group cursor-pointer"
            >
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1 border border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-all duration-500 bg-[#FDFBF7]">
                <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 will-change-transform"
                  />
                </div>
              </div>
              <span className="text-[#0A0A0A] font-serif text-sm font-bold tracking-widest group-hover:text-[#D4AF37] transition-colors uppercase">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}