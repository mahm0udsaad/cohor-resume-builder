import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";

// Assuming data, t, formatDate, and isArabic are passed in as props
export default function ModernFormalResumeTemplatePDF({
  resumeData,
  selectedTheme,
}) {
  const isArabic = resumeData.lng === "ar";
  const t = isArabic ? translations.ar : translations.en;

  const getSkillLevel = (level) => {
    switch (level) {
      case "expert":
        return "100%";
      case "experienced":
        return "70%";
      case "skillful":
        return "50%";
      default:
        return "30%";
    }
  };
  if (isArabic) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/ar.ttf",
    });
  }
  const theme = selectedTheme || {
    backgroundColor: "#ffffff",
    primaryColor: "#3498db",
  };

  const styles = StyleSheet.create({
    page: {
      fontFamily: isArabic ? "Amiri" : "Helvetica",
      padding: 20,
      backgroundColor: theme.backgroundColor,
      color: "#333",
      direction: isArabic ? "rtl" : "ltr",
    },
    header: {
      display: "flex",
      flexDirection: isArabic ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `2px solid ${theme.primaryColor}`,
      marginBottom: 20,
      paddingBottom: 10,
    },
    sectionTitle: {
      color: theme.primaryColor,
      borderBottom: `1px solid ${theme.primaryColor}`,
      paddingBottom: 10,
      marginBottom: 20,
      fontSize: 16,
    },
    personalInfo: {
      textAlign: isArabic ? "right" : "left",
      fontSize: 24,
      color: theme.primaryColor,
    },
    jobTitle: {
      textAlign: isArabic ? "right" : "left",

      fontSize: 18,
      color: "#7f8c8d",
    },
    content: {
      textAlign: isArabic ? "right" : "left",
      fontSize: 12,
      marginBottom: 20,
    },
    skillContainer: {
      display: "flex",
      textAlign: isArabic ? "right" : "left",
      justifyContent: "space-between",
      gap: 5,
    },
    skillBar: {
      textAlign: isArabic ? "right" : "left",
      height: 10,
      backgroundColor: "#ecf0f1",
      borderRadius: 5,
      overflow: "hidden",
      marginVertical: 5,
    },
    skillLevel: {
      height: "100%",
      backgroundColor: theme.primaryColor,
    },
  });

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.personalInfo}>
              {resumeData.personalInfo.name}
            </Text>
            <Text style={styles.jobTitle}>
              {resumeData.personalInfo.jobTitle}
            </Text>
          </View>
          <View>
            {resumeData.personalInfo.contact?.map((item, index) => (
              <Text key={index} style={styles.content}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <View
            style={{ width: "70%", display: "flex", flexDirection: "column" }}
          >
            <View>
              <Text style={styles.sectionTitle}>{t.profile}</Text>
              <Text style={styles.content}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>

            <View>
              <Text style={styles.sectionTitle}>{t.workExperience}</Text>
              {resumeData.experiences.map((job, index) => (
                <View key={index} style={styles.content}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {job.jobTitle}
                  </Text>
                  <Text style={{ paddingVertical: 4 }}>{`${
                    job.company
                  } | ${formatDate(job.startDate)} - ${formatDate(
                    job.endDate,
                    resumeData.lng,
                  )}`}</Text>
                  <Text>{job.responsibilities}</Text>
                </View>
              ))}
            </View>

            <View>
              <Text style={styles.sectionTitle}>{t.education}</Text>
              {resumeData.educations.map((edu, index) => (
                <View key={index} style={styles.content}>
                  <Text>{edu.degree}</Text>
                  <Text style={{ marginTop: 4 }}>{`${
                    edu.institution
                  }, ${formatDate(edu.graduationDate)}`}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right Col */}
          <View
            style={{ width: "30%", display: "flex", flexDirection: "column" }}
          >
            <View>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              {resumeData.skills.map((skill, index) => (
                <View key={index}>
                  <View style={styles.skillContainer}>
                    <Text style={{ fontSize: 14 }}>{skill.name}</Text>
                  </View>
                  <View style={styles.skillBar}>
                    <View
                      style={{
                        ...styles.skillLevel,
                        width: `${getSkillLevel(skill.level)}`,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>

            <View>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              {resumeData.languages.map((lang, index) => (
                <Text key={index} style={styles.content}>
                  {`${lang.name}: ${lang.proficiency}`}
                </Text>
              ))}
            </View>

            <View>
              <Text style={styles.sectionTitle}>{t.courses}</Text>
              {resumeData.courses.map((course, index) => (
                <View key={index} style={styles.content}>
                  <Text>{course.name}</Text>
                  <Text style={{ marginTop: 4 }}>{`${
                    course.institution
                  }, ${formatDate(course.completionDate)}`}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
