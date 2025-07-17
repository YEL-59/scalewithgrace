import { Badge } from "@/components/ui/badge";

const FeaturesHero = () => {
  const features = [
    "ATS-friendly",
    "Real-time suggestions",
    "Time-saving tool",
    "Job-specific resumes",
    "Job-specific resume",
  ];
  return (
    <>
      <section className="bg-[#F1F4FF] py-30 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1117] mb-4">
            Explore resources to <br />
            <span className="text-[#0D1117] font-bold">
              elevate your dream career
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mb-8">
            Simplify resumes & boost job search confidence with Resumate AI.
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
            {features.map((feature, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm font-medium rounded-full bg-white shadow-sm border-gray-200 text-gray-700"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesHero;
