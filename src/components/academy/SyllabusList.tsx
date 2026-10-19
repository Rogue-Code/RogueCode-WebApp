import Link from "next/link";
import { courseHref, type CourseModule } from "@/data/academy";

const tones = {
  light: {
    row: "border-lilac-edge bg-white text-ink",
    number: "text-ink-400",
    meta: "text-ink-400",
    topics: "text-ink-500",
  },
  dark: {
    row: "border-edge bg-royal text-paper",
    number: "text-gold",
    meta: "text-subtle",
    topics: "text-paper-soft",
  },
};

/**
 * Numbered module list. Modules with topics expand to show them, and modules that point at
 * another course link to its page.
 */
export function SyllabusList({
  modules,
  tone = "dark",
  openFirst = false,
}: {
  modules: CourseModule[];
  tone?: keyof typeof tones;
  openFirst?: boolean;
}) {
  const t = tones[tone];
  const rowClasses = `flex min-h-11 items-center gap-5 px-6 py-4.5`;

  return (
    <ol className="flex flex-col gap-2.5">
      {modules.map((mod, i) => {
        const number = (
          <span className={`w-6 flex-none font-mono text-[13px] ${t.number}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
        );
        const title = <span className="flex-auto text-lg leading-snug font-semibold">{mod.title}</span>;

        return (
          <li key={mod.title} className={`rounded-2xl border ${t.row}`}>
            {mod.topics?.length ? (
              <details open={openFirst && i === 0}>
                <summary className={rowClasses}>
                  {number}
                  {title}
                  <span className={`flex-none font-mono text-xs ${t.meta}`}>
                    {mod.topics.length} topics +
                  </span>
                </summary>
                <ul className={`flex flex-col gap-2 pr-6 pb-6 pl-17 text-base leading-normal ${t.topics}`}>
                  {mod.topics.map((topic) => (
                    <li key={topic} className="list-disc">
                      {topic}
                    </li>
                  ))}
                </ul>
              </details>
            ) : mod.courseId ? (
              <Link href={courseHref({ id: mod.courseId })} className={rowClasses}>
                {number}
                {title}
                <span className={`flex-none font-mono text-xs ${t.meta}`}>View course →</span>
              </Link>
            ) : (
              <div className={rowClasses}>
                {number}
                {title}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
