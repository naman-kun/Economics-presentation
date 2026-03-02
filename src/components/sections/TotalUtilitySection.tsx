"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function TotalUtilitySection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set([
                "#total-bg",
                "#total-title",
                "#total-man",
                "#total-tu",
                "#total-meaning",
                "#total-formula"
            ], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#total-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS (0.00 → 0.60) ═══
            master
                // 1. Background
                .fromTo("#total-bg",
                    { scale: 2, opacity: 0, rotation: -15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "power2.out" },
                    0.00
                )

                // 2. Title drops in
                .fromTo("#total-title",
                    { scale: 0.5, opacity: 0, y: -100, rotation: -2 },
                    { scale: 1, opacity: 1, y: 0, rotation: 1, duration: 0.1, ease: "back.out(1.5)" },
                    0.05
                )

                // 3. TU Man pops up from below
                .fromTo("#total-man",
                    { scale: 0.5, opacity: 0, y: 150, rotation: -5 },
                    { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 0.1, ease: "back.out(1.5)" },
                    0.12
                )

                // 4. TU subtitle slides in from left
                .fromTo("#total-tu",
                    { x: -150, opacity: 0, scale: 0.8, rotation: -10 },
                    { x: 0, opacity: 1, scale: 1, rotation: -1, duration: 0.08, ease: "back.out(1.2)" },
                    0.22
                )

                // 5. Meaning slides in from bottom-left
                .fromTo("#total-meaning",
                    { x: -150, y: 50, opacity: 0, scale: 0.8, rotation: 5 },
                    { x: 0, y: 0, opacity: 1, scale: 1, rotation: 1, duration: 0.08, ease: "back.out(1.2)" },
                    0.30
                )

                // 6. Formula slides in from right
                .fromTo("#total-formula",
                    { x: 150, opacity: 0, scale: 0.8, rotation: 10 },
                    { x: 0, opacity: 1, scale: 1, rotation: 1, duration: 0.08, ease: "back.out(1.2)" },
                    0.38
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══
                .to("#total-title", { scale: 0.8, y: -50, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.72)
                .to("#total-man", { scale: 0.8, y: -30, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.73)
                .to("#total-tu", { x: 50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.74)
                .to("#total-meaning", { x: 50, y: -30, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.75)
                .to("#total-formula", { x: -50, y: -30, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.76)

                // Spider web fades in
                .to("#total-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)
                .to("#total-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#total-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)

                // Web expands and fades to black
                .to("#total-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)
                .to("#total-bg", { opacity: 0, scale: 1.2, duration: 0.08 }, 0.84)
                .to("#total-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="total-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "800vh" }}
        >
            <div
                id="total-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
            >
                {/* ── Background ── */}
                <div id="total-bg" className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0">
                    <img
                        src="/assets/pem slide 7/pem slide 7 bg.jpeg"
                        alt="Sunburst background"
                        className="w-full h-full object-cover max-w-none"
                    />
                </div>

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {/* Title Banner - top center */}
                    <div id="total-title" className="absolute z-40 top-[-18%] left-1/2 transform -translate-x-[50%] w-[72%] lg:w-[59%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 7/title 2.png"
                            alt="Total Utility Title"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* TU Subtitle text - upper left */}
                    <div id="total-tu" className="absolute z-20 top-[18%] left-[3%] w-[49%] lg:w-[42%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 7/TU.png"
                            alt="Total Utility equals Extra Satisfaction"
                            className="w-full h-auto object-contain transform -rotate-1"
                        />
                    </div>

                    {/* Central Character (TU Man) */}
                    <div id="total-man" className="absolute z-30 top-[30%] left-1/2 transform -translate-x-[50%] w-[42%] lg:w-[36%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 7/TU man.png"
                            alt="TU Man with Pizza"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Meaning - bottom left */}
                    <div id="total-meaning" className="absolute z-20 bottom-[-10%] left-[0%] w-[52%] lg:w-[44%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 7/meaning 2.png"
                            alt="Meaning of Total Utility"
                            className="w-full h-auto object-contain transform rotate-1"
                        />
                    </div>

                    {/* Formula - right side */}
                    <div id="total-formula" className="absolute z-20 top-[25%] right-[-4%] w-[55%] lg:w-[49%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 7/formula 2.png"
                            alt="Formula for Total Utility"
                            className="w-full h-auto object-contain transform rotate-1"
                        />
                    </div>

                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="total-web-transition" />
            </div>
        </section>
    );
}
