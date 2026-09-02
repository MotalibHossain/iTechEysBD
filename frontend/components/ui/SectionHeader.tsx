import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Shared section header used across the site.
// One place to tune title size, spacing, divider and CTA styling.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  title: string;
  kicker?: string;                                   // small uppercase label
  linkHref?: string;                                 // right-side link target
  linkLabel?: string;                                // link text
  variant?: "divider" | "split";                     // layout style
  className?: string;
}

export default function SectionHeader({
  title,
  kicker,
  linkHref,
  linkLabel = "View all →",
  variant = "divider",
  className = "",
}: Props) {
  const heading = (
    <h2 className="font-newsreader font-semibold text-section tracking-[-0.4px] text-ink whitespace-nowrap">
      {title}
    </h2>
  );

  const cta = linkHref ? (
    <Link
      href={linkHref}
      className="text-[13.5px] font-semibold text-brand no-underline hover:text-brand-strong transition-colors"
    >
      {linkLabel}
    </Link>
  ) : null;

  if (variant === "split") {
    return (
      <div className={`flex items-end justify-between gap-4 mb-6 ${className}`}>
        <div>
          {kicker && (
            <span className="block text-[11.5px] font-bold tracking-[1.2px] uppercase text-brand mb-1">
              {kicker}
            </span>
          )}
          {heading}
        </div>
        {cta}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 mb-6 ${className}`}>
      {heading}
      <span className="flex-1 h-px bg-line-3" />
      {cta ??
        (kicker && (
          <span className="text-[12px] font-semibold tracking-[1px] uppercase text-ink-3">
            {kicker}
          </span>
        ))}
    </div>
  );
}
