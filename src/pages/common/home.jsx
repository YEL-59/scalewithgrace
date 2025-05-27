import HeroSection from '@/components/common/home/hero-section';
import ShowcaseSection from '@/components/common/home/showcase-section';
import React from 'react';
import FAQSection from '../../components/common/home/faq-section';
import OurFeaturesSection from '../../components/common/home/our-features-section';
import PricingPlanSection from '../../components/common/home/pricing-plan-section';
import TopResumeCTASection from '../../components/common/home/top-resume-cta-section';
import WhyChooseUsSection from '../../components/common/home/why-choose-us-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ShowcaseSection />
      <TopResumeCTASection />
      <OurFeaturesSection />
      <WhyChooseUsSection />
      <PricingPlanSection />
      <FAQSection />
    </>
  );
}
