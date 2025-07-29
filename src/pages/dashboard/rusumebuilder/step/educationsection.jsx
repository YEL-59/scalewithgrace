import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import EducationModal from "../EducationModal";

const EducationSection = () => {
  const { setValue, control } = useFormContext();
  const education = useWatch({ control, name: "education" }) || [];

  const [openModal, setOpenModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (data) => {
    const updated = [...education];
    if (editingIndex !== null) {
      updated[editingIndex] = data;
    } else {
      updated.push(data);
    }
    setValue("education", updated);
    setEditingIndex(null);
    setOpenModal(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    const filtered = education.filter((_, i) => i !== index);
    setValue("education", filtered);
  };

  const userDetails = useWatch({ control });
  const experiences = useWatch({ control, name: "experiences" }) || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Education List */}
      <div className="bg-white rounded-lg p-6 space-y-4 shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Education</h2>
          <button
            onClick={() => {
              setEditingIndex(null);
              setOpenModal(true);
            }}
            className="text-sm text-blue-600 flex items-center gap-1"
          >
            <PlusCircle size={18} /> Add Education
          </button>
        </div>

        {education.length === 0 ? (
          <p className="text-gray-500 italic">No education added yet.</p>
        ) : (
          education.map((edu, idx) => (
            <div key={idx} className="border p-4 rounded-md space-y-1 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(idx)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(idx)}
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

      {/* Right Live Preview */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          Resume Preview
        </h2>

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

      {/* Modal */}
      <EducationModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingIndex(null);
        }}
        onSave={handleSave}
        initialData={editingIndex !== null ? education[editingIndex] : null}
      />
    </div>
  );
};

export default EducationSection;
