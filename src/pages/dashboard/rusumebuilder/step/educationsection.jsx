import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import EducationModal from "../resumebuilder-modal/EducationModal";
import ResumePreview from "../resumePreview";
import CertificationModal from "../resumebuilder-modal/CertificationModal";

const EducationSection = () => {
  const { setValue, control } = useFormContext();

  // Watch all relevant arrays from form state
  const education = useWatch({ control, name: "education" }) || [];
  const certifications = useWatch({ control, name: "certifications" }) || [];
  const experiences = useWatch({ control, name: "experiences" }) || [];
  const projects = useWatch({ control, name: "projects" }) || [];

  // State to manage modals and edit indexes
  const [openEducationModal, setOpenEducationModal] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);

  const [openCertModal, setOpenCertModal] = useState(false);
  const [editingCertIndex, setEditingCertIndex] = useState(null);

  // Generic save handler for all sections
  const handleSave = (key, data, editIndex, setEditIndex, setOpen) => {
    let updated = [];
    if (key === "education") updated = [...education];
    else if (key === "certifications") updated = [...certifications];
    else if (key === "experiences") updated = [...experiences];
    else if (key === "projects") updated = [...projects];

    if (editIndex !== null) {
      updated[editIndex] = data;
    } else {
      updated.push(data);
    }
    setValue(key, updated);
    setEditIndex(null);
    setOpen(false);
  };

  // Generic delete handler
  const handleDelete = (key, index) => {
    let current = [];
    if (key === "education") current = [...education];
    else if (key === "certifications") current = [...certifications];
    else if (key === "experiences") current = [...experiences];
    else if (key === "projects") current = [...projects];

    const filtered = current.filter((_, i) => i !== index);
    setValue(key, filtered);
  };

  // Specific handlers for education edit/delete (for clarity)
  const handleEditEducation = (idx) => {
    setEditingEducationIndex(idx);
    setOpenEducationModal(true);
  };

  const handleDeleteEducation = (idx) => {
    handleDelete("education", idx);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Education List & Certifications */}
      <div className="space-y-8">
        {/* Education List */}
        <div className="bg-white rounded-lg p-6 space-y-4 shadow">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Education</h2>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm"
              onClick={() => {
                setEditingEducationIndex(null);
                setOpenEducationModal(true);
              }}
            >
              <PlusCircle size={18} />
              Add Education
            </Button>
          </div>

          {education.length === 0 ? (
            <p className="text-gray-500 italic">No education added yet.</p>
          ) : (
            education.map((edu, idx) => (
              <div
                key={idx}
                className="border p-4 rounded-md space-y-1 relative group"
              >
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditEducation(idx)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEducation(idx)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <h3 className="font-semibold">
                  {edu.degree}, {edu.institution}
                </h3>
                <p className="text-sm text-gray-600">
                  {edu.location} | {edu.startDate} - {edu.endDate}
                </p>
                {edu.description && (
                  <p className="text-sm text-gray-700">{edu.description}</p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Certifications List */}
        {/** Using renderList helper function **/}
        {renderList(
          "Certifications",
          certifications,
          (idx) => {
            setEditingCertIndex(idx);
            setOpenCertModal(true);
          },
          (idx) => handleDelete("certifications", idx),
          {
            onAdd: () => {
              setEditingCertIndex(null);
              setOpenCertModal(true);
            },
            render: (cert) => (
              <>
                <p className="font-semibold">{cert.certificationName}</p>
                <p className="text-sm text-gray-600">
                  {cert.issuingOrganization} • {cert.dateEarned}
                  {cert.expirationDate && ` — Expires: ${cert.expirationDate}`}
                </p>
                {cert.credentialId && (
                  <p className="text-sm text-gray-500">
                    ID: {cert.credentialId}
                  </p>
                )}
                {cert.certificationURL && (
                  <a
                    href={cert.certificationURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    View Certification
                  </a>
                )}
                {cert.notes && (
                  <p className="text-sm italic text-gray-500 mt-1">
                    {cert.notes}
                  </p>
                )}
              </>
            ),
          }
        )}
      </div>

      {/* Right: Resume Live Preview */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          Resume Preview
        </h2>
        <ResumePreview />
      </div>

      {/* Modals */}
      <EducationModal
        open={openEducationModal}
        onClose={() => {
          setOpenEducationModal(false);
          setEditingEducationIndex(null);
        }}
        onSave={(data) =>
          handleSave(
            "education",
            data,
            editingEducationIndex,
            setEditingEducationIndex,
            setOpenEducationModal
          )
        }
        initialData={
          editingEducationIndex !== null
            ? education[editingEducationIndex]
            : null
        }
      />

      <CertificationModal
        open={openCertModal}
        onClose={() => {
          setOpenCertModal(false);
          setEditingCertIndex(null);
        }}
        onSave={(data) =>
          handleSave(
            "certifications",
            data,
            editingCertIndex,
            setEditingCertIndex,
            setOpenCertModal
          )
        }
        initialData={
          editingCertIndex !== null ? certifications[editingCertIndex] : null
        }
      />
    </div>
  );

  // Helper function to render lists like certifications
  function renderList(title, items, onEdit, onDelete, fields) {
    return (
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

        {items.length === 0 ? (
          <p className="text-gray-500 italic">
            No {title.toLowerCase()} added yet.
          </p>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className="border p-4 rounded-md relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(idx)}>
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(idx)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              {fields.render(item)}
            </div>
          ))
        )}
      </div>
    );
  }
};

export default EducationSection;
