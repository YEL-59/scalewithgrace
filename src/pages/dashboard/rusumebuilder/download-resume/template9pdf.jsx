import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const ACCENT_COLOR = "#4F46E5";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: ACCENT_COLOR,
    color: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    fontSize: 10,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: ACCENT_COLOR,
    marginBottom: 3,
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
  },
  listItem: {
    marginLeft: 10,
  },
  link: {
    color: ACCENT_COLOR,
    textDecoration: "none",
  },
  skillBadge: {
    marginRight: 3,
    marginBottom: 3,
    padding: 2,
    borderRadius: 3,
    backgroundColor: "#e0e7ff",
  },
});

const Template9PDF = ({ data }) => {
  if (!data?.user_profile) return null;
  const profile = data.user_profile;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.full_name}</Text>
          <Text style={styles.title}>
            {profile.job_title || "Professional Title"}
          </Text>
          <View style={styles.contactRow}>
            {profile.phone && <Text>📞 {profile.phone} </Text>}
            {profile.email && <Text>✉ {profile.email} </Text>}
            {profile.address && <Text>📍 {profile.address} </Text>}
            {profile.website && (
              <Link src={profile.website} style={styles.link}>
                🌐 {profile.website.replace(/^https?:\/\//, "")}
              </Link>
            )}
            {profile.social_links?.linkedin && (
              <Link src={profile.social_links.linkedin} style={styles.link}>
                LinkedIn
              </Link>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {profile.summary?.profile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{profile.summary.profile}</Text>
          </View>
        )}

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {profile.skills.map((skill, idx) =>
                typeof skill === "string" ? (
                  <Text key={idx} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ) : (
                  <Text key={idx} style={styles.skillBadge}>
                    {skill.title}:{" "}
                    {skill.badges
                      ?.map((b) => `${b.name}${b.level ? ` (${b.level})` : ""}`)
                      .join(", ")}
                  </Text>
                )
              )}
            </View>
          </View>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {profile.experience.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 3 }}>
                <Text style={styles.text}>
                  {exp.position || exp.title}, {exp.location || exp.company}
                </Text>
                <Text style={styles.text}>
                  {exp.company} | {exp.startDate || exp.duration} -{" "}
                  {exp.endDate || "Present"}
                </Text>
                {exp.description && (
                  <Text style={[styles.text, styles.listItem]}>
                    • {exp.description}
                  </Text>
                )}
                {exp.points?.map((p, i) => (
                  <Text key={i} style={[styles.text, styles.listItem]}>
                    • {p}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {profile.education.map((edu, idx) => (
              <View key={idx} style={{ marginBottom: 3 }}>
                <Text style={styles.text}>{edu.degree}</Text>
                <Text style={styles.text}>
                  {edu.institution} |{" "}
                  {edu.year || `${edu.startDate || ""} - ${edu.endDate || ""}`}
                </Text>
                {edu.description && (
                  <Text style={styles.text}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {profile.projects.map((proj, idx) => (
              <View key={idx} style={{ marginBottom: 3 }}>
                <Text style={{ ...styles.text, color: ACCENT_COLOR }}>
                  {proj.name}
                </Text>
                <Text style={styles.text}>{proj.description}</Text>
                {proj.url && (
                  <Link src={proj.url} style={styles.link}>
                    {proj.url.replace(/^https?:\/\//, "")}
                  </Link>
                )}
                {proj.points?.map((p, i) => (
                  <Text key={i} style={[styles.text, styles.listItem]}>
                    • {p}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {profile.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {profile.certifications.map((cert, idx) => (
              <View key={idx} style={{ marginBottom: 3 }}>
                <Text style={styles.text}>
                  {cert.certificationName || cert.name}
                </Text>
                <Text style={styles.text}>
                  {cert.issuingOrganization || cert.issuer} |{" "}
                  {cert.dateEarned || cert.year}
                </Text>
                {cert.notes && <Text style={styles.text}>{cert.notes}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Interests */}
        {profile.interests?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {profile.interests.map((i, idx) => (
                <Text key={idx} style={styles.skillBadge}>
                  {i.name}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default Template9PDF;
