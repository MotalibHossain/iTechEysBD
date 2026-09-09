"use client";

import { useState } from "react";
import Image from "next/image";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Deterministic color from first char of name
const PALETTE = [
  "bg-[#FCE4E6] text-[#C71F2E]",
  "bg-[#E0EEF0] text-[#2E7B86]",
  "bg-[#EDE6F6] text-[#6B43B5]",
  "bg-[#E7EFE3] text-[#3F7D4E]",
  "bg-[#FEF3D0] text-[#92610A]",
];

function colorClass(name: string) {
  return PALETTE[(name.charCodeAt(0) ?? 0) % PALETTE.length];
}

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
  ring?: boolean;
}

export default function Avatar({ src, alt, size = 44, className = "", ring = false }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const dim = { width: size, height: size, minWidth: size, minHeight: size };

  const wrapperBase =
    "relative rounded-full overflow-hidden shrink-0 flex items-center justify-center " +
    (ring ? "ring-2 ring-white shadow-[0_2px_10px_rgba(20,21,26,0.15)] " : "");

  if (failed || !src) {
    return (
      <div
        className={`${wrapperBase} font-bold select-none ${colorClass(alt)} ${className}`}
        style={{ ...dim, fontSize: Math.round(size * 0.37) }}
        aria-label={alt}
      >
        {getInitials(alt)}
      </div>
    );
  }

  return (
    <div className={`${wrapperBase} bg-surface-warm ${className}`} style={dim} aria-label={alt}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
