import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseIcon } from "@/components/academy/CourseIcon";
import { DemoCta } from "@/components/academy/DemoCta";
import { SyllabusList } from "@/components/academy/SyllabusList";
import { courseHref, courses, courseSummary, getCourse } from "@/data/academy";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/academy/courses/[slug]">): Promise<Metadata> {
  const course = getCourse((await params).slug);
  return course
    ? { title: `${course.title} — Rogue Academy`, description: courseSummary(course) }
    : { title: "Course not found" };
}

export default async function CoursePage({ params }: PageProps<"/academy/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  const modules = course.modules ?? [];
  const related = courses.filter((c) => c.category === course.category && c.id !== course.id);
  const facts = [
    { label: "DURATION", value: course.duration ?? "[Ask us]" },
    { label: "PREREQUISITES", value: course.prerequisites ?? "[Ask us]" },
    { label: "SYLLABUS", value: modules.length ? `${modules.length} modules` : "On request" },
    { label: "FEE", value: "On enquiry" },
  ];

  return (
    <>
      <section className="container-page pt-14 pb-20">
        <Link href="/academy#courses" className="font-mono text-[13px] text-muted">
          ← All courses
        </Link>
        <div className="mt-10 flex items-center gap-4">
          <CourseIcon courseId={course.id} className="size-14" />
          <p className="font-mono text-xs tracking-[0.08em] text-gold uppercase">{course.category}</p>
        </div>
        <h1 className="mt-5 max-w-250 text-[clamp(40px,5.4vw,80px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
          {course.title}
        </h1>
        <p className="mt-6 max-w-170 text-xl leading-normal text-paper-soft">{courseSummary(course)}</p>
        <dl className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-px overflow-hidden rounded-[20px] border border-edge bg-edge">
          {facts.map((f) => (
            <div key={f.label} className="bg-ink p-6">
              <dt className="font-mono text-xs tracking-[0.08em] text-subtle">{f.label}</dt>
              <dd className="mt-2 text-lg font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-line">
        <div className="container-page flex flex-wrap items-start gap-12 py-20">
          <div className="flex-[1_1_280px]">
            <h2 className="text-[clamp(30px,3vw,42px)] font-bold tracking-[-0.03em]">Syllabus</h2>
            <p className="mt-4 max-w-90 text-base leading-[1.6] text-muted">
              {modules.length
                ? "Every module is taught live, with practice problems and assignments between classes."
                : "We're finalising the written syllabus for this course. Book a free demo class and the trainer will walk you through what's covered."}
            </p>
          </div>
          <div className="flex-[2_1_520px]">
            {modules.length > 0 && <SyllabusList modules={modules} openFirst />}
          </div>
        </div>
      </section>

      <DemoCta courseTitles={courses.map((c) => c.title)} defaultCourse={course.title} />

      {related.length > 0 && (
        <section className="container-page pb-28">
          <h2 className="mb-6 text-[clamp(26px,2.6vw,34px)] font-bold tracking-[-0.03em]">
            More in {course.category}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {related.map((c) => (
              <Link
                key={c.id}
                href={courseHref(c)}
                className="rounded-full border border-outline px-4.5 py-2.5 text-[15px] font-medium"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
