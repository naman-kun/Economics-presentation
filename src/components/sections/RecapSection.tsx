"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function RecapSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set(["#recap-title", "#recap-video-container"], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#recap-pin-container",
                    anticipatePin: 1,
                    onEnter: () => videoRef.current?.play(),
                    onLeaveBack: () => videoRef.current?.pause(),
                },
            });

            // ENTRANCE
            master
                .fromTo("#recap-title",
                    { scale: 0.5, opacity: 0, y: -100, rotation: -2 },
                    { scale: 1, opacity: 1, y: 0, rotation: 1, duration: 0.1, ease: "back.out(1.5)" },
                    0.05
                )
                .fromTo("#recap-video-container",
                    { scale: 0.8, opacity: 0, y: 50 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.15, ease: "back.out(1.2)" },
                    0.1
                )

                // EXIT TRANSITION - Spider Web Pull
                .to("#recap-title", { scale: 0.8, y: -50, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.72)
                .to("#recap-video-container", { scale: 0.8, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.73)

                // Spider web
                .to("#recap-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)
                .to("#recap-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#recap-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)
                .to("#recap-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)
                .to("#recap-pin-container", { opacity: 0, duration: 0.03 }, 0.97);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="recap-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "400vh" }}
        >
            <div
                id="recap-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
                style={{
                    backgroundImage: "url('/assets/hero/hero bg.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
                    <div id="recap-title" className="mb-8 z-20">
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-wider transform -rotate-2 comic-title" style={{ textShadow: "4px 4px 0 #ff3b4a, 8px 8px 0 #000" }}>
                            Recap
                        </h1>
                    </div>

                    <div id="recap-video-container" className="relative z-20 w-full max-w-5xl aspect-video rounded-xl overflow-hidden border-4 border-white shadow-[10px_10px_0px_#ffe156,0_0_50px_rgba(255,225,86,0.5)] transform rotate-1 bg-black">
                        <video
                            ref={videoRef}
                            src="/videos/Recap.mp4"
                            controls
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <SpiderWebTransition id="recap-web-transition" />
            </div>
        </section>
    );
}
