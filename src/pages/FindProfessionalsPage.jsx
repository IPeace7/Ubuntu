import { useState } from "react";
import { Search, Star, ChevronLeft, ChevronRight } from "lucide-react";

const PROS = [
  { name: "Dr. Alina Uwase", role: "Clinical Psychologist", tags: ["Anxiety", "Depression"], rating: 4.9, reviews: 128, img: "/story1.jpeg", available: true },
  { name: "Jean Claude", role: "Counsellor", tags: ["Stress", "Relationships"], rating: 4.8, reviews: 97, img: "/story2.jpeg", available: true },
  { name: "Dr. Angelique", role: "Psychiatrist", tags: ["Mood Disorders"], rating: 4.7, reviews: 74, img: "/story3.jpeg", available: false },
  { name: "M. Innocent", role: "Life & Wellness Coach", tags: ["Self-growth"], rating: 4.7, reviews: 55, img: "/story1.jpeg", available: true },
  { name: "M. Claudine", role: "Counsellor", tags: ["Trauma", "Healing"], rating: 4.8, reviews: 61, img: "/story2.jpeg", available: true },
  { name: "Emmanuel K.", role: "Therapist", tags: ["Anxiety", "Stress"], rating: 4.6, reviews: 43, img: "/story3.jpeg", available: false },
];

const FILTER_TABS = ["All", "Therapists", "Counsellors", "Psychiatrists", "Coaches"];

export default function FindProfessionalsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = PROS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fp-page">
      <div className="fp-header">
        <div className="fp-header-icon">🩺</div>
        <div>
          <h1>Find Professionals</h1>
          <p>Connect with trusted mental health professionals.</p>
        </div>
      </div>

      <div className="fp-controls">
        <div className="fp-search-wrap">
          <Search size={14} className="fp-search-icon" />
          <input className="fp-search" placeholder="Search professionals..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="fp-filter-btn">Filters</button>
      </div>

      <div className="fp-filter-tabs">
        {FILTER_TABS.map(f => (
          <button key={f} className={`fp-tab ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="fp-grid">
        {filtered.map(p => (
          <div className="fp-card" key={p.name}>
            <img src={p.img} alt={p.name} className="fp-card-img" />
            <div className="fp-card-body">
              <div className="fp-availability">
                <span className={`fp-avail-dot ${p.available ? "green" : "gray"}`} />
                <span>{p.available ? "Available" : "Unavailable"}</span>
              </div>
              <h3>{p.name}</h3>
              <p className="fp-role">{p.role}</p>
              <div className="fp-tags">
                {p.tags.map(t => <span key={t} className="fp-tag">{t}</span>)}
              </div>
              <div className="fp-rating">
                <Star size={12} fill="#f5a623" color="#f5a623" />
                <span>{p.rating} ({p.reviews})</span>
              </div>
              <button className="fp-view-btn">View Profile</button>
            </div>
          </div>
        ))}
      </div>

      <div className="fp-pagination">
        <button className="fp-pg-btn"><ChevronLeft size={14} /></button>
        {[1,2,3,"...",6,7].map((p, i) => (
          <button key={i} className={`fp-pg-btn ${p === 1 ? "active" : ""}`}>{p}</button>
        ))}
        <button className="fp-pg-btn"><ChevronRight size={14} /></button>
      </div>
    </div>
  );
}
