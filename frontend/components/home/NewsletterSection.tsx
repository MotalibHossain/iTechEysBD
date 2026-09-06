"use client";

// ─────────────────────────────────────────────────────────────────────────────
// NewsletterSection — centred parchment strip with a subscribe form.
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
    <section className="rounded-card-lg border border-line-3 bg-[linear-gradient(180deg,#F1EFE9,#EDEAE3)] py-14">
      <div className="max-w-170 mx-auto px-6 text-center">

        <span className="inline-block text-[12px] font-bold tracking-[1.4px] uppercase text-brand">
          Newsletter
        </span>

        <h2 className="font-semibold leading-[1.15] tracking-[-0.5px] mt-3 font-newsreader text-newsletter">
          Stories worth your inbox, every week
        </h2>

        <p className="text-[15px] leading-[1.6] text-ink-2 mt-3">
          Join 24,000+ readers getting our best technology, design and culture writing — in English and বাংলা.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2.5 max-w-115 mx-auto mt-6 flex-wrap justify-center"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 min-w-55 border border-[#DAD7CE] bg-surface rounded-input px-4 py-3.5 text-[15px] outline-none transition-shadow duration-200 focus:border-brand focus:shadow-[0_0_0_3px_rgba(230,57,70,0.14)]"
          />
          <button
            type="submit"
            className="bg-ink text-white font-bold text-[15px] px-6 py-3.5 rounded-input hover:bg-brand transition-colors duration-200 cursor-pointer"
          >
            {label}
          </button>
        </form>
      </div>
    </section>
  );
}
