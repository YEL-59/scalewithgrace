import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";
import Template4Pdf from "../download-resume/template4pdf";

export default function Template4({ data }) {
  const profile = data?.user_profile || {};

  // Split full name into first and last parts for styling
  const [firstName, ...restName] = (profile.full_name || "").split(" ");
  const lastName = restName.join(" ");

  return (
    <>
      {/* Download + Print Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <PDFDownloadLink
          document={<Template4Pdf data={data} />}
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
        className="bg-white text-black px-5 py-8 w-[210mm] mx-auto shadow-2xl"
        style={{ fontFamily: "'Urbanist', sans-serif" }}
      >
        {/* Header */}
        <div className="flex w-full justify-between">
          <div className="w-[60%]">
            <h1 className="text-[32px] font-bold tracking-[2px] text-[#484848]">
              {firstName} <span className="font-semibold">{lastName}</span>
            </h1>
            {profile.job_title ? (
              <p className="tracking-[3px] text-[#484848] uppercase leading-[24px]">
                {profile.job_title}
              </p>
            ) : (
              <p className="tracking-[3px] text-[#484848] uppercase leading-[24px]">
                {/* Fallback title */}
                Aspiring AI Developer
              </p>
            )}
            {profile.website && (
              <p className="flex items-center gap-2 leading-[18px]">
                <FaGlobe className="text-[12px]" />{" "}
                <a
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-xs"
                >
                  {profile.website}
                </a>
              </p>
            )}
          </div>

          <div className="space-y-3 w-[40%] text-xs">
            {profile.phone && (
              <p className="flex items-center gap-2 leading-[18px]">
                <FaPhoneAlt className="text-[12px]" /> {profile.phone}
              </p>
            )}

            {profile.email && (
              <p className="flex items-center gap-2 leading-[18px]">
                <FaEnvelope className="text-[12px]" /> {profile.email}
              </p>
            )}
            {profile.social_links?.linkedin && (
              <p className="flex items-center gap-2 leading-[18px]">
                <FaLinkedin className="text-[12px]" />{" "}
                <a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  linkedin.com/in/{firstName.toLowerCase()}
                </a>
              </p>
            )}
            {profile.social_links?.github && (
              <p className="flex items-center gap-2 leading-[18px]">
                <FaGithub className="text-[12px]" />{" "}
                <a
                  href={profile.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  github.com/{firstName.toLowerCase()}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="border-b border-[#D9D9D9] mt-6"></div>

        {/* Body */}
        <div className="flex justify-between gap-5 mt-6">
          {/* Left Column */}
          <div className="w-[45%] space-y-6 bg-[#F5F5F5] p-6 rounded-md">
            {/* About */}
            {profile.summary?.profile && (
              <section>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666]">
                  ABOUT
                </h2>
                <p className="text-xs leading-[18px] text-[#171717]">
                  {profile.summary.profile}
                </p>
              </section>
            )}

            {/* Certifications (Training) */}
            {profile.certifications?.length > 0 && (
              <section>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666]">
                  TRAINING & CERTIFICATIONS
                </h2>
                {profile.certifications.map((cert, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {cert.issuingOrganization}
                    </p>
                    <p className="text-xs leading-[18px] font-medium">
                      {cert.certificationName}
                    </p>
                    <p className="text-xs leading-[18px] text-[#555]">
                      Earned: {cert.dateEarned}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {profile.skills?.length > 0 && (
              <section>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666]">
                  SKILLS
                </h2>
                <ul className="text-xs space-y-2">
                  {profile.skills.map((skill, idx) => (
                    <li key={idx}>
                      <strong>{skill.title}:</strong>{" "}
                      {skill.badges.map((b) => b.name).join(", ")}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Languages */}
            {profile.languages?.length > 0 && (
              <section>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666]">
                  LANGUAGES
                </h2>
                {profile.languages.map((lang, idx) => (
                  <p
                    key={idx}
                    className="text-xs flex justify-between items-center"
                  >
                    {lang.name} <span>{lang.level}</span>
                  </p>
                ))}
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="w-[55%] space-y-6">
            {/* Experience */}
            {profile.experience?.length > 0 && (
              <section>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666]">
                  EXPERIENCE
                </h2>
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {exp.title}
                    </p>
                    <p className="text-xs font-medium flex justify-between">
                      {exp.company}{" "}
                      <span>
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </p>
                    <ul className="list-disc ml-5 mt-2 text-xs">
                      {exp.points?.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* Education */}
            {profile.education?.length > 0 && (
              <section>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666]">
                  EDUCATION
                </h2>
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {edu.institution}
                    </p>
                    <p className="text-xs font-medium">
                      {edu.degree} - {edu.location}
                    </p>
                    <p className="text-xs">
                      {edu.startDate} – {edu.endDate}
                    </p>
                    {edu.description && (
                      <p className="text-xs mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {profile.projects?.length > 0 && (
              <section>
                <h2 className="text-sm tracking-[2px] pb-3 text-[#666]">
                  PROJECTS
                </h2>
                {profile.projects.map((proj, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="font-medium leading-[18px] text-xs">
                      {proj.name}
                    </p>
                    <a
                      href={`https://${proj.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline"
                    >
                      {proj.url}
                    </a>
                    <p className="text-xs mt-1">{proj.description}</p>
                    <ul className="list-disc ml-5 mt-2 text-xs">
                      {proj.points?.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
