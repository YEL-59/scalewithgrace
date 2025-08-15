import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import ResumePreview from "../resumePreview";
import SkillCategoryModal from "../resumebuilder-modal/SkillCategoryModal";
import SocialLinksModal from "../resumebuilder-modal/SocialLinksModal";
import InterestsModal from "../resumebuilder-modal/InterestsModal";

const SkillsSection = () => {
  const { setValue, control } = useFormContext();
  const skills = useWatch({ control, name: "skills" }) || [];
  const socialLinks = useWatch({ control, name: "social_links" }) || {};
  const interests = useWatch({ control, name: "interests" }) || [];

  const [openSkillsModal, setOpenSkillsModal] = useState(false);
  const [skillsEditIndex, setSkillsEditIndex] = useState(null);
  const [openSocialModal, setOpenSocialModal] = useState(false);
  const [openInterestsModal, setOpenInterestsModal] = useState(false);

  // Normalize flat string skills → object format for modal use
  const normalizedSkills = useMemo(
    () =>
      skills.map((skill, idx) =>
        typeof skill === "string"
          ? {
              title: `Category ${idx + 1}`,
              description: "",
              badges: [{ name: skill, level: "Intermediate" }],
            }
          : skill
      ),
    [skills]
  );

  const handleSaveSkill = (data) => {
    const updated = [...skills];
    if (skillsEditIndex !== null) updated[skillsEditIndex] = data;
    else updated.push(data);
    setValue("skills", updated);
    setSkillsEditIndex(null);
    setOpenSkillsModal(false);
  };

  const handleDelete = (key, index) => {
    if (key === "skills")
      setValue(
        key,
        skills.filter((_, i) => i !== index)
      );
    else if (key === "interests")
      setValue(
        key,
        interests.filter((_, i) => i !== index)
      );
  };

  const renderList = (title, items, onEdit, onDelete, fields) => (
    <div className="bg-white rounded-lg p-6 space-y-4 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          onClick={fields.onAdd}
          className="text-sm text-blue-600 flex items-center gap-1"
        >
          <PlusCircle size={18} /> Add {title}
        </button>
      </div>

      {!items.length ? (
        <p className="text-gray-500 italic">
          No {title.toLowerCase()} added yet.
        </p>
      ) : (
        items.map((item, idx) => (
          <div key={idx} className="border p-4 rounded-md relative">
            <div className="absolute top-2 right-2 flex gap-2">
              {onEdit && (
                <Button variant="ghost" size="icon" onClick={() => onEdit(idx)}>
                  <Pencil size={16} />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(idx)}
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
            {fields.render(item)}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        {renderList(
          "Skills",
          normalizedSkills,
          (idx) => {
            setSkillsEditIndex(idx);
            setOpenSkillsModal(true);
          },
          (idx) => handleDelete("skills", idx),
          {
            onAdd: () => {
              setSkillsEditIndex(null);
              setOpenSkillsModal(true);
            },
            render: (skillCategory) => (
              <>
                <h3 className="font-semibold text-lg">{skillCategory.title}</h3>
                {skillCategory.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {skillCategory.description}
                  </p>
                )}
                {skillCategory.badges?.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {skillCategory.badges.map((b, i) => (
                      <li
                        key={i}
                        className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {b.name}{" "}
                        <span className="italic text-xs">({b.level})</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ),
          }
        )}

        {renderList(
          "Interests",
          interests,
          () => setOpenInterestsModal(true),
          (idx) => handleDelete("interests", idx),
          {
            onAdd: () => setOpenInterestsModal(true),
            render: (i) => <p className="text-sm">{i.name}</p>,
          }
        )}

        {renderList(
          "Social Links",
          [socialLinks],
          () => setOpenSocialModal(true),
          null,
          {
            onAdd: () => setOpenSocialModal(true),
            render: (links) => (
              <ul className="space-y-1 text-sm">
                {links.linkedin && (
                  <li>
                    LinkedIn:{" "}
                    <a
                      href={links.linkedin}
                      className="text-blue-600 underline"
                    >
                      {links.linkedin}
                    </a>
                  </li>
                )}
                {links.github && (
                  <li>
                    GitHub:{" "}
                    <a href={links.github} className="text-blue-600 underline">
                      {links.github}
                    </a>
                  </li>
                )}
                {links.twitter && (
                  <li>
                    Twitter:{" "}
                    <a href={links.twitter} className="text-blue-600 underline">
                      {links.twitter}
                    </a>
                  </li>
                )}
                {links.website && (
                  <li>
                    Website:{" "}
                    <a href={links.website} className="text-blue-600 underline">
                      {links.website}
                    </a>
                  </li>
                )}
              </ul>
            ),
          }
        )}
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          Resume Preview
        </h2>
        <ResumePreview />
      </div>

      <SkillCategoryModal
        open={openSkillsModal}
        onClose={() => {
          setOpenSkillsModal(false);
          setSkillsEditIndex(null);
        }}
        onSave={handleSaveSkill}
        initialData={
          skillsEditIndex !== null
            ? normalizedSkills[skillsEditIndex]
            : {
                title: "",
                description: "",
                badges: [{ name: "", level: "Intermediate" }],
              }
        }
      />

      <SocialLinksModal
        open={openSocialModal}
        onClose={() => setOpenSocialModal(false)}
        onSave={(data) => {
          setValue("social_links", data);
          setOpenSocialModal(false);
        }}
        initialData={Object.keys(socialLinks).length ? socialLinks : null}
      />

      <InterestsModal
        open={openInterestsModal}
        onClose={() => setOpenInterestsModal(false)}
        onSave={(data) => setValue("interests", data)}
        initialData={interests}
      />
    </div>
  );
};

export default SkillsSection;
