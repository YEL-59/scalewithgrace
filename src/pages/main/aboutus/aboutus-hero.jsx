import { useGetAboutPageSection } from "@/hooks/about.hook";
import image from "../../../assets/images/abouthero.png";

const AboutUsHero = () => {
  const { data } = useGetAboutPageSection("hero-section");
  console.log({ data });

  return (
    <section className="bg-[#F1F4FF]">
      {/* Text Section */}
      <div className="max-w-6xl mx-auto text-center text-black px-4 pt-16 pb-5 md:pb-56 lg:pb-64">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-4"
          data-aos="fade-up"
        >
          {data?.title}
        </h1>
        <p
          className="text-[#6C6C6C] text-base sm:text-lg max-w-4xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {data?.description}
        </p>
      </div>

      {/* Image on black background */}
      <div className="bg-white hidden md:block py-12 px-4">
        <div
          className="container mx-auto border-red-500 -mt-[250px]"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="w-full">
            <img
              src={data?.image || image}
              alt="Career support meeting"
              className="w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-3/4 
                       rounded-xl shadow-lg  mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
// import { useGetAboutPageSection } from "@/hooks/about.hook";
// import image from "../../../assets/images/abouthero.png";

// const AboutUsHero = () => {
//   const { data } = useGetAboutPageSection("hero-section");

//   return (
//     <section className="bg-[#F1F4FF]">
//       {/* Text Section */}
//       <div className="max-w-4xl mx-auto text-center text-black px-4 pt-16 pb-5 md:pb-24 lg:pb-32">
//         <h1
//           className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-4"
//           data-aos="fade-up"
//         >
//           {data?.title}
//         </h1>
//         <p
//           className="text-[#6C6C6C] text-base sm:text-lg max-w-3xl mx-auto"
//           data-aos="fade-up"
//           data-aos-delay="200"
//         >
//           {data?.description}
//         </p>
//       </div>

//       {/* Dark background with floating image */}
//       <div className="relative bg-black ">
//         <div className="flex justify-center -translate-y-10 sm:-translate-y-14 md:-translate-y-20">
//           <img
//             src={data?.image || image}
//             alt="Career support meeting"
//             className="w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-3/4
//                        rounded-xl shadow-lg  "
//             data-aos="fade-up"
//             data-aos-delay="400"
//           />
//         </div>
//         {/* Spacer to prevent overlap with next section */}
//         <div className="h-10 sm:h-16 md:h-24"></div>
//       </div>
//     </section>
//   );
// };

// export default AboutUsHero;
