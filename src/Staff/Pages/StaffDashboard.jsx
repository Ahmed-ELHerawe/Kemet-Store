// src/user/Pages/StaffDashboard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Staff Dashboard — كل موظف يدخل بـ ID بتاعه ويشوف بياناته والأوردرات
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useMemo } from "react";
import useStore from "../../store";

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const Ic = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const IHome    = () => <Ic d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />;
const IOrders  = () => <Ic d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />;
const IUser    = () => <Ic d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;
const IClock   = () => <Ic d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2" />;
const ITruck   = () => <Ic d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m0 0h3l3 4v4h-3m-3 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0M3 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />;
const ICheck   = () => <Ic d="M20 6L9 17l-5-5" />;
const IStar    = () => <Ic d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
const IGift    = () => <Ic d="M20 12v10H4V12 M22 7H2v5h20V7z M12 22V7 M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />;
const IEye     = () => <Ic d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;
const IClose   = () => <Ic d="M18 6L6 18M6 6l12 12" />;
const ICrown   = () => <Ic size={18} d="M2 20h20M5 20V9l7-6 7 6v11M9 20v-6h6v6" />;
const ILogout  = () => <Ic d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" />;
const IPhone   = () => <Ic d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />;
const IMap     = () => <Ic d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;

// ─── Zustand store patch (adds staff state if not present) ───────────────────
// We keep staff in localStorage separately from the main store
const STAFF_KEY = "kemet-staff";
const BONUS_PER_ORDER = 50; // EGP bonus per confirmed order

const defaultStaff = [
  { id: 1, name: "Mohamed Hassan", role: "Store Manager",    phone: "+20 100 111 2222", email: "m.hassan@kemet.com",  salary: 18000, hours: 48, city: "Cairo",       paid: true,  avatar: null, pin: "1111" },
  { id: 2, name: "Sara Abdel",     role: "Designer",         phone: "+20 101 222 3333", email: "s.abdel@kemet.com",   salary: 14000, hours: 40, city: "Giza",        paid: true,  avatar: null, pin: "2222" },
  { id: 3, name: "Karim Mostafa",  role: "Delivery Coord.",  phone: "+20 102 333 4444", email: "k.mostafa@kemet.com", salary: 10000, hours: 44, city: "Alexandria",  paid: false, avatar: null, pin: "3333" },
  { id: 4, name: "Nour Omar",      role: "Customer Service", phone: "+20 103 444 5555", email: "n.omar@kemet.com",    salary:  9000, hours: 38, city: "Cairo",       paid: true,  avatar: null, pin: "4444" },
  { id: 5, name: "Amr Fathy",      role: "Photographer",    phone: "+20 104 555 6666", email: "a.fathy@kemet.com",   salary: 12000, hours: 35, city: "Giza",        paid: false, avatar: null, pin: "5555" },
  { id: 6, name: "Laila Rashed",   role: "Social Media",    phone: "+20 105 666 7777", email: "l.rashed@kemet.com",  salary:  8000, hours: 36, city: "Cairo",       paid: true,  avatar: null, pin: "6666" },
];

function getStaff() {
  try { return JSON.parse(localStorage.getItem(STAFF_KEY)) || defaultStaff; }
  catch { return defaultStaff; }
}
function saveStaff(s) {
  try { localStorage.setItem(STAFF_KEY, JSON.stringify(s)); } catch {}
}

