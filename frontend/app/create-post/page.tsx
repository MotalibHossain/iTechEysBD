"use client";

import { Eye } from "lucide-react";
import { useState } from "react";
import { editorTips, editorTools } from "@/lib/data/page-data";

export default function Page() {
  const [preview, setPreview] = useState(false);
  const [published, setPublished] = useState(false);
  const [comments, setComments] = useState(true);

  return (
    <main className="container pb-10">
      <div className="sticky top-18 z-40 border-b border-line-2 bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-3 py-2.5">
          <span className="text-[13px] font-semibold text-ink-3">
            ● {published ? "All changes saved" : "Draft saved"}
          </span>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setPreview(!preview)}
              className="rounded-btn border border-line-2 bg-white px-4 py-2.5 text-sm font-bold"
            >
              <Eye size={15} className="mr-1.5 inline" />
              {preview ? "Edit" : "Preview"}
            </button>
            <button
              onClick={() => setPublished(true)}
              className="rounded-btn bg-brand px-5 py-2.5 text-sm font-bold text-white"
            >
              {published ? "Published ✓" : "Publish"}
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
        <section>
          <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[.8px] text-ink-3">
            New Story
          </p>
          <div className="flex h-72 items-center justify-center rounded-card-lg border-[1.5px] border-dashed border-[#D8D5CD] bg-[#FBFAF7] text-sm text-ink-3">
            Drop a cover image here
          </div>
          <h1
            contentEditable
            suppressContentEditableWarning
            className="mt-6 min-h-12 font-newsreader text-[clamp(30px,4vw,44px)] font-semibold leading-[1.12] outline-none"
          >
            {preview ? "A thoughtful headline belongs here" : ""}
          </h1>
          <p
            contentEditable
            suppressContentEditableWarning
            className="mt-3 min-h-8 font-newsreader text-xl italic text-ink-2 outline-none"
          >
            {preview ? "Add a subtitle or summary…" : ""}
          </p>
          <div className="sticky top-32 z-30 mt-5 flex flex-wrap gap-1 rounded-input border border-line bg-white p-2">
            {editorTools.map(({ icon: Icon, label }) => (
              <button
                key={label}
                title={label}
                className="flex h-9 min-w-9 items-center justify-center rounded-input px-2 text-ink-2 hover:bg-surface-warm-strong"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            className="mt-5 min-h-70 text-[18px] leading-[1.8] text-ink-2 outline-none"
          >
            {preview ? "Tell your story… (English / বাংলা)" : ""}
          </div>
        </section>
        <aside className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-card-lg border border-line bg-white p-5">
            <h2 className="mb-3.5 text-xs font-bold uppercase tracking-[1px] text-ink-3">
              Publish settings
            </h2>
            <label className="flex flex-col gap-2 text-[13px] font-bold">
              Category
              <select className="rounded-input border border-line-2 bg-[#FBFAF7] px-3 py-2.5 text-sm font-normal">
                <option>Technology</option>
                <option>Economy</option>
                <option>AI & ML</option>
                <option>Design</option>
              </select>
            </label>
            <div className="mt-4 flex items-center justify-between border-t border-line-4 pt-4 text-[13.5px] font-semibold">
              Allow comments
              <button
                onClick={() => setComments(!comments)}
                aria-label="Toggle comments"
                className={`relative h-6 w-11 rounded-full ${comments ? "bg-brand" : "bg-[#D8D5CD]"}`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white ${comments ? "left-6" : "left-1"}`}
                />
              </button>
            </div>
          </div>
          <div className="rounded-card-lg bg-ink p-5 text-white">
            <h2 className="font-newsreader text-lg font-semibold">
              Writing tips
            </h2>
            {editorTips.map((tip) => (
              <p
                key={tip}
                className="mt-2 flex gap-2 text-[13px] leading-[1.5] text-[#B9B7C0]"
              >
                <span className="font-bold text-brand">›</span>
                {tip}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
