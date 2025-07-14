import image from "../../../assets/images/about-mission.png";
const OurMission = () => {
  return (
    <>
      <div className="bg-white">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-10 py-20 px-4">
          {/* Text Content */}
          <div className="flex-1">
            <h1
              className="text-[63.967px] leading-[85.289px] font-semibold tracking-[-1.599px] text-[#0D1117] font-poppins"
              data-aos="fade-up"
            >
              Our mission
            </h1>

            <h3
              className="text-[34px] max-w-3xl leading-[40px] tracking-[-0.85px] text-[#0D1117] font-semibold font-poppins mt-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Our mission is simple: Help people move forward with less stress
              and more strategy.
            </h3>

            <div
              className="text-[21.322px] leading-[31.983px] tracking-[-0.213px] text-[#61656B] font-normal font-poppins space-y-4 mt-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p>
                Karially was created to end the cycle of career confusion. No
                more downloading generic templates, doom-scrolling job boards,
                or feeling stuck.
              </p>
              <p>
                We guide you through the big picture and the small steps. From
                planning your next role to preparing your resume and setting
                weekly goals, Karially makes sure you're not just working hard.
                You're moving in the right direction.
              </p>
              <p>Because when you have clarity, you show up differently.</p>

              {/* Stats Cards */}
              <div
                className="flex flex-col sm:flex-row gap-5 max-w-2xl py-7"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="bg-[#EEF5FE] p-5 w-full rounded-lg text-center">
                  <h2 className="text-[47.975px] leading-[63.967px] tracking-[-0.959px] text-[#0D1117] font-normal font-poppins">
                    2024
                  </h2>
                  <p className="text-[21.322px] leading-[31.983px] tracking-[-0.213px] text-[#61656B] font-normal font-inter-tight">
                    Launched
                  </p>
                </div>
                <div className="bg-[#EEF5FE] p-5 w-full rounded-lg text-center">
                  <h2 className="text-[47.975px] leading-[63.967px] tracking-[-0.959px] text-[#0D1117] font-normal font-poppins">
                    $2.1M
                  </h2>
                  <p className="text-[21.322px] leading-[31.983px] tracking-[-0.213px] text-[#61656B] font-normal font-inter-tight">
                    Pre-seed round
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1" data-aos="fade-left" data-aos-delay="400">
            <img
              src={image}
              alt="Our mission illustration"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OurMission;
