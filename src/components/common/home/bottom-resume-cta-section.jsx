import React from "react";
import resumeTop from "../../../assets/images/resume-top.svg";
import resumeBottom from "../../../assets/images/resume-bottom.svg";

export default function BottomResumeCTASection() {
  return (
    <section className="w-full bg-gradient-to-r from-primary to-secondary md:pt-20 lg:pt-32 font-read">
      <div className="container w-11/12 mx-auto flex flex-col md:flex-row gap-7">
        {/* left side content section */}
        <div className="flex-1 flex justify-center items-center pt-10 md:py-3 md:pb-12 lg:pb-32  xl:pb-40 mb-30 md:mb-0">
          <div className="">
            <h3 className="text-[#F7F7F8] text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16">
              Your perfect resume is a click away
            </h3>
            <p className="text-[#E0E2E6] my-2 max-w-[560px] leading-4 md:leading-5 lg:leading-6">
              Ditch blank pages and formatting woes. Resumate_ai helps you craft
              standout resumes.
            </p>

            <button className="rounded-[100px] text-sm md:text-base bg-white py-3 px-5 mt-8">
              Start for Free
            </button>

            {/* <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black z-30 "></div> */}
          </div>
        </div>

        {/* right side resume image */}
        <div className="flex-1 mt-5 md:mt-0 flex relative">
          <div>
            <img src={resumeBottom} className="absolute bottom-0 md:max-w-[770px] md:max-h-[1020px] md:w-full md:h-full"></img>
          </div>
          <div className="">
            <img className="absolute bottom-0 -ml-4 md:max-w-[770px] md:max-h-[1020px] md:w-full md:h-full" src={resumeTop}></img>
          </div>
          {/* <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black z-30 "></div> */}
        </div>
      </div>
    </section>
  );
}
