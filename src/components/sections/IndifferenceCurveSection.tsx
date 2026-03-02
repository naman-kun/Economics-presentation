"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function IndifferenceCurveSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set([
                "#ic-bg",
                "#ic-title",
                "#ic-guy",
                "#ic-slope",
                "#ic-banner"
            ], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#ic-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS ═══
            master
                // 1. Background spins in
                .fromTo("#ic-bg",
                    { scale: 2, opacity: 0, rotation: -15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "power2.out" },
                    0.00
                )

                // 2. Title drops in from top
                .fromTo("#ic-title",
                    { scale: 0.5, opacity: 0, y: -100, rotation: -2 },
                    { scale: 1, opacity: 1, y: 0, rotation: 1, duration: 0.1, ease: "back.out(1.5)" },
                    0.05
                )

                // 3. Guy slides in from left
                .fromTo("#ic-guy",
                    { x: -200, opacity: 0, scale: 0.7, rotation: -5 },
                    { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.1, ease: "back.out(1.2)" },
                    0.14
                )

                // 4. Slope Down text pops in from right
                .fromTo("#ic-slope",
                    { x: 150, opacity: 0, scale: 0.8, rotation: 10 },
                    { x: 0, opacity: 1, scale: 1, rotation: 2, duration: 0.08, ease: "back.out(1.2)" },
                    0.24
                )

                // 5. Bottom banner slides up
                .fromTo("#ic-banner",
                    { y: 100, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.08, ease: "back.out(1.2)" },
                    0.34
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══
                .to("#ic-title", { scale: 0.8, y: -50, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.72)
                .to("#ic-guy", { x: -50, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in" }, 0.73)
                .to("#ic-slope", { x: 50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.74)
                .to("#ic-banner", { y: 50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.76)

                // Spider web
                .to("#ic-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)
                .to("#ic-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#ic-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)
                .to("#ic-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)
                .to("#ic-bg", { opacity: 0, scale: 1.2, duration: 0.08 }, 0.84)
                .to("#ic-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="ic-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "800vh" }}
        >
            <div
                id="ic-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
            >
                {/* ── Background ── */}
                <div id="ic-bg" className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0">
                    <img
                        src="/assets/pem slide 9/pem slide 9 bg.jpeg"
                        alt="Sunburst background"
                        className="w-full h-full object-cover max-w-none"
                    />
                </div>

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {/* Title Banner - top center */}
                    <div id="ic-title" className="absolute z-40 top-[-18%] left-1/2 transform -translate-x-[50%] w-[65%] lg:w-[52%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 9/title.png"
                            alt="Indifference Curve!"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Guy - left side */}
                    <div id="ic-guy" className="absolute z-30 top-[18%] left-[-2%] w-[42%] lg:w-[36%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 9/IC man.png"
                            alt="IC Man superhero pointing"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Slope Down - right side */}
                    <div id="ic-slope" className="absolute z-20 top-[15%] right-[-3%] w-[35%] lg:w-[40%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 9/slope down.png"
                            alt="Always Slopes Downward!"
                            className="w-full h-auto object-contain transform rotate-2"
                        />
                    </div>

                    {/* Bottom Banner - "More of one, less of the other" */}
                    <div id="ic-banner" className="absolute z-40 bottom-[-30%] left-1/2 transform -translate-x-[50%] w-[85%] lg:w-[62%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 9/more one, less other.png"
                            alt="More of one, less of the other — Satisfaction stays super-powered!"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="ic-web-transition" />
            </div>
        </section>
    );
}
