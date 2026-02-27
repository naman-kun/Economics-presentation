/**
 * ClosingSection — final comic splash page
 * Recap + credits with a cinematic outro animation.
 */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ComicPanel from "@/components/comic/ComicPanel";
import CaptionBox from "@/components/comic/CaptionBox";
import SoundEffect from "@/components/comic/SoundEffect";
import DialogueBubble from "@/components/comic/DialogueBubble";

gsap.registerPlugin(ScrollTrigger);

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // SFX pop
      gsap.fromTo(
        "#closing-sfx",
        { scale: 0, rotation: -25, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: "#closing-sfx",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Recap items stagger
      gsap.utils.toArray<HTMLElement>(".closing-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Credits fade in
      gsap.fromTo(
        "#closing-credits",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#closing-credits",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-32 px-4 md:px-8 flex flex-col items-center justify-center"
      style={{ background: "var(--comic-black)" }}
    >
      <ComicPanel
        className="max-w-4xl w-full p-8 md:p-14 flex flex-col items-center text-center"
        variant="splash"
        borderColor="#ffe156"
        borderWidth={5}
      >
        <div className="absolute inset-0 bg-linear-to-b from-[#1a1a2e] via-[#0a0a0a] to-[#0a0a0a] z-0" />

        {/* Burst BG */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-center"
          style={{ opacity: 0.06 }}
        >
          <Image
            src="/assets/comic burst.jpg"
            alt=""
            width={1920}
            height={1080}
            className="w-[140%] max-w-none"
            style={{ filter: "contrast(1.4) brightness(0.7)" }}
            priority={false}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* SFX */}
          <div id="closing-sfx" className="mb-6 opacity-0">
            <SoundEffect text="THE END!" size="xl" color="#ffe156" rotation={-2} />
          </div>

          {/* Recap */}
          <div className="mt-6 mb-8 w-full max-w-xl">
            <CaptionBox color="yellow" className="mb-6">
              What we covered today:
            </CaptionBox>

            <div className="flex flex-col gap-3 mt-4 text-left">
              {[
                "📉 The Law of Demand — price ↓ = quantity demanded ↑",
                "📈 The Law of Supply — price ↑ = quantity supplied ↑",
                "⚖️ Equilibrium — where supply meets demand",
                "🔀 Shifts — factors that move the entire curve",
                "🏗️ Market Structures — from competition to monopoly",
              ].map((item, i) => (
                <div
                  key={i}
                  className="closing-item opacity-0 comic-body text-(--comic-white) text-sm md:text-base bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-sm px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Closing bubble */}
          <DialogueBubble variant="speech" tailDirection="none">
            <span className="text-sm md:text-base">
              &quot;With great economic knowledge comes great fiscal responsibility.&quot; 🕷️
            </span>
          </DialogueBubble>

          {/* Credits */}
          <div id="closing-credits" className="mt-12 opacity-0 flex flex-col items-center gap-2">
            <p className="comic-marker text-(--comic-red) text-lg md:text-xl">
              Economics Presentation
            </p>
            <p className="comic-body text-(--comic-white) text-xs opacity-50">
              Built with Next.js • GSAP • Lenis • Spider-Verse vibes
            </p>
            <div className="mt-4 w-8 h-8 rounded-full border-2 border-(--comic-red) flex items-center justify-center">
              <span className="text-(--comic-red) text-xs">🕸️</span>
            </div>
          </div>
        </div>
      </ComicPanel>

      <div className="halftone-overlay" />
    </section>
  );
}
