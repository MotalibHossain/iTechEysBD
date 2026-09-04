// ─────────────────────────────────────────────────────────────────────────────
// RecommendedSection — "For You" heading + 3-column cards + Load more.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { recommendedItems } from "@/lib/data/home-data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function RecommendedSection() {
  return (
    <section>
      <SectionHeader
        kicker="For You"
        title="Recommended Reads"
        linkHref="/category"
        linkLabel="Personalize →"
        variant="split"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommendedItems.map((article) => (
          <Link
            key={article.id}
            href={`/blog/details/${article.slug}`}
            className="no-underline text-inherit bg-surface border border-line rounded-card-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-24px_rgba(20,21,26,0.42)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.07]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              />
              <span className="absolute top-3 left-3 bg-white/95 text-ink text-[11px] font-bold tracking-[0.4px] uppercase px-2.5 py-1 rounded-badge">
                {article.category}
              </span>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-[19px] leading-[1.25] tracking-[-0.2px] font-newsreader text-ink">
                {article.title}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-ink-2 mt-2 line-clamp-2">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-2 mt-auto pt-4 text-[12.5px] text-ink-3">
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image src={article.avatar} alt={article.author} fill className="object-cover" sizes="24px" />
                </div>
                <span className="font-semibold text-ink-2">{article.author}</span>
                <span className="text-line-3">•</span>
                <span>{article.read}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="inline-flex items-center gap-2 bg-surface border border-line text-ink text-[14.5px] font-bold px-7 py-3.5 rounded-btn hover:bg-ink hover:text-white hover:border-ink transition-all duration-200 cursor-pointer">
          Load more stories
          <ArrowDown size={16} strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
}
