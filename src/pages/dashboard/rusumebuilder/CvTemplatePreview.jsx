import { useParams, useNavigate } from "react-router";
import Template1 from "./cv-template/template1";
import Template2 from "./cv-template/template2";
import { useResume } from "./resumeContext";
import Template3 from "./cv-template/template3";
import Template4 from "./cv-template/template4";
import Template5 from "./cv-template/template5";
import Template6 from "./cv-template/template6";

const templateMap = {
  "template-one": Template1,
  "template-two": Template2,
  "template-three": Template3,
  "template-four": Template4,
  "template-five": Template5,
  "template-six": Template6,
};

const CVTemplatePreview = () => {
  const { templateSlug } = useParams();
  const { formData } = useResume();
  const navigate = useNavigate();

  const SelectedTemplate = templateMap[templateSlug];

  if (!SelectedTemplate) {
    return (
      <div className="text-center mt-10 text-red-500">Template not found</div>
    );
  }

  if (!formData || Object.keys(formData).length === 0) {
    return (
      <p className="text-center text-red-500 mt-10">No resume data found.</p>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/resumeBuild-step")}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition"
      >
        ← Back
      </button>

      <SelectedTemplate data={formData} />
    </div>
  );
};

export default CVTemplatePreview;
