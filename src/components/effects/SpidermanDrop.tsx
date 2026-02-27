"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SpidermanDrop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Slight delay to ensure HeroSection's ScrollTrigger (pinning) is fully initialized
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const spidey = containerRef.current;

      // Start completely hidden above the screen. 
      // yPercent: -100 means the bottom of the image is exactly at the top edge of its container.
      gsap.set(spidey, { yPercent: -100 });

      ScrollTrigger.create({
        trigger: "#hero-section-main",
        // Trigger right after the 15-18% mark (glitch overlay clears at ~16% in HeroSection)
        start: "18% top",
        onEnter: () => {
          // Drop down. Elastic out simulates the rubber band caught and bouncing.
          // By animating to yPercent: 0, we ensure the "max length... should not be more than the image itself"
          // By animating to yPercent: 80, Spiderman hangs higher than the previous 120%
          // but still low enough to ensure his mid-section is visible.
          // The invisible web string div ensures it visually remains attached to the top edge.
          gsap.to(spidey, {
            yPercent: 80,
            duration: 12, // User requested maximum ~15 seconds duration, stopping gracefully
            ease: "elastic.out(0.85, 0.2)", // Reduced elasticity (amplitude) by ~30% per user request
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          // Retract if user scrolls back to the very top before the drop
          gsap.to(spidey, {
            yPercent: -100,
            duration: 1.5,
            ease: "power2.in",
            overwrite: "auto",
          });
        }
      });

    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Positioned absolute at the top right of the hero section
    <div id="spiderman-wrapper" className="absolute top-0 right-[2%] md:right-[8%] z-20 pointer-events-none w-40 sm:w-48 md:w-64 lg:w-[22rem]">
      <div
        ref={containerRef}
        className="relative will-change-transform"
        style={{ transform: "translateY(-100%)" }} // initial state
      >
        {/* Invisible string extending upwards. If elasticity pushes yPercent > 0, 
            this line ensures it still looks "attached" to the top edge! */}
        <div className="absolute bottom-[96%] left-[48%] w-[2px] h-[3000px] bg-gradient-to-t from-gray-300 to-transparent -translate-x-1/2 opacity-80" />

        <img
          src="/spidey.png"
          alt="Spider-Man Drop"
          className="w-full h-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
        />
      </div>
    </div>
  );
}
