"use client";

import { useActionState } from "react";
import { FieldError, SentDialog, invalidClasses, useFormChecks } from "@/components/ui/FormFeedback";
import { registerForEvent, type FormState } from "@/lib/actions/forms";

const inputClasses =
  "box-border min-h-13 w-full rounded-xl border border-outline bg-ink px-4 text-base text-paper";

export function EventRegistration({ eventSlug }: { eventSlug: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(registerForEvent, {
    status: "idle",
  });
  const { formProps, errorFor, valueOf, successOpen, closeSuccess } = useFormChecks(state);

  const input = (name: string) => `${inputClasses} ${errorFor(name) ? invalidClasses : ""}`;

  const dialog = (
    <SentDialog
      open={successOpen}
      onClose={closeSuccess}
      title="You're registered!"
      message="See you at the event."
      confirmedTo={state.confirmedTo}
    />
  );

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-gold bg-royal p-8">
        <p className="font-mono text-sm text-gold">$ register ✓</p>
        <p className="mt-3 text-xl font-semibold">{state.message}</p>
        {state.confirmedTo && (
          <p className="mt-2 text-base text-muted">Confirmation sent to {state.confirmedTo}.</p>
        )}
        {dialog}
      </div>
    );
  }

  return (
    <form
      action={formAction}
      {...formProps}
      className="flex flex-col gap-4 rounded-3xl border border-edge bg-royal p-8"
    >
      <h2 className="text-2xl font-semibold tracking-[-0.02em]">Register</h2>
      <input type="hidden" name="event" value={eventSlug} />
      {[
        { name: "name", placeholder: "Full name", autoComplete: "name" },
        { name: "email", type: "email", placeholder: "Email", autoComplete: "email" },
        { name: "phone", type: "tel", placeholder: "Phone, e.g. 98765 43210", autoComplete: "tel" },
      ].map((f) => (
        <div key={f.name} className="flex flex-col gap-1.5">
          <input
            {...f}
            defaultValue={valueOf(f.name)}
            aria-label={f.placeholder}
            aria-invalid={!!errorFor(f.name)}
            className={input(f.name)}
          />
          <FieldError message={errorFor(f.name)} />
        </div>
      ))}
      <input
        name="college"
        placeholder="College / company (optional)"
        defaultValue={valueOf("college")}
        className={inputClasses}
      />
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
