import Image from "next/image";
import { Check, Sparkles, Link2, Lightbulb } from "lucide-react";
import { Article } from "@/lib/data/article-data";
import Avatar from "./Avatar";
import FloatingShareBar from "./FloatingShareBar";

// ── Sub-components ────────────────────────────────────────────────────────────

// `flow-root` = modern replacement for the old `clearfix` hack.
function DropCapParagraph() {
  return (
    <p className="mb-7 flow-root text-[17.5px] leading-[1.9] text-[#3A3940]">
      <span className="float-left font-newsreader text-[72px] leading-[0.82] font-semibold text-brand mr-3 mt-1.5 select-none">
        এ
      </span>
      কটি তীব্র ডলার সংকটের মধ্য দিয়ে যাচ্ছে দেশের অর্থনীতি, আর তার সরাসরি প্রভাব পড়তে শুরু করেছে
      নিত্যপ্রয়োজনীয় ভোগ্যপণ্যের বাজারে। ব্যবসায়ী ও অর্থনীতিবিদরা বলছেন, সামনের রমজান ঘিরে এই চাপ আরও
      বাড়তে পারে।
    </p>
  );
}

// New: Key takeaways callout — helps readers scan
function KeyTakeaways() {
  const items = [
    "Dollar reserves are tight; LC openings are slowing.",
    "Ramadan demand may amplify price pressure on staples.",
    "Analysts favour reserve management short-term, structural reform long-term.",
  ];
  return (
    <aside className="my-8 relative rounded-card-lg overflow-hidden border border-brand-tint bg-linear-to-br from-[#FFF8F9] to-[#FDECEE] p-6">
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center shadow-[0_6px_16px_-8px_rgba(230,57,70,0.6)]">
          <Lightbulb size={15} strokeWidth={2.4} />
        </span>
        <h3 className="text-[13px] font-bold tracking-[1px] uppercase text-brand-strong">
          Key Takeaways
        </h3>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((t) => (
          <li key={t} className="flex gap-2.5 items-start text-[15px] text-ink-2 leading-[1.65]">
            <Sparkles size={14} className="text-brand mt-1 shrink-0" strokeWidth={2.4} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="group scroll-mt-24 font-newsreader font-semibold text-[clamp(22px,2.6vw,30px)] leading-tight tracking-[-0.4px] text-ink mt-12 mb-5 pb-4 border-b border-line-2 flex items-baseline gap-2"
    >
      <span>{children}</span>
      <a
        href={`#${id}`}
        aria-label="Anchor link"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-brand"
      >
        <Link2 size={16} strokeWidth={2.4} />
      </a>
    </h2>
  );
}

function PullQuote() {
  return (
    <div className="relative my-10 rounded-card-lg bg-[#FFF5F6] border border-[#FADADD] px-8 py-7">
      <span
        className="absolute top-3 left-6 font-newsreader text-[80px] leading-none text-brand/15 font-bold select-none"
        aria-hidden
      >
        &ldquo;
      </span>
      <blockquote className="relative">
        <p className="font-newsreader italic text-[22px] leading-[1.55] text-ink tracking-[-0.3px]">
          তবে আইএমএফ-এর ঋণ এলে ডলার সংকট কিছুটা কাটতে পারে — তবে সেটি দীর্ঘমেয়াদি সমাধান নয়।
        </p>
        <footer className="flex items-center gap-3 mt-4">
          <span className="h-px w-8 bg-brand/40" />
          <span className="text-[13.5px] font-semibold text-ink-3">
            A senior economist at a Dhaka think-tank
          </span>
        </footer>
      </blockquote>
    </div>
  );
}

function BulletList({ bullets }: { bullets: Article["bullets"] }) {
  return (
    <ul className="flex flex-col gap-3.5 my-7 bg-surface-warm rounded-card p-5">
      {bullets.map((b) => (
        <li key={b.title} className="flex gap-3.5 items-start text-[16.5px]">
          <span className="shrink-0 w-5.5 h-5.5 rounded-badge bg-surface text-brand-strong flex items-center justify-center mt-1 shadow-sm">
            <Check size={12} strokeWidth={3} />
          </span>
          <span className="leading-[1.65]">
            <strong className="text-ink font-bold">{b.title}</strong>
            <span className="text-ink-2"> — {b.desc}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function CodeBlock() {
  return (
    <div className="bg-surface-dark rounded-card overflow-hidden mb-6 shadow-[0_18px_40px_-28px_rgba(20,21,26,0.6)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A2930]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2.5 text-[12.5px] text-ink-3 font-mono">reserve-index.ts</span>
      </div>

      <pre className="m-0 px-5 py-4.5 overflow-x-auto font-mono text-[13.5px] leading-[1.7] text-[#E6E4EC]">
        <code>
          <span className="text-[#C792EA]">const</span>
          {" pressure = ("}
          <span className="text-[#82AAFF]">reserve</span>
          {", "}
          <span className="text-[#82AAFF]">imports</span>
          {") => {\n  "}
          <span className="text-[#C792EA]">const</span>
          {" months = reserve / imports;\n  "}
          <span className="text-[#C792EA]">return</span>
          {" months < "}
          <span className="text-[#F78C6C]">3</span>
          {"\n    ? "}
          <span className="text-[#C3E88D]">&quot;critical&quot;</span>
          {"\n    : months < "}
          <span className="text-[#F78C6C]">5</span>
          {" ? "}
          <span className="text-[#C3E88D]">&quot;watch&quot;</span>
          {" : "}
          <span className="text-[#C3E88D]">&quot;stable&quot;</span>
          {";\n};"}
        </code>
      </pre>
    </div>
  );
}

function ImageGallery({ gallery }: { gallery: Article["gallery"] }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3.5 mb-3">
        {gallery.map((img) => (
          <div
            key={img.src}
            className="relative aspect-4/3 rounded-card overflow-hidden group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, 320px"
            />
          </div>
        ))}
      </div>
      <p className="text-[12.5px] text-ink-3 mb-6 text-center italic">
        Wholesale staples (left) and a currency-exchange counter (right) in central Dhaka.
      </p>
    </>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2.5 mt-10 pt-7 border-t border-line-2">
      <span className="text-[12px] font-bold tracking-[0.8px] uppercase text-ink-4 self-center mr-1">
        Tags:
      </span>
      {tags.map((tag) => (
        <a
          key={tag}
          href="#"
          className="text-[13px] font-semibold text-ink-2 bg-surface-warm-strong px-3.5 py-1.5 rounded-full no-underline transition-colors duration-200 hover:bg-ink hover:text-white"
        >
          #{tag}
        </a>
      ))}
    </div>
  );
}

function AuthorCard({ author }: { author: Article["author"] }) {
  return (
    <div className="flex gap-4 items-start mt-8 p-6 bg-linear-to-br from-surface to-surface-warm border border-line rounded-card-lg">
      <Avatar src={author.avatar} alt={author.name} size={64} ring />
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-bold tracking-[0.8px] uppercase text-brand">
          Written by
        </span>
        <p className="font-newsreader text-[21px] font-semibold mt-0.5 text-ink">{author.name}</p>
        <p className="text-[14px] leading-[1.6] text-ink-2 mt-1.5">{author.bio}</p>
      </div>
      <button className="ml-auto self-start shrink-0 bg-brand text-white text-[13.5px] font-bold px-4.5 py-2.5 rounded-btn transition-colors duration-200 hover:bg-brand-strong cursor-pointer whitespace-nowrap">
        Follow
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ArticleBody({ article }: { article: Article }) {
  return (
    <article
      id="article-body"
      className="relative max-w-(--read-max) text-[17.5px] leading-[1.9] text-[#3A3940]"
    >
      <FloatingShareBar />

      <DropCapParagraph />

      <p className="mb-7">
        They say export earnings and remittances have inched upward, but a slowdown in imports is
        squeezing the supply of essentials. With letters of credit harder to open, wholesalers are
        stocking less — and pricing in the risk.
      </p>

      <KeyTakeaways />

      <SectionHeading id="sec1">আমদানি কমায় কী প্রভাব পড়ছে</SectionHeading>

      <p className="mb-7">
        উৎপাদন খরচ বেড়ে যাওয়ায় অনেক শিল্প উৎপাদন কমিয়ে দিতে বা বন্ধ রাখতে বাধ্য হচ্ছে। ফলে রপ্তানি
        কমতে বাধ্য — আর বিদ্যুৎ ও গ্যাসের দাম বাড়ায় চাপ আরও তীব্র।
      </p>

      <PullQuote />

      <p className="mb-7">
        For consumers, the most visible effect is at the till. Below, the essentials most exposed to
        import-cost pressure heading into Ramadan:
      </p>

      <BulletList bullets={article.bullets} />

      <SectionHeading id="sec2">How analysts are modelling the risk</SectionHeading>

      <p className="mb-7">
        Some teams are publishing open dashboards that track the reserve position daily. A simplified
        version of the rate-pressure index looks like this:
      </p>

      <CodeBlock />

      <ImageGallery gallery={article.gallery} />

      <p className="mb-7">
        What happens next depends largely on the pace of inbound financing and the central bank&apos;s
        interventions. For now, traders are advising households to plan early for Ramadan — and to
        expect a volatile few weeks.
      </p>

      <Tags tags={article.tags} />
      <AuthorCard author={article.author} />
    </article>
  );
}
