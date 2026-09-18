"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, ChevronRight, CircleCheck, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { serviceItems } from "@/lib/data/page-data";

const serviceColors = [
  { active: "border-brand bg-brand", line: "border-t-brand", tint: "bg-brand-tint text-brand-strong" },
  { active: "border-[#247BA0] bg-[#247BA0]", line: "border-t-[#247BA0]", tint: "bg-[#E3F1F7] text-[#17627F]" },
  { active: "border-[#D99A2B] bg-[#D99A2B]", line: "border-t-[#D99A2B]", tint: "bg-[#FFF3D7] text-[#986A0D]" },
  { active: "border-[#7B61A8] bg-[#7B61A8]", line: "border-t-[#7B61A8]", tint: "bg-[#EEE9F7] text-[#60488A]" },
  { active: "border-[#2A9D8F] bg-[#2A9D8F]", line: "border-t-[#2A9D8F]", tint: "bg-[#E0F4F0] text-[#1D756B]" },
  { active: "border-[#3D5A80] bg-[#3D5A80]", line: "border-t-[#3D5A80]", tint: "bg-[#E7EDF5] text-[#2D4565]" },
];

const activityStates = [
  { label: "Planning the next move", detail: "Scope and direction", color: "bg-[#F4D35E]" },
  { label: "Building the experience", detail: "Design and development", color: "bg-[#70C1B3]" },
  { label: "Getting ready to launch", detail: "Review and handoff", color: "bg-[#F4A261]" },
];

