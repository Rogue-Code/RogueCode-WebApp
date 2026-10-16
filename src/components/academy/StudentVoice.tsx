export function StudentVoice() {
  return (
    <section aria-label="Student story" className="border-y border-line">
      <div className="container-page flex flex-wrap items-center gap-12 py-24">
        <figure className="flex-[3_1_560px]">
          <blockquote className="text-[clamp(28px,3.2vw,44px)] leading-[1.2] font-medium tracking-[-0.025em]">
            “[A student quote about what they built, what they learned, and where it took them.]”
          </blockquote>
          <figcaption className="mt-7 text-[17px] text-muted">
            <span className="font-semibold text-paper">[Student name]</span> · [Course, batch] →
            [Current role, Company]
          </figcaption>
        </figure>
        <div className="flex flex-[1_1_260px] flex-col gap-6">
          <div>
            <p className="text-[56px] leading-none font-bold tracking-[-0.04em] text-gold">[00]+</p>
            <p className="mt-2 text-muted">Students trained</p>
          </div>
          <div>
            <p className="text-[56px] leading-none font-bold tracking-[-0.04em]">[00]%</p>
            <p className="mt-2 text-muted">[Outcome you can verify, e.g. completion rate]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
