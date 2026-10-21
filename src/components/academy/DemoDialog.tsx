"use client";

import { useEffect, useRef, useState } from "react";
import { DemoForm } from "./DemoForm";

/**
 * Opens the demo-class form in a popup whenever a "#demo" link on an academy page is clicked,
 * instead of scrolling down to the form at the bottom. Mounted once in the academy layout.
 */
export function DemoDialog({
  courseTitles,
  courseTitleById,
}: {
  courseTitles: string[];
  courseTitleById: Record<string, string>;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  // Bumped on every open so the form starts fresh with the right course preselected
  const [opened, setOpened] = useState({ count: 0, course: undefined as string | undefined });

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element).closest?.("a");
      if (!link) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.hash !== "#demo" || !url.pathname.startsWith("/academy")) return;

      event.preventDefault();
      const slug = location.pathname.match(/^\/academy\/courses\/([^/]+)/)?.[1];
      setOpened((o) => ({ count: o.count + 1, course: slug ? courseTitleById[slug] : undefined }));
      ref.current?.showModal();
    }
    // Capture phase, so this runs before next/link turns the click into a scroll to #demo
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [courseTitleById]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="demo-dialog-title"
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[92dvh] w-[min(94vw,620px)] overflow-y-auto [scrollbar-color:rgb(11_12_16/0.35)_transparent] [scrollbar-width:thin] rounded-[28px] bg-gold p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-[clamp(24px,4vw,40px)]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="demo-dialog-title" className="text-[clamp(28px,4vw,40px)] leading-none font-extrabold tracking-[-0.035em]">
              Book a free demo class
            </h2>
            <p className="mt-2.5 text-base text-ink-800">
              Pick a few times that suit you and we&apos;ll call you to confirm one.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-2xl hover:bg-ink/10"
          >
            ×
          </button>
        </div>
        {opened.count > 0 && (
          <DemoForm
            key={opened.count}
            courseTitles={courseTitles}
            defaultCourse={opened.course}
            onDone={close}
          />
        )}
      </div>
    </dialog>
  );
}
