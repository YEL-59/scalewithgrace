import React, { useRef } from "react";
import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import ResumeDocument from "../download-resume/template5";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function Template6({ data = {} }) {
  const resumeRef = useRef();
  const profile = data.user_profile || {};
  const NA = () => <span className="italic text-gray-400">N/A</span>;

  const full_address = [profile?.address, profile?.city, profile?.state]
    .filter(Boolean) // removes any falsy values like undefined, null, empty string
    .join(", ");

  console.log({ full_address });

  return (
    <>
      {/* Download + Print Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <PDFDownloadLink
          document={<ResumeDocument data={data} templateName="template5" />}
          fileName="resume.pdf"
          style={{
            textDecoration: "none",
            padding: "10px 20px",
            color: "#fff",
            backgroundColor: "#4a90e2",
            borderRadius: 5,
          }}
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Print
        </button>
      </div>

      {/* Scrollable Resume Content with border */}
      <div
        ref={resumeRef}
        className="bg-white text-black px-5 w-[210mm] mx-auto !urbanist border-2 border-gray-300 rounded-md"
      >
        {/* Body */}
        <div className="flex justify-between gap-5 ">
          {/* Left Column */}
          <div className="w-[40%] space-y-10 rounded-md py-10">
            {/* Header */}
            <div className="flex w-full flex-col text-center">
              {/* Initials */}
              <div className="text-[64px] font-bold tracking-[2px]">
                {profile.full_name
                  ? profile.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "NA"}
              </div>
              <h1 className="text-[32px] font-light tracking-[2px] text-[#484848] leading-tight">
                {profile.full_name
                  ? profile.full_name
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")
                      .toUpperCase()
                  : "FIRST"}
                <span className="font-semibold">
                  {" "}
                  {profile.full_name
                    ? profile.full_name.split(" ").slice(-1)[0].toUpperCase()
                    : "LAST"}
                </span>
              </h1>
              <p className="tracking-[3px] text-[#484848] py-2 uppercase leading-[24px] ">
                {profile.job_title || <NA />}
              </p>
              <div className="border-b-[2px] max-w-[100px] mx-auto w-full border-[#0D0D0D] "></div>
            </div>

            <div>
              <div className="space-y-3 ">
                <p className="text-xs flex items-center gap-2 leading-[18px]">
                  <FiPhone className="text-[14px] text-gray-600" />
                  {profile.phone || <NA />}
                </p>
                <p className="text-xs flex items-center gap-2 leading-[18px]">
                  <FiMapPin className="text-[14px] text-gray-600" />
                  {full_address || <NA />}
                </p>
                <p className="text-xs flex items-center gap-2 leading-[18px]">
                  <FiMail className="text-[14px] text-gray-600" />
                  {profile.email || <NA />}
                </p>
                <p className="text-xs flex items-center gap-2 leading-[18px]">
                  <FaLinkedin className="text-[14px] text-blue-600" />
                  {profile.social_links?.linkedin || <NA />}
                </p>
              </div>
            </div>

            {/* Skills with badges */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">
                SKILLS
              </h2>
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, i) => (
                  <div key={i} className="mb-4 text-center w-full">
                    <p className="font-semibold text-xs mb-1 uppercase tracking-wide">
                      {skill.title}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {skill.badges?.length > 0 ? (
                        skill.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 border border-gray-400 rounded-md bg-gray-100"
                            title={`${badge.name} - ${badge.level}`}
                          >
                            {badge.name} ({badge.level})
                          </span>
                        ))
                      ) : (
                        <NA />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <NA />
              )}
            </div>

            {/* Education */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">
                EDUCATION
              </h2>
              {profile.education?.length > 0 ? (
                profile.education.map((edu, i) => (
                  <div key={i} className="text-center mt-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {edu.institution || <NA />}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {edu.degree || <NA />}
                    </p>
                    <p className="text-xs leading-[18px]">
                      {edu.startDate || "N/A"} – {edu.endDate || "N/A"}
                    </p>
                  </div>
                ))
              ) : (
                <NA />
              )}
            </div>
            {/* Interests */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">
                INTERESTS
              </h2>
              {profile.interests?.length > 0 ? (
                <ul className="list-disc list-inside text-xs">
                  {profile.interests.map((interest, i) => (
                    <li key={i}>{interest.name}</li>
                  ))}
                </ul>
              ) : (
                <NA />
              )}
            </div>
          </div>

          <div className="w-[1px] bg-[#0D0D0D]"></div>

          {/* Right Column */}
          <div className="w-[60%] space-y-6 py-8 mt-8">
            {/* About */}
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">
                ABOUT
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {profile.summary?.profile || <NA />}
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">
                EXPERIENCE
              </h2>
              {profile.experience?.length > 0 ? (
                profile.experience.map((exp, i) => (
                  <div key={i}>
                    <p className="font-medium leading-[18px] text-xs">
                      {exp.title || <NA />}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {exp.company || <NA />}
                      <span>
                        {exp.startDate || "N/A"} – {exp.endDate || "N/A"}
                      </span>
                    </p>
                    <p className="text-xs leading-[20px] mt-2">
                      {exp.points?.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {exp.points.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <NA />
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <NA />
              )}
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px] ">
                PROJECTS
              </h2>
              {profile.projects?.length > 0 ? (
                profile.projects.map((project, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {project.name || <NA />}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      <a
                        href={project.url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-600"
                      >
                        {project.url || <NA />}
                      </a>
                    </p>
                    <p className="text-xs leading-[20px] mt-2">
                      {project.description || <NA />}
                    </p>
                    {project.points?.length > 0 && (
                      <ul className="list-disc list-inside mt-2">
                        {project.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <NA />
              )}
            </div>

            {/* Language */}
            {/* <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">
                LANGUAGE
              </h2>
              {profile.languages?.length > 0 ? (
                profile.languages.map((lang, i) => (
                  <p
                    key={i}
                    className="text-xs flex justify-between items-center mt-2"
                  >
                    {lang.name} <span>{lang.level || <NA />}</span>
                  </p>
                ))
              ) : (
                <>
                  <p className="text-xs flex justify-between items-center ">
                    English <span>Fluent</span>
                  </p>
                  <p className="text-xs flex justify-between items-center mt-2">
                    German <span>Native</span>
                  </p>
                </>
              )}
            </div> */}

            {/* Certifications */}
            <div>
              <h2 className="text-sm font-semibold tracking-[2px] pb-3 text-[#0D0D0D] leading-[24px]">
                CERTIFICATIONS
              </h2>
              {profile.certifications?.length > 0 ? (
                profile.certifications.map((cert, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {cert.certificationName || <NA />}
                    </p>
                    <p className="text-xs leading-[18px] font-medium flex justify-between items-center">
                      {cert.issuingOrganization || <NA />}
                      <span>{cert.dateEarned || "N/A"}</span>
                    </p>
                    {cert.notes && (
                      <p className="text-xs leading-[20px] mt-1">
                        {cert.notes}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <NA />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
