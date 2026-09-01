// ─────────────────────────────────────────────────────────────────────────────
// RecommendedSection
// "For You" heading + 3-column article cards + "Load more" button.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { recommendedItems } from "@/lib/data/home-data";

export default function RecommendedSection() {
  return (
    <section className="py-12">

      {/* Section header */}
      <div className="flex items-start justify-between mb-[22px]">
        <div>
          <span className="text-[12px] font-bold tracking-[1.2px] uppercase text-[#E63946]">
            For You
          </span>
          <h2
            className="editorial-section-title mt-1"
          >
            Recommended Reads
          </h2>
        </div>
        <Link
          href="/category"
          className="hidden md:block text-[13.5px] font-semibold text-[#E63946] no-underline self-end mb-1"
        >
          Personalize →
        </Link>
      </div>

      {/* 3-column card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 editorial-card-grid">
        {recommendedItems.map((article) => (
          <Link
            key={article.id}
            href="/article"
            className="no-underline text-inherit bg-white border border-[#EFEDE7] rounded-[16px] overflow-hidden flex flex-col transition-all duration-[280ms] hover:-translate-y-[5px] hover:shadow-[0_22px_40px_-24px_rgba(20,21,26,0.42)]"
          >
            {/* Thumbnail */}
            <div className="relative editorial-card-media overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.07]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              />
              {/* Category badge */}
              <span className="absolute top-3 left-3 bg-white/94 text-[#16151A] text-[11px] font-bold tracking-[0.4px] uppercase px-[10px] py-[5px] rounded-[7px]">
                {article.category}
              </span>
            </div>

            {/* Text body */}
            <div className="p-[17px_18px_19px] flex flex-col flex-1">
              <h3
                className="font-semibold text-[19px] leading-[1.24] tracking-[-0.2px] font-newsreader"
              >
                {article.title}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-[#6B6A70] mt-2 line-clamp-2">
                {article.excerpt}
              </p>

              {/* Author + read time */}
              <div className="flex items-center gap-2 mt-auto pt-[15px] text-[12.5px] text-[#8E8D94]">
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={article.avatar}
                    alt={article.author}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
                <span className="font-semibold text-[#57565C]">{article.author}</span>
                <span className="text-[#D8D5CD]">•</span>
                <span>{article.read}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center mt-[30px] mb-6">
        <button className="inline-flex items-center gap-2 bg-white border border-[#EFEDE7] text-[#16151A] text-[14.5px] font-bold px-7 py-3.5 rounded-[12px] hover:bg-[#16151A] hover:text-white hover:border-[#16151A] transition-all duration-200 cursor-pointer">
          Load more stories
          <ArrowDown size={16} strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
}
