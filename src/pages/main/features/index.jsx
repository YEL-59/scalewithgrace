import { usePageMeta } from "@/hooks/usePageMeta.hook";
import FeaturesHero from "./features-hero";
import FeaturesTool from "./features-tool";

const Features = () => {
  usePageMeta({
    title: "Features – Karially",
    description: "Discover the amazing features of Karially.",
  });
  return (
    <>
      <div>
        <FeaturesHero />
        <FeaturesTool />
      </div>
    </>
  );
};

export default Features;
