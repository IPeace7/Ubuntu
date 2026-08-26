import React, { useState } from 'react';
import { 
  Home, BookOpen, Users, MessageSquare, Bookmark, Bell, 
  Sparkles, Search, ChevronDown, 
  Smile, Meh, Frown, AlertCircle, ShieldAlert,
  Stethoscope, LayoutGrid, Phone, Video, Info, Paperclip, Send, Lock, CheckCheck, Plus, MoreHorizontal
} from 'lucide-react';

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Anonymous",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    time: "25m ago",
    content: "Some days are just heavier than others. Anyone else feeling this today?",
    tags: [
      { name: "Anxiety", bg: "bg-[#F3F0FF]", text: "text-[#6C5CE7]" },
      { name: "Overthinking", bg: "bg-[#F3F0FF]", text: "text-[#6C5CE7]" }
    ],
    likes: 35,
    comments: 9,
    liked: false
  },
  {
    id: 2,
    author: "Alex",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    time: "1h ago",
    content: "Every step forward, no matter how small, is still progress. Proud of myself for getting out of bed today.",
    tags: [
      { name: "Self Love", bg: "bg-[#E6F4EA]", text: "text-[#137333]" }
    ],
    likes: 72,
    comments: 15,
    liked: false
  }
];

const conversations = [
  {
    id: 1,
    name: 'Dr. Aris Thorne',
    role: 'Wellness Counselor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    status: 'online',
    time: '2:15 PM'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Peer Supporter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    status: 'away',
    time: '11:05 AM'
  },
  {
    id: 3,
    name: 'Marcus Bell',
    role: 'Community Member',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    status: 'offline',
    time: 'Yesterday'
  }
];

const chatHistories = {
  1: [
    { id: 101, text: 'Hi Maya, how have you been feeling since our last session?', time: '10:30 AM', isMe: false },
    { id: 102, text: 'A bit overwhelmed, but trying to use the breathing techniques.', time: '10:35 AM', isMe: true },
    { id: 103, text: "That's good to hear. Remember to take it one step at a time.", time: '10:40 AM', isMe: false },
    { id: 104, text: 'I think the grounding exercise we discussed will really help this week.', time: '2:15 PM', isMe: false }
  ],
  2: [
    { id: 201, text: 'Hey Maya! The new room discussion on Boundaries is really helpful. Are you joining?', time: '10:55 AM', isMe: false },
    { id: 202, text: 'Hey Sarah! I am considering it, just finishing my journaling.', time: '11:00 AM', isMe: true },
    { id: 203, text: 'You are not alone in this. I felt the same way earlier!', time: '11:05 AM', isMe: false }
  ],
  3: [
    { id: 301, text: 'Thanks for the book recommendation, Maya!', time: 'Yesterday', isMe: false },
    { id: 302, text: 'Anytime Marcus! Let me know what you think.', time: 'Yesterday', isMe: true }
  ]
};

