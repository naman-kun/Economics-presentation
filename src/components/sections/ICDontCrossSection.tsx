"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function ICDontCrossSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set([
                "#icdontcross-bg",
                "#icdontcross-title",
                "#icdontcross-man",
                "#icdontcross-happy",
                "#icdontcross-cross"
            ], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#icdontcross-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS ═══
            master
                // 1. Background spins in
                .fromTo("#icdontcross-bg",
                    { scale: 2, opacity: 0, rotation: 15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "power2.out" },
                    0.00
                )

                // 2. Title drops in from top
                .fromTo("#icdontcross-title",
                    { scale: 0.5, opacity: 0, y: -100, rotation: -2 },
                    { scale: 1, opacity: 1, y: 0, rotation: 1, duration: 0.1, ease: "back.out(1.5)" },
                    0.05
                )

                // 3. IC Man slides in from left
                .fromTo("#icdontcross-man",
                    { x: -200, opacity: 0, scale: 0.7, rotation: -5 },
                    { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.1, ease: "back.out(1.2)" },
                    0.14
                )

                // 4. Happy box pops in from right
                .fromTo("#icdontcross-happy",
                    { x: 150, opacity: 0, scale: 0.8, rotation: 10 },
                    { x: 0, opacity: 1, scale: 1, rotation: 2, duration: 0.08, ease: "back.out(1.2)" },
                    0.24
                )

                // 5. Cross banner slides up from bottom
                .fromTo("#icdontcross-cross",
                    { y: 100, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.08, ease: "back.out(1.2)" },
                    0.34
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══
                .to("#icdontcross-title", { scale: 0.8, y: -50, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.72)
                .to("#icdontcross-man", { x: -50, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in" }, 0.73)
                .to("#icdontcross-happy", { x: 50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.74)
                .to("#icdontcross-cross", { y: 50, opacity: 0, scale: 0.8, duration: 0.05, ease: "power3.in" }, 0.76)

                // Spider web
                .to("#icdontcross-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)
                .to("#icdontcross-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#icdontcross-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)
                .to("#icdontcross-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)
                .to("#icdontcross-bg", { opacity: 0, scale: 1.2, duration: 0.08 }, 0.84)
                .to("#icdontcross-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="icdontcross-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "800vh" }}
        >
            <div
                id="icdontcross-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
            >
                {/* ── Background ── */}
                <div id="icdontcross-bg" className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0">
                    <img
                        src="/assets/pem slide 10/pem slide 10 bg.jpeg"
                        alt="Sunburst background"
                        className="w-full h-full object-cover max-w-none"
                    />
                </div>

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {/* Title Banner - top center */}
                    <div id="icdontcross-title" className="absolute z-40 top-[0%] left-1/2 transform -translate-x-[50%] w-[72%] lg:w-[59%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 10/title 5.png"
                            alt="Indifference Curves Don't Cross!"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* IC Man - left side */}
                    <div id="icdontcross-man" className="absolute z-30 top-[15%] left-[5%] w-[42%] lg:w-[60%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 10/IC man 2.png"
                            alt="IC Man superhero pointing"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Happy box - right side */}
                    <div id="icdontcross-happy" className="absolute z-20 top-[50%] right-[2%] w-[38%] lg:w-[20%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300">
                        <img
                            src="/assets/pem slide 10/happy!.png"
                            alt="Moderately Happy and Very Happy at the Same Time? NO WAY!"
                            className="w-full h-auto object-contain transform rotate-2"
                        />
                    </div>

                    {/* Cross Banner - bottom center */}
                    <div id="icdontcross-cross" className="absolute z-40 bottom-[-5%] left-1/2 transform -translate-x-[50%] w-[80%] lg:w-[68%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 10/cross.png"
                            alt="Two Indifference Curves Can Never Cross!"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="icdontcross-web-transition" />
            </div>
        </section>
    );
}
