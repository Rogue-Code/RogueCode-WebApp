"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Product } from "@/data/products";
import { cart } from "@/lib/cart";

export function QtyStepper({
  value,
  onChange,
  label = "Quantity",
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center self-start rounded-full border border-outline">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        className="inline-flex size-11 cursor-pointer items-center justify-center"
      >
        <Icon name="minus" size={16} />
      </button>
      <span aria-live="polite" className="min-w-8 text-center font-mono">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="inline-flex size-11 cursor-pointer items-center justify-center"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}

export function AddToCart({ product, cartHref }: { product: Product; cartHref: string }) {
  const router = useRouter();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const needsSize = Boolean(product.sizes?.length);
  const [sizeError, setSizeError] = useState(false);

  function add() {
    if (needsSize && !size) {
      setSizeError(true);
      return false;
    }
    cart.add(product.slug, qty, size);
    setAdded(true);
    return true;
  }

  return (
    <div className="flex flex-col gap-6">
      {needsSize && (
        <fieldset>
          <legend className="mb-3 text-[15px] text-muted">
            Size {sizeError && <span className="text-gold">— please pick a size</span>}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes!.map((s) => (
              <label
                key={s}
                className="inline-flex min-h-11 min-w-12 cursor-pointer items-center justify-center rounded-xl border border-outline px-3 font-mono has-checked:border-gold has-checked:bg-gold has-checked:text-ink"
              >
                <input
                  type="radio"
                  name="size"
                  value={s}
                  checked={size === s}
                  onChange={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className="sr-only"
                />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!product.inStock}
          onClick={add}
          className="inline-flex min-h-13 cursor-pointer items-center gap-2.5 rounded-full border border-outline px-6.5 text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="bag" />
          Add to cart
        </button>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => add() && router.push(cartHref)}
          className="inline-flex min-h-13 cursor-pointer items-center gap-2.5 rounded-full bg-gold px-6.5 text-[17px] font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy now
          <Icon name="arrowRight" />
        </button>
      </div>

      <p role="status" className="min-h-6 text-paper-soft">
        {!product.inStock
          ? "Out of stock right now."
          : added && (
              <>
                Added to your cart.{" "}
                <Link href={cartHref} className="font-semibold text-gold underline underline-offset-4">
                  View cart
                </Link>
              </>
            )}
      </p>
    </div>
  );
}
