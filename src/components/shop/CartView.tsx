"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { FieldError, invalidClasses, useFormChecks } from "@/components/ui/FormFeedback";
import { Icon } from "@/components/ui/Icon";
import type { Product } from "@/data/products";
import { placeOrder, type OrderState } from "@/lib/actions/orders";
import { cart, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/data/products";
import { QtyStepper } from "./AddToCart";
import { ProductImage } from "./ProductCard";

const inputClasses =
  "box-border min-h-13 w-full rounded-xl border border-outline bg-ink px-4 text-base text-paper";

export function CartView({ products, base }: { products: Product[]; base: string }) {
  const lines = useCart();
  const [state, formAction, pending] = useActionState<OrderState, FormData>(placeOrder, {
    status: "idle",
  });
  const { formProps, errorFor, valueOf } = useFormChecks(state, ["name", "phone", "email", "address"]);
  const input = (name: string) => `${inputClasses} ${errorFor(name) ? invalidClasses : ""}`;

  useEffect(() => {
    if (state.status === "success") cart.clear();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-edge bg-royal p-[clamp(28px,4vw,56px)]">
        <p className="font-mono text-sm text-gold">$ order --place ✓</p>
        <h2 className="mt-4 text-[clamp(32px,4vw,52px)] leading-none font-extrabold tracking-[-0.04em]">
          Order received.
        </h2>
        <p className="mt-5 max-w-140 text-lg leading-normal text-paper-soft">
          Your order <span className="font-mono text-paper">{state.orderId}</span> for{" "}
          {formatPrice(state.total ?? 0)} is in. We&apos;ll call you to confirm payment and delivery.
        </p>
        <p className="mt-3 max-w-140 text-base leading-normal text-muted">
          {state.confirmedTo ? (
            <>
              A confirmation is on its way to <span className="text-paper">{state.confirmedTo}</span>.
              Check your spam folder if you don&apos;t see it.
            </>
          ) : (
            "Keep your order number handy in case you need to contact us."
          )}
        </p>
        <Link href={base} className="mt-8 inline-flex min-h-13 items-center gap-2.5 rounded-full bg-gold px-6.5 font-semibold text-ink">
          Keep shopping
          <Icon name="arrowRight" />
        </Link>
      </div>
    );
  }

  const rows = lines
    .map((line) => ({ line, product: products.find((p) => p.slug === line.slug) }))
    .filter((r): r is { line: typeof r.line; product: Product } => r.product !== undefined);
  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.line.qty, 0);
  const savings = rows.reduce((sum, r) => sum + (r.product.mrp - r.product.price) * r.line.qty, 0);

  if (!rows.length) {
    return (
      <div className="rounded-[20px] border border-dashed border-outline px-8 py-20 text-center">
        <p className="font-mono text-sm text-gold">cart.length === 0</p>
        <p className="mt-3 text-2xl font-semibold">Your cart is empty.</p>
        <Link href={base} className="mt-8 inline-flex min-h-13 items-center gap-2.5 rounded-full bg-gold px-6.5 font-semibold text-ink">
          Browse the shop
          <Icon name="arrowRight" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start gap-12">
      <ul className="flex flex-[2_1_480px] flex-col border-t border-edge">
        {rows.map(({ line, product }) => (
          <li key={`${line.slug}-${line.size ?? ""}`} className="flex flex-wrap items-center gap-5 border-b border-edge py-6">
            <Link href={`${base}/${product.slug}`} className="w-24 flex-none">
              <ProductImage product={product} compact className="aspect-square rounded-xl!" />
            </Link>
            <div className="min-w-40 flex-auto">
              <Link href={`${base}/${product.slug}`} className="text-lg font-semibold">
                {product.name}
              </Link>
              <p className="mt-1 font-mono text-xs text-muted">
                {line.size ? `SIZE ${line.size} · ` : ""}
                {formatPrice(product.price)} each
              </p>
            </div>
            <QtyStepper value={line.qty} onChange={(n) => cart.setQty(line.slug, line.size, n)} />
            <p className="w-24 text-right text-lg font-semibold">{formatPrice(product.price * line.qty)}</p>
            <button
              type="button"
              aria-label={`Remove ${product.name}`}
              onClick={() => cart.setQty(line.slug, line.size, 0)}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-muted hover:text-gold"
            >
              <Icon name="trash" size={18} />
            </button>
          </li>
        ))}
      </ul>

      <form
        action={formAction}
        {...formProps}
        className="sticky top-28 flex flex-[1_1_340px] flex-col gap-4 rounded-3xl border border-edge bg-royal p-8"
      >
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Order summary</h2>
        <dl className="flex flex-col gap-2 border-b border-edge pb-4 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          {savings > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted">You save</dt>
              <dd className="text-gold">−{formatPrice(savings)}</dd>
            </div>
          )}
          <div className="flex justify-between text-xl font-bold">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
        </dl>

        <p className="text-[15px] text-muted">Delivery details</p>
        <input type="hidden" name="cart" value={JSON.stringify(lines)} />
        {[
          { name: "name", placeholder: "Full name", autoComplete: "name" },
          { name: "email", type: "email", placeholder: "Email", autoComplete: "email" },
          { name: "phone", type: "tel", placeholder: "Phone, e.g. 98765 43210", autoComplete: "tel" },
        ].map((f) => (
          <div key={f.name} className="flex flex-col gap-1.5">
            <input
              {...f}
              defaultValue={valueOf(f.name)}
              aria-label={f.placeholder}
              aria-invalid={!!errorFor(f.name)}
              className={input(f.name)}
            />
            <FieldError message={errorFor(f.name)} />
          </div>
        ))}
        <div className="flex flex-col gap-1.5">
          <textarea
            name="address"
            rows={3}
            placeholder="Delivery address with PIN code"
            autoComplete="street-address"
            defaultValue={valueOf("address")}
            aria-label="Delivery address with PIN code"
            aria-invalid={!!errorFor("address")}
            className={`${input("address")} resize-y py-3.5`}
          />
          <FieldError message={errorFor("address")} />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="mt-2 min-h-13 cursor-pointer rounded-full bg-gold px-7 text-[17px] font-semibold text-ink disabled:opacity-60"
        >
          {pending ? "Placing order…" : `Place order · ${formatPrice(subtotal)}`}
        </button>
        {state.status === "error" && !state.errors && (
          <p role="alert" className="text-gold">
            {state.message}
          </p>
        )}
        <p className="text-xs leading-normal text-subtle">
          Online payment is coming soon. For now we&apos;ll contact you to confirm payment and delivery.
        </p>
      </form>
    </div>
  );
}
