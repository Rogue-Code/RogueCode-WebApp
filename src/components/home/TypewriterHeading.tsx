"use client";

import { Fragment, useEffect, useState } from "react";

type Line = { text: string; className?: string };

const CHAR_MS = 70;
const LINE_PAUSE_MS = 380;
const START_DELAY_MS = 300;

/**
 * Types the heading out line by line. The untyped part of each line is rendered invisibly so the
 * layout never shifts, and screen readers get the full text from `aria-label` straight away.
 */
export function TypewriterHeading({ lines, className }: { lines: Line[]; className?: string }) {
  const total = lines.reduce((n, l) => n + l.text.length, 0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setTimeout(() => setCount(total), 0);
      return () => clearTimeout(timer);
    }
    const lineEnds = new Set<number>();
    lines.reduce((n, l) => (lineEnds.add(n + l.text.length), n + l.text.length), 0);

    let typed = 0;
    const tick = () => {
      typed += 1;
      setCount(typed);
      if (typed < total) timer = setTimeout(tick, lineEnds.has(typed) ? LINE_PAUSE_MS : CHAR_MS);
    };
    timer = setTimeout(tick, START_DELAY_MS);
    return () => clearTimeout(timer);
  }, [lines, total]);

  const starts = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + l.text.length, 0));
  return (
    <h1 aria-label={lines.map((l) => l.text).join(" ")} className={className}>
      {lines.map((line, i) => {
        const start = starts[i];
        const end = start + line.text.length;
        const shown = Math.min(Math.max(count - start, 0), line.text.length);
        // The cursor sits on the line being typed, and stays on the last line once done.
        const hasCursor = count >= total ? i === lines.length - 1 : count >= start && count < end;
        return (
          <Fragment key={line.text}>
            {i > 0 && <br />}
            <span aria-hidden="true" className={line.className}>
              {line.text.slice(0, shown)}
              {hasCursor && (
                <span className="relative inline-block w-0">
                  <span className="absolute bottom-[0.08em] left-[0.04em] h-[0.78em] w-[0.09em] animate-blink bg-gold" />
                </span>
              )}
              <span className="invisible">{line.text.slice(shown)}</span>
            </span>
          </Fragment>
        );
      })}
    </h1>
  );
}
