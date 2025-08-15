import React from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import Template2PDF from "../download-resume/template2pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ACCENT_COLOR = "#1E40AF"; // deep blue

const Template2 = ({ data }) => {
  if (!data?.user_profile) return <p>No profile data available</p>;

  const profile = data.user_profile;
  console.log({ profile });
  return (
    <>
      {/* Download + Print Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <PDFDownloadLink
          document={<Template2PDF data={data} />}
          fileName="resume.pdf"
          style={{
            textDecoration: "none",
            padding: "10px 20px",
            color: "#fff",
            backgroundColor: "#4a90e2",
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
      </div>{" "}
      <div
        className="max-w-[794px] mx-auto bg-white p-8 font-sans text-[#2c2c2c] shadow-2xl"
        style={{ minHeight: "1123px" }}
      >
        {/* HEADER */}
        <header className="mb-8 border-b" style={{ borderColor: "#CBD5E1" }}>
          <h1
            className="text-5xl font-extrabold tracking-wide leading-tight"
            style={{ color: ACCENT_COLOR }}
          >
            {profile.full_name}
          </h1>
          <p
            className="text-xl mt-1 mb-4 font-semibold"
            style={{ color: "#334155" }}
          >
            {profile.job_title || "Professional Title"}
          </p>

          {/* Contact Row */}
          <div
            className="flex flex-wrap gap-6 text-sm items-center"
            style={{ color: "#475569" }}
          >
            {profile.phone && (
              <div className="flex items-center gap-2">
                <FaPhoneAlt style={{ color: ACCENT_COLOR }} />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.email && (
              <div className="flex items-center gap-2">
                <FaEnvelope style={{ color: ACCENT_COLOR }} />
                <span>{profile.email}</span>
              </div>
            )}
            {profile.address && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt style={{ color: ACCENT_COLOR }} />
                <span>{profile.address}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-2">
                <FaGlobe style={{ color: ACCENT_COLOR }} />
                <a
                  href={
                    profile.website.startsWith("http")
                      ? profile.website
                      : "https://" + profile.website
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-blue-700"
                  style={{ color: ACCENT_COLOR }}
                >
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            {profile.social_links?.linkedin && (
              <div className="flex items-center gap-2">
                <FaLinkedin style={{ color: ACCENT_COLOR }} />
                <a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-blue-700"
                  style={{ color: ACCENT_COLOR }}
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </header>

        <div className="flex justify-between gap-5 mt-6">
          {/* Left Column */}
          <div className="w-[40%] space-y-6">
            {/* ABOUT */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold"
                style={{
                  color: ACCENT_COLOR,
                  backgroundColor: "#E0E7FF",
                  paddingLeft: "8px",
                  borderRadius: "4px",
                }}
              >
                ABOUT
              </h2>
              <p
                className="text-xs leading-[18px]"
                style={{ color: "#374151" }}
              >
                {profile.summary?.profile}
              </p>
            </div>

            {/* CONTACT */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold"
                style={{
                  color: ACCENT_COLOR,
                  backgroundColor: "#E0E7FF",
                  paddingLeft: "8px",
                  borderRadius: "4px",
                }}
              >
                CONTACT
              </h2>
              <div className="space-y-3 text-xs" style={{ color: "#475569" }}>
                {profile.phone && (
                  <p className="flex items-center gap-2 leading-[18px]">
                    <FaPhoneAlt
                      className="text-[12px]"
                      style={{ color: ACCENT_COLOR }}
                    />
                    {profile.phone}
                  </p>
                )}
                {profile.address && (
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt
                      className="text-[12px]"
                      style={{ color: ACCENT_COLOR }}
                    />
                    {profile.address}
                  </p>
                )}
                {profile.email && (
                  <p className="flex items-center gap-2">
                    <FaEnvelope
                      className="text-[12px]"
                      style={{ color: ACCENT_COLOR }}
                    />
                    {profile.email}
                  </p>
                )}
                {profile.social_links?.linkedin && (
                  <p className="flex items-center gap-2">
                    <FaLinkedin
                      className="text-[12px]"
                      style={{ color: ACCENT_COLOR }}
                    />
                    <a
                      href={profile.social_links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                      style={{ color: ACCENT_COLOR }}
                    >
                      linkedin.com/in/{profile.full_name.replace(/\s+/g, "-")}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold"
                style={{
                  color: ACCENT_COLOR,
                  backgroundColor: "#E0E7FF",
                  paddingLeft: "8px",
                  borderRadius: "4px",
                }}
              >
                EDUCATION
              </h2>
              {profile.education?.map((edu, idx) => (
                <div key={idx} className={idx !== 0 ? "mt-4" : ""}>
                  <p
                    className="font-medium leading-[18px] text-xs"
                    style={{ color: "#1e293b" }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className="text-xs leading-[18px] font-medium flex justify-between items-center"
                    style={{ color: "#334155" }}
                  >
                    {edu.degree}
                  </p>
                  <p
                    className="text-xs leading-[18px]"
                    style={{ color: "#475569" }}
                  >
                    {edu.startDate} – {edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="text-xs mt-1" style={{ color: "#334155" }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-[1px]" style={{ backgroundColor: "#CBD5E1" }}></div>

          {/* Right Column */}
          <div className="w-[60%] space-y-6">
            {/* EXPERIENCE */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold"
                style={{
                  color: ACCENT_COLOR,
                  backgroundColor: "#E0E7FF",
                  paddingLeft: "8px",
                  borderRadius: "4px",
                }}
              >
                EXPERIENCE
              </h2>
              {profile.experience?.map((exp, idx) => (
                <div key={idx} className={idx !== 0 ? "mt-4" : ""}>
                  <p
                    className="font-medium leading-[18px] text-xs"
                    style={{ color: "#1e293b" }}
                  >
                    {exp.title}
                  </p>
                  <p
                    className="text-xs leading-[18px] font-medium flex justify-between items-center"
                    style={{ color: "#334155" }}
                  >
                    {exp.company}, {exp.location}
                    <span>
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </p>
                  <p
                    className="text-xs leading-[20px] mt-2"
                    style={{ color: "#475569" }}
                  >
                    {exp.points?.join(". ") + "."}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-b" style={{ borderColor: "#CBD5E1" }}></div>

            {/* PROJECTS */}
            {profile.projects?.length > 0 && (
              <div>
                <h2
                  className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold"
                  style={{
                    color: ACCENT_COLOR,
                    backgroundColor: "#E0E7FF",
                    paddingLeft: "8px",
                    borderRadius: "4px",
                  }}
                >
                  PROJECTS
                </h2>
                {profile.projects.map((project, idx) => (
                  <div key={idx} className={idx !== 0 ? "mt-4" : ""}>
                    <p
                      className="font-medium leading-[18px] text-xs"
                      style={{ color: "#1e293b" }}
                    >
                      <a
                        href={
                          project.url.startsWith("http")
                            ? project.url
                            : "https://" + project.url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-blue-800"
                        style={{ color: ACCENT_COLOR }}
                      >
                        {project.name}
                      </a>
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#334155" }}>
                      {project.description}
                    </p>
                    {project.points?.length > 0 && (
                      <ul
                        className="list-disc list-inside text-xs mt-1"
                        style={{ color: "#475569" }}
                      >
                        {project.points.map((point, i) => (
                          <li key={i}>{point.replace(/^-/, "").trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="border-b" style={{ borderColor: "#CBD5E1" }}></div>

            {/* TRAINING (Certifications) */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold"
                style={{
                  color: ACCENT_COLOR,
                  backgroundColor: "#E0E7FF",
                  paddingLeft: "8px",
                  borderRadius: "4px",
                }}
              >
                TRAINING
              </h2>
              {profile.certifications?.map((cert, idx) => (
                <div key={idx} className={idx !== 0 ? "mt-4" : ""}>
                  <p
                    className="font-medium leading-[18px] text-xs"
                    style={{ color: "#1e293b" }}
                  >
                    {cert.certificationName}
                  </p>
                  <p
                    className="text-xs leading-[18px] font-medium flex justify-between items-center"
                    style={{ color: "#334155" }}
                  >
                    {cert.issuingOrganization}
                    <span>{cert.dateEarned}</span>
                  </p>
                  {cert.notes && (
                    <p
                      className="text-xs leading-[20px]"
                      style={{ color: "#475569" }}
                    >
                      {cert.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="border-b" style={{ borderColor: "#CBD5E1" }}></div>

            {/* SKILL */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold"
                style={{
                  color: ACCENT_COLOR,
                  backgroundColor: "#E0E7FF",
                  paddingLeft: "8px",
                  borderRadius: "4px",
                }}
              >
                SKILL
              </h2>

              {profile.skills?.length > 0 ? (
                <div
                  className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2"
                  style={{ color: "#475569" }}
                >
                  {profile.skills.map((skill, idx) => {
                    // Case 1: Simple string
                    if (typeof skill === "string") {
                      return (
                        <div key={idx} className="flex">
                          <span className="mr-1">•</span>
                          <span>{skill}</span>
                        </div>
                      );
                    }

                    // Case 2: Object with title & badges
                    return (
                      <div key={idx} className="flex">
                        <span className="mr-1">•</span>
                        <span>
                          <strong>{skill.title}:</strong>{" "}
                          {skill.badges
                            ?.map(
                              (b) =>
                                `${b.name}${b.level ? ` (${b.level})` : ""}`
                            )
                            .join(", ")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No skills added</p>
              )}
            </div>

            <div className="border-b" style={{ borderColor: "#CBD5E1" }}></div>

            {/* INTEREST */}
            <div>
              <h2
                className="text-sm tracking-[2px] pb-3 leading-[24px] font-semibold"
                style={{
                  color: ACCENT_COLOR,
                  backgroundColor: "#E0E7FF",
                  paddingLeft: "8px",
                  borderRadius: "4px",
                }}
              >
                INTERESTS
              </h2>
              <ul
                className="text-xs space-y-1 list-disc list-inside"
                style={{ color: "#475569" }}
              >
                {profile.interests?.map((interest, idx) => (
                  <li key={idx}>{interest.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template2;
