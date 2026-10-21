"use client";

import { useActionState, useMemo, useState, useSyncExternalStore } from "react";
import { FieldError, SentDialog, useFormChecks } from "@/components/ui/FormFeedback";
import { demoSlots, formatSlot, formatTime, slotMonth, slotWeekday } from "@/data/demoSlots";
import { bookDemo, type FormState } from "@/lib/actions/forms";

const fieldClasses =
  "box-border min-h-13 rounded-xl border border-ink bg-white text-base text-ink";

const noop = () => () => {};

/** Today's date, read only in the browser so the day list matches the visitor's clock. */
function useToday() {
  return useSyncExternalStore(
    noop,
    () => new Date().toDateString(),
    () => null,
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

type Day = { key: string; weekday: string; day: number; month: string; date: Date };

function upcomingDays(today: string): Day[] {
  const days: Day[] = [];
  const base = new Date(today);
  for (let i = 1; days.length < demoSlots.daysAhead && i <= 60; i++) {
    const date = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i);
    if (demoSlots.closedWeekdays.includes(date.getDay())) continue;
    days.push({
      key: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      weekday: slotWeekday(date.getDay()),
      day: date.getDate(),
      month: slotMonth(date.getMonth() + 1),
      date,
    });
  }
  return days;
}

function SlotPicker({
  picks,
  onChange,
  error,
}: {
  picks: string[];
  onChange: (picks: string[]) => void;
  error?: string;
}) {
  const today = useToday();
  const days = useMemo(() => (today ? upcomingDays(today) : []), [today]);
  const [chosenDay, setChosenDay] = useState<string>();
  const day = days.find((d) => d.key === chosenDay) ?? days[0];
  const full = picks.length >= demoSlots.maxPicks;

  function toggle(slot: string) {
    onChange(picks.includes(slot) ? picks.filter((p) => p !== slot) : full ? picks : [...picks, slot]);
  }

  return (
    <fieldset className="flex min-w-0 flex-col gap-3">
      <legend className="mb-1.5 text-sm font-medium">
        Preferred times{" "}
        <span className="font-normal text-ink-600">
          (pick up to {demoSlots.maxPicks}, {picks.length}/{demoSlots.maxPicks} chosen)
        </span>
      </legend>

      {!today ? (
        <p className="text-sm text-ink-600">Loading available days…</p>
      ) : (
        <>
          <div role="tablist" aria-label="Day" className="-mx-1 flex gap-2 overflow-x-auto px-1 pt-2 pb-1.5 [scrollbar-color:rgb(11_12_16/0.35)_transparent] [scrollbar-width:thin]">
            {days.map((d) => {
              const on = d.key === day?.key;
              const count = picks.filter((p) => p.startsWith(d.key)).length;
              return (
                <button
                  key={d.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setChosenDay(d.key)}
                  className={`relative flex w-15 shrink-0 cursor-pointer flex-col items-center rounded-xl border py-2 leading-tight ${
                    on ? "border-ink bg-ink text-paper" : "border-ink/25 bg-white/50 text-ink"
                  }`}
                >
                  <span className="font-mono text-[11px] uppercase">{d.weekday}</span>
                  <span className="text-xl font-bold">{d.day}</span>
                  <span className="text-xs">{d.month}</span>
                  {count > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-red-700 text-[11px] font-bold text-white">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {day && (
            <div role="tabpanel" className="flex flex-wrap gap-2">
              {demoSlots.times.map((time) => {
                const slot = `${day.key}T${time}`;
                const on = picks.includes(slot);
                return (
                  <button
                    key={time}
                    type="button"
                    aria-pressed={on}
                    disabled={!on && full}
                    onClick={() => toggle(slot)}
                    className={`min-h-10 cursor-pointer rounded-full border px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${
                      on ? "border-ink bg-ink text-paper" : "border-ink/30 bg-white/60 text-ink"
                    }`}
                  >
                    {on ? "✓ " : ""}
                    {formatTime(time)}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {picks.length > 0 && (
        <ol className="flex flex-wrap gap-2">
          {picks.map((slot, i) => (
            <li
              key={slot}
              className="inline-flex items-center gap-2 rounded-lg bg-ink/10 py-1 pr-1 pl-3 text-sm font-medium"
            >
              <span className="font-mono text-xs text-ink-600">#{i + 1}</span>
              {formatSlot(slot)}
              <button
                type="button"
                aria-label={`Remove ${formatSlot(slot)}`}
                onClick={() => toggle(slot)}
                className="flex size-6 cursor-pointer items-center justify-center rounded-md hover:bg-ink/15"
              >
                ×
              </button>
            </li>
          ))}
        </ol>
      )}
      {full && <p className="text-xs text-ink-600">That&apos;s {demoSlots.maxPicks} — remove one to pick another.</p>}

      <input type="hidden" name="slots" value={picks.join(",")} />
      <FieldError message={error} tone="gold" />
    </fieldset>
  );
}

/** The demo-class booking form: details, course and up to three preferred time slots. */
export function DemoForm({
  courseTitles,
  defaultCourse,
  onDone,
}: {
  courseTitles: string[];
  defaultCourse?: string;
  /** Called when the visitor closes the "booked" popup (used to close the booking dialog). */
  onDone?: () => void;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(bookDemo, {
    status: "idle",
  });
  const { formProps, errorFor, clearError, valueOf, successOpen, closeSuccess } = useFormChecks(state, [
    "name",
    "phone",
    "email",
    "slots",
  ]);
  const [picks, setPicks] = useState<string[]>([]);

  // Start fresh after a successful booking (adjusting state during render, not in an effect)
  const [seen, setSeen] = useState(state);
  if (seen !== state) {
    setSeen(state);
    if (state.status === "success") setPicks([]);
  }

  const input = (name: string) =>
    `px-4 ${fieldClasses} ${errorFor(name) ? "border-2 border-red-700" : ""}`;

  return (
    <form action={formAction} {...formProps} className="flex min-w-0 flex-col gap-3.5">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Name
        <input
          type="text"
          name="name"
          autoComplete="name"
          defaultValue={valueOf("name")}
          aria-invalid={!!errorFor("name")}
          className={input("name")}
        />
        <FieldError message={errorFor("name")} tone="gold" />
      </label>
      <div className="flex flex-wrap gap-3.5">
        <label className="flex flex-[1_1_180px] flex-col gap-1.5 text-sm font-medium">
          Phone
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="98765 43210"
            defaultValue={valueOf("phone")}
            aria-invalid={!!errorFor("phone")}
            className={input("phone")}
          />
          <FieldError message={errorFor("phone")} tone="gold" />
        </label>
        <label className="flex flex-[1_1_180px] flex-col gap-1.5 text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            defaultValue={valueOf("email")}
            aria-invalid={!!errorFor("email")}
            className={input("email")}
          />
          <FieldError message={errorFor("email")} tone="gold" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Interested in
        <select
          name="course"
          defaultValue={valueOf("course") ?? defaultCourse}
          className={`px-3.5 ${fieldClasses}`}
        >
          {courseTitles.map((title) => (
            <option key={title}>{title}</option>
          ))}
          <option>Not sure yet</option>
        </select>
      </label>

      <SlotPicker
        picks={picks}
        error={errorFor("slots")}
        onChange={(next) => {
          setPicks(next);
          clearError("slots");
        }}
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="min-h-13 cursor-pointer rounded-full bg-ink px-7 text-[17px] font-semibold text-paper disabled:opacity-60"
        >
          {pending ? "Booking…" : "Book my free class"}
        </button>
        {state.status === "error" && state.message && (
          <p role="status" className="font-semibold text-ink">
            {state.message}
          </p>
        )}
      </div>
      <SentDialog
        open={successOpen}
        onClose={() => {
          closeSuccess();
          onDone?.();
        }}
        title="Demo class booked!"
        message={state.message}
        confirmedTo={state.confirmedTo}
      />
    </form>
  );
}
