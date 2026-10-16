import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "./Icon";

type Variant = "gold" | "outline" | "ink" | "outlineInk" | "outlinePaper";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink font-semibold",
  outline: "border border-outline font-semibold",
  ink: "bg-ink text-paper font-semibold",
  outlineInk: "border border-ink text-ink font-semibold",
  outlinePaper: "border border-paper font-semibold",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-13 px-6.5 text-[17px]",
};

export function buttonClasses(variant: Variant = "gold", size: Size = "lg") {
  return `inline-flex items-center gap-2.5 rounded-full ${variants[variant]} ${sizes[size]}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
};

export function ButtonLink({
  variant = "gold",
  size = "lg",
  arrow = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${buttonClasses(variant, size)} ${className}`} {...props}>
      {children}
      {arrow && <Icon name="arrowRight" />}
    </Link>
  );
}

/** Plain text link with a trailing arrow, e.g. "All projects →" */
export function ArrowLink({ className = "", children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold ${className}`}
      {...props}
    >
      {children}
      <Icon name="arrowRight" />
    </Link>
  );
}
