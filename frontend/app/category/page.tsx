"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { latestStories } from "@/lib/data/home-data";
import { categoryHeroes, categoryNames, categoryWidgetLists, categoryWidgetTabs } from "@/lib/data/page-data";

const card = "rounded-card-lg border border-line bg-white";

function NewsletterCard() {
  const [sent, setSent] = useState(false);
  return <div className="rounded-card-lg bg-surface-dark p-5 text-white">
    <h3 className="font-newsreader text-[20px] font-semibold">Get this category by email</h3>
    <p className="mt-2 text-[13px] leading-[1.5] text-[#9C9AA3]">Weekly digest, no spam.</p>
    {sent ? <p className="mt-4 text-sm text-[#B9B7C0]">You&apos;re subscribed. Welcome aboard.</p> : <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-3.5">
      <input required type="email" placeholder="you@email.com" className="w-full rounded-input border border-line-dark bg-surface-dark-2 px-3 py-2.75 text-sm text-white outline-none focus:border-brand" />
      <button className="mt-2.5 w-full rounded-input bg-brand py-3 text-sm font-bold hover:bg-brand-strong">Subscribe</button>
    </form>}
  </div>;
}

export default function Page() {
  const [active, setActive] = useState(0);
  const [widget, setWidget] = useState(0);
  const hero = categoryHeroes[active];
  return (
    <main className="container flex flex-col gap-8 py-10">
      <section>
        <nav className="mb-5 flex gap-2 text-[13px] text-ink-3">
          <Link href="/">Home</Link>
          <span>›</span>
          <span className="font-semibold text-ink">Categories</span>
        </nav>
        <div className="rounded-card-xl bg-linear-to-br from-ink to-[#2A2730] p-7 text-white md:p-10">
          <span className="inline-block rounded-badge bg-brand px-3 py-1.5 text-xs font-bold uppercase tracking-[.6px]">
            {categoryNames[active]}
          </span>
          <h1
            className="mt-3.5 max-w-[760px] font-newsreader text-[clamp(30px,4.4vw,46px)] font-semibold leading-[1.12]"
            dangerouslySetInnerHTML={{ __html: hero.headline }}
          />
          <p className="mt-3 max-w-[680px] text-[15.5px] leading-[1.6] text-[#B9B7C0]">
            {hero.blurb}
          </p>
          <span className="mt-4 block text-[13px] text-ink-4">
            {hero.count} articles · updated daily
          </span>
        </div>
      </section>
      <section>
        <div className="flex gap-2 overflow-x-auto border-b border-line-3">
          {categoryNames.map((name, i) => (
            <button
              key={name}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap border-b-2 px-3.5 py-3 text-sm ${active === i ? "border-brand font-bold text-brand" : "border-transparent text-ink-2"}`}
            >
              {name}
            </button>
          ))}
        </div>
      </section>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            {latestStories.map((article) => (
              <Link
                href={`/blog/details/${article.slug}`}
                key={article.id}
                className={`${card} group overflow-hidden no-underline transition hover:-translate-y-1 hover:shadow-[0_22px_40px_-24px_rgba(20,21,26,.42)]`}
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <span className="absolute left-3 top-3 rounded-badge bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.4px]">
                    {article.category}
                  </span>
                </div>
                <div className="flex min-h-45 flex-col p-4">
                  <h2 className="font-newsreader text-[19px] font-semibold leading-[1.24]">
                    {article.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[13.5px] leading-[1.55] text-ink-2">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto flex gap-2 pt-4 text-xs text-ink-3">
                    <span className="font-semibold text-ink-2">
                      {article.author}
                    </span>
                    <span>•</span>
                    <span>{article.read}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-2">
            <button
              aria-label="Previous page"
              className="h-10 w-10 rounded-input border border-line bg-white"
            >
              <ChevronLeft size={17} className="mx-auto" />
            </button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`h-10 min-w-10 rounded-input border px-3 text-sm font-bold ${page === 1 ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-2"}`}
              >
                {page}
              </button>
            ))}
            <button
              aria-label="Next page"
              className="h-10 w-10 rounded-input border border-line bg-white"
            >
              <ChevronRight size={17} className="mx-auto" />
            </button>
          </div>
        </div>
        <aside className="flex flex-col gap-5">
          <div className={`${card} overflow-hidden`}>
            <div className="grid grid-cols-3">
              {categoryWidgetTabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setWidget(i)}
                  className={`border-b-2 px-2 py-3.5 text-[13px] font-bold ${widget === i ? "border-brand bg-white text-brand" : "border-line bg-surface-warm text-ink-3"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-1">
              {categoryWidgetLists[widget].map((item) => (
                <Link
                  key={item}
                  href="/category"
                  className="flex gap-2.5 border-b border-line-4 px-4 py-3 text-sm leading-[1.4] text-ink-2 no-underline hover:bg-[#FBF4F4] hover:text-brand"
                >
                  <span className="font-bold text-brand">›</span>
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <NewsletterCard />
          <div className="flex h-70 flex-col items-center justify-center rounded-card-lg border-[1.5px] border-dashed border-[#D8D5CD] bg-[#FBFAF7] text-center text-ink-3">
            <span className="text-[11px] font-bold uppercase tracking-[1px]">
              Advertisement
            </span>
            <span className="mt-1.5 text-[13px]">300 × 280</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
