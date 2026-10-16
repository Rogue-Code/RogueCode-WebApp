import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="top" className="container-page pt-[clamp(56px,9vw,112px)] pb-14">
      <p className="flex flex-wrap items-center gap-2.5 font-mono text-[15px] text-muted">
        <span className="text-gold">~/rogue-code $</span>
        <span>run --studio --academy</span>
        <span aria-hidden="true" className="inline-block h-5 w-2.5 bg-gold" />
      </p>
      <h1 className="mt-7 text-[clamp(56px,10.5vw,156px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
        We code.
        <br />
        We compile.
        <br />
        <span className="text-gold">We run.</span>
      </h1>
      <div className="mt-14 flex flex-wrap items-end justify-between gap-8">
        <p className="max-w-145 text-[clamp(18px,1.6vw,22px)] leading-normal text-paper-soft">
          Rogue Code is a software studio and a coding academy under one roof. We build web and
          mobile products for businesses, and we train the developers who&apos;ll build the next
          ones.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#studio" arrow>
            I need software built
          </ButtonLink>
          <ButtonLink href="/academy" variant="outline">
            I want to learn to code
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
