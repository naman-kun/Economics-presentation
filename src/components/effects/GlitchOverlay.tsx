/**
 * GlitchOverlay — INTENSE full-screen RGB glitch effect
 * 
 * Spider-Verse inspired chromatic aberration that completely
 * covers the screen on load. Animated out via GSAP on scroll.
 * 
 * Layers:
 *  1. Heavy RGB channel separation (red + blue + green)
 *  2. Animated horizontal glitch slices with jitter
 *  3. Thick scanlines
 *  4. Sweeping scanline bar
 *  5. Halftone dot grid
 *  6. Film grain noise
 *  7. Flicker strobe
 *  8. Ghost echo frame (offset duplicate)
 *  9. Vignette
 * 10. Central "UTILITY" ghost text echo
 */
"use client";

import React from "react";

export default function GlitchOverlay({ id = "glitch-overlay" }: { id?: string }) {
  return (
    <div
      id={id}
      className="fixed inset-0 z-100 pointer-events-none"
      style={{ willChange: "opacity, transform" }}
    >
      {/* ███ LAYER 1: RED channel — heavy offset ███ */}
      <div
        id="glitch-r"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,0,64,0.35) 0%, rgba(255,0,64,0.15) 40%, rgba(255,0,64,0.4) 70%, rgba(255,0,64,0.2) 100%)",
          mixBlendMode: "screen",
          transform: "translate(-8px, -4px) scaleX(1.003)",
          willChange: "transform",
        }}
      />

      {/* ███ LAYER 2: BLUE channel — heavy offset ███ */}
      <div
        id="glitch-b"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(64,64,255,0.3) 0%, rgba(64,64,255,0.2) 50%, rgba(64,64,255,0.35) 100%)",
          mixBlendMode: "screen",
          transform: "translate(8px, 4px) scaleX(0.997)",
          willChange: "transform",
        }}
      />

      {/* ███ LAYER 4: Horizontal GLITCH SLICES with jitter ███ */}
      <div id="glitch-slices" className="absolute inset-0 overflow-hidden" style={{ willChange: "transform" }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="glitch-slice absolute left-0 right-0"
            data-slice={i}
            style={{
              top: `${i * (100 / 12)}%`,
              height: `${100 / 12}%`,
              background: i % 3 === 0 
                ? "rgba(255,0,64,0.08)" 
                : i % 3 === 1
                ? "rgba(64,64,255,0.08)"
                : "transparent",
              borderTop: i % 4 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              borderBottom: i % 5 === 0 ? "1px solid rgba(255,0,64,0.1)" : "none",
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* ███ LAYER 5: THICK scanlines ███ */}
      <div
        id="glitch-scanlines"
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.25) 1px, rgba(0,0,0,0.25) 3px)",
          opacity: 0.7,
        }}
      />

      {/* ███ LAYER 6: Sweeping bright scanline bar ███ */}
      <div
        id="glitch-sweep"
        className="absolute left-0 right-0"
        style={{
          height: "6px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 70%, transparent 100%)",
          top: "0%",
          boxShadow: "0 0 20px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)",
          animation: "scanline 2.5s linear infinite",
          willChange: "transform",
        }}
      />

      {/* ███ LAYER 7: Second sweeping bar (offset timing) ███ */}
      <div
        className="absolute left-0 right-0"
        style={{
          height: "3px",
          background: "linear-gradient(90deg, transparent, rgba(255,0,64,0.4), transparent)",
          top: "0%",
          animation: "scanline 1.8s linear infinite",
          animationDelay: "0.7s",
          willChange: "transform",
        }}
      />

      {/* ███ LAYER 8: Halftone dot grid ███ */}
      <div
        id="glitch-halftone"
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
          opacity: 0.9,
        }}
      />

      {/* ███ LAYER 9: Film grain noise ███ */}
      <div
        id="glitch-noise"
        className="absolute inset-0"
        style={{
          opacity: 0.25,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          animation: "flicker 0.12s steps(3) infinite",
          willChange: "opacity",
        }}
      />

      {/* ███ LAYER 10: GHOST ECHO — offset duplicate frame ███ */}
      <div
        id="glitch-echo"
        className="absolute inset-0"
        style={{
          border: "2px solid rgba(255,0,64,0.15)",
          transform: "translate(3px, 2px) scale(1.002)",
          opacity: 0.6,
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          border: "2px solid rgba(64,64,255,0.15)",
          transform: "translate(-3px, -2px) scale(0.998)",
          opacity: 0.5,
          mixBlendMode: "screen",
        }}
      />

      {/* ███ LAYER 11: Flicker strobe ███ */}
      <div
        id="glitch-flicker"
        className="absolute inset-0"
        style={{
          background: "rgba(255,255,255,0.03)",
          animation: "flicker 0.1s steps(2) infinite",
          willChange: "opacity",
        }}
      />

      {/* ███ LAYER 12: Dark vignette ███ */}
      <div
        id="glitch-vignette"
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* ███ LAYER 13: Ghost text echo "UTILITY" ███ */}
      <div
        id="glitch-ghost-text"
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ opacity: 0.06 }}
      >
        <span
          className="comic-title text-[20vw] md:text-[16vw] select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,0,64,0.5)",
            transform: "translate(5px, 3px) rotate(-1deg)",
          }}
        >
          UTILITY
        </span>
      </div>

      {/* ███ LAYER 14: Horizontal distortion bars ███ */}
      <div id="glitch-bars" className="absolute inset-0 overflow-hidden" style={{ opacity: 0.4 }}>
        <div
          className="absolute left-0 right-0 h-0.5"
          style={{
            top: "23%",
            background: "rgba(255,0,64,0.6)",
            transform: "scaleX(0.7) translateX(30px)",
            willChange: "transform",
          }}
        />
        <div
          className="absolute left-0 right-0 h-0.75"
          style={{
            top: "47%",
            background: "rgba(64,64,255,0.5)",
            transform: "scaleX(0.5) translateX(-50px)",
            willChange: "transform",
          }}
        />
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            top: "68%",
            background: "rgba(255,255,255,0.4)",
            transform: "scaleX(0.8) translateX(20px)",
            willChange: "transform",
          }}
        />
        <div
          className="absolute left-0 right-0 h-0.5"
          style={{
            top: "82%",
            background: "rgba(255,0,64,0.4)",
            transform: "scaleX(0.6) translateX(-40px)",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}
