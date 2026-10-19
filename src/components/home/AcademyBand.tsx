import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { CourseIcon } from "@/components/academy/CourseIcon";
import { courseHref, courseSummary, featuredCourseIds, getCourse } from "@/data/academy";

const reasons = [
  {
    title: "Taught by working developers",
    body: "Your trainer reviews pull requests for clients the same week they review yours.",
  },
  {
    title: "Build things that ship",
    body: "Every course ends in a project you can deploy, demo and put on your CV.",
  },
  {
    title: "A path into the studio",
    body: "Top students get a shot at internships on live Rogue Code projects. [CONFIRM]",
  },
];

export function AcademyBand() {
  const featured = featuredCourseIds.map(getCourse).filter((c) => c !== undefined);

  return (
    <section id="academy" className="bg-lilac text-ink">
      <div className="container-page py-28">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-195">
            <Eyebrow className="text-ink-400">{"// ACADEMY"}</Eyebrow>
            <h2 className="text-[clamp(36px,4.6vw,64px)] leading-[1.02] font-bold tracking-[-0.035em]">
              Learn to code inside a{" "}
              <span className="box-decoration-clone rounded-lg bg-gold px-2.5">
                working software studio.
              </span>
            </h2>
            <p className="mt-6 max-w-155 text-[19px] leading-[1.55] text-ink-600">
              Our trainers ship client projects in the same building. You learn the tools and habits
              we actually use, then put them to work on real briefs.
            </p>
          </div>
          <ButtonLink href="/academy" variant="ink" arrow>
            View all courses
          </ButtonLink>
        </div>

        <Photo
          src="/images/photos/classroom.jpeg"
          alt="A trainer helping students with their code in the Rogue Code classroom"
          sizes="(min-width: 1280px) 1184px, 100vw"
          className="mb-14 aspect-[21/9] rounded-[20px] border border-lilac-edge"
        />

        <div className="flex flex-wrap gap-5">
          {featured.map((course) => (
            <Link
              key={course.id}
              href={courseHref(course)}
              className="flex flex-[1_1_320px] flex-col gap-4 rounded-[20px] border border-lilac-edge bg-white p-8 text-ink"
            >
              <CourseIcon courseId={course.id} />
              <span className="flex flex-wrap gap-2 font-mono text-xs">
                {course.duration && (
                  <span className="rounded-md bg-ink px-2.5 py-1.25 text-paper">{course.duration.toUpperCase()}</span>
                )}
                <span className="rounded-md border border-lilac-chip px-2.5 py-1.25">{course.category.toUpperCase()}</span>
              </span>
              <span className="text-[28px] leading-[1.1] font-bold tracking-[-0.025em]">
                {course.title}
              </span>
              <span className="text-base leading-[1.6] text-ink-500">{courseSummary(course)}</span>
              <span className="mt-auto flex items-center justify-between border-t border-lilac-rule pt-5 font-semibold">
                <span>{course.modules?.length} modules</span>
                <span className="inline-flex items-center gap-1.5">
                  Course details
                  <Icon name="arrowRight" size={16} />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-[1_1_260px] items-start gap-4">
              <span className="flex-none pt-0.75 font-mono text-sm">→</span>
              <div>
                <p className="mb-1.5 text-[19px] font-semibold">{reason.title}</p>
                <p className="text-base leading-[1.55] text-ink-500">{reason.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
