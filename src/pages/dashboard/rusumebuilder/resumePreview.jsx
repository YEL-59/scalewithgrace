import { Badge } from "@/components/ui/badge";
import { useFormContext, useWatch } from "react-hook-form";

const ResumePreview = () => {
  const { setValue } = useFormContext();
  const values = useWatch();
  const { control } = useFormContext();
  const experiences = useWatch({ control, name: "experiences" }) || [];
  const educations = useWatch({ control, name: "education" }) || [];
  const skills = useWatch({ control, name: "skills" }) || [];
  const projects = useWatch({ control, name: "projects" }) || [];
  const certifications = useWatch({ control, name: "certifications" }) || [];
  const interests = useWatch({ control, name: "interests" }) || [];
  const socialLinks = useWatch({ control, name: "social_links" }) || {};

  return (
    <div className="bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="flex mb-8">
        <div className="w-40">
          <h3 className="text-base font-semibold text-gray-900 tracking-wide font-trirong">
            Summary
          </h3>
        </div>
        <div>
          <h1
            className="text-3xl font-bold text-gray-900 mb-2 font-trirong outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const fullName = e.currentTarget.innerText.trim();
              const [first = "", ...rest] = fullName.split(" ");
              const last = rest.join(" ");
              setValue("firstName", first, { shouldDirty: true });
              setValue("lastName", last, { shouldDirty: true });
            }}
          >
            {(values.firstName || "Fred") + " " + (values.lastName || "Lynch")}
          </h1>

          <p
            className="text-gray-600 text-lg font-poppins"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const title = e.currentTarget.innerText;
              setValue("title", title);
            }}
          >
            {values.title || "Web Developer"}
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide font-poppins">
              Contacts
            </h3>
          </div>
          <div className="flex-1">
            <div className="space-y-1 text-sm text-[#212121] font-poppins">
              <p>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) =>
                    setValue("address", e.currentTarget.innerText)
                  }
                >
                  {values.address || "2207 Beach"},
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => setValue("city", e.currentTarget.innerText)}
                >
                  {values.city || "Avenue"},
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => setValue("state", e.currentTarget.innerText)}
                >
                  {values.state || "Los Angeles"}
                </span>
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setValue("email", e.currentTarget.innerText)}
              >
                {values.email || "fredlynch@mail.me"}
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setValue("phone", e.currentTarget.innerText)}
              >
                {values.phone || "(914) 479-6342"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide font-poppins">
              Profile
            </h3>
          </div>
          <div className="flex-1">
            <p
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setValue("summary", e.currentTarget.innerText)}
              className="text-sm text-[#212121] leading-relaxed font-poppins"
            >
              {values.summary ||
                "Graphic designer with +8 years of experience in branding and print design. Skilled at Adobe Creative Suite (Photoshop, Illustrator, InDesign) as print design, logo design, packaging design and typography concepts."}
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Education
            </h3>
          </div>
          <div className="flex-1">
            <div className="mb-4">
              {educations.map((edu, idx) => (
                <div key={idx} className="border-b pb-4 last:border-none">
                  <p className="text-base font-medium text-gray-900">
                    {edu.degree}{" "}
                    <span className="text-gray-600">— {edu.institution}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate} | {edu.location}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-700 mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Employment */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Employment
            </h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-5">
              {experiences.map((exp, idx) => (
                <div key={idx} className="border-b pb-4 last:border-none">
                  <p className="text-base font-medium text-gray-900">
                    {exp.title}{" "}
                    <span className="text-gray-600">— {exp.company}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate} | {exp.location}
                  </p>
                  <p className="text-sm italic text-gray-500">{exp.jobType}</p>
                  <ul className="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* project */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Projects
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0">
            {projects.map((pro, idx) => (
              <div key={idx} className="border-b pb-4 last:border-none">
                <p className="text-base font-medium text-gray-900">
                  {pro.name}
                </p>
                <p className="text-sm italic text-gray-500">
                  {pro.description}
                </p>

                {pro.url && (
                  <a
                    href={pro.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    {pro.url}
                  </a>
                )}

                {pro.points?.length > 0 && (
                  <ul className="list-disc ml-5 mt-1 text-sm space-y-1">
                    {pro.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Certifications */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Certifications
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0">
            {certifications.map((cert, idx) => (
              <div key={idx} className="border-b pb-4 last:border-none">
                <p className="text-base font-medium text-gray-900">
                  {cert.certificationName}
                </p>
                <p className="text-sm text-gray-600">
                  {cert.issuingOrganization} • {cert.dateEarned}
                  {cert.expirationDate && (
                    <span> — Expires: {cert.expirationDate}</span>
                  )}
                </p>
                {cert.credentialId && (
                  <p className="text-sm text-gray-500">
                    ID: {cert.credentialId}
                  </p>
                )}
                {cert.certificationURL && (
                  <a
                    href={cert.certificationURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    View Certification
                  </a>
                )}
                {cert.notes && (
                  <p className="text-sm italic text-gray-500 mt-1">
                    {cert.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Soft Skills
            </h3>
          </div>
          <div className="">
            {/* <div className="grid grid-cols-2 gap-8">
              <ul className="space-y-1">
                <li className="text-sm text-gray-700 font-poppins">
                  • Communication
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Time management
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Teamwork
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Creativity
                </li>
              </ul>
              <ul className="space-y-1">
                <li className="text-sm text-gray-700 font-poppins">
                  • Attention to details
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Desire to learn
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Meeting deadlines
                </li>
              </ul>
            </div> */}
            {skills.length > 0 && (
              <div>
                <h2 className="font-semibold text-lg mb-2 border-b">Skills</h2>
                {skills.map((category, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="font-semibold text-md">{category.title}</h3>
                    {category.description && (
                      <p className="text-xs text-gray-500 mb-1">
                        {category.description}
                      </p>
                    )}
                    <ul className="flex flex-wrap gap-2 text-sm text-gray-800">
                      {category.badges.map((badge, bIdx) => (
                        <li
                          key={bIdx}
                          className="bg-gray-200 px-2 py-1 rounded-full"
                        >
                          {badge.name}
                          <span className="ml-1 text-xs text-gray-600 italic">
                            ({badge.level})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Interests */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Interests
            </h3>
          </div>
          <div>
            {interests && interests.length > 0 ? (
              <ul className="flex flex-wrap gap-2 text-sm text-gray-800">
                {interests.map((interest, idx) => (
                  <li key={idx} className="bg-gray-200 px-3 py-1 rounded-full">
                    {interest.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs italic text-gray-500">
                No interests added yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Social Links
            </h3>
          </div>
          <div className="flex-1">
            {socialLinks && Object.keys(socialLinks).length > 0 ? (
              <ul className="space-y-2 text-sm text-gray-700">
                {socialLinks.linkedin && (
                  <li>
                    <strong className="inline-block w-20">LinkedIn:</strong>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-600 underline hover:text-blue-800 transition-colors"
                    >
                      {socialLinks.linkedin}
                    </a>
                  </li>
                )}
                {socialLinks.github && (
                  <li>
                    <strong className="inline-block w-20">GitHub:</strong>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-600 underline hover:text-blue-800 transition-colors"
                    >
                      {socialLinks.github}
                    </a>
                  </li>
                )}
                {socialLinks.twitter && (
                  <li>
                    <strong className="inline-block w-20">Twitter:</strong>
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-600 underline hover:text-blue-800 transition-colors"
                    >
                      {socialLinks.twitter}
                    </a>
                  </li>
                )}
                {socialLinks.website && (
                  <li>
                    <strong className="inline-block w-20">Website:</strong>
                    <a
                      href={socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-600 underline hover:text-blue-800 transition-colors"
                    >
                      {socialLinks.website}
                    </a>
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-xs italic text-gray-500">
                No social links added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
