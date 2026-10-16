import { SectionTitle } from "@/components/ui/Eyebrow";
import { trainers } from "@/data/academy";

export function Trainers() {
  return (
    <section className="container-page py-28">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionTitle>Your trainers</SectionTitle>
        <p className="max-w-110 text-[17px] leading-[1.55] text-muted">
          Every trainer also works on Rogue Code&apos;s client projects. You learn what&apos;s used
          in production this year.
        </p>
      </div>
      <div className="flex flex-wrap gap-5">
        {trainers.map((trainer) => (
          <figure key={trainer.id} className="flex flex-[1_1_260px] flex-col gap-4">
            <div className="placeholder-stripes flex aspect-[4/5] items-center justify-center rounded-[20px] border border-edge font-mono text-[13px] text-subtle">
              [PHOTO]
            </div>
            <figcaption>
              <span className="block text-[22px] font-semibold">{trainer.name}</span>
              <span className="mt-1 block text-[15px] text-muted">
                {trainer.role} · teaches {trainer.course}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
