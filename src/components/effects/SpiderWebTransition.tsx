/**
 * SpiderWebTransition — SVG spider-web pull transition
 * Web threads radiate from center and "pull" the scene away.
 * Threads and rings use strokeDasharray for GSAP draw-in animation.
 * 
 * All coordinates are PRE-COMPUTED to avoid hydration mismatches
 * from floating-point Math.cos/Math.sin differences between server/client.
 */
"use client";

import React from "react";

// Pre-computed radial thread endpoints (20 threads, radius 560, center 400,400)
const RADIAL_THREADS = [
  { x2: 960, y2: 400 },
  { x2: 932.2, y2: 573 },
  { x2: 853.1, y2: 727.1 },
  { x2: 730.1, y2: 845.2 },
  { x2: 573, y2: 914.6 },
  { x2: 400, y2: 960 },
  { x2: 227, y2: 914.6 },
  { x2: 69.9, y2: 845.2 },
  { x2: -53, y2: 727.1 },
  { x2: -132.2, y2: 573 },
  { x2: -160, y2: 400 },
  { x2: -132.2, y2: 227 },
  { x2: -53, y2: 72.9 },
  { x2: 69.9, y2: -45.2 },
  { x2: 227, y2: -114.6 },
  { x2: 400, y2: -160 },
  { x2: 573, y2: -114.6 },
  { x2: 730.1, y2: -45.2 },
  { x2: 853.1, y2: 72.9 },
  { x2: 932.2, y2: 227 },
];

// Pre-computed connector lines between rings (12 angles × 4 ring pairs)
// All values rounded to 1 decimal to avoid floating-point hydration drift
const CONNECTORS = [
  // i=0 (0°→15°)
  { x1: 460, y1: 400, x2: 515.9, y2: 431 },
  { x1: 520, y1: 400, x2: 583.6, y2: 449.2 },
  { x1: 590, y1: 400, x2: 660.8, y2: 469.9 },
  { x1: 670, y1: 400, x2: 747.7, y2: 493.2 },
  // i=1 (30°→45°)
  { x1: 452, y1: 430, x2: 484.9, y2: 484.9 },
  { x1: 503.9, y1: 460, x2: 548.5, y2: 548.5 },
  { x1: 564.5, y1: 495, x2: 617.7, y2: 617.7 },
  { x1: 633.8, y1: 535, x2: 694.6, y2: 694.6 },
  // i=2 (60°→75°)
  { x1: 430, y1: 452, x2: 431, y2: 515.9 },
  { x1: 460, y1: 503.9, x2: 449.2, y2: 583.6 },
  { x1: 495, y1: 564.5, x2: 469.9, y2: 660.8 },
  { x1: 535, y1: 633.8, x2: 493.2, y2: 747.7 },
  // i=3 (90°→105°)
  { x1: 400, y1: 460, x2: 384.1, y2: 515.9 },
  { x1: 400, y1: 520, x2: 368.9, y2: 583.6 },
  { x1: 400, y1: 590, x2: 350.1, y2: 660.8 },
  { x1: 400, y1: 670, x2: 326.8, y2: 747.7 },
  // i=4 (120°→135°)
  { x1: 370, y1: 452, x2: 331, y2: 484.9 },
  { x1: 340, y1: 503.9, x2: 251.5, y2: 548.5 },
  { x1: 305, y1: 564.5, x2: 182.3, y2: 617.7 },
  { x1: 265, y1: 633.8, x2: 105.4, y2: 694.6 },
  // i=5 (150°→165°)
  { x1: 348, y1: 430, x2: 284.1, y2: 431 },
  { x1: 296.1, y1: 460, x2: 216.4, y2: 449.2 },
  { x1: 235.5, y1: 495, x2: 139.2, y2: 469.9 },
  { x1: 166.2, y1: 535, x2: 52.3, y2: 493.2 },
  // i=6 (180°→195°)
  { x1: 340, y1: 400, x2: 284.1, y2: 369 },
  { x1: 280, y1: 400, x2: 216.4, y2: 350.8 },
  { x1: 210, y1: 400, x2: 139.2, y2: 330.1 },
  { x1: 130, y1: 400, x2: 52.3, y2: 306.8 },
  // i=7 (210°→225°)
  { x1: 348, y1: 370, x2: 315.1, y2: 315.1 },
  { x1: 296.1, y1: 340, x2: 251.5, y2: 251.5 },
  { x1: 235.5, y1: 305, x2: 182.3, y2: 182.3 },
  { x1: 166.2, y1: 265, x2: 105.4, y2: 105.4 },
  // i=8 (240°→255°)
  { x1: 370, y1: 348, x2: 369, y2: 284.1 },
  { x1: 340, y1: 296.1, x2: 350.8, y2: 216.4 },
  { x1: 305, y1: 235.5, x2: 330.1, y2: 139.2 },
  { x1: 265, y1: 166.2, x2: 306.8, y2: 52.3 },
  // i=9 (270°→285°)
  { x1: 400, y1: 340, x2: 415.9, y2: 284.1 },
  { x1: 400, y1: 280, x2: 431.1, y2: 216.4 },
  { x1: 400, y1: 210, x2: 449.9, y2: 139.2 },
  { x1: 400, y1: 130, x2: 473.2, y2: 52.3 },
  // i=10 (300°→315°)
  { x1: 430, y1: 348, x2: 484.9, y2: 315.1 },
  { x1: 460, y1: 296.1, x2: 548.5, y2: 251.5 },
  { x1: 495, y1: 235.5, x2: 617.7, y2: 182.3 },
  { x1: 535, y1: 166.2, x2: 694.6, y2: 105.4 },
  // i=11 (330°→345°)
  { x1: 452, y1: 370, x2: 515.9, y2: 369 },
  { x1: 503.9, y1: 340, x2: 583.6, y2: 350.8 },
  { x1: 564.5, y1: 305, x2: 660.8, y2: 330.1 },
  { x1: 633.8, y1: 265, x2: 747.7, y2: 306.8 },
];

