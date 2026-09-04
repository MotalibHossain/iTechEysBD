"use client";

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection
// Left  : Auto-rotating image carousel with prev/next controls & dots
// Right : "Trending Now" numbered-thumbnail sidebar
// Notes :
//   • Sidebar width comes from --sidebar-w (globals.css) → change once.
//   • Slide titles are <h3>: only ONE <h1> should exist per page (SEO).
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

  useEffect(() => {
    const iv = setInterval(next, 5500);
    return () => clearInterval(iv);
  }, [next]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_var(--sidebar-w)] gap-6">

      {/* Carousel ───────────────────────────────────────────────────────── */}
      <div className="relative rounded-card-xl overflow-hidden aspect-video lg:aspect-auto lg:min-h-110 shadow-sm">
        {heroSlides.map((slide, i) => (
          <article
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/20 to-black/90" />

            <Link
              href={`/blog/details/${slide.slug}`}
              className="absolute inset-x-0 bottom-0 px-6 md:px-10 pb-14 pt-8 text-white no-underline block"
            >
              <span className="inline-block bg-brand text-white text-[11px] font-bold tracking-[0.6px] uppercase px-3 py-1.5 rounded-badge">
                {slide.category}
              </span>
              <h3 className="font-semibold leading-[1.15] tracking-tight mt-4 max-w-[85%] font-newsreader text-hero">
                {slide.title}
              </h3>
              <div className="flex items-center gap-3 mt-4 text-[13px] text-white/90">
                <span className="font-bold">{slide.author}</span>
                <span className="opacity-60">•</span>
                <span>{slide.date}</span>
                <span className="opacity-60">•</span>
                <span>{slide.read}</span>
              </div>
            </Link>
          </article>
        ))}

        {/* Nav arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute top-1/2 left-4 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-brand transition-colors duration-200 cursor-pointer"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-brand transition-colors duration-200 cursor-pointer"
        >
          <ChevronRight size={20} strokeWidth={2.4} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-6 md:left-10 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trending sidebar ────────────────────────────────────────────────── */}
      <aside className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-1.75 h-1.75 rounded-full bg-brand shadow-[0_0_0_4px_rgba(230,57,70,0.16)]" />
          <h2 className="text-[12.5px] font-bold tracking-[1.2px] uppercase text-ink-2">
            Trending Now
          </h2>
        </div>

        {trendingItems.map((item) => (
          <Link
            key={item.id}
            href={`/blog/details/${item.slug}`}
            className="flex gap-3 items-center bg-surface border border-line rounded-card p-2 flex-1 no-underline transition-all duration-250 hover:border-ink hover:translate-x-0.5 hover:shadow-[0_12px_24px_-16px_rgba(20,21,26,0.35)]"
          >
            <div className="relative flex-none w-16.5 h-13.5 rounded-input overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="66px"
              />
              <span className="absolute top-1 left-1 w-4.75 h-4.75 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold flex items-center justify-center">
                {item.num}
              </span>
            </div>

            <div className="min-w-0">
              <span className="text-[9.5px] font-bold tracking-[0.5px] uppercase text-brand">
                {item.category}
              </span>
              <h3 className="font-semibold text-[13.5px] leading-[1.2] mt-0.5 text-ink line-clamp-2 font-newsreader">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}

        <Link
          href="/category"
          className="text-center text-[13px] font-bold text-ink no-underline border border-line bg-surface rounded-card py-2.5 transition-all duration-200 hover:bg-ink hover:text-white"
        >
          See all trending →
        </Link>
      </aside>
    </section>
  );
}
