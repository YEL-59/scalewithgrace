import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const SkillsSection = () => {
  const { control, setValue } = useFormContext();
  const skills = useWatch({ control, name: "skills" }) || [];

  const addCategory = () => {
    const updated = [...skills, { title: "", badges: [], input: "" }];
    setValue("skills", updated);
  };

  const handleTitleChange = (index, value) => {
    const updated = [...skills];
    updated[index].title = value;
    setValue("skills", updated);
  };

  const handleInputChange = (index, value) => {
    const updated = [...skills];
    updated[index].input = value;
    setValue("skills", updated);
  };

  const handleAddBadge = (index) => {
    const badge = skills[index].input?.trim();
    if (!badge) return;
    const updated = [...skills];
    updated[index].badges.push(badge);
    updated[index].input = "";
    setValue("skills", updated);
  };

  const removeBadge = (catIdx, badgeIdx) => {
    const updated = [...skills];
    updated[catIdx].badges.splice(badgeIdx, 1);
    setValue("skills", updated);
  };

  const removeCategory = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setValue("skills", updated);
  };

  const userDetails = useWatch({ control });
  const experiences = useWatch({ control, name: "experiences" }) || [];
  const education = useWatch({ control, name: "education" }) || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Side: Input */}
      <div className="bg-white rounded-lg p-6 space-y-6 shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Skills</h2>
          <Button variant="outline" onClick={addCategory}>
            + Add Category
          </Button>
        </div>

        {skills.length === 0 ? (
          <p className="text-gray-500 italic">No skills added yet.</p>
        ) : (
          skills.map((cat, idx) => (
            <div
              key={idx}
              className="border rounded-md p-4 space-y-3 relative bg-gray-50"
            >
              <div className="flex gap-2">
                <Input
                  placeholder="Skill Category (e.g. Frontend)"
                  value={cat.title}
                  onChange={(e) => handleTitleChange(idx, e.target.value)}
                />
                <Button
                  onClick={() => removeCategory(idx)}
                  className=" text-white bg-red-500 px-2 text-xs border "
                >
                  Remove
                </Button>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g. React)"
                  value={cat.input || ""}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddBadge(idx);
                    }
                  }}
                />
                <Button type="button" onClick={() => handleAddBadge(idx)}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.badges.map((badge, badgeIdx) => (
                  <div
                    key={badgeIdx}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm gap-2 shadow-sm"
                  >
                    <span>{badge}</span>
                    <button
                      type="button"
                      onClick={() => removeBadge(idx, badgeIdx)}
                      className="hover:text-red-600 text-gray-500 focus:outline-none"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right Side: Preview */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          Resume Preview
        </h2>

        <div>
          {/* Your Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Your Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
              <p>
                <span className="font-medium">First Name:</span>{" "}
                {userDetails?.firstName || "N/A"}
              </p>
              <p>
                <span className="font-medium">Last Name:</span>{" "}
                {userDetails?.lastName || "N/A"}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {userDetails?.email || "N/A"}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {userDetails?.phone || "N/A"}
              </p>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Education
            </h3>
            <div className="space-y-5">
              {education.map((edu, idx) => (
                <div key={idx} className="border-b pb-4 last:border-none">
                  <p className="text-base font-medium text-gray-900">
                    {edu.degree}{" "}
                    <span className="text-gray-600">— {edu.institution}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate} | {edu.location}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-700 mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experience Preview */}
          <div className="mt-10 p-4 bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Experience Preview</h3>
            {experiences.length === 0 ? (
              <p className="italic text-gray-500">No experience added yet.</p>
            ) : (
              experiences.map((exp, idx) => (
                <div key={idx} className="mb-4 border-b pb-2 last:border-none">
                  <p className="font-medium text-gray-900">
                    {exp.title}{" "}
                    <span className="text-gray-600">— {exp.company}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate} | {exp.location}
                  </p>
                  <p className="text-sm italic text-gray-500">{exp.jobType}</p>
                  <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1 text-sm">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-5">
          {skills.length === 0 ? (
            <p className="italic text-gray-500">No skills added yet.</p>
          ) : (
            skills.map((cat, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {cat.title || "Untitled Category"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.badges.map((badge, badgeIdx) => (
                    <Badge
                      key={badgeIdx}
                      className="px-2 py-1 text-sm"
                      variant="secondary"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
