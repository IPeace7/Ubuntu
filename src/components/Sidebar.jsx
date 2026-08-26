import { Heart, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/Logo.svg";
import { navMain, support } from "../data/constants";

export default function Sidebar({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="mobile-topbar">
        <button onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button>
        <img src={logo} alt="Inside Out" />
        <div />
      </div>

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand-wrap">
          <img className="brand" src={logo} alt="Inside Out" />
        </div>

        <nav className="main-nav">
          {navMain.map(([Icon, label]) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "active" : ""}`}
              onClick={() => { setActive(label); setMenuOpen(false); }}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === "Notifications" && <span className="notification-count">3</span>}
            </button>
          ))}
        </nav>

        <div className="divider" />
        <div className="support-title">Support</div>

        <nav className="support-nav">
          {support.map(([Icon, label]) => (
            <button key={label} className="nav-item support-item"
              onClick={() => { setActive(label); setMenuOpen(false); }}>
              <Icon size={17} strokeWidth={1.7} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="safe-card">
          <div className="safe-art"><div className="safe-person" /></div>
          <div className="safe-copy">It's okay not to be okay.<br /><strong>You're not alone here.</strong></div>
          <Heart className="safe-heart" size={19} />
        </div>

        <button className="profile-card">
          <div className="profile-avatar" />
          <div className="profile-copy"><strong>Maya</strong><span>View profile</span></div>
          <ChevronDown size={15} />
        </button>
      </aside>
    </>
  );
}
