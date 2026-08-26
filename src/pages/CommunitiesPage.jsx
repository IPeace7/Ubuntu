import { useState } from "react";
import {
  Search, Plus, Users, BadgeCheck, Calendar,
  ChevronRight, X, Heart, Shield, Smile, Leaf,
  BookOpen, Brain, Sparkles, Flame, Star
} from "lucide-react";

const ROOM_IMAGES = ["/room1.jpeg", "/room2.jpeg", "/story3.jpeg"];

const INITIAL_ROOMS = [
  { id: 1, name: "Anxiety Support Circle", verified: true, desc: "A safe space to talk about anxiety and find ways to manage it together.", tags: ["Anxiety", "Support"], members: 1200, image: "/room1.jpeg", badge: "Popular", joined: false },
  { id: 2, name: "Healing Together", verified: true, desc: "Share your story, support others, and heal as a community.", tags: ["Healing", "Growth"], members: 845, image: "/room2.jpeg", badge: "New", joined: false },
  { id: 3, name: "Teen Talk", verified: true, desc: "A place for teens to chat about life, stress, and everything in between.", tags: ["Teens", "Friendship"], members: 1000, image: "/story3.jpeg", badge: null, joined: false },
  { id: 4, name: "Journaling Club", verified: true, desc: "Share journal prompts, reflections, and inspire each other.", tags: ["Journaling", "Mindfulness"], members: 632, image: "/room1.jpeg", badge: null, joined: true },
  { id: 5, name: "Building Self Love", verified: true, desc: "Together, we learn to love ourselves a little more each day.", tags: ["Self Love", "Motivation"], members: 920, image: "/room2.jpeg", badge: null, joined: false },
  { id: 6, name: "Overcoming Depression", verified: true, desc: "You're not alone. Let's support each other through tough days.", tags: ["Depression", "Support"], members: 714, image: "/story3.jpeg", badge: null, joined: false },
  { id: 7, name: "Study & Stress Balance", verified: true, desc: "Tips and support to balance studies and mental well-being.", tags: ["Teens", "Support"], members: 320, image: "/room1.jpeg", badge: null, joined: false },
  { id: 8, name: "Mindful Living", verified: true, desc: "Mindfulness tips, meditations, and living in the present.", tags: ["Mindfulness"], members: 270, image: "/room2.jpeg", badge: null, joined: false },
  { id: 9, name: "Introvert Corner", verified: true, desc: "A calm corner for introverts to connect and feel understood.", tags: ["Friendship"], members: 190, image: "/story3.jpeg", badge: null, joined: false },
];

const CATEGORIES = [
  { name: "Anxiety", icon: <Brain size={14} />, count: 12 },
  { name: "Depression", icon: <Shield size={14} />, count: 9 },
  { name: "Self Love", icon: <Heart size={14} />, count: 15 },
  { name: "Friendship", icon: <Users size={14} />, count: 8 },
  { name: "Healing", icon: <Leaf size={14} />, count: 11 },
  { name: "Teens", icon: <Star size={14} />, count: 10 },
  { name: "Motivation", icon: <Flame size={14} />, count: 7 },
  { name: "Mindfulness", icon: <Sparkles size={14} />, count: 9 },
];

const SESSIONS = [
  { title: "Mindfulness & Meditation", time: "Today, 7:00 PM", color: "#a886ff" },
  { title: "Managing Anxiety", time: "Tomorrow, 6:00 PM", color: "#6636ee" },
  { title: "Self Love Talk", time: "Sat, 10:00 AM", color: "#3e9362" },
];

const TABS = ["All Rooms", "Joined", "Popular", "New", "My Rooms"];

const TAG_COLORS = {
  "Anxiety": "lavender", "Support": "blue", "Healing": "green",
  "Growth": "green", "Teens": "yellow", "Friendship": "pink",
  "Journaling": "purple", "Mindfulness": "purple", "Self Love": "green",
  "Motivation": "orange", "Depression": "lavender",
};

