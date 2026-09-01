"use client";

// ─────────────────────────────────────────────────────────────────────────────
// EditorsPicksSection
// Left  : Asymmetric mosaic grid
//           • Big cover-story card (spans 4 cols × 2 rows)
//           • Image card top-right
//           • Accent gradient card
//           • 3 horizontal mini-cards in a bottom row
// Right : Tabbed article list widget (নতুন / হট / অন্যান্য)
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  editorFeature,
  editorPickTop,
  editorPickAccent,
  editorPicksRow,
  editorTabs,
} from "@/lib/data/home-data";

export default function EditorsPicksSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section>

      {/* ── Section header ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3.5 mb-5.5">
        <h2
          className="editorial-section-title"
        >
          Editor&apos;s Picks
        </h2>
        <span className="flex-1 h-px bg-[#E6E3DB]" />
        <span className="text-[12.5px] font-semibold tracking-[1px] uppercase text-[#8E8D94]">
          Curated
        </span>
      </div>

      {/* ── Content: mosaic + tabbed widget ──────────────────────────────────── */}
      <div className="home-content-grid">

        {/* ── Mosaic grid ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-6 auto-rows-auto md:auto-rows-fr gap-4 md:min-h-130">
          <Link href="/article"
            className="col-span-6 aspect-[19/9] md:aspect-auto md:col-span-4 md:row-span-2 relative rounded-[18px] overflow-hidden no-underline"
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                fill
                src={editorFeature.image}
                alt={editorFeature.title}
                className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.05]"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(37,73,138,0.35),rgba(12,10,14,0.9))]" />
            {/* Text */}
            <div className="absolute p-4 md:inset-0 md:p-7.5 flex flex-col justify-end text-white">
              <span className="self-start bg-[#E63946] text-white text-[11px] font-bold tracking-[0.6px] uppercase px-3 py-1.5 rounded-[7px]">
                Cover Story
              </span>
              <h3 className="font-semibold leading-[1.14] mt-3.5 tracking-[-0.4px] max-w-[82%] font-newsreader md:text-clamp-feature" >
                {editorFeature.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-white/85 mt-2.5 max-w-[74%] line-clamp-2"> {editorFeature.excerpt} </p>
              <span className="hidden md:block text-[12.5px] text-white/78 mt-3.5">
                {editorFeature.author} • {editorFeature.date} • {editorFeature.read}
              </span>
            </div>
          </Link>

          {/* Image card — top right (2 cols × 1 row) */}
          <Link
            href="/article"
            className="col-span-6 aspect-4/3 md:aspect-auto md:col-span-2 md:row-span-1 relative rounded-[16px] overflow-hidden no-underline"
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={editorPickTop.image}
                alt={editorPickTop.title}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.07]"
                sizes="200px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <span className="text-[10px] font-bold tracking-[0.5px] uppercase text-[#FF8A94]">
                {editorPickTop.category}
              </span>
              <h4
                className="font-semibold text-[16px] leading-[1.2] mt-1 font-newsreader"
              >
                {editorPickTop.title}
              </h4>
            </div>
          </Link>

          {/* Accent gradient card (2 cols × 1 row) */}
          <Link
            href="/article"
            className="col-span-6 min-h-35 md:min-h-0 md:col-span-2 md:row-span-1 rounded-[16px] p-4.5 text-white no-underline flex flex-col transition-all duration-280 hover:-translate-y-0.7 hover:shadow-[0_20px_34px_-22px_rgba(230,57,70,0.6)] bg-[linear-gradient(165deg,#E63946,#B81C2B)]"
          >
            <span className="text-[10px] font-bold tracking-[0.5px] uppercase text-white/85">
              {editorPickAccent.category}
            </span>
            <h4
              className="font-semibold text-[17px] leading-[1.2] mt-auto font-newsreader"
            >
              {editorPickAccent.title}
            </h4>
            <span className="text-[11.5px] text-white/85 mt-1.5">
              {editorPickAccent.read}
            </span>
          </Link>

          {/* Bottom row: 3 horizontal mini-cards (each 2 cols × 1 row) */}
          {editorPicksRow.map((pick) => (
            <Link
              key={pick.id}
              href="/article"
              className="flex col-span-6 md:col-span-2 md:row-span-1 md:h-27 gap-3 items-center bg-white border border-[#EFEDE7] rounded-[16px] p-3 no-underline transition-all duration-280 hover:-translate-y-0.7 hover:shadow-[0_18px_32px_-22px_rgba(20,21,26,0.4)] hover:border-[#E6E3DB]"
            >
              <div className="relative flex-none w-19 h-19 rounded-[11px] overflow-hidden">
                <Image
                  src={pick.image}
                  alt={pick.title}
                  fill
                  className="object-cover"
                  sizes="76px"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold tracking-[0.5px] uppercase text-[#E63946]">
                  {pick.category}
                </span>
                <h4
                  className="font-semibold text-[15px] leading-[1.22] mt-0.75 text-[#16151A] line-clamp-2 font-newsreader"
                >
                  {pick.title}
                </h4>
                <span className="text-[11px] text-[#8E8D94] mt-1 block">{pick.read}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Tabbed list widget ────────────────────────────────────────────── */}
        <aside className="bg-white border border-[#EFEDE7] rounded-[18px] overflow-hidden self-start">

          {/* Tab buttons */}
          <div className="flex">
            {editorTabs.labels.map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-[15px] px-2 border-none text-[13.5px] font-bold transition-colors duration-200 cursor-pointer border-b-2 ${i === activeTab
                  ? "bg-white text-[#E63946] border-b-[#E63946]"
                  : "bg-[#FAF7F2] text-[#8E8D94] border-b-[#EFEDE7]"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Article list for active tab */}
          <div className="px-1 py-1.5">
            {editorTabs.lists[activeTab].map((headline, i) => (
              <Link
                key={i}
                href="/article"
                className="flex gap-[11px] items-start px-4 py-[13px] no-underline border-b border-[#F4F2EC] last:border-0 transition-colors duration-200 hover:bg-[#FBF4F4] group"
              >
                <span className="flex-none text-[#E63946] font-extrabold mt-[1px]">›</span>
                <span
                  className="text-[14.5px] leading-[1.4] text-[#2C2B31] font-medium group-hover:text-[#E63946] transition-colors font-newsreader"
                >
                  {headline}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
