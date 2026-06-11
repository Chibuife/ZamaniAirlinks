"use client";
import { useState, useRef, useEffect } from "react";
import {
  Plane, Building2, FileText, Luggage, Car, Globe,
  ShieldCheck, Menu, X, ChevronDown, Search, MessageCircle,
  QrCode, MapPin, Users, Plus, Trash2, Clock, Star,
  ArrowRight, ChevronUp, Send, Bot, Wifi, Tag, Shield
} from "lucide-react";

/* ─── DATA ─── */
const NAV_LINKS = ["Home", "Services", "Packages", "FAQ", "Contact"];
const TRIP_TYPES = ["One Way", "Round Trip", "Multi-City"];
const CLASSES = ["Economy", "Business", "First Class"];

const SERVICES = [
  { icon: Plane, title: "Flight Bookings", desc: "Local & International flight reservations at the best rates." },
  { icon: Building2, title: "Hotel Reservations", desc: "Comfortable stays for business or leisure." },
  { icon: FileText, title: "Visa Assistance", desc: "Visa processing made easy and hassle-free." },
  { icon: Luggage, title: "Tour Packages", desc: "Exciting travel destinations tailored to your needs." },
  { icon: Car, title: "Airport Transfers", desc: "Reliable and timely pick-up and drop-off services." },
  { icon: Globe, title: "Travel Consultancy", desc: "Expert advice and personalized travel planning." },
];

