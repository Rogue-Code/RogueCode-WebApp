"use client";

import Link from "next/link";
import { useState } from "react";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { CourseIcon } from "./CourseIcon";
import { courseHref, courseSummary, flagshipCourseId, type Course } from "@/data/academy";

function Tag({ children, className }: { children: React.ReactNode; className: string }) {
  return <span className={`rounded-md px-2.5 py-1.25 ${className}`}>{children}</span>;
}

function moduleCount(course: Course) {
  const n = course.modules?.length ?? 0;
  return n ? `${n} module${n === 1 ? "" : "s"}` : "Syllabus on request";
}

function CourseCard({ course }: { course: Course }) {
  if (course.id === flagshipCourseId) {
    return (
      <Link
        href={courseHref(course)}
        className="flex flex-col gap-4 rounded-[20px] bg-gold p-7 text-ink hover:text-ink"
      >
        <span className="flex items-start justify-between gap-4">
          <CourseIcon courseId={course.id} plain />
          <span className="flex flex-wrap justify-end gap-2 font-mono text-xs">
            <Tag className="bg-ink text-paper">FLAGSHIP</Tag>
            {course.duration && <Tag className="border border-ink">{course.duration.toUpperCase()}</Tag>}
          </span>
        </span>
        <span className="text-[26px] leading-[1.1] font-bold tracking-[-0.025em]">{course.title}</span>
        <span className="text-base leading-[1.6] text-ink-800">{courseSummary(course)}</span>
        <span className="mt-auto flex items-center justify-between gap-3 border-t border-ink/20 pt-5 text-[15px] font-semibold">
          <span>{moduleCount(course)}</span>
          <span>See syllabus →</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={courseHref(course)}
      className="group flex flex-col gap-4 rounded-[20px] border border-edge bg-royal p-7 text-paper transition-colors hover:border-gold hover:text-paper"
    >
      <span className="flex items-start justify-between gap-4">
        <CourseIcon courseId={course.id} />
        <span className="flex flex-wrap justify-end gap-2 font-mono text-xs text-paper-soft">
          <Tag className="border border-outline">{course.category.toUpperCase()}</Tag>
          {course.duration && <Tag className="border border-outline">{course.duration.toUpperCase()}</Tag>}
        </span>
      </span>
      <span className="text-[26px] leading-[1.1] font-bold tracking-[-0.025em]">{course.title}</span>
      <span className="line-clamp-3 text-base leading-[1.6] text-muted">{courseSummary(course)}</span>
      <span className="mt-auto flex items-center justify-between gap-3 border-t border-edge pt-5 text-[15px] font-semibold">
        <span className="text-paper-soft">{moduleCount(course)}</span>
        <span className="text-gold">Details →</span>
      </span>
    </Link>
  );
}

// Everything a visitor might type: title, category, description and every module and topic
function searchText(course: Course) {
  return [
    course.title,
    course.category,
    course.description,
    ...(course.modules ?? []).flatMap((m) => [m.title, ...(m.topics ?? [])]),
  ]
    .join(" ")
    .toLowerCase();
}

export function CourseCatalog({ courses, categories }: { courses: Course[]; categories: string[] }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const words = query.toLowerCase().split(/s+/).filter(Boolean);
  const visible = courses.filter(
    (c) =>
      (filter === "all" || c.category === filter) &&
      words.every((w) => searchText(c).includes(w)),
  );
  const filters = [{ value: "all", label: "All" }, ...categories.map((c) => ({ value: c, label: c }))];

  return (
    <section id="courses" className="container-page py-28">
      <div className="mb-10 flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{"// COURSES"}</Eyebrow>
            <SectionTitle>Pick a track.</SectionTitle>
          </div>
          <label className="relative flex w-full max-w-105 items-center">
            <span className="sr-only">Search courses</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4.5 size-5 fill-none stroke-muted stroke-2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, e.g. React, SQL, DSA"
              className="min-h-13 w-full rounded-full border border-outline bg-royal pr-5 pl-12 text-base text-paper placeholder:text-subtle focus:border-paper focus:outline-none"
            />
          </label>
        </div>
        <div role="group" aria-label="Filter courses" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = f.value === filter;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.value)}
                className={`min-h-11 cursor-pointer rounded-full border px-4.5 text-[15px] ${
                  on ? "border-paper bg-paper font-semibold text-ink" : "border-outline text-paper"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
        {visible.length === 0 && (
          <p className="col-span-full rounded-[20px] border border-edge p-7 text-base text-muted">
            No courses match &ldquo;{query}&rdquo;
            {filter !== "all" && <> in {filter}</>}. Try another word, or book a demo class and
            we&apos;ll help you choose.
          </p>
        )}
        {visible.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        {/* Always shown, whatever the filter */}
        <Link
          href="#demo"
          className="flex flex-col gap-4 rounded-[20px] border border-dashed border-outline p-7 text-paper"
        >
          <span className="flex flex-wrap gap-2 font-mono text-xs text-paper-soft">
            <Tag className="border border-outline">FOR SCHOOLS &amp; COLLEGES</Tag>
          </span>
          <span className="text-[26px] leading-[1.1] font-bold tracking-[-0.025em]">
            Workshops &amp; internships
          </span>
          <span className="text-base leading-[1.6] text-muted">
            [Short line on campus workshops, short-term training or internship programmes, if you
            run them.]
          </span>
          <span className="mt-auto flex items-center justify-between gap-3 border-t border-edge pt-5 text-[15px] font-semibold">
            <span>Custom</span>
            <span className="text-gold">Enquire →</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
