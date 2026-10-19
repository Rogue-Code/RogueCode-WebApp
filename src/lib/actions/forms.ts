"use server";

import { site } from "@/data/site";
import { sendEnquiryEmail } from "@/lib/mail";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const sendFailed: FormState = {
  status: "error",
  message: `Sorry, that didn't go through. Please email us at ${site.contact.email} or try again.`,
};

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** Homepage contact form. */
export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const enquiry = {
    interest: field(formData, "interest"),
    name: field(formData, "name"),
    contact: field(formData, "contact"),
    message: field(formData, "message"),
  };

  if (!enquiry.name || !enquiry.contact) {
    return { status: "error", message: "Please add your name and a phone number or email." };
  }

  const sent = await sendEnquiryEmail(
    `New enquiry: ${enquiry.name}`,
    {
      "Interested in": enquiry.interest,
      Name: enquiry.name,
      "Phone / email": enquiry.contact,
      Message: enquiry.message,
    },
    enquiry.contact,
  );
  if (!sent) return sendFailed;

  return { status: "success", message: "Thanks! We'll get back to you shortly." };
}

/** Event registration form on /events/[slug]. */
export async function registerForEvent(_prev: FormState, formData: FormData): Promise<FormState> {
  const registration = {
    event: field(formData, "event"),
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    college: field(formData, "college"),
  };

  if (!registration.name || !registration.email || !registration.phone) {
    return { status: "error", message: "Please add your name, email and phone." };
  }

  // TODO: also save the registration against the event in Firestore and email the attendee.
  const sent = await sendEnquiryEmail(
    `Event registration: ${registration.event} — ${registration.name}`,
    {
      Event: registration.event,
      Name: registration.name,
      Email: registration.email,
      Phone: registration.phone,
      "College / company": registration.college,
    },
    registration.email,
  );
  if (!sent) return sendFailed;

  return { status: "success", message: "You're registered! Check your email for the details." };
}

/** Academy "book a free demo class" form. */
export async function bookDemo(_prev: FormState, formData: FormData): Promise<FormState> {
  const booking = {
    name: field(formData, "name"),
    phone: field(formData, "phone"),
    course: field(formData, "course"),
  };

  if (!booking.name || !booking.phone) {
    return { status: "error", message: "Please add your name and phone number." };
  }

  const sent = await sendEnquiryEmail(`Demo class request: ${booking.name}`, {
    Name: booking.name,
    Phone: booking.phone,
    Course: booking.course,
  });
  if (!sent) return sendFailed;

  return { status: "success", message: "You're booked in! We'll call you back to confirm." };
}
