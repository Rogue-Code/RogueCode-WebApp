import { CountUp } from "@/components/ui/CountUp";
import { academyFacts } from "@/data/academy";

export function Facts() {
  return (
    <section aria-label="At a glance" className="bg-lilac text-ink">
      <div className="container-page flex flex-wrap gap-x-6 gap-y-7 py-9">
        {academyFacts.map((fact) => (
          <div key={fact.label} className="flex-[1_1_200px]">
            <p className="mb-1.5 font-mono text-xs tracking-[0.08em] text-ink-400">{fact.label}</p>
            <p className="text-2xl font-semibold">
              {/* Gold text is too faint on the light band, so the counting number gets a gold highlight */}
              <CountUp text={fact.value} numberClassName="shadow-[inset_0_-0.4em_0_var(--color-gold)]" />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
