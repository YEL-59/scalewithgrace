import HeroSection from "@/components/common/home/hero-section";
import ShowcaseSection from "@/components/common/home/showcase-section";
import React from "react";
import BottomResumeCTASection from "@/components/common/home/bottom-resume-cta-section";
import FAQSection from "@/components/common/home/faq-section";
import OurFeaturesSection from "@/components/common/home/our-features-section";
import PricingPlanSection from "@/components/common/home/pricing-plan-section";
import TopResumeCTASection from "@/components/common/home/top-resume-cta-section";
import WhyChooseUsSection from "@/components/common/home/why-choose-us-section";
import { usePageMeta } from "@/hooks/usePageMeta.hook";

export default function Home() {
  usePageMeta({
    title: "Home – Karially",
    description: "Welcome to Karially, the best app for all your needs.",
  });
  return (
    <>
      <HeroSection />
      <ShowcaseSection />
      <TopResumeCTASection />
      <OurFeaturesSection />
      <WhyChooseUsSection />
      <PricingPlanSection />
      <FAQSection />
      <BottomResumeCTASection />
    </>
  );
}
