"use server";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
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

  // TODO: deliver the enquiry (email, CRM, database…). Logged for now.
  console.log("[contact]", enquiry);

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

  // TODO: save the registration against the event in Firestore and email a confirmation.
  console.log("[event-registration]", registration);

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

  // TODO: deliver the booking (email, CRM, database…). Logged for now.
  console.log("[demo]", booking);

  return { status: "success", message: "You're booked in! We'll call you back to confirm." };
}
