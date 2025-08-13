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

// Optional: register Urbanist font if you have the font file or use a standard font
// Font.register({ family: 'Urbanist', src: '/path/to/Urbanist-Regular.ttf' });

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica", // Replace with Urbanist if registered
    fontSize: 10,
    padding: 20,
    backgroundColor: "#fff",
    color: "#171717",
  },
  header: {
    backgroundColor: "#373739",
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
    position: "relative",
  },
  nameTitleContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  jobTitle: {
    marginTop: 6,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FF4089",
    position: "absolute",
    right: 60,
    bottom: -50,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  body: {
    flexDirection: "row",
    marginTop: 70,
    gap: 10,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    flexShrink: 0,
  },
  sectionUnderline: {
    flexGrow: 1,
    height: 2,
    backgroundColor: "#D9D9D9",
    marginLeft: 6,
    maxWidth: 100,
  },
  borderLeftAccent: {
    borderLeftWidth: 3,
    borderLeftColor: "#FF4089",
    paddingLeft: 8,
  },
  experienceItem: {
    marginBottom: 12,
  },
  expTitle: {
    fontWeight: "bold",
    fontSize: 10,
  },
  expCompany: {
    fontSize: 9,
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expDescription: {
    fontSize: 9,
    marginTop: 4,
  },
  aboutSection: {
    marginBottom: 20,
    textAlign: "center",
  },
  contactSection: {
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contactIconPlaceholder: {
    width: 18,
    height: 18,
    marginRight: 8,
    textAlign: "center",
    fontSize: 12,
    color: "#79819A",
  },
  contactText: {
    fontSize: 9,
  },
  contactLink: {
    fontSize: 9,
    color: "#FF4089",
    textDecoration: "underline",
  },
  skillsList: {
    flexDirection: "column",
    alignItems: "center",
  },
  skillGroup: {
    marginBottom: 10,
    width: "100%",
    maxWidth: 300,
  },
  skillTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  skillBadgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
  },
  skillBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 9,
  },
  skillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  languageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    marginVertical: 12,
  },
});

// Skill level to color
const levelToColor = (level) => {
  switch ((level || "").toLowerCase()) {
    case "beginner":
      return "#FBBF24"; // yellow-400
    case "intermediate":
      return "#3B82F6"; // blue-500
    case "advanced":
    case "expert":
      return "#16A34A"; // green-600
    default:
      return "#9CA3AF"; // gray-400
  }
};

const iconPlaceholders = {
  phone: "📞",
  address: "📍",
  email: "✉️",
  website: "🌐",
  linkedin: "in",
  github: "gh",
};

