import React from "react";
import feature from "@/assets/images/root.svg";
// import feature1 from "@/assets/images/feature1.svg";
// import feature1top from "@/assets/images/feature1top.svg";
import feature2 from "@/assets/images/feature2.svg";
import feature3 from "@/assets/images/feature3.svg";
import { Link } from "react-router";

export default function OurFeaturesSection() {
  return (
    <section className="w-11/12 mt-16 mb-10 md:mb-16 lg:mt-32 lg:mb-[72px] md:mt-24 xl:mt-40 xl:mb-[85px] mx-auto font-poppins">
      <div className="container mx-auto space-y-10 md:space-y-16 lg:space-y-[70px] xl:space-y-[85px]">
        {/* feature title */}
        <div className="text-center">
          <h2 className="text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2">
            Our features
          </h2>
          <p className="text-[#61656B] text-base md:text-lg lg:text-xl xl:text-[22px] leading-5 md:leading-6 lg:leading-8">
            Elevate your profile with smart resumes for faster results & more
            interviews.
          </p>
        </div>

        {/* features div 1*/}
        <div className="flex flex-col md:flex-row gap-5 xl:gap-10 py-7 md:py-12 lg:py-16 xl:py-24">
          {/* left part */}
          <div className="flex-1">
            <div className="text-base md:text-lg lg:text-xl xl:text-[22px] leading-5 md:leading-6 lg:leading-8 w-full md:w-11/12 lg:w-3/4">
              <h2 className="text-2xl md:text-[38px] lg:text-[45px] xl:text-[60px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2">
                Using an AI-powered resume writing
              </h2>
              <p className="text-[#61656B]">
                Utilizes AI technology to create customized resumes that align
                with specific industry requirements and job positions.
              </p>

              <div className="flex gap-4 items-center mt-5 md:mt-6 lg:mt-8 xl:mt-10">
                <div className="p-[2px] bg-gradient-to-r from-primary to-secondary rounded-full inline-block">
                  <div className="bg-[#DAE9FD] rounded-full p-0.5">
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.89844 10.7848L6.87151 13.124L14.2688 5.71655"
                        stroke="url(#paint0_linear_8572_4087)"
                        strokeWidth="2.22222"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_8572_4087"
                          x1="16.6604"
                          y1="9.4355"
                          x2="2.53597"
                          y2="10.4087"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#504999" />
                          <stop offset="1" stopColor="#44A199" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#61656B]">
                  Generates resumes tailored to your desired job title and
                  industry.
                </p>
              </div>

              <div className="flex gap-4 items-center mt-3 md:mt-5 lg:mt-6">
                <div className="p-[2px] bg-gradient-to-r from-primary to-secondary rounded-full inline-block">
                  <div className="bg-[#DAE9FD] rounded-full p-0.5">
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.89844 10.7848L6.87151 13.124L14.2688 5.71655"
                        stroke="url(#paint0_linear_8572_4087)"
                        strokeWidth="2.22222"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_8572_4087"
                          x1="16.6604"
                          y1="9.4355"
                          x2="2.53597"
                          y2="10.4087"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#504999" />
                          <stop offset="1" stopColor="#44A199" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#61656B]">
                  Uses AI to craft concise, impactful summaries.
                </p>
              </div>

              <div className="flex gap-4 items-center mt-3 md:mt-5 lg:mt-6">
                <div className="p-[2px] bg-gradient-to-r from-primary to-secondary rounded-full inline-block">
                  <div className="bg-[#DAE9FD] rounded-full p-0.5">
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.89844 10.7848L6.87151 13.124L14.2688 5.71655"
                        stroke="url(#paint0_linear_8572_4087)"
                        strokeWidth="2.22222"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_8572_4087"
                          x1="16.6604"
                          y1="9.4355"
                          x2="2.53597"
                          y2="10.4087"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#504999" />
                          <stop offset="1" stopColor="#44A199" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#61656B]">
                  Saves time by automating content creation without sacrificing
                  quality.
                </p>
              </div>

              <Link to="/comming">
                <button className="text-[#1B1F25] py-4 px-[22px] border border-[#1B1F25] rounded-[100px] mt-10">
                  Try for free
                </button>
              </Link>
            </div>
          </div>

          {/* right part */}
          {/* <div className="bg-[#EEF5FE] pt-20 flex-1">
            <div className="relative">
              <img src={feature1}></img>
              <div className="absolute top-1/4 md:top-1/5 lg:top-1/5 xl:top-1/6 -left-1/6 md:-left-1/6 lg:-left-1/12 xl:-left-1/22 ">
                <img src={feature1top}></img>
              </div>
            </div>
          </div> */}

          {/* optional */}
          <div className="flex-1">
            <img src={feature}></img>

            <div className="mt-20 border-b-2 xl:hidden"></div>
          </div>
        </div>

        {/* features div 2*/}
        <div className="flex flex-col md:flex-row-reverse  gap-5 xl:gap-20 py-7 md:py-12 lg:py-16 xl:py-24">
          {/* left part */}
          <div className="flex-1">
            <div className="text-base md:text-lg lg:text-xl xl:text-[22px] leading-5 md:leading-6 lg:leading-8 w-full md:w-11/12 lg:w-3/4">
              <h2 className="text-2xl md:text-[38px] lg:text-[45px] xl:text-[60px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2">
                Custom options for your experience
              </h2>
              <p className="text-[#61656B]">
                Customize every detail to perfectly reflect your style, from the
                vibrant color palette to the unique décor elements that tell
                your story.
              </p>

              <div className="flex gap-4 items-center mt-5 md:mt-6 lg:mt-8 xl:mt-10">
                <div className="p-[2px] bg-gradient-to-r from-primary to-secondary rounded-full inline-block">
                  <div className="bg-[#DAE9FD] rounded-full p-0.5">
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.89844 10.7848L6.87151 13.124L14.2688 5.71655"
                        stroke="url(#paint0_linear_8572_4087)"
                        strokeWidth="2.22222"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_8572_4087"
                          x1="16.6604"
                          y1="9.4355"
                          x2="2.53597"
                          y2="10.4087"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#504999" />
                          <stop offset="1" stopColor="#44A199" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#61656B]">
                  Edit sections, rearrange layouts, and adjust fonts to suit
                  your style.
                </p>
              </div>

              <div className="flex gap-4 items-center mt-3 md:mt-5 lg:mt-6">
                <div className="p-[2px] bg-gradient-to-r from-primary to-secondary rounded-full inline-block">
                  <div className="bg-[#DAE9FD] rounded-full p-0.5">
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.89844 10.7848L6.87151 13.124L14.2688 5.71655"
                        stroke="url(#paint0_linear_8572_4087)"
                        strokeWidth="2.22222"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_8572_4087"
                          x1="16.6604"
                          y1="9.4355"
                          x2="2.53597"
                          y2="10.4087"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#504999" />
                          <stop offset="1" stopColor="#44A199" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#61656B]">
                  Add personalized details to align with specific job roles or
                  industries.
                </p>
              </div>

              <div className="flex gap-4 items-center mt-3 md:mt-5 lg:mt-6">
                <div className="p-[2px] bg-gradient-to-r from-primary to-secondary rounded-full inline-block">
                  <div className="bg-[#DAE9FD] rounded-full p-0.5">
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.89844 10.7848L6.87151 13.124L14.2688 5.71655"
                        stroke="url(#paint0_linear_8572_4087)"
                        strokeWidth="2.22222"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_8572_4087"
                          x1="16.6604"
                          y1="9.4355"
                          x2="2.53597"
                          y2="10.4087"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#504999" />
                          <stop offset="1" stopColor="#44A199" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#61656B]">
                  Include custom sections like certifications, portfolios, or
                  achievements.
                </p>
              </div>

              <Link to='/comming'>
                <button className="text-[#1B1F25] py-4 px-[22px] border border-[#1B1F25] rounded-[100px] mt-10">
                  Customize for Free
                </button>
              </Link>
            </div>
          </div>

          {/* right part */}
          <div className="flex-1">
            <img src={feature2}></img>
            <div className="mt-20 border-b-2 xl:hidden"></div>
          </div>
        </div>

        {/* features div 3*/}
        <div className="flex flex-col md:flex-row gap-5 xl:gap-10 py-7 md:py-12 lg:py-16 xl:py-24">
          {/* left part */}
          <div className="flex-1">
            <div className="text-base md:text-lg lg:text-xl xl:text-[22px] leading-5 md:leading-6 lg:leading-8 w-full md:w-11/12 lg:w-3/4">
              <h2 className="text-2xl md:text-[38px] lg:text-[45px] xl:text-[60px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2">
                ATS compatibility to attract recruiters
              </h2>
              <p className="text-[#61656B]">
                Craft ATS-optimized resumes that showcase your skills and
                experience, helping your application stand out to recruiters.
              </p>

              <div className="flex gap-4 items-center mt-5 md:mt-6 lg:mt-8 xl:mt-10">
                <div className="p-[2px] bg-gradient-to-r from-primary to-secondary rounded-full inline-block">
                  <div className="bg-[#DAE9FD] rounded-full p-0.5">
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.89844 10.7848L6.87151 13.124L14.2688 5.71655"
                        stroke="url(#paint0_linear_8572_4087)"
                        strokeWidth="2.22222"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_8572_4087"
                          x1="16.6604"
                          y1="9.4355"
                          x2="2.53597"
                          y2="10.4087"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#504999" />
                          <stop offset="1" stopColor="#44A199" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#61656B]">
                  Formats resumes to pass Applicant Tracking Systems with ease.
                </p>
              </div>

              <div className="flex gap-4 items-center mt-3 md:mt-5 lg:mt-6">
                <div className="p-[2px] bg-gradient-to-r from-primary to-secondary rounded-full inline-block">
                  <div className="bg-[#DAE9FD] rounded-full p-0.5">
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.89844 10.7848L6.87151 13.124L14.2688 5.71655"
                        stroke="url(#paint0_linear_8572_4087)"
                        strokeWidth="2.22222"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_8572_4087"
                          x1="16.6604"
                          y1="9.4355"
                          x2="2.53597"
                          y2="10.4087"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#504999" />
                          <stop offset="1" stopColor="#44A199" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#61656B]">
                  Optimizes keywords based on your target job description.
                </p>
              </div>

              <div className="flex gap-4 items-center mt-3 md:mt-5 lg:mt-6">
                <div className="p-[2px] bg-gradient-to-r from-primary to-secondary rounded-full inline-block">
                  <div className="bg-[#DAE9FD] rounded-full p-0.5">
                    <svg
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.89844 10.7848L6.87151 13.124L14.2688 5.71655"
                        stroke="url(#paint0_linear_8572_4087)"
                        strokeWidth="2.22222"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_8572_4087"
                          x1="16.6604"
                          y1="9.4355"
                          x2="2.53597"
                          y2="10.4087"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#504999" />
                          <stop offset="1" stopColor="#44A199" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#61656B]">
                  Ensures the design and structure are compliant with ATS
                  standards.
                </p>
              </div>

              <Link to="/comming">
                <button className="text-[#1B1F25] py-4 px-[22px] border border-[#1B1F25] rounded-[100px] mt-10">
                  Try for free
                </button>
              </Link>
            </div>
          </div>

          {/* right part */}
          <div className="flex-1">
            <img src={feature3}></img>
            <div className="mt-20 border-b-2 xl:hidden"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
