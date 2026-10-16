export type CourseCategory = "web" | "mobile" | "programming" | "design";

export type Course = {
  slug: string;
  title: string;
  summary: string;
  category: CourseCategory;
  level: string;
  duration: string;
  price: string;
  mode: string;
  flagship?: boolean;
};

export const courses: Course[] = [
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    summary:
      "HTML, CSS and JavaScript through React and Node.js, ending with a deployed project of your own.",
    category: "web",
    level: "BEGINNER → JOB-READY",
    duration: "[DURATION]",
    price: "[PRICE]",
    mode: "ONLINE + OFFLINE",
    flagship: true,
  },
  {
    slug: "frontend-with-react",
    title: "Frontend with React",
    summary:
      "Components, state, routing and APIs. For people who know some JavaScript and want to build real interfaces.",
    category: "web",
    level: "INTERMEDIATE",
    duration: "[DURATION]",
    price: "[PRICE]",
    mode: "[MODE]",
  },
  {
    slug: "python-programming",
    title: "Python Programming",
    summary:
      "From your first script to working applications, with problem-solving practice in every session.",
    category: "programming",
    level: "BEGINNER",
    duration: "[DURATION]",
    price: "[PRICE]",
    mode: "ONLINE + OFFLINE",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    summary:
      "Build and publish an Android and iOS app from one codebase, from layout to the store listing.",
    category: "mobile",
    level: "INTERMEDIATE",
    duration: "[DURATION]",
    price: "[PRICE]",
    mode: "[MODE]",
  },
  {
    slug: "ui-ux-design-fundamentals",
    title: "UI/UX Design Fundamentals",
    summary:
      "Research, wireframes and polished screens in Figma, critiqued by the studio's designers.",
    category: "design",
    level: "BEGINNER",
    duration: "[DURATION]",
    price: "[PRICE]",
    mode: "[MODE]",
  },
];

/** Courses featured on the homepage, in order. */
export const featuredCourseSlugs = [
  "full-stack-web-development",
  "python-programming",
  "frontend-with-react",
];

export const courseFilters: { value: "all" | CourseCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "programming", label: "Programming" },
  { value: "design", label: "Design" },
];

export const academyFacts = [
  { label: "BATCH SIZE", value: "Up to [00] students" },
  { label: "MODE", value: "Online + in person" },
  { label: "TIMINGS", value: "[Weekday / weekend]" },
  { label: "ON COMPLETION", value: "Certificate + portfolio" },
];

export const academySteps = [
  {
    title: "Try a free class",
    description: "Sit in on a live session and talk to a trainer about which track fits you.",
  },
  {
    title: "Learn live",
    description: "Small batches with assignments every week and doubt-clearing between classes.",
  },
  {
    title: "Build at the studio",
    description:
      "Work on a real brief with code reviews from the developers who run client projects.",
  },
  {
    title: "Graduate and go",
    description: "Leave with a certificate, a deployed portfolio and help preparing for interviews.",
  },
];

export const flagshipSyllabus = {
  facts: [
    { label: "Duration", value: "[00 weeks]" },
    { label: "Schedule", value: "[Days, time]" },
    { label: "Fee", value: "[₹00,000] · EMI [if available]" },
  ],
  modules: [
    {
      title: "Web foundations",
      weeks: "[0 WK]",
      description:
        "How the web works, semantic HTML, modern CSS, Flexbox and Grid, responsive layouts. You build and publish a personal site.",
    },
    {
      title: "JavaScript, properly",
      weeks: "[0 WK]",
      description: "Variables to async code, the DOM, fetch and debugging.",
    },
    {
      title: "React",
      weeks: "[0 WK]",
      description: "Components, hooks, routing and working with APIs.",
    },
    {
      title: "Node.js & databases",
      weeks: "[0 WK]",
      description: "REST APIs, authentication and storing data.",
    },
    {
      title: "Git, testing & deployment",
      weeks: "[0 WK]",
      description: "Team workflows, pull requests and getting your app online.",
    },
    {
      title: "Capstone at the studio",
      weeks: "[0 WK]",
      description: "A real brief, reviewed like client work, shipped to production.",
      highlight: true,
    },
  ],
};

export const trainers = Array.from({ length: 4 }, (_, i) => ({
  id: `trainer-${i + 1}`,
  name: "[Trainer name]",
  role: "[Role]",
  course: "[Course]",
  photo: undefined as string | undefined,
}));

export const faqs = [
  {
    question: "Do I need to know any coding already?",
    answer:
      "No. Courses marked Beginner start from zero. The free demo class is the easiest way to check you're in the right place.",
  },
  { question: "Are classes online or in person?", answer: "[Your answer.]" },
  {
    question: "What happens if I miss a class?",
    answer: "[Your answer, e.g. recordings or backup sessions.]",
  },
  { question: "Can I pay in instalments?", answer: "[Your answer.]" },
  { question: "Do you help with internships or jobs?", answer: "[Your answer.]" },
];
