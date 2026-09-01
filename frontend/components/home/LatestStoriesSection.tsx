// ─────────────────────────────────────────────────────────────────────────────
// LatestStoriesSection
// Left  : 2×2 article card grid
// Right : Sidebar with Popular Categories, Trending Tags, Author Spotlight
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import {
  latestStories,
  popularCategories,
  trendingTags,
} from "@/lib/data/home-data";

export default function LatestStoriesSection() {
  return (
    <section className="home-content-grid">

      {/* ── Latest Stories grid ──────────────────────────────────────────────── */}
      <div>
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-4.5">
          <h2
            className="editorial-section-title"
          >
            Latest Stories
          </h2>
          <Link href="/category" className="text-[13.5px] font-semibold text-[#E63946] no-underline">
            View all →
          </Link>
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 editorial-card-grid">
          {latestStories.map((article) => (
            <Link
              key={article.id}
              href="/article"
              className="no-underline text-inherit bg-white border border-[#EFEDE7] rounded-[16px] overflow-hidden flex flex-col transition-all duration-[280ms] hover:-translate-y-[5px] hover:shadow-[0_22px_40px_-24px_rgba(20,21,26,0.42)] hover:border-[#E6E3DB]"
            >
              {/* Thumbnail */}
              <div className="relative editorial-card-media overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.07]"
                  sizes="(max-width: 640px) 100vw, 280px"
                />
                {/* Subtle bottom fade */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/55 pointer-events-none" />

                {/* Category badge */}
                <span className="absolute top-3 left-3 bg-white/94 text-[#16151A] text-[11px] font-bold tracking-[0.4px] uppercase px-[10px] py-[5px] rounded-[7px]">
                  {article.category}
                </span>

                {/* Author avatar + name */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                  <div className="relative w-6.5 h-6.5 rounded-full overflow-hidden border-2 border-white/70">
                    <Image
                      src={article.avatar}
                      alt={article.author}
                      fill
                      className="object-cover"
                      sizes="26px"
                    />
                  </div>
                  <span className="text-[12.5px] font-semibold">{article.author}</span>
                </div>
              </div>

              {/* Text body */}
              <div className="p-4 flex flex-col flex-1">
                <h3
                  className="font-semibold text-[18.5px] leading-[1.24] tracking-[-0.2px] text-[#16151A] font-newsreader"
                >
                  {article.title}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-[#6B6A70] mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-3 text-[12px] text-[#8E8D94]">
                  <span>{article.date}</span>
                  <span className="text-[#D8D5CD]">|</span>
                  <span>{article.read}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside className="flex flex-col gap-5">

        {/* Popular Categories */}
        <div className="bg-white border border-[#EFEDE7] rounded-[16px] px-4.5 pt-4.5 pb-2">
          <h3 className="text-[12px] font-bold tracking-[1px] uppercase text-[#8E8D94] mb-1.5">
            Popular Categories
          </h3>
          <div className="flex flex-col">
            {popularCategories.map((cat) => (
              <Link
                key={cat.id}
                href="/category"
                className="flex items-center gap-3 py-2.75 px-1 no-underline border-b border-[#F4F2EC] last:border-0 transition-all duration-200 hover:pl-2"
              >
                {/* Icon */}
                <span
                  className="flex-none w-8.5 h-8.5 rounded-[9px] flex items-center justify-center font-extrabold text-[14px] font-newsreader"
                  style={{ background: cat.bg, color: cat.fg }}
                >
                  {cat.glyph}
                </span>
                <span className="text-[14px] font-semibold text-[#16151A] flex-1">
                  {cat.name}
                </span>
                <span className="text-[12px] font-bold text-[#8E8D94] bg-[#F4F2EC] px-2.25 py-0.75 rounded-full">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Tags */}
        <div className="bg-white border border-[#EFEDE7] rounded-[16px] p-4.5">
          <h3 className="text-[12px] font-bold tracking-[1px] uppercase text-[#8E8D94] mb-3.5">
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <Link
                key={tag}
                href="/category"
                className="text-[12.5px] font-semibold text-[#57565C] bg-[#F6F4EE] border border-[#EFEDE7] px-3 py-1.5 rounded-full no-underline transition-all duration-200 hover:bg-[#16151A] hover:text-white hover:border-[#16151A]"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Author Spotlight */}
        {/* <div className="bg-white border border-[#EFEDE7] rounded-[16px] p-5 text-center">
          <span className="text-[11px] font-bold tracking-[0.8px] uppercase text-[#E63946]">
            Author Spotlight
          </span>
          <p
            className="text-[19px] font-semibold mt-2.5 font-newsreader"
          >
            Motalib Rahman
          </p>
          <p className="text-[12.5px] leading-normal text-[#8E8D94] mt-1.5">
            Senior economy writer · 128 stories in বাংলা &amp; English
          </p>
          <Link
            href="/article"
            className="inline-block mt-3.5 bg-[#16151A] text-white text-[12.5px] font-bold px-5 py-[9px] rounded-[9px] no-underline transition-colors duration-200 hover:bg-[#E63946]"
          >
            Follow
          </Link>
        </div> */}
      </aside>
    </section>
  );
}
