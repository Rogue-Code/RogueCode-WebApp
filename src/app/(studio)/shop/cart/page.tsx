import type { Metadata } from "next";
import { CartPage } from "@/components/shop/ShopPages";

export const metadata: Metadata = { title: "Cart — Rogue Code" };

export default function Page() {
  return <CartPage base="/shop" homeHref="/" />;
}
