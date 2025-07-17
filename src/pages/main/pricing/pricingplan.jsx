import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import images from "../../../assets/images/pricingbg.png";

const monthlyPlans = [
  {
    title: "Free Plan",
    price: "$0",
    period: "/mo",
    features: [
      "Career Roadmap (Lite)",
      "Program Tracker (Lite)",
      "Resume Builder (Lite)",
      "Cover Letter (Lite)",
      "Slack Community (Read Only)",
    ],
    buttonText: "Start for Free",
  },
  {
    title: "Basic Plan",
    price: "$19.99",
    period: "/mo",
    features: [
      "Career Roadmap",
      "Program Tracker",
      "Resume Builder",
      "Cover Letter Builder",
      "Slack Community Access",
    ],
    buttonText: "Upgrade to Basic",
  },
  {
    title: "Standard Plan",
    price: "$34.99",
    period: "/mo",
    features: [
      "Career Roadmap",
      "Program Tracker",
      "Resume Builder",
      "Cover Letter Builder",
      "Slack Community Access",
      "Priority Feature Access",
    ],
    buttonText: "Go Standard",
  },
  {
    title: "Premium Plan",
    price: "$145",
    period: "/mo",
    features: [
      "1:1 with Strategic Guidance/Coach",
      "Career Roadmap",
      "Resume Builder",
      "Cover Letter Builder",
      "Slack Community Access",
      "Priority Feature Access",
      "1:1 Coaching Calls (2x/month)",
      "Messaging & Feedback",
    ],
    buttonText: "Work with a Coach",
  },
];

const yearlyPlans = monthlyPlans.map((plan) => ({
  ...plan,
  price:
    plan.price === "$0"
      ? "$0"
      : `$${(parseFloat(plan.price.replace("$", "")) * 10).toFixed(2)}`, // Example discount
  period: "/yr",
}));

const PricingPlan = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background image */}
      <img
        src={images}
        alt="Promo Background"
        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
      />

      <section className="relative z-10 py-20 px-4 text-white">
        <div className="container mx-auto text-center  mb-14">
          <Tabs defaultValue="monthly">
            {/* TabsList */}
            <div className="flex justify-center">
              <TabsList className="bg-white p-1 rounded-full inline-flex mb-6">
                <TabsTrigger
                  value="monthly"
                  className="px-5 py-2 rounded-full data-[state=active]:bg-gradient-to-r from-primary to-secondary data-[state=active]:text-white text-gray-700"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="px-5 py-2 rounded-full data-[state=active]:bg-gradient-to-r from-primary to-secondary data-[state=active]:text-white text-gray-700"
                >
                  Yearly
                </TabsTrigger>
              </TabsList>
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold mb-3">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Choose from our three plans – Basic, Standard and Premium — or
              contact us for more deals & custom plans.
            </p>

            {/* Monthly Plans */}
            <TabsContent value="monthly" className="mt-12">
              <PricingCards plans={monthlyPlans} />
            </TabsContent>

            {/* Yearly Plans */}
            <TabsContent value="yearly" className="mt-12">
              <PricingCards plans={yearlyPlans} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

const PricingCards = ({ plans }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
      {plans.map((plan, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-r from-primary to-secondary text-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between"
        >
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 text-center">
            <h3 className="text-white font-normal text-start text-[45px] leading-[66.172px] tracking-[-1.059px] pb-10">
              {plan.title}
            </h3>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between px-6 py-6 h-full bg-white border-t-2 rounded-2xl">
            <div className="text-center text-4xl font-bold text-black mb-6">
              {plan.price}
              <span className="text-base font-medium text-gray-600">
                {plan.period}
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-3 text-sm text-gray-700 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <Button className="w-full rounded-full py-5 bg-gradient-to-r from-primary to-secondary text-white text-center font-medium text-md leading-[34.41px]">
              {plan.buttonText}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingPlan;
