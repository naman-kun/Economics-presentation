/**
 * DialogueBubble — comic speech/thought bubble
 * Supports speech, thought, narrator, and shout variants
 * with tail direction and squash/stretch animation readiness.
 */
"use client";

import React from "react";

interface DialogueBubbleProps {
  children: React.ReactNode;
  variant?: "speech" | "thought" | "shout" | "narrator";
  tailDirection?: "left" | "right" | "bottom" | "none";
  className?: string;
  id?: string;
}

export default function DialogueBubble({
  children,
  variant = "speech",
  tailDirection = "left",
  className = "",
  id,
}: DialogueBubbleProps) {
  const baseStyles: Record<string, string> = {
    speech:
      "bg-white text-[#0a0a0a] border-[3px] border-[#0a0a0a] rounded-[2rem] px-5 py-4 md:px-8 md:py-5",
    thought:
      "bg-white text-[#0a0a0a] border-[3px] border-[#0a0a0a] rounded-full px-5 py-4 md:px-8 md:py-5",
    shout:
      "bg-[#ffe156] text-[#0a0a0a] border-[4px] border-[#0a0a0a] rounded-sm px-5 py-4 md:px-8 md:py-5 comic-title",
    narrator:
      "bg-[#ffe156] text-[#0a0a0a] border-[3px] border-[#0a0a0a] rounded-none px-4 py-3 md:px-6 md:py-4",
  };

  const shadowStyles: Record<string, string> = {
    speech: "shadow-[4px_4px_0_#0a0a0a]",
    thought: "shadow-[3px_3px_0_#0a0a0a]",
    shout: "shadow-[6px_6px_0_#ff3b4a]",
    narrator: "shadow-[4px_4px_0_#0a0a0a]",
  };

  return (
    <div
      id={id}
      className={`
        relative inline-block will-animate gpu-accelerated
        font-['Comic_Neue'] font-bold text-base md:text-lg
        ${baseStyles[variant]}
        ${shadowStyles[variant]}
        ${className}
      `}
    >
      {children}

      {/* Speech tail */}
      {variant === "speech" && tailDirection !== "none" && (
        <div
          className="absolute w-0 h-0"
          style={{
            ...(tailDirection === "left" && {
              bottom: -14,
              left: 24,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "16px solid #0a0a0a",
            }),
            ...(tailDirection === "right" && {
              bottom: -14,
              right: 24,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "16px solid #0a0a0a",
            }),
            ...(tailDirection === "bottom" && {
              bottom: -14,
              left: "50%",
              transform: "translateX(-50%)",
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "16px solid #0a0a0a",
            }),
          }}
        >
          {/* Inner white tail */}
          <div
            className="absolute w-0 h-0"
            style={{
              top: -19,
              left: -10,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "14px solid white",
            }}
          />
        </div>
      )}

      {/* Thought bubbles (small circles) */}
      {variant === "thought" && tailDirection !== "none" && (
        <>
          <div
            className="absolute w-4 h-4 bg-white border-2 border-[#0a0a0a] rounded-full"
            style={{
              bottom: -10,
              ...(tailDirection === "left" ? { left: 20 } : { right: 20 }),
            }}
          />
          <div
            className="absolute w-2.5 h-2.5 bg-white border-2 border-[#0a0a0a] rounded-full"
            style={{
              bottom: -20,
              ...(tailDirection === "left" ? { left: 14 } : { right: 14 }),
            }}
          />
        </>
      )}
    </div>
  );
}
