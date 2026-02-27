/**
 * SupplyDemandSection — comic panel grid explaining supply & demand
 * Panels slide in from alternating directions with scroll-driven reveals.
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

export default function SupplyDemandSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section heading pop-in
      gsap.fromTo(
        "#sd-heading",
        { scale: 0, rotation: -10, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: {
            trigger: "#sd-heading",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Panels stagger in from alternating sides
      const panels = gsap.utils.toArray<HTMLElement>(".sd-panel");
      panels.forEach((panel, i) => {
        const fromX = i % 2 === 0 ? -120 : 120;
        gsap.fromTo(
          panel,
          { x: fromX, opacity: 0, rotation: i % 2 === 0 ? -3 : 3 },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Sound effects pop
      gsap.utils.toArray<HTMLElement>(".sd-sfx").forEach((sfx) => {
        gsap.fromTo(
          sfx,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(4)",
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
      {/* Section title */}
      <div id="sd-heading" className="text-center mb-16 opacity-0">
        <h2
          className="comic-title text-4xl sm:text-6xl md:text-7xl"
          style={{
            color: "var(--comic-yellow)",
            WebkitTextStroke: "2px var(--comic-black)",
            textShadow: "3px 3px 0 var(--comic-black)",
          }}
        >
          SUPPLY &amp; DEMAND
        </h2>
        <div className="mt-4 inline-block">
          <CaptionBox color="red">
            The two forces that shape every market on Earth.
          </CaptionBox>
        </div>
      </div>

      {/* Comic panel grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Panel 1: What is Demand? */}
        <ComicPanel
          className="sd-panel p-6 md:p-8 min-h-70 flex flex-col justify-between opacity-0"
          variant="default"
          rotation={-1}
          borderColor="#ffe156"
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#1a1a2e] to-[#0a0a0a] z-0" />
          <div className="relative z-10">
            <CaptionBox color="yellow">Panel 1</CaptionBox>
            <h3 className="comic-title text-2xl md:text-3xl text-(--comic-cyan) mt-4 mb-3">
              WHAT IS DEMAND?
            </h3>
            <p className="comic-body text-(--comic-white) text-sm md:text-base leading-relaxed">
              Demand is how much of a product consumers are willing and able to buy
              at different prices. When the price drops, people want more — that&apos;s
              the <span className="text-(--comic-cyan) font-bold">Law of Demand</span>.
            </p>
          </div>
          <div className="relative z-10 mt-4">
            <DialogueBubble variant="speech" tailDirection="left">
              <span className="text-sm">&quot;The cheaper the pizza, the more slices I want!&quot;</span>
            </DialogueBubble>
          </div>
        </ComicPanel>

        {/* Panel 2: What is Supply? */}
        <ComicPanel
          className="sd-panel p-6 md:p-8 min-h-70 flex flex-col justify-between opacity-0"
          variant="default"
          rotation={1.5}
          borderColor="#ff3b4a"
        >
          <div className="absolute inset-0 bg-linear-to-bl from-[#1a0a0a] to-[#0a0a0a] z-0" />
          <div className="relative z-10">
            <CaptionBox color="red">Panel 2</CaptionBox>
            <h3 className="comic-title text-2xl md:text-3xl text-(--comic-orange) mt-4 mb-3">
              WHAT IS SUPPLY?
            </h3>
            <p className="comic-body text-(--comic-white) text-sm md:text-base leading-relaxed">
              Supply is how much producers are willing to sell at different prices.
              Higher prices = more profit incentive = more supply. That&apos;s
              the <span className="text-(--comic-orange) font-bold">Law of Supply</span>.
            </p>
          </div>
          <div className="relative z-10 mt-4">
            <DialogueBubble variant="narrator" tailDirection="none">
              <span className="text-sm">Producers chase profit like Spidey chases villains.</span>
            </DialogueBubble>
          </div>
        </ComicPanel>

        {/* Panel 3: Equilibrium — splash panel spanning full width */}
        <ComicPanel
          className="sd-panel p-6 md:p-10 min-h-80 md:col-span-2 flex flex-col items-center justify-center text-center opacity-0"
          variant="splash"
          borderColor="#ffe156"
          borderWidth={5}
        >
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] z-0" />
          <div className="relative z-10">
            <div className="sd-sfx mb-4">
              <SoundEffect text="EQUILIBRIUM!" size="lg" color="#ffe156" rotation={-3} />
            </div>
            <p className="comic-body text-(--comic-white) text-base md:text-lg max-w-2xl leading-relaxed mt-4">
              Where the supply curve meets the demand curve, we find
              <span className="text-(--comic-yellow) font-bold"> equilibrium</span> —
              the price and quantity where the market clears. No shortage, no surplus.
              Just balance.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <DialogueBubble variant="thought" tailDirection="left">
                <span className="text-xs md:text-sm">Price too high? Surplus!</span>
              </DialogueBubble>
              <DialogueBubble variant="shout" tailDirection="right">
                <span className="text-xs md:text-sm">Price too low? SHORTAGE!</span>
              </DialogueBubble>
            </div>
          </div>
        </ComicPanel>

        {/* Panel 4: Shifts in Demand */}
        <ComicPanel
          className="sd-panel p-6 md:p-8 min-h-65 flex flex-col justify-between opacity-0"
          variant="inset"
          rotation={-0.5}
          borderColor="#3d7aed"
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#0a0a2e] to-[#0a0a0a] z-0" />
          <div className="relative z-10">
            <CaptionBox color="blue">Shifts</CaptionBox>
            <h3 className="comic-title text-xl md:text-2xl text-(--comic-blue) mt-4 mb-3">
              DEMAND SHIFTS
            </h3>
            <p className="comic-body text-(--comic-white) text-sm md:text-base leading-relaxed">
              Income rises? Tastes change? Population grows? The <em>entire</em> demand
              curve shifts right (increase) or left (decrease), changing equilibrium.
            </p>
          </div>
        </ComicPanel>

        {/* Panel 5: Shifts in Supply */}
        <ComicPanel
          className="sd-panel p-6 md:p-8 min-h-65 flex flex-col justify-between opacity-0"
          variant="inset"
          rotation={1}
          borderColor="#ff2d95"
        >
          <div className="absolute inset-0 bg-linear-to-bl from-[#1a0a1a] to-[#0a0a0a] z-0" />
          <div className="relative z-10">
            <CaptionBox color="dark">Shifts</CaptionBox>
            <h3 className="comic-title text-xl md:text-2xl text-(--comic-magenta) mt-4 mb-3">
              SUPPLY SHIFTS
            </h3>
            <p className="comic-body text-(--comic-white) text-sm md:text-base leading-relaxed">
              New technology? Lower input costs? Better weather for crops?
              Supply shifts right. Disasters or tariffs? Supply shifts left.
              The market never sits still.
            </p>
          </div>
          <div className="sd-sfx relative z-10 mt-3 self-end">
            <SoundEffect text="BOOM!" size="sm" color="#ff2d95" rotation={8} />
          </div>
        </ComicPanel>
      </div>

      <div className="halftone-overlay" />
    </section>
  );
}
