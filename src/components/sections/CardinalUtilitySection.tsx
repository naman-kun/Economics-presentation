"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function CardinalUtilitySection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Initial states
            gsap.set([
                "#cardinal-bg",
                "#cardinal-title",
                "#cardinal-joy",
                "#cardinal-def",
                "#cardinal-util",
                "#cardinal-in-short"
            ], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#cardinal-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS (0.00 → 0.60) ═══
            master
                // Background
                .fromTo("#cardinal-bg",
                    { scale: 2, opacity: 0, rotation: -15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "power2.out" },
                    0.00
                )
                // Title
                .fromTo("#cardinal-title",
                    { scale: 0.5, opacity: 0, y: -50, rotation: -5 },
                    { scale: 1.05, opacity: 1, y: 0, rotation: -2, duration: 0.08, ease: "back.out(2)" },
                    0.10
                )
                .to("#cardinal-title", { scale: 1, rotation: -1, duration: 0.05, ease: "power1.inOut" }, 0.18)

                // 3 Panels (Left to Right)
                .fromTo("#cardinal-joy",
                    { x: -100, y: 50, opacity: 0, rotation: -10 },
                    { x: 0, y: 0, opacity: 1, rotation: -2, duration: 0.08, ease: "back.out(1.5)" },
                    0.20
                )
                .fromTo("#cardinal-def",
                    { scale: 0.8, opacity: 0, y: 30 },
                    { scale: 1, opacity: 1, y: 0, rotation: 1, duration: 0.08, ease: "back.out(1.5)" },
                    0.28
                )
                .fromTo("#cardinal-util",
                    { x: 100, y: 50, opacity: 0, rotation: 10 },
                    { x: 0, y: 0, opacity: 1, rotation: 2, duration: 0.08, ease: "back.out(1.5)" },
                    0.36
                )

                // Bottom banner
                .fromTo("#cardinal-in-short",
                    { y: 150, opacity: 0, rotation: 5, scale: 0.9 },
                    { y: 0, opacity: 1, rotation: -1, scale: 1, duration: 0.1, ease: "back.out(1.5)" },
                    0.46
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══

                // Content pulls toward center and vanishes
                .to("#cardinal-title", {
                    scale: 0.8, y: -30, opacity: 0, duration: 0.08, ease: "power3.in",
                }, 0.74)
                .to("#cardinal-joy", {
                    x: 100, y: 50, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in",
                }, 0.75)
                .to("#cardinal-def", {
                    y: 50, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in",
                }, 0.76)
                .to("#cardinal-util", {
                    x: -100, y: 50, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in",
                }, 0.77)
                .to("#cardinal-in-short", {
                    y: -50, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in",
                }, 0.78)

                // Spider web fades in
                .to("#cardinal-web-transition", {
                    opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out",
                }, 0.77)

                // Web threads draw in
                .to("#cardinal-web-transition .web-thread", {
                    strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut",
                }, 0.77)
                .to("#cardinal-web-transition .web-ring", {
                    strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut",
                }, 0.80)

                // Web expands and fades to black
                .to("#cardinal-web-transition", {
                    scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in",
                }, 0.84)

                // Background fades
                .to("#cardinal-bg", { opacity: 0, scale: 1.2, duration: 0.08 }, 0.84)

                // Final fade to black container
                .to("#cardinal-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="cardinal-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "900vh" }}
        >
            <div
                id="cardinal-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8"
                style={{ background: "#000" }}
            >
                {/* ── Background ── */}
                <div id="cardinal-bg" className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
                    <img
                        src="/assets/pem slide 4 background.png"
                        alt="Sunburst background"
                        className="w-full h-full object-cover max-w-none"
                    />
                </div>

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full max-w-7xl flex flex-col items-center justify-between py-4">

                    {/* ══ TITLE ══ */}
                    <div id="cardinal-title" className="w-full flex justify-center mb-4 md:mb-6 mt-2">
                        <h2 className="comic-title text-center text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tight text-white leading-none -rotate-1 italic"
                            style={{
                                WebkitTextStroke: "3px black",
                                textShadow: "4px 4px 0 #000, 6px 6px 0px rgba(0,0,0,0.5)",
                                filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.4))",
                            }}>
                            CARDINAL UTILITY: THE MEASUREABLE HAPPY!
                        </h2>
                    </div>

                    {/* ══ 3 PANELS ROW ══ */}
                    <div className="w-full flex-1 min-h-0 flex flex-col md:flex-row items-center justify-center gap-0 md:-space-x-4 lg:-space-x-8 mb-2 md:mb-4 px-2 md:px-0">
                        {/* 1. Joy-o-meter */}
                        <div id="cardinal-joy" className="w-[80%] md:w-[35%] relative flex items-center justify-center transform -rotate-1 z-10 drop-shadow-[4px_4px_0_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-transform duration-300">
                            <img
                                src="/assets/joy o meter.png"
                                alt="Joy-O-Meter Satisfaction is numbers"
                                className="w-full h-auto object-contain max-h-[45vh] lg:max-h-[50vh]"
                            />
                        </div>

                        {/* 2. Definition */}
                        <div id="cardinal-def" className="w-[75%] md:w-[32%] relative flex items-center justify-center transform rotate-1 z-20 drop-shadow-[4px_4px_0_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-transform duration-300 -translate-y-4 md:translate-y-0 md:-translate-x-6">
                            <img
                                src="/assets/def.png"
                                alt="Definition of Utils"
                                className="w-full h-auto object-contain max-h-[45vh] lg:max-h-[50vh]"
                            />
                        </div>

                        {/* 3. Util Concept */}
                        <div id="cardinal-util" className="w-[85%] md:w-[38%] relative flex items-center justify-center transform rotate-2 z-30 drop-shadow-[4px_4px_0_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-transform duration-300 -translate-y-8 md:translate-y-0 md:-translate-x-12">
                            <img
                                src="/assets/util.png"
                                alt="The Util Concept and Example"
                                className="w-full h-auto object-contain max-h-[45vh] lg:max-h-[50vh]"
                            />
                        </div>
                    </div>

                    {/* ══ BOTTOM BANNER (In Short) ══ */}
                    <div id="cardinal-in-short" className="w-[98%] sm:w-[95%] md:w-[92%] relative flex justify-center transform -rotate-1 mt-auto drop-shadow-[5px_5px_0_rgba(0,0,0,0.7)] hover:-translate-y-1 transition-transform duration-300">
                        <img
                            src="/assets/In short.png"
                            alt="In Short: Cardinal utility says happiness is a count!"
                            className="w-full h-auto object-contain max-h-[18vh] lg:max-h-[22vh]"
                        />
                    </div>
                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="cardinal-web-transition" />
            </div>
        </section>
    );
}
