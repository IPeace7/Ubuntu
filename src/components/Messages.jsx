import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Users,
  MessageSquare,
  Bookmark,
  Bell,
  Stethoscope,
  LayoutGrid,
  Plus,
  Search,
  Phone,
  Video,
  Info,
  MoreHorizontal,
  Smile,
  Paperclip,
  Send,
  Lock,
  CheckCheck
} from 'lucide-react';
import logo from '../assets/Logo.svg';

export default function MessagesPage({ activeTab = 'Messages', setActiveTab }) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [messageInput, setMessageInput] = useState('');

  // Nav Items matching your menu screenshot
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

  // Conversations Data
  const [conversations] = useState([
    {
      id: 1,
      name: 'Dr. Aris Thorne',
      role: 'Wellness Counselor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      status: 'online',
      lastMessage: 'I think the grounding exercise we',
      time: '2:15 PM',
      unread: 0
    },
    {
      id: 2,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      status: 'away',
      lastMessage: 'You are not alone in this. I felt the',
      time: '11:05 AM',
      unread: 2
    },
    {
      id: 3,
      name: 'Marcus Bell',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      status: 'offline',
      lastMessage: 'Thanks for the book recommendation!',
      time: 'Yesterday',
      unread: 0
    }
  ]);

  // Messages State
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi Maya, how have you been feeling since our last session?',
      time: '10:30 AM',
      isMe: false
    },
    {
      id: 2,
      text: 'A bit overwhelmed, but trying to use the breathing techniques.',
      time: '10:35 AM',
      isMe: true
    },
    {
      id: 3,
      text: "That's good to hear. Remember to take it one step at a time.",
      time: '10:40 AM',
      isMe: false
    },
    {
      id: 4,
      text: 'I think the grounding exercise we discussed will really help this week.',
      time: '2:15 PM',
      isMe: false
    }
  ]);

  const handleNavClick = (tabName) => {
    setCurrentTab(tabName);
    if (setActiveTab) setActiveTab(tabName);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput('');
  };

  const activeChat = conversations.find((c) => c.id === selectedChatId);

  return (
    <div className="flex h-screen w-full bg-[#F5F6FA] text-[#2C3256] font-sans antialiased overflow-hidden">
      
      {/* 1. LEFT NAVIGATION SIDEBAR */}
      <aside className="w-64 bg-white border-r border-[#EAECEF] p-5 flex flex-col justify-between h-full shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 px-3 mb-8 cursor-pointer" onClick={() => handleNavClick('Home')}>
            <img src={logo} alt="Inside Out" style={{ width: '200px', height: 'auto' }} />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.name;
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

        {/* Footer info box & profile */}
        <div className="space-y-3 pt-4 border-t border-[#F0F2F5]">
          <div className="bg-[#F8F8FF] p-3.5 rounded-2xl border border-[#EBE8FF]">
            <p className="text-xs text-[#5A607F] font-medium italic leading-relaxed">
              "It's okay not to be okay. You're not alone here."
            </p>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-2xl border border-[#EAECEF] bg-white hover:border-[#D0D4DC] cursor-pointer transition">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Maya"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-[#1E2340]">Maya</p>
                <p className="text-[10px] text-[#8A90A6]">View profile</p>
              </div>
            </div>
            <span className="text-[#8A90A6] text-xs">▼</span>
          </div>
        </div>
      </aside>

      {/* 2. CONVERSATIONS LIST PANEL */}
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
              className="w-full bg-[#F5F6FA] text-xs pl-10 pr-4 py-2.5 rounded-xl text-[#1E2340] placeholder-[#8A90A6] focus:outline-none focus:ring-1 focus:ring-[#5E4BE2]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          {conversations.map((chat) => {
            const isSelected = selectedChatId === chat.id;
            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`p-3.5 rounded-2xl cursor-pointer transition flex items-center gap-3 ${
                  isSelected ? 'bg-[#F0EEFF]' : 'hover:bg-[#F8F9FB]'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      chat.status === 'online'
                        ? 'bg-green-500'
                        : chat.status === 'away'
                        ? 'bg-amber-400'
                        : 'bg-gray-300'
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-xs font-bold truncate ${isSelected ? 'text-[#5E4BE2]' : 'text-[#1E2340]'}`}>
                      {chat.name}
                    </h3>
                    <span className="text-[10px] text-[#8A90A6] shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-xs text-[#8A90A6] truncate">{chat.lastMessage}</p>
                </div>

                {chat.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#5E4BE2] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ACTIVE CHAT PANEL */}
      <section className="flex-1 bg-[#F9FAFC] flex flex-col h-full overflow-hidden">
        {/* Chat Header */}
        <div className="h-16 bg-white border-b border-[#EAECEF] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeChat?.avatar}
                alt={activeChat?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
            </div>
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

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex justify-center my-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A0A5BA] bg-[#EAECEF]/50 px-3 py-1 rounded-full">
              Tuesday, August 25, 2026
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-md px-5 py-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.isMe
                    ? 'bg-[#5E4BE2] text-white rounded-br-xs'
                    : 'bg-white text-[#2C3256] border border-[#EAECEF] rounded-bl-xs shadow-xs'
                }`}
              >
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
        <div className="p-4 bg-white border-t border-[#EAECEF] space-y-2 shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-[#F5F6FA] px-4 py-2.5 rounded-2xl">
            <button type="button" className="text-[#8A90A6] hover:text-[#5E4BE2] transition">
              <Plus className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a thoughtful message..."
              className="flex-1 bg-transparent text-xs text-[#1E2340] placeholder-[#8A90A6] focus:outline-none"
            />
            <button type="button" className="text-[#8A90A6] hover:text-[#5E4BE2] transition">
              <Smile className="w-5 h-5" />
            </button>
            <button type="button" className="text-[#8A90A6] hover:text-[#5E4BE2] transition">
              <Paperclip className="w-5 h-5" />
            </button>
            <button type="submit" className="w-8 h-8 rounded-full bg-[#5E4BE2] text-white flex items-center justify-center hover:bg-[#4B38C9] transition">
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-1 text-[10px] text-[#A0A5BA]">
            <Lock className="w-3 h-3" />
            <span>End-to-end encrypted • Your privacy is our priority</span>
          </div>
        </div>
      </section>

    </div>
  );
}