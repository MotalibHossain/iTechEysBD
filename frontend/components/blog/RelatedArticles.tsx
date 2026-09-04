import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/data/article-data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function RelatedArticles({ related }: { related: Article["related"] }) {
  return (
    <section>
      <SectionHeader title="Related Articles" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/details/${item.slug}`}
            className="group no-underline text-inherit bg-surface border border-line rounded-card-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-24px_rgba(20,21,26,0.42)]"
          >
            <div className="relative aspect-16/10 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
              />
              <span className="absolute top-3 left-3 bg-white/95 text-ink text-[11px] font-bold tracking-[0.4px] uppercase px-2.5 py-1 rounded-badge">
                {item.category}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-newsreader font-semibold text-[18px] leading-tight text-ink">
                {item.title}
              </h3>
              <p className="text-[12px] text-ink-3 mt-2.5">
                {item.date} · {item.read}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
