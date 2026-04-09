// src/Pages/CheckoutPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Crown, Phone, MapPin, Star, MessageSquare, ChevronRight } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useStore from "../store"; // src/store.js

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct || null;

  const cartItems = useStore((s) => s.cartItems);
  const submitOrder = useStore((s) => s.submitOrder);

  const items = cartItems.length > 0 ? cartItems : selectedProduct ? [{ ...selectedProduct, quantity: 1 }] : [];

  const calcTotal = (list) =>
    list.reduce((sum, it) => {
      const price = typeof it.price === "number" ? it.price : Number(String(it.price).replace(/,/g, "").replace(/\s?EGP/i, "")) || 0;
      return sum + price * (it.quantity || 1);
    }, 0);

  const initialValues = {
    firstName: "",
    lastName: "",
    primaryMobile: "",
    secondaryMobile: "",
    address: "",
    landmark: "",
    paymentMethod: "Royal Courier (Cash on Delivery)",
    notes: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("اسم العائلة مطلوب"),
    primaryMobile: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^[0-9+\s-]{7,20}$/, "رقم هاتف غير صالح"),
    address: Yup.string().required("العنوان مطلوب"),
    paymentMethod: Yup.string().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (items.length === 0) {
      alert("لا توجد عناصر للدفع.");
      setSubmitting(false);
      return;
    }

    const order = {
      customerName: `${values.firstName} ${values.lastName}`,
      primaryMobile: values.primaryMobile,
      secondaryMobile: values.secondaryMobile,
      address: values.address,
      landmark: values.landmark,
      paymentMethod: values.paymentMethod,
      notes: values.notes,
      items,
      total: calcTotal(items),
    };

    submitOrder(order);
    setSubmitting(false);
    navigate("/orders");
  };

  const InputField = ({ name, label, type = "text", icon: Icon }) => (
    <div className="relative group w-full mb-6">
      <label className="absolute left-0 transition-all duration-300 text-[10px] text-[#D4AF37] tracking-[0.2em] font-bold uppercase -top-6">
        {Icon && <Icon size={12} className="inline-block mr-2 text-[#D4AF37]" />}
        {label}
      </label>
      <Field
        name={name}
        type={type}
        className="w-full py-4 bg-transparent border-b border-gray-200 focus:border-[#D4AF37] outline-none transition-all duration-300 text-sm font-light text-gray-800"
      />
      <div className="text-xs text-red-500 mt-1">
        <ErrorMessage name={name} />
      </div>
    </div>
  );

  return (
    <div className="pt-40 pb-32 bg-[#FDFBF7] min-h-screen" dir="ltr">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <Crown size={32} className="text-[#D4AF37] mb-6" />
          <h1 className="text-4xl font-serif text-[#0A0A0A] tracking-[0.3em] uppercase mb-4">Secure Checkout</h1>
          <div className="h-[1px] w-24 bg-[#D4AF37]"></div>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8">
                <div className="bg-white p-10 md:p-16 shadow-sm border border-gray-100">
                  <section className="mb-12">
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-8 flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[10px] italic">01</span>
                      Recipient Identity
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                      <InputField name="firstName" label="First Name" />
                      <InputField name="lastName" label="Last Name" />
                      <InputField name="primaryMobile" label="Primary Mobile" type="tel" icon={Phone} />
                      <InputField name="secondaryMobile" label="Secondary Mobile" type="tel" icon={Phone} />
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-8 flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[10px] italic">02</span>
                      Acquisition Destination
                    </h2>

                    <InputField name="address" label="Full Address / Location Link" icon={MapPin} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                      <InputField name="landmark" label="Distinct Landmark" icon={Star} />
                      <div className="relative mb-6">
                        <label className="absolute -top-6 left-0 text-[10px] text-[#D4AF37] tracking-[0.2em] font-bold uppercase">Payment Methodology</label>
                        <Field
                          as="select"
                          name="paymentMethod"
                          className="w-full py-4 bg-transparent border-b border-gray-200 focus:border-[#D4AF37] outline-none transition-all text-sm font-light appearance-none text-gray-700 cursor-pointer"
                        >
                          <option>Royal Courier (Cash on Delivery)</option>
                          <option>Digital Vault (Credit / Debit Card)</option>
                          <option>Instant Transfer (InstaPay / Wallet)</option>
                        </Field>
                        <ChevronRight size={14} className="absolute right-0 top-4 rotate-90 text-gray-300 pointer-events-none" />
                        <div className="text-xs text-red-500 mt-1">
                          <ErrorMessage name="paymentMethod" />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-[10px] text-[#D4AF37] tracking-[0.2em] font-bold uppercase mb-2">Personal Notes for Messenger</label>
                      <Field
                        as="textarea"
                        name="notes"
                        rows="3"
                        className="w-full py-3 bg-transparent border border-gray-200 focus:border-[#D4AF37] outline-none transition-all text-sm font-light text-gray-800"
                      />
                    </div>
                  </section>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-[#0A0A0A] p-10 text-[#D4AF37] shadow-2xl sticky top-40 border-t-4 border-[#D4AF37]">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 border-b border-[#D4AF37]/20 pb-4">Artifact Summary</h3>

                  {items.length > 0 ? (
                    <>
                      {items.map((it, idx) => (
                        <div key={idx} className="flex gap-6 mb-6 items-center">
                          <div className="w-20 h-24 bg-white/5 p-1 border border-white/10 shrink-0">
                            <img src={it.image} className="w-full h-full object-cover opacity-80" alt={it.name || it.title} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white leading-relaxed">{it.name}</p>
                            <p className="text-lg font-serif mt-1">{typeof it.price === "number" ? `${it.price} EGP` : it.price}</p>
                            <p className="text-[10px] text-gray-400">Qty: {it.quantity || 1}</p>
                          </div>
                        </div>
                      ))}

                      <div className="space-y-5 mb-6 text-[10px] tracking-[0.2em] uppercase">
                        <div className="flex justify-between font-light">
                          <span className="text-gray-500">Subtotal</span>
                          <span className="text-white">{calcTotal(items)} EGP</span>
                        </div>
                        <div className="flex justify-between font-light">
                          <span className="text-gray-500">Sovereign Shipping</span>
                          <span className="text-green-500 font-bold">Complimentary</span>
                        </div>
                        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                          <span className="text-gray-400">Total</span>
                          <span className="text-2xl font-serif text-white">{calcTotal(items)} EGP</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-[#D4AF37] text-black font-black text-[11px] tracking-[0.4em] uppercase hover:bg-white transition-all duration-500 shadow-xl"
                      >
                        Commit to Purchase
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-gray-300">No items selected.</p>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
