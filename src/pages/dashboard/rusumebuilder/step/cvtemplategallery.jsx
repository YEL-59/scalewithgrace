import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

import templateImg from "@/assets/cvtemplate/Template1.jpg";
import { useCreateResume } from "@/hooks/resumebuild.hook";
import { Button } from "@/components/ui/button"; // make sure this is imported

const templates = [
  {
    id: 1,
    name: "Classic Design 1",
    image: templateImg,
    slug: "template-one",
  },
  {
    id: 2,
    name: "Modern Design 2",
    image: templateImg,
    slug: "template-two",
  },
  {
    id: 3,
    name: "Modern Design 3",
    image: templateImg,
    slug: "template-three",
  },
  {
    id: 4,
    name: "Modern Design 4",
    image: templateImg,
    slug: "template-four",
  },
  {
    id: 5,
    name: "Modern Design 5",
    image: templateImg,
    slug: "template-five",
  },
  {
    id: 6,
    name: "Modern Design 6",
    image: templateImg,
    slug: "template-six",
  },
];

const CVTemplateGallery = () => {
  const navigate = useNavigate();
  const { getValues } = useFormContext();
  const { createResume } = useCreateResume();

  const handleSelect = (slug) => {
    const formData = getValues();

    const payload = {
      ...formData,
      template_name: slug,
      summary: {
        profile: formData.summary,
      },
      title: formData?.title || "Untitled Resume", // fallback if no data given.
      experience: formData.experiences,
      certifications: formData.certifications || [],
      languages: formData.languages || [],
      projects: formData.projects || [],
      skills: formData.skills || [],
      awards: formData.awards || [],
      social_links: formData.social_links || [],
      interests: formData.interests || [],
      full_name: `${formData.firstName || ""} ${
        formData.lastName || ""
      }`.trim(),
    };

    createResume(payload, {
      onSuccess: (res) => {
        const resumeId = res?.data?.id;

        if (resumeId) {
          navigate(`/dashboard/cv-preview/${slug}`, {
            state: {
              template: slug,
              resumeId,
            },
          });
        }
      },
      onError: (err) => {
        console.error("Resume creation failed:", err);
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Choose a CV Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelect(template.slug)}
            className="relative cursor-pointer border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white"
          >
            {/* Tooltip */}
            <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
              Click to use
            </div>

            {/* Image wrapper with horizontal scroll */}
            <div className="overflow-x-auto whitespace-nowrap max-h-56  flex justify-center py-5">
              <img
                src={template.image}
                alt={template.name}
                className="inline-block h-56 object-cover select-none "
                draggable={false}
              />
            </div>

            {/* Info */}
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {template.name}
              </h3>
              <p className="text-gray-500 text-sm tracking-wide">
                Preview & Use
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVTemplateGallery;
