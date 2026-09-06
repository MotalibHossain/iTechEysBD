import Link from "next/link";
import {
  ChevronRight,
  Home,
  Clock,
  Calendar,
  Eye,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
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
  "w-9 h-9 rounded-full border border-line-2 bg-surface flex items-center justify-center " +
  "text-ink-2 text-[12.5px] font-bold transition-all duration-200 " +
  "hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-0.5 cursor-pointer";

export default function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="flex flex-col gap-6">
      {/* Modern breadcrumb — pill style with chevron icons */}
      <nav
        aria-label="Breadcrumb"
        className="inline-flex self-start items-center gap-1 bg-surface-warm/70 backdrop-blur-sm border border-line-2 rounded-full px-3 py-1.5 text-[12.5px] text-ink-3 flex-wrap"
      >
        <Link href="/" className="inline-flex items-center gap-1 hover:text-ink transition-colors">
          <Home size={12} strokeWidth={2.5} />
          Home
        </Link>
        <ChevronRight size={12} className="text-ink-4" />
        <Link href="#" className="hover:text-ink transition-colors font-medium">
          {article.category}
        </Link>
        <ChevronRight size={12} className="text-ink-4" />
        <span className="text-ink font-semibold line-clamp-1 max-w-60 sm:max-w-100">
          {article.title}
        </span>
      </nav>

      {/* Category chip + title cluster */}
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 self-start">
          <span className="inline-flex items-center gap-2 bg-brand text-white text-[11.5px] font-bold tracking-[0.8px] uppercase pl-2 pr-3.5 py-1.5 rounded-full shadow-[0_6px_18px_-8px_rgba(230,57,70,0.55)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />
            {article.category}
          </span>
          <span className="text-[11.5px] font-semibold tracking-[0.5px] uppercase text-ink-4">
            Featured Story
          </span>
        </div>

        <h1 className="font-newsreader font-semibold text-[clamp(30px,5vw,52px)] leading-[1.08] tracking-[-1px] text-ink text-balance">
          {article.title}
        </h1>

        <p className="font-newsreader italic text-[clamp(17px,2vw,21px)] leading-[1.55] text-ink-2 max-w-[92%]">
          {article.subtitle}
        </p>
      </div>

      {/* Author + meta stats + share bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap mt-2 pt-5 pb-5 border-t border-b border-line-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Avatar src={article.author.avatar} alt={article.author.name} size={44} ring />
            <div>
              <p className="text-[14.5px] font-bold text-ink leading-tight">
                {article.author.name}
              </p>
              <p className="text-[12.5px] text-ink-3 mt-0.5">
                <span className="text-brand font-semibold">{article.author.role}</span>
              </p>
            </div>
          </div>

          <span className="hidden sm:block w-px h-8 bg-line-2" />

          <ul className="flex items-center gap-4 flex-wrap text-[12.5px] text-ink-3">
            <li className="inline-flex items-center gap-1.5">
              <Calendar size={13} strokeWidth={2.2} />
              {article.date}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Clock size={13} strokeWidth={2.2} />
              {article.readTime}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Eye size={13} strokeWidth={2.2} />
              12.4k views
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MessageCircle size={13} strokeWidth={2.2} />
              {article.comments.length} comments
            </li>
          </ul>
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
