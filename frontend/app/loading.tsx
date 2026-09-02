export default function Loading() {
  return (
    <div className="container py-24 flex items-center justify-center">
      <div className="flex items-center gap-3 text-ink-3 text-[14px] font-semibold">
        <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse-dot" />
        Loading…
      </div>
    </div>
  );
}