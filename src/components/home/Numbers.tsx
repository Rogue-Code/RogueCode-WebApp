import { stats } from "@/data/site";

export function Numbers() {
  return (
    <section aria-label="Rogue Code in numbers" className="border-y border-line">
      <div className="container-page flex flex-wrap gap-x-6 gap-y-10 py-14">
        {stats.map((stat) => (
          <div key={stat.label} className="flex-[1_1_200px]">
            <p
              className={`text-[clamp(44px,5vw,72px)] leading-none font-bold tracking-[-0.04em] ${stat.highlight ? "text-gold" : ""}`}
            >
              {stat.value}
            </p>
            <p className="mt-2.5 text-base text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
