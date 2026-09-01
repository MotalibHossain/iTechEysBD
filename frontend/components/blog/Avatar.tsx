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
}

export default function Avatar({ src, alt, size = 44, className = "" }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`rounded-full flex items-center justify-center font-bold select-none shrink-0 ${colorClass(alt)} ${className}`}
        style={{ width: size, height: size, fontSize: Math.round(size * 0.37) }}
        aria-label={alt}
      >
        {getInitials(alt)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover shrink-0 ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
