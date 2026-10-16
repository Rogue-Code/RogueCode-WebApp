import type { Metadata } from "next";
import { EventList } from "@/components/community/EventList";
import { getEvents } from "@/lib/data/community";

export const metadata: Metadata = {
  title: "Events — Rogue Code",
  description: "Workshops, bootcamps, webinars, hackathons and free demo classes from Rogue Code.",
};

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <section className="container-page pt-[clamp(48px,7vw,96px)] pb-28">
      <p className="mb-4 font-mono text-[13px] tracking-[0.08em] text-gold">{"// EVENTS"}</p>
      <h1 className="max-w-220 text-[clamp(44px,6.4vw,96px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
        Come build <span className="text-gold">with us.</span>
      </h1>
      <p className="mt-6 mb-14 max-w-140 text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-paper-soft">
        Workshops, bootcamps, webinars and hackathons — online and at the studio in Borivali.
      </p>
      <EventList events={events} />
    </section>
  );
}
