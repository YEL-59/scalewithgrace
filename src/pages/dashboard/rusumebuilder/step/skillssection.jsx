import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import ResumePreview from "../resumePreview";
import SkillCategoryModal from "../SkillCategoryModal";
import SocialLinksModal from "../SocialLinksModal";
import InterestsModal from "../InterestsModal";

const SkillsSection = () => {
  const { setValue, control } = useFormContext();

  // Watch all data
  const skills = useWatch({ control, name: "skills" }) || [];
  const socialLinks = useWatch({ control, name: "social_links" }) || {};
  const interests = useWatch({ control, name: "interests" }) || [];

  // Modals state and edit indices
  const [openSkillsModal, setOpenSkillsModal] = useState(false);
  const [skillsEditIndex, setSkillsEditIndex] = useState(null);

  const [openSocialModal, setOpenSocialModal] = useState(false);

  const [openInterestsModal, setOpenInterestsModal] = useState(false);

  // Handlers for lists
  const handleSaveList = (key, data, editIdx, setEditIdx, setOpen) => {
    const current =
      key === "skills"
        ? [...skills]
        : key === "interests"
        ? [...interests]
        : [];
    if (key === "skills") {
      if (editIdx !== null) current[editIdx] = data;
      else current.push(data);
      setValue(key, current);
      setEditIdx(null);
    } else if (key === "interests") {
      setValue(key, data); // data is whole interests array from modal
    }
    setOpen(false);
  };

  // For social links, just set whole object
  const handleSaveSocial = (data) => {
    setValue("social_links", data);
    setOpenSocialModal(false);
  };

  const handleDelete = (key, index) => {
    if (key === "skills") {
      const filtered = skills.filter((_, i) => i !== index);
      setValue(key, filtered);
    } else if (key === "interests") {
      const filtered = interests.filter((_, i) => i !== index);
      setValue(key, filtered);
    }
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

      {!items || items.length === 0 ? (
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
      {/* Left: Skills List */}
      <div className="space-y-6">
        {renderList(
          "Skills",
          skills,
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
                    {skillCategory.badges.map((badge, i) => (
                      <li
                        key={i}
                        className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {badge.name}{" "}
                        <span className="italic text-xs">({badge.level})</span>
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
          (idx) => {
            // Edit interest by opening modal with all interests
            setOpenInterestsModal(true);
          },
          (idx) => handleDelete("interests", idx),
          {
            onAdd: () => setOpenInterestsModal(true),
            render: (interest) => <p className="text-sm">{interest.name}</p>,
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {links.linkedin}
                    </a>
                  </li>
                )}
                {links.github && (
                  <li>
                    GitHub:{" "}
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {links.github}
                    </a>
                  </li>
                )}
                {links.twitter && (
                  <li>
                    Twitter:{" "}
                    <a
                      href={links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {links.twitter}
                    </a>
                  </li>
                )}
                {links.website && (
                  <li>
                    Website:{" "}
                    <a
                      href={links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {links.website}
                    </a>
                  </li>
                )}
              </ul>
            ),
          }
        )}
      </div>

      {/* Right: Resume Preview */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          Resume Preview
        </h2>
        <ResumePreview />
      </div>

      {/* Modals */}
      <SkillCategoryModal
        open={openSkillsModal}
        onClose={() => {
          setOpenSkillsModal(false);
          setSkillsEditIndex(null);
        }}
        onSave={(data) =>
          handleSaveList(
            "skills",
            data,
            skillsEditIndex,
            setSkillsEditIndex,
            setOpenSkillsModal
          )
        }
        initialData={skillsEditIndex !== null ? skills[skillsEditIndex] : null}
      />

      <SocialLinksModal
        open={openSocialModal}
        onClose={() => setOpenSocialModal(false)}
        onSave={handleSaveSocial}
        initialData={Object.keys(socialLinks).length ? socialLinks : null}
      />

      <InterestsModal
        open={openInterestsModal}
        onClose={() => setOpenInterestsModal(false)}
        onSave={(data) =>
          handleSaveList("interests", data, null, null, setOpenInterestsModal)
        }
        initialData={interests}
      />
    </div>
  );
};

export default SkillsSection;
