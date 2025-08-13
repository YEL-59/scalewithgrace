import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import ExperienceModal from "../resumebuilder-modal/ExperienceModal";
import { useFormContext, useWatch } from "react-hook-form";
import ResumePreview from "../resumePreview";
//import CertificationModal from "../CertificationModal";
import ProjectModal from "../resumebuilder-modal/ProjectModal";

const ExperienceSection = () => {
  const { setValue, control } = useFormContext();
  const experiences = useWatch({ control, name: "experiences" }) || [];
  //const certifications = useWatch({ control, name: "certifications" }) || [];
  const projects = useWatch({ control, name: "projects" }) || [];

  // State for modals
  const [openExperience, setOpenExperience] = useState(false);
  //const [openCert, setOpenCert] = useState(false);
  const [openProj, setOpenProj] = useState(false);

  const [editExpIndex, setEditExpIndex] = useState(null);
  //const [editCertIndex, setEditCertIndex] = useState(null);
  const [editProjIndex, setEditProjIndex] = useState(null);

  // Generic save handler
  const handleSave = (key, data, editIndex, setEditIndex, setOpen) => {
    let updated;
    if (key === "experiences") updated = [...experiences];
    //else if (key === "certifications") updated = [...certifications];
    else if (key === "projects") updated = [...projects];
    else updated = [];

    if (editIndex !== null) {
      updated[editIndex] = data;
    } else {
      updated.push(data);
    }
    setValue(key, updated);
    setEditIndex(null);
    setOpen(false);
  };

  const handleDelete = (key, index) => {
    let current;
    if (key === "experiences") current = [...experiences];
    // else if (key === "certifications") current = [...certifications];
    else if (key === "projects") current = [...projects];
    else current = [];

    const filtered = current.filter((_, i) => i !== index);
    setValue(key, filtered);
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
              <Button variant="ghost" size="icon" onClick={() => onDelete(idx)}>
                <Trash2 size={16} />
              </Button>
            </div>
            {fields.render(item)}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Experience List */}
      <div className="bg-white rounded-lg p-6 space-y-4 shadow ">
        {/* Experience */}
        {renderList(
          "Experience",
          experiences,
          (idx) => {
            setEditExpIndex(idx);
            setOpenExperience(true);
          },
          (idx) => handleDelete("experiences", idx),
          {
            onAdd: () => {
              setEditExpIndex(null);
              setOpenExperience(true);
            },
            render: (exp) => (
              <>
                <h3 className="font-semibold text-lg">
                  {exp.title},{" "}
                  <span className="text-gray-700">{exp.company}</span>
                </h3>
                <p className="text-sm text-gray-600">
                  {exp.location} | {exp.startDate} - {exp.endDate}
                </p>
                {exp.jobType && (
                  <p className="text-sm text-gray-500 italic">{exp.jobType}</p>
                )}
                {exp.technologies && (
                  <p className="text-sm">
                    <strong>Tech:</strong> {exp.technologies}
                  </p>
                )}
                {exp.points?.length > 0 && (
                  <ul className="list-disc ml-5 mt-1 text-sm space-y-1">
                    {exp.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
              </>
            ),
          }
        )}

        {/* Certifications */}
        {/* {renderList(
          "Certifications",
          certifications,
          (idx) => {
            setEditCertIndex(idx);
            setOpenCert(true);
          },
          (idx) => handleDelete("certifications", idx),
          {
            onAdd: () => {
              setEditCertIndex(null);
              setOpenCert(true);
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
        )} */}

        {/* Projects */}
        {renderList(
          "Projects",
          projects,
          (idx) => {
            setEditProjIndex(idx);
            setOpenProj(true);
          },
          (idx) => handleDelete("projects", idx),
          {
            onAdd: () => {
              setEditProjIndex(null);
              setOpenProj(true);
            },
            render: (proj) => (
              <>
                <p className="font-semibold">{proj.name}</p>
                <p className="text-sm">{proj.description}</p>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm"
                  >
                    {proj.url}
                  </a>
                )}

                {/* Render project points as a bullet list */}
                {proj.points?.length > 0 && (
                  <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                    {proj.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </>
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

      {/* Modal */}

      <ExperienceModal
        open={openExperience}
        onClose={() => {
          setOpenExperience(false);
          setEditExpIndex(null);
        }}
        onSave={(data) =>
          handleSave(
            "experiences",
            data,
            editExpIndex,
            setEditExpIndex,
            setOpenExperience
          )
        }
        initialData={editExpIndex !== null ? experiences[editExpIndex] : null}
      />

      {/* <CertificationModal
        open={openCert}
        onClose={() => {
          setOpenCert(false);
          setEditCertIndex(null);
        }}
        onSave={(data) =>
          handleSave(
            "certifications",
            data,
            editCertIndex,
            setEditCertIndex,
            setOpenCert
          )
        }
        initialData={
          editCertIndex !== null ? certifications[editCertIndex] : null
        }
      /> */}

      <ProjectModal
        open={openProj}
        onClose={() => {
          setOpenProj(false);
          setEditProjIndex(null);
        }}
        onSave={(data) =>
          handleSave(
            "projects",
            data,
            editProjIndex,
            setEditProjIndex,
            setOpenProj
          )
        }
        initialData={editProjIndex !== null ? projects[editProjIndex] : null}
      />
    </div>
  );
};

export default ExperienceSection;
