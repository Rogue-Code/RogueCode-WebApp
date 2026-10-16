import type { Metadata } from "next";
import { ShopIndex } from "@/components/shop/ShopPages";

export const metadata: Metadata = { title: "Shop — Rogue Code" };

export default function Page() {
  return <ShopIndex base="/shop" homeHref="/" />;
}
