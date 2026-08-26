import { Phone, MessageSquare, MessageCircle, Heart, ChevronRight, Shield } from "lucide-react";

const RESOURCES = [
  { q: "Is it an emergency?", desc: "If you're in a life-threatening situation, call emergency services." },
  { q: "Tips to stay safe", desc: "Learn how to keep yourself and others psychologically safe right now." },
  { q: "Find local support", desc: "Find support windows near you." },
];

export default function CrisisHelpPage() {
  return (
    <div className="ch-page">
      <div className="ch-header">
        <Phone size={22} className="ch-header-icon" />
        <div>
          <h1>Crisis Help</h1>
          <p>You matter. Help is here for you.</p>
        </div>
      </div>

      {/* HERO BANNER */}
      <div className="ch-banner">
        <div className="ch-banner-left">
          <h2>If you're in crisis or need immediate support, please reach out.</h2>
          <p>You are not alone. There is always someone who wants to help.</p>
        </div>
        <div className="ch-banner-art">
          <Heart size={64} className="ch-banner-heart" />
        </div>
      </div>

      {/* IMMEDIATE SUPPORT */}
      <section className="ch-section">
        <h2>Immediate Support</h2>
        <div className="ch-support-grid">
          <div className="ch-support-card">
            <span className="ch-support-icon" style={{ background: "#eee8ff", color: "#6636ee" }}><Phone size={20} /></span>
            <div>
              <h3>Call a HelpLine</h3>
              <p>Talk to a trained professional available 24/7.</p>
            </div>
            <button className="ch-action-btn">Call Now</button>
          </div>
          <div className="ch-support-card">
            <span className="ch-support-icon" style={{ background: "#e8f6ed", color: "#3e9362" }}><MessageSquare size={20} /></span>
            <div>
              <h3>Text Support</h3>
              <p>Text HOME to 5000 to reach a crisis counsellor.</p>
            </div>
            <button className="ch-action-btn">Text Now</button>
          </div>
          <div className="ch-support-card">
            <span className="ch-support-icon" style={{ background: "#fff0df", color: "#e88c2d" }}><MessageCircle size={20} /></span>
            <div>
              <h3>Live Chat</h3>
              <p>Chat anonymously with a support counsellor.</p>
            </div>
            <button className="ch-action-btn">Start Chat</button>
          </div>
        </div>
      </section>

      <div className="ch-two-col">
        {/* HELPFUL RESOURCES */}
        <section className="ch-section">
          <h2>Helpful Resources</h2>
          <div className="ch-resources-list">
            {RESOURCES.map(r => (
              <div className="ch-resource-row" key={r.q}>
                <div>
                  <p>{r.q}</p>
                  <span>{r.desc}</span>
                </div>
                <ChevronRight size={16} className="ch-resource-arrow" />
              </div>
            ))}
          </div>
        </section>

        {/* AFFIRMATION CARD */}
        <div className="ch-affirmation">
          <p>You're important.</p>
          <p>You're loved.</p>
          <p>You're not alone.</p>
          <Heart size={32} className="ch-aff-heart" />
        </div>
      </div>

      {/* FOOTER BANNER */}
      <div className="ch-footer-banner">
        <Heart size={18} />
        <span>Need help now? You are not alone.</span>
        <button className="ch-reach-btn">Reach out. Help is here.</button>
      </div>
    </div>
  );
}
