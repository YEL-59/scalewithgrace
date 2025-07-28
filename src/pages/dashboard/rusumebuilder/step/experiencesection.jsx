import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import ExperienceModal from "../ExperienceModal";
import { useFormContext, useWatch } from "react-hook-form";

const ExperienceSection = () => {
  const { setValue, control } = useFormContext();
  const experiences = useWatch({ control, name: "experiences" }) || [];

  const [openModal, setOpenModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (data) => {
    const updated = [...experiences];
    if (editingIndex !== null) {
      updated[editingIndex] = data;
    } else {
      updated.push(data);
    }
    setValue("experiences", updated);
    setEditingIndex(null);
    setOpenModal(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setOpenModal(true);
  };

  const handleDelete = (index) => {
    const filtered = experiences.filter((_, i) => i !== index);
    setValue("experiences", filtered);
  };

  const userDetails = useWatch({ control });
  console.log("Watched values:", userDetails);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Experience List */}
      <div className="bg-white rounded-lg p-6 space-y-4 shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Experience</h2>
          <button
            onClick={() => {
              setEditingIndex(null);
              setOpenModal(true);
            }}
            className="text-sm text-blue-600 flex items-center gap-1"
          >
            <PlusCircle size={18} /> Add Experience
          </button>
        </div>

        {experiences.length === 0 ? (
          <p className="text-gray-500 italic">No experience added yet.</p>
        ) : (
          experiences.map((exp, idx) => (
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
                {exp.title}, {exp.company}
              </h3>
              <p className="text-sm text-gray-600">
                {exp.location}, {exp.startDate} - {exp.endDate}
              </p>
              <p className="text-sm text-gray-500 italic">{exp.jobType}</p>
              <ul className="list-disc ml-5 mt-1 text-sm text-gray-700 space-y-1">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* Right Live Preview */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          Resume Preview
        </h2>

        {/* Your Details Section */}
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

        {/* Experience Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Experience
          </h3>
          <div className="space-y-5">
            {experiences.map((exp, idx) => (
              <div key={idx} className="border-b pb-4 last:border-none">
                <p className="text-base font-medium text-gray-900">
                  {exp.title}{" "}
                  <span className="text-gray-600">— {exp.company}</span>
                </p>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate} | {exp.location}
                </p>
                <p className="text-sm italic text-gray-500">{exp.jobType}</p>
                <ul className="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ExperienceModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingIndex(null);
        }}
        onSave={handleSave}
        initialData={editingIndex !== null ? experiences[editingIndex] : null}
      />
    </div>
  );
};

export default ExperienceSection;
