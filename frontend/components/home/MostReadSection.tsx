// ─────────────────────────────────────────────────────────────────────────────
// MostReadSection — 3-column × 2-row numbered grid.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { mostReadItems } from "@/lib/data/home-data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function MostReadSection() {
  return (
    <section>
      <SectionHeader title="Most Read This Week" linkHref="/category" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3.5">
        {mostReadItems.map((item) => (
          <Link
            key={item.id}
            href={`/blog/details/${item.slug}`}
            className="flex gap-3.5 items-center bg-surface border border-line rounded-card p-3 no-underline transition-all duration-300 hover:border-ink hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-22px_rgba(20,21,26,0.42)]"
          >
            <span
              className={`flex-none text-[30px] font-bold w-8 text-center leading-none font-newsreader ${item.numClass}`}
            >
              {item.num}
            </span>

            <div className="relative flex-none w-16 h-16 rounded-[10px] overflow-hidden">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-[0.5px] uppercase text-brand">
                {item.category}
              </span>
              <h3 className="font-semibold text-[15px] leading-[1.22] mt-1 text-ink line-clamp-2 font-newsreader">
                {item.title}
              </h3>
              <div className="flex items-center gap-1.5 text-[11px] text-ink-3 mt-1.5">
                <Eye size={12} strokeWidth={2} />
                <span>{item.views}</span>
                <span>•</span>
                <span>{item.read}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
