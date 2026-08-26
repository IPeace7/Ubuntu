import { useState } from "react";
import logo from "../assets/Logo.svg";
import {
  BookOpen, Users, HeartHandshake, UserCheck,
  Shield, Heart, Star, ChevronDown, ChevronRight,
  ArrowRight, Menu, X
} from "lucide-react";

/* ── shared nav ── */
function Navbar({ onLogin, onSignup, activePage, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About Us", "Features", "Stories", "For You", "Professionals"];

  return (
    <nav className="ln-nav">
      <div className="ln-nav-inner">
        <img src={logo} alt="Inside Out" className="ln-nav-logo" />

        <div className={`ln-nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <button
              key={l}
              className={`ln-nav-link ${activePage === l ? "ln-nav-link-active" : ""}`}
              onClick={() => { setPage(l); setMenuOpen(false); }}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="ln-nav-actions">
          <button className="ln-btn-ghost" onClick={onLogin}>Log In</button>
          <button className="ln-btn-primary" onClick={onSignup}>Sign Up</button>
        </div>

        <button className="ln-hamburger" onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="ln-footer">
      <div className="ln-footer-inner">
        <div className="ln-footer-brand">
          <img src={logo} alt="Inside Out" className="ln-footer-logo" />
          <p>A safe space for everyone. Express, heal, and grow — at your own pace.</p>
        </div>
        <div className="ln-footer-links">
          {["Home", "About Us", "Features", "Stories", "For You", "Professionals"].map(l => (
            <button key={l} onClick={() => setPage(l)}>{l}</button>
          ))}
        </div>
        <div className="ln-footer-legal">
          {["Privacy Policy", "Terms of Service", "Contact Us", "Crisis Help"].map(l => (
            <button key={l}>{l}</button>
          ))}
        </div>
      </div>
      <div className="ln-footer-bottom">
        <span>© 2025 Inside Out. All rights reserved.</span>
        <Heart size={14} className="ln-footer-heart" />
      </div>
    </footer>
  );
}

/* ══════════════════════════════════
   HOME PAGE
══════════════════════════════════ */
function HomePage({ onSignup, onLogin }) {
  const features = [
    { icon: <BookOpen size={22} />, title: "Personal Journal", desc: "Write your thoughts and reflect in your private journal." },
    { icon: <Users size={22} />, title: "Real Stories", desc: "Read and share testimonies from people who've been there." },
    { icon: <HeartHandshake size={22} />, title: "Connect & Support", desc: "Talk to others who understand or seek professional help." },
    { icon: <Heart size={22} />, title: "For You", desc: "Discover content and tools tailored to how you feel." },
  ];

  const pillars = [
    { icon: <Shield size={18} />, title: "Safe & Private", desc: "Your privacy always matters." },
    { icon: <Users size={18} />, title: "Real People", desc: "A community that cares." },
    { icon: <Star size={18} />, title: "Judgement Free", desc: "You can be yourself." },
  ];

  return (
    <div className="ln-page">
      {/* HERO */}
      <section className="ln-hero">
        <div className="ln-hero-left">
          <span className="ln-hero-badge">✦ A safe space for every mind</span>
          <h1 className="ln-hero-h1">
            It's okay not to be okay.<br />
            <span className="ln-hero-accent">You're not alone here.</span>
          </h1>
          <p className="ln-hero-sub">
            Inside Out is a supportive community where you can express, reflect, and grow — at your own pace, in your own way.
          </p>
          <div className="ln-hero-btns">
            <button className="ln-btn-primary ln-btn-lg" onClick={onSignup}>
              Get Started <ArrowRight size={16} />
            </button>
            <button className="ln-btn-ghost ln-btn-lg" onClick={() => {}}>
              Learn More <ChevronDown size={16} />
            </button>
          </div>
        </div>
        <div className="ln-hero-right">
          <div className="ln-hero-img-wrap">
            <img src="/signup-bg.png" alt="hero" className="ln-hero-img" />
            <div className="ln-hero-card">
              <Shield size={16} className="ln-hero-card-icon" />
              <div>
                <p className="ln-hero-card-title">Your story stays yours.</p>
                <p className="ln-hero-card-sub">Share anonymously or openly. You're in control.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="ln-features-strip">
        {features.map((f) => (
          <div className="ln-feat-card" key={f.title}>
            <span className="ln-feat-icon">{f.icon}</span>
            <div>
              <p className="ln-feat-title">{f.title}</p>
              <p className="ln-feat-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* YOU'RE NOT ALONE */}
      <section className="ln-alone-section">
        <div className="ln-alone-left">
          <h2 className="ln-section-h2">You're not alone</h2>
          <p className="ln-alone-p">Many people carry their struggles in silence. Inside Out is here to change that.</p>
          <div className="ln-pillars">
            {pillars.map((p) => (
              <div className="ln-pillar" key={p.title}>
                <span className="ln-pillar-icon">{p.icon}</span>
                <div>
                  <p className="ln-pillar-title">{p.title}</p>
                  <p className="ln-pillar-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ln-alone-right">
          <div className="ln-testimonial">
            <span className="ln-quote-mark">"</span>
            <p className="ln-quote-text">Inside Out helped me understand my emotions and made me feel less alone.</p>
            <p className="ln-quote-author">— Anonymous</p>
          </div>
          <div className="ln-alone-deco" />
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="ln-cta-banner">
        <h2 className="ln-cta-h2">You don't have to go through it alone.</h2>
        <p className="ln-cta-sub">Join Inside Out today and take the first step toward feeling better.</p>
        <button className="ln-btn-primary ln-btn-lg ln-btn-white" onClick={onSignup}>
          Create your free account <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}

/* ══════════════════════════════════
   ABOUT PAGE
══════════════════════════════════ */
function AboutPage() {
  return (
    <div className="ln-page">
      <section className="ln-inner-hero ln-inner-hero-about">
        <h1>About Us</h1>
        <p>We built Inside Out because we believe everyone deserves a safe space to express, heal, and grow.</p>
      </section>

      <section className="ln-about-body">
        <div className="ln-about-text">
          <p>Inside Out is for the many people who suffer in silence due to loss, stigma, or uncertainty.</p>
          <p>Inside Out is changing this by providing a platform where anyone can be themselves, connect, and find the help they need — anytime, anywhere.</p>
        </div>
        <div className="ln-about-img-wrap">
          <img src="/story2.jpeg" alt="About" className="ln-about-img" />
        </div>
      </section>

      <section className="ln-mvv">
        {[
          { icon: "🎯", title: "Our Mission", desc: "To normalize emotional wellness and promote professional wellbeing for all." },
          { icon: "👁️", title: "Our Vision", desc: "A world where anyone can find the support they need to heal and thrive." },
          { icon: "💜", title: "Our Values", desc: "Compassion. Empathy. Transparency. Privacy. Inclusion." },
        ].map((m) => (
          <div className="ln-mvv-card" key={m.title}>
            <span className="ln-mvv-icon">{m.icon}</span>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

/* ══════════════════════════════════
   FEATURES PAGE
══════════════════════════════════ */
function FeaturesPage({ onSignup }) {
  const features = [
    { icon: <BookOpen size={28} />, title: "Personal Journal", desc: "Write your thoughts and reflect in your private journal, protected by end-to-end encryption." },
    { icon: <Users size={28} />, title: "Real Stories", desc: "Read anonymous testimonies and stories from people who've been through similar experiences." },
    { icon: <HeartHandshake size={28} />, title: "Connect & Support", desc: "Talk to others who understand, or seek guidance from certified mental health professionals." },
    { icon: <Heart size={28} />, title: "For You", desc: "Personalized content and tools tailored to how you feel, curated just for you." },
    { icon: <Shield size={28} />, title: "Safe & Private", desc: "Your privacy always comes first. You choose what to share and who sees it." },
    { icon: <UserCheck size={28} />, title: "Always Here", desc: "Access support whenever you need it — day or night, anytime, anywhere." },
  ];

  return (
    <div className="ln-page">
      <section className="ln-inner-hero">
        <h1>Features <span className="ln-sparkle">✦</span></h1>
        <p>Everything you need for your mental wellness journey, all in one place.</p>
      </section>
      <section className="ln-features-grid">
        {features.map((f) => (
          <div className="ln-features-grid-card" key={f.title}>
            <span className="ln-features-grid-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

/* ══════════════════════════════════
   STORIES PAGE
══════════════════════════════════ */
const STORY_DATA = [
  { quote: "For a long time, I thought I was the only one feeling this way. Sharing my story here helped me heal.", author: "Anonymous", tags: ["Anxiety"], photo: "/story1.jpeg" },
  { quote: "It gets better. I promise. Inside Out gave me a safe place when I had none.", author: "Anonymous", tags: ["Depression", "Growth"], photo: "/story2.jpeg" },
  { quote: "Writing in my journal here was the best decision I ever made.", author: "Sandra", tags: ["Healing"], photo: "/story3.jpeg" },
  { quote: "Talking to a professional here was a decision that changed my life forever.", author: "Anonymous", tags: ["Healing"], photo: "/story1.jpeg" },
];

const STORY_FILTERS = ["All", "Anxiety", "Depression", "Growth", "Healing", "Relationships"];

function StoriesPage({ onSignup }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? STORY_DATA : STORY_DATA.filter(s => s.tags.includes(active));

  return (
    <div className="ln-page">
      <section className="ln-inner-hero">
        <h1>Real Stories. Real People.</h1>
        <p>Real stories from people who've been there.</p>
      </section>

      <div className="ln-story-filters">
        {STORY_FILTERS.map(f => (
          <button key={f} className={`ln-filter-btn ${active === f ? "active" : ""}`} onClick={() => setActive(f)}>{f}</button>
        ))}
      </div>

      <section className="ln-stories-grid">
        {filtered.map((s, i) => (
          <div className="ln-story-card" key={i}>
            <p className="ln-story-quote">"{s.quote}"</p>
            <p className="ln-story-author">— {s.author}</p>
            <div className="ln-story-tags">
              {s.tags.map(t => <span key={t} className="ln-story-tag">{t}</span>)}
            </div>
            <button className="ln-story-read">Read more →</button>
          </div>
        ))}
      </section>

      <div className="ln-center">
        <button className="ln-btn-outline" onClick={onSignup}>View all stories</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   FOR YOU PAGE  (reuses Features layout)
══════════════════════════════════ */
function ForYouPage({ onSignup }) {
  return (
    <div className="ln-page">
      <section className="ln-inner-hero">
        <h1>For You <span className="ln-sparkle">✦</span></h1>
        <p>Personalised content and resources tailored to your journey.</p>
      </section>
      <section className="ln-features-grid">
        {[
          { icon: <BookOpen size={28} />, title: "Your Journal", desc: "A private space to write, reflect, and track your emotional growth over time." },
          { icon: <Heart size={28} />, title: "Mood Check-ins", desc: "Daily mood tracking so you can understand patterns and progress." },
          { icon: <HeartHandshake size={28} />, title: "Curated Resources", desc: "Articles, guides, and tools hand-picked based on what you're going through." },
          { icon: <UserCheck size={28} />, title: "Professional Match", desc: "We'll help you find the right therapist or counsellor for your needs." },
        ].map((f) => (
          <div className="ln-features-grid-card" key={f.title}>
            <span className="ln-features-grid-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

/* ══════════════════════════════════
   PROFESSIONALS PAGE
══════════════════════════════════ */
const PROS = [
  { name: "Dr. Alina Uwase", role: "Clinical Psychologist", tags: ["Anxiety", "Depression"], rating: 4.9, reviews: 128, img: "/story1.jpeg" },
  { name: "Jean Claude", role: "Counsellor", tags: ["Stress", "Relationships"], rating: 4.8, reviews: 97, img: "/story2.jpeg" },
  { name: "Dr. Angelique", role: "Psychiatrist", tags: ["Mood Disorders"], rating: 4.7, reviews: 74, img: "/story3.jpeg" },
  { name: "M. Innocent", role: "Life & Wellness Coach", tags: ["Self-growth"], rating: 4.7, reviews: 55, img: "/story1.jpeg" },
];

const PRO_FILTERS = ["Therapists", "Counsellors", "Nutritionists", "Coaches"];

function ProfessionalsPage({ onSignup }) {
  const [activeFilter, setActiveFilter] = useState("Therapists");

  return (
    <div className="ln-page">
      <section className="ln-inner-hero">
        <h1>Professionals <span className="ln-sparkle">✦</span></h1>
        <p>Connect with certified mental wellness professionals near you.</p>
      </section>

      <div className="ln-pro-filters">
        {PRO_FILTERS.map(f => (
          <button key={f} className={`ln-filter-btn ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
        <input className="ln-pro-search" placeholder="Search professionals..." />
      </div>

      <section className="ln-pro-grid">
        {PROS.map((p) => (
          <div className="ln-pro-card" key={p.name}>
            <img src={p.img} alt={p.name} className="ln-pro-img" />
            <div className="ln-pro-info">
              <h3 className="ln-pro-name">{p.name}</h3>
              <p className="ln-pro-role">{p.role}</p>
              <div className="ln-pro-tags">
                {p.tags.map(t => <span key={t} className="ln-pro-tag">{t}</span>)}
              </div>
              <div className="ln-pro-rating">
                <Star size={13} fill="#f5a623" color="#f5a623" />
                <span>{p.rating} ({p.reviews})</span>
              </div>
              <button className="ln-btn-outline ln-pro-btn" onClick={onSignup}>View Profile</button>
            </div>
          </div>
        ))}
      </section>

      <div className="ln-center">
        <button className="ln-btn-outline" onClick={onSignup}>View all professionals →</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   ROOT EXPORT
══════════════════════════════════ */
export default function LandingPage({ onLogin, onSignup }) {
  const [page, setPage] = useState("Home");

  const renderPage = () => {
    switch (page) {
      case "About Us":     return <AboutPage />;
      case "Features":     return <FeaturesPage onSignup={onSignup} />;
      case "Stories":      return <StoriesPage onSignup={onSignup} />;
      case "For You":      return <ForYouPage onSignup={onSignup} />;
      case "Professionals":return <ProfessionalsPage onSignup={onSignup} />;
      default:             return <HomePage onSignup={onSignup} onLogin={onLogin} />;
    }
  };

  return (
    <div className="ln-root">
      <Navbar onLogin={onLogin} onSignup={onSignup} activePage={page} setPage={setPage} />
      {renderPage()}
      <Footer setPage={setPage} />
    </div>
  );
}
