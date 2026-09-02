import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Article } from "@/lib/data/article-data";
import Avatar from "./Avatar";
import SaveButton from "./SaveButton";

const shareButtons = [
  { label: "X", icon: "𝕏" },
  { label: "LinkedIn", icon: "in" },
  { label: "Facebook", icon: "f" },
  { label: "Share", icon: <ExternalLink size={13} strokeWidth={2.5} /> },
];

const shareBtn =
  "w-10 h-10 rounded-btn border border-line-2 bg-surface flex items-center justify-center " +
  "text-ink-2 text-[13px] font-bold transition-colors duration-200 " +
  "hover:bg-ink hover:text-white hover:border-ink cursor-pointer";

export default function ArticleHeader({ article }: { article: Article }) {
  return (
    <header>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] text-ink-3 mb-6 flex-wrap">
        <Link href="/" className="text-ink-3 hover:text-ink transition-colors">Home</Link>
        <span>›</span>
        <Link href="#" className="text-ink-3 hover:text-ink transition-colors">
          {article.category}
        </Link>
        <span>›</span>
        <span className="text-ink font-semibold line-clamp-1">{article.title}</span>
      </nav>

      <span className="inline-block bg-brand-tint text-brand-strong text-[12px] font-bold tracking-[0.6px] uppercase px-3 py-1.5 rounded-badge">
        {article.category}
      </span>

      <h1 className="font-newsreader font-semibold text-[clamp(30px,5vw,52px)] leading-[1.1] tracking-[-1px] text-ink mt-4 text-balance">
        {article.title}
      </h1>

      <p className="font-newsreader italic text-[clamp(18px,2.2vw,22px)] leading-normal text-ink-2 mt-4 max-w-[90%]">
        {article.subtitle}
      </p>

      {/* Author meta + share bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap mt-6 py-4 border-t border-b border-line-2">
        <div className="flex items-center gap-3">
          <Avatar src={article.author.avatar} alt={article.author.name} size={48} className="border-2 border-line" />
          <div>
            <p className="text-[15px] font-bold text-ink">{article.author.name}</p>
            <p className="text-[13px] text-ink-3 mt-0.5">
              {article.date} · {article.readTime} ·{" "}
              <span className="text-brand font-semibold">{article.author.role}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {shareButtons.map((btn) => (
            <button key={btn.label} aria-label={`Share on ${btn.label}`} className={shareBtn}>
              {btn.icon}
            </button>
          ))}
          <SaveButton />
        </div>
      </div>
    </header>
  );
}