/* ── CREATE ROOM MODAL ── */
function CreateRoomModal({ onClose, onCreate }) {
  const [step, setStep] = useState(1); // 1 = choose type, 2 = fill form
  const [type, setType] = useState(null);
  const [form, setForm] = useState({ name: "", desc: "", category: "Anxiety", privacy: "public" });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onCreate({ ...form, type });
    onClose();
  };

  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal cr-modal">
        <div className="modal-header">
          <div>
            <h2>{step === 1 ? "Create a Room" : "Set up your room"}</h2>
            <p>{step === 1 ? "Choose how you want to start." : "Fill in the details below."}</p>
          </div>
          <button className="modal-close" onClick={onClose}><X size={19} /></button>
        </div>

        {step === 1 && (
          <div className="cr-type-grid">
            <button
              className={`cr-type-card ${type === "open" ? "selected" : ""}`}
              onClick={() => { setType("open"); setStep(2); }}
            >
              <span className="cr-type-icon" style={{ background: "#f0ebff", color: "#6636ee" }}>
                <Users size={26} />
              </span>
              <h3>Open Room</h3>
              <p>Anyone can join and participate freely.</p>
            </button>
            <button
              className={`cr-type-card ${type === "private" ? "selected" : ""}`}
              onClick={() => { setType("private"); setStep(2); }}
            >
              <span className="cr-type-icon" style={{ background: "#fff0df", color: "#e88c2d" }}>
                <Shield size={26} />
              </span>
              <h3>Private Room</h3>
              <p>Invite-only. Members need approval to join.</p>
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleCreate} className="cr-form">
            <div className="cr-type-badge">
              {type === "open" ? <Users size={13} /> : <Shield size={13} />}
              {type === "open" ? "Open Room" : "Private Room"}
              <button type="button" className="cr-change" onClick={() => setStep(1)}>Change</button>
            </div>
            <div className="form-group">
              <label>Room Name</label>
              <input autoFocus placeholder="e.g. Anxiety Support Circle" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows={3} placeholder="What is this room about?" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="cancel-btn" onClick={() => setStep(1)}>Back</button>
              <button type="submit" className="publish-btn" disabled={!form.name.trim()}>
                <Plus size={15} /> Create Room
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function CommunitiesPage() {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [activeTab, setActiveTab] = useState("All Rooms");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const handleJoin = (id) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, joined: !r.joined, members: r.joined ? r.members - 1 : r.members + 1 } : r));
  };

  const handleCreate = (data) => {
    setRooms(prev => [{
      id: Date.now(), name: data.name, verified: false,
      desc: data.desc, tags: [data.category],
      members: 1, image: ROOM_IMAGES[0], badge: "New", joined: true
    }, ...prev]);
  };

  const filtered = rooms.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "Joined") return matchSearch && r.joined;
    if (activeTab === "Popular") return matchSearch && r.members >= 700;
    if (activeTab === "New") return matchSearch && r.badge === "New";
    if (activeTab === "My Rooms") return matchSearch && r.joined;
    return matchSearch;
  });

  return (
    <div className="cr-page">
      {/* HEADER */}
      <div className="cr-header">
        <div className="cr-header-left">
          <span className="cr-header-icon"><Users size={26} /></span>
          <div>
            <h1>Community Rooms</h1>
            <p>Connect with others who understand.</p>
          </div>
        </div>
        <div className="cr-header-right">
          <div className="cr-search-wrap">
            <Search size={15} className="cr-search-icon" />
            <input
              className="cr-search-input"
              placeholder="Search rooms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="cr-create-btn" onClick={() => setShowCreate(true)}>
            <Plus size={16} /> Create Room
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="cr-tabs">
        {TABS.map(t => (
          <button key={t} className={`cr-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
        ))}
      </div>

      <div className="cr-body">
        {/* MAIN GRID */}
        <div className="cr-main">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Search size={24} />
              <strong>No rooms found</strong>
              <span>Try a different search or create your own.</span>
            </div>
          ) : (
            <div className="cr-grid">
              {filtered.map(room => (
                <div className="cr-card" key={room.id}>
                  <div className="cr-card-img-wrap">
                    <img src={room.image} alt={room.name} className="cr-card-img" />
                    {room.badge && <span className={`cr-badge ${room.badge === "Popular" ? "cr-badge-popular" : "cr-badge-new"}`}>{room.badge}</span>}
                    <div className="cr-card-avatars">
                      {[...Array(3)].map((_, i) => (
                        <span key={i} className="cr-mini-avatar" style={{ background: ["#a886ff","#6636ee","#ddd4ff"][i] }} />
                      ))}
                      <span className="cr-mini-count">+{Math.max(room.members - 3, 0)}</span>
                    </div>
                  </div>
                  <div className="cr-card-body">
                    <div className="cr-card-title-row">
                      <h3>{room.name}</h3>
                      {room.verified && <BadgeCheck size={15} className="cr-verified" />}
                    </div>
                    <p className="cr-card-desc">{room.desc}</p>
                    <div className="cr-card-tags">
                      {room.tags.map(t => <span key={t} className={`tag ${TAG_COLORS[t] || "lavender"}`}>{t}</span>)}
                    </div>
                    <div className="cr-card-footer">
                      <span className="cr-members"><Users size={13} /> {room.members >= 1000 ? (room.members / 1000).toFixed(1) + "K" : room.members} members</span>
                      <button
                        className={`cr-join-btn ${room.joined ? "joined" : ""}`}
                        onClick={() => handleJoin(room.id)}
                      >
                        {room.joined ? "Joined ✓" : "Join"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <aside className="cr-right">
          {/* CATEGORIES */}
          <div className="cr-right-card">
            <div className="cr-right-title-row">
              <h3>Categories</h3>
            </div>
            <div className="cr-category-list">
              {CATEGORIES.map(c => (
                <button key={c.name} className="cr-category-item" onClick={() => setSearch(c.name)}>
                  <span className="cr-cat-icon">{c.icon}</span>
                  <span className="cr-cat-name">{c.name}</span>
                  <span className="cr-cat-count">{c.count}</span>
                </button>
              ))}
            </div>
            <button className="cr-view-all">View all categories <ChevronRight size={13} /></button>
          </div>

          {/* CREATE A ROOM PROMO */}
          <div className="cr-right-card cr-promo-card">
            <span className="cr-promo-icon"><Users size={28} /></span>
            <h3>Create a Room</h3>
            <p>Start a conversation and build your safe space.</p>
            <button className="cr-create-btn cr-create-btn-full" onClick={() => setShowCreate(true)}>
              <Plus size={15} /> Create Room
            </button>
          </div>

          {/* UPCOMING SESSIONS */}
          <div className="cr-right-card">
            <div className="cr-right-title-row">
              <h3>Upcoming Group Sessions</h3>
              <button className="cr-view-all-link">View all</button>
            </div>
            <div className="cr-sessions">
              {SESSIONS.map(s => (
                <div className="cr-session-item" key={s.title}>
                  <span className="cr-session-dot" style={{ background: s.color }} />
                  <div className="cr-session-info">
                    <p>{s.title}</p>
                    <span><Calendar size={11} /> {s.time}</span>
                  </div>
                  <button className="cr-session-join">Join</button>
                </div>
              ))}
            </div>
            <button className="cr-view-all">See full schedule <ChevronRight size={13} /></button>
          </div>
        </aside>
      </div>

      {showCreate && <CreateRoomModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}
    </div>
  );
}
