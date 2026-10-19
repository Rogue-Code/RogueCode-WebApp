import Image from "next/image";

/** The Rogue Code mark, recoloured for dark backgrounds. Height comes from `className`. */
export function LogoMark({ className = "h-8" }: { className?: string }) {
  return (
    <Image
      src="/images/logo/rogue-code-mark-light.png"
      alt=""
      width={286}
      height={204}
      className={`w-auto ${className}`}
    />
  );
}
