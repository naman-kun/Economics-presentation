"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC =
    "/assets/The Law of Diminishing Marginal Utility Explained in One Minute From Definition to Examples - One Minute Economics (1080p, h264, youtube).mp4";

export default function DiminishingMUVideoSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    /* ── Eagerly fetch the video into the browser cache ── */
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Attempt to preload the full video
        video.preload = "auto";
        video.load();
    }, []);

    useEffect(() => {
        if (!sectionRef.current) return;
        const video = videoRef.current;

        const ctx = gsap.context(() => {
            gsap.set(["#dmu-video-wrapper", "#dmu-video-title"], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#dmu-video-pin-container",
                    anticipatePin: 1,
                    onEnter: () => video?.play(),
                    onEnterBack: () => video?.play(),
                    onLeave: () => video?.pause(),
                    onLeaveBack: () => video?.pause(),
                },
            });

            // ═══ ENTRANCE ═══
            master
                // Title drops in
                .fromTo(
                    "#dmu-video-title",
                    { scale: 0.5, opacity: 0, y: -80, rotation: -3 },
                    { scale: 1, opacity: 1, y: 0, rotation: 1, duration: 0.08, ease: "back.out(1.5)" },
                    0.0
                )
                // Video panel scales in
                .fromTo(
                    "#dmu-video-wrapper",
                    { scale: 0.6, opacity: 0, rotation: 3 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.1, ease: "back.out(1.2)" },
                    0.05
                )

                // ═══ HOLD — let the video play (0.15 → 0.72) ═══

                // ═══ EXIT TRANSITION ═══
                .to("#dmu-video-title", { scale: 0.8, y: -50, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.72)
                .to("#dmu-video-wrapper", { scale: 0.7, opacity: 0, duration: 0.06, ease: "power3.in" }, 0.74)

                // Spider web
                .to("#dmu-video-web-transition", { opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out" }, 0.77)
                .to("#dmu-video-web-transition .web-thread", { strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut" }, 0.77)
                .to("#dmu-video-web-transition .web-ring", { strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut" }, 0.80)
                .to("#dmu-video-web-transition", { scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in" }, 0.84)
                .to("#dmu-video-pin-container", { opacity: 0, duration: 0.03 }, 0.97);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="dmu-video-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "800vh" }}
        >
            <div
                id="dmu-video-pin-container"
                className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
            >
                {/* ── Title ── */}
                <div
                    id="dmu-video-title"
                    className="absolute z-20 top-[3%] left-1/2 -translate-x-1/2 opacity-0"
                >
                    <h2
                        className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center uppercase tracking-wider"
                        style={{
                            fontFamily: "'Bangers', 'Comic Sans MS', cursive",
                            color: "#FFD700",
                            WebkitTextStroke: "2px #000",
                            textShadow:
                                "4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.6)",
                        }}
                    >
                        📺 Watch &amp; Learn!
                    </h2>
                </div>

                {/* ── Video Panel ── */}
                <div
                    id="dmu-video-wrapper"
                    className="relative z-10 w-[88%] md:w-[75%] lg:w-[60%] aspect-video rounded-lg overflow-hidden opacity-0"
                    style={{
                        border: "6px solid #000",
                        boxShadow:
                            "8px 8px 0 #000, 0 0 30px rgba(255,215,0,0.3)",
                    }}
                >
                    <video
                        ref={videoRef}
                        src={VIDEO_SRC}
                        preload="auto"
                        playsInline
                        controls
                        muted
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* ── Spider Web Transition Overlay ── */}
                <SpiderWebTransition id="dmu-video-web-transition" />
            </div>
        </section>
    );
}
