import type { Metadata } from "next";
import { ProductDetail, productStaticParams } from "@/components/shop/ShopPages";
import { getProduct } from "@/lib/data/products";

export const generateStaticParams = productStaticParams;

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return { title: product ? `${product.name} — Rogue Code Shop` : "Product not found" };
}

export default async function Page({ params }: PageProps<"/shop/[slug]">) {
  return <ProductDetail slug={(await params).slug} base="/shop" homeHref="/" />;
}
