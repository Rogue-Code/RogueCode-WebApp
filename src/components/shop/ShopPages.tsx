// Page bodies shared by the studio shop (/shop) and the academy shop (/academy/shop).
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getSimilarProducts } from "@/lib/data/products";
import { AddToCart } from "./AddToCart";
import { CartView } from "./CartView";
import { ShopCatalog } from "./ShopCatalog";
import { PriceTag, ProductCard, ProductImage } from "./ProductCard";

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[13px] text-muted">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="px-2">/</span>}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span className="text-paper">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export async function ShopIndex({ base, homeHref }: { base: string; homeHref: string }) {
  const products = await getProducts();
  return (
    <section className="container-page pt-14 pb-28">
      <Breadcrumbs items={[{ label: "Home", href: homeHref }, { label: "Shop" }]} />
      <div className="mt-6 mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-4 font-mono text-[13px] tracking-[0.08em] text-gold">{"// MERCH"}</p>
          <h1 className="text-[clamp(44px,6vw,88px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            Wear the <span className="text-gold">code.</span>
          </h1>
        </div>
        <p className="max-w-110 text-[17px] leading-[1.55] text-muted">
          Rogue Code tees, totes, hoodies and bottles. Made for people who ship.
        </p>
      </div>
      <ShopCatalog products={products} base={base} />
    </section>
  );
}

export async function ProductDetail({ slug, base, homeHref }: { slug: string; base: string; homeHref: string }) {
  const product = await getProduct(slug);
  if (!product) notFound();
  const similar = await getSimilarProducts(product);

  return (
    <section className="container-page pt-14 pb-28">
      <Breadcrumbs items={[{ label: "Home", href: homeHref }, { label: "Shop", href: base }, { label: product.name }]} />
      <div className="mt-8 flex flex-wrap gap-12">
        <ProductImage product={product} className="aspect-square flex-[1_1_420px]" />
        <div className="flex flex-[1_1_380px] flex-col gap-6">
          <p className="font-mono text-xs tracking-[0.08em] text-muted">
            {product.category.toUpperCase()} · {product.code}
          </p>
          <h1 className="text-[clamp(36px,4vw,56px)] leading-none font-bold tracking-[-0.035em]">{product.name}</h1>
          <PriceTag product={product} large />
          <p className="text-[17px] leading-[1.6] text-paper-soft">{product.description}</p>
          <AddToCart product={product} cartHref={`${base}/cart`} />
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-24 border-t border-line pt-14">
          <h2 className="mb-10 text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.03em]">You might also like</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-10">
            {similar.map((p) => (
              <ProductCard key={p.slug} product={p} base={base} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export async function CartPage({ base, homeHref }: { base: string; homeHref: string }) {
  const products = await getProducts();
  return (
    <section className="container-page pt-14 pb-28">
      <Breadcrumbs items={[{ label: "Home", href: homeHref }, { label: "Shop", href: base }, { label: "Cart" }]} />
      <h1 className="mt-6 mb-12 text-[clamp(44px,6vw,80px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
        Your cart
      </h1>
      <CartView products={products} base={base} />
    </section>
  );
}

export async function productStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}
