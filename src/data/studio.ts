import type { IconName } from "@/components/ui/Icon";
import { site } from "./site";

export const services: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "monitorCode",
    title: "Web development",
    description:
      "Business websites, dashboards and full web applications, built to load fast and stay easy to maintain.",
  },
  {
    icon: "mobile",
    title: "Mobile apps",
    description:
      "Android and iOS apps, cross-platform or native, depending on what your product and budget need.",
  },
  {
    icon: "pen",
    title: "UI/UX design",
    description:
      "Research, wireframes and interfaces your users understand the first time they open them.",
  },
  {
    icon: "pulse",
    title: "Support & scaling",
    description:
      "Hosting, monitoring and ongoing feature work after launch, so your product keeps getting better.",
  },
];

export const processSteps = [
  {
    step: "01",
    name: "code",
    description:
      "We scope the problem, design the screens and write the first working version, with you reviewing progress every week.",
  },
  {
    step: "02",
    name: "compile",
    description:
      "Testing, code reviews and fixes until it holds up on real devices, with real data and real users.",
  },
  {
    step: "03",
    name: "run",
    description:
      "We launch, monitor and keep improving it. Your product doesn't get handed over and forgotten.",
  },
];

export type Project = {
  slug: string;
  name: string;
  client?: string;
  type: string;
  /** What we built, in a sentence or two. */
  description: string;
  /** The live site or app listing. */
  url?: string;
  image?: string;
};

const kajalPlayUrl = "https://play.google.com/store/apps/details?id=com.kishan_chaudhary.kajalconstruction";

// Screenshots taken from the live sites and the Play Store listing on 4 Nov 2026.
export const projects: Project[] = [
  {
    slug: "kajal-constructions",
    name: "Kajal Constructions",
    type: "ANDROID APP + WEB PORTAL",
    description:
      "An Android app and admin portal that run day-to-day site operations for a construction company. Site supervisors log material deliveries from vendors with photo and video proof and track trucks, while the office manages sites, vendors, vehicle servicing, bills and staff attendance in one place. Rated 4.9 on Google Play.",
    url: kajalPlayUrl,
    image: "/images/work/kajal-constructions.jpg",
  },
  {
    slug: "ams-hospital",
    name: "AMS Hospital",
    type: "WEBSITE",
    description:
      "Website for an 80-bed multi-speciality hospital in Vile Parle, Mumbai, with its medical, cardiac, maternity and surgical services, a doctors directory, appointment booking, health checkup plans, cashless insurance partners and job openings.",
    url: "https://amshospitals.in",
    image: "/images/work/ams-hospital.jpg",
  },
  {
    slug: "tiny-clay",
    name: "The Tiny Clay Inn",
    type: "E-COMMERCE",
    description:
      "Online store for a pottery studio in Andheri West, Mumbai. Customers shop handcrafted ceramics, request custom pieces and discover the studio's pottery workshops, with a cart and customer accounts.",
    url: "https://tinyclay.in",
    image: "/images/work/tiny-clay.jpg",
  },
];

export type Testimonial = {
  kind: string;
  quote: string;
  name: string;
  detail: string;
  /** Where the quote was published. */
  href?: string;
};

// Quoted from public reviews: the Kajal Constructions company account on Google Play and
// Rogue Code's Google Business Profile. Trimmed, not reworded.
export const testimonials: Testimonial[] = [
  {
    kind: "CLIENT",
    quote:
      "Really useful app for managing construction site activities. It makes it much easier to keep track of day-to-day processes and reduces the need for managing everything manually. The interface is simple and easy to understand, and having the site-related information in one place is very convenient.",
    name: "Kajal Constructions",
    detail: "Google Play review of their site management app",
    href: kajalPlayUrl,
  },
  {
    kind: "STUDENT",
    quote:
      "I had a great experience with Rogue Code while preparing for my college exams in C++. Prianca Ma’am was extremely dedicated, patient, and helpful, always making sure I understood the concepts clearly.",
    name: "Hrishita Raghuvanshi",
    detail: "C++ Programming · Google review",
    href: `https://search.google.com/local/reviews?placeid=${site.google.placeId}`,
  },
];
