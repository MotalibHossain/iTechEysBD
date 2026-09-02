// ─────────────────────────────────────────────────────────────────────────────
// EditorsPicksSection
// Left  : Asymmetric mosaic (cover story + top image + accent + 3 mini cards)
// Right : Sidebar with Popular Categories + Trending Tags (moved from Latest Stories)
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import {
  editorFeature,
  editorPickTop,
  editorPickAccent,
  editorPicksRow,
  popularCategories,
  trendingTags,
} from "@/lib/data/home-data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function EditorsPicksSection() {
  return (
    <section>
      <SectionHeader title="Editor's Picks" kicker="Curated" />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_var(--sidebar-w)] gap-6">

        {/* Mosaic ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-6 auto-rows-auto md:auto-rows-fr gap-4 md:min-h-130">
          {/* Cover story */}
          <Link
            href={`/blog/details/${editorFeature.slug}`}
            className="col-span-6 aspect-19/9 md:aspect-auto md:col-span-4 md:row-span-2 relative rounded-card-lg overflow-hidden no-underline"
          >
            <Image
              src={editorFeature.image}
              alt={editorFeature.title}
              fill
              className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.05]"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(37,73,138,0.35),rgba(12,10,14,0.9))]" />
            <div className="absolute p-4 md:inset-0 md:p-8 flex flex-col justify-end text-white">
              <span className="self-start bg-brand text-white text-[11px] font-bold tracking-[0.6px] uppercase px-3 py-1.5 rounded-badge">
                Cover Story
              </span>
              <h3 className="font-semibold leading-[1.15] mt-3.5 tracking-[-0.4px] max-w-[82%] font-newsreader md:text-feature text-[20px]">
                {editorFeature.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-white/85 mt-2.5 max-w-[74%] line-clamp-2">
                {editorFeature.excerpt}
              </p>
              <span className="hidden md:block text-[12.5px] text-white/80 mt-3.5">
                {editorFeature.author} • {editorFeature.date} • {editorFeature.read}
              </span>
            </div>
          </Link>

          {/* Top image */}
          <Link
            href={`/blog/details/${editorPickTop.slug}`}
            className="col-span-6 aspect-4/3 md:aspect-auto md:col-span-2 md:row-span-1 relative rounded-card overflow-hidden no-underline"
          >
            <Image
              src={editorPickTop.image}
              alt={editorPickTop.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.07]"
              sizes="220px"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <span className="text-[10px] font-bold tracking-[0.5px] uppercase text-[#FF8A94]">
                {editorPickTop.category}
              </span>
              <h4 className="font-semibold text-[16px] leading-[1.2] mt-1 font-newsreader">
                {editorPickTop.title}
              </h4>
            </div>
          </Link>

          {/* Accent card */}
          <Link
            href={`/blog/details/${editorPickAccent.slug}`}
            className="col-span-6 min-h-35 md:min-h-0 md:col-span-2 md:row-span-1 rounded-card p-4.5 text-white no-underline flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_34px_-22px_rgba(230,57,70,0.6)] bg-[linear-gradient(165deg,#E63946,#B81C2B)]"
          >
            <span className="text-[10px] font-bold tracking-[0.5px] uppercase text-white/85">
              {editorPickAccent.category}
            </span>
            <h4 className="font-semibold text-[17px] leading-[1.2] mt-auto font-newsreader">
              {editorPickAccent.title}
            </h4>
            <span className="text-[11.5px] text-white/85 mt-1.5">{editorPickAccent.read}</span>
          </Link>

          {/* 3 mini cards */}
          {editorPicksRow.map((pick) => (
            <Link
              key={pick.id}
              href={`/blog/details/${pick.slug}`}
              className="flex col-span-6 md:col-span-2 md:row-span-1 md:h-27 gap-3 items-center bg-surface border border-line rounded-card p-3 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-22px_rgba(20,21,26,0.4)] hover:border-line-3"
            >
              <div className="relative flex-none w-19 h-19 rounded-[11px] overflow-hidden">
                <Image src={pick.image} alt={pick.title} fill className="object-cover" sizes="76px" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold tracking-[0.5px] uppercase text-brand">
                  {pick.category}
                </span>
                <h4 className="font-semibold text-[15px] leading-[1.22] mt-1 text-ink line-clamp-2 font-newsreader">
                  {pick.title}
                </h4>
                <span className="text-[11px] text-ink-3 mt-1 block">{pick.read}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Sidebar ─────────────────────────────────────────────────────── */}
        <aside className="flex flex-col gap-5">

          {/* Popular Categories */}
          <div className="bg-surface border border-line rounded-card-lg px-4.5 pt-4.5 pb-2">
            <h3 className="text-[12px] font-bold tracking-[1px] uppercase text-ink-3 mb-1.5">
              Popular Categories
            </h3>
            <div className="flex flex-col">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href="/category"
                  className="flex items-center gap-3 py-2.5 px-1 no-underline border-b border-line-4 last:border-0 transition-all duration-200 hover:pl-2"
                >
                  <span
                    className="flex-none w-8.5 h-8.5 rounded-[9px] flex items-center justify-center font-extrabold text-[14px] font-newsreader"
                    style={{ background: cat.bg, color: cat.fg }}
                  >
                    {cat.glyph}
                  </span>
                  <span className="text-[14px] font-semibold text-ink flex-1">{cat.name}</span>
                  <span className="text-[12px] font-bold text-ink-3 bg-line-4 px-2.5 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
