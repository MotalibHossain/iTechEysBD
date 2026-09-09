import Image from "next/image";
import { Camera } from "lucide-react";
import { Article } from "@/lib/data/article-data";

export default function ArticleHero({ article }: { article: Article }) {
  return (
    <figure className="mx-auto w-full">
      {/* Compact modern ratio — no longer oversized */}
      <div className="relative rounded-card-xl overflow-hidden aspect-[21/9] max-h-[380px] shadow-[0_18px_50px_-30px_rgba(20,21,26,0.45)]">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
        />

        {/* Subtle bottom gradient for legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Photo credit chip on image */}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
          <Camera size={11} strokeWidth={2.5} />
          iTechEys Photo
        </div>
      </div>

      {article.heroCaption && (
        <figcaption className="text-[12.5px] text-ink-3 mt-3 text-center italic max-w-[var(--read-max)] mx-auto leading-[1.6]">
          {article.heroCaption}
        </figcaption>
      )}
    </figure>
  );
}