const FLIGHT_DEALS = [
  { from: "Lagos", from_code: "LOS", to: "London", to_code: "LHR", airline: "British Airways", logo: "BA", duration: "6h 45m", stops: "Direct", economy: 245000, business: 680000, tag: "Best Seller", tagColor: "#16a34a", date: "Aug 15", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", country: "🇬🇧 United Kingdom" },
  { from: "Lagos", from_code: "LOS", to: "Dubai", to_code: "DXB", airline: "Emirates", logo: "EK", duration: "5h 20m", stops: "Direct", economy: 198000, business: 520000, tag: "Hot Deal", tagColor: "#dc2626", date: "Aug 20", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", country: "🇦🇪 UAE" },
  { from: "Lagos", from_code: "LOS", to: "New York", to_code: "JFK", airline: "Delta Airlines", logo: "DL", duration: "11h 10m", stops: "1 Stop", economy: 312000, business: 890000, tag: "Popular", tagColor: "#2563eb", date: "Sep 1", img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805c51?w=600&q=80", country: "🇺🇸 United States" },
  { from: "Lagos", from_code: "LOS", to: "Paris", to_code: "CDG", airline: "Air France", logo: "AF", duration: "6h 55m", stops: "Direct", economy: 267000, business: 740000, tag: "New Route", tagColor: "#7c3aed", date: "Sep 10", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", country: "🇫🇷 France" },
  { from: "Abuja", from_code: "ABV", to: "Accra", to_code: "ACC", airline: "Arik Air", logo: "AK", duration: "1h 40m", stops: "Direct", economy: 85000, business: 195000, tag: "Cheapest", tagColor: "#ea580c", date: "Aug 25", img: "https://images.unsplash.com/photo-1580746738099-b2d15c5a8a93?w=600&q=80", country: "🇬🇭 Ghana" },
  { from: "Lagos", from_code: "LOS", to: "Istanbul", to_code: "IST", airline: "Turkish Airlines", logo: "TK", duration: "7h 30m", stops: "Direct", economy: 278000, business: 610000, tag: "Top Rated", tagColor: "#0891b2", date: "Oct 5", img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80", country: "🇹🇷 Turkey" },
];

const FAQS = [
  { q: "How do I book a flight with Zamani Airlinks?", a: "You can book directly on our website using the search widget above, send us a WhatsApp message on 08114529540, or visit our office. We confirm your booking within 2 hours with your e-ticket." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, USSD payments, all major debit/credit cards, and mobile money. Payment plans are available for select packages — ask our team for details." },
  { q: "How soon do I receive my e-ticket after payment?", a: "E-tickets are issued within 30 minutes to 2 hours after payment confirmation during business hours (8am–8pm). After-hours payments are processed first thing the next morning." },
  { q: "Can you help with visa applications?", a: "Yes! We offer end-to-end visa assistance for UK, US, Schengen, UAE, Canada, and more. Our success rate is over 95%. Contact us early — most visas require 4–12 weeks processing time." },
  { q: "Do you offer travel insurance?", a: "We strongly recommend travel insurance and can arrange comprehensive cover for medical emergencies, trip cancellations, lost luggage, and flight delays at competitive rates." },
  { q: "What is your refund/cancellation policy?", a: "Cancellation policies vary by airline and fare type. We advise customers before booking. For flexible fares, refunds are typically processed within 7–14 business days. We charge a small handling fee." },
  { q: "Do you arrange airport transfers and hotel bookings too?", a: "Absolutely. We offer complete travel packages including airport pick-up and drop-off across Nigeria, hotel reservations worldwide, and guided tour packages. Ask us for a bundled quote." },
  { q: "Can I book multi-city trips?", a: "Yes! Use the 'Multi-City' tab in our search widget to add multiple legs to your journey. Our agents can also help plan complex multi-destination itineraries by WhatsApp." },
];

const BOT_REPLIES = {
  greeting: "Hello! 👋 I'm Zara, your Zamani Airlinks travel assistant. How can I help you today?\n\nYou can ask me about:\n• Flight prices & booking\n• Visa assistance\n• Tour packages\n• Hotel reservations\n• Payment methods",
  flight: "✈️ We have great deals right now!\n\n• Lagos → London from ₦245,000\n• Lagos → Dubai from ₦198,000\n• Lagos → New York from ₦312,000\n• Abuja → Accra from ₦85,000\n\nScroll up to see all our Featured Deals, or tell me your route and I'll get you a quote!",
  visa: "🛂 We offer visa assistance for:\n\n✅ UK (Visitor, Student, Work)\n✅ USA (B1/B2, F1)\n✅ Schengen (26 countries)\n✅ UAE / Dubai\n✅ Canada\n✅ Australia & more\n\nOur success rate is over 95%! Contact us on WhatsApp: 08114529540",
  hotel: "🏨 We book hotels worldwide at the best rates!\n\nFrom budget guesthouses to 5-star luxury resorts. We have partnerships with major hotel chains and can bundle your hotel with your flight for extra savings. Tell us your destination!",
  payment: "💳 We accept:\n\n• Bank transfer\n• Debit/Credit cards (all major)\n• USSD payments\n• Mobile money\n• Payment plans (select packages)\n\nAll transactions are 100% secure 🔒",
  default: "Thanks for your message! 😊 Our team will get back to you shortly.\n\nFor immediate assistance, WhatsApp us at **08114529540** — we respond within minutes during business hours (8am–8pm daily).",
};

function getBotReply(msg: string) {
  const m = msg.toLowerCase();
  if (m.match(/hi|hello|hey|good/)) return BOT_REPLIES.greeting;
  if (m.match(/flight|ticket|book|price|cheap|cost|fare|route/)) return BOT_REPLIES.flight;
  if (m.match(/visa|passport|travel doc/)) return BOT_REPLIES.visa;
  if (m.match(/hotel|stay|accommodation|lodge/)) return BOT_REPLIES.hotel;
  if (m.match(/pay|transfer|card|money|bank/)) return BOT_REPLIES.payment;
  return BOT_REPLIES.default;
}

interface ServiceCardProps {
  Icon: React.ElementType;
  title: string;
  desc: string;
}

/* ─── HELPERS ─── */
const fmt = (n: number) => "₦" + n.toLocaleString();

/* ══════════════════════════════════════════════════════════ */
export default function ZamaniAirlinks() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tripType, setTripType] = useState("Round Trip");
  const [paxClass, setPaxClass] = useState("Economy");
  const [paxOpen, setPaxOpen] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [dealClass, setDealClass] = useState("Economy");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { from: "bot", text: BOT_REPLIES.greeting }
  ]);
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Multi-city legs
  const [legs, setLegs] = useState([
    { from: "Lagos (LOS)", to: "London (LHR)", date: "" },
    { from: "London (LHR)", to: "Dubai (DXB)", date: "" },
  ]);

  const addLeg = () => setLegs(l => [...l, { from: "", to: "", date: "" }]);
  const removeLeg = (i: number) => setLegs(l => l.filter((_, j) => j !== i));
  const updateLeg = (i: number, field: string, val: string) => setLegs(l => l.map((leg, j) => j === i ? { ...leg, [field]: val } : leg));

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const userMsg = chatMsg.trim();
    setChatHistory(h => [...h, { from: "user", text: userMsg }]);
    setChatMsg("");
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setChatHistory(h => [...h, { from: "bot", text: getBotReply(userMsg) }]);
    }, 1200);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, botTyping]);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{ background: "#0b1c3c", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #d4af37", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(212,175,55,0.1)" }}>
              <Plane size={18} color="#d4af37" />
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>
              <span style={{ color: "#fff" }}>ZAMANI </span>
              <span style={{ color: "#d4af37" }}>AIRLINKS</span>
            </span>
          </div>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8 desktop-nav">
            {NAV_LINKS.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-white/80 no-underline text-sm font-medium transition-colors duration-200 hover:text-[#d4af37]"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">

            <button className="bg-[#d4af37] text-[#0b1c3c] px-[22px] py-[10px] rounded-lg font-bold text-sm cursor-pointer transition-all duration-200 hover:bg-[#e8c84a] hover:-translate-y-[1px]">
              Book Flight
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden bg-transparent border-none text-white cursor-pointer hamburger"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
        {menuOpen && (
          <div style={{ background: "#0d2044", padding: "16px 24px 24px", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
            {NAV_LINKS.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ display: "block", color: "rgba(255,255,255,0.85)", textDecoration: "none", padding: "12px 0", fontSize: 16, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{l}</a>)}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ background: "linear-gradient(135deg,#0b1c3c 0%,#1a3a6e 50%,#0b2d5c 100%)", minHeight: 620, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cellipse cx='600' cy='300' rx='580' ry='280' stroke='white' stroke-width='1' fill='none'/%3E%3Cellipse cx='600' cy='300' rx='400' ry='280' stroke='white' stroke-width='1' fill='none'/%3E%3Cellipse cx='600' cy='300' rx='200' ry='280' stroke='white' stroke-width='1' fill='none'/%3E%3Cline x1='20' y1='300' x2='1180' y2='300' stroke='white' stroke-width='1'/%3E%3Cline x1='600' y1='20' x2='600' y2='580' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: "cover" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px", display: "flex", gap: 48, alignItems: "center", width: "100%", flexWrap: "wrap" }}>
          {/* Left copy */}
          <div style={{ flex: "1 1 380px", minWidth: 280 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
              <Plane size={14} color="#d4af37" /><span style={{ color: "#d4af37", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>TRAVELS AND TOURS</span>
            </div>
            <h1 style={{ color: "#fff", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: 1 }}>
              Connecting You<br /><span style={{ color: "#d4af37" }}>To The World</span>
            </h1>
            <p style={{ fontFamily: "'Georgia',serif", fontStyle: "italic", color: "rgba(255,255,255,0.85)", fontSize: "clamp(18px,3vw,26px)", margin: "0 0 32px", lineHeight: 1.5 }}>
              Creating Memories that Last a Lifetime.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {["Best Rate Guarantee", "24/7 Support", "Visa Assistance"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4af37" }} />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking widget */}
          <div style={{ flex: "1 1 460px", minWidth: 300, background: "#fff", borderRadius: 16, boxShadow: "0 24px 64px rgba(0,0,0,0.3)", overflow: "hidden" }}>
            {/* Tabs */}
            <div style={{ display: "flex", background: "#f1f5f9" }}>
              {TRIP_TYPES.map(t => (
                <button key={t} onClick={() => setTripType(t)} style={{ flex: 1, padding: "14px 8px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: tripType === t ? "#fff" : "transparent", color: tripType === t ? "#0b1c3c" : "#64748b", borderBottom: tripType === t ? "3px solid #d4af37" : "3px solid transparent", transition: "all 0.2s" }}>{t}</button>
              ))}
            </div>

            <div style={{ padding: 20 }}>
              {tripType !== "Multi-City" ? (
                <>
                  {/* From / To */}
                  <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 160px" }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 6 }}>FROM</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 12px" }}>
                        <MapPin size={15} color="#d4af37" />
                        <input defaultValue="Lagos (LOS)" style={{ border: "none", outline: "none", fontSize: 14, fontWeight: 600, color: "#0b1c3c", width: "100%" }} />
                      </div>
                    </div>
                    <div style={{ flex: "1 1 160px" }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 6 }}>TO</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 12px" }}>
                        <MapPin size={15} color="#d4af37" />
                        <input defaultValue="London (LHR)" style={{ border: "none", outline: "none", fontSize: 14, fontWeight: 600, color: "#0b1c3c", width: "100%" }} />
                      </div>
                    </div>
                  </div>
                  {/* Dates */}
                  <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 160px" }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 6 }}>DEPARTURE</label>
                      <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 12px" }}>
                        <input type="date" defaultValue="2025-08-15" style={{ border: "none", outline: "none", fontSize: 14, color: "#0b1c3c", width: "100%", background: "transparent" }} />
                      </div>
                    </div>
                    <div style={{ flex: "1 1 160px", opacity: tripType === "One Way" ? 0.4 : 1 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 6 }}>RETURN</label>
                      <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 12px" }}>
                        <input type="date" defaultValue="2025-08-29" disabled={tripType === "One Way"} style={{ border: "none", outline: "none", fontSize: 14, color: "#0b1c3c", width: "100%", background: "transparent" }} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Multi-city legs */
                <div style={{ marginBottom: 14 }}>
                  {legs.map((leg, i) => (
                    <div key={i} style={{ background: "#f8fafc", borderRadius: 10, padding: 12, marginBottom: 10, border: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#0b1c3c" }}>Flight {i + 1}</span>
                        {legs.length > 2 && <button onClick={() => removeLeg(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 2 }}><Trash2 size={14} /></button>}
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <input value={leg.from} onChange={e => updateLeg(i, "from", e.target.value)} placeholder="From (e.g. Lagos LOS)" style={{ flex: "1 1 120px", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 10px", fontSize: 13, outline: "none" }} />
                        <input value={leg.to} onChange={e => updateLeg(i, "to", e.target.value)} placeholder="To (e.g. London LHR)" style={{ flex: "1 1 120px", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 10px", fontSize: 13, outline: "none" }} />
                        <input type="date" value={leg.date} onChange={e => updateLeg(i, "date", e.target.value)} style={{ flex: "1 1 120px", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 10px", fontSize: 13, outline: "none", background: "#fff" }} />
                      </div>
                    </div>
                  ))}
                  {legs.length < 5 && (
                    <button onClick={addLeg} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1.5px dashed #d4af37", borderRadius: 8, padding: "8px 14px", color: "#b8960f", fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%" }}>
                      <Plus size={15} /> Add Another Flight
                    </button>
                  )}
                </div>
              )}

              {/* Passengers & Class */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 6 }}>PASSENGERS & CLASS</label>
                <div style={{ position: "relative" }}>
                  <button onClick={() => setPaxOpen(!paxOpen)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 12px", background: "#fff", cursor: "pointer" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Users size={15} color="#d4af37" />
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#0b1c3c" }}>{passengers} Passenger{passengers > 1 ? "s" : ""} · {paxClass}</span>
                    </span>
                    <ChevronDown size={15} color="#64748b" style={{ transform: paxOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
                  </button>
                  {paxOpen && (
                    <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: 16, zIndex: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#0b1c3c" }}>Passengers</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <button onClick={() => setPassengers(Math.max(1, passengers - 1))} style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontWeight: 700 }}>−</button>
                          <span style={{ fontSize: 15, fontWeight: 700, minWidth: 16, textAlign: "center" }}>{passengers}</span>
                          <button onClick={() => setPassengers(Math.min(9, passengers + 1))} style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontWeight: 700 }}>+</button>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {CLASSES.map(c => (
                          <button key={c} onClick={() => { setPaxClass(c); setPaxOpen(false) }} style={{ flex: 1, padding: "8px 4px", border: `1.5px solid ${paxClass === c ? "#d4af37" : "#e2e8f0"}`, borderRadius: 8, background: paxClass === c ? "rgba(212,175,55,0.1)" : "#fff", fontSize: 12, fontWeight: 600, color: paxClass === c ? "#b8960f" : "#64748b", cursor: "pointer" }}>{c}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button style={{ width: "100%", background: "#0b1c3c", color: "#d4af37", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 700, letterSpacing: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1a3a6e"; e.currentTarget.style.transform = "translateY(-1px)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0b1c3c"; e.currentTarget.style.transform = "translateY(0)" }}>
                <Search size={17} /> SEARCH FLIGHTS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED DEALS ── */}
      <section id="packages" style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle eyebrow="Exclusive Offers" title="FEATURED FLIGHT DEALS" />
          {/* Class toggle */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {["Economy", "Business"].map(c => (
              <button key={c} onClick={() => setDealClass(c)} style={{ padding: "9px 24px", borderRadius: 20, border: `1.5px solid ${dealClass === c ? "#0b1c3c" : "#e2e8f0"}`, background: dealClass === c ? "#0b1c3c" : "#fff", color: dealClass === c ? "#d4af37" : "#64748b", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>{c}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
            {FLIGHT_DEALS.map((deal, i) => <FlightCard key={i} deal={deal} cls={dealClass} />)}
          </div>
          <p style={{ textAlign: "center", color: "#64748b", fontSize: 13, marginTop: 24 }}>* Prices shown are per person in Nigerian Naira. Subject to availability. Taxes included.</p>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "80px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle eyebrow="What We Offer" title="OUR SERVICES" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {SERVICES.map(({ icon: Icon, title, desc }) => <ServiceCard key={title} Icon={Icon} title={title} desc={desc} />)}
          </div>
        </div>
      </section>

      {/* ── PROMISE BANNER ── */}
      <section style={{ background: "#0b1c3c", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", border: "2px solid #d4af37", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(212,175,55,0.1)", flexShrink: 0 }}>
              <ShieldCheck size={26} color="#d4af37" />
            </div>
            <div>
              <span style={{ color: "#d4af37", fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>OUR PROMISE: </span>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>Professional service. Affordable rates. Memorable experiences.</span>
            </div>
          </div>
          <p style={{ fontFamily: "'Georgia',serif", fontStyle: "italic", color: "#d4af37", fontSize: 20, margin: 0, textAlign: "right" }}>
            Your Journey,<br /><em>Our Priority.</em>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionTitle eyebrow="Got Questions?" title="FREQUENTLY ASKED QUESTIONS" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ border: `1.5px solid ${openFaq === i ? "#d4af37" : "#e2e8f0"}`, borderRadius: 12, overflow: "hidden", transition: "all 0.2s" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", background: openFaq === i ? "rgba(212,175,55,0.06)" : "#fff", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#0b1c3c", lineHeight: 1.4 }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} color="#d4af37" /> : <ChevronDown size={18} color="#94a3b8" />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: "4px 20px 20px", background: "rgba(212,175,55,0.04)" }}>
                    <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40, padding: 28, background: "linear-gradient(135deg,#0b1c3c,#1a3a6e)", borderRadius: 16 }}>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, margin: "0 0 16px" }}>Still have questions? We&apos;re here to help 24/7.</p>
            <a href="https://wa.me/2348114529540" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", color: "#fff", textDecoration: "none", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" style={{ background: "#fff", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Plane size={18} color="#d4af37" />
                <span style={{ fontSize: 22, fontWeight: 800 }}>
                  <span style={{ color: "#0b1c3c" }}>ZAMANI </span><span style={{ color: "#d4af37" }}>AIRLINKS</span>
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 28px", fontStyle: "italic" }}>Travels and Tours</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MessageCircle size={28} color="#fff" />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: "0 0 2px", letterSpacing: 1 }}>CONTACT US ON WHATSAPP</p>
                  <p style={{ fontSize: 26, fontWeight: 900, color: "#0b1c3c", margin: 0, letterSpacing: 1 }}>08114529540</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 110, height: 110, border: "2px dashed #d4af37", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fffbeb", marginBottom: 10 }}>
                  <QrCode size={52} color="#d4af37" />
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#0b1c3c", margin: 0 }}>SCAN ME</p>
                <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0 0" }}>to connect with us</p>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0b1c3c", margin: "0 0 16px", letterSpacing: 1 }}>QUICK LINKS</p>
                {["Home", "Services", "Tour Packages", "Visa Assistance", "FAQ", "Contact"].map(l => (
                  <a
                    key={l}
                    href="#"
                    style={{ display: "block", color: "#64748b", textDecoration: "none", fontSize: 14, padding: "4px 0" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "#d4af37"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "#64748b"}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: "#0b1c3c", margin: "0 -24px", padding: "18px 24px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <Plane size={14} color="#d4af37" />
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, letterSpacing: 2, fontWeight: 600 }}>TRAVEL BETTER. TRAVEL SMARTER. TRAVEL WITH ZAMANI AIRLINKS.</span>
              <Plane size={14} color="#d4af37" />
            </div>
          </div>
        </div>
      </footer>

      {/* ── CHATBOT ── */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        {chatOpen && (
          <div style={{ width: 340, height: 480, background: "#fff", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", marginBottom: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}>
            {/* Chat header */}
            <div style={{ background: "#0b1c3c", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#d4af37", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={20} color="#0b1c3c" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: 14 }}>Zara — Zamani AI</p>
                <p style={{ margin: 0, color: "#d4af37", fontSize: 11 }}>● Online · Replies instantly</p>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}><X size={18} /></button>
            </div>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, background: "#f8fafc" }}>
              {chatHistory.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "82%", padding: "10px 13px", borderRadius: msg.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: msg.from === "user" ? "#0b1c3c" : "#fff",
                    color: msg.from === "user" ? "#fff" : "#1e293b",
                    fontSize: 13, lineHeight: 1.6,
                    border: msg.from === "bot" ? "1px solid #e2e8f0" : "none",
                    whiteSpace: "pre-line"
                  }}>{msg.text}</div>
                </div>
              ))}
              {botTyping && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px 14px 14px 4px", padding: "10px 16px" }}>
                    <span style={{ display: "inline-flex", gap: 4 }}>
                      {[0, 1, 2].map(d => (
                        <span key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "#94a3b8", display: "inline-block", animation: `bounce 1s ${d * 0.15}s infinite` }} />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {/* Quick replies */}
            <div style={{ padding: "8px 12px 0", background: "#fff", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Flight prices", "Visa help", "Payment"].map(q => (
                <button key={q} onClick={() => { setChatMsg(q); }} style={{ fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 12, border: "1px solid #d4af37", background: "rgba(212,175,55,0.08)", color: "#b8960f", cursor: "pointer" }}>{q}</button>
              ))}
            </div>
            {/* Input */}
            <div style={{ padding: 12, background: "#fff", borderTop: "1px solid #f1f5f9", display: "flex", gap: 8 }}>
              <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Type your question..." style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "9px 12px", fontSize: 13, outline: "none" }} />
              <button onClick={sendChat} style={{ width: 38, height: 38, borderRadius: 10, background: "#0b1c3c", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                <Send size={16} color="#d4af37" />
              </button>
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)} style={{ width: 56, height: 56, borderRadius: "50%", background: "#0b1c3c", border: "3px solid #d4af37", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.25)", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          {chatOpen ? <X size={22} color="#d4af37" /> : <MessageCircle size={24} color="#d4af37" />}
        </button>
      </div>

      <style>{`
        @media (max-width:768px){.desktop-nav{display:none!important}.hamburger{display:flex!important}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
      `}</style>
    </div>
  );
}

/* ── SUBCOMPONENTS ── */
function SectionTitle({ eyebrow, title }: { eyebrow: string, title: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 12 }}>
        <div style={{ height: 1, width: 80, background: "linear-gradient(to right,transparent,#d4af37)" }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: "#d4af37", letterSpacing: 3 }}>{eyebrow.toUpperCase()}</span>
        <div style={{ height: 1, width: 80, background: "linear-gradient(to left,transparent,#d4af37)" }} />
      </div>
      <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#0b1c3c", margin: 0 }}>{title}</h2>
    </div>
  );
}

function FlightCard({ deal, cls }: { deal: typeof FLIGHT_DEALS[0], cls: string }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const price = cls === "Economy" ? deal.economy : deal.business;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hovered ? "#d4af37" : "#e2e8f0"}`,
        borderRadius: 18, overflow: "hidden",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 48px rgba(11,28,60,0.16)" : "0 2px 10px rgba(0,0,0,0.06)",
        cursor: "default"
      }}
    >
      {/* ── IMAGE HERO ── */}
      <div style={{ position: "relative", height: 190, overflow: "hidden", background: "#0b1c3c" }}>
        {!imgErr ? (
          <img
            src={deal.img}
            alt={deal.to}
            onError={() => setImgErr(true)}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)"
            }}
          />
        ) : (
          /* fallback gradient when image fails */
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0b1c3c,#1a3a6e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plane size={48} color="rgba(212,175,55,0.3)" />
          </div>
        )}

        {/* dark scrim for text readability */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(11,28,60,0.72) 100%)" }} />

        {/* tag badge — top left */}
        <span style={{
          position: "absolute", top: 12, left: 12,
          background: deal.tagColor, color: "#fff",
          fontSize: 10, fontWeight: 800, padding: "4px 10px",
          borderRadius: 20, letterSpacing: 0.8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
        }}>{deal.tag}</span>

        {/* airline pill — top right */}
        <span style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(6px)",
          color: "#fff", fontSize: 11, fontWeight: 700,
          padding: "4px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.25)"
        }}>{deal.airline}</span>

        {/* route overlay — bottom of image */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px" }}>
          <p style={{ margin: "0 0 6px", color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>{deal.country}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div>
              <p style={{ margin: 0, color: "#fff", fontWeight: 900, fontSize: 20, lineHeight: 1 }}>{deal.from_code}</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: 10 }}>{deal.from}</p>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ display: "flex", alignItems: "center", width: "100%", gap: 4 }}>
                <div style={{ flex: 1, height: 1, background: "rgba(212,175,55,0.6)" }} />
                <Plane size={14} color="#d4af37" />
                <div style={{ flex: 1, height: 1, background: "rgba(212,175,55,0.6)" }} />
              </div>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{deal.duration} · {deal.stops}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, color: "#fff", fontWeight: 900, fontSize: 20, lineHeight: 1 }}>{deal.to_code}</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: 10 }}>{deal.to}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARD BODY ── */}
      <div style={{ padding: "16px 18px" }}>
        {/* Meta row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Clock size={13} color="#94a3b8" />
              <span style={{ fontSize: 12, color: "#64748b" }}>{deal.duration}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <MapPin size={13} color="#94a3b8" />
              <span style={{ fontSize: 12, color: "#64748b" }}>{deal.stops}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={11} color="#d4af37" fill="#d4af37" />)}
          </div>
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 2 }}>{cls} · from</span>
            <span style={{ fontSize: 26, fontWeight: 900, color: "#0b1c3c", letterSpacing: -0.5 }}>{fmt(price)}</span>
            <span style={{ fontSize: 11, color: "#94a3b8" }}> /person</span>
          </div>
          <button
            style={{ background: "#d4af37", color: "#0b1c3c", border: "none", borderRadius: 10, padding: "11px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e8c84a"; e.currentTarget.style.transform = "scale(1.04)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "#d4af37"; e.currentTarget.style.transform = "scale(1)" }}>
            Book Now <ArrowRight size={14} />
          </button>
        </div>

        {/* Footer chips */}
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f1f5f9", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#16a34a", display: "flex", alignItems: "center", gap: 4 }}>
            <Shield size={11} /> Secure booking
          </span>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>·</span>
          <span style={{ fontSize: 11, color: "#64748b" }}>Departs {deal.date}</span>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>·</span>
          <span style={{ fontSize: 11, color: "#64748b" }}>{cls} class</span>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ Icon, title, desc }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: "#fff", border: `1px solid ${hovered ? "#d4af37" : "#e2e8f0"}`, borderRadius: 16, padding: "32px 28px",
      transition: "all 0.25s", transform: hovered ? "translateY(-4px)" : "translateY(0)",
      boxShadow: hovered ? "0 12px 40px rgba(11,28,60,0.12)" : "0 2px 8px rgba(0,0,0,0.04)", cursor: "default"
    }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: hovered ? "#0b1c3c" : "#f0f4ff", border: `2px solid ${hovered ? "#d4af37" : "transparent"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "all 0.25s" }}>
        <Icon size={26} color={hovered ? "#d4af37" : "#0b1c3c"} />
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0b1c3c", margin: "0 0 10px" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}