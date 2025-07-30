import { useGetHomepageSection } from "@/hooks/home.hook";

export default function WhyChooseUsSection() {
  const { data } = useGetHomepageSection("why-choose-us-section");

  return (
    <section className="w-full bg-[#F7F7F8] font-poppins">
      <div className="container w-11/12 mx-auto py-16 md:py-24 lg:py-32 xl:py-40">
        {/* Title and Description */}
        <h2
          className="text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2"
          data-aos="zoom-out-down"
        >
          {data?.title}
        </h2>
        <p className="text-[#61656B] text-base md:text-lg lg:text-xl xl:text-[22px] leading-5 md:leading-6 lg:leading-8">
          {data?.description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-16 mt-9 lg:mt-14">
          {data?.contents?.map((content) => (
            <div
              key={content.id}
              className="border border-[#E0E2E6] p-8 md:p-3 lg:p-6 xl:p-10 rounded-[36px] bg-white"
              data-aos="zoom-out-right"
            >
              {/* Icon or Image */}
              <div className="border border-[#DAE9FD] rounded-full p-5 inline-block mt-3 mb-5 lg:mb-7 xl:mb-11">
                <img
                  src={content.image}
                  alt={content.title}
                  className="h-8 w-8 object-contain"
                />
              </div>

              {/* Title */}
              <h5 className="text-xl md:text-2xl lg:text-[28px] xl:text-[32px] text-[#0D1117] mb-2">
                {content.title}
              </h5>

              {/* Description */}
              <p className="text-[#61656B] text-base lg:text-lg xl:text-xl">
                {content.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
