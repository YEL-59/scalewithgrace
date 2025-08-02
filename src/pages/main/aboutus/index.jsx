import { usePageMeta } from "@/hooks/usePageMeta.hook";
import AboutUsHero from "./aboutus-hero";
import Advertisement from "./advertisement";
import OurGoal from "./our-goal";
import OurMission from "./our-mission";

const AboutUs = () => {
  usePageMeta({
    title: "About Us – Karially",
    description: "Learn more about Karially and our mission.",
  });
  return (
    <>
      <div>
        <AboutUsHero />
        <OurMission />
        <OurGoal />
        <Advertisement />
      </div>
    </>
  );
};

export default AboutUs;
