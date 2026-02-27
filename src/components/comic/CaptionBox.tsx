/**
 * CaptionBox — comic narrator caption box
 * Yellow rectangular box used for narration/context,
 * like the classic comic book narrator boxes.
 */
"use client";

import React from "react";

interface CaptionBoxProps {
  children: React.ReactNode;
  className?: string;
  color?: "yellow" | "red" | "blue" | "dark";
  id?: string;
}

export default function CaptionBox({
  children,
  className = "",
  color = "yellow",
  id,
}: CaptionBoxProps) {
  const colorStyles: Record<string, string> = {
    yellow: "bg-[#ffe156] text-[#0a0a0a] border-[#0a0a0a]",
    red: "bg-[#ff3b4a] text-white border-[#0a0a0a]",
    blue: "bg-[#3d7aed] text-white border-[#0a0a0a]",
    dark: "bg-[#1a1a2e] text-[#f5f0e8] border-[#f5f0e8]",
  };

  return (
    <div
      id={id}
      className={`
        relative inline-block will-animate gpu-accelerated
        font-['Comic_Neue'] italic font-bold
        text-sm md:text-base
        border-[3px] px-4 py-2.5 md:px-6 md:py-3
        shadow-[3px_3px_0_#0a0a0a]
        ${colorStyles[color]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
