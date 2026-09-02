"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container py-24 text-center flex flex-col items-center gap-4">
      <span className="text-[13px] font-bold tracking-[1.2px] uppercase text-brand">
        Something went wrong
      </span>
      <h2 className="font-newsreader text-[clamp(28px,4vw,40px)] font-semibold text-ink tracking-[-0.5px]">
        We hit an unexpected error.
      </h2>
      <p className="text-[15px] text-ink-2 max-w-130">
        Please try again. If the problem keeps happening, refresh the page.
      </p>
      <button
        onClick={reset}
        className="mt-2 bg-ink text-white text-[14px] font-bold px-6 py-3 rounded-btn hover:bg-brand transition-colors cursor-pointer"
      >
        Try again
      </button>
    </main>
  );
}