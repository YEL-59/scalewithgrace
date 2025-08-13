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

// Define styles similar to your Tailwind-based layout
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
    lineHeight: 1.4,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    borderBottomStyle: "solid",
    paddingBottom: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  lastName: {
    fontWeight: "normal",
  },
  title: {
    marginTop: 4,
    color: "#666",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 250,
    justifyContent: "flex-end",
  },
  contactItem: {
    marginLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    borderLeftStyle: "solid",
    paddingLeft: 6,
    color: "#555",
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    paddingBottom: 4,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainColumn: {
    width: "60%",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    borderRightStyle: "solid",
    paddingRight: 10,
  },
  sideColumn: {
    width: "35%",
    paddingLeft: 10,
  },
  experienceItem: {
    marginBottom: 6,
  },
  experienceTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  experienceTitle: {
    fontWeight: "bold",
  },
  experienceTime: {
    fontSize: 9,
    fontFamily: "Courier",
    color: "#888",
  },
  experienceCompany: {
    fontStyle: "italic",
    fontSize: 9,
    color: "#666",
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 12,
  },
  bulletPoint: {
    marginBottom: 2,
  },
  skillBadge: {
    fontSize: 9,
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: "#ddd",
    color: "#333",
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 2,
  },
});

const Template1PDF = ({ data }) => {
  if (!data?.user_profile) return null;

  const profile = data.user_profile;

  const nameParts = profile.full_name ? profile.full_name.split(" ") : [];
  const firstName = nameParts[0] || "First";
  const lastName = nameParts.slice(1).join(" ") || "Last";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>
              {firstName} <Text style={styles.lastName}>{lastName}</Text>
            </Text>
            <Text style={styles.title}>
              {profile.job_title || "Professional Title"}
            </Text>
          </View>
          <View style={styles.contactRow}>
            {profile.email && (
              <Text style={[styles.contactItem]}>{profile.email}</Text>
            )}
            {profile.phone && (
              <Text style={styles.contactItem}>{profile.phone}</Text>
            )}
            {profile.social_links?.website && (
              <Link
                style={styles.contactItem}
                src={profile.social_links.website}
              >
                {profile.social_links.website.replace(/^https?:\/\//, "")}
              </Link>
            )}
            {profile.social_links?.linkedin && (
              <Link
                style={styles.contactItem}
                src={profile.social_links.linkedin}
              >
                LinkedIn
              </Link>
            )}
            {profile.social_links?.github && (
              <Link
                style={styles.contactItem}
                src={profile.social_links.github}
              >
                GitHub
              </Link>
            )}
            {profile.social_links?.twitter && (
              <Link
                style={styles.contactItem}
                src={profile.social_links.twitter}
              >
                Twitter
              </Link>
            )}
          </View>
        </View>

        {/* Two columns */}
        <View style={styles.twoColumn}>
          {/* Left main */}
          <View style={styles.mainColumn}>
            {/* Summary */}
            {profile.summary?.profile && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Professional Summary</Text>
                <Text>{profile.summary.profile}</Text>
              </View>
            )}

            {/* Experience */}
            {profile.experience && profile.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Experience</Text>
                {profile.experience.map((exp, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <View style={styles.experienceTitleRow}>
                      <Text style={styles.experienceTitle}>{exp.title}</Text>
                      <Text style={styles.experienceTime}>
                        {[exp.startDate, exp.endDate]
                          .filter(Boolean)
                          .join(" – ")}
                      </Text>
                    </View>
                    <Text style={styles.experienceCompany}>
                      {exp.company} • {exp.location} • {exp.jobType}
                    </Text>
                    {exp.points && exp.points.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.points.map((p, idx) => (
                          <Text key={idx} style={styles.bulletPoint}>
                            • {p}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Education</Text>
                {profile.education.map((edu, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <View style={styles.experienceTitleRow}>
                      <Text style={styles.experienceTitle}>{edu.degree}</Text>
                      <Text style={styles.experienceTime}>
                        {[edu.startDate, edu.endDate]
                          .filter(Boolean)
                          .join(" – ")}
                      </Text>
                    </View>
                    <Text style={styles.experienceCompany}>
                      {edu.institution} • {edu.location}
                    </Text>
                    {edu.description && <Text>{edu.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {profile.certifications && profile.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Certifications</Text>
                {profile.certifications.map((cert, i) => (
                  <View key={i} style={{ marginBottom: 4 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {cert.certificationName}
                    </Text>
                    <Text style={{ fontStyle: "italic", fontSize: 9 }}>
                      {cert.issuingOrganization} • {cert.dateEarned}
                    </Text>
                    {cert.notes && <Text>{cert.notes}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right sidebar */}
          <View style={styles.sideColumn}>
            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Skills</Text>
                {profile.skills.map((group, i) => (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 10,
                        marginBottom: 4,
                      }}
                    >
                      {group.title}
                    </Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {group.badges.map((b, bi) => (
                        <Text key={bi} style={styles.skillBadge}>
                          {b.name} {b.level ? `(${b.level})` : ""}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Interests</Text>
                {profile.interests.map((interest, idx) => (
                  <Text key={idx} style={{ marginBottom: 2 }}>
                    • {interest.name}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template1PDF;
