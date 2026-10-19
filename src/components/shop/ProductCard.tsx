import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import type { Product } from "@/data/products";
import { discountPercent, formatPrice } from "@/lib/data/products";

export function ProductImage({
  product,
  className = "",
  compact = false,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Photo
      src={product.image}
      alt={product.name}
      sizes={compact ? "96px" : "(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"}
      label={compact ? undefined : "[PRODUCT PHOTO]"}
      className={`rounded-[20px] border border-edge ${className}`}
    />
  );
}

export function PriceTag({ product, large = false }: { product: Product; large?: boolean }) {
  const off = discountPercent(product);
  return (
    <span className="flex flex-wrap items-baseline gap-2.5">
      <span className={large ? "text-[32px] font-bold tracking-[-0.02em]" : "text-xl font-bold"}>
        {formatPrice(product.price)}
      </span>
      {off > 0 && (
        <>
          <span className={`text-muted line-through ${large ? "text-lg" : "text-sm"}`}>
            {formatPrice(product.mrp)}
          </span>
          <span className="rounded-md bg-gold px-2 py-0.5 font-mono text-xs font-medium text-ink">
            {off}% OFF
          </span>
        </>
      )}
    </span>
  );
}

export function ProductCard({ product, base }: { product: Product; base: string }) {
  return (
    <Link href={`${base}/${product.slug}`} className="group flex flex-col gap-4 text-paper">
      <ProductImage product={product} className="aspect-square transition-colors group-hover:border-gold" />
      <span className="flex flex-col gap-1.5">
        <span className="text-xl font-semibold group-hover:text-gold">{product.name}</span>
        <PriceTag product={product} />
      </span>
    </Link>
  );
}
