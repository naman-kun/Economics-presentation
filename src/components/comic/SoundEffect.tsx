/**
 * SoundEffect — comic onomatopoeia typography
 * "THWIP!", "POW!", "BANG!" style text with
 * exaggerated scale, rotation, and color.
 */
"use client";

import React from "react";

interface SoundEffectProps {
  text: string;
  className?: string;
  color?: string;
  strokeColor?: string;
  rotation?: number;
  size?: "sm" | "md" | "lg" | "xl";
  id?: string;
}

export default function SoundEffect({
  text,
  className = "",
  color = "#ffe156",
  strokeColor = "#0a0a0a",
  rotation = -6,
  size = "lg",
  id,
}: SoundEffectProps) {
  const sizeStyles: Record<string, string> = {
    sm: "text-3xl md:text-4xl",
    md: "text-5xl md:text-6xl",
    lg: "text-6xl md:text-8xl",
    xl: "text-7xl md:text-[10rem]",
  };

  return (
    <div
      id={id}
      className={`
        will-animate gpu-accelerated
        comic-title select-none
        ${sizeStyles[size]}
        ${className}
      `}
      style={{
        color,
        transform: `rotate(${rotation}deg)`,
        WebkitTextStroke: `3px ${strokeColor}`,
        textShadow: `4px 4px 0 ${strokeColor}, -1px -1px 0 ${strokeColor}, 1px -1px 0 ${strokeColor}, -1px 1px 0 ${strokeColor}`,
        letterSpacing: "0.05em",
        lineHeight: 0.9,
      }}
      data-text={text}
    >
      {text}
    </div>
  );
}
