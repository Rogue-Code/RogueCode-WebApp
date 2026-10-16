"use server";

import { getProduct } from "@/lib/data/products";
import type { CartLine } from "@/lib/cart";

export type OrderState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; orderId: string; total: number };

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Places an order from the cart. Prices are always recomputed on the server from the
 * catalogue — the client only sends product slugs, sizes and quantities.
 */
export async function placeOrder(_prev: OrderState, formData: FormData): Promise<OrderState> {
  const customer = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    address: field(formData, "address"),
  };
  if (!customer.name || !customer.email || !customer.phone || !customer.address) {
    return { status: "error", message: "Please fill in all delivery details." };
  }

  let lines: CartLine[];
  try {
    lines = JSON.parse(field(formData, "cart")) as CartLine[];
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

  // TODO: save to the Firestore `Orders` collection, send the confirmation email
  // (the live site uses the `getOrderMail` cloud function) and take payment.
  console.log("[order]", { orderId, customer, items, total });

  return { status: "success", orderId, total };
}
