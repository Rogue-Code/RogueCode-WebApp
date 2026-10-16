"use client";

import { useActionState } from "react";
import { registerForEvent, type FormState } from "@/lib/actions/forms";

const inputClasses =
  "box-border min-h-13 w-full rounded-xl border border-outline bg-ink px-4 text-base text-paper";

export function EventRegistration({ eventSlug }: { eventSlug: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(registerForEvent, {
    status: "idle",
  });

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-gold bg-royal p-8">
        <p className="font-mono text-sm text-gold">$ register ✓</p>
        <p className="mt-3 text-xl font-semibold">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-3xl border border-edge bg-royal p-8">
      <h2 className="text-2xl font-semibold tracking-[-0.02em]">Register</h2>
      <input type="hidden" name="event" value={eventSlug} />
      <input name="name" required placeholder="Full name" autoComplete="name" className={inputClasses} />
      <input name="email" type="email" required placeholder="Email" autoComplete="email" className={inputClasses} />
      <input name="phone" type="tel" required placeholder="Phone" autoComplete="tel" className={inputClasses} />
      <input name="college" placeholder="College / company (optional)" className={inputClasses} />
      <button
        type="submit"
        disabled={pending}
        className="mt-2 min-h-13 cursor-pointer rounded-full bg-gold px-7 text-[17px] font-semibold text-ink disabled:opacity-60"
      >
        {pending ? "Registering…" : "Register now"}
      </button>
      {state.status === "error" && (
        <p role="alert" className="text-gold">
          {state.message}
        </p>
      )}
    </form>
  );
}
