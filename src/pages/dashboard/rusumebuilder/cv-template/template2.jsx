import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * ResumeTemplate
 * Props:
 *  - data: {
 *      firstName, lastName, title, photo, email, phone, website, linkedin,
 *      address, city, state, summary,
 *      experiences: [{ title, company, location, startDate, endDate, points: [] }],
 *      education: [{ degree, institution, location, startDate, endDate, description }],
 *      skills: [{ title, description, badges: [ "React" | {name,level} ] }],
 *      certifications: [{ name, issuer, date }],
 *      languages: [{ name, level }]
 *    }
 */
const Template2 = ({ data = {} }) => {
  const resumeRef = useRef();

  const {
    firstName = "First",
    lastName = "Last",
    title = "Professional Title",
    photo,
    email = "",
    phone = "",
    website = "",
    linkedin = "",
    address = "",
    city = "",
    state: stateName = "",
    summary = "",
    experiences = [],
    education = [],
    skills = [],
    certifications = [],
    languages = [],
  } = data;

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    if (!element) return;
    const opt = {
      margin: 0.3,
      filename: `${firstName}-${lastName}-resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Actions */}
      <div className="max-w-4xl mx-auto mb-6 print:hidden flex justify-end gap-3">
        <Button onClick={handleDownloadPDF} className="bg-slate-900 text-white">
          Download PDF
        </Button>
      </div>

      {/* Resume container */}
      <div
        ref={resumeRef}
        className="max-w-4xl mx-auto bg-white shadow-md print:shadow-none rounded-lg overflow-hidden ring-1 ring-gray-200"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 px-6 py-6 md:py-8 bg-white">
          {/* Left: avatar */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
              <img
                src={
                  photo ||
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder"
                }
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: name & contact */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {firstName} <span className="font-semibold">{lastName}</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-1">{title}</p>

            <div className="mt-3 flex flex-col md:flex-row md:items-center md:gap-4 text-xs md:text-sm text-slate-600">
              <div>{email}</div>
              <div className="hidden md:block">|</div>
              <div>{phone}</div>
              {(website || linkedin) && (
                <div className="hidden md:block">|</div>
              )}
              {website && (
                <a
                  className="underline"
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              )}
              {linkedin && (
                <a
                  className="underline"
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}
            </div>

            {/* small address line */}
            <p className="mt-2 text-xs text-slate-500">
              {[address, city, stateName].filter(Boolean).join(", ")}
            </p>
          </div>
        </div>

        {/* Body: 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6 px-6 py-6">
          {/* LEFT: main content */}
          <main className="space-y-5">
            {/* Summary */}
            {summary && (
              <section>
                <h2 className="text-sm font-semibold uppercase text-slate-700 tracking-wide border-b pb-1">
                  Professional Summary
                </h2>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  {summary}
                </p>
              </section>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase text-slate-700 tracking-wide border-b pb-1">
                  Experience
                </h2>

                <div className="mt-3 space-y-4">
                  {experiences.map((exp, i) => (
                    <article key={i} className="text-sm text-slate-800">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-slate-900">
                          {exp.title}
                        </h3>
                        <span className="text-xs text-slate-600">
                          {[exp.startDate, exp.endDate]
                            .filter(Boolean)
                            .join(" – ")}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 mb-1">
                        {exp.company} • {exp.location}
                      </div>

                      {Array.isArray(exp.points) && exp.points.length > 0 && (
                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                          {exp.points.map((p, idx) => (
                            <li key={idx}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase text-slate-700 tracking-wide border-b pb-1">
                  Education
                </h2>

                <div className="mt-3 space-y-3 text-sm text-slate-800">
                  {education.map((edu, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline">
                        <div className="font-semibold">{edu.degree}</div>
                        <div className="text-xs text-slate-600">
                          {[edu.startDate, edu.endDate]
                            .filter(Boolean)
                            .join(" – ")}
                        </div>
                      </div>
                      <div className="text-xs text-slate-600">
                        {edu.institution} • {edu.location}
                      </div>
                      {edu.description && (
                        <div className="text-sm mt-1 text-slate-700">
                          {edu.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase text-slate-700 tracking-wide border-b pb-1">
                  Certifications
                </h2>
                <ul className="mt-2 text-sm text-slate-800 space-y-1">
                  {certifications.map((c, i) => (
                    <li key={i}>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-slate-600">
                        {c.issuer} • {c.date}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>

          {/* RIGHT: sidebar */}
          <aside className="space-y-5">
            {/* Skills */}
            {skills.length > 0 && (
              <section className="bg-slate-50 p-4 rounded">
                <h3 className="text-sm font-semibold text-slate-700 uppercase">
                  Skills
                </h3>
                <div className="mt-3 space-y-3">
                  {skills.map((group, gi) => (
                    <div key={gi}>
                      <div className="text-sm font-medium text-slate-800">
                        {group.title}
                      </div>
                      {group.description && (
                        <p className="text-xs text-slate-600 mb-2">
                          {group.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(group.badges) &&
                          group.badges.map((b, bi) => {
                            const name =
                              typeof b === "string" ? b : b?.name || "";
                            const level =
                              typeof b === "object" ? b?.level : null;
                            return (
                              <Badge
                                key={bi}
                                className="px-2 py-0.5 text-xs bg-gray-200 text-slate-900"
                              >
                                {name}
                                {level && (
                                  <span className="ml-1 text-xs text-slate-600">
                                    ({level})
                                  </span>
                                )}
                              </Badge>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section className="bg-slate-50 p-4 rounded">
                <h3 className="text-sm font-semibold text-slate-700 uppercase">
                  Languages
                </h3>
                <ul className="mt-2 text-sm text-slate-800 space-y-1">
                  {languages.map((l, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{l.name}</span>
                      <span className="text-xs text-slate-600">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Quick contact box */}
            <section className="bg-slate-50 p-4 rounded">
              <h3 className="text-sm font-semibold text-slate-700 uppercase">
                Contact
              </h3>
              <div className="mt-2 text-sm text-slate-800 space-y-1">
                {email && <div>{email}</div>}
                {phone && <div>{phone}</div>}
                {website && (
                  <div>
                    <a
                      className="underline"
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {website}
                    </a>
                  </div>
                )}
                {linkedin && (
                  <div>
                    <a
                      className="underline"
                      href={linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
                {address && (
                  <div className="text-xs text-slate-600">{address}</div>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Template2;
