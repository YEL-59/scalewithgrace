import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

// Optional: register a font if you want
// Font.register({ family: 'Open Sans', src: 'https://...' });

const styles = StyleSheet.create({
  page: {
    padding: 20, // less padding
    fontFamily: "Helvetica",
    fontSize: 5, // reduced from 9 to 7
    color: "#333",
    lineHeight: 1.1, // tighter line height
  },
  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#2563eb",
    borderBottomStyle: "solid",
    paddingBottom: 4,
    marginBottom: 8,
  },
  fullName: {
    fontSize: 14, // smaller full name
    fontWeight: "bold",
    marginBottom: 1,
  },
  jobTitle: {
    fontSize: 9,
    fontWeight: "semibold",
    color: "#555",
    marginBottom: 2,
  },
  contactInfo: {
    fontSize: 6,
    color: "#666",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 2,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 8,
  },
  leftColumn: {
    width: "35%",
    color: "#555",
  },
  rightColumn: {
    width: "65%",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#2563eb",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    marginBottom: 4,
    paddingBottom: 2,
  },
  skillBadge: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    fontSize: 5,
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 8,
    marginRight: 2,
    marginBottom: 2,
    display: "inline-block",
  },
  experienceItem: {
    marginBottom: 6,
  },
  experienceTitle: {
    fontSize: 8,
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
    marginBottom: 2,
  },
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 6,
    color: "#777",
    marginBottom: 2,
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
    fontSize: 6,
  },
  list: {
    marginLeft: 8,
    marginBottom: 2,
  },
});

const NA = () => (
  <Text style={{ fontStyle: "italic", color: "#aaa" }}>N/A</Text>
);

export default function ResumeDocument({ data = {} }) {
  const profile = data.user_profile || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.fullName}>{profile.full_name || <NA />}</Text>
          <Text style={styles.jobTitle}>{profile.job_title || <NA />}</Text>
          <View style={styles.contactInfo}>
            <Text>{profile.email || <NA />}</Text>
            <Text>{profile.phone || <NA />}</Text>
            <Text>{profile.website || <NA />}</Text>
            <Text>{profile.address || <NA />}</Text>
          </View>
        </View>

        {/* Two columns */}
        <View style={styles.twoColumn}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Skills */}
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {skill.title || <NA />}
                    </Text>
                    {skill.badges?.length > 0 ? (
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {skill.badges.map((badge, idx) => (
                          <Text key={idx} style={styles.skillBadge}>
                            {badge.name} ({badge.level})
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <NA />
                    )}
                  </View>
                ))
              ) : (
                <NA />
              )}
            </View>

            {/* Social Links */}
            <View>
              <Text style={styles.sectionTitle}>Social Links</Text>
              {profile.social_links ? (
                Object.entries(profile.social_links).map(([key, val]) => (
                  <Text key={key} style={{ marginBottom: 4 }}>
                    <Text style={{ textTransform: "capitalize" }}>{key}: </Text>
                    {val ? (
                      <Link src={val} style={styles.link}>
                        {val}
                      </Link>
                    ) : (
                      <NA />
                    )}
                  </Text>
                ))
              ) : (
                <NA />
              )}
            </View>

            {/* Interests */}
            <View>
              <Text style={styles.sectionTitle}>Interests</Text>
              {profile.interests?.length > 0 ? (
                profile.interests.map((int, i) => (
                  <Text key={i} style={{ marginLeft: 8 }}>
                    • {int.name || <NA />}
                  </Text>
                ))
              ) : (
                <NA />
              )}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Summary */}
            <View>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={{ marginBottom: 12 }}>
                {profile.summary?.profile || <NA />}
              </Text>
            </View>

            {/* Experience */}
            <View>
              <Text style={styles.sectionTitle}>Experience</Text>
              {profile.experience?.length > 0 ? (
                profile.experience.map((exp, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <Text style={styles.experienceTitle}>
                      {exp.title || <NA />}
                    </Text>
                    <Text style={styles.italicText}>
                      {exp.company || <NA />}
                    </Text>
                    <View style={styles.flexBetween}>
                      <Text>{exp.startDate || <NA />}</Text>
                      <Text>{exp.endDate || <NA />}</Text>
                    </View>
                    <Text
                      style={{ fontSize: 10, color: "#555", marginBottom: 4 }}
                    >
                      {exp.location || <NA />} | {exp.jobType || <NA />}
                    </Text>
                    <Text style={{ marginBottom: 6, fontWeight: "500" }}>
                      {exp.technologies || <NA />}
                    </Text>
                    {exp.points?.length > 0 ? (
                      <View style={styles.list}>
                        {exp.points.map((point, idx) => (
                          <Text key={idx}>• {point}</Text>
                        ))}
                      </View>
                    ) : (
                      <NA />
                    )}
                  </View>
                ))
              ) : (
                <NA />
              )}
            </View>

            {/* Education */}
            <View>
              <Text style={styles.sectionTitle}>Education</Text>
              {profile.education?.length > 0 ? (
                profile.education.map((edu, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <Text style={styles.experienceTitle}>
                      {edu.degree || <NA />}
                    </Text>
                    <Text style={styles.italicText}>
                      {edu.institution || <NA />}
                    </Text>
                    <View style={styles.flexBetween}>
                      <Text>{edu.startDate || <NA />}</Text>
                      <Text>{edu.endDate || <NA />}</Text>
                    </View>
                    <Text
                      style={{ fontSize: 10, color: "#555", marginBottom: 4 }}
                    >
                      {edu.location || <NA />}
                    </Text>
                    <Text>{edu.description || <NA />}</Text>
                  </View>
                ))
              ) : (
                <NA />
              )}
            </View>

            {/* Projects */}
            <View>
              <Text style={styles.sectionTitle}>Projects</Text>
              {profile.projects?.length > 0 ? (
                profile.projects.map((proj, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <Text style={styles.experienceTitle}>
                      {proj.name || <NA />}
                    </Text>
                    <Text style={{ marginBottom: 4 }}>
                      {proj.description || <NA />}
                    </Text>
                    {proj.url ? (
                      <Link src={proj.url} style={styles.link}>
                        {proj.url}
                      </Link>
                    ) : (
                      <NA />
                    )}
                    {proj.points?.length > 0 ? (
                      <View style={styles.list}>
                        {proj.points.map((point, idx) => (
                          <Text key={idx}>• {point}</Text>
                        ))}
                      </View>
                    ) : (
                      <NA />
                    )}
                  </View>
                ))
              ) : (
                <NA />
              )}
            </View>

            {/* Certifications */}
            <View>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {profile.certifications?.length > 0 ? (
                profile.certifications.map((cert, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <Text style={{ fontWeight: "bold" }}>
                      {cert.certificationName || <NA />}
                    </Text>
                    <Text style={styles.italicText}>
                      {cert.issuingOrganization || <NA />}
                    </Text>
                    <Text style={{ fontSize: 10, color: "#555" }}>
                      Earned: {cert.dateEarned || <NA />}, Expires:{" "}
                      {cert.expirationDate || <NA />}
                    </Text>
                    <Text style={{ fontSize: 10, color: "#555" }}>
                      ID: {cert.credentialId || <NA />}
                    </Text>
                    {cert.certificationURL ? (
                      <Link src={cert.certificationURL} style={styles.link}>
                        {cert.certificationURL}
                      </Link>
                    ) : (
                      <NA />
                    )}
                    <Text>{cert.notes || <NA />}</Text>
                  </View>
                ))
              ) : (
                <NA />
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
