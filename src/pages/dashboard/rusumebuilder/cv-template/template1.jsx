import React, { useRef } from "react";

export default function Template1({ data }) {
  const resumeRef = useRef();

  if (!data || Object.keys(data).length === 0)
    return <p className="p-6 text-red-500">No data provided.</p>;

  const {
    firstName,
    lastName,
    email,
    phone,
    website,
    address,
    city,
    state,
    summary,
    education,
    experiences,
    certifications,
    skills,
    projects,
    interests,
    social_links,
    profession,
  } = data;

  return (
    <div
      ref={resumeRef}
      className="bg-white text-gray-900 p-8 max-w-4xl mx-auto shadow-lg rounded-lg font-sans"
    >
      {/* HEADER */}
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold">
          {firstName} {lastName}
        </h1>
        <p className="text-lg text-gray-700">{profession || "Professional"}</p>
        <div className="text-sm text-gray-600 mt-2 space-x-4">
          {email && <span>{email}</span>}
          {phone && <span>• {phone}</span>}
          {website && (
            <span>
              •{" "}
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {website}
              </a>
            </span>
          )}
          {address && <span>• {address}</span>}
          {(city || state) && (
            <span>• {[city, state].filter(Boolean).join(", ")}</span>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 whitespace-pre-line">{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experiences?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Experience
          </h2>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <h3 className="font-bold">{exp.title}</h3>
              <p className="text-sm text-gray-600">
                {exp.company} • {exp.location}{" "}
                {exp.jobType && `(${exp.jobType})`}
              </p>
              <p className="text-xs text-gray-500">
                {exp.startDate} - {exp.endDate}
              </p>
              {exp.points?.length > 0 && (
                <ul className="list-disc ml-5 text-gray-700 mt-1">
                  {exp.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              )}
              {exp.technologies && (
                <p className="text-sm text-gray-600 mt-1">
                  Tech: {exp.technologies}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-bold">
                {edu.degree} — {edu.institution}
              </h3>
              <p className="text-sm text-gray-600">{edu.location}</p>
              <p className="text-xs text-gray-500">
                {edu.startDate} - {edu.endDate}
              </p>
              {edu.description && (
                <p className="text-gray-700 whitespace-pre-line">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Certifications
          </h2>
          {certifications.map((cert, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-bold">{cert.certificationName}</h3>
              <p className="text-sm text-gray-600">
                {cert.issuingOrganization}
              </p>
              <p className="text-xs text-gray-500">
                Earned: {cert.dateEarned}{" "}
                {cert.expirationDate && `• Expires: ${cert.expirationDate}`}
              </p>
              {cert.credentialId && (
                <p className="text-sm">ID: {cert.credentialId}</p>
              )}
              {cert.certificationURL && (
                <a
                  href={cert.certificationURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Credential
                </a>
              )}
              {cert.notes && (
                <p className="text-gray-700 whitespace-pre-line">
                  {cert.notes}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Skills
          </h2>
          {skills.map((skill, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-bold">{skill.title}</h3>
              {skill.description && (
                <p className="text-gray-700 whitespace-pre-line">
                  {skill.description}
                </p>
              )}
              {skill.badges?.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-1">
                  {skill.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {badge.name} — {badge.level}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-bold">{proj.name}</h3>
              {proj.url && (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {proj.url}
                </a>
              )}
              <p className="text-gray-700 whitespace-pre-line">
                {proj.description}
              </p>
              {proj.points?.length > 0 && (
                <ul className="list-disc ml-5 text-gray-700 mt-1">
                  {proj.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* INTERESTS */}
      {interests?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((int, i) => (
              <span
                key={i}
                className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {int.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* SOCIAL LINKS */}
      {social_links && Object.keys(social_links).length > 0 && (
        <section className="mt-6 pt-4 border-t border-gray-300">
          <h2 className="text-xl font-semibold mb-2">Social Links</h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(social_links).map(
              ([key, value]) =>
                value && (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline capitalize"
                  >
                    {key}
                  </a>
                )
            )}
          </div>
        </section>
      )}
    </div>
  );
}
