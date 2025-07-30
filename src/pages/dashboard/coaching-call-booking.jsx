import MatchCoachForm from "./match-coach-form";

const CoachingCall = () => {
  const data = [
    {
      id: 1,
      section_title: "AI-Powered Resume Creation",
      section_description:
        "Generate job-ready resumes instantly using advanced AI templates tailored to your industry and role.",
      tags: [
        "Instant formatting",
        "Keyword optimization",
        "ATS-friendly structure",
      ],
      button_text: "Try Now",
    },

    {
      id: 2,
      section_title: "1:1 Coaching Calls",
      section_description:
        "Book a session with career experts to refine your resume, improve interview skills, and build confidence.",
      tags: [
        "Expert career guidance",
        "Interview preparation",
        "Feedback on resume",
      ],
      button_text: "Let’s match you with the right coach",
    },
  ];

  return (
    <>
      <section>
        <div className="container mx-auto space-y-10 ">
          {/* feature title */}
          <div className="text-start">
            <h2 className="text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2">
              Unlock the tools to succeed
            </h2>
            <p className="text-[#61656B] text-base md:text-lg lg:text-[16px]  leading-5 md:leading-6 lg:leading-8">
              Discover how ResuMate AI transforms the way you create, customize,
              and optimize your resume.
            </p>
          </div>

          {/* Dynamic Feature Sections */}
          {data?.map((item, id) => {
            return (
              <div
                key={id}
                className={`flex flex-col md:flex-row  gap-5 md:gap-10 lg:gap-16 xl:gap-20 py-4`}
              >
                {/* Text Side */}
                <div className="flex-1">
                  <div className="text-base md:text-lg lg:text-xl xl:text-[22px] leading-5 md:leading-6 lg:leading-8 w-full ">
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

                    {item.button_text ===
                    "Let’s match you with the right coach" ? (
                      <MatchCoachForm />
                    ) : (
                      <button className="text-[#1B1F25] py-4 px-[22px] border border-[#1B1F25] rounded-[100px] mt-10">
                        {item.button_text}
                      </button>
                    )}
                  </div>
                </div>

                {/* Image Side */}
                <div className="flex-1">
                  <img src={item.image} className="w-full h-auto" />
                  <div className="mt-20 border-b-2 xl:hidden"></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CoachingCall;
