import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const doors = [
  {
    href: "#studio",
    label: "01 / TECH SOLUTIONS",
    title: ["Have something", "to build?"],
    description:
      "Websites, web apps and mobile apps, designed, built and looked after by the same team from first call to launch day and beyond.",
    tags: ["Web apps", "Mobile apps", "UI/UX design", "Support"],
    cta: "Explore tech solutions",
    dark: true,
  },
  {
    href: "/academy",
    label: "02 / ROGUE ACADEMY",
    title: ["Want to learn", "to build?"],
    description:
      "Hands-on courses taught by developers who ship client work every week, with real project experience inside the studio.",
    tags: ["Live classes", "Real projects", "Certificate", "Mentorship"],
    cta: "See the courses",
    dark: false,
  },
];

export function TwoDoors() {
  return (
    <section aria-label="Studio and Academy" className="container-page pb-28">
      <div className="flex flex-wrap gap-4">
        {doors.map((door) => (
          <Link
            key={door.href}
            href={door.href}
            className={`box-border flex min-h-90 flex-[1_1_420px] flex-col gap-5 rounded-3xl p-[clamp(28px,3vw,44px)] ${
              door.dark ? "border border-edge bg-royal text-paper" : "bg-gold text-ink"
            }`}
          >
            <span
              className={`font-mono text-[13px] tracking-[0.08em] ${door.dark ? "text-muted" : "text-ink-700"}`}
            >
              {door.label}
            </span>
            <span className="text-[clamp(32px,3.4vw,48px)] leading-[1.02] font-bold tracking-[-0.03em]">
              {door.title[0]}
              <br />
              {door.title[1]}
            </span>
            <span
              className={`max-w-110 text-[17px] leading-[1.55] ${door.dark ? "text-paper-soft" : "text-ink-800"}`}
            >
              {door.description}
            </span>
            <span className="mt-auto flex flex-wrap gap-2">
              {door.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3.5 py-1.75 text-sm ${door.dark ? "border-edge-strong" : "border-ink"}`}
                >
                  {tag}
                </span>
              ))}
            </span>
            <span
              className={`flex items-center gap-2 text-[17px] font-semibold ${door.dark ? "text-gold" : "text-ink"}`}
            >
              {door.cta}
              <Icon name="arrowRight" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
