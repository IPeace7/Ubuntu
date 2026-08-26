import {
  Home,
  BookOpen,
  Users,
  MessageCircle,
  Bookmark,
  Bell,
  UserRound,
  Heart,
  Phone,
} from "lucide-react";

export const navMain = [
  [Home, "Home"],
  [BookOpen, "Journal"],
  [Users, "Communities"],
  [MessageCircle, "Messages"],
  [Bookmark, "Saved"],
  [Bell, "Notifications"],
];

export const support = [
  [UserRound, "Find Professionals"],
  [Heart, "Wellness Hub"],
  [Phone, "Crisis Help"],
];

export const initialPosts = [
  {
    id: 1,
    name: "Anonymous",
    time: "25m ago",
    avatar: "avatar-purple",
    text: "Some days are just heavier than others. Anyone else feeling this today?",
    tag: "Anxiety",
    tagClass: "lavender",
    likes: 34,
    comments: 9,
    liked: false,
    commentList: [
      "You're definitely not alone.",
      "Sending you some love today ❤️",
    ],
  },
  {
    id: 2,
    name: "Alex",
    time: "1h ago",
    avatar: "avatar-alex",
    text: "Every step forward, no matter how small, is still progress. Proud of myself for getting out of bed today.",
    tag: "Self Love",
    tagClass: "green",
    likes: 72,
    comments: 15,
    liked: false,
    commentList: ["That's a huge win.", "Keep going Alex!"],
  },
  {
    id: 3,
    name: "Anonymous",
    time: "2h ago",
    avatar: "avatar-ocean",
    text: "I wish it was easier to talk to my family about how I feel.",
    tag: "Family",
    tagClass: "orange",
    likes: 23,
    comments: 11,
    liked: false,
    commentList: [
      "I understand how difficult that can be.",
      "Maybe start with one person you trust.",
    ],
  },
];

export const stories = [
  {
    title: "\u201cI thought I was the only one.\u201d",
    person: "Anonymous",
    image: "story-one",
    photo: "/story1.jpeg",
  },
  {
    title: "\u201cHealing isn\u2019t linear, but it is possible.\u201d",
    person: "Rina",
    image: "story-two",
    photo: "/story2.jpeg",
  },
  {
    title: "\u201cAsking for help changed everything.\u201d",
    person: "Jordan",
    image: "story-three",
    photo: "/story3.jpeg",
  },
];

export const topics = [
  ["Anxiety", "lavender"],
  ["Self Love", "green"],
  ["School", "yellow"],
  ["Relationships", "pink"],
  ["Overthinking", "blue"],
  ["Loneliness", "orange"],
  ["Motivation", "purple"],
  ["Family", "gold"],
];
