import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

// Optional: register a font if you want custom fonts
// Font.register({ family: "Roboto", src: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" });

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  nameTitle: {},
  name: { fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 12, color: "#555" },
  contact: { fontSize: 10, color: "#555", flexDirection: "column" },
  section: { marginBottom: 10 },
  sectionTitle: {
    fontSize: 12,
    color: "#4F46E5",
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: { fontSize: 10, marginBottom: 2 },
  list: { marginLeft: 10, marginBottom: 2 },
  listItem: { fontSize: 10, marginBottom: 1 },
  badge: {
    fontSize: 8,
    color: "#1E40AF",
    border: "1 solid #1E40AF",
    padding: 2,
    marginRight: 2,
    marginBottom: 2,
  },
  link: { color: "#4F46E5", textDecoration: "underline" },
});

const renderSkills = (skills) => {
  return skills.map((skill, idx) => {
    if (typeof skill === "string") {
      return (
        <Text key={idx} style={styles.badge}>
          {skill}
        </Text>
      );
    } else if (skill?.badges) {
      return skill.badges.map((badge, bidx) => (
        <Text key={`${idx}-${bidx}`} style={styles.badge}>
          {badge.name} ({badge.level})
        </Text>
      ));
    }
    return null;
  });
};

const Template10PDF = ({ data }) => {
  if (!data?.user_profile) return <Text>No profile data available</Text>;
  const profile = data.user_profile;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.nameTitle}>
            <Text style={styles.name}>{profile.full_name}</Text>
            {profile.job_title && (
              <Text style={styles.title}>{profile.job_title}</Text>
            )}
          </View>
          <View style={styles.contact}>
            {profile.phone && <Text>📞 {profile.phone}</Text>}
            {profile.email && <Text>✉️ {profile.email}</Text>}
            {profile.address && <Text>📍 {profile.address}</Text>}
            {profile.website && (
              <Link src={profile.website} style={styles.link}>
                {profile.website}
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {profile.summary?.profile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{profile.summary.profile}</Text>
          </View>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {profile.experience.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 4 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {exp.position || exp.title} | {exp.company}{" "}
                  {exp.location ? `- ${exp.location}` : ""}
                </Text>
                <Text style={styles.text}>
                  {exp.startDate || exp.duration} - {exp.endDate || "Present"}
                </Text>
                <View style={styles.list}>
                  {exp.points
                    ? exp.points.map((p, i) => (
                        <Text key={i} style={styles.listItem}>
                          • {p}
                        </Text>
                      ))
                    : exp.description && (
                        <Text style={styles.listItem}>• {exp.description}</Text>
                      )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {profile.education.map((edu, idx) => (
              <View key={idx} style={{ marginBottom: 2 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                </Text>
                <Text style={styles.text}>
                  {edu.institution} {edu.year ? `| ${edu.year}` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {renderSkills(profile.skills)}
            </View>
          </View>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {profile.projects.map((p, idx) => (
              <View key={idx} style={{ marginBottom: 2 }}>
                <Text style={{ fontWeight: "bold" }}>{p.name}</Text>
                <Text style={styles.text}>{p.description}</Text>
                {p.url && (
                  <Link src={p.url} style={styles.link}>
                    {p.url}
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Social Links */}
        {profile.social_links && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Social Links</Text>
            {profile.social_links.github && (
              <Link src={profile.social_links.github} style={styles.link}>
                GitHub
              </Link>
            )}
            {profile.social_links.linkedin && (
              <Link src={profile.social_links.linkedin} style={styles.link}>
                LinkedIn
              </Link>
            )}
          </View>
        )}

        {/* Interests */}
        {profile.interests?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {profile.interests.map((i, idx) => (
                <Text
                  key={idx}
                  style={{
                    fontSize: 8,
                    padding: 2,
                    marginRight: 4,
                    marginBottom: 2,
                    backgroundColor: "#eee",
                  }}
                >
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

export default Template10PDF;
