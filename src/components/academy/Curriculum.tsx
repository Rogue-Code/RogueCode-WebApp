import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { flagshipSyllabus } from "@/data/academy";

export function Curriculum() {
  return (
    <section id="curriculum" className="bg-lilac text-ink">
      <div className="container-page flex flex-wrap gap-16 py-28">
        <div className="flex-[1_1_380px]">
          <Eyebrow className="text-ink-400">{"// FLAGSHIP SYLLABUS"}</Eyebrow>
          <h2 className="text-[clamp(36px,4.2vw,56px)] leading-[1.02] font-bold tracking-[-0.035em]">
            Inside Full-Stack Web Development
          </h2>
          <p className="mt-6 text-lg leading-[1.6] text-ink-600">
            Six modules, from your first web page to a full application running on the internet.
            Every module ends with something you&apos;ve built.
          </p>
          <div className="mt-8 flex flex-col border-t border-lilac-line">
            {flagshipSyllabus.facts.map((fact) => (
              <p
                key={fact.label}
                className="flex justify-between border-b border-lilac-line py-3.5 text-base"
              >
                <span className="text-ink-400">{fact.label}</span>
                <span className="font-semibold">{fact.value}</span>
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#demo" variant="ink" className="text-base!">
              Enroll now
            </ButtonLink>
            <ButtonLink href="#curriculum" variant="outlineInk" className="gap-2! text-base!">
              <Icon name="download" />
              Download syllabus
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-[1.3_1_460px] flex-col gap-2.5">
          {flagshipSyllabus.modules.map((mod, i) => {
            const dark = "highlight" in mod && mod.highlight;
            return (
              <details
                key={mod.title}
                open={i === 0}
                className={`rounded-2xl border ${dark ? "border-ink bg-ink text-paper" : "border-lilac-edge bg-white"}`}
              >
                <summary className="flex min-h-11 items-center gap-5 px-6 py-5.5">
                  <span className={`font-mono text-[13px] ${dark ? "text-gold" : "text-ink-400"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-auto text-xl font-semibold">{mod.title}</span>
                  <span className={`font-mono text-xs ${dark ? "text-muted" : "text-ink-400"}`}>
                    {mod.weeks}
                  </span>
                </summary>
                <p
                  className={`pr-6 pb-6 pl-16.5 text-base leading-[1.6] ${dark ? "text-paper-soft" : "text-ink-500"}`}
                >
                  {mod.description}
                </p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
