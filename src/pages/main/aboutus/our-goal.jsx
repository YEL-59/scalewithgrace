import { Card, CardContent } from "@/components/ui/card";

import image1 from "../../../assets/images/goal1.png";

import { useGetAboutPageSection } from "@/hooks/about.hook";

const OurGoal = () => {
  const { data } = useGetAboutPageSection("success-story-section");
  console.log({ data });

  return (
    <section className="py-20 px-4 bg-white text-center">
      <div className="max-w-4xl mx-auto mb-12">
        <h2
          className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2"
          data-aos="fade-up"
        >
          {data?.title}
        </h2>
        <p
          className="text-gray-500 text-base sm:text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {data?.description}
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {data?.contents?.map((item, index) => (
          <Card
            key={index}
            className="shadow-md"
            data-aos="zoom-in"
            data-aos-delay={300 + index * 100}
          >
            <img
              src={item.image || image1}
              alt={item.title}
              className="w-full h-auto rounded-lg object-cover px-5"
            />

            <CardContent className="text-left p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OurGoal;
