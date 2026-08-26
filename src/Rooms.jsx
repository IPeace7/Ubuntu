import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  MessageCircle,
  MoreHorizontal,
  Compass,
  Sparkles,
  Code2,
  BookOpen,
  Music,
  Gamepad2,
  GraduationCap,
  Briefcase,
  X,
  Check,
  ArrowLeft,
  Heart,
  Send,
  Clock,
} from "lucide-react";
import logo from "./assets/Logo.svg";
import "./rooms.css";

const initialRooms = [
  {
    id: 1,
    name: "Tech & Coding",
    description:
      "A place for developers to share ideas, projects, questions and everything about technology.",
    category: "Technology",
    members: 1248,
    posts: 342,
    icon: Code2,
    joined: true,
    color: "blue",
    messages: [
      {
        id: 1,
        author: "Alex",
        avatar: "A",
        time: "25 min ago",
        text: "What is everyone building this week?",
        likes: 24,
      },
      {
        id: 2,
        author: "Jordan",
        avatar: "J",
        time: "1 hour ago",
        text: "I'm working on a React project. Finally getting the hang of state management 😂",
        likes: 41,
      },
      {
        id: 3,
        author: "Maya",
        avatar: "M",
        time: "2 hours ago",
        text: "Anyone here learning backend development? Would love to exchange resources.",
        likes: 18,
      },
    ],
  },
  {
    id: 2,
    name: "Student Hub",
    description:
      "Connect with students, share study tips, ask questions and grow together.",
    category: "Education",
    members: 956,
    posts: 287,
    icon: GraduationCap,
    joined: false,
    color: "purple",
    messages: [
      {
        id: 1,
        author: "Chris",
        avatar: "C",
        time: "18 min ago",
        text: "What study method works best for you guys?",
        likes: 32,
      },
      {
        id: 2,
        author: "Sarah",
        avatar: "S",
        time: "1 hour ago",
        text: "I started using active recall and it has honestly changed everything.",
        likes: 54,
      },
      {
        id: 3,
        author: "David",
        avatar: "D",
        time: "3 hours ago",
        text: "Anyone preparing for exams this month? We could make a study group.",
        likes: 27,
      },
    ],
  },
  {
    id: 3,
    name: "Music Lovers",
    description:
      "Talk about music, discover new artists, share your playlists and meet people who love music.",
    category: "Music",
    members: 734,
    posts: 198,
    icon: Music,
    joined: false,
    color: "pink",
    messages: [
      {
        id: 1,
        author: "Jordan",
        avatar: "J",
        time: "12 min ago",
        text: "What song have you had on repeat lately?",
        likes: 16,
      },
      {
        id: 2,
        author: "Mia",
        avatar: "M",
        time: "45 min ago",
        text: "I just discovered an amazing artist. The vocals are insane.",
        likes: 29,
      },
      {
        id: 3,
        author: "Kevin",
        avatar: "K",
        time: "2 hours ago",
        text: "Anyone here learning piano? I need some motivation 😂",
        likes: 37,
      },
    ],
  },
  {
    id: 4,
    name: "Books & Ideas",
    description:
      "A community for readers, thinkers and people who love discussing great ideas.",
    category: "Education",
    members: 521,
    posts: 143,
    icon: BookOpen,
    joined: false,
    color: "orange",
    messages: [
      {
        id: 1,
        author: "Emma",
        avatar: "E",
        time: "30 min ago",
        text: "What's the best book you've read this year?",
        likes: 21,
      },
      {
        id: 2,
        author: "Noah",
        avatar: "N",
        time: "2 hours ago",
        text: "Just finished a really interesting book about human psychology.",
        likes: 34,
      },
    ],
  },
  {
    id: 5,
    name: "Gaming Zone",
    description:
      "Gaming discussions, recommendations, competitions and everything gamers love.",
    category: "Gaming",
    members: 689,
    posts: 221,
    icon: Gamepad2,
    joined: false,
    color: "green",
    messages: [
      {
        id: 1,
        author: "Ryan",
        avatar: "R",
        time: "10 min ago",
        text: "Who's playing tonight?",
        likes: 12,
      },
      {
        id: 2,
        author: "Leo",
        avatar: "L",
        time: "1 hour ago",
        text: "Finally completed the campaign. What a game!",
        likes: 43,
      },
    ],
  },
  {
    id: 6,
    name: "Entrepreneurs",
    description:
      "Build, learn and connect with people interested in business, startups and entrepreneurship.",
    category: "Business",
    members: 438,
    posts: 117,
    icon: Briefcase,
    joined: false,
    color: "yellow",
    messages: [
      {
        id: 1,
        author: "Daniel",
        avatar: "D",
        time: "35 min ago",
        text: "What's one business lesson you learned the hard way?",
        likes: 38,
      },
      {
        id: 2,
        author: "Anna",
        avatar: "A",
        time: "2 hours ago",
        text: "Don't build something just because you can. Solve a real problem.",
        likes: 67,
      },
    ],
  },
];

