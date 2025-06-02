import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router';
// import { Bot, Home, Settings, User } from "lucide-react";

const tabs = [
  {
    name: 'Monthly',
    value: '20',
    // icon: Home,
  },
  {
    name: 'Yearly',
    value: '30',
    // icon: User,
  },
];

export default function PricingPlanSection() {
  return (
    <section id="pricing" className="w-full bg-[#F7F7F8] font-poppins pb-7">
      <div className="container w-11/12 mx-auto py-7 md:py-9 lg:py-12 xl:py-16">
        {/* title of choose us section */}
        <div className="text-center">
          <h2
            className="text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2 font-semibold"
            data-aos="zoom-out-down"
          >
            Pricing Plan
          </h2>
          <p className="text-[#61656B] text-sm md:text-base lg:text-lg leading-5 md:leading-6 lg:leading-8">
            An affordable plan tailored for every job seeker.
          </p>
        </div>

        <Tabs
          orientation=""
          defaultValue={tabs[0].value}
          className="flex items-center justify-center mt-10 md:lg-[50px] lg:mt-[60px] xl:mt-[70px]"
        >
          <div className="flex gap-2 md:gap-4 items-center">
            <TabsList className="flex gap-0.5 md:gap-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-gradient-to-r from-primary to-secondary  data-[state=active]:text-primary-foreground justify-start px-5 py-5 rounded-[100px]"
                >
                  <tab /> {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="border rounded-4xl  text-sm md:text-base md:rounded-[100px] px-3 py-3 md:px-6 bg-[#C5C3DC] font-medium">
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold"
                >
                  {tab.value}% OFF
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>

        {/* pricing plan cards */}
        <div className="mt-6 md:mt-9 lg:mt-11 xl:mt-[50px] grid grid-cols-1 md:grid-cols-3 gap-[22px] md:gap-[26px] lg:gap-[30px] xl:gap-[35px] ">
          {/* 1st card */}
          <div
            className="p-[22px] lg:p-[30px] xl:p-[35px] border border-[#E0E2E6] rounded-[17.5px] bg-white hover:bg-gradient-to-r from-[#D0E1E4] via-[#D1D9E3] to-[#D2D5E4] group hover:transition hover:scale-y-105 hover:scale-x-95 transition duration-150 delay-150"
            data-aos="zoom-out-left"
          >
            <h6 className="text-[#0D1117] text-lg md:text-xl lg:text-2xl xl:text-[28px]">
              Free Plan
            </h6>
            <p className="text-[#61656B] text-sm lg:text-base xl:text-lg">
              Limited features, basic templates.
            </p>

            {/* <div className="my-[22px] md:my-[26px] lg:my-[30px] xl:my-[35px] border-b-2 border-[#E0E2E6]"></div> */}
            <div className="py-[22px] md:py-[26px] lg:py-[30px] xl:py-[35px] my-[22px] md:my-[26px] lg:my-[30px] xl:my-[35px] space-y-[35px] border-b-2 border-t-2 border-[#E0E2E6] hover:border-transparent">
              <p className="text-2xl md:text-3xl lg:text-4xl xl:text-[44px] font-semibold text-[#0D1117]">
                $0{' '}
                <span className="text-[#C9CCD2] text-base md:text-xl lg:text-2xl xl:text-[27px] group-hover:text-[#717171]">
                  /mo
                </span>
              </p>
              <Link to="/coming">
                <button className="text-[12.5px] md:text-[15.5px] lg:text-[17.5px] py-[13px] px-[17px] rounded-[110px] bg-[#1B1F25] w-full text-white group-hover:bg-gradient-to-r from-primary to-secondary">
                  Get started for free
                </button>
              </Link>
            </div>

            <div className="space-y-3 my-[22px] md:my-[26px] lg:my-[30px] xl:my-[35px]">
              <div className="flex items-center gap-3">
                <div className="inline-block border-2 border-[#45494F] rounded-full p-0.5">
                  <svg
                    className="size-3 md:size-2 lg:size-3 xl:size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.68359 8.9797L6.12582 10.9012L12.2023 4.81641"
                      stroke="#45494F"
                      stroke-width="1.82544"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[#45494F] text-sm md:text-base lg:text-lg">
                  AI RoadMap
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-block border-2 border-[#45494F] rounded-full p-0.5">
                  <svg
                    className="size-3 md:size-2 lg:size-3 xl:size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.68359 8.9797L6.12582 10.9012L12.2023 4.81641"
                      stroke="#45494F"
                      stroke-width="1.82544"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[#45494F] text-sm md:text-base lg:text-lg">
                  Weekly Planner
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-block border-2 border-[#45494F] rounded-full p-0.5">
                  <svg
                    className="size-3 md:size-2 lg:size-3 xl:size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.68359 8.9797L6.12582 10.9012L12.2023 4.81641"
                      stroke="#45494F"
                      stroke-width="1.82544"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[#45494F] text-sm md:text-base lg:text-lg">
                  Goal Tracking
                </p>
              </div>
            </div>
          </div>

          {/* 2nd card */}
          <div
            className="p-[22px] lg:p-[30px] xl:p-[35px] border border-[#E0E2E6] rounded-[17.5px] bg-white hover:bg-gradient-to-r from-[#D0E1E4] via-[#D1D9E3] to-[#D2D5E4] group hover:transition hover:scale-y-105 hover:scale-x-95 transition duration-150 delay-150"
            data-aos="zoom-out-down"
          >
            <h6 className="text-[#0D1117] text-lg md:text-xl lg:text-2xl xl:text-[28px]">
              Standard Plan
            </h6>
            <p className="text-[#61656B] text-sm lg:text-base xl:text-lg">
              Premium designs and advanced customization.
            </p>

            {/* <div className="my-[22px] md:my-[26px] lg:my-[30px] xl:my-[35px] border-b-2 border-[#E0E2E6]"></div> */}
            <div className="py-[22px] md:py-[26px] lg:py-[30px] xl:py-[35px] my-[22px] md:my-[26px] lg:my-[30px] xl:my-[35px] space-y-[35px] border-b-2 border-t-2 border-[#E0E2E6] hover:border-transparent">
              <p className="text-2xl md:text-3xl lg:text-4xl xl:text-[44px] font-semibold text-[#0D1117]">
                $19.99
                <span className="text-[#C9CCD2] group-hover:text-[#717171] text-base md:text-xl lg:text-2xl xl:text-[27px]">
                  /mo
                </span>
              </p>
              <Link to="/coming">
                <button className="text-[12.5px] md:text-[15.5px] lg:text-[17.5px] py-[13px] px-[17px] rounded-[110px] bg-[#1B1F25] w-full text-white group-hover:bg-gradient-to-r from-primary to-secondary">
                  Get started
                </button>
              </Link>
            </div>

            <div className="space-y-3 my-[22px] md:my-[26px] lg:my-[30px] xl:my-[35px]">
              <div className="flex items-center gap-3">
                <div className="inline-block border-2 border-[#45494F] rounded-full p-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.68359 8.9797L6.12582 10.9012L12.2023 4.81641"
                      stroke="#45494F"
                      stroke-width="1.82544"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[#45494F] text-sm md:text-base lg:text-lg">
                  All feature of free
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-block border-2 border-[#45494F] rounded-full p-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.68359 8.9797L6.12582 10.9012L12.2023 4.81641"
                      stroke="#45494F"
                      stroke-width="1.82544"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[#45494F] text-sm md:text-base lg:text-lg">
                  Ai Resume Builder
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-block border-2 border-[#45494F] rounded-full p-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.68359 8.9797L6.12582 10.9012L12.2023 4.81641"
                      stroke="#45494F"
                      stroke-width="1.82544"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[#45494F] text-sm md:text-base lg:text-lg">
                  Unlimited Roadmaps
                </p>
              </div>
            </div>
          </div>

          {/* 3rd card */}
          <div
            className="p-[22px] lg:p-[30px] xl:p-[35px] border border-[#E0E2E6] rounded-[17.5px] bg-white hover:bg-gradient-to-r from-[#D0E1E4] via-[#D1D9E3] to-[#D2D5E4] group hover:transition hover:scale-y-105 hover:scale-x-95 transition duration-150 delay-150"
            data-aos="zoom-out-right"
          >
            <h6 className="text-[#0D1117] text-lg md:text-xl lg:text-2xl xl:text-[28px]">
              Premium
            </h6>
            <p className="text-[#61656B] text-sm lg:text-base xl:text-lg">
              All-inclusive features with priority support.
            </p>

            {/* <div className="my-[22px] md:my-[26px] lg:my-[30px] xl:my-[35px] border-b-2 border-[#E0E2E6]"></div> */}
            <div className="py-[22px] md:py-[26px] lg:py-[30px] xl:py-[35px] my-[22px] md:my-[26px] lg:my-[30px] xl:my-[35px] space-y-[35px] border-b-2 border-t-2 border-[#E0E2E6] hover:border-transparent">
              <p className="text-2xl md:text-3xl lg:text-4xl xl:text-[44px] font-semibold text-[#0D1117]">
                $39.99
                <span className="text-[#C9CCD2] group-hover:text-[#717171] text-base md:text-xl lg:text-2xl xl:text-[27px]">
                  /mo
                </span>
              </p>
              <Link to="/coming">
                <button className="text-[12.5px] md:text-[15.5px] lg:text-[17.5px] py-[13px] px-[17px] rounded-[110px] bg-[#1B1F25] w-full text-white group-hover:bg-gradient-to-r from-primary to-secondary">
                  Get started
                </button>
              </Link>
            </div>

            <div className="space-y-3 my-[22px] md:my-[26px] lg:my-[30px] xl:my-[35px]">
              <div className="flex items-center gap-3">
                <div className="inline-block border-2 border-[#45494F] rounded-full p-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.68359 8.9797L6.12582 10.9012L12.2023 4.81641"
                      stroke="#45494F"
                      stroke-width="1.82544"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[#45494F] text-sm md:text-base lg:text-lg">
                  Includes all features of Standards
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-block border-2 border-[#45494F] rounded-full p-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.68359 8.9797L6.12582 10.9012L12.2023 4.81641"
                      stroke="#45494F"
                      stroke-width="1.82544"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[#45494F] text-sm md:text-base lg:text-lg">
                  1:1 Coaching Session
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-block border-2 border-[#45494F] rounded-full p-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.68359 8.9797L6.12582 10.9012L12.2023 4.81641"
                      stroke="#45494F"
                      stroke-width="1.82544"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[#45494F] text-sm md:text-base lg:text-lg">
                  Priority Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
