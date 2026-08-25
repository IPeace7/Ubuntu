import React, { useState } from 'react';
import { 
  Home, BookOpen, Users, MessageSquare, Bookmark, Bell, 
  UserCheck, HeartHandshake, PhoneCall, Sparkles, Send, 
  Search, Eye, ChevronDown, ChevronRight, Share2, MessageCircle, Heart 
} from 'lucide-react';

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Anonymous",
    time: "25m ago",
    content: "Some days are just heavier than others. Anyone else feeling this today?",
    tags: ["Anxiety", "Overthinking"],
    likes: 34,
    comments: 9,
    liked: false
  },
  {
    id: 2,
    author: "Alex",
    time: "1h ago",
    content: "Every step forward, no matter how small, is still progress. Proud of myself for getting out of bed today.",
    tags: ["Self Love"],
    likes: 72,
    comments: 15,
    liked: false
  },
  {
    id: 3,
    author: "Anonymous",
    time: "2h ago",
    content: "I wish it was easier to talk to my family about how I feel.",
    tags: ["Family"],
    likes: 23,
    comments: 11,
    liked: false
  }
];

const STORIES = [
  { id: 1, text: '"I thought I was the only one."', author: "Anonymous", bg: "bg-slate-800" },
  { id: 2, text: '"Healing isn\'t linear, but it\'s possible."', author: "Rina", bg: "bg-amber-900" },
  { id: 3, text: '"Asking for help changed everything."', author: "Jordan", bg: "bg-emerald-900" }
];

const MOODS = [
  { label: "Good", emoji: "😊" },
  { label: "Okay", emoji: "🙂" },
  { label: "Not great", emoji: "😐" },
  { label: "Struggling", emoji: "🙁" },
  { label: "Awful", emoji: "😢" }
];

