import React from "react";

export default function Template5({ data }) {
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
    social_links = {},
    profession,
  } = data;

  // Map of social network names to icons (simple SVG)
  const socialIcons = {
    linkedin: (
      <svg
        className="w-5 h-5 mr-1"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M4.983 3.5C4.983 4.88071 3.88071 6 2.5 6C1.11929 6 0 4.88071 0 3.5C0 2.11929 1.11929 1 2.5 1C3.88071 1 4.983 2.11929 4.983 3.5ZM0 24V7H5V24H0ZM7 7H12V9H12.07C12.65 7.98 14.13 7 16.33 7C21.1 7 22 10.16 22 14.85V24H17V15.85C17 14.2 16.73 12.85 15.1 12.85C13.4 12.85 13.1 14.05 13.1 15.75V24H7V7Z" />
      </svg>
    ),
    github: (
      <svg
        className="w-5 h-5 mr-1"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0.297C5.37 0.297 0 5.667 0 12.297c0 5.289 3.438 9.778 8.205 11.365.6.111.82-.258.82-.577 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.419-1.304.763-1.604-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.47-2.381 1.236-3.22-.124-.304-.536-1.53.117-3.19 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.295-1.23 3.295-1.23.656 1.66.244 2.886.12 3.19.77.839 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.48 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.07 24 17.58 24 12.297 24 5.667 18.627.297 12 .297z" />
      </svg>
    ),
    twitter: (
      <svg
        className="w-5 h-5 mr-1"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M24 4.557a9.828 9.828 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.918 4.918 0 0 0-8.38 4.482C7.691 7.691 4.066 5.13 1.64 1.161a4.822 4.822 0 0 0-.666 2.475 4.922 4.922 0 0 0 2.188 4.096 4.904 4.904 0 0 1-2.229-.616v.06a4.916 4.916 0 0 0 3.946 4.814 4.996 4.996 0 0 1-2.224.085 4.919 4.919 0 0 0 4.588 3.417 9.867 9.867 0 0 1-6.102 2.104c-.397 0-.79-.023-1.175-.069a13.9 13.9 0 0 0 7.548 2.209c9.056 0 14.009-7.506 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" />
      </svg>
    ),
    website: (
      <svg
        className="w-5 h-5 mr-1"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm7.62 15.457h-2.06a9.8 9.8 0 0 1-2.217 4.534A9.1 9.1 0 0 0 19.62 15.457Zm-11.24 0H4.31a9.096 9.096 0 0 0 2.441 4.534 9.785 9.785 0 0 1-2.44-4.534Zm-2.08-2.63a7.8 7.8 0 0 1 1.915-5.312 7.986 7.986 0 0 0-3.577 5.312Zm2.217-6.68a9.8 9.8 0 0 1 6.68-2.76 9.8 9.8 0 0 1 6.68 2.76 9.691 9.691 0 0 0-6.68-2.737 9.7 9.7 0 0 0-6.68 2.737Zm8.25 1.61a7.84 7.84 0 0 1 1.914 5.312 7.844 7.844 0 0 0-3.577-5.312Zm2.081 2.63a7.79 7.79 0 0 1-2.44 4.534 7.791 7.791 0 0 0 2.44-4.534Zm-7.77 5.13a6.264 6.264 0 0 1-1.08-3.9 6.292 6.292 0 0 1 1.08-3.9 6.222 6.222 0 0 1 1.08 3.9 6.234 6.234 0 0 1-1.08 3.9Z" />
      </svg>
    ),
  };

  // Filter social links with non-empty values
  const filteredSocialLinks = Object.entries(social_links).filter(
    ([url]) => url && url.trim() !== ""
  );

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 p-6 print:p-0">
      <div
        className="bg-white w-[210mm] h-[297mm] max-w-full shadow-xl rounded-xl overflow-auto print:shadow-none print:rounded-none print:w-auto print:h-auto print:m-0 print:p-0"
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* HEADER */}
        <header className="border-b border-gray-300 p-10 text-center bg-indigo-50 print:bg-white">
          <h1 className="text-5xl font-bold text-indigo-900 tracking-tight">
            {firstName} {lastName}
          </h1>
          <p className="text-xl text-indigo-700 mt-1">
            {profession || "Professional"}
          </p>
          <div className="mt-3 text-sm text-indigo-600 space-x-4">
            {email && (
              <a
                href={`mailto:${email}`}
                className="hover:underline"
                title="Email"
              >
                {email}
              </a>
            )}
            {phone && <span>• {phone}</span>}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-all"
                title="Website"
              >
                {website}
              </a>
            )}
            {address && <span>• {address}</span>}
            {(city || state) && (
              <span>• {[city, state].filter(Boolean).join(", ")}</span>
            )}
          </div>
        </header>

        <main className="md:flex h-full p-10 print:p-0">
          {/* LEFT COL: TIMELINE EXPERIENCE */}
          <aside className="md:w-1/3 pr-8 border-r border-gray-300 space-y-12">
            <section>
              <h2 className="text-indigo-700 font-semibold text-xl mb-6 uppercase tracking-wide">
                Experience
              </h2>
              <div className="relative pl-8 before:absolute before:top-0 before:left-4 before:w-1 before:h-full before:bg-indigo-200">
                {experiences?.length > 0 ? (
                  experiences.map((exp, idx) => (
                    <div key={idx} className="relative mb-10 last:mb-0">
                      {/* Timeline Dot */}
                      <span className="absolute top-2 left-0 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-lg"></span>
                      <div>
                        <h3 className="text-lg font-bold text-indigo-900">
                          {exp.title}
                        </h3>
                        <p className="text-indigo-700 text-sm italic">
                          {exp.company} — {exp.location}
                          {exp.jobType ? ` (${exp.jobType})` : ""}
                        </p>
                        <p className="text-xs text-indigo-500 mt-1 mb-2">
                          {exp.startDate} - {exp.endDate}
                        </p>
                        {exp.points?.length > 0 && (
                          <ul className="list-disc ml-5 text-indigo-800 text-sm space-y-1">
                            {exp.points.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        )}
                        {exp.technologies && (
                          <p className="mt-2 text-indigo-600 text-xs">
                            <strong>Tech:</strong> {exp.technologies}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No experience listed
                  </p>
                )}
              </div>
            </section>

            {/* Skills */}
            {skills?.length > 0 && (
              <section>
                <h2 className="text-indigo-700 font-semibold text-xl mb-4 uppercase tracking-wide">
                  Skills
                </h2>
                {skills.map((skill, idx) => (
                  <div key={idx} className="mb-5">
                    <h3 className="font-semibold text-indigo-900">
                      {skill.title}
                    </h3>
                    {skill.description && (
                      <p className="text-indigo-700 text-sm whitespace-pre-line">
                        {skill.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {skill.badges?.map((badge, i) => (
                        <span
                          key={i}
                          className="bg-indigo-200 text-indigo-900 text-xs px-2 py-1 rounded-full"
                        >
                          {badge.name} — {badge.level}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
              <section>
                <h2 className="text-indigo-700 font-semibold text-xl mb-4 uppercase tracking-wide">
                  Certifications
                </h2>
                {certifications.map((cert, i) => (
                  <div key={i} className="mb-5">
                    <h3 className="font-semibold text-indigo-900">
                      {cert.certificationName}
                    </h3>
                    <p className="text-indigo-700 text-sm">
                      {cert.issuingOrganization}
                    </p>
                    <p className="text-xs text-indigo-500">
                      Earned: {cert.dateEarned}{" "}
                      {cert.expirationDate &&
                        `• Expires: ${cert.expirationDate}`}
                    </p>
                    {cert.credentialId && (
                      <p className="text-xs">ID: {cert.credentialId}</p>
                    )}
                    {cert.certificationURL && (
                      <a
                        href={cert.certificationURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline text-xs"
                      >
                        View Credential
                      </a>
                    )}
                    {cert.notes && (
                      <p className="text-indigo-700 text-sm whitespace-pre-line mt-1">
                        {cert.notes}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </aside>

          {/* RIGHT COL: MAIN CONTENT */}
          <section className="md:w-2/3 pl-10 space-y-14">
            {/* Summary */}
            {summary && (
              <section>
                <h2 className="text-indigo-900 font-bold text-3xl mb-4 border-b border-indigo-300 pb-2">
                  Summary
                </h2>
                <p className="text-indigo-800 text-lg leading-relaxed whitespace-pre-line">
                  {summary}
                </p>
              </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
              <section>
                <h2 className="text-indigo-900 font-bold text-3xl mb-4 border-b border-indigo-300 pb-2">
                  Education
                </h2>
                {education.map((edu, i) => (
                  <article key={i} className="mb-8">
                    <h3 className="text-2xl font-semibold text-indigo-900">
                      {edu.degree} — {edu.institution}
                    </h3>
                    <p className="text-indigo-700 text-sm italic">
                      {edu.location}
                    </p>
                    <p className="text-indigo-500 text-xs mb-2">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.description && (
                      <p className="text-indigo-800 whitespace-pre-line">
                        {edu.description}
                      </p>
                    )}
                  </article>
                ))}
              </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
              <section>
                <h2 className="text-indigo-900 font-bold text-3xl mb-4 border-b border-indigo-300 pb-2">
                  Projects
                </h2>
                {projects.map((proj, i) => (
                  <article key={i} className="mb-8">
                    <h3 className="text-2xl font-semibold text-indigo-900">
                      {proj.name}
                    </h3>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        {proj.url}
                      </a>
                    )}
                    <p className="text-indigo-800 whitespace-pre-line mt-2">
                      {proj.description}
                    </p>
                    {proj.points?.length > 0 && (
                      <ul className="list-disc list-inside text-indigo-700 mt-3 space-y-1">
                        {proj.points.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </section>
            )}

            {/* Interests */}
            {interests?.length > 0 && (
              <section>
                <h2 className="text-indigo-700 font-semibold text-xl mb-4 uppercase tracking-wide">
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {interests.map((int, i) => (
                    <span
                      key={i}
                      className="bg-indigo-200 text-indigo-900 text-xs px-2 py-1 rounded-full"
                    >
                      {int.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Social Links */}
            {filteredSocialLinks.length > 0 && (
              <section className="mt-10">
                <h2 className="text-indigo-700 font-semibold text-xl mb-4 uppercase tracking-wide">
                  Social Links
                </h2>
                <div className="flex flex-wrap gap-4">
                  {filteredSocialLinks.map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-indigo-100 hover:bg-indigo-200 transition-colors text-indigo-900 px-4 py-2 rounded-md text-sm font-medium shadow"
                    >
                      {socialIcons[key]}
                      <span className="capitalize">{key}</span>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
