"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

const inputClasses =
  "box-border min-h-13 w-full rounded-xl border border-outline bg-ink px-4 text-base text-paper";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: sign in with Firebase Auth and create a secure session cookie (next phase).
    setMessage("Student login is being moved to the new site and will be switched on shortly.");
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-2 text-[15px] text-muted">
        Email
        <input type="email" name="email" required autoComplete="email" className={inputClasses} />
      </label>

      {mode === "login" && (
        <label className="flex flex-col gap-2 text-[15px] text-muted">
          Password
          <span className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              autoComplete="current-password"
              className={`${inputClasses} pr-13`}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute top-1/2 right-1 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center text-muted"
            >
              <Icon name={showPassword ? "eyeOff" : "eye"} />
            </button>
          </span>
        </label>
      )}

      <button
        type="submit"
        className="mt-2 min-h-13 cursor-pointer rounded-full bg-gold px-7 text-[17px] font-semibold text-ink"
      >
        {mode === "login" ? "Log in" : "Send reset link"}
      </button>
      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "reset" : "login");
          setMessage(null);
        }}
        className="cursor-pointer self-start py-2 text-[15px] font-semibold text-paper underline underline-offset-4"
      >
        {mode === "login" ? "Forgot your password?" : "Back to login"}
      </button>
      {message && (
        <p role="status" className="rounded-xl border border-edge bg-royal px-4 py-3 text-paper-soft">
          {message}
        </p>
      )}
    </form>
  );
}