const categories = [
  "All",
  "Technology",
  "Education",
  "Music",
  "Gaming",
  "Business",
];

function Rooms() {
  const [rooms, setRooms] = useState(initialRooms);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinedOnly, setShowJoinedOnly] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [joinRequest, setJoinRequest] = useState(null);

  const [newMessage, setNewMessage] = useState("");

  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    category: "Technology",
  });

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesCategory =
        activeCategory === "All" || room.category === activeCategory;

      const matchesSearch =
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.description.toLowerCase().includes(search.toLowerCase());

      const matchesJoined = showJoinedOnly ? room.joined : true;

      return matchesCategory && matchesSearch && matchesJoined;
    });
  }, [rooms, activeCategory, search, showJoinedOnly]);

  const openRoom = (room) => {
    if (!room.joined) {
      setJoinRequest(room);
      return;
    }

    setSelectedRoom(room);
  };

  const confirmJoin = () => {
    if (!joinRequest) return;

    const updatedRoom = {
      ...joinRequest,
      joined: true,
      members: joinRequest.members + 1,
    };

    setRooms((current) =>
      current.map((room) =>
        room.id === joinRequest.id ? updatedRoom : room
      )
    );

    setJoinRequest(null);
    setSelectedRoom(updatedRoom);
  };

  const toggleJoin = (room, event) => {
    event.stopPropagation();

    if (!room.joined) {
      setJoinRequest(room);
      return;
    }

    setRooms((current) =>
      current.map((item) =>
        item.id === room.id
          ? {
              ...item,
              joined: false,
              members: Math.max(0, item.members - 1),
            }
          : item
      )
    );

    if (selectedRoom?.id === room.id) {
      setSelectedRoom(null);
    }
  };

  const likeMessage = (roomId, messageId) => {
    setRooms((currentRooms) =>
      currentRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              messages: room.messages.map((message) =>
                message.id === messageId
                  ? {
                      ...message,
                      likes: message.likes + 1,
                    }
                  : message
              ),
            }
          : room
      )
    );

    setSelectedRoom((current) => {
      if (!current || current.id !== roomId) return current;

      return {
        ...current,
        messages: current.messages.map((message) =>
          message.id === messageId
            ? {
                ...message,
                likes: message.likes + 1,
              }
            : message
        ),
      };
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedRoom) return;

    const message = {
      id: Date.now(),
      author: "You",
      avatar: "Y",
      time: "Just now",
      text: newMessage.trim(),
      likes: 0,
    };

    setRooms((currentRooms) =>
      currentRooms.map((room) =>
        room.id === selectedRoom.id
          ? {
              ...room,
              posts: room.posts + 1,
              messages: [...room.messages, message],
            }
          : room
      )
    );

    setSelectedRoom((current) => ({
      ...current,
      posts: current.posts + 1,
      messages: [...current.messages, message],
    }));

    setNewMessage("");
  };

  const createRoom = (e) => {
    e.preventDefault();

    if (!newRoom.name.trim() || !newRoom.description.trim()) return;

    const newCommunity = {
      id: Date.now(),
      name: newRoom.name,
      description: newRoom.description,
      category: newRoom.category,
      members: 1,
      posts: 0,
      icon: Sparkles,
      joined: true,
      color: "blue",
      messages: [],
    };

    setRooms((current) => [newCommunity, ...current]);

    setNewRoom({
      name: "",
      description: "",
      category: "Technology",
    });

    setShowCreateModal(false);
  };

  /* COMMUNITY VIEW */

  if (selectedRoom) {
    const Icon = selectedRoom.icon;

    return (
      <div className="rooms-page">
        <div className="rooms-logo">
          <img src={logo} alt="Inside Out" />
        </div>

        <div className="community-view">
          <button
            className="back-button"
            onClick={() => setSelectedRoom(null)}
          >
            <ArrowLeft size={18} />
            Back to communities
          </button>

          <div className="community-header-card">
            <div className={`community-large-icon ${selectedRoom.color}`}>
              <Icon size={31} />
            </div>

            <div className="community-header-info">
              <div className="community-title-line">
                <h1>{selectedRoom.name}</h1>
                <span className="joined-badge">
                  <Check size={12} />
                  Joined
                </span>
              </div>

              <p>{selectedRoom.description}</p>

              <div className="community-stats">
                <span>
                  <Users size={16} />
                  {selectedRoom.members.toLocaleString()} members
                </span>

                <span>
                  <MessageCircle size={16} />
                  {selectedRoom.posts} posts
                </span>
              </div>
            </div>

            <button
              className="leave-button"
              onClick={() => {
                setRooms((current) =>
                  current.map((room) =>
                    room.id === selectedRoom.id
                      ? {
                          ...room,
                          joined: false,
                          members: Math.max(0, room.members - 1),
                        }
                      : room
                  )
                );

                setSelectedRoom(null);
              }}
            >
              Leave
            </button>
          </div>

          <div className="community-content">
            <div className="messages-column">
              <div className="messages-heading">
                <div>
                  <h2>Community messages</h2>
                  <p>See what people have been talking about.</p>
                </div>

                <span className="message-count">
                  {selectedRoom.messages.length} recent
                </span>
              </div>

              <div className="messages-list">
                {selectedRoom.messages.length === 0 ? (
                  <div className="no-messages">
                    <div>
                      <MessageCircle size={28} />
                    </div>
                    <h3>No messages yet</h3>
                    <p>Be the first person to start the conversation.</p>
                  </div>
                ) : (
                  selectedRoom.messages.map((message) => (
                    <article className="message-card" key={message.id}>
                      <div className="message-avatar">
                        {message.avatar}
                      </div>

                      <div className="message-body">
                        <div className="message-top">
                          <div>
                            <strong>{message.author}</strong>
                            <span>
                              <Clock size={12} />
                              {message.time}
                            </span>
                          </div>

                          <button>
                            <MoreHorizontal size={18} />
                          </button>
                        </div>

                        <p>{message.text}</p>

                        <div className="message-actions">
                          <button
                            onClick={() =>
                              likeMessage(
                                selectedRoom.id,
                                message.id
                              )
                            }
                          >
                            <Heart size={16} />
                            {message.likes}
                          </button>

                          <button>
                            <MessageCircle size={16} />
                            Reply
                          </button>

                          <button>
                            Share
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>

              <form
                className="message-composer"
                onSubmit={sendMessage}
              >
                <div className="your-avatar">Y</div>

                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Share something with ${selectedRoom.name}...`}
                />

                <button type="submit">
                  <Send size={17} />
                </button>
              </form>
            </div>

            <aside className="community-sidebar">
              <div className="about-card">
                <h3>About this community</h3>

                <p>{selectedRoom.description}</p>

                <div className="about-stat">
                  <Users size={18} />
                  <div>
                    <strong>
                      {selectedRoom.members.toLocaleString()}
                    </strong>
                    <span>Members</span>
                  </div>
                </div>

                <div className="about-stat">
                  <MessageCircle size={18} />
                  <div>
                    <strong>{selectedRoom.posts}</strong>
                    <span>Posts</span>
                  </div>
                </div>

                <div className="about-category">
                  {selectedRoom.category}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  /* COMMUNITIES HOME */

  return (
    <div className="rooms-page">
      <header className="rooms-topbar">
        <div className="rooms-logo">
          <img src={logo} alt="Inside Out" />
        </div>

        <div className="topbar-title">
          <span>COMMUNITIES</span>
          <h1>Rooms & Communities</h1>
        </div>

        <button
          className="create-room-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Create a room
        </button>
      </header>

      <section className="rooms-intro">
        <div>
          <div className="intro-label">
            <Sparkles size={14} />
            Find your people
          </div>

          <h2>
            A place for every
            <br />
            <span>conversation.</span>
          </h2>

          <p>
            Join communities around the things you care about.
            Share ideas, learn from others and have conversations
            that actually matter.
          </p>
        </div>
      </section>

      <section className="rooms-controls">
        <div className="rooms-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search communities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <X size={17} />
            </button>
          )}
        </div>

        <button
          className={`joined-filter ${
            showJoinedOnly ? "active" : ""
          }`}
          onClick={() => setShowJoinedOnly(!showJoinedOnly)}
        >
          <Check size={16} />
          Joined
        </button>
      </section>

      <section className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category ? "active" : ""
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="rooms-grid-section">
        <div className="section-heading">
          <div>
            <h2>Discover communities</h2>
            <p>
              {filteredRooms.length} communities available
            </p>
          </div>

          <div className="discover-label">
            <Compass size={16} />
            Explore
          </div>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Search size={26} />
            </div>

            <h3>No communities found</h3>

            <p>
              Try another search or create your own community.
            </p>

            <button onClick={() => setShowCreateModal(true)}>
              <Plus size={17} />
              Create community
            </button>
          </div>
        ) : (
          <div className="rooms-grid">
            {filteredRooms.map((room) => {
              const Icon = room.icon;

              return (
                <article
                  className="room-card"
                  key={room.id}
                  onClick={() => openRoom(room)}
                >
                  <div className="room-card-top">
                    <div className={`room-icon ${room.color}`}>
                      <Icon size={24} />
                    </div>

                    <button
                      className="room-more"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </div>

                  <div className="room-card-content">
                    <div className="room-name-row">
                      <h3>{room.name}</h3>

                      {room.joined && (
                        <span className="joined-badge">
                          <Check size={11} />
                          Joined
                        </span>
                      )}
                    </div>

                    <p>{room.description}</p>

                    <div className="room-meta">
                      <span>
                        <Users size={15} />
                        {room.members.toLocaleString()}
                      </span>

                      <span>
                        <MessageCircle size={15} />
                        {room.posts}
                      </span>
                    </div>

                    <div className="room-bottom">
                      <div className="room-members">
                        <div className="member-avatar">D</div>
                        <div className="member-avatar">A</div>
                        <div className="member-avatar">M</div>
                        <span>
                          +{Math.max(room.members - 3, 0)}
                        </span>
                      </div>

                      <button
                        className={`join-btn ${
                          room.joined ? "joined" : ""
                        }`}
                        onClick={(e) => toggleJoin(room, e)}
                      >
                        {room.joined ? (
                          <>
                            <Check size={15} />
                            Joined
                          </>
                        ) : (
                          <>
                            <Plus size={15} />
                            Join
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* JOIN CONFIRMATION */}

      {joinRequest && (
        <div
          className="modal-overlay"
          onClick={() => setJoinRequest(null)}
        >
          <div
            className="join-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setJoinRequest(null)}
            >
              <X size={19} />
            </button>

            <div
              className={`join-modal-icon ${joinRequest.color}`}
            >
              {React.createElement(joinRequest.icon, {
                size: 29,
              })}
            </div>

            <h2>Join {joinRequest.name}?</h2>

            <p>
              You're about to join a community with{" "}
              <strong>
                {joinRequest.members.toLocaleString()} members
              </strong>
              . You'll be able to see past conversations and
              participate in new ones.
            </p>

            <div className="join-modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setJoinRequest(null)}
              >
                Maybe later
              </button>

              <button
                className="confirm-join-btn"
                onClick={confirmJoin}
              >
                <Users size={17} />
                Join community
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE ROOM MODAL */}

      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="create-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="modal-small-title">
                  NEW COMMUNITY
                </span>

                <h2>Create a room</h2>

                <p>
                  Build a space around something you care about.
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={createRoom}>
              <div className="form-group">
                <label>Community name</label>

                <input
                  type="text"
                  placeholder="e.g. Photography Club"
                  value={newRoom.name}
                  onChange={(e) =>
                    setNewRoom({
                      ...newRoom,
                      name: e.target.value,
                    })
                  }
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  placeholder="What is this community about?"
                  rows="4"
                  value={newRoom.description}
                  onChange={(e) =>
                    setNewRoom({
                      ...newRoom,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Category</label>

                <select
                  value={newRoom.category}
                  onChange={(e) =>
                    setNewRoom({
                      ...newRoom,
                      category: e.target.value,
                    })
                  }
                >
                  {categories
                    .filter((category) => category !== "All")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-create-btn"
                >
                  <Plus size={17} />
                  Create community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rooms;