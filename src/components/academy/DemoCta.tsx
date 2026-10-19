"use client";

import { useActionState } from "react";
import { FieldError, SentDialog, useFormChecks } from "@/components/ui/FormFeedback";
import { bookDemo, type FormState } from "@/lib/actions/forms";

const fieldClasses =
  "box-border min-h-13 rounded-xl border border-ink bg-white text-base text-ink";

export function DemoCta({ courseTitles, defaultCourse }: { courseTitles: string[]; defaultCourse?: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(bookDemo, {
    status: "idle",
  });
  const { formProps, errorFor, valueOf, successOpen, closeSuccess } = useFormChecks(state);

  const input = (name: string) =>
    `px-4 ${fieldClasses} ${errorFor(name) ? "border-2 border-red-700" : ""}`;

  return (
    <section id="demo" className="container-page pb-28">
      <div className="flex flex-wrap items-center gap-12 rounded-[28px] bg-gold p-[clamp(32px,5vw,64px)] text-ink">
        <div className="flex-[1_1_380px]">
          <h2 className="text-[clamp(36px,4.6vw,64px)] leading-[0.98] font-extrabold tracking-[-0.04em]">
            Not sure where to start?
          </h2>
          <p className="mt-5 max-w-115 text-[19px] leading-normal text-ink-800">
            Book a free demo class. We&apos;ll call you back, answer your questions and suggest a
            track.
          </p>
        </div>

        <form action={formAction} {...formProps} className="flex flex-[1_1_420px] flex-col gap-3.5">
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
            <select name="course" defaultValue={valueOf("course") ?? defaultCourse} className={`px-3.5 ${fieldClasses}`}>
              {courseTitles.map((title) => (
                <option key={title}>{title}</option>
              ))}
              <option>Not sure yet</option>
            </select>
          </label>
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
            onClose={closeSuccess}
            title="Demo class booked!"
            message={state.message}
            confirmedTo={state.confirmedTo}
          />
        </form>
      </div>
    </section>
  );
}
