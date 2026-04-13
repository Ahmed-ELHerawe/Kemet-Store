// src/user/Pages/AdminPage.jsx
import React, { useState, useMemo } from "react";
import useStore from "../../store";

// ─── Icons (inline SVG to avoid extra deps) ────────────────────────────────
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const ICrown    = () => <Icon size={20} d="M2 20h20M5 20V9l7-6 7 6v11M9 20v-6h6v6" />;
const IDash     = () => <Icon d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />;
const IBox      = () => <Icon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />;
const ITag      = () => <Icon d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />;
const IOrders   = () => <Icon d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />;
const IMail     = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />;
const IUsers    = () => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />;
const IPlus     = () => <Icon d="M12 5v14M5 12h14" />;
const IEdit     = () => <Icon d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />;
const ITrash    = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
const IClose    = () => <Icon d="M18 6L6 18M6 6l12 12" />;
const ITruck    = () => <Icon d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m0 0h3l3 4v4h-3m-3 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0M3 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />;
const ISearch   = () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
const IStar     = () => <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;

// ─── Styles ─────────────────────────────────────────────────────────────────
const S = {
  root: { display:"flex", minHeight:"100vh", background:"#0A0A0A", fontFamily:"'Georgia',serif", color:"#fff" },
  sidebar: { width:220, minHeight:"100vh", background:"#0D0D0D", borderRight:"1px solid rgba(212,175,55,0.15)", display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, zIndex:50 },
  logo: { padding:"24px 20px", borderBottom:"1px solid rgba(212,175,55,0.12)", display:"flex", alignItems:"center", gap:10 },
  logoText: { fontSize:18, fontWeight:"bold", color:"#D4AF37", letterSpacing:4 },
  navSection: { padding:"8px 20px", fontSize:8, letterSpacing:3, color:"#3a3a3a", textTransform:"uppercase", marginTop:12 },
  main: { marginLeft:220, padding:"32px 36px", flex:1, minHeight:"100vh" },
  topbar: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28, paddingBottom:20, borderBottom:"1px solid rgba(212,175,55,0.1)" },
  pageTitle: { fontSize:20, color:"#D4AF37", letterSpacing:4, textTransform:"uppercase", fontStyle:"italic", display:"flex", alignItems:"center", gap:10 },
  statsGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 },
  statCard: { background:"#111", border:"1px solid rgba(212,175,55,0.12)", padding:"18px 20px", position:"relative", overflow:"hidden" },
  statLabel: { fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"#555", marginBottom:8 },
  statVal: { fontSize:26, color:"#D4AF37", fontWeight:"bold" },
  statSub: { fontSize:9, color:"#555", marginTop:3, letterSpacing:1 },
  section: { background:"#0F0F0F", border:"1px solid rgba(212,175,55,0.1)", padding:"22px 24px", marginBottom:20 },
  sectionHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, paddingBottom:12, borderBottom:"1px solid rgba(212,175,55,0.1)" },
  sectionTitle: { fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"#D4AF37" },
  table: { width:"100%", borderCollapse:"collapse", fontSize:12 },
  th: { textAlign:"left", padding:"9px 12px", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"#444", borderBottom:"1px solid rgba(212,175,55,0.1)" },
  td: { padding:"11px 12px", borderBottom:"1px solid rgba(255,255,255,0.03)", verticalAlign:"middle" },
  badge: (type) => ({ padding:"3px 10px", fontSize:8, letterSpacing:2, textTransform:"uppercase", fontWeight:"bold",
    background: type==="active"?"rgba(40,160,80,0.12)":type==="pending"?"rgba(212,175,55,0.1)":"rgba(200,50,50,0.1)",
    color:       type==="active"?"#5ecb85":type==="pending"?"#D4AF37":"#e07070",
    border:`1px solid ${type==="active"?"rgba(40,160,80,0.25)":type==="pending"?"rgba(212,175,55,0.25)":"rgba(200,50,50,0.25)"}` }),
  btnGold: { background:"#D4AF37", color:"#0A0A0A", border:"none", padding:"8px 18px", fontSize:9, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"Georgia,serif", fontWeight:"bold", display:"flex", alignItems:"center", gap:6 },
  btnOutline: { background:"transparent", border:"1px solid rgba(212,175,55,0.35)", color:"#D4AF37", padding:"8px 16px", fontSize:9, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"Georgia,serif" },
  btnEdit: { background:"transparent", border:"1px solid rgba(212,175,55,0.25)", color:"#D4AF37", padding:"5px 10px", fontSize:9, cursor:"pointer", fontFamily:"Georgia,serif" },
  btnDanger: { background:"transparent", border:"1px solid rgba(200,50,50,0.3)", color:"#e07070", padding:"5px 10px", fontSize:9, cursor:"pointer", fontFamily:"Georgia,serif" },
  prodImg: { width:38, height:48, objectFit:"cover", border:"1px solid rgba(212,175,55,0.2)" },
  initials: (color="#D4AF37") => ({ width:36, height:36, borderRadius:"50%", background:"rgba(212,175,55,0.1)", border:"1px solid rgba(212,175,55,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color, fontWeight:"bold", flexShrink:0 }),
  salaryBar: { height:3, background:"rgba(212,175,55,0.12)", marginTop:5, borderRadius:2, overflow:"hidden" },
  salaryFill: (pct) => ({ height:"100%", background:"#D4AF37", width:`${pct}%`, borderRadius:2 }),
  input: { width:"100%", background:"transparent", border:"none", borderBottom:"1px solid rgba(212,175,55,0.2)", padding:"8px 0", color:"#fff", fontSize:13, outline:"none", fontFamily:"Georgia,serif" },
  select: { width:"100%", background:"#0F0F0F", border:"none", borderBottom:"1px solid rgba(212,175,55,0.2)", padding:"8px 0", color:"#fff", fontSize:13, outline:"none", fontFamily:"Georgia,serif" },
  label: { display:"block", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"#888", marginBottom:6 },
  formRow: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 },
  formGroup: { marginBottom:18 },
  searchInput: { background:"transparent", border:"1px solid rgba(212,175,55,0.2)", color:"#fff", padding:"7px 12px", fontSize:11, outline:"none", fontFamily:"Georgia,serif", width:200 },
  inboxRow: { padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer" },
  dot: (unread) => ({ width:7, height:7, borderRadius:"50%", background: unread?"#D4AF37":"#2a2a2a", marginTop:5, flexShrink:0 }),
};

// ─── Nav Item ────────────────────────────────────────────────────────────────
function NavItem({ icon, label, page, active, onClick, badge }) {
  return (
    <div onClick={() => onClick(page)} style={{
      display:"flex", alignItems:"center", gap:11, padding:"12px 20px",
      cursor:"pointer", fontSize:11, letterSpacing:2, textTransform:"uppercase",
      color: active ? "#D4AF37" : "#555",
      background: active ? "rgba(212,175,55,0.06)" : "transparent",
      borderLeft: active ? "2px solid #D4AF37" : "2px solid transparent",
      transition:"all 0.25s"
    }}>
      {icon}
      <span style={{ flex:1 }}>{label}</span>
      {badge > 0 && <span style={{ background:"#D4AF37", color:"#0A0A0A", fontSize:8, fontWeight:"bold", padding:"1px 5px", borderRadius:8 }}>{badge}</span>}
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:200,
      display:"flex", alignItems:"center", justifyContent:"center"
    }}>
      <div style={{ background:"#0F0F0F", border:"1px solid rgba(212,175,55,0.2)", padding:32, width:560, maxWidth:"95vw", maxHeight:"90vh", overflowY:"auto", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:"#555", cursor:"pointer" }}><IClose /></button>
        <div style={{ fontSize:12, letterSpacing:3, textTransform:"uppercase", color:"#D4AF37", marginBottom:22, paddingBottom:12, borderBottom:"1px solid rgba(212,175,55,0.12)" }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

// ─── Form helpers ────────────────────────────────────────────────────────────
function FG({ label, children }) {
  return <div style={S.formGroup}><label style={S.label}>{label}</label>{children}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [page, setPage] = useState("dashboard");
  const [modal, setModal] = useState(null); // "add-product"|"edit-product"|"add-cat"|"edit-cat"|"add-staff"|"edit-staff"
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch] = useState("");

  // ── Store ──
  const { products = [], bestSellers = [], categories = [], orders = [],
          addProduct, updateProduct, deleteProduct,
          addCategory, updateCategory, deleteCategory } = useStore();

  const allProducts = useMemo(() => [...bestSellers, ...products], [bestSellers, products]);

  // ── Local staff state (not in store) ──
  const [staff, setStaff] = useState([
    { id:1, name:"Mohamed Hassan", role:"Store Manager",   phone:"+20 100 111 2222", email:"m.hassan@kemet.com",  salary:18000, hours:48, city:"Cairo",      paid:true },
    { id:2, name:"Sara Abdel",     role:"Designer",        phone:"+20 101 222 3333", email:"s.abdel@kemet.com",   salary:14000, hours:40, city:"Giza",       paid:true },
    { id:3, name:"Karim Mostafa",  role:"Delivery Coord.", phone:"+20 102 333 4444", email:"k.mostafa@kemet.com", salary:10000, hours:44, city:"Alexandria", paid:false },
    { id:4, name:"Nour Omar",      role:"Customer Service",phone:"+20 103 444 5555", email:"n.omar@kemet.com",    salary:9000,  hours:38, city:"Cairo",      paid:true },
    { id:5, name:"Amr Fathy",      role:"Photographer",   phone:"+20 104 555 6666", email:"a.fathy@kemet.com",   salary:12000, hours:35, city:"Giza",       paid:false },
    { id:6, name:"Laila Rashed",   role:"Social Media",   phone:"+20 105 666 7777", email:"l.rashed@kemet.com",  salary:8000,  hours:36, city:"Cairo",      paid:true },
  ]);

  // ── Inbox ──
  const [inbox] = useState([
    { id:1, from:"Layla Hassan",  email:"layla@gmail.com",      type:"Inquiry",        msg:"السلام عليكم، أريد الاستفسار عن إمكانية شحن المجوهرات إلى خارج مصر وتكلفة الشحن الدولي.", date:"Apr 11, 2026", read:false },
    { id:2, from:"Ahmed Nour",    email:"ahmed.n@hotmail.com",  type:"Return Request", msg:"مرحباً، اشتريت Royal Linen Robe ولكنه لا يناسب المقاس. أريد طلب إرجاع أو استبدال.", date:"Apr 10, 2026", read:false },
    { id:3, from:"Sara El-Din",   email:"sara.e@yahoo.com",     type:"Suggestion",     msg:"اقتراح بإضافة منتجات من الفضة المصرية القديمة، أعتقد ستكون إضافة رائعة للمجموعة.", date:"Apr 9, 2026", read:true },
    { id:4, from:"Omar Farid",    email:"omar.f@gmail.com",     type:"Complaint",      msg:"الطلب رقم ORD-47818 تأخر أكثر من المدة المحددة. أرجو المتابعة والإسراع في التسليم.", date:"Apr 8, 2026", read:true },
    { id:5, from:"Nadia Mostafa", email:"nadia.m@gmail.com",    type:"Inquiry",        msg:"أريد معرفة مقاس XL في الـ Linen Robe. هل يناسب مقاس 44؟ وما هي مقاييس المنتج؟", date:"Apr 7, 2026", read:false },
  ]);
  const [activeMsg, setActiveMsg] = useState(null);

  // ── Form state ──
  const emptyProduct = { name:"", price:"", categoryId:"", description:"", image:"", rating:"", sizes:"S,M,L,XL" };
  const emptyCat     = { name:"", titleAr:"", description:"", image:"", count:"" };
  const emptyStaff   = { name:"", role:"", phone:"", email:"", salary:"", hours:"", city:"", paid:false };
  const [form, setForm] = useState({});
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openAdd = (type) => { setForm(type==="product"?{...emptyProduct}:type==="cat"?{...emptyCat}:{...emptyStaff}); setModal("add-"+type); };
  const openEdit = (type, item) => { setEditTarget(item); setForm({...item, sizes:(item.images||[]).join(",")||"S,M,L,XL"}); setModal("edit-"+type); };

  // ── CRUD ──
  const handleSaveProduct = () => {
    const p = { ...form, price: Number(form.price), rating: Number(form.rating)||0, id: Date.now(), categoryId: Number(form.categoryId)||0 };
    addProduct(p); setModal(null);
  };
  const handleUpdateProduct = () => {
    updateProduct({ ...editTarget, ...form, price: Number(form.price), rating: Number(form.rating)||0, categoryId: Number(form.categoryId)||0 });
    setModal(null);
  };
  const handleSaveCat = () => {
    addCategory({ ...form, id: Date.now() }); setModal(null);
  };
  const handleUpdateCat = () => {
    updateCategory({ ...editTarget, ...form }); setModal(null);
  };
  const handleSaveStaff = () => {
    setStaff(s => [...s, { ...form, id: Date.now(), salary: Number(form.salary), hours: Number(form.hours) }]);
    setModal(null);
  };
  const handleUpdateStaff = () => {
    setStaff(s => s.map(m => m.id===editTarget.id ? { ...m, ...form, salary:Number(form.salary), hours:Number(form.hours) } : m));
    setModal(null);
  };

  // ── Filtered ──
  const filteredProducts = allProducts.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
  const filteredStaff    = staff.filter(s => s.name?.toLowerCase().includes(search.toLowerCase()) || s.role?.toLowerCase().includes(search.toLowerCase()));

  // ── Stats ──
  const totalRevenue = orders.reduce((s,o) => s + (o.total||0), 0);
  const totalPayroll = staff.reduce((s,m) => s + m.salary, 0);
  const maxSalary    = Math.max(...staff.map(m => m.salary), 1);

  // ── initials ──
  const initials = (name="") => name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  // ── getCatName ──
  const getCatName = (id) => categories.find(c=>c.id===Number(id))?.name || "—";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      {/* ── SIDEBAR ── */}
      <div style={S.sidebar}>
        <div style={S.logo}>
          <span style={{ fontSize:22, color:"#D4AF37" }}>♛</span>
          <span style={S.logoText}>KEMET</span>
        </div>
        <div style={{ flex:1, paddingBottom:16 }}>
          <div style={S.navSection}>Overview</div>
          <NavItem icon={<IDash />}   label="Dashboard" page="dashboard" active={page==="dashboard"} onClick={setPage} />
          <div style={S.navSection}>Catalog</div>
          <NavItem icon={<IBox />}    label="Products"  page="products"  active={page==="products"}  onClick={setPage} />
          <NavItem icon={<ITag />}    label="Categories"page="categories"active={page==="categories"}onClick={setPage} />
          <div style={S.navSection}>Operations</div>
          <NavItem icon={<IOrders />} label="Orders"    page="orders"    active={page==="orders"}    onClick={setPage} badge={orders.filter(o=>o.status==="In Production").length} />
          <NavItem icon={<IMail />}   label="Inbox"     page="inbox"     active={page==="inbox"}     onClick={setPage} badge={inbox.filter(m=>!m.read).length} />
          <div style={S.navSection}>Team</div>
          <NavItem icon={<IUsers />}  label="Staff"     page="staff"     active={page==="staff"}     onClick={setPage} />
        </div>
        <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(212,175,55,0.1)", display:"flex", alignItems:"center", gap:10 }}>
          <div style={S.initials()}>{initials("Admin Owner")}</div>
          <div><div style={{ fontSize:10, color:"#D4AF37", letterSpacing:1 }}>Admin</div><div style={{ fontSize:9, color:"#444" }}>Owner</div></div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={S.main}>

        {/* ════════════ DASHBOARD ════════════ */}
        {page==="dashboard" && (<>
          <div style={S.topbar}>
            <div style={S.pageTitle}><ICrown /> Royal Dashboard</div>
            <div style={{ fontSize:10, color:"#444", letterSpacing:2 }}>KEMET BOUTIQUE — OWNER PANEL</div>
          </div>
          <div style={S.statsGrid}>
            {[
              { label:"Total Revenue", val:`${totalRevenue.toLocaleString()} EGP`, sub:"from all orders" },
              { label:"Total Orders",  val:orders.length,       sub:"all time" },
              { label:"Products",      val:allProducts.length,  sub:`across ${categories.length} categories` },
              { label:"Staff Members", val:staff.length,        sub:`${staff.filter(s=>s.paid).length} paid this month` },
            ].map(c=>(
              <div key={c.label} style={S.statCard}>
                <div style={{ position:"absolute", top:8, left:8, width:10, height:10, borderTop:"1px solid rgba(212,175,55,0.3)", borderLeft:"1px solid rgba(212,175,55,0.3)" }}/>
                <div style={S.statLabel}>{c.label}</div>
                <div style={S.statVal}>{c.val}</div>
                <div style={{ ...S.statSub, color:"#D4AF37" }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            <div style={S.section}>
              <div style={S.sectionHeader}><span style={S.sectionTitle}>Recent Orders</span><button style={S.btnOutline} onClick={()=>setPage("orders")}>View All</button></div>
              {orders.length===0 ? <div style={{ color:"#333", fontSize:11, padding:"20px 0", textAlign:"center", letterSpacing:2 }}>No orders yet</div> : (
                <table style={S.table}>
                  <thead><tr><th style={S.th}>Ref</th><th style={S.th}>Customer</th><th style={S.th}>Total</th><th style={S.th}>Status</th></tr></thead>
                  <tbody>{orders.slice(0,5).map(o=>(
                    <tr key={o.id}>
                      <td style={{ ...S.td, color:"#D4AF37", fontSize:10 }}>{o.id}</td>
                      <td style={S.td}>{o.customerName}</td>
                      <td style={{ ...S.td, color:"#D4AF37" }}>{(o.total||0).toLocaleString()} EGP</td>
                      <td style={S.td}><span style={S.badge(o.status==="Delivered"?"active":"pending")}>{o.status}</span></td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </div>
            <div style={S.section}>
              <div style={S.sectionHeader}><span style={S.sectionTitle}>User Emails</span><button style={S.btnOutline} onClick={()=>setPage("inbox")}>View All</button></div>
              {inbox.map(m=>(
                <div key={m.id} style={S.inboxRow} onClick={()=>{setPage("inbox");setActiveMsg(m)}}>
                  <div style={S.dot(!m.read)} />
                  <div>
                    <div style={{ fontSize:12, color: m.read?"#666":"#ccc" }}>{m.email}</div>
                    <div style={{ fontSize:10, color:"#444", marginTop:3 }}>{m.msg.slice(0,40)}...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>)}

        {/* ════════════ PRODUCTS ════════════ */}
        {page==="products" && (<>
          <div style={S.topbar}>
            <div style={S.pageTitle}><IBox /> Products</div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", color:"#555" }}><ISearch /></span>
                <input style={{ ...S.searchInput, paddingLeft:32 }} placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <button style={S.btnGold} onClick={()=>openAdd("product")}><IPlus /> Add Product</button>
            </div>
          </div>
          <div style={S.section}>
            <table style={S.table}>
              <thead><tr>
                <th style={S.th}>Image</th><th style={S.th}>Name</th><th style={S.th}>Category</th>
                <th style={S.th}>Price</th><th style={S.th}>Rating</th><th style={S.th}>Actions</th>
              </tr></thead>
              <tbody>{filteredProducts.map(p=>(
                <tr key={p.id} style={{ transition:"background 0.2s" }}>
                  <td style={S.td}><img src={p.image} alt={p.name} style={S.prodImg} onError={e=>e.target.style.opacity=0.2} /></td>
                  <td style={S.td}><div style={{ color:"#D4AF37", fontSize:12 }}>{p.name}</div><div style={{ fontSize:9, color:"#444", marginTop:2 }}>ID: {p.id}</div></td>
                  <td style={S.td}><span style={{ fontSize:10, color:"#888" }}>{getCatName(p.categoryId)}</span></td>
                  <td style={{ ...S.td, color:"#D4AF37" }}>{(p.price||0).toLocaleString()} EGP</td>
                  <td style={S.td}><span style={{ color:"#D4AF37", fontSize:11 }}>★ {p.rating||0}</span></td>
                  <td style={S.td}>
                    <button style={S.btnEdit} onClick={()=>openEdit("product",p)}><IEdit /></button>{" "}
                    <button style={S.btnDanger} onClick={()=>deleteProduct(p.id)}><ITrash /></button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
            {filteredProducts.length===0 && <div style={{ textAlign:"center", padding:"30px 0", color:"#333", fontSize:11, letterSpacing:2 }}>NO PRODUCTS FOUND</div>}
          </div>
        </>)}

        {/* ════════════ CATEGORIES ════════════ */}
        {page==="categories" && (<>
          <div style={S.topbar}>
            <div style={S.pageTitle}><ITag /> Categories</div>
            <button style={S.btnGold} onClick={()=>openAdd("cat")}><IPlus /> Add Category</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {categories.map(c=>(
              <div key={c.id} style={{ ...S.section, padding:0, overflow:"hidden", position:"relative" }}>
                <div style={{ position:"absolute", top:8, left:8, width:10, height:10, borderTop:"1px solid rgba(212,175,55,0.3)", borderLeft:"1px solid rgba(212,175,55,0.3)", zIndex:2 }}/>
                <img src={c.image} alt={c.name} style={{ width:"100%", height:130, objectFit:"cover", opacity:0.45, display:"block" }} />
                <div style={{ padding:"14px 16px" }}>
                  <div style={{ fontSize:13, color:"#D4AF37", letterSpacing:2, textTransform:"uppercase" }}>{c.name}</div>
                  <div style={{ fontSize:9, color:"#555", marginTop:4, letterSpacing:1 }}>{c.titleAr} · {c.count}</div>
                  <div style={{ fontSize:10, color:"#444", marginTop:6, lineHeight:1.5 }}>{c.description}</div>
                  <div style={{ display:"flex", gap:8, marginTop:14 }}>
                    <button style={S.btnEdit} onClick={()=>openEdit("cat",c)}>Edit</button>
                    <button style={S.btnDanger} onClick={()=>deleteCategory(c.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ ...S.section, padding:0, overflow:"hidden", cursor:"pointer", display:"flex", flexDirection:"column" }} onClick={()=>openAdd("cat")}>
              <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", height:130, background:"#111", color:"#2a2a2a", fontSize:40 }}>+</div>
              <div style={{ padding:"14px 16px" }}>
                <div style={{ fontSize:13, color:"#444", letterSpacing:2, textTransform:"uppercase" }}>New Category</div>
                <div style={{ fontSize:9, color:"#333", marginTop:4 }}>Expand the dynasty</div>
              </div>
            </div>
          </div>
        </>)}

        {/* ════════════ ORDERS ════════════ */}
        {page==="orders" && (<>
          <div style={S.topbar}>
            <div style={S.pageTitle}><IOrders /> Orders</div>
            <input style={S.searchInput} placeholder="Search orders..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
            {[
              { label:"Pending",   val:orders.filter(o=>o.status==="In Production").length, color:"#D4AF37" },
              { label:"Delivered", val:orders.filter(o=>o.status==="Delivered").length,     color:"#5ecb85" },
              { label:"Total",     val:orders.length,                                        color:"#D4AF37" },
              { label:"Revenue",   val:`${totalRevenue.toLocaleString()} EGP`,               color:"#D4AF37" },
            ].map(c=>(
              <div key={c.label} style={S.statCard}>
                <div style={S.statLabel}>{c.label}</div>
                <div style={{ ...S.statVal, fontSize:20, color:c.color }}>{c.val}</div>
              </div>
            ))}
          </div>
          <div style={S.section}>
            {orders.length===0 ? <div style={{ textAlign:"center", padding:40, color:"#333", fontSize:11, letterSpacing:2 }}>NO ORDERS YET</div> : (
              <table style={S.table}>
                <thead><tr>
                  <th style={S.th}>Ref ID</th><th style={S.th}>Customer</th><th style={S.th}>Phone</th>
                  <th style={S.th}>Items</th><th style={S.th}>Total</th><th style={S.th}>Date</th><th style={S.th}>Status</th>
                </tr></thead>
                <tbody>{orders.filter(o=>
                  !search || o.id?.toLowerCase().includes(search.toLowerCase()) || o.customerName?.toLowerCase().includes(search.toLowerCase())
                ).map(o=>(
                  <tr key={o.id}>
                    <td style={{ ...S.td, color:"#D4AF37", fontSize:10 }}>{o.id}</td>
                    <td style={S.td}>{o.customerName}</td>
                    <td style={{ ...S.td, fontSize:10, color:"#777" }}>{o.primaryMobile}</td>
                    <td style={{ ...S.td, fontSize:10, color:"#888" }}>{o.items?.length||0} item(s)</td>
                    <td style={{ ...S.td, color:"#D4AF37" }}>{(o.total||0).toLocaleString()} EGP</td>
                    <td style={{ ...S.td, fontSize:10, color:"#555" }}>{o.date}</td>
                    <td style={S.td}><span style={S.badge(o.status==="Delivered"?"active":"pending")}>{o.status}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            )}
          </div>
        </>)}

        {/* ════════════ INBOX ════════════ */}
        {page==="inbox" && (<>
          <div style={S.topbar}>
            <div style={S.pageTitle}><IMail /> Inbox</div>
            <div style={{ fontSize:10, color:"#D4AF37", letterSpacing:2 }}>{inbox.filter(m=>!m.read).length} UNREAD</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:20 }}>
            <div style={{ ...S.section, padding:0 }}>
              <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(212,175,55,0.1)", fontSize:9, letterSpacing:3, color:"#D4AF37", textTransform:"uppercase" }}>Messages</div>
              {inbox.map(m=>(
                <div key={m.id} style={{ ...S.inboxRow, padding:"13px 18px", background: activeMsg?.id===m.id?"rgba(212,175,55,0.05)":"transparent" }} onClick={()=>setActiveMsg(m)}>
                  <div style={S.dot(!m.read)} />
                  <div>
                    <div style={{ fontSize:11, color: m.read?"#666":"#ccc" }}>{m.from}</div>
                    <div style={{ fontSize:9, color:"#444", marginTop:2 }}>{m.email}</div>
                    <div style={{ fontSize:9, color:"#333", marginTop:4 }}>{m.msg.slice(0,35)}...</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={S.section}>
              {!activeMsg ? (
                <div style={{ textAlign:"center", padding:"60px 0", color:"#2a2a2a", fontSize:11, letterSpacing:3, textTransform:"uppercase" }}>Select a message</div>
              ) : (<>
                <div style={{ marginBottom:18, paddingBottom:14, borderBottom:"1px solid rgba(212,175,55,0.1)", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontSize:15, color:"#D4AF37", marginBottom:4 }}>{activeMsg.from}</div>
                    <div style={{ fontSize:10, color:"#555" }}>{activeMsg.email}</div>
                    <div style={{ fontSize:9, color:"#444", marginTop:4 }}>{activeMsg.date}</div>
                  </div>
                  <span style={{ ...S.badge("pending"), fontSize:8 }}>{activeMsg.type}</span>
                </div>
                <div style={{ fontSize:13, color:"#bbb", lineHeight:2, direction:"rtl", textAlign:"right" }}>{activeMsg.msg}</div>
                <div style={{ display:"flex", gap:10, marginTop:24 }}>
                  <button style={S.btnGold}>Reply</button>
                  <button style={S.btnOutline}>Mark as Read</button>
                </div>
              </>)}
            </div>
          </div>
        </>)}

        {/* ════════════ STAFF ════════════ */}
        {page==="staff" && (<>
          <div style={S.topbar}>
            <div style={S.pageTitle}><IUsers /> Staff Management</div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <input style={S.searchInput} placeholder="Search staff..." value={search} onChange={e=>setSearch(e.target.value)} />
              <button style={S.btnGold} onClick={()=>openAdd("staff")}><IPlus /> Add Member</button>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 }}>
            {[
              { label:"Total Staff",    val:staff.length },
              { label:"Monthly Payroll",val:`${totalPayroll.toLocaleString()} EGP` },
              { label:"Avg Hours/Week", val:`${Math.round(staff.reduce((s,m)=>s+m.hours,0)/Math.max(staff.length,1))} hrs` },
            ].map(c=>(
              <div key={c.label} style={S.statCard}>
                <div style={S.statLabel}>{c.label}</div>
                <div style={{ ...S.statVal, fontSize:22 }}>{c.val}</div>
              </div>
            ))}
          </div>
          <div style={S.section}>
            <table style={S.table}>
              <thead><tr>
                <th style={S.th}>Member</th><th style={S.th}>Role</th><th style={S.th}>Contact</th>
                <th style={S.th}>Salary</th><th style={S.th}>Hours/Week</th><th style={S.th}>Payment</th><th style={S.th}>Actions</th>
              </tr></thead>
              <tbody>{filteredStaff.map(m=>(
                <tr key={m.id}>
                  <td style={S.td}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={S.initials()}>{initials(m.name)}</div>
                      <div><div style={{ fontSize:12, color:"#D4AF37" }}>{m.name}</div><div style={{ fontSize:9, color:"#444" }}>{m.city}, Egypt</div></div>
                    </div>
                  </td>
                  <td style={{ ...S.td, fontSize:10, color:"#aaa" }}>{m.role}</td>
                  <td style={S.td}><div style={{ fontSize:9, color:"#777" }}>{m.phone}</div><div style={{ fontSize:9, color:"#555" }}>{m.email}</div></td>
                  <td style={S.td}>
                    <div style={{ color:"#D4AF37", fontSize:12 }}>{m.salary.toLocaleString()} EGP</div>
                    <div style={S.salaryBar}><div style={S.salaryFill(Math.round(m.salary/maxSalary*100))} /></div>
                  </td>
                  <td style={{ ...S.td, color:"#aaa", fontSize:12 }}>{m.hours} hrs</td>
                  <td style={S.td}><span style={S.badge(m.paid?"active":"pending")}>{m.paid?"Paid":"Pending"}</span></td>
                  <td style={S.td}>
                    <button style={S.btnEdit} onClick={()=>openEdit("staff",m)}>Edit</button>{" "}
                    <button style={S.btnDanger} onClick={()=>setStaff(s=>s.filter(x=>x.id!==m.id))}>Del</button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </>)}
      </div>

      {/* ════════════ MODALS ════════════ */}

      {/* Add Product */}
      <Modal open={modal==="add-product"} onClose={()=>setModal(null)} title="Add New Product">
        <div style={S.formRow}>
          <FG label="Product Name"><input style={S.input} value={form.name||""} onChange={e=>setF("name",e.target.value)} placeholder="e.g. Royal Gold Bracelet" /></FG>
          <FG label="Price (EGP)"><input style={S.input} type="number" value={form.price||""} onChange={e=>setF("price",e.target.value)} placeholder="0" /></FG>
        </div>
        <div style={S.formRow}>
          <FG label="Category">
            <select style={S.select} value={form.categoryId||""} onChange={e=>setF("categoryId",e.target.value)}>
              <option value="">Select...</option>
              {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </FG>
          <FG label="Rating (0–5)"><input style={S.input} type="number" step="0.1" min="0" max="5" value={form.rating||""} onChange={e=>setF("rating",e.target.value)} placeholder="4.5" /></FG>
        </div>
        <FG label="Description"><input style={S.input} value={form.description||""} onChange={e=>setF("description",e.target.value)} placeholder="Product description..." /></FG>
        <FG label="Main Image URL"><input style={S.input} value={form.image||""} onChange={e=>setF("image",e.target.value)} placeholder="https://..." /></FG>
        <FG label="Additional Images (comma separated)"><input style={S.input} value={form.sizes||""} onChange={e=>setF("sizes",e.target.value)} placeholder="https://img1.jpg, https://img2.jpg" /></FG>
        {form.image && <img src={form.image} alt="preview" style={{ width:"100%", height:120, objectFit:"cover", marginBottom:14, opacity:0.7 }} />}
        <div style={{ display:"flex", gap:12, marginTop:8 }}>
          <button style={{ ...S.btnGold, flex:1, justifyContent:"center" }} onClick={handleSaveProduct}>Save Product</button>
          <button style={S.btnOutline} onClick={()=>setModal(null)}>Cancel</button>
        </div>
      </Modal>

      {/* Edit Product */}
      <Modal open={modal==="edit-product"} onClose={()=>setModal(null)} title="Edit Product">
        <div style={S.formRow}>
          <FG label="Product Name"><input style={S.input} value={form.name||""} onChange={e=>setF("name",e.target.value)} /></FG>
          <FG label="Price (EGP)"><input style={S.input} type="number" value={form.price||""} onChange={e=>setF("price",e.target.value)} /></FG>
        </div>
        <div style={S.formRow}>
          <FG label="Category">
            <select style={S.select} value={form.categoryId||""} onChange={e=>setF("categoryId",e.target.value)}>
              {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </FG>
          <FG label="Rating (0–5)"><input style={S.input} type="number" step="0.1" min="0" max="5" value={form.rating||""} onChange={e=>setF("rating",e.target.value)} /></FG>
        </div>
        <FG label="Description"><input style={S.input} value={form.description||""} onChange={e=>setF("description",e.target.value)} /></FG>
        <FG label="Main Image URL"><input style={S.input} value={form.image||""} onChange={e=>setF("image",e.target.value)} /></FG>
        {form.image && <img src={form.image} alt="preview" style={{ width:"100%", height:120, objectFit:"cover", marginBottom:14, opacity:0.7 }} />}
        <div style={{ display:"flex", gap:12, marginTop:8 }}>
          <button style={{ ...S.btnGold, flex:1, justifyContent:"center" }} onClick={handleUpdateProduct}>Update Product</button>
          <button style={S.btnOutline} onClick={()=>setModal(null)}>Cancel</button>
        </div>
      </Modal>

      {/* Add Category */}
      <Modal open={modal==="add-cat"} onClose={()=>setModal(null)} title="Add New Category">
        <div style={S.formRow}>
          <FG label="Name (EN)"><input style={S.input} value={form.name||""} onChange={e=>setF("name",e.target.value)} placeholder="e.g. Accessories" /></FG>
          <FG label="Name (AR)"><input style={S.input} value={form.titleAr||""} onChange={e=>setF("titleAr",e.target.value)} placeholder="مثال: الإكسسوارات" /></FG>
        </div>
        <FG label="Description"><input style={S.input} value={form.description||""} onChange={e=>setF("description",e.target.value)} placeholder="Short description..." /></FG>
        <FG label="Image URL"><input style={S.input} value={form.image||""} onChange={e=>setF("image",e.target.value)} placeholder="https://..." /></FG>
        <FG label="Item Count Label"><input style={S.input} value={form.count||""} onChange={e=>setF("count",e.target.value)} placeholder="e.g. 24 Items" /></FG>
        {form.image && <img src={form.image} alt="preview" style={{ width:"100%", height:100, objectFit:"cover", marginBottom:14, opacity:0.6 }} />}
        <div style={{ display:"flex", gap:12, marginTop:8 }}>
          <button style={{ ...S.btnGold, flex:1, justifyContent:"center" }} onClick={handleSaveCat}>Save Category</button>
          <button style={S.btnOutline} onClick={()=>setModal(null)}>Cancel</button>
        </div>
      </Modal>

      {/* Edit Category */}
      <Modal open={modal==="edit-cat"} onClose={()=>setModal(null)} title="Edit Category">
        <div style={S.formRow}>
          <FG label="Name (EN)"><input style={S.input} value={form.name||""} onChange={e=>setF("name",e.target.value)} /></FG>
          <FG label="Name (AR)"><input style={S.input} value={form.titleAr||""} onChange={e=>setF("titleAr",e.target.value)} /></FG>
        </div>
        <FG label="Description"><input style={S.input} value={form.description||""} onChange={e=>setF("description",e.target.value)} /></FG>
        <FG label="Image URL"><input style={S.input} value={form.image||""} onChange={e=>setF("image",e.target.value)} /></FG>
        <FG label="Item Count Label"><input style={S.input} value={form.count||""} onChange={e=>setF("count",e.target.value)} /></FG>
        {form.image && <img src={form.image} alt="preview" style={{ width:"100%", height:100, objectFit:"cover", marginBottom:14, opacity:0.6 }} />}
        <div style={{ display:"flex", gap:12, marginTop:8 }}>
          <button style={{ ...S.btnGold, flex:1, justifyContent:"center" }} onClick={handleUpdateCat}>Update Category</button>
          <button style={S.btnOutline} onClick={()=>setModal(null)}>Cancel</button>
        </div>
      </Modal>

      {/* Add Staff */}
      <Modal open={modal==="add-staff"} onClose={()=>setModal(null)} title="Add Staff Member">
        <div style={S.formRow}>
          <FG label="Full Name"><input style={S.input} value={form.name||""} onChange={e=>setF("name",e.target.value)} placeholder="Full name" /></FG>
          <FG label="Role / Position"><input style={S.input} value={form.role||""} onChange={e=>setF("role",e.target.value)} placeholder="e.g. Designer" /></FG>
        </div>
        <div style={S.formRow}>
          <FG label="Phone"><input style={S.input} value={form.phone||""} onChange={e=>setF("phone",e.target.value)} placeholder="+20 100 000 0000" /></FG>
          <FG label="Email"><input style={S.input} value={form.email||""} onChange={e=>setF("email",e.target.value)} placeholder="name@kemet.com" /></FG>
        </div>
        <div style={S.formRow}>
          <FG label="Salary (EGP)"><input style={S.input} type="number" value={form.salary||""} onChange={e=>setF("salary",e.target.value)} placeholder="0" /></FG>
          <FG label="Hours / Week"><input style={S.input} type="number" value={form.hours||""} onChange={e=>setF("hours",e.target.value)} placeholder="40" /></FG>
        </div>
        <FG label="City"><input style={S.input} value={form.city||""} onChange={e=>setF("city",e.target.value)} placeholder="Cairo" /></FG>
        <FG label="Payment Status">
          <select style={S.select} value={form.paid?"true":"false"} onChange={e=>setF("paid",e.target.value==="true")}>
            <option value="false">Pending</option>
            <option value="true">Paid</option>
          </select>
        </FG>
        <div style={{ display:"flex", gap:12, marginTop:8 }}>
          <button style={{ ...S.btnGold, flex:1, justifyContent:"center" }} onClick={handleSaveStaff}>Add Member</button>
          <button style={S.btnOutline} onClick={()=>setModal(null)}>Cancel</button>
        </div>
      </Modal>

      {/* Edit Staff */}
      <Modal open={modal==="edit-staff"} onClose={()=>setModal(null)} title="Edit Staff Member">
        <div style={S.formRow}>
          <FG label="Full Name"><input style={S.input} value={form.name||""} onChange={e=>setF("name",e.target.value)} /></FG>
          <FG label="Role / Position"><input style={S.input} value={form.role||""} onChange={e=>setF("role",e.target.value)} /></FG>
        </div>
        <div style={S.formRow}>
          <FG label="Phone"><input style={S.input} value={form.phone||""} onChange={e=>setF("phone",e.target.value)} /></FG>
          <FG label="Email"><input style={S.input} value={form.email||""} onChange={e=>setF("email",e.target.value)} /></FG>
        </div>
        <div style={S.formRow}>
          <FG label="Salary (EGP)"><input style={S.input} type="number" value={form.salary||""} onChange={e=>setF("salary",e.target.value)} /></FG>
          <FG label="Hours / Week"><input style={S.input} type="number" value={form.hours||""} onChange={e=>setF("hours",e.target.value)} /></FG>
        </div>
        <FG label="City"><input style={S.input} value={form.city||""} onChange={e=>setF("city",e.target.value)} /></FG>
        <FG label="Payment Status">
          <select style={S.select} value={form.paid?"true":"false"} onChange={e=>setF("paid",e.target.value==="true")}>
            <option value="false">Pending</option>
            <option value="true">Paid</option>
          </select>
        </FG>
        <div style={{ display:"flex", gap:12, marginTop:8 }}>
          <button style={{ ...S.btnGold, flex:1, justifyContent:"center" }} onClick={handleUpdateStaff}>Update Member</button>
          <button style={S.btnOutline} onClick={()=>setModal(null)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}