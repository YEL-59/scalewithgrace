import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Optional: Register custom font like Urbanist if you want (must provide font file or URL)
// Font.register({
//   family: "Urbanist",
//   src: "https://fonts.googleapis.com/css2?family=Urbanist&display=swap",
// });

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica", // replace with Urbanist if registered
    fontSize: 10,
    color: "#171717",
    padding: 40,
    backgroundColor: "#ffffff",
    width: "210mm",
    height: "297mm",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  nameContainer: {
    width: "60%",
  },
  firstName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#484848",
    letterSpacing: 2,
  },
  lastName: {
    fontWeight: "600",
  },
  jobTitle: {
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginTop: 4,
    color: "#484848",
  },
  websiteContainer: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  websiteText: {
    fontSize: 10,
    color: "#0077b6",
  },
  contactContainer: {
    width: "40%",
    justifyContent: "flex-end",
  },
  contactItem: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
  },
  contactIcon: {
    fontSize: 10,
    marginRight: 6,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    width: "45%",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 4,
  },
  rightColumn: {
    width: "55%",
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#666666",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingBottom: 4,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 10,
    color: "#171717",
  },
  list: {
    marginLeft: 12,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 10,
    marginBottom: 2,
  },
  boldText: {
    fontWeight: "bold",
  },
  link: {
    fontSize: 10,
    color: "#0077b6",
    textDecoration: "underline",
  },
  subText: {
    fontSize: 10,
    color: "#555555",
  },
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function Template4Pdf({ data }) {
  const profile = data?.user_profile || {};

  // Split full name for styling
  const [firstName, ...restName] = (profile.full_name || "").split(" ");
  const lastName = restName.join(" ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.firstName}>
              {firstName} <Text style={styles.lastName}>{lastName}</Text>
            </Text>
            <Text style={styles.jobTitle}>
              {profile.job_title || "Aspiring AI Developer"}
            </Text>
            {profile.website && (
              <View style={styles.websiteContainer}>
                <Text style={styles.link}>
                  {profile.website.startsWith("http")
                    ? profile.website
                    : `https://${profile.website}`}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.contactContainer}>
            {profile.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text>{profile.phone}</Text>
              </View>
            )}
            {profile.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>✉️</Text>
                <Text>{profile.email}</Text>
              </View>
            )}
            {profile.social_links?.linkedin && (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>🔗</Text>
                <Link
                  style={styles.link}
                  src={profile.social_links.linkedin}
                  target="_blank"
                >
                  linkedin.com/in/{firstName.toLowerCase()}
                </Link>
              </View>
            )}
            {profile.social_links?.github && (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>🐙</Text>
                <Link
                  style={styles.link}
                  src={profile.social_links.github}
                  target="_blank"
                >
                  github.com/{firstName.toLowerCase()}
                </Link>
              </View>
            )}
          </View>
        </View>

        {/* Body */}
        <View style={styles.sectionContainer}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* About */}
            {profile.summary?.profile && (
              <View>
                <Text style={styles.sectionTitle}>ABOUT</Text>
                <Text style={styles.paragraph}>{profile.summary.profile}</Text>
              </View>
            )}

            {/* Certifications */}
            {profile.certifications?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>
                  TRAINING & CERTIFICATIONS
                </Text>
                {profile.certifications.map((cert, idx) => (
                  <View key={idx} style={{ marginBottom: 8 }}>
                    <Text style={[styles.boldText, { fontSize: 10 }]}>
                      {cert.issuingOrganization}
                    </Text>
                    <Text style={{ fontSize: 10, fontWeight: "500" }}>
                      {cert.certificationName}
                    </Text>
                    <Text style={styles.subText}>
                      Earned: {cert.dateEarned}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {profile.skills?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>SKILLS</Text>
                {profile.skills.map((skill, idx) => (
                  <Text key={idx} style={{ fontSize: 10, marginBottom: 4 }}>
                    <Text style={styles.boldText}>{skill.title}: </Text>
                    {skill.badges.map((b) => b.name).join(", ")}
                  </Text>
                ))}
              </View>
            )}

            {/* Languages */}
            {profile.languages?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>LANGUAGES</Text>
                {profile.languages.map((lang, idx) => (
                  <View
                    key={idx}
                    style={[styles.flexBetween, { marginBottom: 4 }]}
                  >
                    <Text style={{ fontSize: 10 }}>{lang.name}</Text>
                    <Text style={{ fontSize: 10 }}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience */}
            {profile.experience?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                {profile.experience.map((exp, idx) => (
                  <View key={idx} style={{ marginBottom: 10 }}>
                    <Text style={[styles.boldText, { fontSize: 10 }]}>
                      {exp.title}
                    </Text>
                    <View style={styles.flexBetween}>
                      <Text style={{ fontSize: 10, fontWeight: "500" }}>
                        {exp.company}
                      </Text>
                      <Text style={{ fontSize: 10 }}>
                        {exp.startDate} – {exp.endDate}
                      </Text>
                    </View>
                    <View style={styles.list}>
                      {exp.points?.map((point, i) => (
                        <Text key={i} style={styles.listItem}>
                          • {point}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {profile.education?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>EDUCATION</Text>
                {profile.education.map((edu, idx) => (
                  <View key={idx} style={{ marginBottom: 10 }}>
                    <Text style={[styles.boldText, { fontSize: 10 }]}>
                      {edu.institution}
                    </Text>
                    <Text style={{ fontSize: 10, fontWeight: "500" }}>
                      {edu.degree} - {edu.location}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      {edu.startDate} – {edu.endDate}
                    </Text>
                    {edu.description && (
                      <Text style={{ fontSize: 10, marginTop: 2 }}>
                        {edu.description}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {profile.projects?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>PROJECTS</Text>
                {profile.projects.map((proj, idx) => (
                  <View key={idx} style={{ marginBottom: 10 }}>
                    <Text style={[styles.boldText, { fontSize: 10 }]}>
                      {proj.name}
                    </Text>
                    <Link
                      style={styles.link}
                      src={
                        proj.url.startsWith("http")
                          ? proj.url
                          : `https://${proj.url}`
                      }
                      target="_blank"
                    >
                      {proj.url}
                    </Link>
                    <Text style={{ fontSize: 10, marginTop: 2 }}>
                      {proj.description}
                    </Text>
                    <View style={styles.list}>
                      {proj.points?.map((point, i) => (
                        <Text key={i} style={styles.listItem}>
                          • {point}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
