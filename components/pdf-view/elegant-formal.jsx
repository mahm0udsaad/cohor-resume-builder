import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

Font.register({
  family: "IBM Plex Sans Arabic",
  src: "/fonts/Rubik-Regular.ttf",
});

const ElegantFormalTemplatePDF = ({ resumeData }) => {
  const isArabic = resumeData.lng === "ar";
  const { lng } = resumeData;
  const t = translations[lng] || translations["en"];
  const theme = resumeData.theme || {
    primaryColor: "2c3e50",
    backgroundColor: "#ecf0f1",
  };
  const styles = StyleSheet.create({
    page: {
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      backgroundColor: "#ffffff",
      padding: 20,
      textAlign: isArabic ? "right" : "left",
    },
    header: {
      borderBottom: `2px solid ${theme.primaryColor}`,
      paddingBottom: 20,
      marginBottom: 20,
      textAlign: isArabic ? "right" : "left",
    },
    name: {
      fontSize: 32,
      fontWeight: "extrabold",
      color: theme.primaryColor,
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: 18,
      color: "#7f8c8d",
      marginBottom: 14,
    },
    contact: {
      fontSize: 14,
      color: "#34495e",
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.primaryColor,
      borderLeft: isArabic ? "none" : `4px solid ${theme.primaryColor}`,
      borderRight: isArabic ? `4px solid ${theme.primaryColor}` : "none",
      paddingLeft: isArabic ? 0 : 10,
      paddingRight: isArabic ? 10 : 0,
      marginBottom: 15,
    },
    experienceItem: {
      marginBottom: 20,
      position: "relative",
      paddingLeft: isArabic ? 0 : 10,
      paddingRight: isArabic ? 10 : 0,
      display: "flex",
    },
    bullet: {
      position: "absolute",
      marginTop: 3,
      left: resumeData.lng === "ar" ? "" : -4,
      right: resumeData.lng === "ar" ? -4 : "",
      top: resumeData.lng === "ar" ? 3 : 1,
      width: "10px",
      height: "10px",
      backgroundColor: theme.primaryColor,
      borderRadius: "50%",
    },
    skillItem: {
      backgroundColor: theme.backgroundColor,
      color: theme.primaryColor,
      padding: "5px 10px",
      borderRadius: 3,
      fontSize: 14,
      border: `1px solid ${theme.primaryColor}`,
      marginBottom: 5,
      marginRight: 5,
    },
    languages: {
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#34495e",
      marginBottom: 5,
    },
    dates: {
      marginBottom: 2,
      marginTop: 2,
      fontSize: 12,
      color: "#7f8c8d",
    },
    bodyText: {
      fontSize: 14,
      color: "#333",
      marginBottom: 5,
    },
  });

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
          <Text style={styles.jobTitle}>
            {resumeData.personalInfo.jobTitle}
          </Text>
          <Text style={styles.contact}>
            {resumeData.personalInfo.contact.join(" | ")}
          </Text>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.bodyText}>{resumeData.personalInfo.summary}</Text>
        </View>

        {/* Work Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.workExperience}</Text>
          {resumeData.experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.bullet}></View>
              <View>
                <Text style={styles.subtitle}>{exp.jobTitle}</Text>
                <Text style={styles.bodyText}>{exp.company}</Text>
                <View
                  style={{
                    flexDirection: isArabic ? "row-reverse" : "row",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Text style={styles.dates}>{formatDate(exp.startDate)}</Text>
                  <Text style={styles.dates}>-</Text>
                  <Text style={styles.dates}>
                    {exp.isCurrentJob
                      ? t.present
                      : formatDate(exp.endDate, resumeData.lng)}
                  </Text>
                </View>
                <Text style={styles.bodyText}>{exp.responsibilities}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Education Section */}
        {resumeData.educations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.education}</Text>
            {resumeData.educations.map((edu, index) => (
              <View style={{ marginBottom: 10 }} key={index}>
                <Text style={styles.subtitle}>{edu.degree}</Text>
                <Text style={styles.bodyText}>{edu.institution}</Text>
                <Text style={styles.dates}>
                  {formatDate(edu.graduationDate)}
                </Text>
                {edu.gpaType === "percentage" && (
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: isArabic ? "right" : "left",
                    }}
                  >
                    {t.gpa}: {edu.numericGpa}%
                  </Text>
                )}
                {edu.gpaType === "outOf4" && (
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: isArabic ? "right" : "left",
                    }}
                  >
                    {t.gpa}: {edu.numericGpa}/4
                  </Text>
                )}
                {edu.gpaType === "outOf5" && (
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: isArabic ? "right" : "left",
                    }}
                  >
                    {t.gpa}: {edu.numericGpa}/5
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          <View
            style={{
              flexDirection: isArabic ? "row-reverse" : "row",
              flexWrap: "wrap",
            }}
          >
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                {t.availableSkills[`${skill.name}`] || skill.name}(
                {t.levels[skill.level.toLowerCase()] || skill.level})
              </Text>
            ))}
          </View>
        </View>

        {/* Languages Section */}
        {resumeData.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.languages}</Text>
            {resumeData.languages.map((lang, index) => (
              <Text key={index} style={styles.languages}>
                <View
                  style={{ flexDirection: isArabic ? "row-reverse" : "row" }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {lang.name}:
                  </Text>
                  <Text style={{ fontSize: 10 }}>
                    {t[lang.proficiency.toLowerCase()] || lang.proficiency}
                  </Text>
                </View>
              </Text>
            ))}
          </View>
        )}

        {/* Courses Section */}
        {resumeData.courses.length > 0 &&
          resumeData.courses[0].name.trim() !== "" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.courses}</Text>
              {resumeData.courses.map((course, index) => (
                <View style={{ marginBottom: 5 }} key={index}>
                  <Text style={styles.subtitle}>{course.name}</Text>
                  <Text style={styles.dates}>
                    {course.institution} - {formatDate(course.completionDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}
      </Page>
    </Document>
  );
};

export default ElegantFormalTemplatePDF;
