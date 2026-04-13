import { Crown } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-[#D4AF37] py-20 text-center border-t border-[#D4AF37]/20">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-8">
        <Crown size={40} className="opacity-30" />
        <h2 className="font-serif tracking-[0.6em] text-2xl uppercase">
          Kemet Boutique
        </h2>
      </div>
    </footer>
  );
}