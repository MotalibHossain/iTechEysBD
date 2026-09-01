"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

export default function SaveButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      onClick={() => setSaved((s) => !s)}
      className="flex items-center gap-1.75 h-10 px-4 rounded-[11px] border border-[#EAE8E2] bg-white text-[#16151A] text-[13.5px] font-bold transition-colors duration-200 hover:border-[#16151A] cursor-pointer"
    >
      <Bookmark
        size={15}
        strokeWidth={2}
        fill={saved ? "currentColor" : "none"}
      />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
