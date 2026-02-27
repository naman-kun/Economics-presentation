/**
 * ComicPanel — reusable comic panel container
 * Supports different border styles, rotation, and entry animations.
 */
"use client";

import React from "react";

interface ComicPanelProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  borderWidth?: number;
  rotation?: number;
  variant?: "default" | "splash" | "inset" | "diagonal";
  id?: string;
}

export default function ComicPanel({
  children,
  className = "",
  borderColor = "#f5f0e8",
  borderWidth = 4,
  rotation = 0,
  variant = "default",
  id,
}: ComicPanelProps) {
  const variantStyles: Record<string, string> = {
    default: "rounded-sm",
    splash: "rounded-none",
    inset: "rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.8)]",
    diagonal: "rounded-sm skew-y-1",
  };

  return (
    <div
      id={id}
      className={`
        relative overflow-hidden will-animate gpu-accelerated
        ${variantStyles[variant]}
        ${className}
      `}
      style={{
        border: `${borderWidth}px solid ${borderColor}`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Inner halftone texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />
      {children}
    </div>
  );
}
