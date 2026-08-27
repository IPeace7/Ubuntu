import { useState } from "react";
import { Bookmark, ChevronRight, Play, Pause, X, BookOpen, ExternalLink, Trash2 } from "lucide-react";

const INITIAL_STORIES = [
  { id: 1, title: "Learning to Calm My Mind", tag: "Anxiety", desc: "How I found peace in the middle of my anxiety.", time: "Saved 2 days ago", img: "/story1.jpeg" },
  { id: 2, title: "Small Steps, Big Change", tag: "Growth", desc: "It's okay to go slow. Progress is still progress.", time: "Saved 7 days ago", img: "/story2.jpeg" },
  { id: 3, title: "Choosing Myself Every Day", tag: "Healing", desc: "A gentle reminder that your healing is yours.", time: "Saved 2 weeks ago", img: "/story3.jpeg" },
];

const INITIAL_RESOURCES = [
  { id: 1, title: "Anxiety Toolkit", desc: "Practical tools to manage anxiety and stress.", type: "Guide", icon: "📘" },
  { id: 2, title: "Self Love Journal Prompts", desc: "Prompts to help you reflect and grow.", type: "Journal", icon: "💜" },
  { id: 3, title: "Mindfulness for Beginners", desc: "Simple mindfulness exercises to try daily.", type: "Audio", icon: "🎧" },
];

const INITIAL_EXERCISES = [
  { id: 1, title: "Breathing Exercise", duration: "4 min" },
  { id: 2, title: "Grounding Technique", duration: "5 min" },
  { id: 3, title: "Body Scan Meditation", duration: "10 min" },
];

const TABS = ["All", "Stories", "Resources", "Exercises", "Guides", "Posts"];

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [exercises, setExercises] = useState(INITIAL_EXERCISES);
  const [playing, setPlaying] = useState(null);
  const [expandedStory, setExpandedStory] = useState(null);
  const [expandedResource, setExpandedResource] = useState(null);

  const removeStory = (id) => setStories(prev => prev.filter(s => s.id !== id));
  const removeResource = (id) => setResources(prev => prev.filter(r => r.id !== id));
  const removeExercise = (id) => setExercises(prev => prev.filter(e => e.id !== id));

  const filteredStories = stories.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) || s.tag.toLowerCase().includes(search.toLowerCase())
  );
  const filteredResources = resources.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredExercises = exercises.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const showStories = activeTab === "All" || activeTab === "Stories";
  const showResources = activeTab === "All" || activeTab === "Resources" || activeTab === "Guides";
  const showExercises = activeTab === "All" || activeTab === "Exercises";

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
      <input
        className="sp-search"
        placeholder="Search saved items..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* TABS */}
      <div className="sp-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`sp-tab ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* SAVED STORIES */}
      {showStories && filteredStories.length > 0 && (
        <section className="sp-section">
          <div className="sp-section-head">
            <h2>Saved Stories</h2>
            <button className="sp-see-all" onClick={() => setActiveTab("Stories")}>
              See all <ChevronRight size={13} />
            </button>
          </div>
          <div className="sp-stories-grid">
            {filteredStories.map(s => (
              <div className="sp-story-card" key={s.id}>
                <div className="sp-story-img-wrap">
                  <img src={s.img} alt={s.title} className="sp-story-img" />
                  <span className="sp-story-tag">{s.tag}</span>
                  <button
                    className="sp-remove-btn"
                    onClick={() => removeStory(s.id)}
                    title="Remove from saved"
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="sp-story-body">
                  <h3>{s.title}</h3>
                  <p>{expandedStory === s.id ? s.desc + " This is a meaningful story about healing, growth, and finding peace within yourself." : s.desc}</p>
                  <div className="sp-story-actions">
                    <span className="sp-story-time">{s.time}</span>
                    <button
                      className="sp-read-btn"
                      onClick={() => setExpandedStory(expandedStory === s.id ? null : s.id)}
                    >
                      <BookOpen size={13} />
                      {expandedStory === s.id ? "Close" : "Read"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SAVED RESOURCES */}
      {showResources && filteredResources.length > 0 && (
        <section className="sp-section">
          <div className="sp-section-head">
            <h2>Saved Resources</h2>
            <button className="sp-see-all" onClick={() => setActiveTab("Resources")}>
              See all <ChevronRight size={13} />
            </button>
          </div>
          <div className="sp-resources-list">
            {filteredResources.map(r => (
              <div
                className={`sp-resource-row ${expandedResource === r.id ? "expanded" : ""}`}
                key={r.id}
              >
                <span className="sp-resource-icon">{r.icon}</span>
                <div className="sp-resource-info">
                  <p>{r.title}</p>
                  <span>{r.desc}</span>
                  {expandedResource === r.id && (
                    <p className="sp-resource-expanded">
                      This resource contains practical exercises and insights to help you on your wellness journey. Click "Open" to access the full content.
                    </p>
                  )}
                </div>
                <div className="sp-resource-actions">
                  <span className="sp-resource-type">{r.type}</span>
                  <button
                    className="sp-resource-btn"
                    onClick={() => setExpandedResource(expandedResource === r.id ? null : r.id)}
                  >
                    {expandedResource === r.id ? "Close" : "Open"} <ExternalLink size={11} />
                  </button>
                  <button
                    className="sp-resource-remove"
                    onClick={() => removeResource(r.id)}
                    title="Remove"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SAVED EXERCISES */}
      {showExercises && filteredExercises.length > 0 && (
        <section className="sp-section">
          <div className="sp-section-head">
            <h2>Saved Exercises</h2>
            <button className="sp-see-all" onClick={() => setActiveTab("Exercises")}>
              See all <ChevronRight size={13} />
            </button>
          </div>
          <div className="sp-exercises-grid">
            {filteredExercises.map(e => (
              <div className={`sp-exercise-card ${playing === e.id ? "playing" : ""}`} key={e.id}>
                <button
                  className="sp-play-btn"
                  onClick={() => setPlaying(playing === e.id ? null : e.id)}
                >
                  {playing === e.id
                    ? <Pause size={16} fill="currentColor" />
                    : <Play size={16} fill="currentColor" />
                  }
                </button>
                <p>{e.title}</p>
                <span>{playing === e.id ? "Playing..." : e.duration}</span>
                <button className="sp-exercise-remove" onClick={() => removeExercise(e.id)}>
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EMPTY STATE */}
      {filteredStories.length === 0 && filteredResources.length === 0 && filteredExercises.length === 0 && (
        <div className="empty-state">
          <Bookmark size={24} />
          <strong>Nothing saved yet</strong>
          <span>Items you save will appear here.</span>
        </div>
      )}
    </div>
  );
}
