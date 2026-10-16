"use client";

import dynamic from "next/dynamic";

// The whole Jamboard reads localStorage while rendering, so it only renders in the browser.
const JamboardApp = dynamic(() => import("./JamboardApp"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center font-mono text-sm text-muted">
      ~/jamboard $ loading…
    </div>
  ),
});

export function JamboardShell() {
  return <JamboardApp />;
}
