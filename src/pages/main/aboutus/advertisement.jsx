import { Button } from "@/components/ui/button";
import image from "../../../assets/images/aboutbg.png";
import { useGetAboutPageSection } from "@/hooks/about.hook";

const Advertisement = () => {
  const { data } = useGetAboutPageSection("spotlight-section");
  console.log({ data });

  return (
    <div className="relative w-full h-[50vh]">
      {/* Background image */}
      <img
        src={image}
        alt="Promo Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Card Content */}
      <div className="container relative z-10 flex items-center justify-start h-full px-4">
        <div
          className="bg-white backdrop-blur-md rounded-xl shadow-lg max-w-xl w-full p-8 text-start"
          data-aos="fade-up"
        >
          <h2
            className="text-xl md:text-4xl font-semibold text-gray-900 mb-4"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {data?.title}
          </h2>
          <p
            className="text-gray-700 mb-6 max-w-md"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            {data?.description}
          </p>
          <Button
            data-aos="fade-up"
            data-aos-delay="400"
            className="font-read flex gap-1 md:gap-2 py-2 px-3 md:py-5 lg:px-7 xl:px-[45px] rounded-[100px] text-sm md:text-base lg:text-lg font-medium lg:font-semibold mt-7 md:mt-10 lg:mt-[45px] text-white bg-gradient-to-r from-primary to-secondary"
          >
            {data?.button_text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
