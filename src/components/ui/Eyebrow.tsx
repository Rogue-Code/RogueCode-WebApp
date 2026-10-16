/** Small mono label above section headings, e.g. "// TECH SOLUTIONS" */
export function Eyebrow({
  children,
  className = "text-gold",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`mb-4 font-mono text-[13px] tracking-[0.08em] ${className}`}>{children}</p>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[clamp(36px,4.6vw,64px)] leading-none font-bold tracking-[-0.035em] ${className}`}
    >
      {children}
    </h2>
  );
}
