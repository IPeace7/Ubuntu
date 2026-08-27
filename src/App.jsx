import React, { useEffect, useState } from "react";
import {
  Heart, ChevronDown, MoreHorizontal, Share2,
  Smile, Meh, Frown, PenLine, EyeOff, Quote,
  Sparkles, ArrowUpDown, X, Send, Flag, Trash2,
  Copy, Check, Search, BookOpen, Users, UserRound,
  MessageCircle, Menu, LogOut,
} from "lucide-react";

import logo from "./assets/Logo.svg";
import { navMain, support, initialPosts, stories, topics } from "./data/constants";
import CommentsModal from "./components/CommentsModal";
import QuickRow from "./components/QuickRow";
import Sidebar from "./components/Sidebar";
import JournalPage from "./pages/JournalPage";
import MessagesPage from "./components/Messages";
import CommunitiesPage from "./pages/CommunitiesPage";
import SavedPage from "./pages/SavedPage";
import NotificationsPage from "./pages/NotificationsPage";
import FindProfessionalsPage from "./pages/FindProfessionalsPage";
import WellnessHubPage from "./pages/WellnessHubPage";
import CrisisHelpPage from "./pages/CrisisHelpPage";

/* Pages that use the shared sidebar wrapper */
function WithSidebar({ active, setActive, children }) {
  return (
    <div className="app-shell no-right-panel">
      <Sidebar active={active} setActive={setActive} />
      <main className="main-content" style={{ gridColumn: "2 / -1" }}>
        {children}
      </main>
    </div>
  );
}

