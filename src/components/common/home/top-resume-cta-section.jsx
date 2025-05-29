import React from "react";
// import resume from ".@/assets/images/topresume.svg";
import resumeTop from ".@/assets/images/resume-top-cta.png";
import { Link } from "react-router";

export default function TopResumeCTASection() {
  return (
    <section className="w-full bg-[#0D1117]  md:pt-20 lg:pt-32 font-poppins">
      <div className="container w-11/12 mx-auto flex flex-col-reverse md:flex-row">
        {/* left side resume image */}
        {/* <div className="flex-1 flex max-h-[550] relative">
          <div className="bg-[#FCF7F7] md:w-[380px] md:h-[380px] lg:h-[500px] xl:w-[534px] xl:h-[550px] transform md:-rotate-[14deg] xl:-rotate-[18deg] md:mt-16 lg:mt-24 xl:mt-28"></div>
          <div className="bg-white md:w-[380px] md:h-[380px] lg:h-[500px] xl:w-[534px] xl:h-[550px] transform md:-rotate-[14deg]  xl:-rotate-[18deg] md:mt-16 lg:mt-[70px] xl:mt-20 -ml-[520px] z-10 hidden md:block"></div>
          <img className="lg:-ml-[300px] xl:-ml-[600px] z-20 w-full" src={resume}></img>

          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black z-30 "></div>
        </div> */}

        <div className="relative">
          <img src={resumeTop}></img>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black z-30 "></div>
        </div>

        {/* right side content section */}
        <div className="flex-1 flex justify-center items-center py-5">
          <div className="relative">
            <h3 className="text-[#F7F7F8] text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16">
              Struggling to write a standout resume? You’re not alone.
            </h3>
            <p className="text-[#C9CCD2] my-2 max-w-[560px] leading-4 md:leading-5 lg:leading-6">
              Say goodbye to blank pages, formatting headaches, and ATS
              rejections. Karially is your partner in creating resumes that get
              you noticed.
            </p>

            <Link to='/comming'>
              <button className="rounded-[100px] text-sm md:text-bas text-white bg-gradient-to-r  from-primary to-secondary py-3 px-5 mt-8">
                Start winning jobs today
              </button>
            </Link>

            {/* <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black z-30 "></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
