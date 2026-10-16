"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { HeaderConfig, NavItem } from "@/data/site";
import { useCartCount } from "@/lib/cart";

function isActive(item: NavItem, pathname: string) {
  return item.match !== undefined && (pathname === item.match || pathname.startsWith(item.match + "/"));
}

function NavItemLink({ item, active, className }: { item: NavItem; active: boolean; className: string }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label} <span aria-hidden="true">↗</span>
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? "text-gold" : ""}`}
    >
      {item.label}
    </Link>
  );
}

function ActiveNavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return items.map((item) => (
    <NavItemLink key={item.href} item={item} active={isActive(item, pathname)} className="py-2.5" />
  ));
}

/** Desktop nav. `static` renders without active state (Suspense fallback during prerender). */
export function NavLinks({ items, static: isStatic = false }: { items: NavItem[]; static?: boolean }) {
  if (isStatic) {
    return items.map((item) => (
      <NavItemLink key={item.href} item={item} active={false} className="py-2.5" />
    ));
  }
  return <ActiveNavLinks items={items} />;
}

export function CartButton({ href }: { href: string }) {
  const count = useCartCount();
  return (
    <Link
      href={href}
      aria-label={count ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
      className="relative inline-flex size-11 items-center justify-center rounded-full border border-outline"
    >
      <Icon name="bag" size={19} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">
          {count}
        </span>
      )}
    </Link>
  );
}

export function MobileMenu({ config }: { config: HeaderConfig }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-outline xl:hidden"
      >
        <Icon name="menu" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-ink-deep/80 backdrop-blur-md xl:hidden" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onClick={(e) => e.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-sm flex-col gap-2 overflow-y-auto border-l border-edge bg-royal p-6"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="mb-4 inline-flex size-11 cursor-pointer items-center justify-center self-end rounded-full border border-edge-strong"
            >
              <Icon name="close" />
            </button>
            {/* Clicking any link inside closes the menu */}
            <div onClick={close} className="flex flex-col">
              {config.nav.map((item) => (
                <NavItemLink
                  key={item.href}
                  item={item}
                  active={isActive(item, pathname)}
                  className="border-b border-edge py-4 text-xl font-semibold"
                />
              ))}
            </div>
            <div onClick={close} className="mt-6 flex flex-col gap-3">
              <Link
                href={config.loginHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-outline font-semibold"
              >
                {config.loginLabel}
              </Link>
              <Link
                href={config.cta.href}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold font-semibold text-ink"
              >
                {config.cta.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
