import Image from "next/image";

/**
 * A box that shows `src` cropped to fill it, or the striped placeholder (with an optional label)
 * while the image hasn't been supplied yet. Size and shape come from `className`.
 */
export function Photo({
  src,
  alt,
  sizes,
  className = "",
  contain = false,
  label,
}: {
  src?: string;
  alt: string;
  /** Rendered width of the box, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string;
  className?: string;
  /** Show the whole image instead of cropping (mockups, transparent PNGs). */
  contain?: boolean;
  label?: string;
}) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`placeholder-stripes flex items-center justify-center font-mono text-[13px] text-subtle ${className}`}
      >
        {label}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className={contain ? "object-contain" : "object-cover"} />
    </div>
  );
}
