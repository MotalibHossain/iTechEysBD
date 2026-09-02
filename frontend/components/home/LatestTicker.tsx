// ─────────────────────────────────────────────────────────────────────────────
// LatestTicker
// Dark full-width bar:
//   Left  : "LATEST" red badge with a pulsing live dot
//   Center : Infinitely scrolling headline ticker (pure CSS animation)
//   Right  : Inline search input + button
// ─────────────────────────────────────────────────────────────────────────────

import { Search } from "lucide-react";
import { tickerItems } from "@/lib/data/home-data";

export default function LatestTicker() {
  // Duplicate the list so the second half is visually identical to the first.
  // The CSS animation translates -50% to create a seamless infinite loop.
  const loopItems = [...tickerItems, ...tickerItems];

  return (
    <section className="flex items-stretch bg-[#16151A] rounded-[14px] overflow-hidden">

      {/* ── "LATEST" badge ────────────────────────────────────────────────────── */}
      <div className="flex-none flex items-center gap-2 bg-[#E63946] text-white font-bold text-[13px] tracking-[0.8px] uppercase px-5">
        {/* Pulsing live dot */}
        <span className="w-[7px] h-[7px] rounded-full bg-white animate-pulse-dot" />
        Latest
      </div>

      {/* ── Scrolling ticker ─────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 overflow-hidden relative flex items-center py-[14px]">
        <div className="flex gap-12 whitespace-nowrap animate-ticker will-change-transform">
          {loopItems.map((headline, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 text-white/86 text-[14px]"
            >
              <span className="text-[#E63946] font-extrabold">•</span>
              {headline}
            </span>
          ))}
        </div>
      </div>

      {/* ── Search ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-none items-center p-2 bg-[#16151A]">
        <div className="flex items-center">
          <input
            type="search"
            placeholder="Search articles…"
            aria-label="Search articles"
            className="border-none outline-none bg-[#26242B] text-white text-[14px] px-[14px] py-[10px] rounded-l-[9px] w-[200px] placeholder:text-white/40"
          />
          <button
            type="button"
            className="bg-[#E63946] text-white font-bold text-[13.5px] px-[18px] py-[11px] rounded-r-[9px] hover:bg-[#C71F2E] transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <Search size={14} strokeWidth={2.2} />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
