"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { FormState } from "@/lib/actions/forms";
import { formValues, validateFields, type FieldErrors } from "@/lib/validation";

/**
 * Checks name / phone / email in the browser before the form is sent, and merges those
 * messages with any the server returned. Typing in a field clears its message.
 */
export function useFormChecks(state: FormState) {
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [edited, setEdited] = useState<string[]>([]);
  const [closedFor, setClosedFor] = useState<FormState>();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateFields(formValues(new FormData(event.currentTarget)));
    setClientErrors(found);
    setEdited([]);
    const first = Object.keys(found)[0];
    if (first) {
      event.preventDefault();
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }

  function onInput(event: FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement).name;
    if (!name || edited.includes(name)) return;
    setEdited([...edited, name]);
    setClientErrors((errors) => Object.fromEntries(Object.entries(errors).filter(([key]) => key !== name)));
  }

  const errorFor = (name: string) =>
    clientErrors[name] || (edited.includes(name) ? undefined : state.errors?.[name]);

  return {
    formProps: { onSubmit, onInput, noValidate: true },
    errorFor,
    /** What the visitor typed before a server-side error, to refill the form. */
    valueOf: (name: string) => state.values?.[name],
    successOpen: state.status === "success" && closedFor !== state,
    closeSuccess: () => setClosedFor(state),
  };
}

export function FieldError({ message, tone = "dark" }: { message?: string; tone?: "dark" | "gold" }) {
  if (!message) return null;
  return (
    <span role="alert" className={`text-sm font-medium ${tone === "gold" ? "text-red-800" : "text-red-400"}`}>
      {"⚠ "}
      {message}
    </span>
  );
}

/** Red-ish ring for an invalid input, matching each form's own input style. */
export const invalidClasses = "border-red-400! ring-2 ring-red-400/30";

/** "Sent!" popup shown after a form goes through. */
export function SentDialog({
  open,
  onClose,
  title,
  message,
  confirmedTo,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  confirmedTo?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[min(92vw,440px)] rounded-3xl border border-edge bg-royal p-0 text-paper backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4 p-9 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-gold text-3xl font-bold text-ink">
          ✓
        </span>
        <h2 className="text-[28px] leading-[1.1] font-bold tracking-[-0.025em]">{title}</h2>
        {message && <p className="text-base leading-[1.6] text-paper-soft">{message}</p>}
        <p className="text-[15px] leading-[1.6] text-muted">
          {confirmedTo ? (
            <>
              We&apos;ve sent a confirmation to <span className="font-semibold text-paper">{confirmedTo}</span>.
              Check your spam folder if you don&apos;t see it.
            </>
          ) : (
            "Our team has your details."
          )}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="mt-2 min-h-12 cursor-pointer rounded-full bg-gold px-8 text-base font-semibold text-ink"
        >
          Done
        </button>
      </div>
    </dialog>
  );
}
