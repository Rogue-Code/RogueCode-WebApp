// Seed content for events and the blog. Replace with the Firestore `Events` / `Blogs` collections later.

export type EventType = "workshop" | "bootcamp" | "webinar" | "hackathon" | "demo";

export const eventTypes: { value: "all" | EventType; label: string }[] = [
  { value: "all", label: "All events" },
  { value: "workshop", label: "Workshops" },
  { value: "bootcamp", label: "Bootcamps" },
  { value: "webinar", label: "Webinars" },
  { value: "hackathon", label: "Hackathons" },
  { value: "demo", label: "Demo classes" },
];

export type EventItem = {
  slug: string;
  type: EventType;
  title: string;
  day: string;
  month: string;
  time: string;
  registrationCloses: string;
  venue: string;
  fee: string;
  summary: string;
  description: string[];
};

export const events: EventItem[] = [
  {
    slug: "workshop",
    type: "workshop",
    title: "[Workshop title]",
    day: "[DD]",
    month: "[MON]",
    time: "[Time]",
    registrationCloses: "[Date, time]",
    venue: "[Venue or Online]",
    fee: "[Free / ₹ fee]",
    summary: "[One line on what attendees will build or learn.]",
    description: ["[Event description, agenda and who it's for.]"],
  },
  {
    slug: "hackathon",
    type: "hackathon",
    title: "[Hackathon or meetup title]",
    day: "[DD]",
    month: "[MON]",
    time: "[Time]",
    registrationCloses: "[Date, time]",
    venue: "[Venue]",
    fee: "[Team size]",
    summary: "[One line on the theme and prizes.]",
    description: ["[Rules, theme, judging and prizes.]"],
  },
  {
    slug: "demo-class",
    type: "demo",
    title: "[Free demo class]",
    day: "[DD]",
    month: "[MON]",
    time: "[Time]",
    registrationCloses: "[Date, time]",
    venue: "Online",
    fee: "Free",
    summary: "Sit in on a live Academy session and ask the trainer anything.",
    description: [
      "A live sample class from one of our Academy tracks. Bring your questions — the trainer will help you pick the right course.",
    ],
  },
];

export type Post = {
  slug: string;
  category: string;
  date: string;
  author: string;
  readMinutes: number;
  title: string;
  excerpt: string;
  body: string[];
  image?: string;
};

export const posts: Post[] = [
  {
    slug: "blind-75",
    category: "INTERVIEW PREP",
    date: "9 March 2024",
    author: "Kishan Chaudhary",
    readMinutes: 5,
    title: "Blind 75",
    excerpt: "Blind 75 are basically 75 problems that cover the patterns most coding interviews test.",
    body: ["[Full post content from the existing blog.]"],
    image: "/images/photos/code-on-screen.jpg",
  },
  {
    slug: "post-1",
    category: "ENGINEERING",
    date: "[DATE]",
    author: "[Author]",
    readMinutes: 5,
    title: "[Post title about something the studio built or learned]",
    excerpt: "[One-line summary.]",
    body: ["[Post content.]"],
  },
  {
    slug: "post-2",
    category: "CAREERS",
    date: "[DATE]",
    author: "[Author]",
    readMinutes: 5,
    title: "[Post title for beginners choosing a first language]",
    excerpt: "[One-line summary.]",
    body: ["[Post content.]"],
  },
  {
    slug: "post-3",
    category: "STUDENT STORIES",
    date: "[DATE]",
    author: "[Author]",
    readMinutes: 5,
    title: "[Post title featuring a graduate's project]",
    excerpt: "[One-line summary.]",
    body: ["[Post content.]"],
  },
];