export default function App({ userData, onLogout }) {
  const [active, setActive] = useState("Home");
  const [mood, setMood] = useState("Good");
  const [anonymous, setAnonymous] = useState(userData?.identityMode === "Anonymous");
  const [posts, setPosts] = useState(initialPosts);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(null);
  const [showShare, setShowShare] = useState(null);
  const [showPostMenu, setShowPostMenu] = useState(null);
  const [copied, setCopied] = useState(false);
  const [newPost, setNewPost] = useState({ text: "", topic: "Anxiety", anonymous: true });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowCreatePost(false);
        setShowComments(null);
        setShowShare(null);
        setShowPostMenu(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleLike = (id) => setPosts(c => c.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  const openCreatePost = () => { setNewPost({ text: "", topic: "Anxiety", anonymous }); setShowCreatePost(true); };
  const createPost = () => {
    const text = newPost.text.trim(); if (!text) return;
    const selectedTopic = topics.find(([name]) => name === newPost.topic);
    setPosts(c => [{ id: Date.now(), name: newPost.anonymous ? "Anonymous" : "Kamahoro", time: "Just now", avatar: newPost.anonymous ? "avatar-purple" : "avatar-alex", text, tag: newPost.topic, tagClass: selectedTopic?.[1] || "lavender", likes: 0, comments: 0, liked: false, commentList: [] }, ...c]);
    setAnonymous(newPost.anonymous); setShowCreatePost(false); setNewPost({ text: "", topic: "Anxiety", anonymous: true });
  };
  const addComment = (postId, text) => { if (!text.trim()) return; setPosts(c => c.map(p => p.id === postId ? { ...p, comments: p.comments + 1, commentList: [...p.commentList, text.trim()] } : p)); };
  const deletePost = (id) => { setPosts(c => c.filter(p => p.id !== id)); setShowPostMenu(null); };
  const copyPost = async (text) => { try { await navigator.clipboard.writeText(text); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1600); };
  const filteredPosts = posts.filter(p => `${p.text} ${p.tag} ${p.name}`.toLowerCase().includes(search.toLowerCase()));

  /* ── FULL-PAGE ROUTES ── */
  if (active === "Messages") return <MessagesPage activeTab={active} setActiveTab={setActive} />;

  if (active === "Communities") return (
    <WithSidebar active={active} setActive={setActive}>
      <CommunitiesPage />
    </WithSidebar>
  );

  if (active === "Saved") return (
    <WithSidebar active={active} setActive={setActive}>
      <SavedPage />
    </WithSidebar>
  );

  if (active === "Notifications") return (
    <WithSidebar active={active} setActive={setActive}>
      <NotificationsPage />
    </WithSidebar>
  );

  if (active === "Find Professionals") return (
    <WithSidebar active={active} setActive={setActive}>
      <FindProfessionalsPage />
    </WithSidebar>
  );

  if (active === "Wellness Hub") return (
    <WithSidebar active={active} setActive={setActive}>
      <WellnessHubPage />
    </WithSidebar>
  );

  if (active === "Crisis Help") return (
    <WithSidebar active={active} setActive={setActive}>
      <CrisisHelpPage />
    </WithSidebar>
  );

  /* ── MAIN DASHBOARD ── */
  return (
    <div className={`app-shell ${active === "Journal" ? "no-right-panel" : ""}`}>
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand-wrap"><img className="brand" src={logo} alt="Inside Out" /></div>
        <nav className="main-nav">
          {navMain.map(([Icon, label]) => (
            <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => { setActive(label); setMenuOpen(false); }}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {label === "Notifications" && <span className="notification-count">3</span>}
            </button>
          ))}
        </nav>
        <div className="divider" />
        <div className="support-title">Support</div>
        <nav className="support-nav">
          {support.map(([Icon, label]) => (
            <button key={label} className="nav-item support-item" onClick={() => { setActive(label); setMenuOpen(false); }}>
              <Icon size={17} strokeWidth={1.7} /><span>{label}</span>
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
        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={15} />
          <span>Log out</span>
        </button>
      </aside>

      <main className="main-content">
        <div className="mobile-topbar">
          <button onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button>
          <img src={logo} alt="Inside Out" /><div />
        </div>

        {active === "Journal" ? <JournalPage /> : (<>
          <header className="top-header">
            <div>
              <h1 style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "nowrap" }}>Good morning, Kamahoro <Sparkles className="sparkle" size={14} fill="currentColor" /></h1>
              <p>Take a deep breath. You're in a safe space.</p>
            </div>
            <div className="header-actions">
              <button className="share-btn" onClick={openCreatePost}>
                <PenLine size={15} />Share how you feel<ChevronDown size={14} />
              </button>
            </div>
          </header>

          <section className="sharing-card">
            <div><h2>How do you want to share?</h2><p>You choose how you show up.</p></div>
            <div className="sharing-options">
              <button className={anonymous ? "selected" : ""} onClick={() => setAnonymous(true)}>
                <EyeOff size={15} /><span><b>Anonymous</b><small>Share without name</small></span>
              </button>
              <button className={!anonymous ? "selected" : ""} onClick={() => setAnonymous(false)}>
                <UserRound size={15} /><span><b>Public</b><small>Share as yourself</small></span>
              </button>
            </div>
          </section>

          <section className="feed-section">
            <div className="section-heading">
              <h2>What's on people's minds</h2>
              <div className="feed-tools">
                <div className="search-box"><Search size={14} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." /></div>
                <div className="sort-wrap">
                  <button className="sort-btn" onClick={() => setSortOpen(v => !v)}>Latest <ChevronDown size={14} /></button>
                  {sortOpen && <div className="sort-menu">
                    <button onClick={() => setSortOpen(false)}>Latest</button>
                    <button onClick={() => setSortOpen(false)}>Most liked</button>
                    <button onClick={() => setSortOpen(false)}>Most discussed</button>
                  </div>}
                </div>
              </div>
            </div>
            <div className="posts">
              {filteredPosts.length === 0 && <div className="empty-state"><Search size={24} /><strong>No posts found</strong><span>Try searching for another topic or word.</span></div>}
              {filteredPosts.map(post => (
                <article className="post-card" key={post.id}>
                  <div className={`post-avatar ${post.avatar}`} />
                  <div className="post-body">
                    <div className="post-meta"><b>{post.name}</b><span>{post.time}</span></div>
                    <p className="post-text">{post.text}</p>
                    <span className={`tag ${post.tagClass}`}>{post.tag}</span>
                    <div className="post-actions">
                      <button className={post.liked ? "liked" : ""} onClick={() => toggleLike(post.id)}><Heart size={15} fill={post.liked ? "currentColor" : "none"} />{post.likes}</button>
                      <button onClick={() => setShowComments(post.id)}><MessageCircle size={15} />{post.comments}</button>
                      <button className="share-post" onClick={() => setShowShare(post.id)}><Share2 size={14} /> Share</button>
                    </div>
                  </div>
                  <button className="more" onClick={() => setShowPostMenu(showPostMenu === post.id ? null : post.id)}><MoreHorizontal size={18} /></button>
                  {showPostMenu === post.id && <div className="post-menu">
                    <button onClick={() => copyPost(post.text)}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy post"}</button>
                    <button><Flag size={14} /> Report</button>
                    {post.name === "Kamahoro" && <button className="danger" onClick={() => deletePost(post.id)}><Trash2 size={14} /> Delete</button>}
                  </div>}
                </article>
              ))}
            </div>
          </section>

          <section className="stories-card">
            <div className="stories-heading">
              <div><h2>Real stories. Real people. <Sparkles size={13} /></h2><p>Read testimonies from people who've been there.</p></div>
              <button>See all stories</button>
            </div>
            <div className="story-list">
              {stories.map((story, i) => (
                <div className="story" key={i}>
                  <div className="story-image" style={{ backgroundImage: `url(${story.photo})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div className="story-copy"><b>{story.title}</b><small><span className="tiny-avatar" />{story.person}</small><button>Read story →</button></div>
                </div>
              ))}
            </div>
            <button className="load-more">Load more <ChevronDown size={14} /></button>
          </section>
        </>)}
      </main>

      {active !== "Journal" && (
        <aside className="right-panel">
          <div className="right-search"><ArrowUpDown size={14} /><input placeholder="Search Inside Out..." /><Search size={15} /></div>
          <section className="checkin card">
            <h2>Today's check-in</h2><p>How are you feeling today?</p>
            <div className="moods">
              {[["Good", Smile], ["Okay", Smile], ["Not great", Meh], ["Struggling", Smile], ["Awful", Frown]].map(([label, Icon], i) => (
                <button key={label} className={mood === label ? "mood-active" : ""} onClick={() => setMood(label)}>
                  <span className={`mood-circle m${i}`}><Icon size={20} /></span><small>{label}</small>
                </button>
              ))}
            </div>
          </section>
          <section className="quick card">
            <h2>Quick access</h2>
            <QuickRow icon={<BookOpen />} title="Write in Journal" subtitle="Private space for your thoughts" />
            <QuickRow icon={<Users />} title="Join a Room" subtitle="Connect with others" />
            <QuickRow icon={<Heart />} title="Read Stories" subtitle="Real experiences, real people" />
          </section>
          <section className="reminder card">
            <div className="reminder-copy"><Quote size={21} fill="currentColor" /><h2>Daily reminder</h2><p>You don't have to have it all figured out. Just take it one day at a time.</p></div>
            <div className="plant"><div className="pot" /><div className="stem" /><div className="leaf leaf-a" /><div className="leaf leaf-b" /><div className="leaf leaf-c" /></div>
          </section>
          <section className="trending card">
            <div className="trend-head"><h2>Trending topics</h2><button>See all</button></div>
            <div className="topic-list">{topics.map(([name, color]) => <span className={`topic ${color}`} key={name}>{name}</span>)}</div>
          </section>
        </aside>
      )}

      {showCreatePost && (
        <div className="modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) setShowCreatePost(false); }}>
          <div className="modal create-modal">
            <div className="modal-header"><div><h2>Share how you feel</h2><p>This is a safe space. Say what's on your mind.</p></div><button className="modal-close" onClick={() => setShowCreatePost(false)}><X size={19} /></button></div>
            <div className="post-mode">
              <button className={newPost.anonymous ? "mode-selected" : ""} onClick={() => setNewPost({ ...newPost, anonymous: true })}><EyeOff size={17} /><span><b>Anonymous</b><small>Nobody will see your name.</small></span></button>
              <button className={!newPost.anonymous ? "mode-selected" : ""} onClick={() => setNewPost({ ...newPost, anonymous: false })}><UserRound size={17} /><span><b>Public</b><small>Post using your profile.</small></span></button>
            </div>
            <textarea className="post-textarea" value={newPost.text} onChange={e => setNewPost({ ...newPost, text: e.target.value })} placeholder="What's on your mind?" maxLength={500} autoFocus />
            <div className="textarea-footer"><span>{newPost.text.length}/500</span></div>
            <div className="topic-selector"><label>Topic</label><select value={newPost.topic} onChange={e => setNewPost({ ...newPost, topic: e.target.value })}>{topics.map(([name]) => <option key={name} value={name}>{name}</option>)}</select></div>
            <div className="modal-footer"><button className="cancel-btn" onClick={() => setShowCreatePost(false)}>Cancel</button><button className="publish-btn" disabled={!newPost.text.trim()} onClick={createPost}><Send size={15} /> Post</button></div>
          </div>
        </div>
      )}
      {showComments !== null && <CommentsModal post={posts.find(p => p.id === showComments)} onClose={() => setShowComments(null)} onAddComment={addComment} />}
      {showShare !== null && (
        <div className="modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) setShowShare(null); }}>
          <div className="modal small-modal">
            <div className="modal-header"><div><h2>Share post</h2><p>Share this thought with someone.</p></div><button className="modal-close" onClick={() => setShowShare(null)}><X size={19} /></button></div>
            <div className="share-options">
              <button onClick={() => copyPost(posts.find(p => p.id === showShare)?.text || "")}><Copy size={18} /><span>Copy text</span></button>
              <button><MessageCircle size={18} /><span>Send to someone</span></button>
              <button><Share2 size={18} /><span>Share externally</span></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
