// import resume from ".@/assets/images/topresume.svg";
import { useGetHomepageSection } from "@/hooks/home.hook";
import resumeTop from "../../../assets/images/herosection.png";
import { Link } from "react-router";
import GradientButton from "@/components/shared/GradientButton";

export default function TopResumeCTASection() {
  const { data } = useGetHomepageSection("trust-section");
  console.log({ data });

  return (
    <section className="w-full bg-[#F1F4FF]  md:pt-20 lg:pt-[50px] md:py-20 font-poppins">
      <div className="container w-11/12 mx-auto flex flex-col-reverse md:flex-row gap-5">
        <div className="relative flex-1">
          <div className="">
            <img src={data?.image || resumeTop} className="rounded-md"></img>
          </div>
        </div>

        {/* right side content section */}
        <div className="flex-1  py-5 ">
          <div className="">
            <h3
              className="text-[#191919] font-normal text-3xl md:text-[64px] leading-[30px] md:leading-[70px] tracking-[-1.6px]"
              data-aos="fade-right"
            >
              {data?.title}
            </h3>
            <p className="text-[#191919] my-2 max-w-[560px] leading-4 md:leading-5 lg:leading-6">
              {data?.description}
            </p>

            <Link to="/dashboard">
              {/* <button
                className="rounded-[100px] text-sm md:text-bas text-white bg-gradient-to-r  from-primary to-secondary py-3 px-5 mt-2 md:mt-8"
                data-aos="zoom-in"
              >
                {data?.button_text}
              </button> */}
              <GradientButton
                label={data?.button_text}
                variant="primary"
                size="md"
                disabled={false}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M13.0013 7L18.0013 12M18.0013 12L13.0013 17M18.0013 12H2.66797"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
