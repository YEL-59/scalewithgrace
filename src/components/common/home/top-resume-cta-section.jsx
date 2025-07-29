// import resume from ".@/assets/images/topresume.svg";
import { useGetHomepageSection } from "@/hooks/home.hook";
import resumeTop from "../../../assets/images/herosection.png";
import { Link } from "react-router";

export default function TopResumeCTASection() {
  const { data, isLoading } = useGetHomepageSection("trust-section");
  console.log({ data });
  if (isLoading) return <p>Loading...</p>;
  return (
    <section className="w-full bg-[#F1F4FF]  md:pt-20 lg:pt-[50px] py-20 font-poppins">
      <div className="container w-11/12 mx-auto flex flex-col-reverse md:flex-row gap-5">
        <div className="relative flex-1">
          <div className="">
            <img src={resumeTop}></img>
          </div>
        </div>

        {/* right side content section */}
        <div className="flex-1  py-5 ">
          <div className="">
            <h3
              className="text-[#191919] font-normal text-[64px] leading-[70px] tracking-[-1.6px]"
              data-aos="fade-right"
            >
              {data?.title}
            </h3>
            <p className="text-[#191919] my-2 max-w-[560px] leading-4 md:leading-5 lg:leading-6">
              {data?.description}
            </p>

            <Link to="/coming">
              <button
                className="rounded-[100px] text-sm md:text-bas text-white bg-gradient-to-r  from-primary to-secondary py-3 px-5 mt-8"
                data-aos="zoom-in"
              >
                {data?.button_text}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
