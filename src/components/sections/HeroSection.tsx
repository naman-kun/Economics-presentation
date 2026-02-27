/**
 * HeroSection — INTRO SECTION: Comic splash page for UTILITY
 * 
 * EXPERIENCE FLOW:
 * ═══════════════
 * 1. PAGE LOAD (no scroll):
 *    - Screen is DOMINATED by intense RGB glitch overlay
 *    - Glitch slices jitter, scanlines sweep, chromatic aberration pulses
 *    - User sees only chaotic glitch — curiosity hook
 * 
 * 2. SCROLL PHASE 1 (0% → 20%): "Glitch Clears"
 *    - Glitch overlay animates away with dramatic RGB channel collapse
 *    - Slices slide back to center, RGB layers converge
 *    - Dark comic background revealed underneath
 *    - Speed lines radiate outward
 * 
 * 3. SCROLL PHASE 2 (20% → 45%): "Title Explodes In"
 *    - "UTILITY" title POPS in with elastic squash/stretch
 *    - Subtitle fades up with RGB split text shadow
 *    - Comic burst background zooms in behind title
 *    - "THWIP!" sound effect pops from the side
 *    - Action lines pulse
 * 
 * 4. SCROLL PHASE 3 (45% → 66%): "Teaching Moment"
 *    - Caption box slides in from left (narrator box)
 *    - Dialogue bubble pops in with squash/stretch
 *    - Floating halftone particles drift
 * 
 * 5. SCROLL PHASE 4 (66% → 100%): "Spider-Web Pull Transition"
 *    - Spider web SVG draws in from center
 *    - All content pulls toward center
 *    - Scene compresses and fades to black
 */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchOverlay from "@/components/effects/GlitchOverlay";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";
import ScrollIndicator from "@/components/effects/ScrollIndicator";
import DialogueBubble from "@/components/comic/DialogueBubble";
import CaptionBox from "@/components/comic/CaptionBox";
import SoundEffect from "@/components/comic/SoundEffect";
import SpidermanDrop from "@/components/effects/SpidermanDrop";

gsap.registerPlugin(ScrollTrigger);

// Deterministic particle data (avoids hydration mismatch from random values)
const PARTICLES = [
  { w: 6, h: 6, left: 12, top: 8 },
  { w: 8, h: 8, left: 85, top: 15 },
  { w: 5, h: 5, left: 45, top: 72 },
  { w: 10, h: 10, left: 22, top: 55 },
  { w: 4, h: 4, left: 78, top: 42 },
  { w: 7, h: 7, left: 60, top: 88 },
  { w: 9, h: 9, left: 35, top: 25 },
  { w: 5, h: 5, left: 90, top: 65 },
  { w: 11, h: 11, left: 8, top: 80 },
  { w: 6, h: 6, left: 55, top: 38 },
  { w: 8, h: 8, left: 70, top: 10 },
  { w: 4, h: 4, left: 28, top: 92 },
  { w: 7, h: 7, left: 50, top: 50 },
  { w: 10, h: 10, left: 15, top: 35 },
  { w: 5, h: 5, left: 82, top: 78 },
];

