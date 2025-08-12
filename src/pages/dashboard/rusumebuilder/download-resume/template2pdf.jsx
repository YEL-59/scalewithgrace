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

// Define deep blue color same as ACCENT_COLOR
const ACCENT_COLOR = "#1E40AF";

// Basic styles for the PDF components
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#2c2c2c",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    paddingBottom: 8,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    color: ACCENT_COLOR,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "semibold",
    marginTop: 4,
    marginBottom: 8,
    color: "#334155",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    color: "#475569",
  },
  contactItem: {
    marginRight: 12,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    backgroundColor: "#E0E7FF",
    color: ACCENT_COLOR,
    paddingLeft: 4,
    paddingVertical: 2,
    marginBottom: 6,
  },
  leftColumn: {
    width: "40%",
    paddingRight: 12,
  },
  rightColumn: {
    width: "60%",
    paddingLeft: 12,
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  educationItem: {
    marginBottom: 8,
  },
  mediumText: {
    fontWeight: "medium",
    color: "#1e293b",
  },
  smallText: {
    fontSize: 10,
    color: "#334155",
  },
  normalText: {
    fontSize: 10,
    color: "#475569",
  },
  listItem: {
    marginBottom: 2,
  },
  linkText: {
    color: ACCENT_COLOR,
    textDecoration: "underline",
  },
});

const Template2PDF = ({ data }) => {
  if (!data?.user_profile) return <Text>No profile data available</Text>;

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
          {/* Contact info - simple list */}
          <View style={styles.contactRow}>
            {profile.phone && (
              <Text style={styles.contactItem}>📞 {profile.phone}</Text>
            )}
            {profile.email && (
              <Text style={styles.contactItem}>✉️ {profile.email}</Text>
            )}
            {profile.address && (
              <Text style={styles.contactItem}>📍 {profile.address}</Text>
            )}
            {profile.website && (
              <Link
                src={
                  profile.website.startsWith("http")
                    ? profile.website
                    : "https://" + profile.website
                }
                style={styles.contactItem}
              >
                🌐 {profile.website.replace(/^https?:\/\//, "")}
              </Link>
            )}
            {profile.social_links?.linkedin && (
              <Link
                src={profile.social_links.linkedin}
                style={styles.contactItem}
              >
                LinkedIn
              </Link>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.twoColumnContainer}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* ABOUT */}
            <Text style={styles.sectionHeader}>ABOUT</Text>
            <Text style={styles.normalText}>{profile.summary?.profile}</Text>

            {/* CONTACT */}
            <Text style={[styles.sectionHeader, { marginTop: 16 }]}>
              CONTACT
            </Text>
            {profile.phone && (
              <Text style={styles.normalText}>📞 {profile.phone}</Text>
            )}
            {profile.address && (
              <Text style={styles.normalText}>📍 {profile.address}</Text>
            )}
            {profile.email && (
              <Text style={styles.normalText}>✉️ {profile.email}</Text>
            )}
            {profile.social_links?.linkedin && (
              <Link
                src={profile.social_links.linkedin}
                style={[styles.linkText, { marginBottom: 8 }]}
              >
                linkedin.com/in/{profile.full_name.replace(/\s+/g, "-")}
              </Link>
            )}

            {/* EDUCATION */}
            <Text style={[styles.sectionHeader, { marginTop: 16 }]}>
              EDUCATION
            </Text>
            {profile.education?.map((edu, idx) => (
              <View key={idx} style={styles.educationItem}>
                <Text style={styles.mediumText}>{edu.institution}</Text>
                <Text style={styles.smallText}>{edu.degree}</Text>
                <Text style={styles.normalText}>
                  {edu.startDate} – {edu.endDate}
                </Text>
                {edu.description && (
                  <Text style={[styles.smallText, { marginTop: 2 }]}>
                    {edu.description}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* EXPERIENCE */}
            <Text style={styles.sectionHeader}>EXPERIENCE</Text>
            {profile.experience?.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={styles.mediumText}>{exp.title}</Text>
                <Text style={styles.smallText}>
                  {exp.company}, {exp.location} | {exp.startDate} –{" "}
                  {exp.endDate}
                </Text>
                <Text style={[styles.normalText, { marginTop: 4 }]}>
                  {exp.points?.join(". ") + "."}
                </Text>
              </View>
            ))}

            {/* PROJECTS */}
            {profile.projects?.length > 0 && (
              <>
                <Text style={[styles.sectionHeader, { marginTop: 12 }]}>
                  PROJECTS
                </Text>
                {profile.projects.map((project, idx) => (
                  <View key={idx} style={{ marginBottom: 12 }}>
                    <Link
                      src={
                        project.url.startsWith("http")
                          ? project.url
                          : "https://" + project.url
                      }
                      style={styles.linkText}
                    >
                      {project.name}
                    </Link>
                    <Text style={[styles.smallText, { marginTop: 4 }]}>
                      {project.description}
                    </Text>
                    {project.points?.length > 0 && (
                      <View style={{ marginTop: 4, paddingLeft: 10 }}>
                        {project.points.map((point, i) => (
                          <Text key={i} style={styles.normalText}>
                            • {point.replace(/^-/, "").trim()}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </>
            )}

            {/* TRAINING (Certifications) */}
            <Text style={[styles.sectionHeader, { marginTop: 12 }]}>
              TRAINING
            </Text>
            {profile.certifications?.map((cert, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={styles.mediumText}>{cert.certificationName}</Text>
                <Text style={styles.smallText}>
                  {cert.issuingOrganization} | {cert.dateEarned}
                </Text>
                {cert.notes && (
                  <Text style={[styles.normalText, { marginTop: 4 }]}>
                    {cert.notes}
                  </Text>
                )}
              </View>
            ))}

            {/* SKILL */}
            <Text style={[styles.sectionHeader, { marginTop: 12 }]}>SKILL</Text>
            {profile.skills?.map((skillGroup, idx) => (
              <Text key={idx} style={styles.normalText}>
                <Text style={{ fontWeight: "bold" }}>{skillGroup.title}:</Text>{" "}
                {skillGroup.badges
                  ?.map((b) => `${b.name}${b.level ? ` (${b.level})` : ""}`)
                  .join(", ")}
              </Text>
            ))}

            {/* INTEREST */}
            <Text style={[styles.sectionHeader, { marginTop: 12 }]}>
              INTERESTS
            </Text>
            {profile.interests?.map((interest, idx) => (
              <Text key={idx} style={styles.normalText}>
                • {interest.name}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template2PDF;
