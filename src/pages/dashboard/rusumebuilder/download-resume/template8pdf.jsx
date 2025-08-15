import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

// Optional: register font
Font.register({
  family: "OpenSans",
  src: "https://fonts.gstatic.com/s/opensans/v29/mem8YaGs126MiZpBA-U1UpcaXcl0Aw.ttf",
});

const ACCENT_COLOR = "#4F46E5";

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "OpenSans",
    fontSize: 10,
    padding: 20,
    lineHeight: 1.4,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: ACCENT_COLOR,
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  fullName: { fontSize: 24, fontWeight: "bold" },
  jobTitle: { fontSize: 14, marginTop: 2 },
  sectionTitle: {
    fontSize: 12,
    color: ACCENT_COLOR,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
  },
  text: { fontSize: 10, marginBottom: 2 },
  row: { flexDirection: "row", flexWrap: "wrap", marginBottom: 2 },
  column: { flexDirection: "column" },
  skillBadge: {
    marginRight: 4,
    marginBottom: 2,
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 3,
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    fontSize: 10,
  },
  divider: {
    borderBottomColor: "#c7d2fe",
    borderBottomWidth: 1,
    marginVertical: 6,
  },
  link: { color: ACCENT_COLOR, textDecoration: "underline" },
});

const Template8PDF = ({ data }) => {
  if (!data?.user_profile) return null;
  const profile = data.user_profile;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.fullName}>{profile.full_name}</Text>
          <Text style={styles.jobTitle}>
            {profile.job_title || "Professional Title"}
          </Text>
          {/* Contact */}
          <View style={styles.row}>
            {profile.phone && (
              <Text style={styles.text}>📞 {profile.phone}</Text>
            )}
            {profile.email && (
              <Text style={styles.text}>✉️ {profile.email}</Text>
            )}
            {profile.address && (
              <Text style={styles.text}>📍 {profile.address}</Text>
            )}
            {profile.website && (
              <Text style={styles.link}>
                🌐 {profile.website.replace(/^https?:\/\//, "")}
              </Text>
            )}
          </View>
        </View>

        {/* Summary / About */}
        {profile.summary?.profile && (
          <>
            <Text style={styles.sectionTitle}>ABOUT</Text>
            <Text style={styles.text}>{profile.summary.profile}</Text>
            <View style={styles.divider} />
          </>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {profile.education.map((edu, idx) => (
              <View key={idx} style={styles.column}>
                <Text style={styles.text}>{edu.institution}</Text>
                <Text style={styles.text}>
                  {edu.degree} | {edu.startDate} – {edu.endDate}
                </Text>
                {edu.description && (
                  <Text style={styles.text}>{edu.description}</Text>
                )}
              </View>
            ))}
            <View style={styles.divider} />
          </>
        )}

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.row}>
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
            <View style={styles.divider} />
          </>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            {profile.experience.map((exp, idx) => (
              <View key={idx} style={styles.column}>
                <Text style={styles.text}>{exp.title}</Text>
                <Text style={styles.text}>
                  {exp.company}, {exp.location} | {exp.startDate} –{" "}
                  {exp.endDate}
                </Text>
                {exp.points?.map((p, i) => (
                  <Text key={i} style={styles.text}>
                    • {p.replace(/^-/, "").trim()}
                  </Text>
                ))}
              </View>
            ))}
            <View style={styles.divider} />
          </>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            {profile.projects.map((proj, idx) => (
              <View key={idx} style={styles.column}>
                <Link src={proj.url} style={styles.link}>
                  {proj.name}
                </Link>
                <Text style={styles.text}>{proj.description}</Text>
                {proj.points?.map((p, i) => (
                  <Text key={i} style={styles.text}>
                    • {p.replace(/^-/, "").trim()}
                  </Text>
                ))}
              </View>
            ))}
            <View style={styles.divider} />
          </>
        )}

        {/* Certifications */}
        {profile.certifications?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {profile.certifications.map((cert, idx) => (
              <View key={idx} style={styles.column}>
                <Text style={styles.text}>{cert.certificationName}</Text>
                <Text style={styles.text}>
                  {cert.issuingOrganization} | {cert.dateEarned}
                </Text>
                {cert.notes && <Text style={styles.text}>{cert.notes}</Text>}
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
};

export default Template8PDF;
