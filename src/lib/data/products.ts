// Data access for the shop. Pages and components only talk to these functions,
// so swapping the seed data for Firestore later doesn't touch any UI.
import { products, type Product } from "@/data/products";

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getSimilarProducts(product: Product, limit = 4): Promise<Product[]> {
  const others = products.filter((p) => p.slug !== product.slug);
  const sameCategory = others.filter((p) => p.category === product.category);
  return [...sameCategory, ...others.filter((p) => p.category !== product.category)].slice(0, limit);
}

export function formatPrice(rupees: number) {
  return `₹${rupees.toLocaleString("en-IN")}`;
}

export function discountPercent(product: Pick<Product, "price" | "mrp">) {
  return product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0;
}
