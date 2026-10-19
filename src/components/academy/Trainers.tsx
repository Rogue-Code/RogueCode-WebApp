import { SectionTitle } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
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
            <Photo
              src={trainer.photo}
              alt={trainer.name}
              sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
              label="[PHOTO]"
              className="aspect-[4/5] rounded-[20px] border border-edge"
            />
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
