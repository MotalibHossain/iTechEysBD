import Link from "next/link";
import { AlignLeft, TrendingUp } from "lucide-react";
import { Article } from "@/lib/data/article-data";
import NewsletterForm from "./NewsletterForm";

// ── Table of Contents ────────────────────────────────────────────────────────

function TableOfContents({ toc }: { toc: Article["toc"] }) {
  return (
    <div className="bg-surface border border-line rounded-card overflow-hidden">
      <div className="px-4.5 py-3.5 bg-surface-dark flex items-center gap-2.5">
        <AlignLeft size={14} strokeWidth={2.5} className="text-brand" />
        <h3 className="text-[11.5px] font-bold tracking-[1px] uppercase text-white">
          In this article
        </h3>
      </div>

      <div className="p-3">
        {toc.map((item, idx) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-start gap-3 p-2.5 rounded-input no-underline transition-all duration-200 hover:bg-surface-warm"
          >
            <span className="shrink-0 w-6 h-6 rounded-badge bg-surface-warm-strong text-ink-3 text-[11px] font-bold flex items-center justify-center group-hover:bg-brand-tint group-hover:text-brand transition-colors mt-px">
              {idx + 1}
            </span>
            <span className="text-[13.5px] leading-[1.45] text-ink-2 group-hover:text-ink transition-colors">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      <div className="px-4.5 py-2.5 border-t border-line bg-surface-2">
        <p className="text-[11px] text-ink-4 text-center tracking-[0.2px]">
          Click any section to jump
        </p>
      </div>
    </div>
  );
}

// ── Popular Posts ────────────────────────────────────────────────────────────

function PopularPosts({ posts }: { posts: Article["popularPosts"] }) {
  return (
    <div className="bg-surface border border-line rounded-card overflow-hidden">
      <div className="px-4.5 py-3.5 border-b border-line flex items-center gap-2.5">
        <TrendingUp size={14} strokeWidth={2.5} className="text-brand" />
        <h3 className="text-[11.5px] font-bold tracking-[1px] uppercase text-ink-2">
          Popular Posts
        </h3>
      </div>

      <div className="p-4 flex flex-col divide-y divide-line-4">
        {posts.map((post, idx) => (
          <Link
            key={post.slug}
            href={`/blog/details/${post.slug}`}
            className="flex gap-3 items-start no-underline group py-3.5 first:pt-0 last:pb-0"
          >
            <span
              className={`font-newsreader text-[20px] font-bold shrink-0 leading-none mt-0.5 ${
                idx < 3 ? "text-brand/25" : "text-line-2"
              }`}
            >
              {post.num}
            </span>
            <div className="min-w-0">
              <h4 className="font-newsreader font-semibold text-[14.5px] leading-[1.35] text-ink group-hover:text-brand transition-colors duration-200 line-clamp-2">
                {post.title}
              </h4>
              <span className="text-[11.5px] text-ink-4 mt-1 block">{post.views} views</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Newsletter widget ────────────────────────────────────────────────────────

function NewsletterWidget() {
  return (
    <div className="bg-surface-dark rounded-card p-5 text-white">
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

// ── Main component ───────────────────────────────────────────────────────────

export default function ArticleSidebar({ article }: { article: Article }) {
  return (
    <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
      <TableOfContents toc={article.toc} />
      <PopularPosts posts={article.popularPosts} />
      <NewsletterWidget />
    </aside>
  );
}