export default function Dashboard({ userData }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [shareType, setShareType] = useState(userData?.identityMode || 'Anonymous');
  const [selectedMood, setSelectedMood] = useState(null);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: shareType === 'Anonymous' ? 'Anonymous' : 'Maya',
      time: 'Just now',
      content: newPostContent,
      tags: ['General'],
      likes: 0,
      comments: 0,
      liked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F6F7FB] text-gray-800 font-sans antialiased">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 p-5 flex flex-col justify-between sticky top-0 h-screen shrink-0">
        <div>
          <div className="flex items-center gap-2 px-3 mb-8 cursor-pointer">
            <span className="text-2xl font-serif font-bold tracking-tight text-purple-700 italic">Inside Out</span>
            <span className="text-purple-400 text-lg">♡</span>
          </div>

          <nav className="space-y-1">
            {[
              { name: 'Home', icon: Home },
              { name: 'Journal', icon: BookOpen },
              { name: 'Rooms', icon: Users },
              { name: 'Messages', icon: MessageSquare },
              { name: 'Saved', icon: Bookmark },
              { name: 'Notifications', icon: Bell, badge: 3 }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive 
                      ? 'bg-purple-50 text-purple-700 font-semibold' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-700' : 'text-gray-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-8">
            <p className="text-[11px] font-semibold text-gray-400 px-3.5 mb-2 uppercase tracking-wider">Support</p>
            <div className="space-y-1">
              {[
                { name: 'Find Professionals', icon: UserCheck },
                { name: 'Wellness Hub', icon: HeartHandshake },
                { name: 'Crisis Help', icon: PhoneCall }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition"
                  >
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-50">
          <div className="bg-purple-50/70 p-3.5 rounded-2xl text-center border border-purple-100/50">
            <p className="text-xs text-purple-900 font-medium">It's okay not to be okay.</p>
            <p className="text-[11px] text-purple-600 mt-0.5">You're not alone here.</p>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition border border-transparent hover:border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 font-bold text-xs flex items-center justify-center">
                M
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800">Maya</p>
                <p className="text-[10px] text-gray-400">View profile</p>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 max-w-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1.5">
              Good evening, Maya <Sparkles className="w-4 h-4 text-purple-500 fill-purple-500" />
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Take a deep breath. You're in a safe space.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Share how you feel</span>
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">How do you want to share?</h3>
            <p className="text-xs text-gray-400">You choose how you show up.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShareType('Anonymous')}
              className={`p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                shareType === 'Anonymous' 
                  ? 'border-purple-300 bg-purple-50/50 ring-1 ring-purple-300' 
                  : 'border-gray-100 hover:border-gray-200 bg-gray-50/30'
              }`}
            >
              <Eye className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-800">Anonymous</p>
                <p className="text-[10px] text-gray-400">Share without name</p>
              </div>
            </button>

            <button
              onClick={() => setShareType('Public')}
              className={`p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                shareType === 'Public' 
                  ? 'border-purple-300 bg-purple-50/50 ring-1 ring-purple-300' 
                  : 'border-gray-100 hover:border-gray-200 bg-gray-50/30'
              }`}
            >
              <Users className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-800">Public</p>
                <p className="text-[10px] text-gray-400">Share as yourself</p>
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">What's on people's minds</h2>
            <button className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1">
              Latest <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {posts.map((post) => (
            <div key={post.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:border-purple-100 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {post.author[0]}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-800">{post.author}</span>
                    <span className="text-[11px] text-gray-400 ml-2">{post.time}</span>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-gray-600">•••</button>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed">{post.content}</p>

              <div className="flex gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-purple-50 text-purple-700 text-[10px] font-medium px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 transition ${post.liked ? 'text-purple-600 font-semibold' : 'hover:text-gray-600'}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.liked ? 'fill-purple-600' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-gray-600 transition">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <button className="flex items-center gap-1 hover:text-gray-600 transition">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1">
                Real stories. Real people. <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              </h2>
              <p className="text-[11px] text-gray-400">Read testimonies from people who've been there.</p>
            </div>
            <button className="text-xs font-semibold text-purple-600 hover:text-purple-800">See all stories</button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {STORIES.map((story) => (
              <div key={story.id} className={`${story.bg} text-white p-3.5 rounded-xl flex flex-col justify-between h-32 shadow-sm relative overflow-hidden group cursor-pointer`}>
                <p className="text-[11px] font-medium leading-snug opacity-90">{story.text}</p>
                <div>
                  <p className="text-[10px] font-semibold opacity-70">{story.author}</p>
                  <p className="text-[9px] font-bold text-purple-200 mt-0.5 flex items-center gap-0.5">
                    Read story →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-72 p-6 space-y-5 sticky top-0 h-screen overflow-y-auto shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search Inside Out..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-purple-300 shadow-sm transition"
          />
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div>
            <h3 className="text-xs font-bold text-gray-800">Today's check-in</h3>
            <p className="text-[11px] text-gray-400">How are you feeling today?</p>
          </div>
          <div className="flex justify-between items-center">
            {MOODS.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${
                  selectedMood === mood.label ? 'bg-purple-100 ring-1 ring-purple-400' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{mood.emoji}</span>
                <span className="text-[9px] font-medium text-gray-500">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-gray-800">Quick access</h3>
          <div className="space-y-2">
            {[
              { title: "Write in Journal", desc: "Private space for your thoughts", icon: BookOpen },
              { title: "Join a Room", desc: "Connect with others", icon: Users },
              { title: "Read Stories", desc: "Real experiences, real people", icon: Heart }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50/50 cursor-pointer transition group">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{item.title}</p>
                      <p className="text-[10px] text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-purple-600 transition" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-purple-600 text-lg font-serif">“</span>
          <p className="text-xs font-bold text-gray-800">Daily reminder</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            You don't have to have it all figured out. Just take it one day at a time.
          </p>
        </div>
      </aside>

      {/* Create Post Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-gray-800">Share Your Thoughts</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind? Take a deep breath and share..."
                className="w-full h-28 text-xs p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 resize-none"
              />
              <div className="flex justify-between items-center pt-2">
                <span className="text-[11px] text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md font-medium">
                  Posting as {shareType}
                </span>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-1.5 text-xs bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 shadow-sm"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}