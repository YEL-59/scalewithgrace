import React from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaGlobe,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaProjectDiagram,
  FaCertificate,
  FaStar,
  FaHeart,
} from "react-icons/fa";

import { PDFDownloadLink } from "@react-pdf/renderer";
import Template9PDF from "../download-resume/template9pdf";

const ACCENT_COLOR = "#4F46E5";
const GRADIENT_HEADER = "bg-gradient-to-r from-primary  to-secondary";

const Template9 = ({ data }) => {
  if (!data?.user_profile) return <p>No profile data available</p>;
  const profile = data.user_profile;

  return (
    <>
      {/* Download + Print */}
      <div className="flex gap-4 justify-center mb-6">
        <PDFDownloadLink
          document={<Template9PDF data={data} />}
          fileName="resume.pdf"
          style={{
            textDecoration: "none",
            padding: "10px 20px",
            color: "#fff",
            backgroundColor: ACCENT_COLOR,
            borderRadius: 5,
          }}
        >
          {({ loading }) =>
            loading ? "Preparing document..." : "Download Resume PDF"
          }
        </PDFDownloadLink>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Print
        </button>
      </div>

      <div className="max-w-[794px] mx-auto bg-white shadow-2xl p-8 font-sans text-[#2c2c2c]">
        {/* Header */}
        <header
          className={`${GRADIENT_HEADER} p-6 rounded-b-lg text-white mb-8`}
        >
          <h1 className="text-5xl font-bold">{profile.full_name}</h1>
          <p className="text-xl mt-1 font-semibold">
            {profile.job_title || "Professional Title"}
          </p>
          <div className="flex flex-wrap gap-4 text-sm mt-2">
            {profile.phone && (
              <div className="flex items-center gap-2">
                <FaPhoneAlt />
                {profile.phone}
              </div>
            )}
            {profile.email && (
              <div className="flex items-center gap-2">
                <FaEnvelope />
                {profile.email}
              </div>
            )}
            {profile.address && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                {profile.address}
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-2">
                <FaGlobe />
                <a
                  href={
                    profile.website.startsWith("http")
                      ? profile.website
                      : "https://" + profile.website
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            {profile.social_links?.linkedin && (
              <div className="flex items-center gap-2">
                <FaLinkedin />
                <a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {profile.summary?.profile && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-wider text-indigo-600 flex items-center gap-2">
              <FaUser /> Professional Summary
            </h2>
            <p className="text-xs text-gray-700 mt-2">
              {profile.summary.profile}
            </p>
            <div className="border-t-2 border-indigo-300 my-4"></div>
          </section>
        )}

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-wider text-indigo-600 flex items-center gap-2">
              <FaStar /> Skills
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.skills.map((skill, idx) =>
                typeof skill === "string" ? (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                  >
                    {skill}
                  </span>
                ) : (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                  >
                    {skill.title}:{" "}
                    {skill.badges
                      ?.map((b) => `${b.name}${b.level ? ` (${b.level})` : ""}`)
                      .join(", ")}
                  </span>
                )
              )}
            </div>
            <div className="border-t-2 border-indigo-300 my-4"></div>
          </section>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-wider text-indigo-600 flex items-center gap-2">
              <FaBriefcase /> Experience
            </h2>
            {profile.experience.map((exp, idx) => (
              <div key={idx} className={idx !== 0 ? "mt-4" : ""}>
                <p className="font-medium text-xs text-gray-800">
                  {exp.position || exp.title}, {exp.location || exp.company}
                </p>
                <p className="text-xs text-gray-600">
                  {exp.company} | {exp.startDate || exp.duration} -{" "}
                  {exp.endDate || "Present"}
                </p>
                <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                  {exp.description ? (
                    <li>{exp.description}</li>
                  ) : (
                    exp.points?.map((d, i) => <li key={i}>{d}</li>)
                  )}
                </ul>
              </div>
            ))}
            <div className="border-t-2 border-indigo-300 my-4"></div>
          </section>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-wider text-indigo-600 flex items-center gap-2">
              <FaGraduationCap /> Education
            </h2>
            {profile.education.map((edu, idx) => (
              <div key={idx} className={idx !== 0 ? "mt-4" : ""}>
                <p className="font-medium text-xs text-gray-800">
                  {edu.degree}
                </p>
                <p className="text-xs text-gray-600">
                  {edu.institution} |{" "}
                  {edu.year || `${edu.startDate} - ${edu.endDate}`}
                </p>
                {edu.description && (
                  <p className="text-xs text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
            <div className="border-t-2 border-indigo-300 my-4"></div>
          </section>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-wider text-indigo-600 flex items-center gap-2">
              <FaProjectDiagram /> Projects
            </h2>
            {profile.projects.map((proj, idx) => (
              <div key={idx} className={idx !== 0 ? "mt-4" : ""}>
                <p className="font-medium text-xs text-indigo-700">
                  {proj.name}
                </p>
                <p className="text-xs text-gray-700">{proj.description}</p>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-600 underline"
                  >
                    {proj.url.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {proj.points?.length > 0 && (
                  <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                    {proj.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {profile.certifications?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-wider text-indigo-600 flex items-center gap-2">
              <FaCertificate /> Certifications
            </h2>
            {profile.certifications.map((cert, idx) => (
              <div key={idx} className={idx !== 0 ? "mt-4" : ""}>
                <p className="font-medium text-xs text-gray-800">
                  {cert.certificationName || cert.name}
                </p>
                <p className="text-xs text-gray-600">
                  {cert.issuingOrganization || cert.issuer} |{" "}
                  {cert.dateEarned || cert.year}
                </p>
                {cert.notes && (
                  <p className="text-xs text-gray-700">{cert.notes}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Interests */}
        {profile.interests?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-wider text-indigo-600 flex items-center gap-2">
              <FaHeart /> Interests
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.interests.map((i, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                >
                  {i.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Template9;
