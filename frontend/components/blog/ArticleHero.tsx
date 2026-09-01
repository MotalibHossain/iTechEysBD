import Image from "next/image";
import { Article } from "@/lib/data/article-data";

export default function ArticleHero({ article }: { article: Article }) {
  return (
    <div>
      {/* Hero image */}
      <div className="relative rounded-[22px] overflow-hidden aspect-16/8 shadow-[0_24px_60px_-34px_rgba(20,21,26,0.5)]">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1100px"
        />
      </div>

      {/* Caption */}
      {article.heroCaption && (
        <p className="text-[12.5px] text-[#8E8D94] mt-2.75 text-center italic">
          {article.heroCaption}
        </p>
      )}
    </div>
  );
}
