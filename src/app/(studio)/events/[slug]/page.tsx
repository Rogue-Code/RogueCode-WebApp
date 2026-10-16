import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventRegistration } from "@/components/community/EventRegistration";
import { getEvent, getEvents } from "@/lib/data/community";

export async function generateStaticParams() {
  return (await getEvents()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const event = await getEvent((await params).slug);
  return event ? { title: `${event.title} — Rogue Code Events`, description: event.summary } : { title: "Event not found" };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const event = await getEvent((await params).slug);
  if (!event) notFound();

  const facts = [
    { label: "WHEN", value: `${event.day} ${event.month} · ${event.time}` },
    { label: "WHERE", value: event.venue },
    { label: "ENTRY", value: event.fee },
    { label: "REGISTER BY", value: event.registrationCloses },
  ];

  return (
    <section className="container-page pt-14 pb-28">
      <Link href="/events" className="font-mono text-[13px] text-muted">
        ← All events
      </Link>
      <div className="mt-10 flex flex-wrap items-start gap-12">
        <div className="flex-[2_1_520px]">
          <p className="font-mono text-xs tracking-[0.08em] text-gold uppercase">{event.type}</p>
          <h1 className="mt-5 text-[clamp(40px,5.4vw,80px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            {event.title}
          </h1>
          <p className="mt-6 max-w-150 text-xl leading-normal text-paper-soft">{event.summary}</p>
          <dl className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-px overflow-hidden rounded-[20px] border border-edge bg-edge">
            {facts.map((f) => (
              <div key={f.label} className="bg-ink p-6">
                <dt className="font-mono text-xs tracking-[0.08em] text-subtle">{f.label}</dt>
                <dd className="mt-2 text-lg font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex max-w-170 flex-col gap-5 text-lg leading-[1.7] text-paper-soft">
            {event.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="sticky top-28 flex-[1_1_340px]">
          <EventRegistration eventSlug={event.slug} />
        </div>
      </div>
    </section>
  );
}
