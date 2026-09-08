import Link from "next/link";
import {
  Clock,
  Calendar,
  Eye,
  MessageCircle,
} from "lucide-react";
import { Article } from "@/lib/data/article-data";
import Avatar from "./Avatar";
import SaveButton from "./SaveButton";
import { XIcon, LinkedInIcon, FacebookIcon } from "./BrandIcons";

const shareButtons = [
  { label: "X", Icon: XIcon },
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "Facebook", Icon: FacebookIcon },
];

const shareBtn =
  "w-9 h-9 rounded-full border border-line-2 bg-surface flex items-center justify-center " +
  "text-ink-2 transition-all duration-200 " +
  "hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-0.5 cursor-pointer";

export default function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="flex flex-col gap-6">
      {/* Slash-separated breadcrumb — no pill background */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-[12.5px] text-ink-3 flex-wrap"
      >
        <Link href="/" className="hover:text-brand transition-colors font-medium">
          Home
        </Link>
        <span className="text-line-3">/</span>
        <Link href="#" className="hover:text-brand transition-colors font-medium">
          {article.category}
        </Link>
        <span className="text-line-3">/</span>
        <span className="text-ink font-semibold line-clamp-1 max-w-100">{article.title}</span>
      </nav>

      {/* Kicker: red-underlined category + timestamp strip */}
      <div className="flex items-center gap-3 flex-wrap text-[11.5px] font-semibold tracking-[1.2px] uppercase text-ink-4">
        <span className="relative inline-block text-brand-strong pb-1.5">
          {article.category}
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-brand" />
        </span>
        <span className="text-line-3">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={11} strokeWidth={2.4} />
          {article.date}
        </span>
        <span className="text-line-3">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock size={11} strokeWidth={2.4} />
          {article.readTime}
        </span>
        <span className="text-line-3">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Eye size={11} strokeWidth={2.4} />
          12.4k
        </span>
        <span className="text-line-3">•</span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle size={11} strokeWidth={2.4} />
          {article.comments.length}
        </span>
      </div>

      {/* Title + subtitle */}
      <div className="flex flex-col gap-4">
        <h1 className="font-newsreader font-semibold text-[clamp(30px,5vw,52px)] leading-[1.08] tracking-[-1px] text-ink text-balance">
          {article.title}
        </h1>
        <p className="font-newsreader italic text-[clamp(17px,2vw,21px)] leading-[1.55] text-ink-2 max-w-[85%]">
          {article.subtitle}
        </p>
      </div>

      {/* Author row + share */}
      <div className="flex items-center justify-between gap-4 flex-wrap mt-2 pt-5 border-t border-line-2">
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

        <div className="flex items-center gap-2">
          {shareButtons.map(({ label, Icon }) => (
            <button key={label} aria-label={`Share on ${label}`} className={shareBtn}>
              <Icon size={13} />
            </button>
          ))}
          <SaveButton />
        </div>
      </div>
    </header>
  );
}
