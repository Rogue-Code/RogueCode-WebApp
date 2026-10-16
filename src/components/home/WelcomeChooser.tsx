"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const STORAGE_KEY = "rc_path_chosen";

function remember() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {}
}

/**
 * Welcome popup asking visitors whether they're here for the studio or the academy.
 * Shows on the first visit only. Add `?welcome` to the URL to always show it while reviewing.
 */
export function WelcomeChooser() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (window.location.search.includes("welcome")) seen = false;
    // Reading localStorage is only possible after mount, so the open state is set here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!seen) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        remember();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
    remember();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-deep/80 backdrop-blur-md">
      <div className="box-border flex min-h-full items-center justify-center px-4 py-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chooser-title"
          className="relative box-border w-full max-w-230 rounded-[28px] border border-edge-strong bg-royal p-[clamp(24px,4vw,48px)] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close and continue to the homepage"
            onClick={close}
            className="absolute top-4 right-4 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-edge-strong text-paper-soft"
          >
            <Icon name="close" />
          </button>

          <p className="font-mono text-sm text-muted">
            <span className="text-gold">~/rogue-code $</span> choose --path
          </p>
          <h2
            id="chooser-title"
            className="mt-3.5 pr-12 text-[clamp(32px,4vw,52px)] leading-none font-extrabold tracking-[-0.04em]"
          >
            What brings you to Rogue Code?
          </h2>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#studio"
              onClick={close}
              className="box-border flex min-h-70 flex-[1_1_300px] flex-col gap-3.5 rounded-[22px] border border-edge-strong bg-ink p-8 text-paper"
            >
              <Icon name="monitorCode" size={36} strokeWidth={1.6} className="text-gold" />
              <span className="font-mono text-xs tracking-[0.08em] text-muted">FOR BUSINESSES</span>
              <span className="text-[32px] leading-[1.05] font-bold tracking-[-0.03em]">
                Tech Solutions
              </span>
              <span className="text-base leading-[1.55] text-muted">
                Websites, web apps and mobile apps, built and looked after by our team.
              </span>
              <span className="mt-auto flex items-center gap-2 text-[17px] font-semibold text-gold">
                Explore solutions
                <Icon name="arrowRight" />
              </span>
            </Link>

            <Link
              href="/academy"
              onClick={remember}
              className="box-border flex min-h-70 flex-[1_1_300px] flex-col gap-3.5 rounded-[22px] bg-gold p-8 text-ink"
            >
              <Icon name="graduationCap" size={36} strokeWidth={1.6} />
              <span className="font-mono text-xs tracking-[0.08em] text-ink-700">FOR LEARNERS</span>
              <span className="text-[32px] leading-[1.05] font-bold tracking-[-0.03em]">
                Rogue Academy
              </span>
              <span className="text-base leading-[1.55] text-ink-800">
                Hands-on coding courses taught by developers who ship real projects.
              </span>
              <span className="mt-auto flex items-center gap-2 text-[17px] font-semibold">
                See courses
                <Icon name="arrowRight" />
              </span>
            </Link>
          </div>

          <p className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] text-muted">
            Just looking around?
            <button
              type="button"
              onClick={close}
              className="min-h-11 cursor-pointer px-1 text-[15px] font-semibold text-paper underline underline-offset-4"
            >
              Continue to the homepage
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
