// ─────────────────────────────────────────────────────────────────────────────
// MostReadSection
// 3-column × 2-row grid of numbered articles.
// Items 1-3 use the accent red number; items 4-6 use a muted tone.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { mostReadItems } from "@/lib/data/home-data";

export default function MostReadSection() {
  return (
    <section className="mt-[50px] mb-[10px]">

      {/* Section header */}
      <div className="flex items-center gap-3.5 mb-[22px]">
        <h2
          className="font-semibold text-[28px] tracking-[-0.5px] font-newsreader"
        >
          Most Read This Week
        </h2>
        <span className="flex-1 h-px bg-[#E6E3DB]" />
        <Link href="/category" className="text-[13.5px] font-semibold text-[#E63946] no-underline">
          View all →
        </Link>
      </div>

      {/* 3×2 numbered grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px_26px]">
        {mostReadItems.map((item) => (
          <Link
            key={item.id}
            href="/article"
            className="flex gap-[15px] items-center bg-white border border-[#EFEDE7] rounded-[14px] p-3 no-underline transition-all duration-[240ms] hover:border-[#16151A] hover:-translate-y-[3px] hover:shadow-[0_16px_30px_-22px_rgba(20,21,26,0.42)]"
          >
            {/* Large ordinal number */}
            <span
              className={`flex-none text-[30px] font-bold w-[30px] text-center leading-none font-newsreader ${item.numClass}`}
            >
              {item.num}
            </span>

            {/* Thumbnail */}
            <div className="relative flex-none w-16 h-16 rounded-[10px] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-[0.5px] uppercase text-[#E63946]">
                {item.category}
              </span>
              <h3
                className="font-semibold text-[15px] leading-[1.22] mt-[3px] text-[#16151A] line-clamp-2 font-newsreader"
              >
                {item.title}
              </h3>
              <div className="flex items-center gap-1.5 text-[11px] text-[#8E8D94] mt-[5px]">
                <Eye size={12} strokeWidth={2} />
                <span>{item.views}</span>
                <span>•</span>
                <span>{item.read}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
