"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function PCCSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set("#pcc-bg", { opacity: 0 });
            gsap.set("#pcc-elements", { opacity: 0, xPercent: -50, yPercent: -50 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#pcc-pin-container",
                    anticipatePin: 1,
                },
            });

            // ═══ ENTRANCE ANIMATIONS ═══
            master
                // 1. Background spins in
                .fromTo("#pcc-bg",
                    { scale: 2, opacity: 0, rotation: -15 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "power2.out" },
                    0.00
                )

                // 2. Elements image zooms in with a comic-book style pop
                .fromTo("#pcc-elements",
                    { scale: 0.3, opacity: 0, rotation: -8, xPercent: -50, yPercent: -50 },
                    { scale: 1, opacity: 1, rotation: 0, xPercent: -50, yPercent: -50, duration: 0.15, ease: "back.out(1.4)" },
                    0.08
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══
                .to("#pcc-elements", { scale: 0.8, opacity: 0, xPercent: -50, yPercent: -50, duration: 0.06, ease: "power3.in" }, 0.72)

                // Spider web
                .to("#pcc-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)
                .to("#pcc-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#pcc-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)
                .to("#pcc-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)
                .to("#pcc-bg", { opacity: 0, scale: 1.2, duration: 0.08 }, 0.84)
                .to("#pcc-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="pcc-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "800vh" }}
        >
            <div
                id="pcc-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
            >
                {/* ── Background ── */}
                <div id="pcc-bg" className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0">
                    <img
                        src="/assets/pem slide 12/refined bg.png"
                        alt="Sunburst background"
                        className="w-full h-full object-contain max-w-none"
                    />
                </div>

                {/* ── Main Content Container ── */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {/* All elements in one image - centered */}
                    <div id="pcc-elements" className="absolute z-30 w-full lg:w-[95%] drop-shadow-[6px_6px_0_rgba(0,0,0,0.5)]"
                        style={{
                            top: "40%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <img
                            src="/assets/pem slide 12/pem slide 12 elements.png"
                            alt="Downward-Sloping Price Consumption Curve"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="pcc-web-transition" />
            </div>
        </section>
    );
}
