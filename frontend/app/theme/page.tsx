"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useState } from "react";
import { featuredTheme, themeFilters, themeStats } from "@/lib/data/page-data";

export default function Page() {
  const [active, setActive] = useState(themeFilters[0]);
  return (
    <main className="container flex flex-col gap-8 py-10">
      <header className="mx-auto max-w-225 text-center">
        <span className="text-xs font-bold uppercase tracking-[1.4px] text-brand">
          Theme Marketplace
        </span>
        <h1 className="mt-3 font-newsreader text-[clamp(34px,5vw,52px)] font-semibold leading-[1.1]">
          Premium blog themes,
          <br />
          ready to publish
        </h1>
        <p className="mx-auto mt-4 max-w-150 text-base leading-[1.6] text-ink-2">
          Hand-crafted, fully responsive themes built for editorial sites.
          Download free starters or go pro.
        </p>
      </header>
      <div className="flex justify-center gap-6 text-center">
        {themeStats.map(([number, label]) => (
          <div key={label}>
            <div className="font-newsreader text-3xl font-bold">{number}</div>
            <div className="text-[13px] text-ink-3">{label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {themeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`rounded-full border px-4 py-2.5 text-sm font-bold ${active === filter ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-2"}`}
          >
            {filter}
          </button>
        ))}
      </div>
      <article className="mx-auto w-full max-w-140 overflow-hidden rounded-card-lg border border-line bg-white">
        <div className="relative aspect-16/11">
          <Image
            src={featuredTheme.image}
            alt={`${featuredTheme.name} theme preview`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 560px"
          />
          <span className="absolute left-3 top-3 rounded-badge bg-[#E7EFE3] px-2.5 py-1 text-[11px] font-bold uppercase text-[#3F7D4E]">
            {featuredTheme.badge}
          </span>
        </div>
        <div className="p-5">
          <div className="flex justify-between">
            <h2 className="font-newsreader text-xl font-semibold">
              {featuredTheme.name}
            </h2>
            <span className="text-sm font-bold">★ {featuredTheme.rating}</span>
          </div>
          <p className="mt-2 text-sm leading-[1.55] text-ink-2">
            {featuredTheme.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {featuredTheme.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-badge bg-surface-warm-strong px-2.5 py-1.5 text-xs font-semibold text-ink-3"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line-4 pt-4">
            <span className="font-newsreader text-[22px] font-bold">
              {featuredTheme.price}
            </span>
            <button className="inline-flex items-center gap-2 rounded-btn bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-brand">
              <Download size={15} />
              Download
            </button>
          </div>
        </div>
      </article>
      <section className="rounded-card-xl bg-linear-to-br from-ink to-[#2A2730] p-8 text-white md:p-12">
        <h2 className="font-newsreader text-3xl font-semibold">
          Get every theme with iTechEys Pro
        </h2>
        <p className="mt-3 max-w-130 text-[15px] leading-[1.6] text-[#B9B7C0]">
          One license, unlimited downloads, lifetime updates and priority
          support.
        </p>
      </section>
    </main>
  );
}
