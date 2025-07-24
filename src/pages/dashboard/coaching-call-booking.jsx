import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Marquee from "react-fast-marquee";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Navigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const navigationMenuItems = [
  "AI Expert",
  "Software Engineer",
  "Architecture",
  "Art & Media",
  "Urban Designer",
  "Metropolitan Architect",
];

const profileCards = {
  "AI Expert": [
    {
      id: 1,
      name: "Dr. Sarah AI",
      role: "AI Researcher",
      image: "/images/ai-expert1.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
      description:
        "Explore a curated collection of architectural soundscapes designed to enhance every aspect of your day.",
    },
    {
      id: 2,
      name: "John GPT",
      role: "Machine Learning Engineer",
      image: "/images/ai-expert2.jpg",
      available: false,
      rating: 4.9,
      reviews: 120,
      description:
        "Explore a curated collection of architectural soundscapes designed to enhance every aspect of your day.",
    },
    {
      id: 3,
      name: "Ethan",
      role: "Architect",
      available: true,
      rating: 4.9,
      reviews: 120,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      description:
        "Explore a curated collection of architectural soundscapes designed to enhance every aspect of your day.",
    },
  ],
  "Software Engineer": [
    {
      id: 3,
      name: "Jane Code",
      role: "Frontend Developer",
      image: "/images/software-eng1.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
      description:
        "Explore a curated collection of architectural soundscapes designed to enhance every aspect of your day.",
    },
    {
      id: 4,
      name: "Mike Dev",
      role: "Backend Specialist",
      image: "/images/software-eng2.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
    },
  ],
  Architecture: [
    {
      id: 5,
      name: "Emily Sketch",
      role: "3D Architect",
      image: "/images/architecture1.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
    },
    {
      id: 6,
      name: "Liam Floorplan",
      role: "Interior Architect",
      image: "/images/architecture2.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
    },
  ],
  "Art & Media": [
    {
      id: 7,
      name: "Ava Canvas",
      role: "Digital Artist",
      image: "/images/art1.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
    },
    {
      id: 8,
      name: "Noah Reel",
      role: "Media Specialist",
      image: "/images/media1.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
    },
  ],
  "Urban Designer": [
    {
      id: 9,
      name: "Zoe Urban",
      role: "City Planner",
      image: "/images/urban1.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
    },
    {
      id: 10,
      name: "Ethan Design",
      role: "Urban Developer",
      image: "/images/urban2.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
    },
  ],
  "Metropolitan Architect": [
    {
      id: 11,
      name: "Chloe Metro",
      role: "Skyscraper Designer",
      image: "/images/metro1.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
    },
    {
      id: 12,
      name: "Lucas Tower",
      role: "Structural Architect",
      image: "/images/metro2.jpg",
      available: true,
      rating: 4.9,
      reviews: 120,
    },
  ],
};

export default function CoachingCall() {
  const [activeTab, setActiveTab] = useState("AI Expert");
  const navigate = useNavigate();
  return (
    <section className="container mx-auto py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto">
        {/* Marquee Tab Menu */}
        <Marquee gradient={false} speed={60}>
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {navigationMenuItems.map((title) => (
                <NavigationMenuItem key={title}>
                  <button
                    onClick={() => setActiveTab(title)}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "h-auto px-5 py-2.5 rounded-[39px] text-sm md:text-base lg:text-lg font-bold transition",
                      activeTab === title
                        ? "bg-white border border-secondary text-secondary"
                        : "bg-transparent hover:bg-white hover:border hover:border-secondary text-[#717171]"
                    )}
                  >
                    {title}
                  </button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </Marquee>
      </div>

      {/* Profile Cards */}
      <div className=" max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-center items-center mt-10">
        {(profileCards[activeTab] || []).map((profile) => (
          <div
            onClick={() => navigate(`/CoachingDetails/${profile.slug}`)}
            className="flex flex-col sm:flex-row items-center bg-white rounded-3xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden p-4 gap-4"
          >
            {/* Left: Image */}
            <div className="w-full sm:w-[140px] h-[140px] rounded-2xl overflow-hidden">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Info */}
            <div className="flex flex-col justify-between flex-1">
              {/* Name & Role */}
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold text-[#191919]">
                  {profile.name}
                </h3>
              </div>

              <div className="text-sm mt-1 text-[#717171] font-medium">
                {profile.role}{" "}
                <Badge
                  className={`ml-2 text-xs ${
                    profile.available
                      ? "text-green-600 bg-green-100"
                      : "text-gray-400 bg-gray-100"
                  }`}
                  variant="outline"
                >
                  {profile.available ? "Available" : "Unavailable"}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-sm text-[#444] mt-2 line-clamp-2">
                {profile.description}
              </p>

              {/* Rating & Book button */}
              <div className="mt-4 flex flex-col items-start ">
                {/* Rating */}
                <div className="flex items-center text-[#191919] text-sm gap-1">
                  <Star className="fill-yellow-400 text-yellow-400" size={18} />
                  <span className="font-medium">
                    {profile.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">({profile.reviews})</span>
                </div>

                {/* Button */}
                <Button className="bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium rounded-full px-5 py-2 hover:opacity-90">
                  Book Now →
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
