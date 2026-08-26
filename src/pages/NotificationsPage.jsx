import { Bell, MessageCircle, Users, BookOpen, Sparkles, ChevronRight } from "lucide-react";

const TODAY = [
  { icon: <MessageCircle size={16} />, text: 'New reply in "Anxiety Support Circle"', sub: "Someone replied to your post.", time: "10:30 AM", unread: true, color: "#6636ee" },
  { icon: <Users size={16} />, text: "Dr. Angelique is now available", sub: "You can book a session now.", time: "9:15 AM", unread: true, color: "#3e9362" },
  { icon: <BookOpen size={16} />, text: "Reminder: Journal check-in", sub: "How are you feeling today?", time: "8:00 AM", unread: false, color: "#e88c2d" },
];

const YESTERDAY = [
  { icon: <MessageCircle size={16} />, text: "New message from Sarah", sub: "Hey! How have you been?", time: "Yesterday", unread: false, color: "#6636ee" },
  { icon: <BookOpen size={16} />, text: 'You saved a new story', sub: '"Choosing Myself Every Day"', time: "Yesterday", unread: false, color: "#d56a83" },
  { icon: <Sparkles size={16} />, text: "New music suggestion for you", sub: '"Mindfulness & Meditation" might interest you.', time: "Yesterday", unread: false, color: "#6636ee" },
];

const THIS_WEEK = [
  { icon: <BookOpen size={16} />, text: "Weekly reflection time", sub: "Take a moment to reflect in your journal.", time: "Mon", unread: false, color: "#3e9362" },
  { icon: <Sparkles size={16} />, text: "New resource added", sub: '"Managing Overcoming" is now available.', time: "Mon", unread: false, color: "#6636ee" },
];

const TABS = ["All", "Unread", "Mentions", "Rooms", "Messages"];

function NotifItem({ item }) {
  return (
    <div className={`notif-item ${item.unread ? "unread" : ""}`}>
      <span className="notif-icon" style={{ background: item.color + "22", color: item.color }}>{item.icon}</span>
      <div className="notif-body">
        <p>{item.text}</p>
        <span>{item.sub}</span>
      </div>
      <div className="notif-meta">
        <span className="notif-time">{item.time}</span>
        {item.unread && <span className="notif-dot" />}
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <div className="notif-page">
      <div className="notif-header">
        <Bell size={22} className="notif-header-icon" />
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with what's happening.</p>
        </div>
      </div>

      <div className="notif-tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`notif-tab ${i === 0 ? "active" : ""}`}>
            {t}{t === "Notifications" && <span className="notif-badge">8</span>}
          </button>
        ))}
      </div>

      <div className="notif-list">
        <p className="notif-day-label">Today</p>
        {TODAY.map((n, i) => <NotifItem key={i} item={n} />)}

        <p className="notif-day-label">Yesterday</p>
        {YESTERDAY.map((n, i) => <NotifItem key={i} item={n} />)}

        <p className="notif-day-label">This Week</p>
        {THIS_WEEK.map((n, i) => <NotifItem key={i} item={n} />)}
      </div>
    </div>
  );
}
