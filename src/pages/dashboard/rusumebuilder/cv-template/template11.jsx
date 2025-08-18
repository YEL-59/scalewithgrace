import { Card } from "@/components/ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import Template11PDF from "../download-resume/template11pdf";

const Template11 = ({ data }) => {
  if (!data?.user_profile) return <p>No profile data available</p>;
  const profile = data.user_profile;
  const ACCENT_COLOR = "#4F46E5";
  return (
    <>
      {/* Download + Print */}
      <div className="flex gap-4 justify-center mb-6">
        <PDFDownloadLink
          document={<Template11PDF data={data} />}
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
        {/* <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Print
        </button> */}
      </div>
      <div className="bg-white text-white min-h-screen p-8 flex justify-center">
        <div className="w-[850px] flex rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Sidebar */}
          <div className="w-1/3 bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex flex-col">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-lime-400 shadow-md">
                <img
                  src={profile.image || "/profile.jpg"}
                  alt={profile.full_name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Contact */}
            {(profile.phone ||
              profile.email ||
              profile.address ||
              profile.website) && (
              <div className="mb-8">
                <div className="bg-orange-500 px-3 py-1 font-semibold text-white text-sm tracking-wider">
                  CONTACT
                </div>
                <ul className="mt-4 text-sm space-y-2">
                  {profile.phone && (
                    <li className="flex items-center gap-2">
                      <Phone size={14} /> {profile.phone}
                    </li>
                  )}
                  {profile.email && (
                    <li className="flex items-center gap-2">
                      <Mail size={14} /> {profile.email}
                    </li>
                  )}
                  {profile.address && (
                    <li className="flex items-center gap-2">
                      <MapPin size={14} /> {profile.address}
                    </li>
                  )}
                  {profile.website && (
                    <li className="flex items-center gap-2">
                      <Globe size={14} /> {profile.website}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Education */}
            {profile.education?.length > 0 && (
              <div className="mb-8">
                <div className="bg-lime-500 px-3 py-1 font-semibold text-white text-sm tracking-wider">
                  EDUCATION
                </div>
                <ul className="mt-4 text-sm space-y-3">
                  {profile.education.map((edu, idx) => (
                    <li key={idx}>
                      <div className="font-bold text-lime-300">{edu.year}</div>
                      <div>{edu.degree}</div>
                      <div className="text-gray-400">{edu.institution}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {profile.skills?.length > 0 && (
              <div>
                <div className="bg-pink-500 px-3 py-1 font-semibold text-white text-sm tracking-wider">
                  SKILLS
                </div>
                <ul className="mt-4 text-sm flex flex-wrap gap-2">
                  {profile.skills.map((skill, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-700 px-2 py-1 rounded text-xs border border-gray-600"
                    >
                      {typeof skill === "string" ? skill : skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="w-2/3 bg-gradient-to-b from-gray-800 to-slate-900 p-8">
            {/* Name & Title */}
            <div className="mb-8 border-b border-gray-700 pb-4">
              <h1 className="text-3xl font-extrabold text-lime-400 tracking-wide">
                {profile.full_name.toUpperCase()}
              </h1>
              {profile.job_title && (
                <p className="text-sm text-gray-300">{profile.job_title}</p>
              )}
            </div>

            {/* Profile / Summary */}
            {profile.summary?.profile && (
              <div className="mb-8">
                <div className="bg-purple-600 px-3 py-1 font-semibold text-white text-sm tracking-wider">
                  PROFILE
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-200">
                  {profile.summary.profile}
                </p>
              </div>
            )}

            {/* Work Experience */}
            {profile.experience?.length > 0 && (
              <div className="mb-8">
                <div className="bg-sky-500 px-3 py-1 font-semibold text-white text-sm tracking-wider">
                  WORK EXPERIENCE
                </div>
                <div className="mt-4 space-y-6">
                  {profile.experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-700/40 p-4 rounded-lg border border-gray-600"
                    >
                      <h3 className="font-bold text-lg text-lime-300">
                        {exp.position || exp.title}
                      </h3>
                      <span className="text-xs text-gray-400 block">
                        {exp.startDate || exp.duration} — {exp.company}
                      </span>
                      <p className="text-sm mt-2 text-gray-300">
                        {exp.points ? exp.points.join(", ") : exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {profile.projects?.length > 0 && (
              <div className="mb-8">
                <div className="bg-teal-500 px-3 py-1 font-semibold text-white text-sm tracking-wider">
                  PROJECTS
                </div>
                <div className="mt-4 space-y-4 text-sm">
                  {profile.projects.map((p, idx) => (
                    <div key={idx}>
                      <p className="font-bold text-lime-300">{p.name}</p>
                      <p>{p.description}</p>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          className="text-indigo-400 underline"
                        >
                          {p.url}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Template11;
