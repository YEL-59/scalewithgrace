import { Badge } from "@/components/ui/badge";
import { useGetFeaturePageSection } from "@/hooks/feature.hoook";

const FeaturesHero = () => {
  const { data, isLoading } = useGetFeaturePageSection("hero-section");
  console.log({ data });
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <section className="bg-[#F1F4FF] py-30 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1117] mb-4">
            {data?.title}
            {/* <span className="text-[#0D1117] font-bold">
              elevate your dream career
            </span> */}
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mb-8">
            {data?.description}
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
            {data?.tags?.map((feature, index) => (
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
