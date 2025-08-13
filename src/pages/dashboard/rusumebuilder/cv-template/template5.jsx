import React, { useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "../download-resume/template5";
export default function Template5({ data = {} }) {
  const resumeRef = useRef();
  const profile = data.user_profile || {};
  const NA = () => <span className="italic text-gray-400">N/A</span>;

  return (
    <>
      {/* Download + Print Buttons */}
      <div className="flex gap-4 justify-center mb-8">
        <PDFDownloadLink
          document={<ResumeDocument data={data} />}
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
          className="px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
        >
          Print
        </button>
      </div>

      {/* Resume Content */}
      <div
        ref={resumeRef}
        className="bg-white text-gray-900 p-10 max-w-6xl mx-auto shadow-xl rounded-lg font-sans h-[90vh] overflow-y-auto print:h-auto print:overflow-visible print:shadow-none"
      >
        {/* Header */}
        <header className="border-b-4 border-blue-600 pb-6 mb-8">
          <h1 className="text-5xl font-extrabold tracking-wide mb-1">
            {profile.full_name || <NA />}
          </h1>
          <h2 className="text-xl text-gray-700 font-semibold mb-2">
            {profile.job_title || <NA />}
          </h2>
          <p className="text-gray-600 text-sm space-x-4 flex flex-wrap gap-4">
            <span>{profile.email || <NA />}</span>
            <span>{profile.phone || <NA />}</span>
            <span>{profile.website || <NA />}</span>
            <span>{profile.address || <NA />}</span>
          </p>
        </header>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
          {/* Left Column - Narrow */}
          <aside className="space-y-8 text-gray-700">
            {/* Skills */}
            <section>
              <h3 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3 text-blue-700">
                Skills
              </h3>
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-semibold text-gray-900">
                      {skill.title || <NA />}
                    </p>
                    {skill.description && (
                      <p className="mb-1">{skill.description}</p>
                    )}
                    {skill.badges?.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {skill.badges.map((badge, idx) => (
                          <li
                            key={idx}
                            className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold"
                          >
                            {badge.name} ({badge.level})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <NA />
                    )}
                  </div>
                ))
              ) : (
                <NA />
              )}
            </section>

            {/* Social Links */}
            <section>
              <h3 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3 text-blue-700">
                Social Links
              </h3>
              {profile.social_links ? (
                <ul className="space-y-2">
                  {["github", "twitter", "website", "linkedin"].map((key) => (
                    <li key={key}>
                      <span className="capitalize">{key}:</span>{" "}
                      {profile.social_links[key] ? (
                        <a
                          href={profile.social_links[key]}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline break-words"
                        >
                          {profile.social_links[key]}
                        </a>
                      ) : (
                        <NA />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <NA />
              )}
            </section>

            {/* Interests */}
            <section>
              <h3 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3 text-blue-700">
                Interests
              </h3>
              {profile.interests?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {profile.interests.map((int, i) => (
                    <li key={i}>{int.name || <NA />}</li>
                  ))}
                </ul>
              ) : (
                <NA />
              )}
            </section>
          </aside>

          {/* Right Column - Wide */}
          <main className="space-y-10 text-gray-800">
            {/* Summary */}
            <section>
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4 text-blue-700">
                Summary
              </h3>
              <p className="leading-relaxed">
                {profile.summary?.profile || <NA />}
              </p>
            </section>

            {/* Experience */}
            <section>
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4 text-blue-700">
                Experience
              </h3>
              {profile.experience?.length > 0 ? (
                profile.experience.map((exp, i) => (
                  <div key={i} className="mb-6">
                    <p className="font-bold text-lg text-gray-900">
                      {exp.title || <NA />}
                    </p>
                    <p className="italic text-gray-700">
                      {exp.company || <NA />}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      {exp.startDate || <NA />} - {exp.endDate || <NA />} |{" "}
                      {exp.location || <NA />}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.jobType || <NA />}
                    </p>
                    <p className="mb-2 font-medium">
                      {exp.technologies || <NA />}
                    </p>
                    {exp.points?.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {exp.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <NA />
                    )}
                  </div>
                ))
              ) : (
                <NA />
              )}
            </section>

            {/* Education */}
            <section>
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4 text-blue-700">
                Education
              </h3>
              {profile.education?.length > 0 ? (
                profile.education.map((edu, i) => (
                  <div key={i} className="mb-6">
                    <p className="font-bold text-lg text-gray-900">
                      {edu.degree || <NA />}
                    </p>
                    <p className="italic text-gray-700">
                      {edu.institution || <NA />}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      {edu.startDate || <NA />} - {edu.endDate || <NA />} |{" "}
                      {edu.location || <NA />}
                    </p>
                    <p>{edu.description || <NA />}</p>
                  </div>
                ))
              ) : (
                <NA />
              )}
            </section>

            {/* Projects */}
            <section>
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4 text-blue-700">
                Projects
              </h3>
              {profile.projects?.length > 0 ? (
                profile.projects.map((proj, i) => (
                  <div key={i} className="mb-6">
                    <p className="font-bold text-lg text-gray-900">
                      {proj.name || <NA />}
                    </p>
                    <p className="mb-1">{proj.description || <NA />}</p>
                    <p className="mb-2 text-blue-600 underline break-words">
                      {proj.url ? (
                        <a href={proj.url} target="_blank" rel="noreferrer">
                          {proj.url}
                        </a>
                      ) : (
                        <NA />
                      )}
                    </p>
                    {proj.points?.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {proj.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <NA />
                    )}
                  </div>
                ))
              ) : (
                <NA />
              )}
            </section>

            {/* Certifications */}
            <section>
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4 text-blue-700">
                Certifications
              </h3>
              {profile.certifications?.length > 0 ? (
                profile.certifications.map((cert, i) => (
                  <div key={i} className="mb-5">
                    <p className="font-semibold text-gray-900">
                      {cert.certificationName || <NA />}
                    </p>
                    <p className="italic text-gray-700">
                      {cert.issuingOrganization || <NA />}
                    </p>
                    <p className="text-sm text-gray-500">
                      Earned: {cert.dateEarned || <NA />}, Expires:{" "}
                      {cert.expirationDate || <NA />}
                    </p>
                    <p className="text-sm text-gray-500">
                      ID: {cert.credentialId || <NA />}
                    </p>
                    <p className="text-sm text-blue-600 underline break-words">
                      {cert.certificationURL ? (
                        <a
                          href={cert.certificationURL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {cert.certificationURL}
                        </a>
                      ) : (
                        <NA />
                      )}
                    </p>
                    <p>{cert.notes || <NA />}</p>
                  </div>
                ))
              ) : (
                <NA />
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
