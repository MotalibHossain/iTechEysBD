import Image from "next/image";
import { Check } from "lucide-react";
import { Article } from "@/lib/data/article-data";
import Avatar from "./Avatar";

// ── Sub-components ────────────────────────────────────────────────────────────

function DropCapParagraph() {
  return (
    <p className="mb-7 clearfix">
      <span className="float-left font-newsreader text-[68px] leading-[0.82] font-semibold text-[#E63946] mr-3 mt-1.5">
        এ
      </span>
      কটি তীব্র ডলার সংকটের মধ্য দিয়ে যাচ্ছে দেশের অর্থনীতি, আর তার সরাসরি প্রভাব পড়তে শুরু করেছে
      নিত্যপ্রয়োজনীয় ভোগ্যপণ্যের বাজারে। ব্যবসায়ী ও অর্থনীতিবিদরা বলছেন, সামনের রমজান ঘিরে এই চাপ আরও
      বাড়তে পারে।
    </p>
  );
}

function PullQuote() {
  return (
    <div className="relative my-10 rounded-2xl bg-[#FFF5F6] border border-[#FADADD] px-8 py-7">
      {/* Decorative large quote mark */}
      <span className="absolute top-3 left-6 font-newsreader text-[80px] leading-none text-[#E63946]/15 font-bold select-none" aria-hidden>
        &ldquo;
      </span>
      <blockquote className="relative">
        <p className="font-newsreader italic text-[22px] leading-[1.55] text-[#16151A] tracking-[-0.3px]">
          তবে আইএমএফ-এর ঋণ এলে ডলার সংকট কিছুটা কাটতে পারে — তবে সেটি দীর্ঘমেয়াদি সমাধান নয়।
        </p>
        <footer className="flex items-center gap-3 mt-4">
          <span className="h-px w-8 bg-[#E63946]/40" />
          <span className="text-[13.5px] font-semibold text-[#8E8D94]">
            A senior economist at a Dhaka think-tank
          </span>
        </footer>
      </blockquote>
    </div>
  );
}

function BulletList({ bullets }: { bullets: Article["bullets"] }) {
  return (
    <ul className="flex flex-col gap-3.5 my-7 bg-[#F6F4EE] rounded-[14px] p-5">
      {bullets.map((b) => (
        <li key={b.title} className="flex gap-3.5 items-start text-[16.5px]">
          <span className="shrink-0 w-5.5 h-5.5 rounded-[7px] bg-white text-[#C71F2E] flex items-center justify-center mt-0.75 shadow-sm">
            <Check size={12} strokeWidth={3} />
          </span>
          <span className="leading-[1.65]">
            <strong className="text-[#16151A] font-bold">{b.title}</strong>
            <span className="text-[#57565C]"> — {b.desc}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function CodeBlock() {
  return (
    <div className="bg-[#16151A] rounded-[14px] overflow-hidden mb-6.5 shadow-[0_18px_40px_-28px_rgba(20,21,26,0.6)]">
      {/* Window chrome */}
      <div className="flex items-center gap-1.75 px-4 py-3.25 border-b border-[#2A2930]">
        <span className="w-2.75 h-2.75 rounded-full bg-[#FF5F57]" />
        <span className="w-2.75 h-2.75 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.75 h-2.75 rounded-full bg-[#28C840]" />
        <span className="ml-2.5 text-[12.5px] text-[#8E8D94] font-mono">reserve-index.ts</span>
      </div>

      {/* Code */}
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
          <div key={img.src} className="relative aspect-square rounded-[14px] overflow-hidden">
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="200px" />
          </div>
        ))}
      </div>
      <p className="text-[12.5px] text-[#8E8D94] mb-6.5 text-center italic">
        Wholesale staples (left) and a currency-exchange counter (right) in central Dhaka.
      </p>
    </>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2.5 mt-10 pt-7 border-t border-[#EAE8E2]">
      <span className="text-[12px] font-bold tracking-[0.8px] uppercase text-[#B0AEB6] self-center mr-1">
        Tags:
      </span>
      {tags.map((tag) => (
        <a
          key={tag}
          href="#"
          className="text-[13px] font-semibold text-[#57565C] bg-[#F1EFE9] px-3.5 py-1.75 rounded-full no-underline transition-colors duration-200 hover:bg-[#16151A] hover:text-white"
        >
          #{tag}
        </a>
      ))}
    </div>
  );
}

function AuthorCard({ author }: { author: Article["author"] }) {
  return (
    <div className="flex gap-4.5 items-start mt-8 p-6 bg-white border border-[#EFEDE7] rounded-[18px]">
      <Avatar
        src={author.avatar}
        alt={author.name}
        size={64}
        className="border-2 border-[#EFEDE7] mt-0.5"
      />
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-bold tracking-[0.8px] uppercase text-[#E63946]">
          Written by
        </span>
        <p className="font-newsreader text-[21px] font-semibold mt-0.5 text-[#16151A]">
          {author.name}
        </p>
        <p className="text-[14px] leading-[1.6] text-[#6B6A70] mt-1.5">{author.bio}</p>
      </div>
      <button className="ml-auto self-start shrink-0 bg-[#E63946] text-white border-none text-[13.5px] font-bold px-4.5 py-2.5 rounded-[10px] transition-colors duration-200 hover:bg-[#C71F2E] cursor-pointer whitespace-nowrap">
        Follow
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ArticleBody({ article }: { article: Article }) {
  return (
    <article className="max-w-180 text-[17.5px] leading-[1.9] text-[#3A3940]">
      <DropCapParagraph />

      <p className="mb-7">
        They say export earnings and remittances have inched upward, but a slowdown in imports is
        squeezing the supply of essentials. With letters of credit harder to open, wholesalers are
        stocking less — and pricing in the risk.
      </p>

      {/* Section 1 */}
      <h2
        id="sec1"
        className="font-newsreader font-semibold text-[28px] leading-tight tracking-[-0.4px] text-[#16151A] mt-12 mb-5 pb-4 border-b border-[#EAE8E2]"
      >
        আমদানি কমায় কী প্রভাব পড়ছে
      </h2>

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

      {/* Section 2 */}
      <h2
        id="sec2"
        className="font-newsreader font-semibold text-[28px] leading-tight tracking-[-0.4px] text-[#16151A] mt-12 mb-5 pb-4 border-b border-[#EAE8E2]"
      >
        How analysts are modelling the risk
      </h2>

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
