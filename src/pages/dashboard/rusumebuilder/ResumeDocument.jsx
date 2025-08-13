// ResumeDocument.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 10 },
  header: { fontSize: 24, marginBottom: 10 },
  subHeader: { fontSize: 16, marginBottom: 6, fontWeight: "bold" },
  text: { marginBottom: 4 },
  listItem: { marginLeft: 10 },
  link: { color: "blue", textDecoration: "underline" },
});

export default function ResumeDocument({ data }) {
  if (!data || !data.user_profile)
    return (
      <Document>
        <Page>
          <Text>No data</Text>
        </Page>
      </Document>
    );

  const {
    full_name,
    job_title,
    email,
    phone,
    website,
    address,
    summary,
    education,
    experience,
    certifications,
    skills,
    projects,
    interests,
    social_links,
  } = data.user_profile;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.header}>{full_name}</Text>
          <Text style={styles.text}>{job_title}</Text>
          <Text style={styles.text}>
            {email} • {phone}
          </Text>
          {website && <Text style={styles.link}>{website}</Text>}
          {address && <Text>{address}</Text>}
        </View>

        {/* Summary */}
        {summary?.profile && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Podsumowanie zawodowe</Text>
            <Text>{summary.profile}</Text>
          </View>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Doświadczenie zawodowe</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontWeight: "bold" }}>{exp.title}</Text>
                <Text>
                  {exp.company} • {exp.location}{" "}
                  {exp.jobType && `(${exp.jobType})`}
                </Text>
                <Text>
                  {exp.startDate} - {exp.endDate}
                </Text>
                {exp.points?.length > 0 &&
                  exp.points.map((p, idx) => (
                    <Text key={idx} style={styles.listItem}>
                      • {p}
                    </Text>
                  ))}
                {exp.technologies && (
                  <Text>Technologie: {exp.technologies}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Wykształcenie</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {edu.degree} — {edu.institution}
                </Text>
                <Text>{edu.location}</Text>
                <Text>
                  {edu.startDate} - {edu.endDate}
                </Text>
                {edu.description && <Text>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Add other sections similarly: certifications, skills, projects, interests, social_links */}
      </Page>
    </Document>
  );
}
