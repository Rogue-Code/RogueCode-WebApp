"use client";

import { useState } from "react";
import { productCategories, type Product, type ProductCategory } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ShopCatalog({ products, base }: { products: Product[]; base: string }) {
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const visible = products
    .filter((p) => category === "all" || p.category === category)
    .toSorted((a, b) => (sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0));

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {productCategories.map((c) => {
            const on = c.value === category;
            return (
              <button
                key={c.value}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(c.value)}
                className={`min-h-11 cursor-pointer rounded-full border px-4.5 text-[15px] ${
                  on ? "border-paper bg-paper font-semibold text-ink" : "border-outline text-paper"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-3 text-[15px] text-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="min-h-11 rounded-full border border-outline bg-ink px-4 text-paper"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>

      {visible.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-10">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} base={base} />
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-dashed border-outline px-8 py-16 text-center">
          <p className="font-mono text-sm text-gold">404 --products-not-found</p>
          <p className="mt-3 text-lg text-paper-soft">Nothing here yet. New merch is on the way.</p>
        </div>
      )}
    </>
  );
}
