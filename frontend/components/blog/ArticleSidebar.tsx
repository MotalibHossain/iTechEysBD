import Link from "next/link";
import { AlignLeft, TrendingUp } from "lucide-react";
import { Article } from "@/lib/data/article-data";
import NewsletterForm from "./NewsletterForm";

// ── Table of Contents ─────────────────────────────────────────────────────────

function TableOfContents({ toc }: { toc: Article["toc"] }) {
  return (
    <div className="bg-white border border-[#EFEDE7] rounded-[16px] overflow-hidden">
      {/* Header */}
      <div className="px-4.5 py-3.5 bg-[#16151A] flex items-center gap-2.5">
        <AlignLeft size={14} strokeWidth={2.5} className="text-[#E63946]" />
        <h3 className="text-[11.5px] font-bold tracking-[1px] uppercase text-white">
          In this article
        </h3>
      </div>

      {/* TOC items */}
      <div className="p-3">
        {toc.map((item, idx) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-start gap-3 p-2.5 rounded-[10px] no-underline transition-all duration-200 hover:bg-[#F6F4EE]"
          >
            {/* Step number */}
            <span className="shrink-0 w-6 h-6 rounded-[8px] bg-[#F1EFE9] text-[#8E8D94] text-[11px] font-bold flex items-center justify-center group-hover:bg-[#FCE4E6] group-hover:text-[#E63946] transition-colors mt-px">
              {idx + 1}
            </span>
            <span className="text-[13.5px] leading-[1.45] text-[#57565C] group-hover:text-[#16151A] transition-colors">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-4.5 py-2.5 border-t border-[#EFEDE7] bg-[#FAF9F6]">
        <p className="text-[11px] text-[#B0AEB6] text-center tracking-[0.2px]">
          Click any section to jump
        </p>
      </div>
    </div>
  );
}

// ── Popular Posts ─────────────────────────────────────────────────────────────

function PopularPosts({ posts }: { posts: Article["popularPosts"] }) {
  return (
    <div className="bg-white border border-[#EFEDE7] rounded-[16px] overflow-hidden">
      {/* Header */}
      <div className="px-4.5 py-3.5 border-b border-[#EFEDE7] flex items-center gap-2.5">
        <TrendingUp size={14} strokeWidth={2.5} className="text-[#E63946]" />
        <h3 className="text-[11.5px] font-bold tracking-[1px] uppercase text-[#57565C]">
          Popular Posts
        </h3>
      </div>

      <div className="p-4 flex flex-col divide-y divide-[#F1EFE9]">
        {posts.map((post, idx) => (
          <Link
            key={post.slug}
            href={`/blog/details/${post.slug}`}
            className="flex gap-3.25 items-start no-underline group py-3.5 first:pt-0 last:pb-0"
          >
            {/* Ordinal */}
            <span className={`font-newsreader text-[20px] font-bold shrink-0 leading-none mt-0.5 ${idx < 3 ? "text-[#E63946]/25" : "text-[#EAE8E2]"}`}>
              {post.num}
            </span>
            <div className="min-w-0">
              <h4 className="font-newsreader font-semibold text-[14.5px] leading-[1.35] text-[#16151A] group-hover:text-[#E63946] transition-colors duration-200 line-clamp-2">
                {post.title}
              </h4>
              <span className="text-[11.5px] text-[#B0AEB6] mt-1 block">{post.views} views</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Newsletter Widget ─────────────────────────────────────────────────────────

function NewsletterWidget() {
  return (
    <div className="bg-[#16151A] rounded-[16px] p-5.5 text-white">
      <h3 className="font-newsreader text-[20px] font-semibold leading-[1.2]">
        Don&apos;t miss a story
      </h3>
      <p className="text-[13px] leading-[1.55] text-[#9C9AA3] mt-2">
        Weekly highlights in EN &amp; বাংলা.
      </p>
      <NewsletterForm />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ArticleSidebar({ article }: { article: Article }) {
  return (
    <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
      <TableOfContents toc={article.toc} />
      <PopularPosts posts={article.popularPosts} />
      <NewsletterWidget />
    </aside>
  );
}

