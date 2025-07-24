import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import bgImage from "../../../assets/images/pricingbg.png";
import { useSubscriptionPlans } from "@/hooks/subscription.hook";

const PricingPlan = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const { data: plans, isLoading, error } = useSubscriptionPlans(activeTab);

  return (
    <div className="relative w-full min-h-screen">
      <img
        src={bgImage}
        alt="Promo Background"
        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
      />

      <section className="relative z-10 py-20 px-4 text-white">
        <div className="container mx-auto text-center mb-14">
          <Tabs defaultValue="monthly" onValueChange={setActiveTab}>
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
                <TabsTrigger
                  value="lifetime"
                  className="px-5 py-2 rounded-full data-[state=active]:bg-gradient-to-r from-primary to-secondary data-[state=active]:text-white text-gray-700"
                >
                  Lifetime
                </TabsTrigger>
              </TabsList>
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold mb-3">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Choose from our flexible plans — Free, Basic, Standard, or
              Premium.
            </p>

            <TabsContent value={activeTab} className="mt-12">
              {isLoading ? (
                <p>Loading {activeTab} plans...</p>
              ) : error ? (
                <p className="text-red-500">Failed to load plans.</p>
              ) : (
                <PricingCards plans={plans} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

const PricingCards = ({ plans }) => {
  if (!plans?.length) return <p className="text-white">No plans available.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="bg-gradient-to-r from-primary to-secondary text-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 text-start">
            <h3 className="text-white font-normal text-[32px] leading-[1.2] tracking-tight pb-6">
              {plan.title}
            </h3>
          </div>

          {/* Price + Features */}
          <div className="flex flex-col justify-between px-6 py-6 h-full bg-white border-t-2 rounded-2xl">
            <div className="text-center text-4xl font-bold text-black mb-6">
              ${parseFloat(plan.price).toFixed(2)}
              <span className="text-base font-medium text-gray-600">
                {plan.billing_cycle === "yearly"
                  ? "/yr"
                  : plan.billing_cycle === "lifetime"
                  ? "/life"
                  : "/mo"}
              </span>
            </div>

            <ul className="space-y-3 text-sm text-gray-700 mb-6 text-left">
              {plan.features.map((feature) => (
                <li key={feature.id} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-1" />
                  <span>
                    <strong>{feature.title}:</strong>{" "}
                    <span className="text-gray-600">{feature.description}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Button className="w-full rounded-full py-5 bg-gradient-to-r from-primary to-secondary text-white text-md font-medium">
              {plan.price === "0.00" ? "Start for Free" : "Choose Plan"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingPlan;