// confirmed orders per staff
const CONF_KEY = "kemet-confirmed";
function getConfirmed() {
  try { return JSON.parse(localStorage.getItem(CONF_KEY)) || {}; }
  catch { return {}; }
}
function saveConfirmed(c) {
  try { localStorage.setItem(CONF_KEY, JSON.stringify(c)); } catch {}
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const gold = "#D4AF37";
const dark = "#0A0A0A";
const card = { background: "#0F0F0F", border: "1px solid rgba(212,175,55,0.12)", padding: "22px 24px" };
const label = { fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#555", marginBottom: 6, display: "block" };
const th = { textAlign: "left", padding: "9px 12px", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#444", borderBottom: "1px solid rgba(212,175,55,0.1)" };
const td = { padding: "11px 12px", borderBottom: "1px solid rgba(255,255,255,0.03)", verticalAlign: "middle", fontSize: 12 };

function Badge({ type, children }) {
  const colors = {
    active:  { bg: "rgba(40,160,80,0.12)",   color: "#5ecb85", border: "rgba(40,160,80,0.25)" },
    pending: { bg: "rgba(212,175,55,0.10)",  color: gold,      border: "rgba(212,175,55,0.25)" },
    danger:  { bg: "rgba(200,50,50,0.10)",   color: "#e07070", border: "rgba(200,50,50,0.25)" },
    info:    { bg: "rgba(80,140,220,0.10)",  color: "#7ab4f5", border: "rgba(80,140,220,0.25)" },
  };
  const c = colors[type] || colors.pending;
  return <span style={{ padding: "3px 10px", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", fontWeight: "bold", background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{children}</span>;
}

function StatCard({ label: lbl, value, sub, icon, accent }) {
  return (
    <div style={{ ...card, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 8, left: 8, width: 10, height: 10, borderTop: "1px solid rgba(212,175,55,0.3)", borderLeft: "1px solid rgba(212,175,55,0.3)" }} />
      <div style={{ position: "absolute", bottom: 8, right: 8, width: 10, height: 10, borderBottom: "1px solid rgba(212,175,55,0.3)", borderRight: "1px solid rgba(212,175,55,0.3)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#555", marginBottom: 10 }}>{lbl}</div>
          <div style={{ fontSize: 26, fontWeight: "bold", color: accent || gold }}>{value}</div>
          {sub && <div style={{ fontSize: 9, color: "#555", marginTop: 4, letterSpacing: 1 }}>{sub}</div>}
        </div>
        {icon && <div style={{ color: "rgba(212,175,55,0.2)", marginTop: 4 }}>{icon}</div>}
      </div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const staffList = getStaff();
  const [selectedId, setSelectedId] = useState(null);
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  const selected = staffList.find(s => s.id === selectedId);

  const initials = (name = "") => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const handleLogin = () => {
    if (!selected) return setErr("اختار اسمك الأول");
    if (pin !== selected.pin) return setErr("الـ PIN غلط — جرب تاني");
    setErr("");
    onLogin(selected);
  };

  return (
    <div style={{ minHeight: "100vh", background: dark, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia,serif" }}>
      <div style={{ width: 420, padding: 48, border: "1px solid rgba(212,175,55,0.2)", background: "#0F0F0F", position: "relative" }}>
        <div style={{ position: "absolute", top: 12, left: 12, width: 14, height: 14, borderTop: `1px solid ${gold}`, borderLeft: `1px solid ${gold}` }} />
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 14, height: 14, borderBottom: `1px solid ${gold}`, borderRight: `1px solid ${gold}` }} />
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ color: gold, fontSize: 28, marginBottom: 8 }}>♛</div>
          <div style={{ color: gold, fontSize: 16, letterSpacing: 4, textTransform: "uppercase" }}>KEMET</div>
          <div style={{ color: "#444", fontSize: 9, letterSpacing: 3, marginTop: 6, textTransform: "uppercase" }}>Staff Portal</div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <span style={label}>اختار اسمك</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {staffList.map(s => (
              <div key={s.id} onClick={() => { setSelectedId(s.id); setPin(""); setErr(""); }}
                style={{ padding: "10px 12px", border: `1px solid ${selectedId === s.id ? gold : "rgba(212,175,55,0.15)"}`, background: selectedId === s.id ? "rgba(212,175,55,0.08)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: gold, fontWeight: "bold", flexShrink: 0 }}>{initials(s.name)}</div>
                <div>
                  <div style={{ fontSize: 11, color: selectedId === s.id ? gold : "#aaa" }}>{s.name.split(" ")[0]}</div>
                  <div style={{ fontSize: 9, color: "#444" }}>{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedId && (
          <div style={{ marginBottom: 20 }}>
            <span style={label}>PIN Code</span>
            <input
              type="password" maxLength={4} value={pin}
              onChange={e => { setPin(e.target.value); setErr(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="أدخل الـ PIN بتاعك"
              style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(212,175,55,0.3)", padding: "10px 0", color: "#fff", fontSize: 18, outline: "none", fontFamily: "Georgia,serif", letterSpacing: 8, textAlign: "center" }}
            />
            {err && <div style={{ color: "#e07070", fontSize: 10, marginTop: 8, letterSpacing: 1 }}>{err}</div>}
          </div>
        )}

        <button onClick={handleLogin}
          style={{ width: "100%", padding: "14px", background: gold, color: dark, border: "none", fontSize: 10, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia,serif", marginTop: 8 }}>
          Enter the Dynasty
        </button>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 9, color: "#333", letterSpacing: 2 }}>
          KEMET BOUTIQUE — STAFF ONLY
        </div>
      </div>
    </div>
  );
}

// ─── Order Detail Modal ───────────────────────────────────────────────────────
function OrderModal({ order, onClose, onConfirm, alreadyConfirmed }) {
  if (!order) return null;
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia,serif" }}>
      <div style={{ background: "#0F0F0F", border: "1px solid rgba(212,175,55,0.2)", padding: 32, width: 560, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", color: "#555", cursor: "pointer" }}><IClose /></button>

        <div style={{ fontSize: 12, letterSpacing: 3, color: gold, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(212,175,55,0.1)", textTransform: "uppercase" }}>
          Order Details — {order.id}
        </div>

        {/* Customer Info */}
        <div style={{ marginBottom: 20, padding: "14px 16px", background: "#111", border: "1px solid rgba(212,175,55,0.08)" }}>
          <div style={{ fontSize: 9, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Customer Information</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { l: "Name", v: order.customerName },
              { l: "Phone", v: order.primaryMobile },
              { l: "Address", v: order.address },
              { l: "Landmark", v: order.landmark || "—" },
              { l: "Payment", v: order.paymentMethod },
              { l: "Date", v: order.date },
            ].map(r => (
              <div key={r.l}>
                <div style={{ fontSize: 8, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>{r.l}</div>
                <div style={{ fontSize: 12, color: "#ccc" }}>{r.v}</div>
              </div>
            ))}
          </div>
          {order.notes && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: 8, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Notes</div>
              <div style={{ fontSize: 11, color: "#888", direction: "rtl", textAlign: "right" }}>{order.notes}</div>
            </div>
          )}
        </div>

        {/* Items */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 9, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Ordered Items</div>
          {(order.items || []).map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <img src={item.image} alt={item.name} style={{ width: 44, height: 54, objectFit: "cover", border: "1px solid rgba(212,175,55,0.15)", flexShrink: 0 }} onError={e => e.target.style.opacity = 0.1} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: gold }}>{item.name}</div>
                <div style={{ fontSize: 9, color: "#555", marginTop: 3 }}>Size: {item.size || "—"} · Qty: {item.quantity || 1}</div>
              </div>
              <div style={{ fontSize: 13, color: gold, fontWeight: "bold" }}>{(item.price || 0).toLocaleString()} EGP</div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
          <span style={{ fontSize: 11, color: "#888", letterSpacing: 2, textTransform: "uppercase" }}>Total Amount</span>
          <span style={{ fontSize: 20, color: gold, fontWeight: "bold" }}>{(order.total || 0).toLocaleString()} EGP</span>
        </div>

        {/* Confirm Button */}
        <div style={{ marginTop: 20 }}>
          {alreadyConfirmed ? (
            <div style={{ textAlign: "center", padding: "14px", background: "rgba(40,160,80,0.08)", border: "1px solid rgba(40,160,80,0.2)", color: "#5ecb85", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>
              ✓ Order Confirmed — Bonus Added
            </div>
          ) : (
            <button onClick={() => onConfirm(order)}
              style={{ width: "100%", padding: "14px", background: gold, color: dark, border: "none", fontSize: 10, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia,serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <ICheck /> Confirm & Dispatch Order (+{BONUS_PER_ORDER} EGP Bonus)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN STAFF DASHBOARD ────────────────────────────────────────────────────
export default function StaffDashboard() {
  const [staffMember, setStaffMember] = useState(null);
  const [page, setPage] = useState("home");
  const [confirmed, setConfirmed] = useState(getConfirmed);
  const [viewOrder, setViewOrder] = useState(null);
  const [justConfirmed, setJustConfirmed] = useState(null);

  const orders = useStore(s => s.orders || []);
  const updateOrderStatus = useStore(s => s.updateOrderStatus);

  // update order status in store when staff confirms
  const handleConfirm = (order) => {
    const next = {
      ...confirmed,
      [order.id]: { confirmedBy: staffMember.id, staffName: staffMember.name, at: new Date().toISOString() }
    };
    setConfirmed(next);
    saveConfirmed(next);

    // update order status in the global store so user sees it
    if (typeof updateOrderStatus === "function") {
      updateOrderStatus(order.id, "Out for Delivery");
    } else {
      // fallback: patch zustand store directly
      useStore.setState(state => ({
        orders: state.orders.map(o =>
          o.id === order.id ? { ...o, status: "Out for Delivery", confirmedBy: staffMember.name } : o
        )
      }));
    }

    setJustConfirmed(order.id);
    setTimeout(() => setJustConfirmed(null), 3000);
    setViewOrder(null);
  };

  const myConfirmedCount = Object.values(confirmed).filter(c => c.confirmedBy === staffMember?.id).length;
  const totalBonus = myConfirmedCount * BONUS_PER_ORDER;
  const initials = (name = "") => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  // ── Login gate ──
  if (!staffMember) return <LoginScreen onLogin={m => { setStaffMember(m); setPage("home"); }} />;

  const pendingOrders  = orders.filter(o => !confirmed[o.id]);
  const myOrders       = orders.filter(o => confirmed[o.id]?.confirmedBy === staffMember.id);

  const NavItem = ({ icon, lbl, pg, badge }) => (
    <div onClick={() => setPage(pg)}
      style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 20px", cursor: "pointer", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: page === pg ? gold : "#555", background: page === pg ? "rgba(212,175,55,0.06)" : "transparent", borderLeft: page === pg ? `2px solid ${gold}` : "2px solid transparent", transition: "all 0.25s" }}>
      {icon}
      <span style={{ flex: 1 }}>{lbl}</span>
      {badge > 0 && <span style={{ background: gold, color: dark, fontSize: 8, fontWeight: "bold", padding: "1px 5px", borderRadius: 8 }}>{badge}</span>}
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: dark, fontFamily: "Georgia,serif", color: "#fff" }}>

      {/* ── SIDEBAR ── */}
      <div style={{ width: 220, minHeight: "100vh", background: "#0D0D0D", borderRight: "1px solid rgba(212,175,55,0.12)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, zIndex: 50 }}>
        <div style={{ padding: "22px 20px", borderBottom: "1px solid rgba(212,175,55,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, color: gold }}>♛</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: "bold", color: gold, letterSpacing: 3 }}>KEMET</div>
            <div style={{ fontSize: 8, color: "#444", letterSpacing: 2, textTransform: "uppercase" }}>Staff Portal</div>
          </div>
        </div>

        <div style={{ flex: 1, paddingTop: 8 }}>
          <NavItem icon={<IHome />}   lbl="Home"    pg="home" />
          <NavItem icon={<IOrders />} lbl="Orders"  pg="orders"  badge={pendingOrders.length} />
          <NavItem icon={<IGift />}   lbl="My Bonus" pg="bonus" />
          <NavItem icon={<IUser />}   lbl="Profile"  pg="profile" />
        </div>

        {/* Profile Footer */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            {staffMember.avatar ? (
              <img src={staffMember.avatar} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: `2px solid rgba(212,175,55,0.3)` }} />
            ) : (
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: gold, fontWeight: "bold" }}>
                {initials(staffMember.name)}
              </div>
            )}
            <div>
              <div style={{ fontSize: 11, color: gold }}>{staffMember.name.split(" ")[0]}</div>
              <div style={{ fontSize: 9, color: "#444" }}>{staffMember.role}</div>
            </div>
          </div>
          <button onClick={() => setStaffMember(null)}
            style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid rgba(200,50,50,0.2)", color: "#e07070", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "Georgia,serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <ILogout /> Logout
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ marginLeft: 220, padding: "32px 36px", flex: 1 }}>

        {/* Just-confirmed toast */}
        {justConfirmed && (
          <div style={{ position: "fixed", top: 24, right: 24, background: "rgba(40,160,80,0.15)", border: "1px solid rgba(40,160,80,0.3)", color: "#5ecb85", padding: "12px 20px", fontSize: 11, letterSpacing: 2, zIndex: 300 }}>
            ✓ Order confirmed — +{BONUS_PER_ORDER} EGP bonus added!
          </div>
        )}

        {/* ════════════ HOME ════════════ */}
        {page === "home" && (<>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
            <div>
              <div style={{ fontSize: 9, color: "#444", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Welcome back</div>
              <div style={{ fontSize: 22, color: gold, letterSpacing: 3, fontStyle: "italic" }}>{staffMember.name}</div>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginTop: 4 }}>{staffMember.role} · {staffMember.city}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase" }}>Today</div>
              <div style={{ fontSize: 12, color: "#777" }}>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
            <StatCard label="Base Salary"       value={`${staffMember.salary.toLocaleString()} EGP`} sub="this month" icon={<IStar size={28} />} />
            <StatCard label="Total Bonus"        value={`${totalBonus.toLocaleString()} EGP`}         sub={`${myConfirmedCount} orders confirmed`} accent="#5ecb85" icon={<IGift size={28} />} />
            <StatCard label="Total Earnings"     value={`${(staffMember.salary + totalBonus).toLocaleString()} EGP`} sub="salary + bonus" icon={<ICrown size={28} />} />
            <StatCard label="Hours / Week"       value={`${staffMember.hours} hrs`}                   sub="scheduled" icon={<IClock size={28} />} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Pending Orders Quick View */}
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
                <span style={{ fontSize: 10, letterSpacing: 3, color: gold, textTransform: "uppercase" }}>Pending Orders</span>
                <button onClick={() => setPage("orders")} style={{ background: "transparent", border: "1px solid rgba(212,175,55,0.3)", color: gold, padding: "5px 12px", fontSize: 9, letterSpacing: 2, cursor: "pointer", fontFamily: "Georgia,serif" }}>View All</button>
              </div>
              {pendingOrders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px 0", color: "#2a2a2a", fontSize: 11, letterSpacing: 2 }}>ALL CAUGHT UP ✓</div>
              ) : (
                pendingOrders.slice(0, 4).map(o => (
                  <div key={o.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <div>
                      <div style={{ fontSize: 11, color: gold }}>{o.id}</div>
                      <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{o.customerName}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: gold }}>{(o.total || 0).toLocaleString()} EGP</span>
                      <button onClick={() => setViewOrder(o)}
                        style={{ background: gold, color: dark, border: "none", padding: "5px 10px", fontSize: 9, cursor: "pointer", fontFamily: "Georgia,serif", display: "flex", alignItems: "center", gap: 4 }}>
                        <IEye /> View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* My Confirmed */}
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
                <span style={{ fontSize: 10, letterSpacing: 3, color: gold, textTransform: "uppercase" }}>My Confirmed</span>
                <Badge type="active">{myConfirmedCount} Orders</Badge>
              </div>
              {myOrders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px 0", color: "#2a2a2a", fontSize: 11, letterSpacing: 2 }}>NO CONFIRMATIONS YET</div>
              ) : (
                myOrders.slice(0, 4).map(o => (
                  <div key={o.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <div>
                      <div style={{ fontSize: 11, color: gold }}>{o.id}</div>
                      <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{o.customerName}</div>
                    </div>
                    <Badge type="active">Confirmed</Badge>
                  </div>
                ))
              )}
            </div>
          </div>
        </>)}

        {/* ════════════ ORDERS ════════════ */}
        {page === "orders" && (<>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
            <div style={{ fontSize: 20, color: gold, letterSpacing: 4, fontStyle: "italic", display: "flex", alignItems: "center", gap: 10 }}><IOrders /> All Orders</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
            <StatCard label="Total Orders"    value={orders.length}           sub="in system" />
            <StatCard label="Pending"         value={pendingOrders.length}    sub="awaiting confirmation" accent="#e07070" />
            <StatCard label="I Confirmed"     value={myConfirmedCount}        sub={`+${totalBonus} EGP bonus`} accent="#5ecb85" />
          </div>

          <div style={card}>
            {orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#2a2a2a", fontSize: 11, letterSpacing: 2 }}>NO ORDERS YET</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={th}>Ref ID</th>
                    <th style={th}>Customer</th>
                    <th style={th}>Phone</th>
                    <th style={th}>Items</th>
                    <th style={th}>Total</th>
                    <th style={th}>Date</th>
                    <th style={th}>Status</th>
                    <th style={th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => {
                    const isConfirmed = !!confirmed[o.id];
                    const isMine      = confirmed[o.id]?.confirmedBy === staffMember.id;
                    return (
                      <tr key={o.id}>
                        <td style={{ ...td, color: gold, fontSize: 10 }}>{o.id}</td>
                        <td style={td}>{o.customerName}</td>
                        <td style={{ ...td, fontSize: 10, color: "#777" }}>{o.primaryMobile}</td>
                        <td style={{ ...td, color: "#888" }}>{o.items?.length || 0} item(s)</td>
                        <td style={{ ...td, color: gold }}>{(o.total || 0).toLocaleString()} EGP</td>
                        <td style={{ ...td, fontSize: 10, color: "#555" }}>{o.date}</td>
                        <td style={td}>
                          {isConfirmed
                            ? <Badge type="active">{isMine ? "✓ Me" : "Confirmed"}</Badge>
                            : <Badge type="pending">Pending</Badge>}
                        </td>
                        <td style={td}>
                          <button onClick={() => setViewOrder(o)}
                            style={{ background: "transparent", border: "1px solid rgba(212,175,55,0.25)", color: gold, padding: "5px 10px", fontSize: 9, cursor: "pointer", fontFamily: "Georgia,serif", display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <IEye /> View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>)}

        {/* ════════════ BONUS ════════════ */}
        {page === "bonus" && (<>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
            <div style={{ fontSize: 20, color: gold, letterSpacing: 4, fontStyle: "italic", display: "flex", alignItems: "center", gap: 10 }}><IGift /> Bonus & Rewards</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
            <StatCard label="Base Salary"    value={`${staffMember.salary.toLocaleString()} EGP`} />
            <StatCard label="Confirmed Orders" value={myConfirmedCount}                           sub={`× ${BONUS_PER_ORDER} EGP each`} />
            <StatCard label="Total Bonus"    value={`${totalBonus.toLocaleString()} EGP`}         accent="#5ecb85" />
            <StatCard label="Grand Total"    value={`${(staffMember.salary + totalBonus).toLocaleString()} EGP`} accent={gold} />
          </div>

          {/* Bonus breakdown */}
          <div style={card}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: gold, textTransform: "uppercase", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(212,175,55,0.1)" }}>Bonus Breakdown</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Base row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div>
                  <div style={{ fontSize: 12, color: "#ccc" }}>Base Salary</div>
                  <div style={{ fontSize: 9, color: "#555", marginTop: 2, letterSpacing: 1 }}>Monthly fixed</div>
                </div>
                <div style={{ fontSize: 16, color: gold, fontWeight: "bold" }}>{staffMember.salary.toLocaleString()} EGP</div>
              </div>

              {/* Each confirmed order */}
              {myOrders.map(o => (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5ecb85" }} />
                    <div>
                      <div style={{ fontSize: 11, color: "#ccc" }}>Order {o.id} — {o.customerName}</div>
                      <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{o.date}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: "#5ecb85", fontWeight: "bold" }}>+{BONUS_PER_ORDER} EGP</div>
                </div>
              ))}

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderTop: "1px solid rgba(212,175,55,0.15)", marginTop: 4 }}>
                <div style={{ fontSize: 13, color: "#aaa", letterSpacing: 2, textTransform: "uppercase" }}>Total This Month</div>
                <div style={{ fontSize: 22, color: gold, fontWeight: "bold" }}>{(staffMember.salary + totalBonus).toLocaleString()} EGP</div>
              </div>
            </div>

            {/* Progress bar toward goal */}
            <div style={{ marginTop: 16, padding: "16px", background: "#111", border: "1px solid rgba(212,175,55,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 9, color: "#555", letterSpacing: 2, textTransform: "uppercase" }}>Monthly Bonus Progress</span>
                <span style={{ fontSize: 9, color: gold }}>{myConfirmedCount} / 20 orders</span>
              </div>
              <div style={{ height: 4, background: "rgba(212,175,55,0.1)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min(myConfirmedCount / 20 * 100, 100)}%`, background: gold, borderRadius: 2, transition: "width 0.5s" }} />
              </div>
              <div style={{ fontSize: 9, color: "#444", marginTop: 8 }}>Confirm 20 orders to unlock premium bonus tier 🏆</div>
            </div>
          </div>
        </>)}

        {/* ════════════ PROFILE ════════════ */}
        {page === "profile" && (<>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
            <div style={{ fontSize: 20, color: gold, letterSpacing: 4, fontStyle: "italic", display: "flex", alignItems: "center", gap: 10 }}><IUser /> My Profile</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
            {/* Avatar Card */}
            <div style={{ ...card, textAlign: "center" }}>
              <div style={{ width: 90, height: 90, borderRadius: "50%", background: "rgba(212,175,55,0.1)", border: `2px solid ${gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: gold, fontWeight: "bold", margin: "0 auto 16px" }}>
                {initials(staffMember.name)}
              </div>
              <div style={{ fontSize: 16, color: gold, letterSpacing: 2, marginBottom: 4 }}>{staffMember.name}</div>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: 2, textTransform: "uppercase" }}>{staffMember.role}</div>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(212,175,55,0.1)" }}>
                <Badge type={staffMember.paid ? "active" : "pending"}>{staffMember.paid ? "Salary Paid" : "Payment Pending"}</Badge>
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Weekly Hours</div>
                <div style={{ fontSize: 22, color: gold, fontWeight: "bold" }}>{staffMember.hours}</div>
                <div style={{ height: 3, background: "rgba(212,175,55,0.1)", margin: "8px 0", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(staffMember.hours / 60 * 100, 100)}%`, background: gold }} />
                </div>
              </div>
            </div>

            {/* Details */}
            <div style={card}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: gold, textTransform: "uppercase", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(212,175,55,0.1)" }}>Contact & Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { l: "Phone",    v: staffMember.phone,  icon: <IPhone /> },
                  { l: "Email",    v: staffMember.email,  icon: <IUser /> },
                  { l: "City",     v: `${staffMember.city}, Egypt`, icon: <IMap /> },
                  { l: "Role",     v: staffMember.role,   icon: <IStar /> },
                ].map(r => (
                  <div key={r.l} style={{ padding: "14px 16px", background: "#111", border: "1px solid rgba(212,175,55,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, color: "rgba(212,175,55,0.4)" }}>{r.icon}<span style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "#444" }}>{r.l}</span></div>
                    <div style={{ fontSize: 13, color: "#ccc" }}>{r.v}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, padding: "16px", background: "#111", border: "1px solid rgba(212,175,55,0.08)" }}>
                <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Earnings Summary</div>
                <div style={{ display: "flex", gap: 0 }}>
                  {[
                    { l: "Base Salary", v: `${staffMember.salary.toLocaleString()} EGP`, color: gold },
                    { l: "Bonus",       v: `${totalBonus.toLocaleString()} EGP`,         color: "#5ecb85" },
                    { l: "Total",       v: `${(staffMember.salary + totalBonus).toLocaleString()} EGP`, color: gold },
                  ].map((item, i) => (
                    <div key={i} style={{ flex: 1, padding: "12px 14px", borderRight: i < 2 ? "1px solid rgba(212,175,55,0.08)" : "none" }}>
                      <div style={{ fontSize: 8, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{item.l}</div>
                      <div style={{ fontSize: 16, fontWeight: "bold", color: item.color }}>{item.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>)}
      </div>

      {/* ── Order Modal ── */}
      <OrderModal
        order={viewOrder}
        onClose={() => setViewOrder(null)}
        onConfirm={handleConfirm}
        alreadyConfirmed={viewOrder ? !!confirmed[viewOrder.id] : false}
      />
    </div>
  );
}