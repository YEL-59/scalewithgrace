import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  {
    name: "Monthly",
    value: "Monthly",
    price: "20",
  },
  {
    name: "Yarly",
    value: "Yarly",
    price: "30",
  },
];

export default function PricingPlanSection() {
  return (
    <section className="w-full bg-[#F7F7F8]">
      <div className="container w-11/12 mx-auto py-16 md:py-24 lg:py-32 xl:py-40">
        {/* title of choose us section */}
        <div className="text-center">
          <h2 className="text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2">
            Pricing Plan
          </h2>
          <p className="text-[#61656B] text-sm md:text-base lg:text-lg leading-5 md:leading-6 lg:leading-8">
            An affordable plan tailored for every job seeker.
          </p>
        </div>

        <Tabs orientation="" defaultValue={tabs[0].value} className="flex items-center justify-center mt-10 md:lg-[50px] lg:mt-[60px] xl:mt-[70px]">
          <div className="flex gap-5">
            <TabsList className="gap-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-black hover:text-white hover:bg-gradient-to-r from-primary to-secondary rounded-[110px] py-3 px-5 "
                >
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div>
              {tabs.map((tab) => (
                <TabsContent
                  className="bg-[#C5C3DC] py-2 px-3 rounded-[110px] inline-block"
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.price} % off
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
