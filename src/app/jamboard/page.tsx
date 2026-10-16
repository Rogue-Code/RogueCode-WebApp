import type { Metadata } from "next";
import { JamboardShell } from "@/components/jamboard/JamboardShell";

export const metadata: Metadata = {
  title: "Jamboard — Rogue Academy",
  description: "A free whiteboard for sketching ideas, diagrams and code walkthroughs.",
};

export default function JamboardPage() {
  return <JamboardShell />;
}
