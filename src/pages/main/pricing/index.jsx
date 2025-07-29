import PricingFaq from "./pricing-faq";
import PricingHero from "./pricing-hero";
// import PricingPlan from "./pricingplan";
import PricingPlan from "@/components/common/home/pricing-plan-section";
const Pricing = () => {
  return (
    <>
      <PricingHero />
      <PricingPlan />
      <PricingFaq />
    </>
  );
};

export default Pricing;