export default function Dashboard({ userData, onNavigate }) {
  // Main view state ('Home' or 'Messages')
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(chatHistories);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Journal', icon: BookOpen },
    { name: 'Communities', icon: Users },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Saved', icon: Bookmark },
    { name: 'Notifications', icon: Bell },
    { name: 'Professionals', icon: Stethoscope },
    { name: 'Dashboard', icon: LayoutGrid },
  ];

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (onNavigate) {
      onNavigate(tabName);
    }
  };

  const activeMessages = messages[selectedChatId] || [];
  const activeChat = conversations.find(c => c.id === selectedChatId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage]
    }));

    setMessageInput('');
  };

  return (
    <div className="flex h-screen w-full bg-[#FBFBFE] text-[#2D3748] font-sans antialiased overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap');
        .font-lexend { font-family: 'Lexend', sans-serif; }
      `}</style>

      {/* 1. PERMANENT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-100 p-5 flex flex-col justify-between sticky top-0 h-screen shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 px-3 mb-8 cursor-pointer" onClick={() => handleNavClick('Home')}>
            <div className="w-8 h-8 rounded-full bg-[#5E4BE2] flex items-center justify-center text-white font-bold">♡</div>
            <span className="text-xl font-bold text-[#1E2340]">Inside Out</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#F0EEFF] text-[#5E4BE2] font-semibold'
                      : 'text-[#6C728E] hover:bg-[#F8F9FB] hover:text-[#1E2340]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#5E4BE2]' : 'text-[#8A90A6]'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Cards */}
        <div className="space-y-3 pt-4 border-t border-[#F0F2F5]">
          <div className="bg-[#F8F8FF] p-3.5 rounded-2xl border border-[#EBE8FF]">
            <p className="text-xs text-[#5A607F] font-medium leading-relaxed italic">
              "It's okay not to be okay. You're not alone here."
            </p>
          </div>

          <div className="flex items-center justify-between p-2 rounded-2xl border border-transparent hover:bg-gray-50 hover:border-gray-100 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Maya" className="w-8 h-8 rounded-full object-cover" />
              <div className="text-left">
                <p className="text-xs font-bold text-[#1E2340]">Maya</p>
                <p className="text-[10px] text-[#8A90A6]">View profile</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 mr-1" />
          </div>
        </div>
      </aside>

      {/* 2. DYNAMIC CONTENT AREA */}

      {/* VIEW A: HOME DASHBOARD */}
      {activeTab !== 'Messages' && (
        <div className="flex-1 flex flex-col bg-[#F9FAFC] overflow-hidden">
          {/* Header */}
          <div className="h-16 bg-white border-b border-[#EAECEF] px-8 flex items-center justify-between shrink-0">
            <h1 className="text-2xl font-bold text-[#1E2340] flex items-center gap-2">
              Good evening, Maya <Sparkles className="w-5 h-5 text-[#6C5CE7]" />
            </h1>
          </div>

          {/* Main Feed Content */}
          <main className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EAECEF] shadow-xs">
              <h2 className="text-lg font-bold text-[#1E2340] mb-2">Welcome Back</h2>
              <p className="text-sm text-[#6C728E]">Select "Messages" from the sidebar to chat, or continue exploring your community feed here.</p>
            </div>

            {/* Sample Feed Cards */}
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white p-5 rounded-2xl border border-[#EAECEF] space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-[#1E2340]">{post.author}</p>
                      <p className="text-[10px] text-[#8A90A6]">{post.time}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#2D3748] leading-relaxed">{post.content}</p>
                  <div className="flex gap-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${tag.bg} ${tag.text}`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* VIEW B: MESSAGES PAGE */}
      {activeTab === 'Messages' && (
        <div className="flex-1 flex h-full overflow-hidden">
          {/* Messages List Column */}
          <section className="w-80 bg-white border-r border-[#EAECEF] flex flex-col h-full shrink-0">
            <div className="p-5 flex items-center justify-between border-b border-[#F0F2F5]">
              <h1 className="text-xl font-bold text-[#1E2340]">Messages</h1>
              <button className="p-2 text-[#5E4BE2] hover:bg-[#F0EEFF] rounded-xl transition">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8A90A6] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full bg-[#F5F6FA] text-xs pl-10 pr-4 py-2.5 rounded-xl text-[#1E2340] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 space-y-1">
              {conversations.map((chat) => {
                const isSelected = selectedChatId === chat.id;
                const chatMsgs = messages[chat.id] || [];
                const lastMsg = chatMsgs[chatMsgs.length - 1];

                return (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition flex items-center gap-3 ${
                      isSelected ? 'bg-[#F0EEFF]' : 'hover:bg-[#F8F9FB]'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img src={chat.avatar} alt={chat.name} className="w-11 h-11 rounded-full object-cover" />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        chat.status === 'online' ? 'bg-green-500' : chat.status === 'away' ? 'bg-amber-400' : 'bg-gray-300'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-xs font-bold truncate ${isSelected ? 'text-[#5E4BE2]' : 'text-[#1E2340]'}`}>{chat.name}</h3>
                        <span className="text-[10px] text-[#8A90A6] shrink-0">{chat.time}</span>
                      </div>
                      <p className="text-xs text-[#8A90A6] truncate">{lastMsg ? lastMsg.text : ''}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Active Chat Conversation Panel */}
          <section className="flex-1 bg-[#F9FAFC] flex flex-col h-full overflow-hidden">
            <div className="h-16 bg-white border-b border-[#EAECEF] px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img src={activeChat?.avatar} alt={activeChat?.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h2 className="text-sm font-bold text-[#1E2340]">{activeChat?.name}</h2>
                  <p className="text-[11px] text-[#8A90A6]">{activeChat?.role || 'Active now'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#6C728E]">
                <button className="p-2 hover:bg-[#F5F6FA] rounded-xl transition"><Phone className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-[#F5F6FA] rounded-xl transition"><Video className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-[#F5F6FA] rounded-xl transition"><Info className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-[#F5F6FA] rounded-xl transition"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/50">
              <div className="flex justify-center my-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A0A5BA] bg-[#EAECEF]/50 px-3 py-1 rounded-full">Today</span>
              </div>

              {activeMessages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-md px-5 py-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.isMe ? 'bg-[#5E4BE2] text-white rounded-br-xs' : 'bg-white text-[#2C3256] border border-[#EAECEF] rounded-bl-xs shadow-xs'
                  }`}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 px-1">
                    <span className="text-[10px] text-[#A0A5BA]">{msg.time}</span>
                    {msg.isMe && <CheckCheck className="w-3 h-3 text-[#5E4BE2]" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-[#EAECEF] space-y-2 shrink-0">
              <div className="flex items-center gap-3 bg-[#F5F6FA] px-4 py-2.5 rounded-2xl border border-dashed border-[#5E4BE2]/30">
                <button type="button" className="text-[#8A90A6] hover:text-[#5E4BE2] transition"><Plus className="w-5 h-5" /></button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a thoughtful message..."
                  className="flex-1 bg-transparent text-xs text-[#1E2340] focus:outline-none"
                />
                <button type="button" className="text-[#8A90A6] hover:text-[#5E4BE2] transition"><Smile className="w-5 h-5" /></button>
                <button type="button" className="text-[#8A90A6] hover:text-[#5E4BE2] transition"><Paperclip className="w-5 h-5" /></button>
                <button type="submit" className="w-8 h-8 rounded-full bg-[#5E4BE2] text-white flex items-center justify-center hover:bg-[#4B38C9] transition">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-1 text-[10px] text-[#A0A5BA]">
                <Lock className="w-3 h-3" /> <span>End-to-end encrypted • Your privacy is our priority</span>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}