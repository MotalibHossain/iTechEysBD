"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlignLeft,
  TrendingUp,
  Eye,
  MessageCircle,
  ThumbsUp,
  Clock,
  Share2,
  Link2,
  Check,
  Rss,
  UserPlus,
  Newspaper,
  Flame,
  Play,
  Pause,
  Volume2,
  BarChart2,
  ArrowRight,
  MessagesSquare,
  Headphones,
} from "lucide-react";
import { Article } from "@/lib/data/article-data";
import Avatar from "./Avatar";
import NewsletterForm from "./NewsletterForm";
import { XIcon, LinkedInIcon, FacebookIcon } from "./BrandIcons";

// Editorial section title — small red accent bar + uppercase label
function SidebarTitle({
  children,
  Icon,
}: {
  children: React.ReactNode;
  Icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-3.5">
      <span className="w-1 h-4 rounded-full bg-brand" />
      {Icon && <Icon size={13} strokeWidth={2.4} className="text-brand" />}
      <h3 className="text-[11px] font-bold tracking-[1.2px] uppercase text-ink">{children}</h3>
    </div>
  );
}

// One padded section inside the sidebar card
function Section({ children }: { children: React.ReactNode }) {
  return <div className="p-5 border-b border-line-2">{children}</div>;
}

// ── Share dock (top row) ─────────────────────────────────────────────────────

function ShareDock() {
  const [copied, setCopied] = useState(false);
  const btn =
    "w-9 h-9 rounded-full bg-surface border border-line-2 text-ink-2 flex items-center justify-center transition-all hover:bg-ink hover:text-white hover:border-ink cursor-pointer";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10.5px] font-bold tracking-[1px] uppercase text-ink-3 inline-flex items-center gap-1.5">
        <Share2 size={12} strokeWidth={2.4} />
        Share
      </span>
      <div className="flex items-center gap-1.5">
        <button aria-label="Share on X" className={btn}>
          <XIcon size={12} />
        </button>
        <button aria-label="Share on LinkedIn" className={btn}>
          <LinkedInIcon size={12} />
        </button>
        <button aria-label="Share on Facebook" className={btn}>
          <FacebookIcon size={12} />
        </button>
        <button
          aria-label="Copy link"
          onClick={copy}
          className={`${btn} ${copied ? "bg-brand! text-white! border-brand!" : ""}`}
        >
          {copied ? <Check size={12} strokeWidth={2.4} /> : <Link2 size={12} strokeWidth={2.2} />}
        </button>
      </div>
    </div>
  );
}

// ── Horizontal meta strip ────────────────────────────────────────────────────

function MetaStrip({ commentCount }: { commentCount: number }) {
  const items = [
    { Icon: Eye, val: "12.4k" },
    { Icon: ThumbsUp, val: "892" },
    { Icon: MessageCircle, val: String(commentCount) },
    { Icon: Clock, val: "9 min" },
  ];
  return (
    <div className="flex items-center justify-between px-1">
      {items.map(({ Icon, val }, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <Icon size={13} strokeWidth={2.2} className="text-ink-3" />
          <span className="text-[13px] font-bold text-ink">{val}</span>
        </div>
      ))}
    </div>
  );
}

// ── Listen widget — audio narration mock ─────────────────────────────────────

function ListenWidget() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause narration" : "Play narration"}
        className="w-11 h-11 rounded-full bg-brand text-white flex items-center justify-center shadow-[0_8px_20px_-8px_rgba(230,57,70,0.6)] hover:bg-brand-strong transition-colors cursor-pointer shrink-0"
      >
        {playing ? (
          <Pause size={15} strokeWidth={2.5} fill="currentColor" />
        ) : (
          <Play size={15} strokeWidth={2.5} fill="currentColor" className="ml-0.5" />
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-bold text-ink leading-tight inline-flex items-center gap-1.5">
          <Headphones size={12} strokeWidth={2.4} className="text-brand" />
          Listen to this story
        </p>
        <p className="text-[11.5px] text-ink-3 mt-1">
          {playing ? "Playing · 0:12 / 8:24" : "AI narration · 8 min"}
        </p>
      </div>
      <Volume2 size={13} className="text-ink-4 shrink-0" strokeWidth={2.2} />
    </div>
  );
}

// ── Quick poll — high-engagement widget ─────────────────────────────────────

const POLL_VOTES = { yes: 34, no: 52, unsure: 14 };
const POLL_LABELS = { yes: "Yes, likely", no: "No, unlikely", unsure: "Not sure" };
type PollOption = keyof typeof POLL_VOTES;

