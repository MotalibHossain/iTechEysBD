"use client";

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection
// Left  : Auto-rotating image carousel with prev/next controls & dot indicators
// Right : "Trending Now" numbered-thumbnail sidebar
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides, trendingItems } from "@/lib/data/home-data";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % heroSlides.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c + heroSlides.length - 1) % heroSlides.length),
    []
  );

  // Auto-advance carousel every 5.5 s
  useEffect(() => {
    const iv = setInterval(next, 5500);
    return () => clearInterval(iv);
  }, [next]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-[30px]">

      {/* ── Carousel ─────────────────────────────────────────────────────────── */}
      <div className="relative rounded-[20px] overflow-hidden min-h-[460px] shadow-sm">

        {/* Slides */}
        {heroSlides.map((slide, i) => (
          <article
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 860px"
            />

            {/* Dark gradient so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/90" />

            {/* Article info at bottom */}
            <Link
              href="/article"
              className="absolute inset-x-0 bottom-0 px-10 pb-16 pt-9 text-white no-underline block"
            >
              <span className="inline-block bg-[#E63946] text-white text-[11px] font-bold tracking-[0.6px] uppercase px-3 py-1.5 rounded-[7px]">
                {slide.category}
              </span>

              <h1
                className="font-semibold leading-[1.12] tracking-tight mt-4 max-w-[80%] font-newsreader text-clamp-hero"
              >
                {slide.title}
              </h1>

              <div className="flex items-center gap-3 mt-4 text-[13.5px] text-white/90">
                <span className="font-bold">{slide.author}</span>
                <span className="opacity-60">•</span>
                <span>{slide.date}</span>
                <span className="opacity-60">•</span>
                <span>{slide.read}</span>
              </div>
            </Link>
          </article>
        ))}

        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute top-1/2 left-[18px] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#E63946] transition-colors duration-200 cursor-pointer"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute top-1/2 right-[18px] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#E63946] transition-colors duration-200 cursor-pointer"
        >
          <ChevronRight size={20} strokeWidth={2.4} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-10 flex gap-2.5 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[5px] rounded-full border-none transition-all duration-300 cursor-pointer ${
                i === current ? "w-[26px] bg-white" : "w-[10px] bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Trending Now sidebar ──────────────────────────────────────────────── */}
      <aside className="flex flex-col gap-[13px]">

        {/* Section label */}
        <div className="flex items-center gap-2">
          <span className="w-[7px] h-[7px] rounded-full bg-[#E63946] shadow-[0_0_0_4px_rgba(230,57,70,0.16)]" />
          <h2 className="text-[12.5px] font-bold tracking-[1.2px] uppercase text-[#57565C]">
            Trending Now
          </h2>
        </div>

        {/* Trending items */}
        {trendingItems.map((item) => (
          <Link
            key={item.id}
            href="/article"
            className="flex gap-[11px] items-center bg-white border border-[#EFEDE7] rounded-[13px] p-2 flex-1 no-underline transition-all duration-[250ms] hover:border-[#16151A] hover:translate-x-[3px] hover:shadow-[0_12px_24px_-16px_rgba(20,21,26,0.35)]"
          >
            {/* Thumbnail + number badge */}
            <div className="relative flex-none w-[66px] h-[54px] rounded-[10px] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="66px"
              />
              <span className="absolute top-1 left-1 w-[19px] h-[19px] rounded-[6px] bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold flex items-center justify-center">
                {item.num}
              </span>
            </div>

            {/* Title */}
            <div className="min-w-0">
              <span className="text-[9.5px] font-bold tracking-[0.5px] uppercase text-[#E63946]">
                {item.category}
              </span>
              <h3
                className="font-semibold text-[13.5px] leading-[1.2] mt-0.5 text-[#16151A] line-clamp-2 font-newsreader"
              >
                {item.title}
              </h3>
            </div>
          </Link>
        ))}

        {/* See all button */}
        <Link
          href="/category"
          className="text-center text-[13px] font-bold text-[#16151A] no-underline border border-[#EFEDE7] bg-white rounded-[12px] py-[11px] transition-all duration-200 hover:bg-[#16151A] hover:text-white"
        >
          See all trending →
        </Link>
      </aside>
    </section>
  );
}
