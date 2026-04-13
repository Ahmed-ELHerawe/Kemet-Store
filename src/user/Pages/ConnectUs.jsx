// src/Pages/ConnectUs.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Phone, MapPin, Send, MessageSquare, Lightbulb, AlertTriangle, Crown } from "lucide-react";

export default function ConnectUs() {
  const [formType, setFormType] = useState("inquiry"); // inquiry, complaint, suggestion

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("الاسم الكامل مطلوب"),
    email: Yup.string().email("بريد إلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^[0-9+\s-]{7,20}$/, "رقم هاتف غير صالح"),
    message: Yup.string().required("الرسالة مطلوبة"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form submitted:", { ...values, type: formType });
    alert("تم إرسال رسالتك بنجاح!");
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="pt-32 pb-24 bg-[#FDFBF7] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">
            Personal Concierge
          </span>
          <h1 className="text-5xl font-serif text-[#0A0A0A] tracking-widest uppercase mb-6">
            Connect with Royalty
          </h1>
          <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-12">
            {/* Location */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase mb-2">The Grand Atelier</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Old Cairo District, Al-Muizz Street,<br />Royal Court Offices, Egypt.
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase mb-2">Direct Line</h4>
                <p className="text-gray-500 text-sm tracking-widest">+20 (100) 123 4567</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Mail size={20} className="text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase mb-2">Digital Scrolls</h4>
                <p className="text-gray-500 text-sm">roy0alty@kemetboutique.com</p>
              </div>
            </div>

            {/* Hours */}
            <div className="p-8 bg-white border border-[#D4AF37]/10 shadow-sm">
              <h4 className="font-serif text-[#D4AF37] mb-4 text-lg flex items-center gap-2">
                <Crown size={18} /> Hours of Service
              </h4>
              <div className="space-y-2 text-xs text-gray-500 uppercase tracking-widest">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span>Sunday - Thursday</span>
                  <span>10AM - 10PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span>Friday</span>
                  <span className="text-[#D4AF37]">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>12PM - 8PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#D4AF37]/10 p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Crown size={120} />
              </div>

              {/* Type Selector */}
              <div className="grid grid-cols-3 gap-4 mb-12 relative z-10">
                <button
                  type="button"
                  onClick={() => setFormType("inquiry")}
                  className={`flex flex-col items-center gap-3 p-4 border transition-all duration-500 ${
                    formType === "inquiry"
                      ? "border-[#D4AF37] bg-[#FDFBF7] shadow-inner"
                      : "border-gray-100 opacity-50 hover:opacity-100"
                  }`}
                >
                  <MessageSquare size={18} className="text-[#D4AF37]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">استفسار</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormType("complaint")}
                  className={`flex flex-col items-center gap-3 p-4 border transition-all duration-500  ${
                    formType === "complaint"
                      ? "border-[#D4AF37] bg-[#FFF5F5] shadow-inner"
                      : "border-gray-100 opacity-50 hover:opacity-100"
                  }`}
                >
                  <AlertTriangle size={18} className="text-red-800" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">شكوى</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormType("suggestion")}
                  className={`flex flex-col items-center gap-3 p-4 border transition-all duration-500 ${
                    formType === "suggestion"
                      ? "border-[#D4AF37] bg-[#F0FDF4] shadow-inner"
                      : "border-gray-100 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Lightbulb size={18} className="text-green-800" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">مقترح</span>
                </button>
              </div>

              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form className="space-y-8 relative z-10" dir="rtl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">الاسم الكامل</label>
                        <Field
                          name="fullName"
                          type="text"
                          placeholder="اكتب اسمك هنا..."
                          className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none transition-all font-light placeholder-gray-300"
                        />
                        <div className="text-xs text-red-500 mt-1">
                          <ErrorMessage name="fullName" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">البريد الإلكتروني</label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="example@kemet.com"
                          dir="ltr"
                          className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none transition-all font-light placeholder-gray-300"
                        />
                        <div className="text-xs text-red-500 mt-1">
                          <ErrorMessage name="email" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">رقم الهاتف</label>
                      <Field
                        name="phone"
                        type="tel"
                        placeholder="+20 000 000 0000"
                        dir="ltr"
                        className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none transition-all font-light placeholder-gray-300"
                      />
                      <div className="text-xs text-red-500 mt-1">
                        <ErrorMessage name="phone" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                        {formType === "inquiry"
                          ? "الرسالة أو الاستفسار"
                          : formType === "complaint"
                          ? "تفاصيل الشكوى"
                          : "مقترحك لتطوير كيميت"}
                      </label>
                      <Field
                        as="textarea"
                        name="message"
                        rows="4"
                        placeholder="اكتب تفاصيلك هنا بكل وضوح..."
                        className="w-full bg-transparent border border-gray-100 p-4 focus:border-[#D4AF37] outline-none transition-all font-light text-sm placeholder-gray-300"
                      />
                      <div className="text-xs text-red-500 mt-1">
                        <ErrorMessage name="message" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-[#0A0A0A] text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-3 group border border-[#D4AF37]/20"
                    >
                      إرسال إلى ديوان كيميت
                      <Send size={16} className="group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] transition-transform" />
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}