"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

/**
 * Counts the first number in `text` up from 0 when it scrolls into view
 * ("Up to 15 students" → "Up to 0… 15 students"). Text without a number renders as is.
 */
export function CountUp({ text, className }: { text: string; className?: string }) {
  const match = text.match(/\d+/);
  const target = match ? Number(match[0]) : 0;
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setValue(target), 0);
      return () => clearTimeout(id);
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          // Ease out so the last few numbers land slowly
          setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  if (!match || match.index === undefined) return <span className={className}>{text}</span>;

  const before = text.slice(0, match.index);
  const after = text.slice(match.index + match[0].length);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {before}
        {/* Reserve the final number's width so the line doesn't jiggle while counting */}
        <span className="relative inline-block text-gold tabular-nums">
          <span className="invisible">{match[0]}</span>
          <span className="absolute inset-0 text-right">{value}</span>
        </span>
        {after}
      </span>
    </span>
  );
}
