"use client";

import { useLenis } from "@/hooks/useLenis";
import HeroSection from "@/components/sections/HeroSection";
import UtilitySection from "@/components/sections/UtilitySection";
import TypesOfUtilitySection from "@/components/sections/TypesOfUtilitySection";
import CardinalUtilitySection from "@/components/sections/CardinalUtilitySection";
import OrdinalUtilitySection from "@/components/sections/OrdinalUtilitySection";
import MarginalUtilitySection from "@/components/sections/MarginalUtilitySection";
import TotalUtilitySection from "@/components/sections/TotalUtilitySection";
import DiminishingMUSection from "@/components/sections/DiminishingMUSection";
import DiminishingMUVideoSection from "@/components/sections/DiminishingMUVideoSection";
import IndifferenceCurveSection from "@/components/sections/IndifferenceCurveSection";
import ICDontCrossSection from "@/components/sections/ICDontCrossSection";
import ICGraphSection from "@/components/sections/ICGraphSection";
import PCCSection from "@/components/sections/PCCSection";
import PCCMeaningSection from "@/components/sections/PCCMeaningSection";
import IncomeEffectSection from "@/components/sections/IncomeEffectSection";

export default function Home() {
  useLenis();

  return (
    <div className="relative w-full overflow-x-hidden" style={{ background: "var(--comic-black)" }}>
      <HeroSection />
      <UtilitySection />
      <TypesOfUtilitySection />
      <CardinalUtilitySection />
      <OrdinalUtilitySection />
      <MarginalUtilitySection />
      <TotalUtilitySection />
      <DiminishingMUSection />
      <DiminishingMUVideoSection />
      <IndifferenceCurveSection />
      <ICDontCrossSection />
      <ICGraphSection />
      <PCCSection />
      <PCCMeaningSection />
      <IncomeEffectSection />
    </div>
  );
}
