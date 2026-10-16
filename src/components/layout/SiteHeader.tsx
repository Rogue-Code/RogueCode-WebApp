import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/ui/Button";
import type { HeaderConfig } from "@/data/site";
import { CartButton, MobileMenu, NavLinks } from "./HeaderClient";

export function Logo({ suffix }: { suffix?: string }) {
  return (
    <>
      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-gold font-mono text-sm font-medium text-ink">
        &gt;_
      </span>
      <span>
        rogue<span className="text-gold">/</span>code
        {suffix && <span className="font-medium text-muted"> {suffix}</span>}
      </span>
    </>
  );
}

export function SiteHeader({ config }: { config: HeaderConfig }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-x-8 gap-y-4 py-4">
        <Link
          href={config.home}
          aria-label="Rogue Code home"
          className="flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.02em] whitespace-nowrap text-paper"
        >
          <Logo suffix={config.logoSuffix} />
        </Link>

        <nav aria-label="Primary" className="hidden gap-x-6 text-[15px] whitespace-nowrap xl:flex">
          <Suspense fallback={<NavLinks items={config.nav} static />}>
            <NavLinks items={config.nav} />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2.5">
          <CartButton href={config.cartHref} />
          <ButtonLink
            href={config.loginHref}
            variant="outline"
            size="md"
            className="hidden font-medium! whitespace-nowrap sm:inline-flex"
          >
            {config.loginLabel}
          </ButtonLink>
          <ButtonLink href={config.cta.href} size="md" className="hidden whitespace-nowrap md:inline-flex xl:hidden 2xl:inline-flex">
            {config.cta.label}
          </ButtonLink>
          <Suspense>
            <MobileMenu config={config} />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
