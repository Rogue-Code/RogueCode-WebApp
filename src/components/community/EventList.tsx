"use client";

import { useState } from "react";
import { eventTypes, type EventItem, type EventType } from "@/data/community";
import { EventRow } from "./EventRow";
import { FilterChips } from "./FilterChips";

export function EventList({ events }: { events: EventItem[] }) {
  const [type, setType] = useState<"all" | EventType>("all");
  const visible = events.filter((e) => type === "all" || e.type === type);

  return (
    <>
      <div className="mb-10">
        <FilterChips label="Filter events" options={eventTypes} value={type} onChange={setType} />
      </div>
      {visible.length ? (
        <div className="flex flex-col">
          {visible.map((event) => (
            <EventRow key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <p className="rounded-[20px] border border-dashed border-outline px-8 py-16 text-center text-lg text-paper-soft">
          No events of this type scheduled right now. Check back soon.
        </p>
      )}
    </>
  );
}
