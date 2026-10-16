import { testimonials } from "@/data/studio";

export function Voices() {
  return (
    <section aria-label="What people say" className="container-page py-28">
      <div className="flex flex-wrap gap-6">
        {testimonials.map((t) => (
          <figure
            key={t.kind}
            className="flex flex-[1_1_420px] flex-col gap-8 rounded-3xl border border-edge p-10"
          >
            <span className="font-mono text-xs tracking-[0.08em] text-gold">{t.kind}</span>
            <blockquote className="text-[clamp(22px,2.1vw,28px)] leading-[1.35] font-medium tracking-[-0.015em]">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3.5">
              <span className="placeholder-stripes size-12 rounded-full border border-edge" />
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-sm text-muted">{t.detail}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
