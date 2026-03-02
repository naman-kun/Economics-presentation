"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function PCCMeaningSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set("#pccmeaning-bg", { opacity: 0 });
            gsap.set("#pccmeaning-title", { opacity: 0, xPercent: -50 });
            gsap.set("#pccmeaning-graphs", { opacity: 0, xPercent: -50 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#pccmeaning-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS ═══
            master
                // 1. Background spins in
                .fromTo("#pccmeaning-bg",
                    { scale: 2, opacity: 0, rotation: 15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "power2.out" },
                    0.00
                )

                // 2. Title drops in from top
                .fromTo("#pccmeaning-title",
                    { scale: 0.5, opacity: 0, y: -100, rotation: -2, xPercent: -50 },
                    { scale: 1, opacity: 1, y: 0, rotation: 0, xPercent: -50, duration: 0.1, ease: "back.out(1.5)" },
                    0.05
                )

                // 3. Graphs panel zooms in with comic pop
                .fromTo("#pccmeaning-graphs",
                    { scale: 0.3, opacity: 0, rotation: -5, xPercent: -50 },
                    { scale: 1, opacity: 1, rotation: 0, xPercent: -50, duration: 0.12, ease: "back.out(1.3)" },
                    0.14
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══
                .to("#pccmeaning-title", { scale: 0.8, y: -50, opacity: 0, xPercent: -50, duration: 0.06, ease: "power3.in" }, 0.72)
                .to("#pccmeaning-graphs", { scale: 0.8, opacity: 0, xPercent: -50, duration: 0.06, ease: "power3.in" }, 0.74)

                // Spider web
                .to("#pccmeaning-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)
                .to("#pccmeaning-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#pccmeaning-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)
                .to("#pccmeaning-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)
                .to("#pccmeaning-bg", { opacity: 0, scale: 1.2, duration: 0.08 }, 0.84)
                .to("#pccmeaning-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="pccmeaning-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "800vh" }}
        >
            <div
                id="pccmeaning-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
            >
                {/* ── Background ── */}
                <div id="pccmeaning-bg" className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0">
                    <img
                        src="/assets/pem slide 13/pem slide 13 bg.png"
                        alt="Sunburst background"
                        className="w-full h-full object-cover max-w-none"
                    />
                </div>

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {/* Title Banner - top center */}
                    <div id="pccmeaning-title" className="absolute z-40 top-[-1%] left-1/2 transform -translate-x-[50%] w-[70%] lg:w-[55%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 13/title 7.png"
                            alt="What Does The PCC Mean?"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Graphs - 4 panel grid, centered below title */}
                    <div id="pccmeaning-graphs" className="absolute z-30 top-[3%] left-[50%] transform -translate-x-[50%] w-[92%] lg:w-[50%] drop-shadow-[5px_5px_0_rgba(0,0,0,0.5)]">
                        <img
                            src="/assets/pem slide 13/graphs refined.png"
                            alt="Four PCC graphs showing different scenarios"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="pccmeaning-web-transition" />
            </div>
        </section>
    );
}
