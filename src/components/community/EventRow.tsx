import Link from "next/link";
import type { EventItem } from "@/data/community";

export function EventRow({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="flex items-center gap-5 border-t border-edge py-5 text-paper last:border-b hover:text-paper"
    >
      <span className="w-18 flex-none text-center font-mono">
        <span className="block text-[26px] font-medium text-gold">{event.day}</span>
        <span className="block text-xs text-muted">{event.month}</span>
      </span>
      <span className="flex-auto">
        <span className="block text-[19px] font-semibold">{event.title}</span>
        <span className="mt-1 block text-sm text-muted">
          <span className="capitalize">{event.type}</span> · {event.venue} · {event.fee}
        </span>
      </span>
      <span className="flex-none rounded-full border border-outline px-4 py-2.25 text-sm font-medium">
        Register
      </span>
    </Link>
  );
}
