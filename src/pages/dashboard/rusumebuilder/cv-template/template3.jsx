import { useRef } from "react";
import html2pdf from "html2pdf.js";

const Template3 = ({ data }) => {
  const resumeRef = useRef();

  if (!data) return <p className="p-6 text-red-500">No data provided.</p>;

  const {
    firstName = "",
    lastName = "",
    email = "",
    phone = "",
    address = "",
    city = "",
    state: stateName = "",
    summary = "",
    education = [],
    experiences = [],
    skills = [],
    trainings = [],
    language = [],
    profession = "",
  } = data;

  const handleDownload = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0,
      filename: `${firstName}-${lastName}-resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="w-full py-6">
      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      <div
        ref={resumeRef}
        className="grid grid-cols-4 gap-4 max-w-4xl mx-auto border border-gray-200 shadow"
      >
        {/* Left Sidebar */}
        <div className="bg-gray-100 p-6 col-span-1">
          {/* Contact Info */}
          {(email || phone || address || city || stateName) && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Contact
              </h3>
              {email && <p className="text-xs mb-1">{email}</p>}
              {phone && <p className="text-xs mb-1">{phone}</p>}
              {(address || city || stateName) && (
                <p className="text-xs">
                  {[address, city, stateName].filter(Boolean).join(", ")}
                </p>
              )}
            </div>
          )}

          {/* Languages */}
          {Array.isArray(language) && language.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Languages
              </h3>
              {language.map((lang, idx) => {
                const name =
                  typeof lang === "string"
                    ? lang
                    : typeof lang?.name === "string"
                    ? lang.name
                    : "";
                const level = typeof lang?.level === "string" ? lang.level : "";
                if (!name && !level) return null;
                return (
                  <p key={idx} className="text-xs flex justify-between">
                    {name} {level && <span>{level}</span>}
                  </p>
                );
              })}
            </div>
          )}

          {/* Skills */}
          {Array.isArray(skills) && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Skills
              </h3>
              {skills.map((group, idx) => {
                const title =
                  typeof group?.title === "string" ? group.title : "";
                const badges = Array.isArray(group?.badges)
                  ? group.badges.filter((b) => typeof b === "string")
                  : [];
                if (!title && badges.length === 0) return null;
                return (
                  <div key={idx} className="mb-2">
                    {title && <p className="text-xs font-semibold">{title}</p>}
                    {badges.length > 0 && (
                      <ul className="text-xs list-disc ml-5">
                        {badges.map((skill, i) => (
                          <li key={i}>{skill}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Trainings */}
          {Array.isArray(trainings) && trainings.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Trainings
              </h3>
              {trainings.map((train, idx) => {
                if (
                  !train?.institution &&
                  !train?.course &&
                  !train?.startDate &&
                  !train?.endDate
                )
                  return null;
                return (
                  <div key={idx} className="mb-2">
                    {train?.institution && (
                      <p className="text-xs font-medium">{train.institution}</p>
                    )}
                    {train?.course && <p className="text-xs">{train.course}</p>}
                    {(train?.startDate || train?.endDate) && (
                      <p className="text-xs italic">
                        {[train?.startDate, train?.endDate]
                          .filter(Boolean)
                          .join(" - ")}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Main Section */}
        <div className="bg-white p-6 col-span-3">
          {/* Name and Title */}
          {(firstName || lastName) && (
            <h1 className="text-[32px] font-light tracking-[7px] text-[#484848]">
              {firstName?.toUpperCase()}{" "}
              <span className="font-semibold">{lastName?.toUpperCase()}</span>
            </h1>
          )}
          {profession && (
            <p className="tracking-[3px] text-[#484848] uppercase leading-[24px] text-center py-2 border-b mb-4 border-[#D9D9D9]">
              {profession}
            </p>
          )}

          {/* Summary */}
          {summary && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Summary
              </h3>
              <p className="text-sm text-gray-800">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {Array.isArray(experiences) && experiences.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Experience
              </h3>
              {experiences.map((exp, idx) => {
                if (!exp?.title && !exp?.company) return null;
                return (
                  <div key={idx} className="mb-4">
                    {exp?.title && (
                      <p className="font-medium text-sm">{exp.title}</p>
                    )}
                    {(exp?.company || exp?.startDate || exp?.endDate) && (
                      <p className="text-sm text-gray-600 flex justify-between">
                        {exp?.company}
                        <span>
                          {[exp?.startDate, exp?.endDate]
                            .filter(Boolean)
                            .join(" – ")}
                        </span>
                      </p>
                    )}
                    {exp?.location && (
                      <p className="text-sm text-gray-600">{exp.location}</p>
                    )}
                    {Array.isArray(exp?.points) && exp.points.length > 0 && (
                      <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
                        {exp.points
                          .filter((point) => typeof point === "string")
                          .map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Education */}
          {Array.isArray(education) && education.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Education
              </h3>
              {education.map((edu, idx) => {
                if (!edu?.degree && !edu?.institution) return null;
                return (
                  <div key={idx} className="mb-4">
                    {edu?.degree && (
                      <p className="font-medium text-sm">{edu.degree}</p>
                    )}
                    {(edu?.institution || edu?.startDate || edu?.endDate) && (
                      <p className="text-sm text-gray-600 flex justify-between">
                        {edu?.institution}
                        <span>
                          {[edu?.startDate, edu?.endDate]
                            .filter(Boolean)
                            .join(" – ")}
                        </span>
                      </p>
                    )}
                    {edu?.location && (
                      <p className="text-sm text-gray-600">{edu.location}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template3;
