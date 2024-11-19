import { memo } from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";

// Define the styles using react-pdf StyleSheet.create
const createStyles = (theme, isRTL) =>
  StyleSheet.create({
    page: {
      fontFamily: isRTL ? "IBM Plex Sans Arabic" : "Helvetica",
    },
    header: {
      backgroundColor: theme.primaryColor,
      color: "white",
      padding: "20px",
      textAlign: "center",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    headerImage: {
      width: 150,
      height: 150,
      borderRadius: "50%",
      border: "4px solid white",
      marginBottom: "10px",
    },
    courseTitle: {
      textAlign: isRTL ? "right" : "left",
      fontSize: "13px", // Matches 1.1rem in web
      fontWeight: "bold",
      color: theme.primaryColor,
      marginBottom: "4px",
    },
    institution: {
      textAlign: isRTL ? "right" : "left",
      fontSize: "12px", // Regular paragraph size
      marginBottom: "4px",
    },
    completionDate: {
      marginTop: "4px",
      textAlign: isRTL ? "right" : "left",
      fontSize: "10px", // Matches 0.9rem in web
      color: theme.secondaryColor,
    },
    sectionTitle: {
      color: theme.primaryColor,
      textAlign: isRTL ? "right" : "left",
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      textTransform: "uppercase",
    },
    text: {
      lineHeight: 1.6,
      textAlign: isRTL ? "right" : "left",
      fontSize: "12px",
      marginBottom: "10px",
    },
    timelineItem: {
      position: "relative",
      paddingBottom: "20px",
      borderLeft: isRTL ? "none" : `2px solid ${theme.secondaryColor}`,
      borderRight: isRTL ? `2px solid ${theme.secondaryColor}` : "none",
      paddingLeft: isRTL ? "" : "10px",
      paddingRight: !isRTL ? "" : "10px",
    },
    timelineDot: {
      position: "absolute",
      left: isRTL ? "" : "-5px",
      right: !isRTL ? "" : "-5px",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: theme.primaryColor,
    },
    skills: {
      display: "flex",
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
    },
    skillBadge: {
      textAlign: isRTL ? "right" : "left",
      backgroundColor: theme.backgroundColor,
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "14px",
      marginRight: "5px",
      marginBottom: "5px",
    },
    languages: {
      display: "flex",
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
    },
    languageBadge: {
      textAlign: isRTL ? "right" : "left",
      backgroundColor: theme.backgroundColor,
      padding: "5px 10px",
      borderRadius: "8px",
      fontSize: "14px",
      marginRight: "5px",
      marginBottom: "5px",
    },
    subHeader: {
      textAlign: isRTL ? "right" : "left",
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: 10,
    },
  });

function CreativeTimelineResumeTemplatePDF({ resumeData }) {
  const theme = resumeData.theme || {
    id: "creative-timeline",
    name: "Creative Timeline",
    primaryColor: "#6b46c1",
    secondaryColor: "#9f7aea",
    backgroundColor: "#f7fafc",
    textColor: "#2d3748",
  };

  const isRTL = resumeData.lng === "ar"; // RTL detection for Arabic
  const t = translations[resumeData.lng] || translations.en;
  if (isRTL) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/Cairo-Medium.ttf",
    });
  }
  const styles = createStyles(theme, isRTL);

  return (
    <Document>
      <Page wrap={false} size={"B4"} style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            src={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
            style={styles.headerImage}
          />
          <Text style={{ fontSize: "25px" }}>
            {resumeData.personalInfo.name}
          </Text>
          <Text style={{ fontSize: "16px", marginTop: "10px" }}>
            {resumeData.personalInfo.jobTitle}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
              marginTop: "10px",
            }}
          >
            {resumeData.personalInfo.contact?.map((item, index) => (
              <Text key={index} style={{ fontSize: "12px" }}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        {/* Summary */}
        <View style={{ padding: "20px" }}>
          <View style={{ marginBottom: "20px" }}>
            <Text style={styles.sectionTitle}>{t.profile}</Text>
            <Text style={styles.text}>{resumeData.personalInfo.summary}</Text>
          </View>

          {/* Work Experience */}
          <View wrap={false} style={{ marginBottom: "20px" }}>
            <Text style={styles.sectionTitle}>{t.workExperience}</Text>
            {resumeData.experiences.map((exp, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineDot}></View>
                <Text
                  style={{ ...styles.subHeader, color: theme.primaryColor }}
                >
                  {exp.jobTitle}
                </Text>
                <Text style={styles.subHeader}>{exp.company}</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: isRTL ? "row-reverse" : "row",
                    gap: 4,
                  }}
                >
                  <Text style={styles.text}>{formatDate(exp.startDate)}</Text>
                  <Text style={styles.text}>-</Text>
                  <Text style={styles.text}>
                    {exp.isCurrentJob
                      ? t.present
                      : formatDate(exp.endDate, resumeData.lng)}
                  </Text>
                </View>
                <Text style={styles.text}>{exp.responsibilities}</Text>
              </View>
            ))}
          </View>

          {/* Skills */}
          <View wrap={false} style={{ marginBottom: "20px" }}>
            <Text style={styles.sectionTitle}>{t.skills}</Text>
            <View style={styles.skills}>
              {resumeData.skills.map((skill, index) => (
                <Text key={index} style={styles.skillBadge}>
                  {t.availableSkills[`${skill.name}`] || skill.name}
                </Text>
              ))}
            </View>
          </View>

          {/* Education */}
          <View wrap={false} style={{ marginBottom: "20px" }}>
            <Text style={styles.sectionTitle}>{t.education}</Text>
            {resumeData.educations.map((edu, index) => (
              <View style={{ marginBottom: 8 }} key={index}>
                <Text style={styles.subHeader}>{edu.degree}</Text>
                <Text style={styles.subHeader}>{edu.institution}</Text>
                <Text style={styles.text}>
                  {formatDate(edu.graduationDate)}
                </Text>
                {edu.gpaType === "percentage" && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#4B5563",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t.gpa}:{" "}
                    {isRTL ? `%${edu.numericGpa}` : `${edu.numericGpa}%`}
                  </Text>
                )}
                {edu.gpaType === "outOf4" && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#4B5563",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t.gpa}: {edu.numericGpa}/4
                  </Text>
                )}
                {edu.gpaType === "outOf5" && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#4B5563",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t.gpa}: {edu.numericGpa}/5
                  </Text>
                )}
              </View>
            ))}
          </View>

          {resumeData.languages.length !== 0 &&
            resumeData.languages[0]?.name.trim() !== "" && (
              <View wrap={false} style={{ marginBottom: "20px" }}>
                <Text style={styles.sectionTitle}>{t.languages}</Text>
                <View style={styles.languages}>
                  {resumeData.languages.map((lang, index) => (
                    <Text key={index} style={styles.languageBadge}>
                      {lang.name} - {t[lang.proficiency.toLowerCase()]}
                    </Text>
                  ))}
                </View>
              </View>
            )}

          {/* Courses */}
          {resumeData.courses.length !== 0 &&
            resumeData.courses[0]?.name.trim() !== "" && (
              <View wrap={false} style={{ marginBottom: "20px" }}>
                <Text style={styles.sectionTitle}>{t.courses}</Text>
                {resumeData.courses.map((course, index) => (
                  <View
                    style={{
                      marginBottom: 8,
                    }}
                    key={index}
                  >
                    <Text style={styles.courseTitle}>{course.name}</Text>
                    <Text style={styles.institution}>{course.institution}</Text>
                    <Text style={styles.completionDate}>
                      {formatDate(course.completionDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
        </View>
      </Page>
    </Document>
  );
}

export default memo(CreativeTimelineResumeTemplatePDF);
