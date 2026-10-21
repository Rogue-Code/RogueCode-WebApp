// Form checks shared by the browser (instant feedback) and the server actions (the real gate).

export type FieldErrors = Record<string, string>;

/**
 * Returns the number in a tidy form, or undefined if it isn't a valid phone number.
 * Indian mobiles may be written with or without +91 / 91 / 0 and any spaces or dashes;
 * other countries need a leading + and country code.
 */
export function normalizePhone(raw: string): string | undefined {
  const value = raw.trim().replace(/[\s\-().]/g, "");
  if (!/^\+?\d+$/.test(value)) return undefined;

  const indian = value.replace(/^(\+91|91(?=\d{10}$)|0(?=\d{10}$))/, "");
  if (/^[6-9]\d{9}$/.test(indian)) return `+91 ${indian.slice(0, 5)} ${indian.slice(5)}`;

  if (value.startsWith("+") && !value.startsWith("+91") && /^\+\d{8,15}$/.test(value)) return value;
  return undefined;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i.test(value.trim());
}

const messages = {
  name: "Please add your name.",
  phone: "Enter a valid mobile number, e.g. 98765 43210.",
  email: "Enter a valid email address, e.g. you@gmail.com.",
  address: "Please add your delivery address with PIN code.",
  slots: "Pick at least one time that suits you.",
};

/** Checks the named fields; `required` lists those that can't be empty. */
export function validateFields(
  values: Record<string, string>,
  required: string[] = ["name", "phone", "email"],
): FieldErrors {
  const errors: FieldErrors = {};
  for (const name of required) {
    if (!values[name]?.trim()) errors[name] = messages[name as keyof typeof messages] ?? "This field is required.";
  }
  if (values.phone && !errors.phone && !normalizePhone(values.phone)) errors.phone = messages.phone;
  if (values.email && !errors.email && !isValidEmail(values.email)) errors.email = messages.email;
  if (values.address && !errors.address && !/\b\d{6}\b/.test(values.address)) {
    errors.address = "Please include your 6-digit PIN code.";
  }
  return errors;
}

/** Reads every text field of a form as trimmed strings. */
export function formValues(formData: FormData) {
  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") values[key] = value.trim();
  });
  return values;
}
