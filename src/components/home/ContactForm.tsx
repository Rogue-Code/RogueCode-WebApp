"use client";

import { useActionState } from "react";
import { FieldError, SentDialog, invalidClasses, useFormChecks } from "@/components/ui/FormFeedback";
import { submitContact, type FormState } from "@/lib/actions/forms";

const interests = ["A studio project", "An Academy course", "Something else"];

const inputClasses =
  "box-border rounded-xl border border-outline bg-ink px-4 text-base text-paper";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(submitContact, {
    status: "idle",
  });
  const { formProps, errorFor, valueOf, successOpen, closeSuccess } = useFormChecks(state);

  const input = (name: string) =>
    `min-h-13 ${inputClasses} ${errorFor(name) ? invalidClasses : ""}`;

  return (
    <form action={formAction} {...formProps} className="flex flex-[1_1_460px] flex-col gap-4.5">
      <fieldset className="flex flex-wrap gap-2.5">
        <legend className="mb-3 text-[15px] text-muted">I&apos;m interested in</legend>
        {interests.map((interest, i) => (
          <label
            key={interest}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-outline px-4.5 text-[15px] has-checked:border-gold"
          >
            <input
              type="radio"
              name="interest"
              value={interest}
              defaultChecked={valueOf("interest") ? valueOf("interest") === interest : i === 0}
              className="m-0 accent-gold"
            />
            {interest}
          </label>
        ))}
      </fieldset>

      <label className="flex flex-col gap-2 text-[15px] text-muted">
        Name
        <input
          type="text"
          name="name"
          autoComplete="name"
          defaultValue={valueOf("name")}
          aria-invalid={!!errorFor("name")}
          className={input("name")}
        />
        <FieldError message={errorFor("name")} />
      </label>

      <div className="flex flex-wrap gap-4.5">
        <label className="flex flex-[1_1_200px] flex-col gap-2 text-[15px] text-muted">
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
          <FieldError message={errorFor("phone")} />
        </label>
        <label className="flex flex-[1_1_200px] flex-col gap-2 text-[15px] text-muted">
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
          <FieldError message={errorFor("email")} />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-[15px] text-muted">
        Tell us a little more
        <textarea
          name="message"
          rows={5}
          defaultValue={valueOf("message")}
          className={`resize-y py-3.5 ${inputClasses}`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="min-h-13 cursor-pointer rounded-full bg-gold px-7 text-[17px] font-semibold text-ink disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.status === "error" && state.message && (
          <p role="status" className="text-gold">
            {state.message}
          </p>
        )}
      </div>

      <SentDialog
        open={successOpen}
        onClose={closeSuccess}
        title="Message sent!"
        message={state.message}
        confirmedTo={state.confirmedTo}
      />
    </form>
  );
}
