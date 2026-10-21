import { DemoForm } from "./DemoForm";

export function DemoCta({ courseTitles, defaultCourse }: { courseTitles: string[]; defaultCourse?: string }) {
  return (
    <section id="demo" className="container-page pb-28">
      <div className="flex flex-wrap items-start gap-12 rounded-[28px] bg-gold p-[clamp(32px,5vw,64px)] text-ink">
        <div className="flex-[1_1_380px]">
          <h2 className="text-[clamp(36px,4.6vw,64px)] leading-[0.98] font-extrabold tracking-[-0.04em]">
            Not sure where to start?
          </h2>
          <p className="mt-5 max-w-115 text-[19px] leading-normal text-ink-800">
            Book a free demo class. Pick a few times that suit you and we&apos;ll call you back to
            confirm one, answer your questions and suggest a track.
          </p>
        </div>
        <div className="min-w-0 flex-[1_1_420px]">
          <DemoForm courseTitles={courseTitles} defaultCourse={defaultCourse} />
        </div>
      </div>
    </section>
  );
}
