import { PDFDownloadLink } from "@react-pdf/renderer";
import Template1PDF from "../download-resume/template1pdf";

const Template1 = ({ data }) => {
  if (!data?.user_profile) return <p>No profile data available</p>;
  const profile = data.user_profile;

  // Separate skills into strings and object-based skills
  const stringSkills =
    profile.skills?.filter((skill) => typeof skill === "string") || [];
  const objectSkills =
    profile.skills?.filter(
      (skill) => typeof skill === "object" && skill.title
    ) || [];

  // Helper function to split array into two columns
  const splitInTwo = (arr) => {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  };

  const [skillsCol1, skillsCol2] = splitInTwo(stringSkills);
  const [eduCol1, eduCol2] = splitInTwo(profile.education || []);
  const [projCol1, projCol2] = splitInTwo(profile.projects || []);

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

        {/* <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Print
        </button> */}
      </div>{" "}
      <div className="max-w-3xl mx-auto p-6 font-serif text-gray-800 leading-relaxed shadow-lg rounded">
        {/* Name */}
        <h1 className="text-2xl font-bold text-center">{profile?.full_name}</h1>

        {/* Contact */}
        <p className="text-center mt-1">
          {profile?.address} <br />
          {profile?.phone} - {profile?.email}
        </p>

        {/* Professional Summary */}
        {profile?.summary?.profile && (
          <section className="mt-6">
            <h2 className="flex items-end font-bold uppercase text-gray-800 mt-6">
              Professional Summary
              <span className="flex-grow border-b-2 border-black ml-2"></span>
            </h2>
            <p className="mt-2 text-gray-700">{profile.summary.profile}</p>
          </section>
        )}

        {/* Websites / Social Links */}
        <section className="mt-6">
          <h2 className="flex items-end font-bold uppercase text-gray-800 mt-6">
            Websites, Portfolios, Profiles
            <span className="flex-grow border-b-2 border-black ml-2"></span>
          </h2>
          <ul className="list-disc list-inside mt-2">
            {profile.website && <li>{profile.website}</li>}
            {profile.social_links?.github && (
              <li>{profile.social_links.github}</li>
            )}
            {profile.social_links?.linkedin && (
              <li>{profile.social_links.linkedin}</li>
            )}
          </ul>
        </section>

        {/* Technical Skills */}
        {(stringSkills.length > 0 || objectSkills.length > 0) && (
          <section className="mt-6">
            <h2 className="flex items-end font-bold uppercase text-gray-800 mt-6">
              Technical Skills
              <span className="flex-grow border-b-2 border-black ml-2"></span>
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
              <ul className="list-disc list-inside space-y-1">
                {skillsCol1.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <ul className="list-disc list-inside space-y-1">
                {skillsCol2.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            {/* Object-based skills */}
            {objectSkills.length > 0 && (
              <div className="mt-4">
                {objectSkills.map((skill, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="font-semibold">{skill.title}</p>
                    {skill.badges?.map((b, i) => (
                      <p key={i}>
                        {b.name} ({b.level})
                      </p>
                    ))}
                    {skill.description && (
                      <p className="text-gray-700">{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Experience */}
        {profile?.experience?.length > 0 && (
          <section className="mt-6">
            <h2 className="flex items-end font-bold uppercase text-gray-800 mt-6">
              Experience
              <span className="flex-grow border-b-2 border-black ml-2"></span>
            </h2>
            {profile.experience.map((job, index) => (
              <div key={index} className="mt-4">
                <p className="text-sm text-gray-600">
                  {job.duration ||
                    `${job.startDate} - ${job.endDate || "Present"}`}
                </p>
                <p className="font-bold">{job.position || job.title}</p>
                <p className="italic">
                  {job.company} {job.location ? `– ${job.location}` : ""}
                </p>
                {job.description && (
                  <p className="mt-1 text-gray-700">{job.description}</p>
                )}
                {job.points?.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    {job.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {profile?.education?.length > 0 && (
          <section className="mt-6">
            <h2 className="flex items-end font-bold uppercase text-gray-800 mt-6">
              Education
              <span className="flex-grow border-b-2 border-black ml-2"></span>
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                {eduCol1.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-bold">{edu.degree}</p>
                    <p className="italic">{edu.institution}</p>
                    {edu.year && (
                      <p className="text-sm text-gray-600">{edu.year}</p>
                    )}
                    {edu.description && (
                      <p className="text-gray-700">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
              <div>
                {eduCol2.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-bold">{edu.degree}</p>
                    <p className="italic">{edu.institution}</p>
                    {edu.year && (
                      <p className="text-sm text-gray-600">{edu.year}</p>
                    )}
                    {edu.description && (
                      <p className="text-gray-700">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {profile?.projects?.length > 0 && (
          <section className="mt-6">
            <h2 className="flex items-end font-bold uppercase text-gray-800 mt-6">
              Projects
              <span className="flex-grow border-b-2 border-black ml-2"></span>
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                {projCol1.map((project, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-bold">
                      {project.name}{" "}
                      {project.url && (
                        <a
                          href={project.url}
                          className="text-blue-600 underline ml-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          (Link)
                        </a>
                      )}
                    </p>
                    {project.description && (
                      <p className="text-gray-700">{project.description}</p>
                    )}
                    {project.points?.length > 0 && (
                      <ul className="list-disc list-inside mt-1 text-gray-700">
                        {project.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <div>
                {projCol2.map((project, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-bold">
                      {project.name}{" "}
                      {project.url && (
                        <a
                          href={project.url}
                          className="text-blue-600 underline ml-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          (Link)
                        </a>
                      )}
                    </p>
                    {project.description && (
                      <p className="text-gray-700">{project.description}</p>
                    )}
                    {project.points?.length > 0 && (
                      <ul className="list-disc list-inside mt-1 text-gray-700">
                        {project.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Template1;
