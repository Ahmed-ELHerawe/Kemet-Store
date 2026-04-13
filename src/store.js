// src/store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";
import img7 from "./assets/7.jpg";
import img9 from "./assets/9.webp";




const useStore = create(

 
  persist(


    
    (set, get) => ({
      // 🎨 Theme
      theme: "light",
      toggleTheme: () =>
        set({
          theme: get().theme === "light" ? "dark" : "light",
        }),
           

        

      // 🖼 Hero Images
      heroImages: [
        "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1560243563-062bff001d68?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1590768407421-eb333f273574?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52f?auto=format&fit=crop&q=80&w=600",
      ],

      // 🏷 Categories
      categories: [
        { id: 1, name: "Jewelry", titleAr: "المجوهرات الملكية", description: "Hand-crafted gold and precious stones inspired by ancient dynasties.", image:img2 , count: "42 Items" },
        { id: 2, name: "Perfumes", titleAr: "عطور الألهة", description: "Sacred scents extracted from rare Egyptian lotus and jasmine.", image: img3, count: "18 Items" },
        { id: 3, name: "Linen Wear", titleAr: "أزياء الكتان", description: "Breathable, premium Egyptian linen woven for modern comfort.", image: img4, count: "35 Items" },
        { id: 4, name: "Footwear", titleAr: "الأحذية الفاخرة", description: "Leather sandals and footwear designed with geometric precision.", image: img5, count: "24 Items" },
        { id: 5, name: "Accessories", titleAr: "الإكسسوارات", description: "Belts, scarves and amulets to complete your sovereign look.", image: img6, count: "56 Items" },
        { id: 6, name: "Handbags", titleAr: "حقائب اليد", description: "Exquisite leather work meeting timeless structural elegance.", image: img7, count: "12 Items" },
        { id: 7, name: "Home Decor", titleAr: "ديكور القصر", description: "Artifacts and home accents inspired by temple aesthetics.", image: img9, count: "29 Items" },
      ],

      // 🌟 Best Sellers
      bestSellers: [
        { id: 1, name: "Golden Pharaonic Necklace", price: 12000, categoryId: 1, description: "Exquisite gold necklace inspired by ancient pharaohs.", image: "https://spicyice.com/cdn/shop/products/D10A9955-2-1.jpg?v=1678385357" },
        { id: 2, name: "Royal Linen Robe", price: 200500,  categoryId: 3, category: "Linen Wear", description: "Pure Egyptian linen woven with gold threads. Designed for ultimate comfort and royal elegance.", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600" },
        { id: 3, name: "Sacred Scarab Ring", price: 85000, categoryId: 1, category: "Jewelry", description: "Lapis Lazuli scarab set in sterling silver. The scarab represents rebirth and protection.", image: "https://i.etsystatic.com/24717971/r/il/afde11/6511708959/il_fullxfull.6511708959_g5y0.jpg" },
        { id: 4, name: "Lotus Flower Essence", price: 1100, category: "Perfumes", description: "Concentrated oil extracted from the sacred Blue Lotus. A scent that transcends time.", image: "https://mixsoon.us/cdn/shop/files/7b40d39b70bfebc92f1a62997152ebef.jpg?v=1724656474&width=600" },
      ],
 // داخل store.js
products: [
  // Jewelry
  {
    id: 101,
    name: "Pharaoh's Gold Earrings",
    price: 22000,
    categoryId: 1,
    description: "Exquisite gold earrings inspired by ancient pharaohs.",
    image: "https://images.unsplash.com/photo-1584466977775-0a2e9a8f3a23?auto=format&fit=crop&q=80&w=600",
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1584466977775-0a2e9a8f3a23?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1584466977776-1a2e9a8f3a24?auto=format&fit=crop&q=80&w=600"
    ],
  },
  // Perfumes
  {
    id: 102,
    name: "Mystic Lotus Perfume",
    price: 900,
    categoryId: 2,
    description: "A rare Egyptian lotus perfume with ancient mystical aroma.",
    image: "https://images.unsplash.com/photo-1582095133179-938b6b3f0f60?auto=format&fit=crop&q=80&w=600",
    rating: 5,
  },
  // Linen Wear
  {
    id: 103,
    name: "Royal Linen Tunic",
    price: 3800,
    categoryId: 3,
    description: "Premium Egyptian linen tunic designed for comfort and elegance.",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600",
    rating: 4,
  },
  // Footwear
  {
    id: 104,
    name: "Sandal of the Nile",
    price: 5000,
    categoryId: 4,
    description: "Leather sandals inspired by ancient Egyptian designs.",
    image: "https://images.unsplash.com/photo-1600185363934-6e4e5fcf8c5b?auto=format&fit=crop&q=80&w=600",
    rating: 4.2,
  },
  // Accessories
  {
    id: 105,
    name: "Royal Leather Belt",
    price: 1200,
    categoryId: 5,
    description: "Handcrafted leather belt with gold accents for a regal look.",
    image: "https://images.unsplash.com/photo-1600185363936-5a4f5b1c1b3f?auto=format&fit=crop&q=80&w=600",
    rating: 4,
  },
  // Handbags
  {
    id: 106,
    name: "Cleopatra's Handbag",
    price: 7500,
    categoryId: 6,
    description: "Elegant leather handbag inspired by ancient Egyptian queens.",
    image: "https://images.unsplash.com/photo-1600185363937-7a4f5c0d1c3e?auto=format&fit=crop&q=80&w=600",
    rating: 4.3,
  },
  // Home Decor
  {
    id: 107,
    name: "Temple Candle Holder",
    price: 650,
    categoryId: 7,
    description: "Decorative candle holder inspired by ancient Egyptian temples.",
    image: "https://images.unsplash.com/photo-1584466977777-2a2e9b8f3a25?auto=format&fit=crop&q=80&w=600",
    rating: 4.1,
  },
],

getAllProducts: () => {
  const state = get();
  return [...state.bestSellers, ...(state.products || [])];
},

      // 🛒 Cart
      cartItems: [],
      addToCart: (product) => {
        const exists = get().cartItems.find(
          (item) => item.id === product.id && item.size === product.size
        );
        if (exists) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === product.id && item.size === product.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (id, size) =>
        set({
          cartItems: get().cartItems.filter((item) => !(item.id === id && item.size === size)),
        }),
      updateQuantity: (id, size, delta) =>
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item
          ),
        }),

      // 📝 Orders
      orders: [],
      submitOrder: (order) => {
        const newOrder = {
          id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
          date: new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
          status: "In Production",
          eta: "3-5 Business Days",
          ...order,
        };
        set({ orders: [newOrder, ...get().orders], cartItems: [] });
      },

      // ─────────────────────────────────────────────────────────────────────────────
// أضيف السطر ده جوا الـ store.js بعد submitOrder مباشرةً:
// ─────────────────────────────────────────────────────────────────────────────

updateOrderStatus: (id, status, confirmedBy = "") =>
  set({
    orders: get().orders.map((o) =>
      o.id === id
        ? { ...o, status, confirmedBy, eta: status === "Out for Delivery" ? "Today — In Transit" : o.eta }
        : o
    ),
  }),

// ─────────────────────────────────────────────────────────────────────────────
// وفي App.jsx أضيف الـ Route ده:
// ─────────────────────────────────────────────────────────────────────────────

// import StaffDashboard from "./user/Pages/StaffDashboard";
// <Route path="/staff" element={<StaffDashboard />} />

// ─────────────────────────────────────────────────────────────────────────────
// Default PINs لكل موظف (يقدر الأدمن يغيرهم من الـ AdminPage):
// ─────────────────────────────────────────────────────────────────────────────
// Mohamed Hassan  → PIN: 1111
// Sara Abdel      → PIN: 2222
// Karim Mostafa   → PIN: 3333
// Nour Omar       → PIN: 4444
// Amr Fathy       → PIN: 5555
// Laila Rashed    → PIN: 6666



      
addProduct:    (p)  => set({ products: [...get().products, p] }),
updateProduct: (p)  => set({ products: get().products.map(x => x.id === p.id ? p : x) }),
deleteProduct: (id) => set({ products: get().products.filter(x => x.id !== id) }),

addCategory:    (c)  => set({ categories: [...get().categories, c] }),
updateCategory: (c)  => set({ categories: get().categories.map(x => x.id === c.id ? c : x) }),
deleteCategory: (id) => set({ categories: get().categories.filter(x => x.id !== id) }),



updateOrderStatus: (id, status, confirmedBy = "") =>
  set({
    orders: get().orders.map((o) =>
      o.id === id ? { ...o, status, confirmedBy, eta: "Today — In Transit" } : o
    ),
  }),


    }),

    {
      name: "kemet-store",
    },



    
  )
  
  
);

export default useStore;