// Speed lines feature removed as per user request

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      // ╔══════════════════════════════════════════════╗
      // ║  ON-LOAD: Glitch slice jitter animation      ║
      // ╚══════════════════════════════════════════════╝
      const slices = gsap.utils.toArray<HTMLElement>(".glitch-slice");
      slices.forEach((slice, i) => {
        gsap.to(slice, {
          x: () => gsap.utils.random(-20, 20),
          duration: 0.08,
          repeat: -1,
          yoyo: true,
          ease: "steps(2)",
          delay: i * 0.02,
        });
      });

      // RGB channel jitter on load
      gsap.to("#glitch-r", {
        x: "random(-14, 14)", y: "random(-6, 6)",
        duration: 0.06, repeat: -1, yoyo: true, ease: "steps(2)",
      });
      gsap.to("#glitch-b", {
        x: "random(-14, 14)", y: "random(-6, 6)",
        duration: 0.08, repeat: -1, yoyo: true, ease: "steps(3)",
      });

      // Distortion bars jitter
      gsap.to("#glitch-bars > div", {
        x: "random(-40, 40)",
        scaleX: "random(0.3, 1)",
        duration: 0.1, repeat: -1, yoyo: true, ease: "steps(3)",
        stagger: 0.03,
      });

      // Ghost echo jitter
      gsap.to("#glitch-echo", {
        x: "random(-5, 5)", y: "random(-3, 3)",
        duration: 0.07, repeat: -1, yoyo: true, ease: "steps(2)",
      });

      // Ghost text shimmer
      gsap.to("#glitch-ghost-text", {
        opacity: gsap.utils.random(0.03, 0.08),
        x: "random(-8, 8)",
        duration: 0.15, repeat: -1, yoyo: true, ease: "steps(2)",
      });

      // ── Set initial states using GSAP (not inline styles) ──
      // Speed lines removed

      // All content hidden initially
      gsap.set([
        "#hero-title-line1", "#hero-title-line2",
        "#hero-sfx", "#hero-sfx2", "#hero-caption", "#hero-dialogue",
        "#hero-burst", "#scroll-indicator"
      ], { opacity: 0 });

      // ╔══════════════════════════════════════════════════════╗
      // ║  SCROLL TIMELINE — 7.5x viewport height (750vh)     ║
      // ║  50% more scrolling required for every animation     ║
      // ║  scrub: 1.8 for smoother, slower response            ║
      // ╚══════════════════════════════════════════════════════╝
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8,
          pin: "#hero-pin-container",
          anticipatePin: 1,
        },
      });

      // ── PHASE 1 (0 → 0.16): GLITCH CLEARS ──────────────────
      master
        // Glitch slices slide back to center
        .to(".glitch-slice", {
          x: 0,
          duration: 0.12,
          stagger: 0.006,
          ease: "power2.inOut",
          overwrite: true,
        }, 0)
        // RGB channels converge to zero offset and vanish
        .to("#glitch-r", {
          x: 0, y: 0, opacity: 0,
          duration: 0.14, ease: "power3.inOut", overwrite: true,
        }, 0.01)
        .to("#glitch-b", {
          x: 0, y: 0, opacity: 0,
          duration: 0.14, ease: "power3.inOut", overwrite: true,
        }, 0.02)
        // Scanlines fade
        .to("#glitch-scanlines", { opacity: 0, duration: 0.10 }, 0.03)
        // Sweep bars fade
        .to("#glitch-sweep", { opacity: 0, duration: 0.08 }, 0.04)
        // Noise fades
        .to("#glitch-noise", { opacity: 0, duration: 0.10 }, 0.03)
        // Halftone dots fade
        .to("#glitch-halftone", { opacity: 0, duration: 0.10 }, 0.04)
        // Flicker stops
        .to("#glitch-flicker", { opacity: 0, duration: 0.06 }, 0.05)
        // Echo frames fade
        .to("#glitch-echo", { opacity: 0, duration: 0.08, overwrite: true }, 0.04)
        // Vignette softens
        .to("#glitch-vignette", { opacity: 0, duration: 0.10 }, 0.05)
        // Ghost text fades
        .to("#glitch-ghost-text", { opacity: 0, duration: 0.08, overwrite: true }, 0.03)
        // Distortion bars fade
        .to("#glitch-bars", { opacity: 0, duration: 0.08 }, 0.03)
        // Entire overlay goes away
        .to("#glitch-overlay", { opacity: 0, duration: 0.06 }, 0.12)
        // Scroll indicator appears briefly
        .to("#scroll-indicator", { opacity: 1, duration: 0.04 }, 0.08)

        // Speed lines removed

        // Comic burst background zooms in from behind
        .fromTo("#hero-burst",
          { scale: 3, opacity: 0, rotation: 30 },
          { scale: 1, opacity: 0.12, rotation: 0, duration: 0.12, ease: "power2.out" },
          0.22)

        // Scroll indicator fades out as content starts
        .to("#scroll-indicator", { opacity: 0, y: -10, duration: 0.04 }, 0.25)

        // ── PHASE 2 (0.33 → 0.50): TITLE EXPLODES IN ──────────
        // "UTILITY" title — massive elastic pop
        .fromTo("#hero-title-line1",
          { scale: 0, rotation: -18, opacity: 0, transformOrigin: "center center" },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.10, ease: "elastic.out(1.2, 0.2)" },
          0.35)
        // Squash after landing
        .to("#hero-title-line1", {
          scaleX: 1.08, scaleY: 0.92, duration: 0.02, ease: "power2.in",
          transformOrigin: "center bottom",
        }, 0.3)
        .to("#hero-title-line1", {
          scaleX: 0.96, scaleY: 1.06, duration: 0.02, ease: "power2.out",
        }, 0.32)
        .to("#hero-title-line1", {
          scaleX: 1, scaleY: 1, duration: 0.03, ease: "elastic.out(1, 0.35)",
        }, 0.34)

        // Subtitle line slides up with power
        .fromTo("#hero-title-line2",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.08, ease: "power3.out" },
          0.40)

        // RGB split flash on subtitle
        .to("#hero-title-line2", {
          textShadow: "-4px -2px 0 rgba(255,0,64,0.8), 4px 2px 0 rgba(64,64,255,0.8)",
          duration: 0.015, ease: "steps(3)",
        }, 0.33)
        .to("#hero-title-line2", {
          textShadow: "none",
          duration: 0.02, ease: "steps(2)",
        }, 0.345)

        // "THWIP!" sound effect POPS from top-right
        .fromTo("#hero-sfx",
          { scale: 0, rotation: 25, opacity: 0, x: 60 },
          { scale: 1, rotation: 12, opacity: 1, x: 0, duration: 0.06, ease: "back.out(4)" },
          0.43)

        // Speed lines removed from pulse

        // RGB flash on the main title too
        .to("#hero-title-line1", {
          textShadow: "-6px -3px 0 rgba(255,0,64,0.6), 6px 3px 0 rgba(64,64,255,0.6), 8px 8px 0 rgba(0,0,0,0.6)",
          duration: 0.015,
        }, 0.3)
        .to("#hero-title-line1", {
          textShadow: "5px 5px 0 var(--comic-red), -3px -3px 0 var(--comic-blue), 8px 8px 0 rgba(0,0,0,0.6)",
          duration: 0.03,
        }, 0.315)

        // ── PHASE 3 (0.50 → 0.66): TEACHING MOMENT ────────────
        // Caption box slides in from left with rotation
        .fromTo("#hero-caption",
          { x: -200, rotation: -8, opacity: 0, scale: 0.8 },
          { x: 0, rotation: -2, opacity: 1, scale: 1, duration: 0.10, ease: "power3.out" },
          0.52)
        // Caption squash/stretch settle
        .to("#hero-caption", {
          scaleX: 1.05, scaleY: 0.95, duration: 0.025, ease: "power2.in",
          transformOrigin: "left bottom",
        }, 0.47)
        .to("#hero-caption", {
          scaleX: 1, scaleY: 1, duration: 0.03, ease: "elastic.out(1, 0.45)",
        }, 0.495)

        // "POP!" sound effect from bottom-left
        .fromTo("#hero-sfx2",
          { scale: 0, opacity: 0, rotation: -15 },
          { scale: 1, opacity: 1, rotation: -8, duration: 0.05, ease: "back.out(5)" },
          0.57)

        // Dialogue bubble POPS in with exaggerated squash/stretch
        .fromTo("#hero-dialogue",
          { scale: 0, opacity: 0, y: 40, rotation: 5 },
          { scale: 1.15, opacity: 1, y: 0, rotation: 0, duration: 0.06, ease: "power3.out" },
          0.60)
        // Overshoot squash
        .to("#hero-dialogue", {
          scaleX: 1.12, scaleY: 0.88, duration: 0.025, ease: "power2.in",
          transformOrigin: "center bottom",
        }, 0.51)
        // Stretch back up
        .to("#hero-dialogue", {
          scaleX: 0.94, scaleY: 1.08, duration: 0.025, ease: "power2.out",
        }, 0.535)
        // Settle with elastic bounce
        .to("#hero-dialogue", {
          scaleX: 1, scaleY: 1, scale: 1, duration: 0.03, ease: "elastic.out(1, 0.25)",
        }, 0.56)

        // Floating halftone particles drift in
        .to(".halftone-particle", {
          y: "random(-30, 30)", x: "random(-20, 20)",
          opacity: 0.5, duration: 0.12, stagger: 0.015, ease: "sine.inOut",
        }, 0.4)

        // Burst scales subtly for parallax
        .to("#hero-burst", { scale: 1.05, rotation: 2, duration: 0.15 }, 0.37)

        // ── PHASE 4 (0.66 → 1.0): SPIDER-WEB PULL TRANSITION ──
        // Speed lines removed

        // Spider web fades in
        .to("#spider-web-transition", {
          opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out",
        }, 0.77) // shifted +0.20

        // Web threads draw in (stroke-dashoffset animation)
        .to(".web-thread", {
          strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut",
        }, 0.77) // shifted +0.20
        .to(".web-ring", {
          strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut",
        }, 0.80) // shifted +0.20

        // Content pulls toward center and vanishes
        .to("#hero-title-line1", {
          scale: 0.7, y: 30, opacity: 0, duration: 0.08, ease: "power3.in",
        }, 0.73) // shifted +0.10
        .to("#hero-title-line2", {
          scale: 0.8, y: 20, opacity: 0, duration: 0.06, ease: "power3.in",
        }, 0.74) // shifted +0.10
        .to("#hero-caption", {
          x: 100, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in",
        }, 0.75) // shifted +0.10
        .to("#hero-dialogue", {
          y: 60, opacity: 0, scale: 0.7, duration: 0.06, ease: "power3.in",
        }, 0.76) // shifted +0.10
        .to("#hero-sfx", { opacity: 0, scale: 0, duration: 0.05 }, 0.74) // shifted +0.10
        .to("#hero-sfx2", { opacity: 0, scale: 0, duration: 0.05 }, 0.74) // shifted +0.10

        // Spiderman bounces up out of the screen exactly when text finishes vanishing (0.76 + 0.06 = 0.82)
        .to("#spiderman-wrapper", {
          yPercent: -120, // Full exit
          duration: 0.08,
          ease: "back.in(1.2)", // 20% less intense than the default 1.5 bouncing elastic out
        }, 0.82)

        // Web expands and fades to black
        .to("#spider-web-transition", {
          scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in",
        }, 0.80) // shifted +0.10

        // Burst fades
        .to("#hero-burst", { opacity: 0, scale: 1.3, duration: 0.08 }, 0.80) // shifted +0.10

        // Halftone particles scatter
        .to(".halftone-particle", {
          opacity: 0, scale: 0, duration: 0.05, stagger: 0.008,
        }, 0.80) // shifted +0.10

        // Final fade to black
        .to("#hero-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero-section-main"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "750vh" }} /* 7.5 viewports — 50% more scroll depth */
    >
      {/* ═══ PINNED CONTAINER — stays fixed during scroll ═══ */}
      <div
        id="hero-pin-container"
        className="relative w-full h-screen overflow-hidden"
        style={{ background: "var(--comic-black)" }}
      >

        {/* ── Glitch overlay (dominates on load) ── */}
        <GlitchOverlay />

        {/* ── Spiderman Drop Animation ── */}
        <SpidermanDrop />

        {/* ── Comic burst background (hidden initially) ── */}
        <div
          id="hero-burst"
          className="absolute inset-0 z-2 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <img
            src="/assets/comic burst clean.png"
            alt=""
            className="w-[140%] max-w-none"
            style={{
              filter: "contrast(1.6) brightness(1.6) saturate(1.4)", // Increased from 1.09 (+50%)
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* ── Halftone texture background (Pure CSS to avoid watermarks) ── */}
        <div
          className="absolute inset-0 z-3 opacity-[0.2]"
          style={{
            backgroundImage: "radial-gradient(#000 2px, transparent 2.5px)",
            backgroundSize: "10px 10px",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        />

        {/* ── Speed lines removed ── */}

        {/* ── Floating halftone particles ── */}
        <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="halftone-particle absolute rounded-full"
              style={{
                width: `${p.w}px`,
                height: `${p.h}px`,
                background: i % 3 === 0
                  ? "rgba(255,59,74,0.3)"
                  : i % 3 === 1
                    ? "rgba(61,122,237,0.3)"
                    : "rgba(255,225,86,0.3)",
                left: `${p.left}%`,
                top: `${p.top}%`,
                opacity: 0,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>

        {/* ════════════════════════════════════════════════
             MAIN CONTENT — centered stack
            ════════════════════════════════════════════════ */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 md:px-12">

          {/* ── Sound effect: THWIP! (top-right) ── */}
          <div id="hero-sfx" className="absolute top-[10%] right-[5%] md:top-[12%] md:right-[10%]" style={{ opacity: 0 }}>
            <SoundEffect text="THWIP!" rotation={12} size="md" color="#ff3b4a" />
          </div>

          {/* ── Sound effect: POP! (bottom-left) ── */}
          <div id="hero-sfx2" className="absolute bottom-[18%] left-[5%] md:bottom-[20%] md:left-[8%]" style={{ opacity: 0 }}>
            <SoundEffect text="POP!" rotation={-10} size="sm" color="#ffe156" />
          </div>

          {/* ── TITLE BLOCK ── */}
          <div className="flex flex-col items-center text-center max-w-5xl">
            {/* Main title: UTILITY */}
            <h1
              id="hero-title-line1"
              className="comic-title leading-none select-none"
              data-text="UTILITY"
              style={{
                fontSize: "clamp(3.5rem, 15vw, 12rem)",
                color: "var(--comic-white)",
                WebkitTextStroke: "2px var(--comic-red)",
                textShadow: "5px 5px 0 var(--comic-red), -3px -3px 0 var(--comic-blue), 8px 8px 0 rgba(0,0,0,0.6)",
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              UTILITY
            </h1>

            {/* Subtitle */}
            <p
              id="hero-title-line2"
              className="comic-marker mt-2 md:mt-4 leading-snug select-none"
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1.8rem)",
                color: "var(--comic-yellow)",
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              The Invisible Superpower Behind Every Choice
            </p>
          </div>

          {/* ── CAPTION BOX (narrator) ── */}
          <div
            id="hero-caption"
            className="mt-8 md:mt-12 max-w-md md:max-w-lg"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            <CaptionBox color="yellow">
              <span className="text-sm md:text-base lg:text-lg">
                &quot;Why does the 5th slice of pizza feel less exciting than the first?&quot;
              </span>
            </CaptionBox>
          </div>

          {/* ── DIALOGUE BUBBLE ── */}
          <div
            id="hero-dialogue"
            className="mt-6 md:mt-8"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            <DialogueBubble variant="thought" tailDirection="left">
              <span className="text-sm md:text-base lg:text-lg">
                Wait… does happiness follow math? 🤔
              </span>
            </DialogueBubble>
          </div>
        </div>

        {/* ── Spider web transition overlay ── */}
        <SpiderWebTransition />

        {/* ── Scroll indicator ── */}
        <ScrollIndicator />

        {/* ── Persistent halftone grain ── */}
        <div className="halftone-overlay" />

      </div>
    </section>
  );
}
