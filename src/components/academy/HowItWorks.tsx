import { SectionTitle } from "@/components/ui/Eyebrow";
import { academySteps } from "@/data/academy";

export function HowItWorks() {
  return (
    <section className="border-t border-line">
      <div className="container-page py-28">
        <SectionTitle className="mb-12">How it works</SectionTitle>
        <div className="flex flex-wrap gap-8">
          {academySteps.map((step, i) => (
            <div
              key={step.title}
              className={`flex-[1_1_240px] border-t-2 pt-6 ${i === 0 ? "border-gold" : "border-outline"}`}
            >
              <p className={`mb-3.5 font-mono text-[15px] ${i === 0 ? "text-gold" : "text-paper-soft"}`}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2.5 text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="text-base leading-[1.6] text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
