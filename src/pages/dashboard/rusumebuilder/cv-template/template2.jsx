import { Mail, Phone, MapPin, Globe } from "lucide-react";

const Template2 = ({ data }) => {
  if (!data) return <p className="p-6 text-red-500">No data provided.</p>;

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state: stateName,
    summary,
    education = [],
    experiences = [],
    skills = [],
    certifications = [],
    awards = [],
    website,
  } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 rounded-lg p-8 text-sm text-gray-800 font-sans">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold text-blue-600">
          {firstName} {lastName}
        </h1>
        <p className="text-gray-700 text-lg">Software Engineer</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          {/* About Me */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              My Self
            </h2>
            <p className="text-gray-700">{summary}</p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Experience
            </h2>
            {experiences.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold">
                  {exp.company} - {exp.location}
                </h3>
                <p className="text-xs text-gray-500">
                  {exp.jobTitle} ({exp.duration})
                </p>
                <ul className="list-disc ml-5 mt-1 text-gray-700 space-y-1 text-sm">
                  {exp.responsibilities?.map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx}>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-xs text-gray-500">
                  {edu.institution} — {edu.year}
                </p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-64 space-y-6">
          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Contact
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <MapPin size={14} />
                {address}, {city}, {stateName}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} />
                {phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                {email}
              </li>
              {website && (
                <li className="flex items-center gap-2">
                  <Globe size={14} />
                  {website}
                </li>
              )}
            </ul>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Skills</h2>
            <ul className="space-y-2 text-sm">
              {skills.map((skill, idx) => (
                <li key={idx}>
                  <div className="flex justify-between text-gray-700">
                    <span>{skill.name}</span>
                    <span className="text-xs text-gray-500">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Certifications
              </h2>
              <ul className="list-disc ml-5 text-gray-700">
                {certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Awards
              </h2>
              <ul className="list-disc ml-5 text-gray-700">
                {awards.map((award, idx) => (
                  <li key={idx}>{award}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template2;
