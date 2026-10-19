import Link from "next/link";
import { footerNav, site } from "@/data/site";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page pt-16 pb-10">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-90 flex-[1_1_280px]">
            <p className="flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.02em]">
              <LogoMark />
              <span>
                rogue<span className="text-gold">/</span>code
              </span>
            </p>
            <p className="mt-3 font-mono text-sm text-muted">{site.tagline}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-[2_1_480px] flex-wrap gap-10">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-[1_1_140px] flex-col gap-1">
                <p className="mb-2 font-mono text-xs tracking-[0.08em] text-subtle">{group.title}</p>
                {group.links.map((link) => (
                  <Link key={link.label} href={link.href} className="py-1.5">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-sm text-subtle">
          <span>© {COPYRIGHT_YEAR} Rogue Code. All rights reserved.</span>
          <span className="flex flex-wrap gap-5">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href}>
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}

export function AcademyFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-wrap items-center justify-between gap-5 py-10 text-sm text-subtle">
        <span className="flex flex-wrap items-center gap-3.5">
          <span className="flex items-center gap-2 text-lg font-bold text-paper">
            <LogoMark className="h-6" />
            <span>
              rogue<span className="text-gold">/</span>code
            </span>
          </span>
          <span className="font-mono">{site.tagline}</span>
        </span>
        <span className="flex flex-wrap gap-5">
          <Link href="/">Tech Solutions</Link>
          <Link href="/academy#courses">Courses</Link>
          <Link href="/#contact">Contact</Link>
          {site.socials.slice(0, 3).map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </span>
        <span>© {COPYRIGHT_YEAR} Rogue Code</span>
      </div>
    </footer>
  );
}

// Fixed rather than `new Date()` so pages stay fully static under Cache Components.
const COPYRIGHT_YEAR = 2026;
