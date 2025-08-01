import { usePageMeta } from "@/hooks/usePageMeta.hook";
import PricingFaq from "./pricing-faq";
import PricingHero from "./pricing-hero";
// import PricingPlan from "./pricingplan";
import PricingPlan from "@/components/common/home/pricing-plan-section";
const Pricing = () => {
  usePageMeta({
    title: "Pricing – Karially",
    description: "Check out our affordable pricing plans for Karially.",
  });
  return (
    <>
      <PricingHero />
      <PricingPlan />
      <PricingFaq />
    </>
  );
};

export default Pricing;