function QuickPoll() {
  const [voted, setVoted] = useState<PollOption | null>(null);
  return (
    <div>
      <SidebarTitle Icon={BarChart2}>Quick Poll</SidebarTitle>
      <p className="text-[13.5px] text-ink-2 leading-[1.55] mb-3">
        Will Bangladesh&apos;s dollar reserves stabilise before Ramadan?
      </p>
      {!voted ? (
        <div className="flex flex-col gap-2">
          {(Object.keys(POLL_VOTES) as PollOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setVoted(opt)}
              className="text-[13px] font-semibold text-ink-2 bg-surface hover:bg-brand-tint hover:text-brand-strong hover:border-brand border border-line-2 rounded-btn py-2 transition-colors cursor-pointer"
            >
              {POLL_LABELS[opt]}
            </button>
          ))}
          <p className="text-[11px] text-ink-4 text-center mt-1">2,847 votes so far</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {(Object.keys(POLL_VOTES) as PollOption[]).map((opt) => {
            const pct = POLL_VOTES[opt];
            const isPick = voted === opt;
            return (
              <div
                key={opt}
                className="relative overflow-hidden rounded-btn bg-surface-warm h-9"
              >
                <div
                  className={`absolute inset-y-0 left-0 transition-all ${
                    isPick ? "bg-brand" : "bg-line-2"
                  }`}
                  style={{ width: `${pct}%` }}
                />
                <div className="relative h-full flex items-center justify-between px-3">
                  <span
                    className={`text-[12.5px] font-semibold ${
                      isPick && pct > 25 ? "text-white" : "text-ink"
                    }`}
                  >
                    {POLL_LABELS[opt]}
                  </span>
                  <span
                    className={`text-[11.5px] font-bold ${
                      isPick && pct > 25 ? "text-white" : "text-ink-3"
                    }`}
                  >
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}
          <p className="text-[11px] text-ink-4 text-center mt-1">
            Thanks for voting · 2,848 votes
          </p>
        </div>
      )}
    </div>
  );
}

// ── Discussion teaser — drives users to comments section ────────────────────

function DiscussionTeaser({
  count,
  latest,
}: {
  count: number;
  latest?: Article["comments"][number];
}) {
  return (
    <div>
      <SidebarTitle Icon={MessagesSquare}>Discussion</SidebarTitle>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-newsreader text-[26px] font-semibold text-ink leading-none">
          {count}
        </span>
        <span className="text-[12px] text-ink-3">readers commenting</span>
      </div>
      {latest && (
        <div className="flex gap-2.5 mb-3">
          <Avatar src={latest.avatar} alt={latest.name} size={28} ring />
          <div className="min-w-0 flex-1">
            <p className="text-[11.5px] font-bold text-ink truncate">
              {latest.name}
              <span className="text-ink-4 font-normal ml-1.5">· {latest.time}</span>
            </p>
            <p className="text-[12.5px] text-ink-2 italic line-clamp-2 mt-0.5 leading-[1.4]">
              &ldquo;{latest.body}&rdquo;
            </p>
          </div>
        </div>
      )}
      <a
        href="#comments"
        className="inline-flex items-center gap-1 text-[12.5px] font-bold text-brand hover:text-brand-strong transition-colors"
      >
        Join the discussion
        <ArrowRight size={12} strokeWidth={2.4} />
      </a>
    </div>
  );
}

// ── TOC — vertical rail with an active-line indicator ────────────────────────

function TableOfContents({ toc }: { toc: Article["toc"] }) {
  const [active, setActive] = useState<string>(toc[0]?.id ?? "");

  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div>
      <SidebarTitle Icon={AlignLeft}>In this article</SidebarTitle>
      <nav className="relative pl-3.5">
        <span className="absolute left-0 top-1 bottom-1 w-px bg-line-2" />
        {toc.map((item) => {
          const isActive = item.id === active;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative block py-1.5 no-underline transition-colors ${
                isActive ? "text-brand-strong" : "text-ink-2 hover:text-ink"
              }`}
            >
              {isActive && (
                <span className="absolute -left-3.5 top-1.5 bottom-1.5 w-0.5 rounded-full bg-brand" />
              )}
              <span
                className={`text-[13.5px] leading-normal ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

// ── Author quick block — left brand rule, no card frame ──────────────────────

function AuthorBlock({ author }: { author: Article["author"] }) {
  return (
    <div className="border-l-2 border-brand pl-3.5">
      <span className="text-[10.5px] font-bold tracking-[1px] uppercase text-brand">
        Written by
      </span>
      <div className="flex items-center gap-3 mt-2">
        <Avatar src={author.avatar} alt={author.name} size={40} ring />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold text-ink truncate leading-tight">{author.name}</p>
          <p className="text-[11.5px] text-ink-3 mt-0.5 truncate">{author.role}</p>
        </div>
        <button className="inline-flex items-center gap-1 text-[11.5px] font-bold text-brand hover:text-brand-strong cursor-pointer transition-colors">
          <UserPlus size={11} strokeWidth={2.4} />
          Follow
        </button>
      </div>
    </div>
  );
}

// ── Tabbed content: Popular / Related / Topics ───────────────────────────────

type ContentTab = "popular" | "related" | "topics";
const CONTENT_TABS: { id: ContentTab; label: string; Icon: React.ElementType }[] = [
  { id: "popular", label: "Popular", Icon: Flame },
  { id: "related", label: "Related", Icon: Newspaper },
  { id: "topics", label: "Topics", Icon: TrendingUp },
];

function TabbedContent({
  popular,
  related,
  tags,
}: {
  popular: Article["popularPosts"];
  related: Article["related"];
  tags: string[];
}) {
  const [tab, setTab] = useState<ContentTab>("popular");

  return (
    <div>
      <div className="grid grid-cols-3 mb-4 bg-surface-warm rounded-full p-1">
        {CONTENT_TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`inline-flex items-center justify-center gap-1.5 py-1.5 text-[11.5px] font-bold rounded-full transition-all cursor-pointer ${
              tab === id
                ? "bg-ink text-white shadow-[0_4px_10px_-4px_rgba(20,21,26,0.4)]"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            <Icon size={11} strokeWidth={2.4} />
            {label}
          </button>
        ))}
      </div>

      {tab === "popular" && (
        <ul className="flex flex-col divide-y divide-line-2">
          {popular.map((p, idx) => (
            <li key={p.slug}>
              <Link
                href={`/blog/details/${p.slug}`}
                className="flex gap-3 items-start no-underline group py-3 first:pt-0 last:pb-0"
              >
                <span
                  className={`shrink-0 font-newsreader text-[22px] font-bold leading-none mt-0.5 ${
                    idx === 0 ? "text-brand" : idx < 3 ? "text-brand/40" : "text-line-2"
                  }`}
                >
                  {p.num}
                </span>
                <div className="min-w-0">
                  <h4 className="font-newsreader font-semibold text-[14px] leading-[1.35] text-ink group-hover:text-brand transition-colors line-clamp-2">
                    {p.title}
                  </h4>
                  <span className="text-[11px] text-ink-4 mt-1 block">{p.views} views</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {tab === "related" && (
        <ul className="flex flex-col gap-3.5">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/blog/details/${r.slug}`} className="flex gap-3 no-underline group">
                <div className="relative w-16 h-16 shrink-0 rounded-card overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold tracking-[0.6px] uppercase text-brand">
                    {r.category}
                  </span>
                  <h4 className="font-newsreader font-semibold text-[13.5px] leading-[1.35] text-ink group-hover:text-brand transition-colors line-clamp-2 mt-0.5">
                    {r.title}
                  </h4>
                  <p className="text-[10.5px] text-ink-4 mt-1">
                    {r.date} · {r.read}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {tab === "topics" && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <a
              key={t}
              href="#"
              className="text-[12px] font-semibold text-ink-2 bg-surface-warm hover:bg-brand hover:text-white transition-colors px-2.5 py-1 rounded-full no-underline"
            >
              #{t}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Newsletter dark card (full-bleed bottom section) ────────────────────────

function NewsletterCard() {
  return (
    <div className="relative bg-surface-dark p-5 text-white overflow-hidden">
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand/25 blur-3xl pointer-events-none" />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-[1px] uppercase text-brand-tint">
          <Rss size={11} strokeWidth={2.5} />
          Newsletter
        </span>
        <h3 className="font-newsreader text-[19px] font-semibold leading-[1.2] mt-2">
          Don&apos;t miss a story
        </h3>
        <p className="text-[12.5px] leading-[1.55] text-[#9C9AA3] mt-1.5">
          Weekly highlights in EN &amp; বাংলা.
        </p>
        <NewsletterForm />
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function ArticleSidebar({ article }: { article: Article }) {
  const latestComment = article.comments[0];
  return (
    <aside className="hidden lg:block sticky top-24 self-start">
      <div className="bg-surface border border-line rounded-card-lg shadow-[0_20px_50px_-30px_rgba(20,21,26,0.22)] overflow-hidden">
        <Section>
          <ShareDock />
        </Section>
        <Section>
          <MetaStrip commentCount={article.comments.length} />
        </Section>
        <Section>
          <ListenWidget />
        </Section>
        <Section>
          <TableOfContents toc={article.toc} />
        </Section>
        <Section>
          <QuickPoll />
        </Section>
        <Section>
          <AuthorBlock author={article.author} />
        </Section>
        <Section>
          <TabbedContent
            popular={article.popularPosts}
            related={article.related}
            tags={article.tags}
          />
        </Section>
        <Section>
          <DiscussionTeaser count={article.comments.length} latest={latestComment} />
        </Section>
        <NewsletterCard />
      </div>
    </aside>
  );
}
