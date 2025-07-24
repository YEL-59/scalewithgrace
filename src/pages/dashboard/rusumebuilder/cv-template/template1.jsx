import { html2pdf } from "html2pdf.js";
import { useRef } from "react";

const Template1 = ({ data }) => {
  const resumeRef = useRef();

  if (!data) return <p className="p-6 text-red-500">No data provided.</p>;

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state: stateName,
    summary,
    education = [],
    experiences = [],
    skills = [],
  } = data;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    html2pdf()
      .set({
        margin: 0,
        filename: `${firstName}-${lastName}-resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="flex flex-col items-center px-4 pt-6 bg-gray-100 min-h-screen">
      {/* Buttons */}
      <div className="w-full max-w-3xl flex justify-end gap-2 mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          🖨️ Print
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          ⬇️ Download PDF
        </button>
      </div>

      {/* Resume Content */}
      <div
        ref={resumeRef}
        className="bg-white shadow-md rounded-xl p-10 space-y-6 w-[210mm] min-h-[297mm] print:shadow-none print:rounded-none print:p-0"
      >
        <header className="border-b pb-4">
          <h1 className="text-3xl font-bold">
            {firstName} {lastName}
          </h1>
          <p className="text-sm text-gray-600">
            {email} | {phone} | {address}, {city}, {stateName}
          </p>
          {summary && <p className="mt-2 italic text-gray-700">{summary}</p>}
        </header>

        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-gray-800">
                  {edu.degree}, {edu.institution}
                </h3>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate} | {edu.location}
                </p>
                <p className="text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-gray-800">
                  {exp.title} at {exp.company}
                </h3>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate} | {exp.location}
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
          <div className="space-y-4">
            {skills.map((cat, idx) => (
              <div key={idx}>
                <h3 className="text-md font-medium text-gray-700">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {cat.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template1;
