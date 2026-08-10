"use client";

// ─────────────────────────────────────────────────────────────────────────────
// NewsletterSection
// Full-width light-parchment strip with a centred email subscribe form.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [label, setLabel] = useState("Subscribe");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLabel("Subscribed ✓");
    setEmail("");
    setTimeout(() => setLabel("Subscribe"), 2400);
  }

  return (
    <section className="mt-14 border-t border-b border-[#E6E3DB] bg-[linear-gradient(180deg,#F1EFE9,#EDEAE3)]">
      <div className="max-w-[680px] mx-auto px-7 py-[58px] text-center">

        {/* Label */}
        <span className="inline-block text-[12px] font-bold tracking-[1.4px] uppercase text-[#E63946]">
          Newsletter
        </span>

        {/* Headline */}
        <h2
          className="font-semibold leading-[1.14] tracking-[-0.6px] mt-3 font-newsreader text-clamp-newsletter"
        >
          Stories worth your inbox, every week
        </h2>

        {/* Sub-text */}
        <p className="text-[15.5px] leading-[1.6] text-[#6B6A70] mt-3">
          Join 24,000+ readers getting our best technology, design and culture
          writing — in English and বাংলা.
        </p>

        {/* Subscribe form */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2.5 max-w-[460px] mx-auto mt-[26px] flex-wrap justify-center"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 min-w-[220px] border border-[#DAD7CE] bg-white rounded-[11px] px-4 py-[14px] text-[15px] outline-none transition-shadow duration-200 focus:border-[#E63946] focus:shadow-[0_0_0_3px_rgba(230,57,70,0.14)]"
          />
          <button
            type="submit"
            className="bg-[#16151A] text-white font-bold text-[15px] px-[26px] py-[14px] rounded-[11px] border-none hover:bg-[#E63946] transition-colors duration-200 cursor-pointer"
          >
            {label}
          </button>
        </form>
      </div>
    </section>
  );
}
