import React, { useEffect, useMemo } from "react";
import useStore from "../store";
import { ShoppingBag, Plus, Minus, X, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useStore();
  const cart = cartItems ?? [];

  const navigate = useNavigate();

  // ✅ تحسين الأداء
  const cartTotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [cart]);

  const shipping = cart.length > 0 ? 150 : 0;
  const total = cartTotal + shipping;

  // ✅ Redirect لو فاضي
  useEffect(() => {
    if (cart.length === 0) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [cart, navigate]);

  return (
    <div className="pt-32 pb-24 bg-[#FDFBF7] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="flex items-center gap-4 mb-12">
          <h1 className="text-4xl font-serif text-[#0A0A0A] tracking-widest uppercase">
            The Royal Cart
          </h1>
          <div className="h-[1px] flex-grow bg-[#D4AF37]/20"></div>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag size={80} className="text-gray-200 mb-6" />
            <h2 className="text-2xl font-serif text-gray-400 tracking-widest uppercase mb-6">
              Your vault is empty
            </h2>
            <button
              onClick={() => navigate("/")}
              className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all font-bold tracking-widest uppercase text-xs"
            >
              Continue Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Items */}
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="group relative flex gap-6 bg-white p-6 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>

                  <div className="w-24 md:w-32 aspect-[3/4] overflow-hidden bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl font-serif text-[#0A0A0A] tracking-wide mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 uppercase">
                        Size: {item.size}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {item.price} EGP
                      </p>
                    </div>

                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center border border-gray-100">

                        {/* ✅ تقليل الكمية بدون bug */}
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.size, -1);
                            } else {
                              removeFromCart(item.id, item.size);
                            }
                          }}
                          className="p-2 hover:bg-gray-500 transition-colors  bg-[#D4AF37]"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-10 text-center font-bold text-sm text-black">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, 1)
                          }
                          className="p-2 hover:bg-gray-500 transition-colors bg-[#D4AF37]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-[10px] font-bold tracking-widest uppercase text-red-400 hover:text-red-600 underline underline-offset-4"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="h-fit sticky top-32">
              <div className="bg-[#0A0A0A] text-white p-8 border border-[#D4AF37]/30 shadow-2xl">

                <h2 className="text-2xl font-serif text-[#D4AF37] tracking-widest uppercase mb-8 border-b border-[#D4AF37]/20 pb-4">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-gray-400 tracking-wider">
                    <span>Subtotal</span>
                    <span>{cartTotal.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 tracking-wider">
                    <span>Royal Delivery</span>
                    <span>{shipping.toLocaleString()} EGP</span>
                  </div>
                </div>

                <div className="border-t border-[#D4AF37]/20 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-serif tracking-widest uppercase">
                      Total Amount
                    </span>
                    <span className="text-2xl text-[#D4AF37] font-bold">
                      {total.toLocaleString()} EGP
                    </span>
                  </div>
                </div>

                {/* ✅ حماية checkout */}
                <button
                  onClick={() => {
                    if (cart.length > 0) navigate("/checkout");
                  }}
                  className="w-full py-5 bg-[#D4AF37] text-black font-bold tracking-[0.3em] uppercase text-xs hover:bg-white transition-all mb-4 disabled:opacity-50"
                  disabled={cart.length === 0}
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full py-4 border border-[#D4AF37]/30 text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-[10px] hover:border-[#D4AF37] transition-all"
                >
                  Continue Shopping
                </button>

                <div className="flex flex-col items-center gap-4 mt-8 opacity-40">
                  <div className="flex gap-2 items-center">
                    <ShieldCheck size={14} className="text-[#D4AF37]" />
                    <span className="text-[9px] uppercase tracking-[0.2em]">
                      Secure Royal Encryption
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}