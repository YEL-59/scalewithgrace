import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CoachingDetails = ({ profile }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/coach/${profile.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
    >
      {/* Left image section */}
      <div className="md:w-1/3 h-60 md:h-auto">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right content section */}
      <div className="p-6 flex flex-col justify-between md:w-2/3">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {profile.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{profile.role}</p>

          {/* Availability Badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full mb-3">
            Available
          </span>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-4">
            {profile.description?.slice(0, 120) ||
              "This is a short coach summary."}
          </p>

          {/* Rating (static example) */}
          <div className="flex items-center gap-1 text-yellow-400 mb-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
                </svg>
              ))}
          </div>
        </div>

        {/* Book Now Button */}
        <button
          className="mt-auto inline-flex items-center gap-2 px-4 py-2 bg-[#2E3192] text-white text-sm font-medium rounded-full hover:bg-[#1f236a] transition"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            navigate(`/coach/${profile.id}`);
          }}
        >
          Book Now <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CoachingDetails;
