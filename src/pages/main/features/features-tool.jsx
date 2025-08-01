import { Link } from "react-router";
import { useGetHomepageSection } from "@/hooks/home.hook";

const FeaturesTool = () => {
  const { data } = useGetHomepageSection("feature-section");

  return (
    <section className="w-11/12 mt-16 mb-10 md:mb-16 lg:mt-32 lg:mb-[72px] md:mt-24 xl:mt-40 xl:mb-[85px] mx-auto font-poppins">
      <div className="container mx-auto space-y-10 md:space-y-16 lg:space-y-[70px] xl:space-y-[85px]">
        {/* feature title */}
        <div className="text-center">
          <h2
            className="text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2"
            data-aos="zoom-out-down"
          >
            Unlock the tools to succeed
          </h2>
          <p className="text-[#61656B] text-base md:text-lg lg:text-[16px]  leading-5 md:leading-6 lg:leading-8">
            Discover how ResuMate AI transforms the way you create, customize,
            and optimize your resume.
          </p>
        </div>

        {/* Dynamic Feature Sections */}
        {data?.contents?.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row ${
                !isEven ? "md:flex-row-reverse" : ""
              } gap-5 md:gap-10 lg:gap-16 xl:gap-20 py-7 md:py-10 xl:py-24`}
            >
              {/* Text Side */}
              <div
                className="flex-1"
                data-aos={isEven ? "flip-right" : "flip-left"}
              >
                <div className="text-base md:text-lg lg:text-xl xl:text-[22px] leading-5 md:leading-6 lg:leading-8 w-full md:w-11/12 lg:w-3/4">
                  <h2 className="text-2xl md:text-[38px] lg:text-[45px] xl:text-[60px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2">
                    {item.section_title}
                  </h2>
                  <p className="text-[#61656B]">{item.section_description}</p>

                  {/* Tags */}
                  {item.tags?.map((tag, tagIndex) => (
                    <div
                      key={tagIndex}
                      className={`flex gap-4 items-center mt-${
                        tagIndex === 0 ? "6" : "4"
                      }`}
                    >
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
                      <p className="text-[#61656B]">{tag}</p>
                    </div>
                  ))}

                  <Link to="/dashboard">
                    <button className="text-[#1B1F25] py-4 px-[22px] border border-[#1B1F25] rounded-[100px] mt-10">
                      {item.button_text}
                    </button>
                  </Link>
                </div>
              </div>

              {/* Image Side */}
              <div
                className="flex-1"
                data-aos={isEven ? "zoom-out-left" : "zoom-out-right"}
              >
                <img
                  src={item.image}
                  alt={item.section_title}
                  className="w-full h-auto"
                />
                <div className="mt-20 border-b-2 xl:hidden"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesTool;
