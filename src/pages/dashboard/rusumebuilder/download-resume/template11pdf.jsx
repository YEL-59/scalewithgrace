import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#1e293b", // slate-900
    color: "#ffffff",
    fontSize: 10,
    fontFamily: "Helvetica",
    padding: 16,
  },
  sidebar: {
    width: "35%",
    backgroundColor: "#111827", // gray-900
    padding: 12,
  },
  main: {
    width: "65%",
    padding: 12,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  sectionTitle: {
    backgroundColor: "#f97316", // orange-500
    color: "#fff",
    padding: 4,
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 6,
  },
  skillItem: {
    backgroundColor: "#374151", // gray-700
    padding: 2,
    margin: 2,
    borderRadius: 2,
    fontSize: 8,
  },
  sidebarText: {
    marginBottom: 4,
  },
  header: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#4b5563", // gray-700
    paddingBottom: 4,
  },
  name: {
    fontSize: 16,
    color: "#84cc16", // lime-400
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 10,
    color: "#d1d5db", // gray-300
  },
  sectionContainer: {
    marginBottom: 8,
  },
  expBox: {
    backgroundColor: "rgba(55,65,81,0.4)", // gray-700/40
    padding: 6,
    marginBottom: 6,
    borderRadius: 4,
  },
  expTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#84cc16",
  },
  expDuration: {
    fontSize: 8,
    color: "#9ca3af", // gray-400
  },
  expDesc: {
    fontSize: 9,
    marginTop: 2,
    color: "#d1d5db",
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#84cc16",
  },
  projectUrl: {
    fontSize: 8,
    color: "#60a5fa",
  },
});

const Template11PDF = ({ data }) => {
  if (!data?.user_profile) return <Text>No profile data available</Text>;
  const profile = data.user_profile;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {profile.avatar && (
            <Image style={styles.profileImage} src={profile.avatar} />
          )}

          {/* Contact */}
          {(profile.phone ||
            profile.email ||
            profile.address ||
            profile.website) && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>CONTACT</Text>
              {profile.phone && (
                <Text style={styles.sidebarText}>📞 {profile.phone}</Text>
              )}
              {profile.email && (
                <Text style={styles.sidebarText}>✉️ {profile.email}</Text>
              )}
              {profile.address && (
                <Text style={styles.sidebarText}>📍 {profile.address}</Text>
              )}
              {profile.website && (
                <Text style={styles.sidebarText}>🌐 {profile.website}</Text>
              )}
            </View>
          )}

          {/* Education */}
          {profile.education?.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {profile.education.map((edu, idx) => (
                <View key={idx} style={{ marginBottom: 4 }}>
                  <Text style={{ fontWeight: "bold", color: "#a3e635" }}>
                    {edu.year}
                  </Text>
                  <Text>{edu.degree}</Text>
                  <Text style={{ color: "#9ca3af" }}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {profile.skills?.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>SKILLS</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {profile.skills.map((skill, idx) => (
                  <Text key={idx} style={styles.skillItem}>
                    {typeof skill === "string" ? skill : skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{profile.full_name.toUpperCase()}</Text>
            {profile.job_title && (
              <Text style={styles.jobTitle}>{profile.job_title}</Text>
            )}
          </View>

          {/* Profile / Summary */}
          {profile.summary?.profile && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>PROFILE</Text>
              <Text style={{ fontSize: 9, marginTop: 2, color: "#d1d5db" }}>
                {profile.summary.profile}
              </Text>
            </View>
          )}

          {/* Work Experience */}
          {profile.experience?.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
              {profile.experience.map((exp, idx) => (
                <View key={idx} style={styles.expBox}>
                  <Text style={styles.expTitle}>
                    {exp.position || exp.title}
                  </Text>
                  <Text style={styles.expDuration}>
                    {exp.startDate || exp.duration} — {exp.company}
                  </Text>
                  <Text style={styles.expDesc}>
                    {exp.points ? exp.points.join(", ") : exp.description}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {profile.projects?.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>PROJECTS</Text>
              {profile.projects.map((p, idx) => (
                <View key={idx} style={{ marginBottom: 4 }}>
                  <Text style={styles.projectTitle}>{p.name}</Text>
                  <Text style={{ fontSize: 9, color: "#d1d5db" }}>
                    {p.description}
                  </Text>
                  {p.url && <Text style={styles.projectUrl}>{p.url}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default Template11PDF;