export default function Page() {
  const [activeService, setActiveService] = useState(0);
  const [activityStep, setActivityStep] = useState(0);
  const selectedService = serviceItems[activeService];
  const selectedColor = serviceColors[activeService];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivityStep((step) => (step + 1) % activityStates.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="container flex flex-col gap-18 py-10 pb-16">
      <section className="relative min-h-105 overflow-hidden rounded-card-xl bg-linear-to-br from-[#17324D] via-[#263A5A] to-[#43243E] px-6 py-8 text-white shadow-[0_22px_60px_-28px_rgba(36,54,82,0.7)] md:px-12 md:py-10">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#E76F51]/25 blur-3xl" />
        <div className="absolute -bottom-32 left-[38%] h-72 w-72 rounded-full bg-[#2A9D8F]/20 blur-3xl" />
        <div className="relative z-10 max-w-145">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[1.4px] text-[#FFB4A9]">
            <Sparkles size={14} /> Practical digital support
          </span>
          <h1 className="mt-4 max-w-125 font-newsreader text-[clamp(36px,5vw,58px)] font-semibold leading-[1.04]">
            Your ideas deserve a better place to live online.
          </h1>
          <p className="mt-5 max-w-130 text-base leading-[1.7] text-[#D0CDD2]">
            iTechEys helps publishers, teams and independent businesses turn
            unfinished web work into clear, useful, working experiences.
          </p>
          <Link href="#services" className="mt-7 inline-flex items-center gap-2 rounded-btn bg-brand px-5 py-3 text-sm font-bold text-white no-underline shadow-lg shadow-brand/25 hover:bg-brand-strong">
            Explore the services <ArrowDown size={16} />
          </Link>
        </div>
        <div className="service-illustration absolute -bottom-16 right-[-3%] hidden h-95 w-110 rotate-[-4deg] lg:block" aria-hidden="true">
          <div className="absolute right-8 top-2 h-72 w-100 rounded-card-lg border border-white/20 bg-[#202A3A]/95 p-4 shadow-2xl shadow-[#091522]/40">
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-3"><i className="h-2 w-2 rounded-full bg-[#FF8277]" /><i className="h-2 w-2 rounded-full bg-[#FFC857]" /><i className="h-2 w-2 rounded-full bg-[#70C1B3]" /><span className="ml-auto text-[9px] text-white/40">itecheys.com/dashboard</span></div>
            <div className="mt-5 grid grid-cols-[1.2fr_0.8fr] gap-3"><div className="rounded-lg bg-[#31435A] p-3"><div className="h-2 w-20 rounded-full bg-[#A9C4D4]" /><div className="mt-5 h-20 rounded-lg bg-linear-to-br from-[#E76F51] to-[#F4A261]" /><div className="mt-3 h-2 w-32 rounded-full bg-white/25" /><div className="mt-2 h-2 w-24 rounded-full bg-white/15" /></div><div className="space-y-3"><div className="rounded-lg border border-[#A9C4D4]/20 bg-[#31435A]/60 p-3"><span className="text-[9px] text-[#A9C4D4]">Publishing health</span><strong className="mt-1 block text-2xl text-[#F4D35E]">84%</strong><div className="mt-2 h-1 rounded-full bg-white/10"><div className="h-1 w-4/5 rounded-full bg-[#F4D35E]" /></div></div><div className="rounded-lg border border-[#A9C4D4]/20 bg-[#31435A]/60 p-3"><span className="text-[9px] text-[#A9C4D4]">Next article</span><strong className="mt-1 block text-xs">Ready to review</strong><CircleCheck className="mt-2 text-[#70C1B3]" size={16} /></div></div></div>
          </div>
          <div className="absolute bottom-8 left-2 flex w-55 items-center gap-3 rounded-card-lg border border-[#F4A261]/30 bg-[#FFF8EE] p-4 text-ink shadow-xl"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCE7E2] text-[#E76F51]"><Mail size={18} /></span><div><span className="block text-[10px] font-bold uppercase tracking-wider text-ink-3">Status</span><strong className="text-sm">Ready to publish</strong></div></div>
        </div>
      </section>

      <section id="services" className="scroll-mt-6">
        <div className="mb-7 max-w-145"><span className="text-xs font-bold uppercase tracking-[1.4px] text-brand">Choose your starting point</span><h2 className="mt-3 font-newsreader text-4xl font-semibold leading-tight">What needs attention first?</h2><p className="mt-3 text-sm leading-[1.65] text-ink-2">Start with the problem closest to you. Select a service to see what the work includes and who it is designed to help.</p></div>
        <div className="mb-6 flex flex-col gap-5 rounded-card-xl border border-line bg-white p-5 shadow-[0_14px_34px_-30px_rgba(22,21,26,0.8)] md:flex-row md:items-center md:justify-between md:p-6" aria-live="polite">
          <div className="flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-full bg-brand-tint text-brand`}><CircleCheck size={19} className="service-live-dot" /></span><div><span className="block text-[10px] font-bold uppercase tracking-[1.1px] text-ink-3">Project pulse</span><strong className="mt-0.5 block text-sm">{activityStates[activityStep].label}</strong><span className="block text-xs text-ink-3">{activityStates[activityStep].detail}</span></div></div>
          <div className="flex flex-1 items-center gap-2 md:max-w-105"><div className="flex flex-1 items-center gap-1.5" aria-hidden="true"><i className={`h-2 flex-1 rounded-full ${activityStep >= 0 ? "bg-brand" : "bg-line-2"}`} /><i className={`h-2 flex-1 rounded-full ${activityStep >= 1 ? "bg-[#2A9D8F]" : "bg-line-2"}`} /><i className={`h-2 flex-1 rounded-full ${activityStep >= 2 ? "bg-[#F4A261]" : "bg-line-2"}`} /></div><span className="font-mono text-[10px] text-ink-3">{String(activityStep + 1).padStart(2, "0")} / 03</span></div>
          <span className="hidden items-center gap-1.5 text-[11px] font-bold text-[#2A9D8F] md:flex"><CircleCheck size={14} /> Moving forward</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(250px,0.72fr)_minmax(0,1.28fr)]">
          <nav className="flex flex-col gap-2" aria-label="Service options">
            {serviceItems.map((service, index) => <button key={service.title} onClick={() => setActiveService(index)} className={`group flex items-center gap-4 rounded-card border p-4 text-left transition ${activeService === index ? `${serviceColors[index].active} text-white shadow-md` : "border-line bg-white hover:border-ink-4 hover:shadow-sm"}`}><span className={`font-mono text-xs font-bold ${activeService === index ? "text-white/70" : "text-ink-3"}`}>{service.glyph}</span><span className="flex-1"><strong className="block text-sm">{service.title}</strong><small className={`mt-0.5 block text-[11px] ${activeService === index ? "text-white/75" : "text-ink-3"}`}>{service.eyebrow}</small></span><ArrowUpRight size={16} className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${activeService === index ? "text-white" : "text-ink-3"}`} /></button>)}
          </nav>
          <article className={`rounded-card-xl border border-line border-t-4 ${selectedColor.line} bg-white p-6 shadow-[0_18px_50px_-36px_rgba(22,21,26,0.8)] md:p-9`}>
            <div className="flex flex-wrap items-start justify-between gap-4"><div><span className="font-mono text-xs font-bold text-ink-3">SERVICE {selectedService.glyph}</span><h3 className="mt-2 font-newsreader text-3xl font-semibold">{selectedService.title}</h3></div><span className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${selectedColor.tint}`}>{selectedService.eyebrow}</span></div>
            <p className="mt-5 max-w-140 text-[15px] leading-[1.7] text-ink-2">{selectedService.description}</p>
            <div className="mt-7 grid gap-7 border-t border-line-4 pt-6 md:grid-cols-2"><div><span className="text-[11px] font-bold uppercase tracking-[1.1px] text-ink-3">A good fit for</span><p className="mt-2 text-sm leading-[1.6]">{selectedService.bestFor}</p></div><div><span className="text-[11px] font-bold uppercase tracking-[1.1px] text-ink-3">Usually includes</span><ul className="mt-2 space-y-2">{selectedService.includes.map((item) => <li key={item} className="flex gap-2 text-sm leading-[1.45]"><Check size={15} className="mt-0.5 shrink-0 text-brand" />{item}</li>)}</ul></div></div>
            <div className="mt-7 flex items-start gap-2 rounded-input bg-[#FFF8EE] px-4 py-3 text-[13px] leading-normal text-ink-2"><ChevronRight size={16} className="mt-0.5 shrink-0 text-[#E76F51]" /><span><strong className="text-ink">Typical outcome:</strong> {selectedService.deliverables}.</span></div>
          </article>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div><span className="text-xs font-bold uppercase tracking-[1.4px] text-brand">The working process</span><h2 className="mt-3 font-newsreader text-4xl font-semibold leading-tight">Simple from first message to final handoff.</h2><p className="mt-4 text-sm leading-[1.7] text-ink-2">You do not need a perfect brief before contacting us. A clear description of the problem is enough to begin.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand no-underline hover:text-brand-strong">Start a conversation <ArrowUpRight size={16} /></Link></div>
        <div className="relative grid gap-3 sm:grid-cols-2"><div className="absolute bottom-10 left-6 top-10 hidden w-px bg-line sm:block" />{[["01", "Tell us what is stuck", "Share your goal, current website or content, and what you want to improve. Links and screenshots are welcome."], ["02", "We clarify the scope", "We ask the useful questions, recommend the right approach and confirm what is included before work begins."], ["03", "We build and share progress", "You receive working updates, not a black box. We keep decisions and next steps easy to follow."], ["04", "You receive a clean handoff", "We test the result, explain what changed and share the files, access or guidance you need next."]].map(([number, title, description], index) => <div key={number} className={`relative flex gap-4 rounded-card border border-line border-l-4 bg-white p-5 shadow-[0_14px_34px_-30px_rgba(22,21,26,0.8)] ${["border-l-[#E76F51]", "border-l-[#247BA0]", "border-l-[#D99A2B]", "border-l-[#2A9D8F]"][index]}`}><span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${["bg-[#E76F51]", "bg-[#247BA0]", "bg-[#D99A2B]", "bg-[#2A9D8F]"][index]}`}>{number}</span><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1.5 text-[13px] leading-[1.6] text-ink-2">{description}</p></div></div>)}</div>
      </section>
      <section className="relative overflow-hidden rounded-card-xl bg-linear-to-br from-[#E76F51] via-[#D95763] to-[#7B61A8] p-10 text-center text-white shadow-[0_22px_60px_-30px_rgba(183,71,91,0.65)]">
        <div className="absolute -left-16 -top-20 h-48 w-48 rounded-full border-25 border-white/10" />
        <div className="absolute -bottom-24 -right-10 h-56 w-56 rounded-full border-30 border-[#F4D35E]/20" />
        <div className="relative">
        <h2 className="font-newsreader text-3xl font-semibold">
          Have a web project in mind?
        </h2>
        <p className="mx-auto mt-3 max-w-130 text-[15.5px] leading-[1.6] text-white/90">
          Tell us what you are trying to improve. We&apos;ll help you work out the
          next practical step.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-btn bg-white px-7 py-3.5 text-[15px] font-bold text-ink no-underline shadow-lg hover:bg-[#FFF3D7]"
        >
          Get in touch <ArrowUpRight size={17} />
        </Link>
        </div>
      </section>
    </main>
  );
}
