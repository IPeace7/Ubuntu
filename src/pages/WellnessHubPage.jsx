import { Heart, ChevronRight, Play } from "lucide-react";

const DAILY_WELLNESS = [
  { title: "Guided Meditation", desc: "Calm your mind", sub: "12 sessions", emoji: "🧘" },
  { title: "Breathing Exercises", desc: "Reduce stress", sub: "8 exercises", emoji: "💨" },
  { title: "Sleep Better", desc: "Improve your sleep", sub: "19 tips", emoji: "🌙" },
  { title: "Mood Tracker", desc: "Track your moods", sub: "Daily check-in", emoji: "😊" },
];

const SELF_CARE = [
  { title: "Gratitude Journal", desc: "Build positivity with daily gratitude.", badge: "Try it", emoji: "📓" },
  { title: "Self Love Affirmations", desc: "Grow positive affirmations.", badge: "Start now", emoji: "💜" },
  { title: "Affirmations", desc: "Grow positive affirmations.", badge: "Listen", emoji: "🎧" },
  { title: "Focus & Concentration", desc: "Improve focus and concentration.", badge: "Explore", emoji: "🎯" },
];

const COLLECTIONS = [
  { title: "Morning Mindset", desc: "Start your day right", img: "/story1.jpeg" },
  { title: "Stress Relief", desc: "Breathe, a quick video", img: "/story2.jpeg" },
  { title: "Better Sleep", desc: "Sleep care routines", img: "/story3.jpeg" },
  { title: "Emotional Healing", desc: "Heal and move forward", img: "/story1.jpeg" },
];

export default function WellnessHubPage() {
  return (
    <div className="wh-page">
      <div className="wh-header">
        <Heart size={22} className="wh-header-icon" />
        <div>
          <h1>Wellness Hub</h1>
          <p>Take care of your mind and body.</p>
        </div>
      </div>

      {/* DAILY WELLNESS */}
      <section className="wh-section">
        <div className="wh-section-head">
          <h2>Daily Wellness</h2>
          <button className="wh-see-all">See all <ChevronRight size={13} /></button>
        </div>
        <div className="wh-wellness-grid">
          {DAILY_WELLNESS.map(w => (
            <div className="wh-wellness-card" key={w.title}>
              <span className="wh-wellness-emoji">{w.emoji}</span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <span>{w.sub}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="wh-two-col">
        {/* SELF CARE TOOLS */}
        <section className="wh-section">
          <div className="wh-section-head">
            <h2>Self Care Tools</h2>
          </div>
          <div className="wh-selfcare-list">
            {SELF_CARE.map(s => (
              <div className="wh-selfcare-row" key={s.title}>
                <span className="wh-selfcare-emoji">{s.emoji}</span>
                <div className="wh-selfcare-info">
                  <p>{s.title}</p>
                  <span>{s.desc}</span>
                </div>
                <button className="wh-selfcare-badge">{s.badge}</button>
              </div>
            ))}
          </div>
        </section>

        {/* DAILY TIP */}
        <div className="wh-daily-tip">
          <p className="wh-tip-label">Daily Tip</p>
          <p className="wh-tip-text">"You are allowed to be both a masterpiece and a work in progress at the same time."</p>
          <Heart size={22} className="wh-tip-heart" />
        </div>
      </div>

      {/* WELLNESS COLLECTIONS */}
      <section className="wh-section">
        <div className="wh-section-head">
          <h2>Wellness Collections</h2>
          <button className="wh-see-all">See all <ChevronRight size={13} /></button>
        </div>
        <div className="wh-collections-grid">
          {COLLECTIONS.map(c => (
            <div className="wh-collection-card" key={c.title}>
              <img src={c.img} alt={c.title} className="wh-collection-img" />
              <div className="wh-collection-overlay">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
