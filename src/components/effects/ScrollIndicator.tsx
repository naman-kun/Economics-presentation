/**
 * ScrollIndicator — animated scroll-down prompt
 * Bouncing chevron with comic styling that fades out on scroll.
 */
"use client";

import React from "react";

export default function ScrollIndicator({ id = "scroll-indicator" }: { id?: string }) {
  return (
    <div
      id={id}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 gpu-accelerated"
    >
      <span className="font-['Comic_Neue'] text-xs md:text-sm text-[#f5f0e8] tracking-[0.3em] uppercase opacity-70">
        Scroll to begin
      </span>
      <div className="flex flex-col items-center gap-0.5" style={{ animation: "float 2s ease-in-out infinite" }}>
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L12 12L22 2" stroke="#ff3b4a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.4 }}>
          <path d="M2 2L12 12L22 2" stroke="#ff3b4a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
