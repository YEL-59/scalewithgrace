import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";
import { Template7pdf } from "../download-resume/template7pdf";

function levelToColor(level) {
  switch ((level || "").toLowerCase()) {
    case "beginner":
      return "bg-yellow-400";
    case "intermediate":
      return "bg-blue-500";
    case "advanced":
    case "expert":
      return "bg-green-600";
    default:
      return "bg-gray-400";
  }
}

export default function Template7({ data }) {
  const profile = data?.user_profile || {};

  // Helper to format dates better if needed
  const formatDate = (dateStr) => dateStr || "";

  // Map skills to handle simple strings and structured badges
  const skills = profile.skills
    ?.map((skill) => {
      if (typeof skill === "string") return { name: skill, level: null };
      if (skill?.badges)
        return skill.badges.map((b) => ({ name: b.name, level: b.level }));
      return [];
    })
    .flat();

  return (
    <>
      {/* Download + Print Buttons */}
      <div className="flex gap-4 justify-center mb-8">
        <PDFDownloadLink
          document={<Template7pdf data={data} />}
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

        {/* <button
          onClick={() => window.print()}
          className="px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
        >
          Print
        </button> */}
      </div>

      {/* Resume Layout */}
      <div
        className="bg-white text-gray-800 w-[210mm] mx-auto p-8 shadow-2xl !urbanist"
        style={{ fontFamily: "'Urbanist', sans-serif" }}
      >
        {/* Header: Name & Contact */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              {profile.full_name}
            </h1>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-600 space-y-1">
            {profile.phone && (
              <p>
                <FaPhoneAlt className="inline mr-1" />
                {profile.phone}
              </p>
            )}
            {profile.email && (
              <p>
                <FaEnvelope className="inline mr-1" />
                {profile.email}
              </p>
            )}
            {profile.address && (
              <p>
                <FaMapMarkerAlt className="inline mr-1" />
                {profile.address}
              </p>
            )}
            {profile.website && (
              <p>
                <FaGlobe className="inline mr-1" />
                <a
                  href={profile.website}
                  target="_blank"
                  className="text-indigo-600 underline"
                >
                  {profile.website}
                </a>
              </p>
            )}
            {profile.social_links?.linkedin && (
              <p>
                <FaLinkedin className="inline mr-1" />
                <a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  className="text-indigo-600 underline"
                >
                  LinkedIn
                </a>
              </p>
            )}
            {profile.social_links?.github && (
              <p>
                <FaGithub className="inline mr-1" />
                <a
                  href={profile.social_links.github}
                  target="_blank"
                  className="text-indigo-600 underline"
                >
                  GitHub
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {profile.summary?.profile && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {profile.summary.profile}
            </p>
          </div>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              Experience
            </h2>
            {profile.experience.map((job, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-gray-800">
                  {job.position || job.title}, {job.company}
                </h3>
                <p className="text-gray-600 text-sm">
                  {job.location || job.city} |{" "}
                  {formatDate(job.startDate || job.startDate || job.duration)} -{" "}
                  {formatDate(job.endDate || job.endDate || job.duration)}
                </p>
                <p className="text-gray-700">{job.description}</p>
                {job.points?.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                    {job.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              Education
            </h2>
            {profile.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <h3 className="font-semibold text-gray-800">
                  {edu.degree} {edu.study_field ? `in ${edu.study_field}` : ""}
                </h3>
                <p className="text-gray-600">
                  {edu.institution} | {edu.year || formatDate(edu.startDate)} -{" "}
                  {formatDate(edu.endDate)}
                </p>
                {edu.description && (
                  <p className="text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded text-sm ${levelToColor(
                    skill.level
                  )}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              Projects
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {profile.projects.map((proj, i) => (
                <li key={i}>
                  <span className="font-semibold">{proj.name}</span>:{" "}
                  {proj.description}{" "}
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      className="text-indigo-600 underline ml-1"
                    >
                      [Link]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {profile.certifications?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {profile.certifications.map((cert, i) => (
                <li key={i}>
                  <span className="font-semibold">{cert.name}</span> –{" "}
                  {cert.issuer} ({cert.year})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
