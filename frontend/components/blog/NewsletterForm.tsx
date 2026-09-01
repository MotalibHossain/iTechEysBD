"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return submitted ? (
    <p className="text-[13px] text-[#9C9AA3] mt-3.5">
      ✓ You&apos;re subscribed — check your inbox!
    </p>
  ) : (
    <form onSubmit={handleSubmit} className="mt-3.5">
      <input
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-[#2E2C34] bg-[#1E1D23] text-white rounded-[10px] px-3.25 py-2.75 text-[14px] outline-none transition-colors duration-200 focus:border-[#E63946] placeholder:text-[#5A5862]"
      />
      <button
        type="submit"
        className="w-full mt-2.5 bg-[#E63946] text-white border-none text-[14px] font-bold py-3 rounded-[10px] transition-colors duration-200 hover:bg-[#C71F2E] cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  );
}
