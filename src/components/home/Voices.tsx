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
              <span
                aria-hidden="true"
                className="flex size-12 flex-none items-center justify-center rounded-full border border-edge text-lg font-semibold text-gold"
              >
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block font-semibold">{t.name}</span>
                {t.href ? (
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-muted underline underline-offset-4"
                  >
                    {t.detail}
                  </a>
                ) : (
                  <span className="block text-sm text-muted">{t.detail}</span>
                )}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
