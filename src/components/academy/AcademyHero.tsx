import { ButtonLink } from "@/components/ui/Button";

const steps = ["pick a track", "learn live, in small batches", "build a real project at the studio"];

export function AcademyHero() {
  return (
    <section className="container-page flex flex-wrap items-center gap-14 pt-[clamp(56px,8vw,104px)] pb-18">
      <div className="flex-[3_1_520px]">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-edge-strong px-3.5 py-2 font-mono text-[13px] text-paper-soft">
          <span aria-hidden="true" className="size-2 rounded-full bg-gold" />
          Next batch starts [DATE] · [00] seats
        </p>
        <h1 className="mt-7 text-[clamp(48px,7.4vw,112px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
          Learn to code from people who <span className="text-gold">ship code.</span>
        </h1>
        <p className="mt-8 max-w-140 text-[clamp(18px,1.6vw,21px)] leading-[1.55] text-paper-soft">
          Rogue Code Academy is the training side of Rogue Code. Small batches, live classes and real
          projects, taught by the same developers who build software for our clients.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#demo" arrow>
            Book a free demo class
          </ButtonLink>
          <ButtonLink href="#courses" variant="outline">
            Browse courses
          </ButtonLink>
        </div>
      </div>

      <div
        role="img"
        aria-label="Terminal showing the academy path: pick a track, learn live, build a real project, graduate with a portfolio"
        className="flex-[2_1_380px] overflow-hidden rounded-[20px] border border-edge bg-royal font-mono"
      >
        <div className="flex items-center gap-2 border-b border-edge px-4.5 py-3.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.75 rounded-full bg-outline" />
          ))}
          <span className="ml-2.5 text-xs text-subtle">~/rogue-academy</span>
        </div>
        <div className="flex flex-col gap-3.5 px-6 pt-7 pb-8 text-[15px] leading-normal">
          <p>
            <span className="text-gold">$</span> rogue academy --enroll
          </p>
          {steps.map((step) => (
            <p key={step} className="text-paper-soft">
              <span className="text-gold">✓</span> {step}
            </p>
          ))}
          <p>
            <span className="text-gold">→</span> graduate with a portfolio
            <span
              aria-hidden="true"
              className="ml-1.5 inline-block h-4.5 w-2.25 bg-gold align-[-3px]"
            />
          </p>
          <p className="mt-2.5 text-xs text-subtle">compiled in [DURATION] · 0 errors</p>
        </div>
      </div>
    </section>
  );
}
