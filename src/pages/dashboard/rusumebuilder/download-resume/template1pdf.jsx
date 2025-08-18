import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20, // A4 margin
    fontSize: 10, // Base readable font size
    lineHeight: 1.5,
    color: "#333",
    flexDirection: "column",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  contact: {
    textAlign: "center",
    fontSize: 8,
    color: "#555",
    marginBottom: 12,
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 10,
    marginTop: 12,
    marginBottom: 6,
  },
  sectionLine: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginLeft: 6,
  },
  text: { marginBottom: 4 },
  listItem: { marginBottom: 3 },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 4,
  },
  column: { flex: 1 },
  link: { color: "blue", textDecoration: "underline" },
  subsection: { marginBottom: 10 },
});

const Template1PDF = ({ data }) => {
  if (!data?.user_profile) return <Text>No profile data available</Text>;
  const profile = data.user_profile;

  const stringSkills =
    profile.skills?.filter((skill) => typeof skill === "string") || [];
  const objectSkills =
    profile.skills?.filter(
      (skill) => typeof skill === "object" && skill.title
    ) || [];

  const splitInTwo = (arr) => {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  };

  const [skillsCol1, skillsCol2] = splitInTwo(stringSkills);
  const [eduCol1, eduCol2] = splitInTwo(profile.education || []);
  const [projCol1, projCol2] = splitInTwo(profile.projects || []);

  const renderTwoColumnList = (col1, col2, renderItem) => (
    <View style={styles.twoColumn}>
      <View style={styles.column}>{col1.map(renderItem)}</View>
      <View style={styles.column}>{col2.map(renderItem)}</View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Name */}
        <Text style={styles.name}>{profile.full_name}</Text>

        {/* Contact */}
        <Text style={styles.contact}>
          {profile.address} {"\n"}
          {profile.phone} · {profile.email}
        </Text>

        {/* Professional Summary */}
        {profile.summary?.profile && (
          <View style={styles.subsection}>
            <View style={styles.sectionTitle}>
              <Text>Professional Summary</Text>
              <View style={styles.sectionLine} />
            </View>
            <Text style={styles.text}>{profile.summary.profile}</Text>
          </View>
        )}

        {/* Websites / Social Links */}
        {(profile.website ||
          profile.social_links?.github ||
          profile.social_links?.linkedin) && (
          <View style={styles.subsection}>
            <View style={styles.sectionTitle}>
              <Text>Websites & Profiles</Text>
              <View style={styles.sectionLine} />
            </View>
            {profile.website && (
              <Text>
                <Link style={styles.link} src={profile.website}>
                  {profile.website}
                </Link>
              </Text>
            )}
            {profile.social_links?.github && (
              <Text>
                <Link style={styles.link} src={profile.social_links.github}>
                  {profile.social_links.github}
                </Link>
              </Text>
            )}
            {profile.social_links?.linkedin && (
              <Text>
                <Link style={styles.link} src={profile.social_links.linkedin}>
                  {profile.social_links.linkedin}
                </Link>
              </Text>
            )}
          </View>
        )}

        {/* Technical Skills */}
        {(stringSkills.length > 0 || objectSkills.length > 0) && (
          <View style={styles.subsection}>
            <View style={styles.sectionTitle}>
              <Text>Technical Skills</Text>
              <View style={styles.sectionLine} />
            </View>
            {renderTwoColumnList(skillsCol1, skillsCol2, (skill, i) => (
              <Text key={i} style={styles.listItem}>
                • {skill}
              </Text>
            ))}
            {objectSkills.length > 0 && (
              <View style={{ marginTop: 4 }}>
                {objectSkills.map((skill, idx) => (
                  <View key={idx} style={{ marginBottom: 4 }}>
                    <Text style={styles.bold}>{skill.title}</Text>
                    {skill.badges?.map((b, i) => (
                      <Text key={i} style={styles.listItem}>
                        {b.name} ({b.level})
                      </Text>
                    ))}
                    {skill.description && <Text>{skill.description}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <View style={styles.subsection}>
            <View style={styles.sectionTitle}>
              <Text>Experience</Text>
              <View style={styles.sectionLine} />
            </View>
            {profile.experience.map((job, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 10, color: "#555" }}>
                  {job.duration ||
                    `${job.startDate} - ${job.endDate || "Present"}`}
                </Text>
                <Text style={styles.bold}>{job.position || job.title}</Text>
                <Text style={styles.italic}>
                  {job.company} {job.location ? `– ${job.location}` : ""}
                </Text>
                {job.description && <Text>{job.description}</Text>}
                {job.points?.map((p, idx) => (
                  <Text key={idx}>• {p}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <View style={styles.subsection}>
            <View style={styles.sectionTitle}>
              <Text>Education</Text>
              <View style={styles.sectionLine} />
            </View>
            {renderTwoColumnList(eduCol1, eduCol2, (edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.bold}>{edu.degree}</Text>
                <Text style={styles.italic}>{edu.institution}</Text>
                {edu.year && <Text>{edu.year}</Text>}
                {edu.description && <Text>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {profile.projects?.length > 0 && (
          <View style={styles.subsection}>
            <View style={styles.sectionTitle}>
              <Text>Projects</Text>
              <View style={styles.sectionLine} />
            </View>
            {renderTwoColumnList(projCol1, projCol2, (proj, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.bold}>
                  {proj.name}{" "}
                  {proj.url && (
                    <Link style={styles.link} src={proj.url}>
                      (Link)
                    </Link>
                  )}
                </Text>
                {proj.description && <Text>{proj.description}</Text>}
                {proj.points?.map((p, idx) => (
                  <Text key={idx}>• {p}</Text>
                ))}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default Template1PDF;