export default function SpiderWebTransition({ id = "spider-web-transition" }: { id?: string }) {
  return (
    <div
      id={id}
      className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
      style={{ opacity: 0, willChange: "transform, opacity" }}
    >
      <svg
        viewBox="0 0 800 800"
        className="w-full h-full max-w-[800px] max-h-[800px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Radial web threads from center */}
        {RADIAL_THREADS.map((t, i) => (
          <line
            key={`radial-${i}`}
            className="web-thread"
            x1="400"
            y1="400"
            x2={t.x2}
            y2={t.y2}
            stroke="#f5f0e8"
            strokeWidth={i % 3 === 0 ? "2" : "1"}
            opacity="0.8"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
        ))}

        {/* Concentric web rings */}
        {([
          { r: 60, sw: "1.5", op: "0.6" },
          { r: 120, sw: "1.5", op: "0.53" },
          { r: 190, sw: "0.8", op: "0.46" },
          { r: 270, sw: "0.8", op: "0.39" },
          { r: 360, sw: "0.8", op: "0.32" },
          { r: 460, sw: "0.8", op: "0.25" },
        ]).map((ring, i) => (
          <circle
            key={`ring-${i}`}
            className="web-ring"
            cx="400"
            cy="400"
            r={ring.r}
            fill="none"
            stroke="#f5f0e8"
            strokeWidth={ring.sw}
            opacity={ring.op}
            strokeDasharray="2000"
            strokeDashoffset="2000"
          />
        ))}

        {/* Spiral connectors between rings */}
        {CONNECTORS.map((c, i) => (
          <line
            key={`conn-${i}`}
            className="web-thread"
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke="#f5f0e8"
            strokeWidth="0.6"
            opacity="0.3"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
        ))}

        {/* Center dot — red accent */}
        <circle cx="400" cy="400" r="5" fill="#ff3b4a" opacity="0.9">
          <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="400" r="12" fill="none" stroke="#ff3b4a" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="12;18;12" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
