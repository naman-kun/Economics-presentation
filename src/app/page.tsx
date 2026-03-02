"use client";

import { useLenis } from "@/hooks/useLenis";
import HeroSection from "@/components/sections/HeroSection";
import UtilitySection from "@/components/sections/UtilitySection";
import TypesOfUtilitySection from "@/components/sections/TypesOfUtilitySection";
import CardinalUtilitySection from "@/components/sections/CardinalUtilitySection";

export default function Home() {
  useLenis();

  return (
    <div className="relative w-full overflow-x-hidden" style={{ background: "var(--comic-black)" }}>
      <HeroSection />
      <UtilitySection />
      <TypesOfUtilitySection />
      <CardinalUtilitySection />
    </div>
  );
}
