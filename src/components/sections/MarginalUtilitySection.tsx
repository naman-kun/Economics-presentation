"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function MarginalUtilitySection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set([
                "#marginal-bg",
                "#marginal-title",
                "#marginal-man",
                "#marginal-meaning",
                "#marginal-formula",
                "#marginal-how-it-works",
                "#marginal-helps"
            ], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#marginal-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS (0.00 → 0.60) ═══
            master
                // 1. Background (Spin & Zoom)
                .fromTo("#marginal-bg",
                    { scale: 2, opacity: 0, rotation: 15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "power2.out" },
                    0.00
                )

                // 1.5 Title (Drop in from top)
                .fromTo("#marginal-title",
                    { scale: 0.5, opacity: 0, y: -100, rotation: -2 },
                    { scale: 1, opacity: 1, y: 0, rotation: 1, duration: 0.1, ease: "back.out(1.5)" },
                    0.05
                )

                // 2. Central Character (Pop in from center/bottom)
                .fromTo("#marginal-man",
                    { scale: 0.5, opacity: 0, y: 150, rotation: -5 },
                    { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 0.1, ease: "back.out(1.5)" },
                    0.10
                )

                // 3. Left Panels (Meaning, Formula)
                .fromTo("#marginal-meaning",
                    { x: -150, opacity: 0, scale: 0.8, rotation: -10 },
                    { x: 0, opacity: 1, scale: 1, rotation: -2, duration: 0.08, ease: "back.out(1.2)" },
                    0.20
                )
                .fromTo("#marginal-formula",
                    { x: -150, y: 50, opacity: 0, scale: 0.8, rotation: 5 },
                    { x: 0, y: 0, opacity: 1, scale: 1, rotation: 1, duration: 0.08, ease: "back.out(1.2)" },
                    0.28
                )

                // 4. Right Panels (How it works, Helps)
                .fromTo("#marginal-how-it-works",
                    { x: 150, opacity: 0, scale: 0.8, rotation: 10 },
                    { x: 0, opacity: 1, scale: 1, rotation: 2, duration: 0.08, ease: "back.out(1.2)" },
                    0.36
                )
                .fromTo("#marginal-helps",
                    { x: 150, y: 50, opacity: 0, scale: 0.8, rotation: -5 },
                    { x: 0, y: 0, opacity: 1, scale: 1, rotation: -1, duration: 0.08, ease: "back.out(1.2)" },
                    0.44
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══

                // Content pulls toward center and vanishes
                .to("#marginal-title", { scale: 0.8, y: -50, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.72)
                .to("#marginal-man", { scale: 0.8, y: -30, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.73)
                .to("#marginal-meaning", { x: 50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.74)
                .to("#marginal-how-it-works", { x: -50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.75)
                .to("#marginal-formula", { x: 50, y: -30, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.76)
                .to("#marginal-helps", { x: -50, y: -30, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.77)

                // Spider web fades in
                .to("#marginal-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)

                // Web threads draw in
                .to("#marginal-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#marginal-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)

                // Web expands and fades to black
                .to("#marginal-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)

                // Background fades
                .to("#marginal-bg", { opacity: 0, scale: 1.2, duration: 0.08 }, 0.84)

                // Final fade to black container
                .to("#marginal-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="marginal-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "900vh" }}
        >
            <div
                id="marginal-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
            >
                {/* ── Background ── */}
                <div id="marginal-bg" className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0">
                    <img
                        src="/assets/pem slide 6/pem slide 6 bg.jpeg"
                        alt="Sunburst background"
                        className="w-full h-full object-cover max-w-none"
                    />
                </div>

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {/* Title Banner - very top center */}
                    <div id="marginal-title" className="absolute z-40 top-[-10%] left-1/2 transform -translate-x-[50%] w-[55%] lg:w-[45%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 6/Title.png"
                            alt="Marginal Utility Title"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Central Character (MU Man) - large, centered */}
                    <div id="marginal-man" className="absolute z-30 top-[30%] left-1/2 transform -translate-x-[50%] w-[40%] lg:w-[35%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 6/MU man.png"
                            alt="MU Man with Ice Cream"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Left side: Meaning - upper left, bigger & closer to center */}
                    <div id="marginal-meaning" className="absolute z-20 top-[20%] left-[8%] w-[42%] lg:w-[36%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 6/meaning.png"
                            alt="Meaning of Marginal Utility"
                            className="w-full h-auto object-contain transform -rotate-1"
                        />
                    </div>

                    {/* Left side: Formula - bottom left, bigger & closer to center */}
                    <div id="marginal-formula" className="absolute z-20 bottom-[4%] left-[8%] w-[42%] lg:w-[36%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 6/formula.png"
                            alt="Formula for Marginal Utility"
                            className="w-full h-auto object-contain transform rotate-1"
                        />
                    </div>

                    {/* Right side: How It Works - upper right, bigger & closer to center */}
                    <div id="marginal-how-it-works" className="absolute z-20 top-[20%] right-[5%] w-[46%] lg:w-[41%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 6/how it works.png"
                            alt="How Marginal Utility Works"
                            className="w-full h-auto object-contain transform rotate-1"
                        />
                    </div>

                    {/* Right side: Helps - bottom right, bigger & closer to center */}
                    <div id="marginal-helps" className="absolute z-20 bottom-[-1%] right-[8%] w-[42%] lg:w-[36%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 6/helps.png"
                            alt="Helps in Consumer Choices"
                            className="w-full h-auto object-contain transform -rotate-1"
                        />
                    </div>

                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="marginal-web-transition" />
            </div>
        </section>
    );
}
