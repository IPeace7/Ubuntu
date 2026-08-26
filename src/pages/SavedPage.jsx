import { Bookmark, BookOpen, Heart, Music, Play, ChevronRight } from "lucide-react";

const SAVED_STORIES = [
  { title: "Learning to Calm My Mind", tag: "Anxiety", desc: "How I found peace in the middle of my anxiety.", time: "Saved 2 days ago", img: "/story1.jpeg" },
  { title: "Small Steps, Big Change", tag: "Growth", desc: "It's okay to go slow. Progress is still progress.", time: "Saved 7 days ago", img: "/story2.jpeg" },
  { title: "Choosing Myself Every Day", tag: "Healing", desc: "A gentle reminder that your healing is yours.", time: "Saved 2 weeks ago", img: "/story3.jpeg" },
];

const SAVED_RESOURCES = [
  { title: "Anxiety Toolkit", desc: "Practical tools to manage anxiety and stress.", type: "Guide", icon: "📘" },
  { title: "Self Love Journal Prompts", desc: "Prompts to help you reflect and grow.", type: "Journal", icon: "💜" },
  { title: "Mindfulness for Beginners", desc: "Simple mindfulness exercises to try daily.", type: "Audio", icon: "🎧" },
];

const SAVED_EXERCISES = [
  { title: "Breathing Exercise", duration: "4 min" },
  { title: "Grounding Technique", duration: "5 min" },
  { title: "Body Scan Meditation", duration: "10 min" },
];

const TABS = ["All", "Stories", "Resources", "New", "Exercises", "Guides", "Posts"];

export default function SavedPage() {
  return (
    <div className="sp-page">
      {/* HEADER */}
      <div className="sp-header">
        <Bookmark size={22} className="sp-header-icon" />
        <div>
          <h1>Saved</h1>
          <p>Your saved stories, posts, and resources.</p>
        </div>
      </div>

      {/* SEARCH */}
      <input className="sp-search" placeholder="Search saved items..." />

      {/* TABS */}
      <div className="sp-tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`sp-tab ${i === 0 ? "active" : ""}`}>{t}</button>
        ))}
      </div>

      {/* SAVED STORIES */}
      <section className="sp-section">
        <div className="sp-section-head">
          <h2>Saved Stories</h2>
          <button className="sp-see-all">See all <ChevronRight size={13} /></button>
        </div>
        <div className="sp-stories-grid">
          {SAVED_STORIES.map(s => (
            <div className="sp-story-card" key={s.title}>
              <div className="sp-story-img-wrap">
                <img src={s.img} alt={s.title} className="sp-story-img" />
                <span className="sp-story-tag">{s.tag}</span>
              </div>
              <div className="sp-story-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="sp-story-time">{s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAVED RESOURCES */}
      <section className="sp-section">
        <div className="sp-section-head">
          <h2>Saved Resources</h2>
          <button className="sp-see-all">See all <ChevronRight size={13} /></button>
        </div>
        <div className="sp-resources-list">
          {SAVED_RESOURCES.map(r => (
            <div className="sp-resource-row" key={r.title}>
              <span className="sp-resource-icon">{r.icon}</span>
              <div className="sp-resource-info">
                <p>{r.title}</p>
                <span>{r.desc}</span>
              </div>
              <span className="sp-resource-type">{r.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SAVED EXERCISES */}
      <section className="sp-section">
        <div className="sp-section-head">
          <h2>Saved Exercises</h2>
          <button className="sp-see-all">See all <ChevronRight size={13} /></button>
        </div>
        <div className="sp-exercises-grid">
          {SAVED_EXERCISES.map(e => (
            <div className="sp-exercise-card" key={e.title}>
              <button className="sp-play-btn"><Play size={16} fill="currentColor" /></button>
              <p>{e.title}</p>
              <span>{e.duration}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
