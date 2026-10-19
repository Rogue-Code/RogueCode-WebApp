import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { courseHref, courseSummary, flagshipCourseId, getCourse } from "@/data/academy";
import { SyllabusList } from "./SyllabusList";

export function Curriculum() {
  const course = getCourse(flagshipCourseId);
  if (!course) return null;

  const facts = [
    { label: "Duration", value: course.duration },
    { label: "Prerequisites", value: course.prerequisites },
    { label: "Fee", value: "On enquiry" },
  ].filter((f) => f.value);

  return (
    <section id="curriculum" className="bg-lilac text-ink">
      <div className="container-page flex flex-wrap items-start gap-16 py-28">
        <div className="flex-[1_1_380px] lg:sticky lg:top-28">
          <Eyebrow className="text-ink-400">{"// FLAGSHIP SYLLABUS"}</Eyebrow>
          <h2 className="text-[clamp(36px,4.2vw,56px)] leading-[1.02] font-bold tracking-[-0.035em]">
            Inside {course.title}
          </h2>
          <p className="mt-6 text-lg leading-[1.6] text-ink-600">
            {courseSummary(course)} {course.modules?.length} modules, from your first web page to a
            dynamic, database-backed website.
          </p>
          <dl className="mt-8 flex flex-col border-t border-lilac-line">
            {facts.map((fact) => (
              <div key={fact.label} className="flex justify-between gap-6 border-b border-lilac-line py-3.5 text-base">
                <dt className="text-ink-400">{fact.label}</dt>
                <dd className="text-right font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#demo" variant="ink" className="text-base!">
              Enroll now
            </ButtonLink>
            <ButtonLink href={courseHref(course)} variant="outlineInk" className="text-base!">
              Course page
            </ButtonLink>
          </div>
        </div>

        <div className="flex-[1.3_1_460px]">
          <SyllabusList modules={course.modules ?? []} tone="light" />
        </div>
      </div>
    </section>
  );
}
