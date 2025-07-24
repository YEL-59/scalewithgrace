import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import templateImg from "@/assets/cvtemplate/Template1.jpg";

const templates = [
  {
    id: 1,
    name: "Classic Design",
    image: templateImg,
    slug: "template-one",
  },
  {
    id: 2,
    name: "Modern Design",
    image: templateImg,
    slug: "template-two",
  },
];

const CVTemplateGallery = () => {
  const navigate = useNavigate();
  const { getValues } = useFormContext();
  const formData = getValues();

  const handleSelect = (slug) => {
    navigate(`/dashboard/cv-preview/${slug}`, {
      state: {
        template: slug,
        formData,
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Choose a CV Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelect(template.slug)}
            className="relative cursor-pointer border rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition duration-300"
          >
            {/* Tooltip */}
            <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Click to use
            </div>

            {/* Image with transition */}
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-300"
            />

            {/* Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="text-sm text-gray-500">Preview & Use</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVTemplateGallery;
