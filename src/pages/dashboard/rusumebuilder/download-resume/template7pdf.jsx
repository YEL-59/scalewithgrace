import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

// Map skill level to color
const levelToColor = (level) => {
  switch ((level || "").toLowerCase()) {
    case "beginner":
      return "#FACC15"; // yellow
    case "intermediate":
      return "#3B82F6"; // blue
    case "advanced":
    case "expert":
      return "#16A34A"; // green
    default:
      return "#9CA3AF"; // gray
  }
};

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1F2937",
  },
  section: { marginBottom: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  subHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 4,
    marginTop: 8,
  },
  text: { marginBottom: 2 },
  skill: {
    display: "inline-block",
    padding: 4,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 4,
    color: "white",
    fontSize: 10,
  },
  link: { color: "#4F46E5" },
  smallText: { fontSize: 10, color: "#6B7280" },
  list: { marginLeft: 12, marginBottom: 4 },
});

export const Template7pdf = ({ data }) => {
  const profile = data?.user_profile || {};

  // Map skills (strings or badges) to objects
  const skills = profile.skills
    ?.map((skill) => {
      if (typeof skill === "string") return { name: skill, level: null };
      if (skill?.badges)
        return skill.badges.map((b) => ({ name: b.name, level: b.level }));
      return [];
    })
    .flat();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.header}>{profile.full_name}</Text>
          {profile.phone && (
            <Text style={styles.text}>Phone: {profile.phone}</Text>
          )}
          {profile.email && (
            <Text style={styles.text}>Email: {profile.email}</Text>
          )}
          {profile.address && (
            <Text style={styles.text}>Address: {profile.address}</Text>
          )}
          {profile.website && (
            <Text style={styles.text}>
              Website:{" "}
              <Link src={profile.website} style={styles.link}>
                {profile.website}
              </Link>
            </Text>
          )}
          {profile.social_links?.linkedin && (
            <Text style={styles.text}>
              LinkedIn:{" "}
              <Link src={profile.social_links.linkedin} style={styles.link}>
                LinkedIn
              </Link>
            </Text>
          )}
          {profile.social_links?.github && (
            <Text style={styles.text}>
              GitHub:{" "}
              <Link src={profile.social_links.github} style={styles.link}>
                GitHub
              </Link>
            </Text>
          )}
        </View>

        {/* Professional Summary */}
        {profile.summary?.profile && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Professional Summary</Text>
            <Text style={styles.text}>{profile.summary.profile}</Text>
          </View>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Experience</Text>
            {profile.experience.map((job, i) => (
              <View key={i} style={styles.section}>
                <Text style={{ fontWeight: "bold" }}>
                  {job.position || job.title} – {job.company}
                </Text>
                <Text style={styles.smallText}>
                  {job.location || job.city} | {job.startDate || job.duration} -{" "}
                  {job.endDate || job.duration}
                </Text>
                {job.description && (
                  <Text style={styles.text}>{job.description}</Text>
                )}
                {job.points?.length > 0 && (
                  <View style={styles.list}>
                    {job.points.map((point, idx) => (
                      <Text key={idx}>• {point}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Education</Text>
            {profile.education.map((edu, i) => (
              <View key={i} style={styles.section}>
                <Text style={{ fontWeight: "bold" }}>
                  {edu.degree} {edu.study_field ? `in ${edu.study_field}` : ""}
                </Text>
                <Text style={styles.smallText}>
                  {edu.institution} | {edu.year || edu.startDate} -{" "}
                  {edu.endDate}
                </Text>
                {edu.description && (
                  <Text style={styles.text}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Skills</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {skills.map((skill, i) => (
                <Text
                  key={i}
                  style={{
                    ...styles.skill,
                    backgroundColor: levelToColor(skill.level),
                  }}
                >
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Projects</Text>
            {profile.projects.map((proj, i) => (
              <Text key={i} style={styles.text}>
                • <Text style={{ fontWeight: "bold" }}>{proj.name}</Text>:{" "}
                {proj.description}{" "}
                {proj.url && (
                  <Link src={proj.url} style={styles.link}>
                    [Link]
                  </Link>
                )}
              </Text>
            ))}
          </View>
        )}

        {/* Certifications */}
        {profile.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Certifications</Text>
            {profile.certifications.map((cert, i) => (
              <Text key={i} style={styles.text}>
                • <Text style={{ fontWeight: "bold" }}>{cert.name}</Text> –{" "}
                {cert.issuer} ({cert.year})
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
