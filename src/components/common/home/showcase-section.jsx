// import { motion } from "motion/react"
// import { motion } from 'framer-motion';
import Marquee from "react-fast-marquee";
import background from "@/assets/images/background-hero.svg";
import vectorBottom from "@/assets/images/vectorbottom.svg";
import circle from "@/assets/images/dot.svg";
import trikon from "@/assets/images/trikon.svg";
import { useGetHomepageSection } from "@/hooks/home.hook";

export default function ShowcaseSection() {
  const { data } = useGetHomepageSection("trust-section");
  const { data: img } = useGetHomepageSection("hero-section");
  console.log({ data });
  return (
    <section
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#F1F4FF] w-full"
    >
      <div className="container pt-12  md:pt-20  lg:pt-[105px] pb-5 md:pb-8 lg:pb-12 mx-auto">
        {/* img */}
        <div className="flex">
          <div className="w-3/4 mx-auto relative">
            <img
              className="ml-12 md:ml-24 lg:ml-32 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 animate-bounce"
              src={circle}
            ></img>
            <img className="mt-6" src={img?.image} data-aos="zoom-in"></img>
            <div className="absolute top-10 -right-6 md:top-20 md:-right-12 lg:top-20 lg:-right-16 xl:top-28 xl:-right-20">
              <img
                className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 "
                src={trikon}
              ></img>
            </div>
          </div>

          <div className="items-start py-20"></div>
        </div>

        {/* trusted brands */}
        <div className="pt-12 md:pt-20 lg:pt-[115px] text-center p-2 md:p-0">
          <img src={vectorBottom}></img>
          <h3
            className="text-2xl md:text-5xl leading-8 font-medium font-read "
            data-aos="zoom-out-down"
          >
            {data?.section_title}
          </h3>

          {/* company logos */}
          <Marquee className="mt-8 md:mt-10 lg:mt-16 xl:mt-20 bg-gradient-to-r from-primary to-secondary p-4  rounded-full">
            <div className="flex items-center gap-8 md:gap-12 lg:gap-10">
              {data?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className=" text-white px-4 py-2 rounded text-md font-medium whitespace-nowrap hover:bg-primary/90 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
