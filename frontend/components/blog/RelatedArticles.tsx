import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/data/article-data";

export default function RelatedArticles({ related }: { related: Article["related"] }) {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-center gap-3.5 mb-6">
        <h2 className="font-newsreader text-[28px] font-semibold tracking-[-0.5px] text-[#16151A] whitespace-nowrap">
          Related Articles
        </h2>
        <span className="flex-1 h-px bg-[#E6E3DB]" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5.5">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/details/${item.slug}`}
            className="group no-underline text-inherit bg-white border border-[#EFEDE7] rounded-[16px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.25 hover:shadow-[0_22px_40px_-24px_rgba(20,21,26,0.42)]"
          >
            {/* Thumbnail */}
            <div className="relative h-43 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
              />
              <span className="absolute top-3 left-3 bg-white/94 text-[#16151A] text-[11px] font-bold tracking-[0.4px] uppercase px-2.5 py-1.25 rounded-[7px]">
                {item.category}
              </span>
            </div>

            {/* Info */}
            <div className="px-4.25 pt-4 pb-4.5">
              <h3 className="font-newsreader font-semibold text-[18px] leading-[1.24] text-[#16151A]">
                {item.title}
              </h3>
              <p className="text-[12px] text-[#8E8D94] mt-2.75">
                {item.date} · {item.read}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
