"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function ICGraphSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set([
                "#icgraph-bg",
                "#icgraph-title",
                "#icgraph-man",
                "#icgraph-dialogue",
                "#icgraph-poof",
                "#icgraph-super"
            ], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#icgraph-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS ═══
            master
                // 1. Background spins in
                .fromTo("#icgraph-bg",
                    { scale: 2, opacity: 0, rotation: -15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "power2.out" },
                    0.00
                )

                // 2. Title drops in from top
                .fromTo("#icgraph-title",
                    { scale: 0.5, opacity: 0, y: -100, rotation: -2 },
                    { scale: 1, opacity: 1, y: 0, rotation: 1, duration: 0.1, ease: "back.out(1.5)" },
                    0.05
                )

                // 3. IC Man slides in from left
                .fromTo("#icgraph-man",
                    { x: -200, opacity: 0, scale: 0.7, rotation: -5 },
                    { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.1, ease: "back.out(1.2)" },
                    0.14
                )

                // 3b. Dialogue bubble pops in with IC Man
                .fromTo("#icgraph-dialogue",
                    { scale: 0, opacity: 0, rotation: -10 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.08, ease: "back.out(1.5)" },
                    0.19
                )

                // 4. Poof cloud pops in from right
                .fromTo("#icgraph-poof",
                    { scale: 0, opacity: 0, rotation: 15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.08, ease: "back.out(1.5)" },
                    0.24
                )

                // 5. Super banner slides up from bottom
                .fromTo("#icgraph-super",
                    { y: 100, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.08, ease: "back.out(1.2)" },
                    0.34
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══
                .to("#icgraph-title", { scale: 0.8, y: -50, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.72)
                .to("#icgraph-man", { x: -50, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in" }, 0.73)
                .to("#icgraph-dialogue", { x: -50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.73)
                .to("#icgraph-poof", { scale: 0, opacity: 0, duration: 0.05, ease: "power3.in" }, 0.74)
                .to("#icgraph-super", { y: 50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.76)

                // Spider web
                .to("#icgraph-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)
                .to("#icgraph-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#icgraph-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)
                .to("#icgraph-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)
                .to("#icgraph-bg", { opacity: 0, scale: 1.2, duration: 0.08 }, 0.84)
                .to("#icgraph-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="icgraph-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "800vh" }}
        >
            <div
                id="icgraph-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
            >
                {/* ── Background ── */}
                <div id="icgraph-bg" className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0">
                    <img
                        src="/assets/pem slide 11/pem slide 11 bg.jpeg"
                        alt="Sunburst background"
                        className="w-full h-full object-cover max-w-none"
                    />
                </div>

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {/* Title Banner - top center */}
                    <div id="icgraph-title" className="absolute z-40 top-[0%] left-1/2 transform -translate-x-[50%] w-[65%] lg:w-[52%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 11/title 6.png"
                            alt="Indifference Curve!"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* IC Man - left side */}
                    <div id="icgraph-man" className="absolute z-30 top-[10%] left-[0%] w-[42%] lg:w-[80%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 11/IC man 3.png"
                            alt="IC Man superhero explaining the graph"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Dialogue Bubble - on top of IC Man */}
                    <div id="icgraph-dialogue" className="absolute z-35 top-[13%] left-[-2%] w-[42%] lg:w-[40%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 11/dialogue bubble.png"
                            alt="I'll explain the graph!"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Poof cloud - right side */}
                    <div id="icgraph-poof" className="absolute z-20 top-[10%] right-[-45%] w-[20%] lg:w-[95%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 11/poof.png"
                            alt="Poof cloud effect"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Super Banner - bottom center */}
                    <div id="icgraph-super" className="absolute z-40 bottom-[-15%] left-1/2 transform -translate-x-[50%] w-[80%] lg:w-[65%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 11/super.png"
                            alt="More of one, less of the other — Satisfaction stays super-powered!"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="icgraph-web-transition" />
            </div>
        </section>
    );
}
