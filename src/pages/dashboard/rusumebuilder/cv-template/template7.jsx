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
  switch (level?.toLowerCase()) {
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

export default function Template7({ data, userImage }) {
  const profile = data?.user_profile || {};

  // Helper to format dates better if needed
  const formatDate = (dateStr) => {
    // You can improve this to use date-fns or dayjs if you want
    return dateStr || "";
  };

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

        <button
          onClick={() => window.print()}
          className="px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
        >
          Print
        </button>
      </div>
      <div
        className="bg-white text-black w-[210mm] mx-auto !urbanist shadow-2xl"
        style={{ fontFamily: "'Urbanist', sans-serif" }}
      >
        {/* Header */}
        <div className="flex w-full relative justify-between px-12 py-9 bg-[#373739]">
          {/* Left: Name and Title */}
          <div>
            <h1 className="text-[24px] font-bold tracking-[2px] text-[#fff] leading-tight">
              {profile.full_name || "ALEX STEVENS"}
            </h1>
            <p className="tracking-[3px] text-[#fff] uppercase leading-[24px] mt-2">
              {profile.job_title || "PROJECT MANAGER"}
            </p>
          </div>

          {/* Right: Profile Image */}
          {userImage && (
            <div className="w-[100px] h-[100px] shrink-0 absolute right-16 -bottom-12">
              <img
                src={userImage}
                alt={profile.full_name || "Profile"}
                className="w-full h-full object-cover rounded-full border border-[#FF4089]"
              />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex justify-between gap-5 px-6 py-8 mt-12">
          {/* Left Column */}
          <div className="w-[50%] space-y-4 rounded-md">
            {/* Experience */}
            <section>
              <div className="flex pb-3 items-center gap-1">
                <h2 className="text-sm tracking-[2px] text-[#171717] font-semibold leading-[24px]">
                  EXPERIENCE
                </h2>
                <div className="flex-1 border-b-[2px] mt-2 border-[#D9D9D9] max-w-[100px]"></div>
              </div>
              <div className="border-l border-[#FF4089] pl-2">
                {(profile.experience?.length ?? 0) > 0 ? (
                  profile.experience.map((exp, idx) => (
                    <div key={idx} className={idx > 0 ? "mt-4" : ""}>
                      <p className="font-semibold leading-[18px] text-xs">
                        {exp.title}
                      </p>
                      <p className="text-xs leading-[18px] font-semibold flex justify-between items-center">
                        {exp.company}, {exp.location || ""}
                        <span>
                          {formatDate(exp.startDate)} –{" "}
                          {formatDate(exp.endDate)}
                        </span>
                      </p>
                      <p className="text-xs leading-[20px] mt-2">
                        {exp.points?.join(" ")}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs italic">
                    No experience data available.
                  </p>
                )}
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex pb-3 items-center gap-1">
                <h2 className="text-sm tracking-[2px] text-[#171717] font-semibold leading-[24px]">
                  EDUCATION
                </h2>
                <div className="flex-1 border-b-[2px] mt-2 border-[#D9D9D9] max-w-[100px]"></div>
              </div>
              <div className="border-l border-[#FF4089] pl-2">
                {(profile.education?.length ?? 0) > 0 ? (
                  profile.education.map((edu, idx) => (
                    <div key={idx} className={idx > 0 ? "mt-4" : ""}>
                      <p className="font-semibold leading-[18px] text-xs">
                        {edu.institution}
                      </p>
                      <p className="text-xs leading-[18px] font-semibold flex justify-between items-center">
                        {edu.degree} {edu.location ? `- ${edu.location}` : ""}
                      </p>
                      <p className="text-xs leading-[18px]">
                        {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                      </p>
                      {edu.description && (
                        <p className="text-xs mt-1 leading-[18px]">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs italic">No education data available.</p>
                )}
              </div>
            </section>

            {/* Training/Certifications */}
            <section>
              <div className="flex pb-3 items-center gap-1">
                <h2 className="text-sm tracking-[2px] text-[#171717] font-semibold leading-[24px]">
                  TRAINING
                </h2>
                <div className="flex-1 border-b-[2px] mt-2 border-[#D9D9D9] max-w-[100px]"></div>
              </div>
              <div className="border-l border-[#FF4089] pl-2">
                {(profile.certifications?.length ?? 0) > 0 ? (
                  profile.certifications.map((cert, idx) => (
                    <div key={idx} className={idx > 0 ? "mt-4" : ""}>
                      <p className="font-semibold leading-[18px] text-xs">
                        {cert.issuingOrganization}
                      </p>
                      <p className="text-xs leading-[18px] font-semibold flex justify-between items-center">
                        {cert.certificationName}
                      </p>
                      <p className="text-xs leading-[20px]">
                        {formatDate(cert.dateEarned)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs italic">No training data available.</p>
                )}
              </div>
            </section>
          </div>

          <div className="border-r border-[#D9D9D9]"></div>

          {/* Right Column */}
          <div className="w-[50%] space-y-4">
            {/* About Me */}
            <div>
              <h2 className="text-sm tracking-[2px] text-center pb-3 text-[#171717] uppercase font-semibold leading-[24px]">
                ABOUT Me
              </h2>
              <p className="text-xs leading-[18px] text-[#171717]">
                {profile.summary?.profile ||
                  "Experienced Senior Project Manager with over 10 years in the German tech industry. Specializing in agile methodologies, cross-functional team leadership, and delivering complex software solutions. Passionate about driving innovation and exceeding client expectations."}
              </p>
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            {/* Contact */}
            <div className="text-center">
              <h2 className="text-sm tracking-[2px] pb-3 text-[#171717] font-semibold leading-[24px]">
                CONTACT
              </h2>
              <div className="space-y-4 grid grid-cols-2 items-start justify-start text-center">
                {profile.phone && (
                  <p className="text-xs flex flex-col items-center gap-1 leading-[18px]">
                    <FaPhoneAlt className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                    <a
                      href={`tel:${profile.phone}`}
                      className="underline hover:text-[#FF4089]"
                    >
                      {profile.phone}
                    </a>
                  </p>
                )}
                {profile.address && (
                  <p className="text-xs flex flex-col items-center gap-1">
                    <FaMapMarkerAlt className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                    {profile.address}
                  </p>
                )}
                {profile.email && (
                  <p className="text-xs flex flex-col items-center gap-1">
                    <FaEnvelope className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="underline hover:text-[#FF4089]"
                    >
                      {profile.email}
                    </a>
                  </p>
                )}
                {profile.website && (
                  <p className="text-xs flex flex-col items-center gap-1">
                    <FaGlobe className="text-[#79819A] text-xl p-1 border-[#FF4089] border rounded-full" />
                    <a
                      href={
                        profile.website.startsWith("http")
                          ? profile.website
                          : `https://${profile.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#FF4089]"
                    >
                      {profile.website.replace(/^https?:\/\//, "")}
                    </a>
                  </p>
                )}
                {profile.social_links && (
                  <div className="flex justify-center gap-4 mt-2">
                    {profile.social_links.linkedin && (
                      <a
                        href={profile.social_links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#79819A] hover:text-[#FF4089] transition-colors"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin size={24} />
                      </a>
                    )}
                    {profile.social_links.github && (
                      <a
                        href={profile.social_links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#79819A] hover:text-[#FF4089] transition-colors"
                        aria-label="GitHub"
                      >
                        <FaGithub size={24} />
                      </a>
                    )}
                    {/* Add other social icons if needed */}
                  </div>
                )}
              </div>
            </div>

            <div className="border-b border-[#D9D9D9] my-6"></div>

            {/* Skills */}
            <div className="text-center">
              <h2 className="text-sm tracking-[2px] pb-3 text-[#171717] font-semibold leading-[24px]">
                SKILL
              </h2>
              <ul className="text-xs space-y-4 flex flex-col items-center">
                {(profile.skills?.length ?? 0) > 0 ? (
                  profile.skills.map((skill, idx) => (
                    <li key={idx} className="w-full max-w-sm">
                      <p className="font-semibold mb-1">{skill.title}</p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {skill.badges?.map((badge, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-[#f5f5f5] rounded px-3 py-1 shadow-sm cursor-default"
                            title={`${badge.name} - ${badge.level}`}
                          >
                            <div
                              className={`h-3 w-3 rounded-full ${levelToColor(
                                badge.level
                              )}`}
                            />
                            <span className="capitalize">{badge.name}</span>
                          </div>
                        ))}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="italic">No skills listed</p>
                )}
              </ul>
            </div>

            <div className="border-b border-[#D9D9D9]"></div>

            {/* Language */}
            <div>
              <h2 className="text-sm tracking-[2px] pb-3 text-[#171717] font-semibold leading-[24px]">
                LANGUAGE
              </h2>
              {(profile.languages?.length ?? 0) > 0 ? (
                profile.languages.map((lang, idx) => (
                  <p
                    key={idx}
                    className="text-xs flex justify-between items-center"
                  >
                    {lang.name} <span>{lang.level || ""}</span>
                  </p>
                ))
              ) : (
                <>
                  <p className="text-xs flex justify-between items-center ">
                    German <span>Native</span>
                  </p>
                  <p className="text-xs flex justify-between items-center mt-2">
                    English <span>Fluent</span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
