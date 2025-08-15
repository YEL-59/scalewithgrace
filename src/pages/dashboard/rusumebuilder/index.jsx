import { Link } from "react-router";
import bgImage from "../../../assets/images/resume-grid.avif";
import { Badge } from "@/components/ui/badge";

const ResumeHome = () => {
  const cards = [
    {
      badge: "⏱ Save time",
      title: "Upload your current resume",
      description: "We'll move everything to your new template.",
      link: "/dashboard/resume-upload",
    },
    {
      badge: "🆕 New start",
      title: "Build a new resume",
      description: "We'll guide you through each section.",
      link: "/dashboard/resume-builder",
    },
  ];

  return (
    <div className="relative w-full h-screen flex flex-col">
      {/* Background image at bottom */}

      <div className="absolute bottom-0 left-0 w-full h-[60%] rounded-t-[3rem] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </div>
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/50 bg-opacity-40" /> */}
      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-start px-4 pt-5">
        <div className="text-center mb-12">
          <h1 className="text-[#191919] font-poppins text-3xl md:text-5xl lg:text-[56px] font-semibold leading-tight max-w-4xl mx-auto">
            How would you like to start?
          </h1>
          <Badge className="mt-4 bg-green-600 text-white px-4 py-1 text-sm">
            ✅ Trusted by thousands
          </Badge>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full justify-center">
          {cards.map((card, index) => (
            <Link
              to={card.link}
              key={index}
              className="relative flex-1 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 cursor-pointer 
              transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              {/* Badge */}
              <span className="absolute -top-3 left-5 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                {card.badge}
              </span>

              {/* Content */}
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                {card.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeHome;
