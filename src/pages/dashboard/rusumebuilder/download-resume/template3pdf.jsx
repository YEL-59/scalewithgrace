// Template3pdf.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 20,
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  main: {
    width: "70%",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 4,
    paddingBottom: 2,
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
  },
  list: {
    marginLeft: 10,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 10,
    marginBottom: 2,
  },
  name: {
    fontSize: 20,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  jobTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 10,
  },
});

const NA = () => (
  <Text style={{ fontStyle: "italic", color: "#999" }}>N/A</Text>
);
const formatUrl = (url) =>
  url && !url.startsWith("http") ? `https://${url}` : url;

const Template3pdf = ({ data }) => {
  if (!data || !data.user_profile) return null;

  const {
    full_name = "",
    email = "",
    phone = "",
    website = "",
    address = "",
    city = "",
    state = "",
    summary = {},
    education = [],
    experience = [],
    skills = [],
    certifications = [],
    projects = [],
    social_links = {},
    interests = [],
    job_title = "",
  } = data.user_profile;

  const [firstName, ...lastNameParts] = full_name.trim().split(" ");
  const lastName = lastNameParts.join(" ");
  const summaryText = summary.profile || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Contact */}
          {(email || phone || address || city || state || website) && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <Text style={styles.text}>{email || <NA />}</Text>
              <Text style={styles.text}>{phone || <NA />}</Text>
              {website ? (
                <Link src={formatUrl(website)} style={styles.text}>
                  {website}
                </Link>
              ) : (
                <NA />
              )}
              {address || city || state ? (
                <Text style={styles.text}>
                  {[address, city, state].filter(Boolean).join(", ")}
                </Text>
              ) : (
                <NA />
              )}
            </View>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {skills.map((group, idx) => (
                <View key={idx} style={{ marginBottom: 4 }}>
                  {group?.title && (
                    <Text style={{ fontWeight: "bold" }}>{group.title}</Text>
                  )}
                  {group?.badges && group.badges.length > 0 && (
                    <View style={styles.list}>
                      {group.badges.map((badge, i) => (
                        <Text key={i} style={styles.listItem}>
                          {badge.name} {badge.level && `— ${badge.level}`}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {certifications.map((cert, idx) => (
                <View key={idx} style={{ marginBottom: 4 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {cert.certificationName || <NA />}
                  </Text>
                  <Text>{cert.issuingOrganization || <NA />}</Text>
                  <Text>
                    Earned: {cert.dateEarned || <NA />}
                    {cert.expirationDate &&
                      ` • Expires: ${cert.expirationDate}`}
                  </Text>
                  {cert.credentialId && <Text>ID: {cert.credentialId}</Text>}
                  {cert.certificationURL && (
                    <Link src={formatUrl(cert.certificationURL)}>
                      View Credential
                    </Link>
                  )}
                  {cert.notes && <Text>{cert.notes}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Social Links */}
          {social_links && Object.values(social_links).some(Boolean) && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Social Links</Text>
              {Object.entries(social_links).map(
                ([key, value]) =>
                  value && (
                    <Link
                      key={key}
                      src={formatUrl(value)}
                      style={{ textTransform: "capitalize", fontSize: 10 }}
                    >
                      {key}
                    </Link>
                  )
              )}
            </View>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Interests</Text>
              {interests.map((int, i) => (
                <Text key={i} style={styles.text}>
                  {int.name}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Name and Job Title */}
          <Text style={styles.name}>
            {firstName?.toUpperCase()} {lastName?.toUpperCase()}
          </Text>
          {job_title && <Text style={styles.jobTitle}>{job_title}</Text>}

          {/* Summary */}
          {summaryText && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.text}>{summaryText}</Text>
            </View>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp, idx) => (
                <View key={idx} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold" }}>{exp.title}</Text>
                  <Text>
                    {exp.company} •{" "}
                    {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                  </Text>
                  {exp.location && <Text>{exp.location}</Text>}
                  {exp.points?.length > 0 && (
                    <View style={styles.list}>
                      {exp.points.map((point, i) => (
                        <Text key={i} style={styles.listItem}>
                          • {point}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, idx) => (
                <View key={idx} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>
                  <Text>
                    {edu.institution} •{" "}
                    {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                  </Text>
                  {edu.location && <Text>{edu.location}</Text>}
                  {edu.description && <Text>{edu.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((proj, idx) => (
                <View key={idx} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold" }}>{proj.name}</Text>
                  {proj.url && (
                    <Link src={formatUrl(proj.url)}>{proj.url}</Link>
                  )}
                  {proj.description && <Text>{proj.description}</Text>}
                  {proj.points?.length > 0 && (
                    <View style={styles.list}>
                      {proj.points.map((point, i) => (
                        <Text key={i} style={styles.listItem}>
                          • {point}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default Template3pdf;
