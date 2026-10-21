import { CountUp } from "@/components/ui/CountUp";
import { academyFacts } from "@/data/academy";

export function Facts() {
  return (
    <section aria-label="At a glance" className="border-y border-line">
      <div className="container-page flex flex-wrap gap-x-6 gap-y-7 py-9">
        {academyFacts.map((fact) => (
          <div key={fact.label} className="flex-[1_1_200px]">
            <p className="mb-1.5 font-mono text-xs tracking-[0.08em] text-subtle">{fact.label}</p>
            <p className="text-2xl font-semibold">
              <CountUp text={fact.value} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
