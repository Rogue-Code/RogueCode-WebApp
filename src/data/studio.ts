import type { IconName } from "@/components/ui/Icon";

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
  image?: string;
};

export const projects: Project[] = [
  { slug: "project-1", name: "[Project name]", client: "[CLIENT]", type: "WEB APP" },
  {
    slug: "project-2",
    name: "[Project name]",
    type: "MOBILE APP",
    image: "/images/work/mobile-app-mockups.png",
  },
  { slug: "project-3", name: "[Project name]", type: "WEBSITE" },
];

export const testimonials = [
  {
    kind: "CLIENT",
    quote:
      "[A sentence from a client about what Rogue Code built for them and what changed afterwards.]",
    name: "[Name]",
    detail: "[Role, Company]",
  },
  {
    kind: "STUDENT",
    quote: "[A sentence from a student about the course and where they are now.]",
    name: "[Name]",
    detail: "[Course, batch] → [Current role]",
  },
];
