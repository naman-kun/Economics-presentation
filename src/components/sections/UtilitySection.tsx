"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpiderWebTransition from "@/components/effects/SpiderWebTransition";

gsap.registerPlugin(ScrollTrigger);

export default function UtilitySection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Setup initial hidden states for animation
            gsap.set([
                "#utility-burst",
                "#utility-halftone",
                "#utility-title",
                "#utility-think-group",
                "#utility-yellow-box",
                "#utility-zap",
                "#utility-retro-box",
                "#utility-pow-group",
                "#utility-sneaker",
                "#utility-sticky-note"
            ], { opacity: 0 });

            const master = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.8,
                    pin: "#utility-pin-container",
                    anticipatePin: 1,
                },
            });

            master
                // ═══ ENTRANCE ANIMATIONS (0.00 → 0.62) ═══

                // 0. Background burst zooms in immediately (same style as Hero)
                .fromTo("#utility-burst",
                    { scale: 3, opacity: 0, rotation: 25 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 0.08, ease: "power2.out" },
                    0.00
                )
                // Halftone overlay fades in with the burst
                .to("#utility-halftone", { opacity: 0.2, duration: 0.06 }, 0.02)

                // 1. Title enters with elastic pop
                .fromTo("#utility-title",
                    { scale: 0, opacity: 0, y: -50, rotation: -5 },
                    { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 0.08, ease: "back.out(2)" },
                    0.08
                )

                // 2. THINK cluster
                .fromTo("#utility-think-group",
                    { scale: 0, opacity: 0, transformOrigin: "center center" },
                    { scale: 1, opacity: 1, duration: 0.08, ease: "power3.out" },
                    0.16
                )

                // 3. Yellow Box crashing in
                .fromTo("#utility-yellow-box",
                    { x: -100, opacity: 0, rotation: -10 },
                    { x: 0, opacity: 1, rotation: -2, duration: 0.08, ease: "back.out(2)" },
                    0.25
                )
                // ZAP graphic bursts
                .fromTo("#utility-zap",
                    { scale: 0, opacity: 0, rotation: -45, transformOrigin: "center center" },
                    { scale: 1.2, opacity: 1, rotation: 12, duration: 0.06, ease: "elastic.out(1.2, 0.3)" },
                    0.32
                )
                .to("#utility-zap", { scale: 1, duration: 0.04, ease: "power2.inOut" }, 0.39)

                // 4. Retro Box drops in
                .fromTo("#utility-retro-box",
                    { x: 100, y: -50, opacity: 0, rotation: 10 },
                    { x: 0, y: 0, opacity: 1, rotation: 3, duration: 0.08, ease: "back.out(1.5)" },
                    0.40
                )

                // 5. POW graphic
                .fromTo("#utility-pow-group",
                    { scale: 0, opacity: 0, rotation: 35, transformOrigin: "center center" },
                    { scale: 1.05, opacity: 1, rotation: 4, duration: 0.09, ease: "elastic.out(0.9, 0.4)" },
                    0.48
                )
                .to("#utility-pow-group", { scale: 1, duration: 0.04, ease: "power2.inOut" }, 0.56)

                // 5b. Sneaker drops in
                .fromTo("#utility-sneaker",
                    { y: -60, opacity: 0, rotation: 20 },
                    { y: 0, opacity: 1, rotation: 12, duration: 0.08, ease: "back.out(1.8)" },
                    0.55
                )

                // 6. Sticky Note drops
                .fromTo("#utility-sticky-note",
                    { y: 100, opacity: 0, rotation: -15 },
                    { y: 0, opacity: 1, rotation: 3, duration: 0.08, ease: "back.out(2)" },
                    0.62
                )

                // ═══ EXIT TRANSITION (0.72 → 1.0) — Spider-Web Pull ═══

                // Spider web fades in
                .to("#utility-web-transition", {
                    opacity: 1, scale: 0.8, duration: 0.06, ease: "power2.out",
                }, 0.77)

                // Web threads draw in (stroke-dashoffset animation)
                .to("#utility-web-transition .web-thread", {
                    strokeDashoffset: 0, duration: 0.08, stagger: 0.002, ease: "power2.inOut",
                }, 0.77)
                .to("#utility-web-transition .web-ring", {
                    strokeDashoffset: 0, duration: 0.08, stagger: 0.005, ease: "power2.inOut",
                }, 0.80)

                // Content pulls toward center and vanishes
                .to("#utility-title", {
                    scale: 0.7, y: 30, opacity: 0, duration: 0.08, ease: "power3.in",
                }, 0.74)
                .to("#utility-think-group", {
                    scale: 0.5, opacity: 0, duration: 0.06, ease: "power3.in",
                }, 0.75)
                .to("#utility-yellow-box", {
                    x: -100, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in",
                }, 0.76)
                .to("#utility-zap", { opacity: 0, scale: 0, duration: 0.05 }, 0.76)
                .to("#utility-retro-box", {
                    x: 100, opacity: 0, scale: 0.8, duration: 0.06, ease: "power3.in",
                }, 0.77)
                .to("#utility-sneaker", {
                    y: -60, opacity: 0, scale: 0.7, duration: 0.06, ease: "power3.in",
                }, 0.77)
                .to("#utility-pow-group", { opacity: 0, scale: 0, duration: 0.05 }, 0.76)
                .to("#utility-sticky-note", {
                    y: 60, opacity: 0, scale: 0.7, duration: 0.06, ease: "power3.in",
                }, 0.78)

                // Web expands and fades to black
                .to("#utility-web-transition", {
                    scale: 2.5, opacity: 0, duration: 0.10, ease: "power2.in",
                }, 0.84)

                // Burst fades
                .to("#utility-burst", { opacity: 0, scale: 1.3, duration: 0.08 }, 0.84)

                // Halftone fades
                .to("#utility-halftone", { opacity: 0, duration: 0.06 }, 0.84)

                // Final fade to black
                .to("#utility-pin-container", { opacity: 0, duration: 0.03 }, 0.97);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="utility-section-main"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: "900vh" }}
        >
            <div
                id="utility-pin-container"
                className="relative w-full h-screen overflow-hidden"
                style={{ background: "var(--comic-black)" }}
            >
                {/* ── Background ── */}
                <div id="utility-burst" className="absolute inset-0 z-1 flex items-center justify-center" style={{ opacity: 0 }}>
                    <img
                        src="/assets/comic burst 2.png"
                        alt=""
                        className="w-[140%] max-w-none"
                        style={{
                            filter: "contrast(1.12) brightness(1.304) saturate(0.8)",
                            mixBlendMode: "screen",
                            imageRendering: "high-quality" as any,
                            willChange: "transform",
                        }}
                    />
                </div>
                <div
                    id="utility-halftone"
                    className="absolute inset-0 z-2"
                    style={{
                        opacity: 0,
                        backgroundImage: "radial-gradient(#000 2px, transparent 2.5px)",
                        backgroundSize: "10px 10px",
                        backgroundPosition: "center",
                        mixBlendMode: "overlay",
                    }}
                />

                {/* ── Main Layout Container ── */}
                <div className="relative z-10 w-full h-full p-4 md:p-10 flex flex-col items-center">

                    {/* 1. TITLE */}
                    <h2
                        id="utility-title"
                        className="comic-title text-center absolute top-[5%] md:top-[3%] w-[90%] max-w-6xl leading-[1.1]"
                        style={{
                            fontSize: "clamp(2rem, 5.5vw, 6rem)",
                            color: "white",
                            WebkitTextStroke: "2px #c92a2a",
                            textShadow: "4px 4px 0 #000, 4px 4px 0 #c92a2a", // simple stack to mimic screenshot
                            zIndex: 30,
                        }}
                    >
                        Hmm...but first what even is utility?
                    </h2>

                    {/* 📍 We will use absolutely positioned blocks to layout the rest exactly like the screenshot */}

                    {/* 2. BLUE THINK BUBBLE (Center-bottom) */}
                    <div id="utility-think-group" className="absolute top-[48%] md:top-[15%] left-[85%] -translate-x-1/2 z-15 flex flex-col items-center">
                        {/* "THINK!" miniature cloud */}
                        <div className="relative bg-cyan-400 border-4 border-black text-white px-4 py-2 -rotate-6 mb-2 rounded-[40%]" style={{ boxShadow: "4px 4px 0 black" }}>
                            <span className="comic-title text-2xl md:text-3xl" style={{ WebkitTextStroke: "1.5px black" }}>THINK!</span>
                            <div className="absolute -bottom-3 left-1/2 w-4 h-4 bg-white border-2 border-black rounded-full" />
                            <div className="absolute -bottom-6 left-[40%] w-2 h-2 bg-white border-2 border-black rounded-full" />
                        </div>

                        {/* The main spiky dialogue box */}
                        <div className="relative w-[280px] md:w-[400px] h-[220px] md:h-[280px] flex items-center justify-center filter drop-shadow-[5px_5px_0_rgba(0,0,0,1)] mt-2">
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 180" preserveAspectRatio="none">
                                <polygon points="100,5 125,40 185,25 150,75 195,120 145,135 155,175 100,150 45,175 55,135 5,120 50,75 15,25 75,40"
                                    fill="#c2f0f9" stroke="black" strokeWidth="3" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[48%] text-center text-black comic-title text-base md:text-lg leading-loose font-black" style={{ WebkitTextStroke: "0.2px black" }}>
                                    Before you get that satisfaction, it all starts with a WANT. If you don&apos;t want it, it has zero utility for you!
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. YELLOW BOX (Left side) — moved 15% up, 5% left */}
                    <div id="utility-yellow-box" className="absolute top-[30%] md:top-[33%] left-[0%] md:left-[3%] w-[380px] md:w-[550px] z-10">
                        {/* Box shadows recreating the offset halftone / block shadow */}
                        <div className="absolute inset-0 bg-[#e03a3a] translate-x-3 translate-y-3" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2.5px)", backgroundSize: "6px 6px" }} />
                        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" />
                        <div className="relative bg-[#ffe45e] border-[3px] border-black p-8">
                            <p className="comic-marker text-xl md:text-3xl leading-relaxed text-center text-black">
                                Forget toolbelts and electricity bills. In economics, <strong className="comic-title text-3xl md:text-4xl">UTILITY</strong> is just a fancy word for the <strong className="comic-title text-3xl md:text-4xl">SATISFACTION or HAPPINESS</strong> you get from having or doing something!
                            </p>
                        </div>

                        {/* ZAP Graphic overlapping bottom left of Yellow Box */}
                        <div id="utility-zap" className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 z-30">
                            <span className="comic-title text-5xl md:text-7xl !leading-none text-cyan-400 rotate-12 inline-block"
                                style={{
                                    WebkitTextStroke: "2px black",
                                    textShadow: "1px 1px 0 #000, 2px 2px 0 #000, 3px 3px 0 #000, 4px 4px 0 #000, 5px 5px 0 #000, 6px 6px 0 #000, -2px -2px 0 yellow, -4px -4px 0 yellow",
                                }}
                            >
                                ZAP!
                            </span>
                            {/* Simple yellow lightning bolt SVG */}
                            <svg viewBox="0 0 24 24" className="absolute -bottom-4 left-1/2 w-12 h-12 fill-yellow-400 stroke-black stroke-2 -translate-x-1/2 z-[-1]">
                                <path d="M13 2L3 14h7v8l10-12h-7z" />
                            </svg>
                        </div>
                    </div>

                    {/* 4. RETRO "EXAMPLE TIME" BOX (Right side, above sneaker) — enlarged 25% */}
                    <div id="utility-retro-box" className="absolute top-[70%] right-[2%] md:right-[4%] w-[700px] md:w-[840px] z-10">
                        <div className="p-1 bg-[#1a2247] border-[8px] border-[#c0392b] border-dashed shadow-[8px_8px_0_rgba(0,0,0,1)] relative">
                            <div className="absolute -inset-1 border-2 border-[#1a2247] pointer-events-none" />
                            <p className="text-white font-mono text-lg md:text-2xl leading-snug p-7">
                                <strong className="text-[#a4b0f9]">Example time:</strong> Buying those fresh, limited-edition sneakers you&apos;ve been eyeing? <strong className="text-white comic-title text-3xl md:text-4xl">MASSIVE UTILITY. 👟✨</strong>
                            </p>
                        </div>
                    </div>

                    {/* 5b. SNEAKER IMAGE (standalone, partially overlapping retro box from below-right) */}
                    <div id="utility-sneaker" className="absolute top-[68.8%] right-[1%] md:right-[15%] z-30">
                        <img
                            src="/assets/sneaker.png"
                            alt="Sneaker"
                            className="w-[200px] md:w-[270px] rotate-12 filter drop-shadow-2xl h-auto object-contain"
                        />
                    </div>

                    {/* 5. POW graphics */}
                    <div id="utility-pow-group" className="absolute top-[90%] right-[5%] md:right-[65%] z-20 flex items-center justify-center">
                        {/* POW Text with massive 3D extrusion effect */}
                        <span className="comic-title text-4xl md:text-5xl text-[#ffa500] -rotate-12 absolute z-10"
                            style={{
                                WebkitTextStroke: "2px black",
                                textShadow: "1px 1px 0 red, 2px 2px 0 red, 4px 4px 0 red, 6px 6px 0 red, 8px 8px 0 black",
                            }}
                        >
                            POW!
                        </span>
                        {/* Explosion star behind POW */}
                        <svg className="w-28 h-28 md:w-40 md:h-40 absolute z-0 overflow-visible filter drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" viewBox="0 0 100 100">
                            <polygon points="50,5 65,30 95,20 75,50 95,85 50,70 5,85 25,50 5,20 35,30" fill="#e74c3c" stroke="black" strokeWidth="3" />
                        </svg>
                        <svg className="w-16 h-16 md:w-24 md:h-24 absolute z-0 overflow-visible" viewBox="0 0 100 100" style={{ transform: "rotate(15deg)" }}>
                            <polygon points="50,5 65,30 95,20 75,50 95,85 50,70 5,85 25,50 5,20 35,30" fill="#ffa500" stroke="black" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* 6. STICKY NOTE (Bottom-left) */}
                    <div id="utility-sticky-note" className="absolute bottom-[3%] md:bottom-[45%] left-[5%] md:left-[43.8%] z-20 w-[325px] md:w-[390px] rotate-3">
                        <div className="bg-[#fcf8e3] p-7 shadow-lg relative border border-[#e0cca7]">
                            {/* Translucent Tape */}
                            <img src="/assets/comic tape removebg.png" alt="tape" className="absolute -top-7.5 left-1/2 -translate-x-1/2 w-30 h-auto -rotate-2 pointer-events-none" />
                            <p className="font-sans text-base md:text-lg italic font-semibold text-gray-800 leading-relaxed">
                                But buying the exact same pair a week later? Eh... not as much.<br /> <span className="text-gray-500">(More on that later... 👀)</span>
                            </p>
                        </div>
                    </div>

                </div>

                {/* ── Spider web transition overlay ── */}
                <SpiderWebTransition id="utility-web-transition" />

            </div>
        </section>
    );
}
