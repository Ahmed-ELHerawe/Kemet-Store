// src/Pages/OrdersPage.jsx
import React from "react";
import { Package, Truck, Clock } from "lucide-react";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

export default function OrdersPage() {
  const navigate = useNavigate();
  const orders = useStore((s) => s.orders ?? []); // ضمان مصفوفة افتراضية

  return (
    <div className="font-sans bg-[#FDFBF7] min-h-screen">

      <div className="pt-40 pb-32 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="w-16 h-[1px] bg-[#D4AF37] mb-8"></div>
          <h1 className="text-5xl font-serif text-[#0A0A0A] tracking-[0.3em] uppercase mb-4">
            Your Acquisitions
          </h1>
          <p className="text-[10px] tracking-[0.5em] text-gray-400 uppercase">
            Legacy Status & Tracking
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-32 bg-white shadow-sm border border-gray-100 rounded-lg">
            <Package size={48} className="mx-auto text-gray-200 mb-6" />
            <p className="text-gray-400 font-serif text-lg tracking-[0.2em] mb-8 uppercase">
              No artifacts claimed yet
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-10 py-4 bg-[#0A0A0A] text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#D4AF37] hover:text-black transition-all rounded-lg"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group bg-white p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/40 transition-all duration-700 rounded-xl"
              >
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  {/* Images */}
                  <div className="flex gap-4 flex-wrap w-full md:w-1/3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="w-24 h-28 border border-gray-100 p-1 overflow-hidden rounded-lg transition-all group-hover:scale-105"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-between">
                      <span className="text-[9px] font-bold text-gray-400 tracking-[0.3em] uppercase">
                        Ref ID: {order.id}
                      </span>
                      <span className="flex items-center gap-2 text-[9px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase px-3 py-1 bg-[#D4AF37]/5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                        {order.status}
                      </span>
                    </div>

                    <h3 className="text-3xl font-serif text-[#0A0A0A] uppercase tracking-widest">
                      {order.items.map((it) => it.name).join(" / ")}
                    </h3>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-50">
                      <span className="flex items-center gap-2">
                        <Clock size={14} /> Acquired: {order.date}
                      </span>
                      <span className="flex items-center gap-2 text-[#0A0A0A] font-black underline decoration-[#D4AF37] underline-offset-8">
                        {order.items.map((it) => it.price).join(" + ")} EGP
                      </span>
                    </div>
                  </div>

                  {/* ETA */}
                  <div className="w-full md:w-auto p-8 bg-[#FDFBF7] border border-[#D4AF37]/10 flex flex-col items-center justify-center text-center gap-3 rounded-lg">
                    <Truck size={24} className="text-[#D4AF37] mb-2" />
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      Expected Arrival
                    </p>
                    <p className="text-sm font-serif font-bold text-[#0A0A0A] tracking-widest italic">
                      {order.eta}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}