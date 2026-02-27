/**
 * ANIMATION UTILITIES
 * Reusable GSAP animation presets for comic scrollytelling.
 * All animations are designed for 60fps performance using
 * transform/opacity only (GPU-composited properties).
 */

import { gsap } from "gsap";

/* ============================================
   COMIC POP-IN — elastic squash/stretch entry
   ============================================ */
export const comicPopIn = (
  target: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
    scale?: number;
    rotation?: number;
    ease?: string;
  } = {}
) => {
  const {
    delay = 0,
    duration = 0.8,
    scale = 0,
    rotation = -12,
    ease = "elastic.out(1, 0.4)",
  } = options;

  return gsap.fromTo(
    target,
    {
      scale,
      rotation,
      opacity: 0,
      transformOrigin: "center center",
    },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration,
      delay,
      ease,
    }
  );
};

/* ============================================
   SLIDE IN — directional panel entry
   ============================================ */
export type SlideDirection = "left" | "right" | "top" | "bottom";

export const slideIn = (
  target: gsap.TweenTarget,
  direction: SlideDirection = "left",
  options: {
    delay?: number;
    duration?: number;
    distance?: number;
    ease?: string;
  } = {}
) => {
  const { delay = 0, duration = 0.9, distance = 120, ease = "power3.out" } = options;

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "left" || direction === "top" ? -1 : 1;

  return gsap.fromTo(
    target,
    {
      [axis]: sign * distance,
      opacity: 0,
    },
    {
      [axis]: 0,
      opacity: 1,
      duration,
      delay,
      ease,
    }
  );
};

/* ============================================
   GLITCH BURST — RGB split + shake
   ============================================ */
export const glitchBurst = (
  target: gsap.TweenTarget,
  options: {
    duration?: number;
    intensity?: number;
    repeat?: number;
  } = {}
) => {
  const { duration = 0.6, intensity = 6, repeat = 2 } = options;

  const tl = gsap.timeline();

  tl.to(target, {
    x: `random(-${intensity}, ${intensity})`,
    y: `random(-${intensity / 2}, ${intensity / 2})`,
    skewX: `random(-${intensity}, ${intensity})`,
    duration: duration / (repeat * 4),
    repeat: repeat * 4,
    yoyo: true,
    ease: "steps(2)",
  }).to(target, {
    x: 0,
    y: 0,
    skewX: 0,
    duration: 0.1,
    ease: "power2.out",
  });

  return tl;
};

/* ============================================
   SQUASH & STRETCH — organic bounce
   ============================================ */
export const squashStretch = (
  target: gsap.TweenTarget,
  options: {
    intensity?: number;
    duration?: number;
  } = {}
) => {
  const { intensity = 0.15, duration = 0.6 } = options;

  const tl = gsap.timeline();

  tl.to(target, {
    scaleX: 1 + intensity,
    scaleY: 1 - intensity,
    duration: duration * 0.3,
    ease: "power2.in",
    transformOrigin: "center bottom",
  })
    .to(target, {
      scaleX: 1 - intensity * 0.7,
      scaleY: 1 + intensity * 0.7,
      duration: duration * 0.3,
      ease: "power2.out",
    })
    .to(target, {
      scaleX: 1,
      scaleY: 1,
      duration: duration * 0.4,
      ease: "elastic.out(1, 0.5)",
    });

  return tl;
};

/* ============================================
   TYPEWRITER — letter-by-letter reveal
   ============================================ */
export const typewriter = (
  target: gsap.TweenTarget,
  options: {
    duration?: number;
    stagger?: number;
  } = {}
) => {
  const { duration = 0.05, stagger = 0.03 } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "back.out(2)",
    }
  );
};

/* ============================================
   FADE SCALE — cinematic zoom reveal
   ============================================ */
export const fadeScale = (
  target: gsap.TweenTarget,
  options: {
    fromScale?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) => {
  const {
    fromScale = 0.8,
    duration = 1,
    delay = 0,
    ease = "power2.out",
  } = options;

  return gsap.fromTo(
    target,
    { scale: fromScale, opacity: 0 },
    { scale: 1, opacity: 1, duration, delay, ease }
  );
};

/* ============================================
   RGB SHADOW SPLIT — text shadow effect
   ============================================ */
export const rgbShadowSplit = (
  target: gsap.TweenTarget,
  options: {
    offset?: number;
    duration?: number;
  } = {}
) => {
  const { offset = 4, duration = 0.3 } = options;

  return gsap.to(target, {
    textShadow: `${-offset}px ${-offset / 2}px 0 rgba(255,0,64,0.8), ${offset}px ${offset / 2}px 0 rgba(64,64,255,0.8)`,
    duration,
    ease: "steps(3)",
    yoyo: true,
    repeat: 3,
  });
};

/* ============================================
   SCROLL PROGRESS HELPER
   Creates consistent ScrollTrigger config
   ============================================ */
export const createScrollConfig = (
  trigger: string | Element,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
  } = {}
) => {
  const {
    start = "top top",
    end = "bottom top",
    scrub = 1,
    pin = true,
    markers = false,
  } = options;

  return {
    trigger,
    start,
    end,
    scrub,
    pin,
    markers,
    anticipatePin: 1,
  };
};
