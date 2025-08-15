import React, { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Template1PDF from "../download-resume/template1pdf";

const Template1 = ({ data = {} }) => {
  const resumeRef = useRef();

  const mapApiToTemplateProps = (data) => {
    if (!data?.user_profile) return {};

    const profile = data.user_profile;
    console.log({ profile });
    const nameParts = profile.full_name ? profile.full_name.split(" ") : [];
    const firstName = nameParts[0] || "First";
    const lastName = nameParts.slice(1).join(" ") || "Last";

    return {
      firstName,
      lastName,
      job_title: profile.job_title || "Professional Title",
      email: profile.email || "",
      phone: profile.phone || "",
      website: profile.social_links?.website || profile.website || "",
      linkedin: profile.social_links?.linkedin || "",
      github: profile.social_links?.github || "",
      twitter: profile.social_links?.twitter || "",
      address: profile.address || "",

      summary: profile.summary?.profile || "",

      experiences: (profile.experience || []).map((exp) => ({
        title: exp.title || "",
        company: exp.company || "",
        location: exp.location || "",
        startDate: exp.startDate || "",
        endDate: exp.endDate || "",
        points: exp.points || [],
        jobType: exp.jobType || "",
        technologies: exp.technologies || "",
      })),

      education: (profile.education || []).map((edu) => ({
        degree: edu.degree || "",
        institution: edu.institution || "",
        location: edu.location || "",
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
        description: edu.description || "",
      })),

      certifications: (profile.certifications || []).map((cert) => ({
        name: cert.certificationName || "",
        issuer: cert.issuingOrganization || "",
        date: cert.dateEarned || "",
        notes: cert.notes || "",
      })),

      skills: (profile.skills || []).map((skillGroup) => {
        if (typeof skillGroup === "string") {
          // plain string → treat as a badge-only group
          return {
            title: "",
            badges: [{ name: skillGroup, level: null }],
          };
        }

        // object with title/badges
        return {
          title: skillGroup.title || "",
          badges: (skillGroup.badges || []).map((b) => ({
            name: b.name || "",
            level: b.level || null,
          })),
        };
      }),

      interests: profile.interests || [],
    };
  };

  const {
    firstName,
    lastName,
    job_title,
    email,
    phone,
    website,
    linkedin,
    github,
    twitter,
    summary,
    experiences,
    education,
    certifications,
    skills,
    interests,
  } = mapApiToTemplateProps(data);

  // Helper to render contact items with optional link & left border
  const ContactItem = ({ children, href, first }) => (
    <span
      className={`flex items-center text-xs text-gray-600 px-2 ${
        !first ? "border-l border-gray-300" : ""
      }`}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-900"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </span>
  );

  return (
    <>
      {/* Download + Print Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <PDFDownloadLink
          document={<Template1PDF data={data} />}
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
        ref={resumeRef}
        className="max-w-[794px] mx-auto bg-white text-gray-800 shadow-2xl font-sans p-8 text-sm leading-relaxed"
        style={{ minHeight: "1123px" }}
      >
        {/* Header */}
        <header className="border-b border-gray-300 pb-3 mb-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-wide leading-tight">
                {firstName} <span className="font-semibold">{lastName}</span>
              </h1>
              <p className="text-gray-600 mt-1">
                {job_title || "Professional Title"}
              </p>
            </div>

            {/* New inline contact info row */}
            <div className="flex flex-wrap gap-2 max-w-xs justify-end">
              {email && <ContactItem first={true}>{email}</ContactItem>}
              {phone && <ContactItem>{phone}</ContactItem>}
              {website && (
                <ContactItem
                  href={
                    website.startsWith("http") ? website : "https://" + website
                  }
                >
                  {website.replace(/^https?:\/\//, "")}
                </ContactItem>
              )}
              {linkedin && <ContactItem href={linkedin}>LinkedIn</ContactItem>}
              {github && <ContactItem href={github}>GitHub</ContactItem>}
              {twitter && <ContactItem href={twitter}>Twitter</ContactItem>}
            </div>
          </div>
        </header>

        {/* Two column grid */}
        <div className="grid grid-cols-[3fr_2fr] gap-6">
          {/* Left: main content */}
          <main className="space-y-6 border-r border-gray-300 pr-6">
            {/* Summary */}
            {summary && (
              <section>
                <h2 className="uppercase text-xs font-semibold tracking-widest text-gray-600 border-b border-gray-300 pb-1 mb-2">
                  Professional Summary
                </h2>
                <p>{summary}</p>
              </section>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="uppercase text-xs font-semibold tracking-widest text-gray-600 border-b border-gray-300 pb-1 mb-3">
                  Experience
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <article key={i}>
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{exp.title}</h3>
                        <time className="text-xs text-gray-500 font-mono">
                          {[exp.startDate, exp.endDate]
                            .filter(Boolean)
                            .join(" – ")}
                        </time>
                      </div>
                      <p className="italic text-gray-600 text-xs mb-1">
                        {exp.company} • {exp.location} • {exp.jobType}
                      </p>
                      {exp.points.length > 0 && (
                        <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
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
                <h2 className="uppercase text-xs font-semibold tracking-widest text-gray-600 border-b border-gray-300 pb-1 mb-3">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <article key={i}>
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <time className="text-xs text-gray-500 font-mono">
                          {[edu.startDate, edu.endDate]
                            .filter(Boolean)
                            .join(" – ")}
                        </time>
                      </div>
                      <p className="italic text-gray-600 text-xs mb-1">
                        {edu.institution} • {edu.location}
                      </p>
                      {edu.description && (
                        <p className="text-xs">{edu.description}</p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="uppercase text-xs font-semibold tracking-widest text-gray-600 border-b border-gray-300 pb-1 mb-3">
                  Certifications
                </h2>
                <ul className="space-y-2 text-xs">
                  {certifications.map((cert, i) => (
                    <li key={i}>
                      <div className="font-semibold">{cert.name}</div>
                      <div className="italic text-gray-600">
                        {cert.issuer} • {cert.date}
                      </div>
                      {cert.notes && <p>{cert.notes}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>

          {/* Right sidebar */}
          <aside className="flex flex-col justify-start ">
            {/* Skills */}
            {skills?.length > 0 && (
              <section className="mb-6">
                <h2 className="uppercase text-xs font-semibold tracking-widest text-gray-600 border-b border-gray-300 pb-1 mb-3">
                  Skills
                </h2>

                {skills.map((item, i) => {
                  // If item is a simple string → render directly as badge
                  if (typeof item === "string") {
                    return (
                      <div key={i} className="flex flex-wrap gap-1 mb-2">
                        <span className="bg-gray-200 text-gray-800 px-2 py-0.5 text-xs rounded">
                          {item}
                        </span>
                      </div>
                    );
                  }

                  // If item is an object with title & badges
                  if (item && typeof item === "object") {
                    return (
                      <div key={i} className="mb-3">
                        <p className="font-semibold text-gray-700 text-sm">
                          {item.title}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.badges?.map((b, bi) => (
                            <span
                              key={bi}
                              className="bg-gray-200 text-gray-800 px-2 py-0.5 text-xs rounded"
                            >
                              {b.name}
                              {b.level && (
                                <span className="ml-1 text-xs text-gray-600">
                                  ({b.level})
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </section>
            )}

            {/* Interests below skills */}
            {interests.length > 0 && (
              <section>
                <h2 className="uppercase text-xs font-semibold tracking-widest text-gray-600 border-b border-gray-300 pb-1 mb-2">
                  Interests
                </h2>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                  {interests.map((i, idx) => (
                    <li key={idx}>{i.name}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </div>
    </>
  );
};

export default Template1;
