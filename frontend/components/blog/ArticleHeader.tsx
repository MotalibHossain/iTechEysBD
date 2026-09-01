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

export default function ArticleHeader({ article }: { article: Article }) {
  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2.25 text-[13px] text-[#8E8D94] mb-6 flex-wrap">
        <Link href="/" className="text-[#8E8D94] hover:text-[#16151A] transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link href="#" className="text-[#8E8D94] hover:text-[#16151A] transition-colors">
          {article.category}
        </Link>
        <span>›</span>
        <span className="text-[#16151A] font-semibold line-clamp-1">{article.title}</span>
      </nav>

      {/* Category badge */}
      <span className="inline-block bg-[#FCE4E6] text-[#C71F2E] text-[12px] font-bold tracking-[0.6px] uppercase px-3.25 py-1.5 rounded-[8px]">
        {article.category}
      </span>

      {/* Title */}
      <h1 className="font-newsreader font-semibold text-[clamp(30px,5vw,52px)] leading-[1.1] tracking-[-1px] text-[#16151A] mt-4.5 text-balance">
        {article.title}
      </h1>

      {/* Subtitle / deck */}
      <p className="font-newsreader italic text-[clamp(18px,2.4vw,22px)] leading-normal text-[#57565C] mt-4.5 max-w-[90%]">
        {article.subtitle}
      </p>

      {/* Author meta + share bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap mt-6.5 py-4.5 border-t border-b border-[#EAE8E2]">
        {/* Author info */}
        <div className="flex items-center gap-3.25">
          <Avatar
            src={article.author.avatar}
            alt={article.author.name}
            size={48}
            className="border-2 border-[#EFEDE7]"
          />
          <div>
            <p className="text-[15px] font-bold text-[#16151A]">{article.author.name}</p>
            <p className="text-[13px] text-[#8E8D94] mt-0.5">
              {article.date} · {article.readTime} ·{" "}
              <span className="text-[#E63946] font-semibold">{article.author.role}</span>
            </p>
          </div>
        </div>

        {/* Share + save buttons */}
        <div className="flex items-center gap-2">
          {shareButtons.map((btn) => (
            <button
              key={btn.label}
              aria-label={`Share on ${btn.label}`}
              className="w-10 h-10 rounded-[11px] border border-[#EAE8E2] bg-white flex items-center justify-center text-[#57565C] text-[13px] font-bold transition-colors duration-200 hover:bg-[#16151A] hover:text-white hover:border-[#16151A] cursor-pointer"
            >
              {btn.icon}
            </button>
          ))}
          <SaveButton />
        </div>
      </div>
    </div>
  );
}
