"use client";

import Link from "next/link";
import { useState } from "react";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { courseFilters, type Course, type CourseCategory } from "@/data/academy";

type Filter = "all" | CourseCategory;

function Tag({ children, className }: { children: React.ReactNode; className: string }) {
  return <span className={`rounded-md px-2.5 py-1.25 ${className}`}>{children}</span>;
}

function CourseCard({ course }: { course: Course }) {
  if (course.flagship) {
    return (
      <Link
        href="#curriculum"
        className="flex flex-[1_1_340px] flex-col gap-4 rounded-[20px] bg-gold p-8 text-ink"
      >
        <span className="flex flex-wrap gap-2 font-mono text-xs">
          <Tag className="bg-ink text-paper">FLAGSHIP</Tag>
          <Tag className="border border-ink">{course.level}</Tag>
        </span>
        <span className="text-[30px] leading-[1.08] font-bold tracking-[-0.025em]">{course.title}</span>
        <span className="text-base leading-[1.6] text-ink-800">{course.summary}</span>
        <span className="mt-auto flex items-center justify-between gap-3 border-t border-ink/20 pt-5 text-[15px] font-semibold">
          <span>
            {course.duration} · {course.price}
          </span>
          <span>See syllabus →</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="#demo"
      className="flex flex-[1_1_340px] flex-col gap-4 rounded-[20px] border border-edge bg-royal p-8 text-paper"
    >
      <span className="flex flex-wrap gap-2 font-mono text-xs text-paper-soft">
        <Tag className="border border-outline">{course.category.toUpperCase()}</Tag>
        <Tag className="border border-outline">{course.level}</Tag>
      </span>
      <span className="text-[30px] leading-[1.08] font-bold tracking-[-0.025em]">{course.title}</span>
      <span className="text-base leading-[1.6] text-muted">{course.summary}</span>
      <span className="mt-auto flex items-center justify-between gap-3 border-t border-edge pt-5 text-[15px] font-semibold">
        <span>
          {course.duration} · {course.price}
        </span>
        <span className="text-gold">Details →</span>
      </span>
    </Link>
  );
}

export function CourseCatalog({ courses }: { courses: Course[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = courses.filter((c) => filter === "all" || c.category === filter);

  return (
    <section id="courses" className="container-page py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>{"// COURSES"}</Eyebrow>
          <SectionTitle>Pick a track.</SectionTitle>
        </div>
        <div role="group" aria-label="Filter courses" className="flex flex-wrap gap-2">
          {courseFilters.map((f) => {
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

      <div className="flex flex-wrap gap-5">
        {visible.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}

        {/* Always shown, whatever the filter */}
        <Link
          href="#demo"
          className="flex flex-[1_1_340px] flex-col gap-4 rounded-[20px] border border-dashed border-outline p-8 text-paper"
        >
          <span className="flex flex-wrap gap-2 font-mono text-xs text-paper-soft">
            <Tag className="border border-outline">FOR SCHOOLS &amp; COLLEGES</Tag>
          </span>
          <span className="text-[30px] leading-[1.08] font-bold tracking-[-0.025em]">
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
