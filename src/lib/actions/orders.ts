"use server";

import { site } from "@/data/site";
import type { CartLine } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/data/products";
import { emailDomainAcceptsMail, sendConfirmationEmail, sendEnquiryEmail } from "@/lib/mail";
import { formValues, normalizePhone, validateFields, type FieldErrors } from "@/lib/validation";

export type OrderState = {
  status: "idle" | "error" | "success";
  message?: string;
  /** Per-field problems, shown under each input. */
  errors?: FieldErrors;
  /** What the customer typed, so the form can refill itself after an error. */
  values?: Record<string, string>;
  orderId?: string;
  total?: number;
  /** The address the confirmation email went to, if it was sent. */
  confirmedTo?: string;
};

const orderFields = ["name", "phone", "email", "address"];

/**
 * Places an order from the cart. Prices are always recomputed on the server from the
 * catalogue — the client only sends product slugs, sizes and quantities.
 */
export async function placeOrder(_prev: OrderState, formData: FormData): Promise<OrderState> {
  const { cart: cartJson = "", ...values } = formValues(formData);
  const errors = validateFields(values, orderFields);
  if (!errors.email && !(await emailDomainAcceptsMail(values.email))) {
    errors.email = "That email domain doesn't seem to exist. Please check for typos.";
  }
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  let lines: CartLine[];
  try {
    lines = JSON.parse(cartJson) as CartLine[];
  } catch {
    return { status: "error", message: "Your cart couldn't be read. Please refresh and try again." };
  }

  const items = [];
  for (const line of lines) {
    const product = await getProduct(line.slug);
    const qty = Math.floor(Number(line.qty));
    if (!product || !product.inStock || !(qty > 0)) continue;
    items.push({ slug: product.slug, name: product.name, size: line.size, qty, price: product.price });
  }
  if (!items.length) return { status: "error", message: "Your cart is empty." };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const orderId = `RC-${Date.now().toString(36).toUpperCase()}`;

  const customer = {
    Name: values.name,
    Phone: normalizePhone(values.phone)!,
    Email: values.email,
    "Delivery address": values.address,
  };
  const itemRows = Object.fromEntries(
    items.map((i, n) => [
      `${n + 1}. ${i.name}${i.size ? ` (${i.size})` : ""} × ${i.qty}`,
      formatPrice(i.price * i.qty),
    ]),
  );
  const details = { Order: orderId, ...itemRows, Total: formatPrice(total) };

  // TODO: save to the Firestore `Orders` collection and take payment online.
  console.log("[order]", JSON.stringify({ orderId, customer, items, total }));

  const sent = await sendEnquiryEmail(
    `New shop order ${orderId} — ${formatPrice(total)}`,
    { ...details, ...customer },
    values.email,
  );
  if (!sent) {
    return {
      status: "error",
      message: `Sorry, your order didn't go through. Please try again or email us at ${site.contact.email}.`,
      values,
    };
  }

  const confirmed = await sendConfirmationEmail({
    to: values.email,
    subject: `Order ${orderId} received — Rogue Code`,
    name: values.name,
    intro: `Thanks for your order! We'll call you on ${customer.Phone} to confirm payment and delivery.`,
    fields: { ...details, "Deliver to": values.address },
  });

  return { status: "success", orderId, total, confirmedTo: confirmed ? values.email : undefined };
}
