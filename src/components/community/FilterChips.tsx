"use client";

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`min-h-11 cursor-pointer rounded-full border px-4.5 text-[15px] ${
              on ? "border-paper bg-paper font-semibold text-ink" : "border-outline text-paper"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
