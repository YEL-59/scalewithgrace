import React, { useRef } from "react";

export default function Template4({ data }) {
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 print:p-0">
      {/* A4 page container */}
      <div
        ref={resumeRef}
        className="bg-white w-[210mm] h-[297mm] max-w-full shadow-2xl rounded-xl overflow-hidden print:shadow-none print:rounded-none print:w-auto print:h-auto print:m-0 print:p-0"
        style={{
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="md:flex md:space-x-10 h-full p-10 print:p-0">
          {/* LEFT COLUMN */}
          <aside className="md:w-1/3 border-r border-gray-300 pr-8 flex flex-col">
            {/* Name & Profession */}
            <div className="mb-10">
              <h1 className="text-5xl font-extrabold tracking-tight text-indigo-900">
                {firstName} <br /> {lastName}
              </h1>
              <p className="text-xl text-indigo-700 mt-2 font-medium">
                {profession || "Professional"}
              </p>
            </div>

            {/* Contact */}
            <section className="mb-10">
              <h2 className="uppercase text-sm font-semibold tracking-widest text-indigo-500 mb-4 border-b border-indigo-300 pb-1">
                Contact
              </h2>
              <ul className="space-y-3 text-indigo-700 text-sm leading-relaxed">
                {email && (
                  <li>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${email}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <strong>Phone:</strong> {phone}
                  </li>
                )}
                {website && (
                  <li>
                    <strong>Website:</strong>{" "}
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline break-all"
                    >
                      {website}
                    </a>
                  </li>
                )}
                {address && (
                  <li>
                    <strong>Address:</strong> {address}
                  </li>
                )}
                {(city || state) && (
                  <li>
                    <strong>Location:</strong>{" "}
                    {[city, state].filter(Boolean).join(", ")}
                  </li>
                )}
              </ul>
            </section>

            {/* Skills */}
            {skills?.length > 0 && (
              <section className="mb-10">
                <h2 className="uppercase text-sm font-semibold tracking-widest text-indigo-500 mb-4 border-b border-indigo-300 pb-1">
                  Skills
                </h2>
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className="mb-6 hover:bg-indigo-50 transition-colors rounded-md p-2"
                  >
                    <h3 className="font-semibold text-indigo-800">
                      {skill.title}
                    </h3>
                    {skill.description && (
                      <p className="text-indigo-700 text-sm mb-2 whitespace-pre-line">
                        {skill.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {skill.badges?.map((badge, idx) => (
                        <span
                          key={idx}
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
              <section className="mb-10">
                <h2 className="uppercase text-sm font-semibold tracking-widest text-indigo-500 mb-4 border-b border-indigo-300 pb-1">
                  Certifications
                </h2>
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="mb-6 hover:bg-indigo-50 transition-colors rounded-md p-2"
                  >
                    <h3 className="font-semibold text-indigo-800">
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

            {/* Social Links */}
            {social_links && Object.values(social_links).some(Boolean) && (
              <section>
                <h2 className="uppercase text-sm font-semibold tracking-widest text-indigo-500 mb-4 border-b border-indigo-300 pb-1">
                  Social Links
                </h2>
                <div className="flex flex-col space-y-3 text-indigo-700 text-sm">
                  {Object.entries(social_links).map(
                    ([key, value]) =>
                      value && (
                        <a
                          key={key}
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline capitalize break-all"
                        >
                          {key}
                        </a>
                      )
                  )}
                </div>
              </section>
            )}

            {/* Interests */}
            {interests?.length > 0 && (
              <section className="mt-auto">
                <h2 className="uppercase text-sm font-semibold tracking-widest text-indigo-500 mb-4 border-t border-indigo-300 pt-4">
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
          </aside>

          {/* RIGHT COLUMN */}
          <main className="md:w-2/3 pl-0 md:pl-10 flex flex-col">
            {/* Summary */}
            {summary && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 border-b border-indigo-300 pb-2 mb-6">
                  Professional Summary
                </h2>
                <p className="text-indigo-800 whitespace-pre-line leading-relaxed text-lg">
                  {summary}
                </p>
              </section>
            )}

            {/* Experience */}
            {experiences?.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 border-b border-indigo-300 pb-2 mb-6">
                  Experience
                </h2>
                {experiences.map((exp, i) => (
                  <article
                    key={i}
                    className="mb-8 border-l-4 border-indigo-500 pl-5 hover:bg-indigo-50 transition-colors rounded-md py-3"
                  >
                    <h3 className="text-2xl font-semibold">{exp.title}</h3>
                    <p className="text-indigo-700 text-sm">
                      {exp.company} • {exp.location}{" "}
                      {exp.jobType && `(${exp.jobType})`}
                    </p>
                    <p className="text-xs text-indigo-500 mb-3">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    {exp.points?.length > 0 && (
                      <ul className="list-disc list-inside text-indigo-700 space-y-1">
                        {exp.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {exp.technologies && (
                      <p className="text-indigo-600 mt-3 italic text-sm">
                        Technologies: {exp.technologies}
                      </p>
                    )}
                  </article>
                ))}
              </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 border-b border-indigo-300 pb-2 mb-6">
                  Education
                </h2>
                {education.map((edu, i) => (
                  <article
                    key={i}
                    className="mb-8 border-l-4 border-indigo-400 pl-5 hover:bg-indigo-50 transition-colors rounded-md py-3"
                  >
                    <h3 className="text-2xl font-semibold">
                      {edu.degree} — {edu.institution}
                    </h3>
                    <p className="text-indigo-700 text-sm">{edu.location}</p>
                    <p className="text-xs text-indigo-500 mb-3">
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
                <h2 className="text-3xl font-bold text-indigo-900 border-b border-indigo-300 pb-2 mb-6">
                  Projects
                </h2>
                {projects.map((proj, i) => (
                  <article
                    key={i}
                    className="mb-8 border-l-4 border-indigo-400 pl-5 hover:bg-indigo-50 transition-colors rounded-md py-3"
                  >
                    <h3 className="text-2xl font-semibold">{proj.name}</h3>
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
          </main>
        </div>
      </div>
    </div>
  );
}
