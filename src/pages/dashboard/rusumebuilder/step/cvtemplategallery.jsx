import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCallback } from "react";

import templateImg1 from "@/assets/cvtemplate/Template1.png";
import templateImg2 from "@/assets/cvtemplate/Template2.png";
import templateImg3 from "@/assets/cvtemplate/Template3.png";
import templateImg4 from "@/assets/cvtemplate/Template4.png";
import templateImg5 from "@/assets/cvtemplate/Template5.png";
import templateImg6 from "@/assets/cvtemplate/Template6.png";
import templateImg7 from "@/assets/cvtemplate/Template7.png";
import { useCreateResume } from "@/hooks/resumebuild.hook";

const templates = [
  {
    id: 1,
    name: "Professional",
    image: templateImg1,
    slug: "template-one",
  },
  {
    id: 2,
    name: "Modern",
    image: templateImg2,
    slug: "template-two",
  },
  {
    id: 3,
    name: "Minimal",
    image: templateImg3,
    slug: "template-three",
  },
  {
    id: 4,
    name: "Modern Design 4",
    image: templateImg4,
    slug: "template-four",
  },
  {
    id: 5,
    name: "Modern Design 5",
    image: templateImg5,
    slug: "template-five",
  },
  {
    id: 6,
    name: "Modern Design 6",
    image: templateImg6,
    slug: "template-six",
  },
  {
    id: 7,
    name: "Modern Design 7",
    image: templateImg7,
    slug: "template-seven",
  },
  {
    id: 8,
    name: "Fashionable 8",
    image: templateImg7,
    slug: "template-eight",
  },
  {
    id: 9,
    name: "Minimalist 9",
    image: templateImg7,
    slug: "template-nine",
  },
  {
    id: 10,
    name: "Modern 10",
    image: templateImg7,
    slug: "template-ten",
  },
  {
    id: 11,
    name: "Modern 10",
    image: templateImg7,
    slug: "template-eleven",
  },
];

const CVTemplateGallery = () => {
  const navigate = useNavigate();
  const { getValues } = useFormContext();
  const { createResume } = useCreateResume();

  const handleSelect = useCallback(
    (slug) => {
      const formData = getValues();

      const payload = {
        ...formData,
        template_name: slug,
        summary: {
          profile: formData.summary,
        },
        title: formData?.title || "Untitled Resume",
        job_title: formData?.job_title,
        experience: formData.experiences || [],
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
    },
    [getValues, createResume, navigate]
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Choose a Resume Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            role="button"
            tabIndex={0}
            onClick={() => handleSelect(template.slug)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                handleSelect(template.slug);
            }}
            className="relative cursor-pointer border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white"
            aria-label={`Select ${template.name} template`}
          >
            {/* Tooltip */}
            <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
              Click to use
            </div>

            {/* Image wrapper */}
            <div className="overflow-x-auto whitespace-nowrap max-h-56 flex justify-center py-5">
              <img
                src={template.image}
                alt={template.name}
                className="inline-block h-56 object-cover select-none"
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
