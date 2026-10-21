/**
 * Time slots offered for the free demo class. Students pick up to `maxPicks` preferred slots
 * and the team calls to confirm one. [CONFIRM the real days and times.]
 */
export const demoSlots = {
  /** How many days ahead students can pick from, starting tomorrow. */
  daysAhead: 10,
  /** Days with no demo classes: 0 = Sunday … 6 = Saturday. */
  closedWeekdays: [] as number[],
  /** 24-hour start times, India time. */
  times: ["10:00", "12:00", "16:00", "18:00", "20:00"],
  maxPicks: 3,
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Splits a slot id ("2026-10-27T18:00") into its date parts, or undefined if malformed. */
export function parseSlot(slot: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(slot);
  if (!m) return undefined;
  const [year, month, day, hour, minute] = m.slice(1).map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return { year, month, day, hour, minute, weekday };
}

/** "2026-10-27T18:00" → "Tue 27 Oct, 6:00 PM" */
export function formatSlot(slot: string) {
  const p = parseSlot(slot);
  if (!p) return slot;
  return `${weekdays[p.weekday]} ${p.day} ${months[p.month - 1]}, ${formatTime(`${p.hour}:${p.minute}`)}`;
}

/** "18:00" → "6:00 PM" */
export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

export const slotWeekday = (weekday: number) => weekdays[weekday];
export const slotMonth = (month: number) => months[month - 1];
