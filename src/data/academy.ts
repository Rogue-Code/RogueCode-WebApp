import catalog from "./courses.json";

// Course catalogue curated from the Google Drive "Courses" folder (src/data/courses.json).
// fee2021 comes from the 2021 brochure and is not shown on the site until it's confirmed.

export type CourseModule = {
  title: string;
  topics?: string[];
  /** Links the module to another course's page (e.g. subjects covered in academic tuition). */
  courseId?: string;
};

export type Course = {
  id: string;
  title: string;
  category: string;
  description?: string;
  prerequisites?: string;
  duration?: string;
  fee2021?: string;
  /** documented = written syllabus; from-materials = taken from slides/practicals; title-only = no syllabus yet */
  syllabusStatus: "documented" | "from-materials" | "title-only";
  source?: string;
  modules?: CourseModule[];
};

export const courses = catalog.courses as Course[];

/** Categories in catalogue order. */
export const courseCategories = [...new Set(courses.map((c) => c.category))];

export const flagshipCourseId = "full-stack-web";

/** Courses featured on the homepage, in order. */
export const featuredCourseIds = ["full-stack-web", "python", "javascript-react"];

export function getCourse(id: string) {
  return courses.find((c) => c.id === id);
}

export function courseHref(course: Pick<Course, "id">) {
  return `/academy/courses/${course.id}`;
}

/** One-line summary for cards: the written description, or the first few modules. */
export function courseSummary(course: Course) {
  if (course.description) return course.description;
  const modules = course.modules ?? [];
  if (modules.length === 0) return "Ask us for the current syllabus and batch timings.";
  const names = modules.slice(0, 3).map((m) => m.title);
  return `Covers ${names.join(", ")}${modules.length > 3 ? " and more" : ""}.`;
}

export const academyFacts = [
  { label: "BATCH SIZE", value: "Up to 15 students" },
  { label: "MODE", value: "Online + In Person" },
  { label: "TIMINGS", value: "[Weekday / Weekend]" },
  { label: "ON COMPLETION", value: "Certificate + Portfolio" },
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

export const trainers = Array.from({ length: 4 }, (_, i) => ({
  id: `trainer-${i + 1}`,
  name: "[Trainer name]",
  role: "[Role]",
  course: "[Course]",
  photo: i === 0 ? "/images/trainers/sakshi.jpeg" : (undefined as string | undefined),
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

/** Posts from @rogue.code shown on the Academy page. Images are saved copies in public/images/instagram. */
export const instagramPosts = [
  {
    href: "https://www.instagram.com/rogue.code/p/DIjhofeStm-/",
    image: "/images/instagram/student-sumeet-suthar.jpg",
    alt: "Sumeet Suthar receiving his Rogue Code certificate, with his review of the course",
  },
  {
    href: "https://www.instagram.com/rogue.code/p/DIjMuM0yaXJ/",
    image: "/images/instagram/student-akshat-lodha.jpg",
    alt: "Akshat Lodha receiving his Rogue Code certificate, with his review of the course",
  },
  {
    href: "https://www.instagram.com/rogue.code/p/DIjLuB2SEhp/",
    image: "/images/instagram/student-fenil-shah.jpg",
    alt: "Fenil Shah receiving his Rogue Code certificate, with his review of the course",
  },
  {
    href: "https://www.instagram.com/rogue.code/p/CZd6X1grKBz/",
    image: "/images/instagram/angular-webinar.jpg",
    alt: "Poster for a Rogue Code live webinar: how to build a single page application using Angular",
  },
];

/**
 * Coding for school kids. Not in the Drive catalogue yet, so everything in [brackets]
 * is a suggestion to confirm or replace.
 */
export const kidsTracks = [
  {
    ages: "[AGES 8–11]",
    title: "[First steps in coding]",
    description:
      "[Block-based coding in Scratch: games and animations that teach sequences, loops and logic.]",
  },
  {
    ages: "[AGES 11–14]",
    title: "[Python for young coders]",
    description:
      "[Text-based coding with small projects like quizzes, calculators and simple games.]",
  },
  {
    ages: "[AGES 13–16]",
    title: "[Build your first website]",
    description: "[HTML, CSS and a little JavaScript to design and publish a personal website.]",
  },
];

export const kidsFacts = [
  { label: "BATCH SIZE", value: "[Small groups of 00]" },
  { label: "TIMINGS", value: "[Weekends / after school]" },
  { label: "MODE", value: "[Online + in person]" },
];
