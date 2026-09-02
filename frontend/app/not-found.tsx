import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container py-24 text-center flex flex-col items-center gap-4">
      <span className="text-[13px] font-bold tracking-[1.2px] uppercase text-brand">
        404 · Not Found
      </span>
      <h1 className="font-newsreader text-[clamp(32px,5vw,48px)] font-semibold text-ink tracking-[-0.6px]">
        The page you were looking for isn&apos;t here.
      </h1>
      <p className="text-[15px] text-ink-2 max-w-130">
        It may have been moved, renamed, or never existed. Try heading back to the homepage or
        explore other stories.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex bg-ink text-white text-[14px] font-bold px-6 py-3 rounded-btn no-underline hover:bg-brand transition-colors"
      >
        Back to homepage
      </Link>
    </main>
  );
}
