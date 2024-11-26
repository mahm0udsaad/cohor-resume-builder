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
import React from "react";

export default function BlueHorizonPDF({ resumeData }) {
  const isArabic = resumeData.lng === "ar";
  const t = translations[resumeData.lng] || translations["en"];

  Font.register({
    family: "IBM Plex Sans Arabic",
    src: "/fonts/Rubik-Regular.ttf",
  });

  // Default theme values in case selectedTheme is undefined
  const defaultTheme = {
    primaryColor: "#2b2d2e",
    backgroundColor: "#ffffff",
    accentColor: "#343a40",
  };

  const theme = resumeData.theme || defaultTheme;

  const styles = StyleSheet.create({
    page: {
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      backgroundColor: "white",
    },
    container: {
      flexDirection: isArabic ? "row-reverse" : "row",
      width: "100%",
      minHeight: 641.89,
    },
    sidebar: {
      textAlign: isArabic ? "right" : "left",
      width: "30%",
      backgroundColor: theme.primaryColor,
      color: "#fff",
      padding: 20,
    },
    main: {
      width: "70%",
      padding: 16,
      textAlign: isArabic ? "right" : "left",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 600,
      borderBottom: "1px solid white",
      paddingBottom: 5,
      marginBottom: 10,
    },
    mainSectionTitle: {
      fontSize: 16,
      fontWeight: 600,
      borderBottom: `1px solid ${theme.primaryColor}`,
      color: theme.primaryColor,
      paddingBottom: 5,
      marginBottom: 10,
      marginTop: 10,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
    skillBar: {
      backgroundColor: "white",
      height: 10,
      borderRadius: 5,
      overflow: "hidden",
      marginBottom: 10,
    },
    skillLevel: {
      backgroundColor: "#4caf50",
      height: "100%",
    },
    experienceItem: {
      marginBottom: 10,
    },
    educationItem: {
      marginBottom: 10,
    },
    courseItem: {
      marginBottom: 10,
    },
  });

  const getSkillWidth = (level) => {
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

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.container}>
          <View style={styles.sidebar}>
            <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
              {resumeData.personalInfo.name}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 400, marginBottom: 20 }}>
              {resumeData.personalInfo.jobTitle}
            </Text>

            {/* Contact Information */}
            <Text style={styles.sectionTitle}>{t.contactInformation}</Text>
            {resumeData.personalInfo.contact?.map((item, index) => (
              <Text key={index} style={{ fontSize: 10, marginBottom: 5 }}>
                {item}
              </Text>
            ))}

            {/* Skills */}
            <Text style={styles.sectionTitle}>{t.skills}</Text>
            {resumeData.skills.map((skill, index) => (
              <View key={index}>
                <Text style={styles.text}>
                  {t.availableSkills[`${skill.name}`] || skill.name}
                </Text>
                <View style={styles.skillBar}>
                  <View
                    style={[
                      styles.skillLevel,
                      { width: getSkillWidth(skill.level) },
                    ]}
                  ></View>
                </View>
              </View>
            ))}

            {/* Languages */}
            <Text style={styles.sectionTitle}>{t.languages}</Text>
            {resumeData.languages.map((lang, index) => (
              <Text key={index} style={styles.text}>
                <Text style={{ fontWeight: 700 }}>{lang.name}:</Text>{" "}
                {t[lang.proficiency.toLowerCase()]}
              </Text>
            ))}
          </View>

          {/* Main Section */}
          <View style={styles.main}>
            {/* Profile Summary */}
            <Text style={styles.mainSectionTitle}>{t.profile}</Text>
            <Text style={styles.text}>{resumeData.personalInfo.summary}</Text>

            {/* Work Experience */}
            <Text style={styles.mainSectionTitle}>{t.workExperience}</Text>
            {resumeData.experiences.map((job, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>
                  {job.jobTitle}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 300 }}>
                  {job.company}
                </Text>
                <View
                  style={{
                    flexDirection: isArabic ? "row-reverse" : "row",
                    alignItems: "center",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Text
                    style={{ fontSize: 12, paddingVertical: 4, color: "#666" }}
                  >
                    {formatDate(job.startDate)}
                  </Text>
                  <Text
                    style={{ fontSize: 12, paddingVertical: 4, color: "#666" }}
                  >
                    -{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 12, paddingVertical: 4, color: "#666" }}
                  >
                    {job.isCurrentJob
                      ? t.present
                      : formatDate(job.endDate, resumeData.lng)}
                  </Text>
                </View>
                <Text style={styles.text}>{job.responsibilities}</Text>
              </View>
            ))}

            {/* Education */}
            <Text style={styles.mainSectionTitle}>{t.education}</Text>
            {resumeData.educations.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>
                  {edu.degree}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 300 }}>
                  {edu.institution}
                </Text>
                <Text
                  style={{ fontSize: 12, paddingVertical: 4, color: "#666" }}
                >
                  {formatDate(edu.graduationDate)}
                </Text>
                {edu.gpaType === "percentage" && (
                  <Text
                    style={{
                      fontSize: 8,
                      color: "#4B5563",
                      textAlign: isArabic ? "right" : "left",
                    }}
                  >
                    {t.gpa}: {edu.numericGpa}%
                  </Text>
                )}
                {edu.gpaType === "outOf4" && (
                  <Text
                    style={{
                      fontSize: 8,
                      color: "#4B5563",
                      textAlign: isArabic ? "right" : "left",
                    }}
                  >
                    {t.gpa}: {edu.numericGpa}/4
                  </Text>
                )}
                {edu.gpaType === "outOf5" && (
                  <Text
                    style={{
                      fontSize: 8,
                      color: "#4B5563",
                      textAlign: isArabic ? "right" : "left",
                    }}
                  >
                    {t.gpa}: {edu.numericGpa}/5
                  </Text>
                )}
              </View>
            ))}

            {/* Courses */}
            {resumeData.courses[0]?.name.trim() !== "" && (
              <>
                <Text style={styles.mainSectionTitle}>{t.courses}</Text>
                {resumeData.courses.map((course, index) => (
                  <View key={index} style={styles.courseItem}>
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>
                      {course.name}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: 300 }}>
                      {course.institution}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        paddingVertical: 4,
                        color: "#666",
                      }}
                    >
                      {formatDate(course.completionDate)}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
