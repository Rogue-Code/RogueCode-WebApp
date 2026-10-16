"use client";

import { useSyncExternalStore } from "react";

export type CartLine = { slug: string; size?: string; qty: number };

const STORAGE_KEY = "rc_cart";
const EMPTY: CartLine[] = [];

let lines: CartLine[] | null = null;
const listeners = new Set<() => void>();

function load(): CartLine[] {
  if (lines) return lines;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    lines = raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    lines = [];
  }
  return lines;
}

function save(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep tabs in sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      lines = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const sameLine = (a: CartLine, slug: string, size?: string) => a.slug === slug && a.size === size;

export const cart = {
  add(slug: string, qty = 1, size?: string) {
    const current = load();
    const existing = current.find((l) => sameLine(l, slug, size));
    save(
      existing
        ? current.map((l) => (l === existing ? { ...l, qty: l.qty + qty } : l))
        : [...current, { slug, size, qty }],
    );
  },
  setQty(slug: string, size: string | undefined, qty: number) {
    const current = load();
    save(
      qty <= 0
        ? current.filter((l) => !sameLine(l, slug, size))
        : current.map((l) => (sameLine(l, slug, size) ? { ...l, qty } : l)),
    );
  },
  clear() {
    save([]);
  },
};

/** Cart contents, persisted in localStorage and shared between the studio and academy shops. */
export function useCart(): CartLine[] {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

export function useCartCount(): number {
  return useCart().reduce((n, l) => n + l.qty, 0);
}
