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
import Template8PDF from "../download-resume/template8pdf";

const ACCENT_COLOR = "#4F46E5"; // Indigo
const GRADIENT_HEADER =
  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500";

const Template8 = ({ data }) => {
  if (!data?.user_profile) return <p>No profile data available</p>;
  const profile = data.user_profile;

  const sectionIcon = {
    about: <FaUser className="inline mr-2" />,
    experience: <FaBriefcase className="inline mr-2" />,
    education: <FaGraduationCap className="inline mr-2" />,
    projects: <FaProjectDiagram className="inline mr-2" />,
    training: <FaCertificate className="inline mr-2" />,
    skills: <FaStar className="inline mr-2" />,
    interests: <FaHeart className="inline mr-2" />,
    contact: <FaEnvelope className="inline mr-2" />,
  };

  const divider = (
    <div className="border-t-2 border-gradient-to-r border-indigo-300 my-4"></div>
  );

  return (
    <>
      {/* Download + Print */}
      <div className="flex gap-4 justify-center mb-6">
        <PDFDownloadLink
          document={<Template8PDF data={data} />}
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
        {/* <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Print
        </button> */}
      </div>

      <div
        className="max-w-[794px] mx-auto bg-white p-8 font-sans text-[#2c2c2c] shadow-2xl"
        style={{ minHeight: "1123px" }}
      >
        {/* HEADER */}
        <header
          className={`${GRADIENT_HEADER} p-6 rounded-b-lg text-white mb-8`}
        >
          <h1 className="text-5xl font-extrabold tracking-wide">
            {profile.full_name}
          </h1>
          <p className="text-xl mt-1 font-semibold">
            {profile.job_title || "Professional Title"}
          </p>

          {/* Contact Row */}
          <div className="flex flex-wrap gap-6 text-sm mt-3">
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

        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT COLUMN */}
          <div className="w-full md:w-[40%] space-y-6">
            {/* ABOUT */}
            {profile.summary?.profile && (
              <div>
                <h2
                  className="text-sm font-semibold tracking-wider pb-2 flex items-center"
                  style={{ color: ACCENT_COLOR }}
                >
                  {sectionIcon.about}ABOUT
                </h2>
                <p className="text-xs text-gray-700">
                  {profile.summary.profile}
                </p>
                {divider}
              </div>
            )}

            {/* CONTACT */}
            <div>
              <h2
                className="text-sm font-semibold tracking-wider pb-2 flex items-center"
                style={{ color: ACCENT_COLOR }}
              >
                {sectionIcon.contact}CONTACT
              </h2>
              <div className="space-y-2 text-xs text-gray-600">
                {profile.phone && (
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt />
                    {profile.phone}
                  </p>
                )}
                {profile.email && (
                  <p className="flex items-center gap-2">
                    <FaEnvelope />
                    {profile.email}
                  </p>
                )}
                {profile.address && (
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    {profile.address}
                  </p>
                )}
                {profile.website && (
                  <p className="flex items-center gap-2">
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
                  </p>
                )}
              </div>
              {divider}
            </div>

            {/* EDUCATION */}
            {profile.education?.length > 0 && (
              <div>
                <h2
                  className="text-sm font-semibold tracking-wider pb-2 flex items-center"
                  style={{ color: ACCENT_COLOR }}
                >
                  {sectionIcon.education}EDUCATION
                </h2>
                {profile.education.map((edu, idx) => (
                  <div key={idx} className={idx !== 0 ? "mt-3" : ""}>
                    <p className="font-medium text-xs text-gray-800">
                      {edu.institution}
                    </p>
                    <p className="text-xs font-medium text-gray-600 flex justify-between">
                      {edu.degree}
                      <span>
                        {edu.startDate} – {edu.endDate}
                      </span>
                    </p>
                    {edu.description && (
                      <p className="text-xs text-gray-700">{edu.description}</p>
                    )}
                  </div>
                ))}
                {divider}
              </div>
            )}

            {/* SKILLS */}
            {profile.skills?.length > 0 && (
              <div>
                <h2
                  className="text-sm font-semibold tracking-wider pb-2 flex items-center"
                  style={{ color: ACCENT_COLOR }}
                >
                  {sectionIcon.skills}SKILLS
                </h2>
                <div className="text-xs grid grid-cols-1 gap-1">
                  {profile.skills.map((skill, idx) => (
                    <p key={idx} className="flex items-center gap-1">
                      <span className="text-indigo-400">•</span>
                      {typeof skill === "string" ? (
                        skill
                      ) : (
                        <>
                          <strong>{skill.title}:</strong>{" "}
                          {skill.badges
                            ?.map(
                              (b) =>
                                `${b.name}${b.level ? ` (${b.level})` : ""}`
                            )
                            .join(", ")}
                        </>
                      )}
                    </p>
                  ))}
                </div>
                {divider}
              </div>
            )}

            {/* INTERESTS */}
            {profile.interests?.length > 0 && (
              <div>
                <h2
                  className="text-sm font-semibold tracking-wider pb-2 flex items-center"
                  style={{ color: ACCENT_COLOR }}
                >
                  {sectionIcon.interests}INTERESTS
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((i, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                    >
                      {i.name}
                    </span>
                  ))}
                </div>
                {divider}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full md:w-[60%] space-y-6">
            {/* EXPERIENCE */}
            {profile.experience?.length > 0 && (
              <div>
                <h2
                  className="text-sm font-semibold tracking-wider pb-2 flex items-center"
                  style={{ color: ACCENT_COLOR }}
                >
                  {sectionIcon.experience}EXPERIENCE
                </h2>
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className={idx !== 0 ? "mt-3" : ""}>
                    <p className="font-medium text-xs text-gray-800">
                      {exp.title}
                    </p>
                    <p className="text-xs font-medium text-gray-600 flex justify-between">
                      {exp.company}, {exp.location}
                      <span>
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </p>
                    {exp.points && (
                      <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                        {exp.points.map((p, i) => (
                          <li key={i}>{p.replace(/^-/, "").trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {divider}
              </div>
            )}

            {/* PROJECTS */}
            {profile.projects?.length > 0 && (
              <div>
                <h2
                  className="text-sm font-semibold tracking-wider pb-2 flex items-center"
                  style={{ color: ACCENT_COLOR }}
                >
                  {sectionIcon.projects}PROJECTS
                </h2>
                {profile.projects.map((proj, idx) => (
                  <div key={idx} className={idx !== 0 ? "mt-3" : ""}>
                    <p className="font-medium text-xs text-indigo-700">
                      <a
                        href={
                          proj.url.startsWith("http")
                            ? proj.url
                            : "https://" + proj.url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {proj.name}
                      </a>
                    </p>
                    <p className="text-xs text-gray-700">{proj.description}</p>
                    {proj.points?.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        {proj.points.map((p, i) => (
                          <li key={i}>{p.replace(/^-/, "").trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {divider}
              </div>
            )}

            {/* TRAINING */}
            {profile.certifications?.length > 0 && (
              <div>
                <h2
                  className="text-sm font-semibold tracking-wider pb-2 flex items-center"
                  style={{ color: ACCENT_COLOR }}
                >
                  {sectionIcon.training}CERTIFICATIONS
                </h2>
                {profile.certifications.map((cert, idx) => (
                  <div key={idx} className={idx !== 0 ? "mt-3" : ""}>
                    <p className="font-medium text-xs text-gray-800">
                      {cert.certificationName}
                    </p>
                    <p className="text-xs font-medium text-gray-600 flex justify-between">
                      {cert.issuingOrganization}
                      <span>{cert.dateEarned}</span>
                    </p>
                    {cert.notes && (
                      <p className="text-xs text-gray-700">{cert.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Template8;
