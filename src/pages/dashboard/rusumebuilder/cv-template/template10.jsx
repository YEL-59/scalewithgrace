import { PDFDownloadLink } from "@react-pdf/renderer";
import Template10PDF from "../download-resume/template10pdf";

const Template10 = ({ data }) => {
  if (!data?.user_profile) return <p>No profile data available</p>;
  const profile = data.user_profile;
  const ACCENT_COLOR = "#4F46E5";
  // Helper: flatten skills array
  const renderSkills = (skills) => {
    return skills.map((skill, idx) => {
      if (typeof skill === "string") {
        return (
          <span
            key={idx}
            className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full"
          >
            {skill}
          </span>
        );
      } else if (skill?.badges) {
        return skill.badges.map((badge, bidx) => (
          <span
            key={`${idx}-${bidx}`}
            className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full"
            title={skill.description || ""}
          >
            {badge.name} ({badge.level})
          </span>
        ));
      }
      return null;
    });
  };

  return (
    <>
      {/* Download + Print */}
      <div className="flex gap-4 justify-center mb-6">
        <PDFDownloadLink
          document={<Template10PDF data={data} />}
          fileName="resume.pdf"
          style={{
            textDecoration: "none",
            padding: "10px 20px",
            color: "#fff",
            backgroundColor: ACCENT_COLOR,
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
      </div>

      <div className="max-w-[794px] mx-auto bg-white p-8 font-sans text-gray-800 shadow-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">{profile.full_name}</h1>
            {profile.job_title && (
              <p className="text-lg text-gray-700">{profile.job_title}</p>
            )}
          </div>
          <div className="mt-2 md:mt-0 text-sm text-gray-600 flex flex-col gap-1">
            {profile.phone && <span>📞 {profile.phone}</span>}
            {profile.email && <span>✉️ {profile.email}</span>}
            {profile.address && <span>📍 {profile.address}</span>}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                className="text-indigo-600 underline"
              >
                {profile.website}
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        {profile.summary?.profile && (
          <section className="mb-6">
            <h2 className="text-indigo-600 font-semibold mb-1">Summary</h2>
            <p className="text-sm">{profile.summary.profile}</p>
          </section>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-indigo-600 font-semibold mb-2">Experience</h2>
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-bold">
                  {exp.position || exp.title} | {exp.company}{" "}
                  {exp.location ? `- ${exp.location}` : ""}
                </p>
                <p className="text-xs text-gray-600">
                  {exp.startDate || exp.duration} - {exp.endDate || "Present"}
                </p>
                <ul className="list-disc list-inside text-sm mt-1">
                  {exp.points
                    ? exp.points.map((p, i) => <li key={i}>{p}</li>)
                    : exp.description && <li>{exp.description}</li>}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-indigo-600 font-semibold mb-2">Education</h2>
            {profile.education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <p className="font-bold">
                  {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                </p>
                <p className="text-sm text-gray-600">
                  {edu.institution} {edu.year ? `| ${edu.year}` : ""}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-indigo-600 font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {renderSkills(profile.skills)}
            </div>
          </section>
        )}

        {/* Certifications */}
        {profile.certifications?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-indigo-600 font-semibold mb-2">
              Certifications
            </h2>
            {profile.certifications.map((cert, idx) => (
              <div key={idx} className="mb-1 text-sm">
                <p className="font-bold">{cert.name}</p>
                <p>
                  {cert.issuer} | {cert.year}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-indigo-600 font-semibold mb-2">Projects</h2>
            {profile.projects.map((p, idx) => (
              <div key={idx} className="mb-2 text-sm">
                <p className="font-bold">{p.name}</p>
                <p>{p.description}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    className="text-indigo-600 underline"
                  >
                    {p.url}
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Social Links */}
        {profile.social_links && (
          <section className="mb-6">
            <h2 className="text-indigo-600 font-semibold mb-1">Social Links</h2>
            <div className="text-sm text-gray-600 flex flex-col gap-1">
              {profile.social_links.github && (
                <a
                  href={profile.social_links.github}
                  target="_blank"
                  className="text-indigo-600 underline"
                >
                  GitHub
                </a>
              )}
              {profile.social_links.linkedin && (
                <a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  className="text-indigo-600 underline"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </section>
        )}

        {/* Interests */}
        {profile.interests?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-indigo-600 font-semibold mb-1">Interests</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {profile.interests.map((i, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 rounded">
                  {i.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Template10;
