/**
 * CreditsSection — Team credits with comic Spider-Verse styling
 */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ComicPanel from "@/components/comic/ComicPanel";
import SoundEffect from "@/components/comic/SoundEffect";

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    name: "Naman Shah",
    role: "End to End Website development and animations.",
    color: "#ff3b4a",
  },
  {
    name: "Krish Mehta",
    role: "Group Manager and contributed in providing webpage elements.",
    color: "#ffe156",
  },
  {
    name: "Tanish Shah",
    role: "Provided the design structure for the indifference curve sections.",
    color: "#3d7aed",
  },
  {
    name: "Daksh Malhotra",
    role: "Contributed in providing webpage elements.",
    color: "#ff6b35",
  },
  {
    name: "Aryaman Singh",
    role: "Provided the design structure for the Law of Diminishing Marginal Utility, Marginal Utility and Total Utility.",
    color: "#00e5ff",
  },
  {
    name: "Ali Lakkadghat",
    role: "Made the AI video end to end.",
    color: "#ff2d95",
  },
  {
    name: "Manan Sureja",
    role: "Provided the design structure for the Ordinal and Cardinal Utility sections.",
    color: "#a855f7",
  },
];

export default function CreditsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title SFX pop
      gsap.fromTo(
        "#credits-sfx",
        { scale: 0, rotation: -20, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: "#credits-sfx",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Member cards stagger in
      gsap.utils.toArray<HTMLElement>(".credit-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -100 : 100, opacity: 0, rotation: i % 2 === 0 ? -3 : 3 },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.7,
            delay: i * 0.06,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Footer fade in
      gsap.fromTo(
        "#credits-footer",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#credits-footer",
            start: "top 90%",
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
      className="relative w-full h-screen px-0 flex flex-col items-center justify-center"
      style={{ background: "var(--comic-black)" }}
    >
      <ComicPanel
        className="w-full h-full p-8 md:p-14 flex flex-col items-center justify-center text-center"
        variant="splash"
        borderColor="#ff3b4a"
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

        <div className="relative z-10 flex flex-col items-center w-full">
          {/* SFX Title */}
          <div id="credits-sfx" className="mb-8 opacity-0">
            <SoundEffect text="CREDITS!" size="xl" color="#ff3b4a" rotation={-2} />
          </div>

          {/* Subtitle */}
          <p className="comic-marker text-(--comic-yellow) text-xl md:text-2xl mb-10 tracking-wide">
            The team behind the web 🕸️
          </p>

          {/* Member Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-5xl">
            {members.map((member, i) => (
              <div
                key={i}
                className="credit-card opacity-0 flex flex-row items-center gap-4 px-6 py-5 rounded-sm border-l-4"
                style={{
                  borderColor: member.color,
                  background: "rgba(255,255,255,0.04)",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Number badge */}
                <span
                  className="comic-title text-xl md:text-2xl shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
                  style={{
                    background: member.color,
                    color: "#0a0a0a",
                    textShadow: "none",
                  }}
                >
                  {i + 1}
                </span>

                <div className="text-left">
                  <span
                    className="comic-marker text-lg md:text-xl block"
                    style={{ color: member.color }}
                  >
                    {member.name}
                  </span>
                  <span className="comic-body text-(--comic-white) text-base md:text-lg opacity-75 block mt-1">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div id="credits-footer" className="mt-14 opacity-0 flex flex-col items-center gap-3">
            <p className="comic-body text-(--comic-white) text-xs opacity-40">
              Built with Next.js • GSAP • Lenis • Spider-Verse vibes
            </p>
            <div className="mt-2 w-10 h-10 rounded-full border-2 border-(--comic-red) flex items-center justify-center">
              <span className="text-base">🕷️</span>
            </div>
          </div>
        </div>
      </ComicPanel>

      <div className="halftone-overlay" />
    </section>
  );
}
