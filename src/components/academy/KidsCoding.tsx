import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { courseHref, getCourse, kidsFacts, kidsTracks } from "@/data/academy";

export function KidsCoding() {
  const boardCourse = getCourse("school-academic");

  return (
    <section id="kids" className="border-t border-line">
      <div className="container-page py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-190">
            <Eyebrow>{"// FOR SCHOOL KIDS"}</Eyebrow>
            <SectionTitle>Coding for school kids.</SectionTitle>
            <p className="mt-6 max-w-150 text-[19px] leading-[1.55] text-paper-soft">
              Fun, project-based classes that get children building games, apps and websites while
              they learn to think like programmers. [CONFIRM]
            </p>
          </div>
          <ButtonLink href="#demo" arrow>
            Book a free trial class
          </ButtonLink>
        </div>

        <div className="flex flex-wrap gap-5">
          {kidsTracks.map((track) => (
            <div
              key={track.title}
              className="flex flex-[1_1_300px] flex-col gap-4 rounded-[20px] border border-edge bg-royal p-7"
            >
              <span className="self-start rounded-md bg-gold px-2.5 py-1.25 font-mono text-xs text-ink">
                {track.ages}
              </span>
              <h3 className="text-[26px] leading-[1.1] font-bold tracking-[-0.025em]">{track.title}</h3>
              <p className="text-base leading-[1.6] text-muted">{track.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-start justify-between gap-x-12 gap-y-8 border-t border-edge pt-8">
          <dl className="flex flex-[2_1_480px] flex-wrap gap-x-10 gap-y-5">
            {kidsFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="mb-1 font-mono text-xs tracking-[0.08em] text-subtle">{fact.label}</dt>
                <dd className="text-lg font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
          {boardCourse && (
            <p className="flex-[1_1_300px] text-base leading-[1.6] text-muted">
              In Grade 11 or 12?{" "}
              <Link href={courseHref(boardCourse)} className="font-semibold text-paper underline underline-offset-4">
                See our board-exam Computer Science &amp; IT coaching
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
