import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { processSteps, services } from "@/data/studio";

export function Studio() {
  return (
    <section id="studio" className="border-t border-line">
      <div className="container-page py-28">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-190">
            <Eyebrow>{"// TECH SOLUTIONS"}</Eyebrow>
            <SectionTitle>Software for businesses that need it to actually work.</SectionTitle>
          </div>
          <ArrowLink href="#contact">Talk to us about your project</ArrowLink>
        </div>

        <div className="flex flex-wrap gap-px overflow-hidden rounded-[20px] border border-edge bg-edge">
          {services.map((service) => (
            <div key={service.title} className="flex flex-[1_1_280px] flex-col gap-4 bg-ink px-8 py-9">
              <Icon name={service.icon} size={32} strokeWidth={1.6} className="text-gold" />
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">{service.title}</h3>
              <p className="text-base leading-[1.6] text-muted">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="mb-8 text-[clamp(26px,2.4vw,34px)] font-semibold tracking-[-0.02em]">
            How a project runs
          </h3>
          <div className="flex flex-wrap gap-8">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className={`flex-[1_1_300px] border-t-2 pt-6 ${i === 0 ? "border-gold" : "border-outline"}`}
              >
                <p className={`mb-3.5 font-mono text-[15px] ${i === 0 ? "text-gold" : "text-paper"}`}>
                  {step.step}&nbsp; {step.name}
                </p>
                <p className="text-[17px] leading-[1.6] text-paper-soft">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
