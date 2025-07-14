import { Card, CardContent } from "@/components/ui/card";

import image1 from "../../../assets/images/goal1.png";
import image2 from "../../../assets/images/goal2.png";
import image3 from "../../../assets/images/goal3.png";

const features = [
  {
    image: image1,
    title: "Empowering job seekers",
    description:
      "We provide coaching, tools, and guidance to unlock job search potential with resources tailored to unique strengths and talents.",
  },
  {
    image: image2,
    title: "Simplifying career growth",
    description:
      "We deliver tools and strategies to help every professional progress confidently on their career journey and achieve their goals.",
  },
  {
    image: image3,
    title: "Driving real results",
    description:
      "We’re committed to delivering ROI through curated career content, personal coaching, and measurable success outcomes.",
  },
];

const OurGoal = () => {
  return (
    <section className="py-20 px-4 bg-white text-center">
      <div className="max-w-4xl mx-auto mb-12">
        <h2
          className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2"
          data-aos="fade-up"
        >
          Your success, our goal
        </h2>
        <p
          className="text-gray-500 text-base sm:text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          At ResuMaven, we empower job seekers and simplify career growth to
          turn opportunities into achievements.
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {features.map((item, index) => (
          <Card
            key={index}
            className="shadow-md"
            data-aos="zoom-in"
            data-aos-delay={300 + index * 100}
          >
            <img
              src={item.image}
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
