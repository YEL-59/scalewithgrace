import { useGetAboutPageSection } from "@/hooks/about.hook";
import image from "../../../assets/images/about-mission.png";
const OurMission = () => {
  const { data, isLoading } = useGetAboutPageSection("our-mission-section");
  console.log({ data });
  if (isLoading) return <p>Loading...</p>;
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
              {data?.section_title || " Our mission"}
            </h1>

            <h3
              className="text-[34px] max-w-3xl leading-[40px] tracking-[-0.85px] text-[#0D1117] font-semibold font-poppins mt-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {data?.title ||
                " Our mission is simple: Help people move forward with less stress and more strategy."}
            </h3>

            <div
              className="text-[21.322px] leading-[31.983px] tracking-[-0.213px] text-[#61656B] font-normal font-poppins space-y-4 mt-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {data?.description ||
                " Our mission is simple: Help people move forward with less stress and more strategy."}

              {/* Stats Cards */}
              <div
                className="flex flex-col sm:flex-row gap-5 max-w-2xl py-7"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {data?.contents?.map((content, index) => (
                  <div
                    key={content.id || index}
                    className="bg-[#EEF5FE] p-5 w-full rounded-lg text-center"
                  >
                    <h2 className="text-[47.975px] leading-[63.967px] tracking-[-0.959px] text-[#0D1117] font-normal font-poppins">
                      {content.title}
                    </h2>
                    <p className="text-[21.322px] leading-[31.983px] tracking-[-0.213px] text-[#61656B] font-normal font-inter-tight">
                      {content.description}
                    </p>
                  </div>
                ))}
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
