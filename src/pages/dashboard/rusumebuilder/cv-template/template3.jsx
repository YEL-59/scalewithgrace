import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useRef } from "react";
import Template3pdf from "../download-resume/template3pdf";

const Template3 = ({ data }) => {
  const resumeRef = useRef();

  if (!data || !data.user_profile)
    return <p className="p-6 text-red-500">No data provided.</p>;

  const {
    full_name = "",
    email = "",
    phone = "",
    website = "",
    address = "",
    city = "",
    state = "",
    summary = {},
    education = [],
    experience = [],
    skills = [],
    certifications = [],
    projects = [],
    social_links = {},
    interests = [],
    job_title = "",
  } = data.user_profile;

  // Split full_name into first and last names
  const [firstName, ...lastNameParts] = full_name.trim().split(" ");
  const lastName = lastNameParts.join(" ");

  // Summary text from nested profile
  const summaryText = summary.profile || "";

  const NA = () => <span className="italic text-gray-400">N/A</span>;

  // Helper to ensure URL has http/https prefix
  const formatUrl = (url) =>
    url && !url.startsWith("http") ? `https://${url}` : url;

  return (
    <div className="w-full py-6">
      {/* Download + Print Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <PDFDownloadLink
          document={<Template3pdf data={data} />}
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

        {/* <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Print
        </button> */}
      </div>{" "}
      <div
        ref={resumeRef}
        className="grid grid-cols-4 gap-4 max-w-4xl mx-auto border border-gray-200 shadow"
      >
        {/* Left Sidebar */}
        <div className="bg-gray-100 p-6 col-span-1">
          {/* Contact Info */}
          {(email || phone || address || city || state || website) && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Contact
              </h3>
              {email ? <p className="text-xs mb-1">{email}</p> : <NA />}
              {phone ? <p className="text-xs mb-1">{phone}</p> : <NA />}
              {website ? (
                <p className="text-xs mb-1 break-words">
                  <a
                    href={formatUrl(website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {website}
                  </a>
                </p>
              ) : (
                <NA />
              )}
              {address || city || state ? (
                <p className="text-xs">
                  {[address, city, state].filter(Boolean).join(", ")}
                </p>
              ) : (
                <NA />
              )}
            </div>
          )}

          {/* Skills */}
          {Array.isArray(skills) && skills.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Skills
              </h3>
              {skills.map((group, idx) => {
                const title =
                  typeof group?.title === "string" ? group.title : "";
                const badges = Array.isArray(group?.badges) ? group.badges : [];
                if (!title && badges.length === 0) return null;
                return (
                  <div key={idx} className="mb-2">
                    {title && <p className="text-xs font-semibold">{title}</p>}
                    {badges.length > 0 && (
                      <ul className="text-xs list-disc ml-5">
                        {badges.map((badge, i) => (
                          <li key={i}>
                            {badge.name} {badge.level && `— ${badge.level}`}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <NA />
          )}

          {/* Certifications */}
          {Array.isArray(certifications) && certifications.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Certifications
              </h3>
              {certifications.map((cert, idx) => (
                <div key={idx} className="mb-2 text-xs">
                  <p className="font-semibold">
                    {cert.certificationName || <NA />}
                  </p>
                  <p>{cert.issuingOrganization || <NA />}</p>
                  <p>
                    Earned: {cert.dateEarned || <NA />}{" "}
                    {cert.expirationDate && `• Expires: ${cert.expirationDate}`}
                  </p>
                  {cert.credentialId && <p>ID: {cert.credentialId}</p>}
                  {cert.certificationURL && (
                    <a
                      href={formatUrl(cert.certificationURL)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Credential
                    </a>
                  )}
                  {cert.notes && <p>{cert.notes}</p>}
                </div>
              ))}
            </div>
          ) : (
            <NA />
          )}

          {/* Social Links */}
          {social_links && Object.values(social_links).some(Boolean) ? (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Social Links
              </h3>
              <div className="flex flex-col space-y-2 text-xs">
                {Object.entries(social_links).map(
                  ([key, value]) =>
                    value && (
                      <a
                        key={key}
                        href={formatUrl(value)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline capitalize break-words"
                      >
                        {key}
                      </a>
                    )
                )}
              </div>
            </div>
          ) : (
            <NA />
          )}

          {/* Interests */}
          {Array.isArray(interests) && interests.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {interests.map((int, i) => (
                  <span
                    key={i}
                    className="bg-indigo-200 text-indigo-900 px-2 py-1 rounded-full"
                  >
                    {int.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <NA />
          )}
        </div>

        {/* Main Section */}
        <div
          className="bg-white p-6 col-span-3  print:max-h-full"
          style={{ minHeight: "1123px" }}
        >
          {/* Name and Title */}
          {(firstName || lastName) && (
            <h1 className="text-[32px] font-light tracking-[7px] text-[#484848]">
              {firstName?.toUpperCase()}{" "}
              <span className="font-semibold">{lastName?.toUpperCase()}</span>
            </h1>
          )}
          {job_title && (
            <p className="tracking-[3px] text-[#484848] uppercase leading-[24px] text-center py-2 border-b mb-4 border-[#D9D9D9]">
              {job_title}
            </p>
          )}

          {/* Summary */}
          {summaryText ? (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Summary
              </h3>
              <p className="text-sm text-gray-800 whitespace-pre-line">
                {summaryText}
              </p>
            </div>
          ) : (
            <NA />
          )}

          {/* Experience */}
          {Array.isArray(experience) && experience.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Experience
              </h3>
              {experience.map((exp, idx) => {
                if (!exp?.title && !exp?.company) return null;
                return (
                  <div key={idx} className="mb-4">
                    {exp?.title ? (
                      <p className="font-medium text-sm">{exp.title}</p>
                    ) : (
                      <NA />
                    )}
                    {exp?.company || exp?.startDate || exp?.endDate ? (
                      <p className="text-sm text-gray-600 flex justify-between">
                        {exp?.company}
                        <span>
                          {[exp?.startDate, exp?.endDate]
                            .filter(Boolean)
                            .join(" – ")}
                        </span>
                      </p>
                    ) : (
                      <NA />
                    )}
                    {exp?.location ? (
                      <p className="text-sm text-gray-600">{exp.location}</p>
                    ) : (
                      <NA />
                    )}
                    {Array.isArray(exp?.points) && exp.points.length > 0 ? (
                      <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
                        {exp.points
                          .filter((point) => typeof point === "string")
                          .map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                      </ul>
                    ) : (
                      <NA />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <NA />
          )}

          {/* Education */}
          {Array.isArray(education) && education.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Education
              </h3>
              {education.map((edu, idx) => {
                if (!edu?.degree && !edu?.institution) return null;
                return (
                  <div key={idx} className="mb-4">
                    {edu?.degree ? (
                      <p className="font-medium text-sm">{edu.degree}</p>
                    ) : (
                      <NA />
                    )}
                    {edu?.institution || edu?.startDate || edu?.endDate ? (
                      <p className="text-sm text-gray-600 flex justify-between">
                        {edu?.institution}
                        <span>
                          {[edu?.startDate, edu?.endDate]
                            .filter(Boolean)
                            .join(" – ")}
                        </span>
                      </p>
                    ) : (
                      <NA />
                    )}
                    {edu?.location ? (
                      <p className="text-sm text-gray-600">{edu.location}</p>
                    ) : (
                      <NA />
                    )}
                    {edu?.description ? (
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {edu.description}
                      </p>
                    ) : (
                      <NA />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <NA />
          )}

          {/* Projects */}
          {Array.isArray(projects) && projects.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-1 mb-2">
                Projects
              </h3>
              {projects.map((proj, idx) => (
                <div key={idx} className="mb-4">
                  {proj.name ? (
                    <p className="font-medium text-sm">{proj.name}</p>
                  ) : (
                    <NA />
                  )}
                  {proj.url ? (
                    <a
                      href={formatUrl(proj.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs"
                    >
                      {proj.url}
                    </a>
                  ) : (
                    <NA />
                  )}
                  {proj.description ? (
                    <p className="text-sm text-gray-700 whitespace-pre-line mt-1">
                      {proj.description}
                    </p>
                  ) : (
                    <NA />
                  )}
                  {Array.isArray(proj.points) && proj.points.length > 0 ? (
                    <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
                      {proj.points
                        .filter((point) => typeof point === "string")
                        .map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                    </ul>
                  ) : (
                    <NA />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <NA />
          )}
        </div>
      </div>
    </div>
  );
};

export default Template3;
