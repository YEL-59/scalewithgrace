import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaProjectDiagram,
} from "react-icons/fa";

const Template5 = ({ data }) => {
  const { user_profile: profile } = data || {};
  const skills = profile.skills
    ?.map((s) => (typeof s === "string" ? s : s.name || s.title))
    .flat();

  const SectionTitle = ({ icon: Icon, children }) => (
    <h2 className="flex items-center text-indigo-600 text-lg font-bold mb-2 space-x-2">
      <Icon /> <span>{children}</span>
    </h2>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header with Color Blocks */}
      <div className="flex">
        <div className="w-2 bg-gradient-to-b from-indigo-500 to-purple-600" />
        <div className="flex-1 p-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h1 className="text-4xl font-bold">{profile.full_name}</h1>
          <p className="mt-1">
            {profile.job_title || "Front-end Software Engineer"}
          </p>
          <div className="flex flex-wrap text-sm mt-3 space-x-4 opacity-80">
            {profile.phone && (
              <span>
                <FaPhone className="inline mr-1" />
                {profile.phone}
              </span>
            )}
            {profile.email && (
              <span>
                <FaEnvelope className="inline mr-1" />
                {profile.email}
              </span>
            )}
            {profile.address && (
              <span>
                <FaMapMarkerAlt className="inline mr-1" />
                {profile.address}
              </span>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" className="underline">
                <FaGlobe className="inline mr-1" />
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {/* Summary */}
        {profile.summary?.profile && (
          <div>
            <p className="text-gray-700 leading-relaxed">
              {profile.summary.profile}
            </p>
          </div>
        )}

        {/* Two-column Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Skills */}
            {skills?.length > 0 && (
              <div>
                <SectionTitle icon={FaTools}>Skills</SectionTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Education */}
            {profile.education?.length > 0 && (
              <div>
                <SectionTitle icon={FaGraduationCap}>Education</SectionTitle>
                {profile.education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold">{edu.degree}</p>
                    <p className="text-gray-600">{edu.institution}</p>
                    {edu.year && (
                      <p className="text-gray-500 text-sm">{edu.year}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Middle and Right Combined */}
          <div className="md:col-span-2 space-y-6">
            {/* Experience */}
            {profile.experience?.length > 0 && (
              <div>
                <SectionTitle icon={FaBriefcase}>Experience</SectionTitle>
                {profile.experience.map((job, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-gray-500 text-sm">
                      {job.startDate || job.duration?.split(" - ")[0]} –{" "}
                      {job.endDate || "Present"}
                    </p>
                    <p className="font-semibold">
                      {job.position || job.title} @ {job.company}
                    </p>
                    <p className="text-gray-700 mt-1">{job.description}</p>
                    {job.points?.length > 0 && (
                      <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                        {job.points.map((pt, k) => (
                          <li key={k}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {profile.projects?.length > 0 && (
              <div>
                <SectionTitle icon={FaProjectDiagram}>Projects</SectionTitle>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {profile.projects.map((proj, i) => (
                    <li key={i}>
                      <span className="font-semibold">{proj.name}</span>:{" "}
                      {proj.description}
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          className="ml-2 text-indigo-600 underline"
                        >
                          [View]
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Programming Profiles or Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.programming_profiles?.length > 0 && (
            <div>
              <SectionTitle icon={FaLink}>Online Profiles</SectionTitle>
              <ul className="list-disc list-inside text-gray-700">
                {profile.programming_profiles.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link}
                      target="_blank"
                      className="text-indigo-600 underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {profile.certifications?.length > 0 && (
            <div>
              <SectionTitle icon={FaGraduationCap}>Certifications</SectionTitle>
              <ul className="list-disc list-inside text-gray-700">
                {profile.certifications.map((cert, i) => (
                  <li key={i}>
                    <span className="font-semibold">{cert.name}</span> –{" "}
                    {cert.issuingOrganization} ({cert.year})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template5;
