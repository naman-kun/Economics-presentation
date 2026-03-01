"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function TypesOfUtilitySection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set([
                "#types-burst",
                "#types-halftone",
                "#types-title",
                "#types-form-panel",
                "#types-place-panel",
                "#types-time-panel",
                "#types-possession-panel"
            ], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#types-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS (0.00 → 0.55) ═══
            master
                .fromTo("#types-burst",
                    { scale: 3, opacity: 0, rotation: 25 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.08, ease: "power2.out" },
                    0.00
                )
                .to("#types-halftone", { opacity: 0.15, duration: 0.06 }, 0.02)
                .fromTo("#types-title",
                    { scale: 0, opacity: 0, y: -50, rotation: -5 },
                    { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 0.08, ease: "back.out(2)" },
                    0.08
                )
                .fromTo("#types-form-panel",
                    { x: -100, opacity: 0, rotation: -5 },
                    { x: 0, opacity: 1, rotation: 0, duration: 0.08, ease: "back.out(1.5)" },
                    0.18
                )
                .fromTo("#types-place-panel",
                    { x: 100, opacity: 0, rotation: 5 },
                    { x: 0, opacity: 1, rotation: 0, duration: 0.08, ease: "back.out(1.5)" },
                    0.28
                )
                .fromTo("#types-time-panel",
                    { y: 80, opacity: 0, rotation: -3 },
                    { y: 0, opacity: 1, rotation: 0, duration: 0.08, ease: "back.out(1.5)" },
                    0.35
                )
                .fromTo("#types-possession-panel",
                    { y: 80, opacity: 0, rotation: 3 },
                    { y: 0, opacity: 1, rotation: 0, duration: 0.08, ease: "back.out(1.5)" },
                    0.45
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══

                // Content pulls toward center and vanishes
                .to("#types-title", {
                    scale: 0.7, y: 30, opacity: 0, duration: 0.08, ease: "power3.in",
                }, 0.74)
                .to("#types-form-panel", {
                    x: 100, y: 50, opacity: 0, scale: 0.6, duration: 0.06, ease: "power3.in",
                }, 0.75)
                .to("#types-place-panel", {
                    x: -100, y: 50, opacity: 0, scale: 0.6, duration: 0.06, ease: "power3.in",
                }, 0.76)
                .to("#types-time-panel", {
                    x: 100, y: -50, opacity: 0, scale: 0.6, duration: 0.06, ease: "power3.in",
                }, 0.77)
                .to("#types-possession-panel", {
                    x: -100, y: -50, opacity: 0, scale: 0.6, duration: 0.06, ease: "power3.in",
                }, 0.78)

                // Spider web fades in
                .to("#types-web-transition", {
                    opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out",
                }, 0.77)

                // Web threads draw in
                .to("#types-web-transition .web-thread", {
                    strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut",
                }, 0.77)
                .to("#types-web-transition .web-ring", {
                    strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut",
                }, 0.80)

                // Web expands and fades to black
                .to("#types-web-transition", {
                    scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in",
                }, 0.84)

                // Burst fades
                .to("#types-burst", { opacity: 0, scale: 1.3, duration: 0.08 }, 0.84)

                // Halftone fades
                .to("#types-halftone", { opacity: 0, duration: 0.06 }, 0.84)

                // Final fade to black
                .to("#types-pin-container", { opacity: 0, duration: 0.03 }, 0.97);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="types-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "900vh" }}
        >
            <div
                id="types-pin-container"
                className="relative w-full h-screen overflow-hidden"
                style={{ background: "#1a0a30" }}
            >
                {/* ── Background: dark purple/green comic burst ── */}
                <div id="types-burst" className="absolute inset-0 z-1 flex items-center justify-center" style={{ opacity: 0 }}>
                    <img
                        src="/assets/comic burst 2.png"
                        alt=""
                        className="w-[160%] max-w-none"
                        style={{
                            filter: "contrast(1.4) brightness(0.45) saturate(1.6) hue-rotate(100deg)",
                            mixBlendMode: "screen",
                            willChange: "transform",
                        }}
                    />
                </div>
                <div
                    id="types-halftone"
                    className="absolute inset-0 z-2"
                    style={{
                        opacity: 0,
                        backgroundImage: "radial-gradient(#000 1.5px, transparent 2px)",
                        backgroundSize: "8px 8px",
                        backgroundPosition: "center",
                        mixBlendMode: "overlay",
                    }}
                />

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-start px-3 md:px-6 py-3 md:py-5">

                    {/* ══ TITLE ══ */}
                    <div id="types-title" className="text-center mb-3 md:mb-5">
                        <p className="comic-marker text-lg md:text-2xl lg:text-3xl text-[#ffe156] italic mb-0"
                            style={{ textShadow: "2px 2px 0 #000" }}>
                            hmm... Let&apos;s Break Down The
                        </p>
                        <h2 className="comic-title text-4xl md:text-7xl lg:text-8xl text-white leading-none"
                            style={{
                                WebkitTextStroke: "2px #2d1a4e",
                                textShadow: "3px 3px 0 #2d1a4e, 5px 5px 0 #000",
                            }}>
                            TYPES OF UTILITY!
                        </h2>
                    </div>

                    {/* ══ 2×2 GRID ══ */}
                    <div className="w-full max-w-7xl flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-3 md:gap-4">

                        {/* ── 1. FORM UTILITY ── */}
                        <div id="types-form-panel" className="relative rounded-md overflow-hidden min-h-0">
                            <img
                                src="/assets/form utility.png"
                                alt="Form Utility"
                                className="w-full h-full object-contain p-2 scale-[1.07] drop-shadow-[0_0_1.5px_rgba(0,0,0,1)] drop-shadow-[0_0_2px_rgba(0,0,0,1)]"
                            />
                        </div>

                        {/* ── 2. PLACE UTILITY ── */}
                        <div id="types-place-panel" className="relative rounded-md overflow-hidden min-h-0">
                            <img
                                src="/assets/place utility.png"
                                alt="Place Utility"
                                className="w-full h-full object-contain p-2"
                            />
                        </div>

                        {/* ── 3. TIME UTILITY ── */}
                        <div id="types-time-panel" className="relative rounded-md overflow-hidden min-h-0">
                            <img
                                src="/assets/time utility.png"
                                alt="Time Utility"
                                className="w-full h-full object-contain p-2"
                            />
                        </div>

                        {/* ── 4. POSSESSION UTILITY ── */}
                        <div id="types-possession-panel" className="relative rounded-md overflow-hidden min-h-0">
                            <img
                                src="/assets/possession utility.png"
                                alt="Possession Utility"
                                className="w-full h-full object-contain p-2"
                            />
                        </div>

                    </div>
                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="types-web-transition" />
            </div>
        </section>
    );
}
