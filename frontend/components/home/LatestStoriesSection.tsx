"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LatestStoriesSection
// Left  : 3-col article card grid
// Right : Sidebar with Popular Categories + Trending Tags
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { latestStories, editorTabs } from "@/lib/data/home-data";
import SectionHeader from "@/components/ui/SectionHeader";
import { trendingTags } from "@/lib/data/home-data";

export default function LatestStoriesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_var(--sidebar-w)] gap-6">

      {/* Grid ────────────────────────────────────────────────────────────── */}
      <div>
        <SectionHeader title="Latest Stories" linkHref="/category" variant="split" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latestStories.map((article) => (
            <Link
              key={article.id}
              href={`/blog/details/${article.slug}`}
              className="no-underline text-inherit bg-surface border border-line rounded-card-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-24px_rgba(20,21,26,0.42)] hover:border-line-3"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.07]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/55 pointer-events-none" />
                <span className="absolute top-3 left-3 bg-white/95 text-ink text-[11px] font-bold tracking-[0.4px] uppercase px-2.5 py-1 rounded-badge">
                  {article.category}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-white/70">
                    <Image src={article.avatar} alt={article.author} fill className="object-cover" sizes="24px" />
                  </div>
                  <span className="text-[12.5px] font-semibold">{article.author}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-[18px] leading-tight tracking-[-0.2px] text-ink font-newsreader">
                  {article.title}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-ink-2 mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-3 text-[12px] text-ink-3">
                  <span>{article.date}</span>
                  <span className="text-line-3">|</span>
                  <span>{article.read}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tabbed widget ─────────────────────────────────────────────────── */}
      <div className="space-y-5 mt-1.5">
        <aside className="bg-surface border border-line rounded-card-lg overflow-hidden self-start">
          <div className="flex">
            {editorTabs.labels.map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-4 px-2 text-[13.5px] font-bold transition-colors duration-200 cursor-pointer border-b-2 ${i === activeTab
                  ? "bg-surface text-brand border-b-brand"
                  : "bg-[#FAF7F2] text-ink-3 border-b-line"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="px-1 py-1.5">
            {editorTabs.lists[activeTab].map((headline, i) => (
              <Link
                key={i}
                href={`/blog/details/${encodeURIComponent(headline)}`}
                className="flex gap-3 items-start px-4 py-3.5 no-underline border-b border-line-4 last:border-0 transition-colors duration-200 hover:bg-[#FBF4F4] group"
              >
                <span className="flex-none text-brand font-extrabold">›</span>
                <span className="text-[14.5px] leading-[1.4] text-ink font-medium group-hover:text-brand transition-colors font-newsreader">
                  {headline}
                </span>
              </Link>
            ))}
          </div>

        </aside>
        {/* Trending Tags */}
        <div className="bg-surface border border-line rounded-card-lg p-4.5">
          <h3 className="text-[12px] font-bold tracking-[1px] uppercase text-ink-3 mb-3.5">
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <Link
                key={tag}
                href="/category"
                className="text-[12.5px] font-semibold text-ink-2 bg-surface-warm border border-line px-3 py-1.5 rounded-full no-underline transition-all duration-200 hover:bg-ink hover:text-white hover:border-ink"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
