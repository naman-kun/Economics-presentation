/**
 * MarketStructuresSection — comic panels covering market types
 * Perfect competition → Monopoly spectrum with diagonal/inset panels.
 */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ComicPanel from "@/components/comic/ComicPanel";
import CaptionBox from "@/components/comic/CaptionBox";
import DialogueBubble from "@/components/comic/DialogueBubble";
import SoundEffect from "@/components/comic/SoundEffect";

gsap.registerPlugin(ScrollTrigger);

const structures = [
  {
    title: "PERFECT COMPETITION",
    color: "#00e5ff",
    border: "#00e5ff",
    caption: "Many sellers, identical products",
    body: "Farmers selling wheat — no single seller can control the price. The market decides. Price = Marginal Cost in the long run.",
    bubble: { text: "No one has market power here!", variant: "speech" as const },
  },
  {
    title: "MONOPOLISTIC COMPETITION",
    color: "#a855f7",
    border: "#a855f7",
    caption: "Many sellers, differentiated products",
    body: "Restaurants, clothing brands, coffee shops — they compete on quality, branding, and style. Some pricing power, but lots of competition.",
    bubble: { text: "My coffee is UNIQUE! ☕", variant: "shout" as const },
  },
  {
    title: "OLIGOPOLY",
    color: "#ff6b35",
    border: "#ff6b35",
    caption: "Few dominant sellers",
    body: "Airlines, phone carriers, car manufacturers — a handful of firms dominate. They watch each other closely. Game theory applies here!",
    bubble: { text: "If they raise prices… should we?", variant: "thought" as const },
  },
  {
    title: "MONOPOLY",
    color: "#ff3b4a",
    border: "#ff3b4a",
    caption: "One seller, no close substitutes",
    body: "Utility companies, patented drugs — one firm controls the market. They set the price. Barriers to entry keep competitors out.",
    bubble: { text: "I AM the market.", variant: "shout" as const },
  },
];

export default function MarketStructuresSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        "#ms-heading",
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: "#ms-heading",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Panels cascade in with stagger
      const panels = gsap.utils.toArray<HTMLElement>(".ms-panel");
      panels.forEach((panel, i) => {
        gsap.fromTo(
          panel,
          { y: 100, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // SFX
      gsap.utils.toArray<HTMLElement>(".ms-sfx").forEach((sfx) => {
        gsap.fromTo(
          sfx,
          { scale: 0, rotation: -20, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
            scrollTrigger: {
              trigger: sfx,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-32 px-4 md:px-8"
      style={{ background: "var(--comic-black)" }}
    >
      {/* Heading */}
      <div id="ms-heading" className="text-center mb-16 opacity-0">
        <h2
          className="comic-title text-4xl sm:text-6xl md:text-7xl"
          style={{
            color: "var(--comic-cyan)",
            WebkitTextStroke: "2px var(--comic-black)",
            textShadow: "3px 3px 0 var(--comic-black)",
          }}
        >
          MARKET STRUCTURES
        </h2>
        <div className="mt-4 inline-block">
          <CaptionBox color="dark">
            From perfect competition to absolute monopoly — the spectrum of market power.
          </CaptionBox>
        </div>
      </div>

      {/* Spectrum arrow */}
      <div className="max-w-5xl mx-auto mb-8 hidden md:flex items-center gap-2 px-4">
        <span className="comic-body text-xs text-(--comic-cyan) font-bold uppercase tracking-wider">
          Less power
        </span>
        <div className="flex-1 h-1 bg-linear-to-r from-[#00e5ff] via-[#a855f7] to-[#ff3b4a] rounded-full" />
        <span className="comic-body text-xs text-(--comic-red) font-bold uppercase tracking-wider">
          More power
        </span>
      </div>

      {/* Panel grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {structures.map((s, i) => (
          <ComicPanel
            key={s.title}
            className="ms-panel p-6 md:p-8 min-h-65 flex flex-col justify-between opacity-0"
            variant={i === 3 ? "splash" : i % 2 === 0 ? "inset" : "diagonal"}
            rotation={i % 2 === 0 ? -0.8 : 1}
            borderColor={s.border}
            borderWidth={i === 3 ? 5 : 3}
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#111] to-[#0a0a0a] z-0" />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3">
                <CaptionBox color={i < 2 ? "blue" : "red"}>
                  {s.caption}
                </CaptionBox>
                {i === 3 && (
                  <div className="ms-sfx">
                    <SoundEffect text="POW!" size="sm" color={s.color} rotation={15} />
                  </div>
                )}
              </div>
              <h3
                className="comic-title text-xl md:text-2xl mt-4 mb-3"
                style={{ color: s.color }}
              >
                {s.title}
              </h3>
              <p className="comic-body text-(--comic-white) text-sm md:text-base leading-relaxed">
                {s.body}
              </p>
            </div>
            <div className="relative z-10 mt-4">
              <DialogueBubble variant={s.bubble.variant} tailDirection={i % 2 === 0 ? "left" : "right"}>
                <span className="text-xs md:text-sm">{s.bubble.text}</span>
              </DialogueBubble>
            </div>
          </ComicPanel>
        ))}
      </div>

      <div className="halftone-overlay" />
    </section>
  );
}
