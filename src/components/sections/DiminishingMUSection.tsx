"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function DiminishingMUSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set([
                "#diminishing-bg",
                "#diminishing-title",
                "#diminishing-guy",
                "#diminishing-mu",
                "#diminishing-tu",
                "#diminishing-helps"
            ], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#diminishing-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS ═══
            master
                // 1. Background spins in
                .fromTo("#diminishing-bg",
                    { scale: 2, opacity: 0, rotation: 15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "power2.out" },
                    0.00
                )

                // 2. Title drops in from top
                .fromTo("#diminishing-title",
                    { scale: 0.5, opacity: 0, y: -100, rotation: -2 },
                    { scale: 1, opacity: 1, y: 0, rotation: 1, duration: 0.1, ease: "back.out(1.5)" },
                    0.05
                )

                // 3. Guy slides in from right
                .fromTo("#diminishing-guy",
                    { x: 200, opacity: 0, scale: 0.7, rotation: 5 },
                    { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.1, ease: "back.out(1.2)" },
                    0.12
                )

                // 4. MU box slides in from left
                .fromTo("#diminishing-mu",
                    { x: -150, opacity: 0, scale: 0.8, rotation: -10 },
                    { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.08, ease: "back.out(1.2)" },
                    0.22
                )

                // 5. TU box slides in from below
                .fromTo("#diminishing-tu",
                    { y: 100, opacity: 0, scale: 0.8, rotation: 5 },
                    { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.08, ease: "back.out(1.2)" },
                    0.30
                )

                // 6. Helps Understand pops in from bottom-left
                .fromTo("#diminishing-helps",
                    { x: -100, y: 80, opacity: 0, scale: 0.8, rotation: -5 },
                    { x: 0, y: 0, opacity: 1, scale: 1, rotation: 1, duration: 0.08, ease: "back.out(1.2)" },
                    0.38
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══
                .to("#diminishing-title", { scale: 0.8, y: -50, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.72)
                .to("#diminishing-guy", { x: 50, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in" }, 0.73)
                .to("#diminishing-mu", { x: 50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.74)
                .to("#diminishing-tu", { y: 30, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.75)
                .to("#diminishing-helps", { x: 50, y: 30, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.76)

                // Spider web
                .to("#diminishing-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)
                .to("#diminishing-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#diminishing-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)
                .to("#diminishing-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)
                .to("#diminishing-bg", { opacity: 0, scale: 1.2, duration: 0.08 }, 0.84)
                .to("#diminishing-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="diminishing-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "800vh" }}
        >
            <div
                id="diminishing-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
            >
                {/* ── Background ── */}
                <div id="diminishing-bg" className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0">
                    <img
                        src="/assets/pem slide 8/pem slide 8 bg.jpeg"
                        alt="Sunburst background"
                        className="w-full h-full object-cover max-w-none"
                    />
                </div>

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {/* Title Banner - top center */}
                    <div id="diminishing-title" className="absolute z-40 top-[-13%] left-1/2 transform -translate-x-[50%] w-[72%] lg:w-[59%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 8/title 3.png"
                            alt="Law of Diminishing Marginal Utility"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Guy - right side, large */}
                    <div id="diminishing-guy" className="absolute z-30 top-[35%] right-[0%] w-[50%] lg:w-[45%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 8/guy.png"
                            alt="MU Guy sitting with pizza"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* MU box - bottom left */}
                    <div id="diminishing-mu" className="absolute z-20 bottom-[0%] left-[2%] w-[35%] lg:w-[40%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 8/MU.png"
                            alt="Each additional unit gives less satisfaction"
                            className="w-full h-auto object-contain transform -rotate-1"
                        />
                    </div>

                    {/* TU box - bottom center */}
                    <div id="diminishing-tu" className="absolute z-20 bottom-[-5%] left-[38%] w-[35%] lg:w-[35%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 8/TU.png"
                            alt="Total satisfaction increases at a decreasing rate"
                            className="w-full h-auto object-contain transform rotate-1"
                        />
                    </div>

                    {/* Helps Understand - bottom left corner */}
                    <div id="diminishing-helps" className="absolute z-20 bottom-[-18%] left-[10%] w-[35%] lg:w-[35%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 8/helps understand.png"
                            alt="Helps Understand Consumer Choices"
                            className="w-full h-auto object-contain transform -rotate-1"
                        />
                    </div>

                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="diminishing-web-transition" />
            </div>
        </section>
    );
}
