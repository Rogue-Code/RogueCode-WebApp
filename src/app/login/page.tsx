import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/SiteHeader";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Student login — Rogue Academy",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-wrap">
      <aside className="relative flex flex-[1_1_480px] flex-col justify-between gap-12 overflow-hidden bg-royal p-[clamp(24px,5vw,64px)]">
        <Link href="/academy" className="flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.02em] text-paper">
          <Logo suffix="academy" />
        </Link>
        <div>
          <p className="font-mono text-sm text-muted">
            <span className="text-gold">~/rogue-academy $</span> login
          </p>
          <h1 className="mt-5 text-[clamp(44px,5.6vw,84px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            Welcome back
            <br />
            to <span className="text-gold">Rogue Code.</span>
          </h1>
          <p className="mt-6 max-w-110 text-lg leading-normal text-paper-soft">
            Together we develop a passion for learning. Your courses, quizzes, assignments and class
            recordings are waiting.
          </p>
        </div>
        <ul className="flex flex-col gap-2.5 font-mono text-sm text-paper-soft">
          <li><span className="text-gold">✓</span> courses &amp; syllabus</li>
          <li><span className="text-gold">✓</span> timed quizzes with instant results</li>
          <li><span className="text-gold">✓</span> assignments, slides &amp; videos</li>
        </ul>
        <span aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full border border-edge-strong" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-8 -bottom-8 size-48 rounded-full border border-edge-strong" />
      </aside>

      <main className="flex flex-[1_1_420px] items-center justify-center p-[clamp(24px,5vw,64px)]">
        <div className="w-full max-w-110">
          <h2 className="text-[clamp(32px,3vw,40px)] font-bold tracking-[-0.03em]">Student login</h2>
          <p className="mt-2 text-muted">Use the email your Academy account was created with.</p>
          <LoginForm />
          <p className="mt-8 text-sm leading-normal text-subtle">
            By logging in you agree to our End User License Agreement. Not a student yet?{" "}
            <Link href="/academy#demo" className="font-semibold text-paper underline underline-offset-4">
              Book a free demo class
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
