// ─────────────────────────────────────────────────────────────────────────────
// LatestTicker
// Dark bar with pulsing "LATEST" badge, infinite CSS ticker, and inline search.
// ─────────────────────────────────────────────────────────────────────────────

import { Search } from "lucide-react";
import { tickerItems } from "@/lib/data/home-data";

export default function LatestTicker() {
  // Duplicate so the -50% translate creates a seamless loop.
  const loopItems = [...tickerItems, ...tickerItems];

  return (
    <section className="flex items-stretch bg-surface-dark rounded-card overflow-hidden">
      <div className="flex-none flex items-center gap-2 bg-brand text-white font-bold text-[13px] tracking-[0.8px] uppercase px-5">
        <span className="w-1.75 h-1.75 rounded-full bg-white animate-pulse-dot" />
        Latest
      </div>

      <div className="flex-1 min-w-0 overflow-hidden relative flex items-center py-3.5">
        <div className="flex gap-12 whitespace-nowrap animate-ticker will-change-transform">
          {loopItems.map((headline, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 text-white/85 text-[14px]">
              <span className="text-brand font-extrabold">•</span>
              {headline}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden md:flex flex-none items-center p-2">
        <div className="flex items-center">
          <input
            type="search"
            placeholder="Search articles…"
            aria-label="Search articles"
            className="border-none outline-none bg-surface-dark-3 text-white text-[14px] px-3.5 py-2.5 rounded-l-[9px] w-50 placeholder:text-white/40"
          />
          <button
            type="button"
            className="bg-brand text-white font-bold text-[13.5px] px-4.5 py-2.75 rounded-r-[9px] hover:bg-brand-strong transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <Search size={14} strokeWidth={2.2} />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
