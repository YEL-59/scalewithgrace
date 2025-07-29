// import { useLocation, useParams } from "react-router";
// import Template1 from "./cv-template/template1";
// import Template2 from "./cv-template/template2";

// const templateMap = {
//   "template-one": Template1,
//   "template-two": Template2,
// };

// const CVPreview = () => {
//   const { templateSlug } = useParams();
//   const { state } = useLocation();
//   const { formData } = state || {};

//   const SelectedTemplate = templateMap[templateSlug];

//   if (!SelectedTemplate) {
//     return (
//       <div className="text-center mt-10 text-red-500">Template not found</div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <SelectedTemplate data={formData} />
//     </div>
//   );
// };

// export default CVPreview;

import { useParams } from "react-router";
import Template1 from "./cv-template/template1";
import Template2 from "./cv-template/template2";
import { useResume } from "./resumeContext";

const templateMap = {
  "template-one": Template1,
  "template-two": Template2,
};

const CVPreview = () => {
  const { templateSlug } = useParams();
  const { formData } = useResume();

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
      <SelectedTemplate data={formData} />
    </div>
  );
};

export default CVPreview;