export function Template7pdf({ data, userImage }) {
  const profile = data?.user_profile || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    // Example simple format: "1-apr-2018" -> "Apr 2018"
    try {
      const d = new Date(dateStr);
      if (!isNaN(d)) {
        return d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        });
      }
      // fallback for strings like "1-apr-2018"
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        return `${parts[1].charAt(0).toUpperCase() + parts[1].slice(1)} ${
          parts[2]
        }`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.nameTitleContainer}>
            <Text style={styles.name}>
              {profile.full_name || "ALEX STEVENS"}
            </Text>
            <Text style={styles.jobTitle}>
              {profile.job_title || "PROJECT MANAGER"}
            </Text>
          </View>
          {userImage && (
            <View style={styles.profileImageContainer}>
              <Image src={userImage} style={styles.profileImage} />
            </View>
          )}
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Left Column */}
          <View style={styles.column}>
            {/* Experience */}
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                <View style={styles.sectionUnderline} />
              </View>
              <View style={styles.borderLeftAccent}>
                {(profile.experience?.length ?? 0) > 0 ? (
                  profile.experience.map((exp, i) => (
                    <View key={i} style={styles.experienceItem}>
                      <Text style={styles.expTitle}>{exp.title}</Text>
                      <View style={styles.expCompany}>
                        <Text>{`${exp.company}, ${exp.location || ""}`}</Text>
                        <Text>
                          {formatDate(exp.startDate)} –{" "}
                          {formatDate(exp.endDate)}
                        </Text>
                      </View>
                      <Text style={styles.expDescription}>
                        {exp.points?.join(" ")}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={{ fontStyle: "italic" }}>
                    No experience data available.
                  </Text>
                )}
              </View>
            </View>

            {/* Education */}
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>EDUCATION</Text>
                <View style={styles.sectionUnderline} />
              </View>
              <View style={styles.borderLeftAccent}>
                {(profile.education?.length ?? 0) > 0 ? (
                  profile.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: i > 0 ? 12 : 0 }}>
                      <Text style={styles.expTitle}>{edu.institution}</Text>
                      <View style={styles.expCompany}>
                        <Text>{edu.degree}</Text>
                        <Text>{edu.location || ""}</Text>
                      </View>
                      <Text>
                        {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                      </Text>
                      {edu.description && (
                        <Text style={{ marginTop: 4 }}>{edu.description}</Text>
                      )}
                    </View>
                  ))
                ) : (
                  <Text style={{ fontStyle: "italic" }}>
                    No education data available.
                  </Text>
                )}
              </View>
            </View>

            {/* Training/Certifications */}
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>TRAINING</Text>
                <View style={styles.sectionUnderline} />
              </View>
              <View style={styles.borderLeftAccent}>
                {(profile.certifications?.length ?? 0) > 0 ? (
                  profile.certifications.map((cert, i) => (
                    <View key={i} style={{ marginBottom: i > 0 ? 12 : 0 }}>
                      <Text style={styles.expTitle}>
                        {cert.issuingOrganization}
                      </Text>
                      <Text style={styles.expCompany}>
                        {cert.certificationName}
                      </Text>
                      <Text>{formatDate(cert.dateEarned)}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={{ fontStyle: "italic" }}>
                    No training data available.
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={{ width: 1, backgroundColor: "#D9D9D9" }} />

          {/* Right Column */}
          <View style={styles.column}>
            {/* About Me */}
            <View style={styles.aboutSection}>
              <Text style={[styles.sectionTitle, { textAlign: "center" }]}>
                ABOUT ME
              </Text>
              <Text>
                {profile.summary?.profile ||
                  "Experienced Senior Project Manager with over 10 years in the German tech industry. Specializing in agile methodologies, cross-functional team leadership, and delivering complex software solutions. Passionate about driving innovation and exceeding client expectations."}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* Contact */}
            <View style={styles.contactSection}>
              <Text style={[styles.sectionTitle, { textAlign: "center" }]}>
                CONTACT
              </Text>
              <View>
                {profile.phone && (
                  <View style={styles.contactRow}>
                    <Text style={styles.contactIconPlaceholder}>
                      {iconPlaceholders.phone}
                    </Text>
                    <Link
                      src={`tel:${profile.phone}`}
                      style={styles.contactLink}
                    >
                      {profile.phone}
                    </Link>
                  </View>
                )}
                {profile.address && (
                  <View style={styles.contactRow}>
                    <Text style={styles.contactIconPlaceholder}>
                      {iconPlaceholders.address}
                    </Text>
                    <Text style={styles.contactText}>{profile.address}</Text>
                  </View>
                )}
                {profile.email && (
                  <View style={styles.contactRow}>
                    <Text style={styles.contactIconPlaceholder}>
                      {iconPlaceholders.email}
                    </Text>
                    <Link
                      src={`mailto:${profile.email}`}
                      style={styles.contactLink}
                    >
                      {profile.email}
                    </Link>
                  </View>
                )}
                {profile.website && (
                  <View style={styles.contactRow}>
                    <Text style={styles.contactIconPlaceholder}>
                      {iconPlaceholders.website}
                    </Text>
                    <Link
                      src={
                        profile.website.startsWith("http")
                          ? profile.website
                          : `https://${profile.website}`
                      }
                      style={styles.contactLink}
                    >
                      {profile.website.replace(/^https?:\/\//, "")}
                    </Link>
                  </View>
                )}
                {/* Social links */}
                {(profile.social_links?.linkedin ||
                  profile.social_links?.github) && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 8,
                      gap: 10,
                    }}
                  >
                    {profile.social_links.linkedin && (
                      <Link
                        src={profile.social_links.linkedin}
                        style={[styles.contactLink, { marginRight: 10 }]}
                      >
                        LinkedIn
                      </Link>
                    )}
                    {profile.social_links.github && (
                      <Link
                        src={profile.social_links.github}
                        style={styles.contactLink}
                      >
                        GitHub
                      </Link>
                    )}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.divider} />

            {/* Skills */}
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.sectionTitle, { textAlign: "center" }]}>
                SKILL
              </Text>
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, i) => (
                  <View key={i} style={styles.skillGroup}>
                    <Text style={styles.skillTitle}>{skill.title}</Text>
                    <View style={styles.skillBadgesContainer}>
                      {skill.badges?.map((badge, j) => (
                        <View
                          key={j}
                          style={styles.skillBadge}
                          title={`${badge.name} - ${badge.level}`}
                        >
                          <View
                            style={[
                              styles.skillDot,
                              { backgroundColor: levelToColor(badge.level) },
                            ]}
                          />
                          <Text style={{ textTransform: "capitalize" }}>
                            {badge.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ fontStyle: "italic" }}>No skills listed</Text>
              )}
            </View>

            <View style={styles.divider} />

            {/* Languages */}
            <View>
              <Text style={[styles.sectionTitle, { textAlign: "center" }]}>
                LANGUAGE
              </Text>
              {(profile.languages?.length ?? 0) > 0 ? (
                profile.languages.map((lang, i) => (
                  <View key={i} style={styles.languageRow}>
                    <Text>{lang.name}</Text>
                    <Text>{lang.level || ""}</Text>
                  </View>
                ))
              ) : (
                <>
                  <View style={styles.languageRow}>
                    <Text>German</Text>
                    <Text>Native</Text>
                  </View>
                  <View style={styles.languageRow}>
                    <Text>English</Text>
                    <Text>Fluent</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
