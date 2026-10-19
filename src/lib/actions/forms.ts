"use server";

import { events } from "@/data/community";
import { site } from "@/data/site";
import { emailDomainAcceptsMail, sendConfirmationEmail, sendEnquiryEmail } from "@/lib/mail";
import { formValues, normalizePhone, validateFields, type FieldErrors } from "@/lib/validation";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Per-field problems, shown under each input. */
  errors?: FieldErrors;
  /** What the visitor typed, so the form can refill itself after an error. */
  values?: Record<string, string>;
  /** Set on success: the address the confirmation email went to, if it was sent. */
  confirmedTo?: string;
};

const sendFailed = (values: Record<string, string>): FormState => ({
  status: "error",
  message: `Sorry, that didn't go through. Please email us at ${site.contact.email} or try again.`,
  values,
});

/** Shared checks: required fields, phone and email format, and that the email's domain exists. */
async function check(values: Record<string, string>): Promise<FormState | undefined> {
  const errors = validateFields(values);
  if (!errors.email && !(await emailDomainAcceptsMail(values.email))) {
    errors.email = "That email domain doesn't seem to exist. Please check for typos.";
  }
  if (Object.keys(errors).length === 0) return undefined;
  return { status: "error", message: "Please fix the highlighted fields.", errors, values };
}

/** Homepage contact form. */
export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  const invalid = await check(values);
  if (invalid) return invalid;

  const phone = normalizePhone(values.phone)!;
  const details = {
    "Interested in": values.interest,
    Name: values.name,
    Phone: phone,
    Email: values.email,
    Message: values.message,
  };

  if (!(await sendEnquiryEmail(`New enquiry: ${values.name}`, details, values.email))) {
    return sendFailed(values);
  }
  const confirmed = await sendConfirmationEmail({
    to: values.email,
    subject: "We've got your message — Rogue Code",
    name: values.name,
    intro: "Thanks for getting in touch! Your message has reached our team and we'll get back to you shortly.",
    fields: details,
  });

  return {
    status: "success",
    message: "Thanks! We'll get back to you shortly.",
    confirmedTo: confirmed ? values.email : undefined,
  };
}

/** Event registration form on /events/[slug]. */
export async function registerForEvent(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  const invalid = await check(values);
  if (invalid) return invalid;

  const event = events.find((e) => e.slug === values.event);
  const eventTitle = event?.title ?? values.event;
  const phone = normalizePhone(values.phone)!;
  const details = {
    Event: eventTitle,
    Name: values.name,
    Email: values.email,
    Phone: phone,
    "College / company": values.college,
  };

  // TODO: also save the registration against the event in Firestore.
  const sent = await sendEnquiryEmail(
    `Event registration: ${eventTitle} — ${values.name}`,
    details,
    values.email,
  );
  if (!sent) return sendFailed(values);

  const confirmed = await sendConfirmationEmail({
    to: values.email,
    subject: `You're registered: ${eventTitle}`,
    name: values.name,
    intro: `You're registered for ${eventTitle}. Keep this email — we'll send any joining details before the event.`,
    fields: event
      ? { ...details, When: `${event.day} ${event.month}, ${event.time}`, Where: event.venue }
      : details,
  });

  return {
    status: "success",
    message: "You're registered!",
    confirmedTo: confirmed ? values.email : undefined,
  };
}

/** Academy "book a free demo class" form. */
export async function bookDemo(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  const invalid = await check(values);
  if (invalid) return invalid;

  const phone = normalizePhone(values.phone)!;
  const details = { Name: values.name, Phone: phone, Email: values.email, Course: values.course };

  if (!(await sendEnquiryEmail(`Demo class request: ${values.name}`, details, values.email))) {
    return sendFailed(values);
  }
  const confirmed = await sendConfirmationEmail({
    to: values.email,
    subject: "Your free demo class request — Rogue Academy",
    name: values.name,
    intro: `Thanks for booking a free demo class! We'll call you on ${phone} to fix a time that suits you.`,
    fields: details,
  });

  return {
    status: "success",
    message: "You're booked in! We'll call you back to confirm.",
    confirmedTo: confirmed ? values.email : undefined,
  };
}
