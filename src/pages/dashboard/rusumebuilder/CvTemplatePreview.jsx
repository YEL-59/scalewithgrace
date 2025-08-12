import { useParams, useNavigate, useLocation } from "react-router";
import Template1 from "./cv-template/template1";
import Template2 from "./cv-template/template2";
import Template3 from "./cv-template/template3";
import Template4 from "./cv-template/template4";
import Template5 from "./cv-template/template5";
import Template6 from "./cv-template/template6";
import Template7 from "./cv-template/template7";
import { useResumeById } from "@/hooks/resumebuild.hook";

const templateMap = {
  "template-one": Template1,
  "template-two": Template2,
  "template-three": Template3,
  "template-four": Template4,
  "template-five": Template5,
  "template-six": Template6,
  "template-seven": Template7,
};

const CVTemplatePreview = () => {
  const { templateSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get resumeId from location.state
  const resumeId = location.state?.resumeId;

  const { data, isLoading, error } = useResumeById(resumeId);
  console.log({ data });

  const SelectedTemplate = templateMap[templateSlug];

  if (!SelectedTemplate) {
    return (
      <div className="text-center mt-10 text-red-500">Template not found</div>
    );
  }

  if (!resumeId) {
    return (
      <div className="text-center mt-10 text-red-500">
        No resume ID provided.
      </div>
    );
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load resume.</p>
    );

  if (!data) {
    return (
      <p className="text-center mt-10 text-red-500">No resume data found.</p>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <button
        onClick={() =>
          navigate("/dashboard/resumeBuild-step", {
            state: { resumeId, startStep: 4 }, // pass resumeId back , 4 = index of "Template"
          })
        }
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition"
      >
        ← Back
      </button>

      {/* Pass fetched data to template */}
      <SelectedTemplate data={data} />
    </div>
  );
};

export default CVTemplatePreview;
