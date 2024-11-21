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
import { formatGPA } from "@/utils/gpa";
Font.register({
  family: "IBM Plex Sans Arabic",
  src: "/fonts/Rubik-Regular.ttf",
});

export default function ElegantFormalTemplatePDF({ resumeData }) {
  const isArabic = resumeData.lng === "ar";
  const { lng } = resumeData;
  const t = translations[lng] || translations["en"];
  const theme = resumeData.theme || {
    primaryColor: "#2c3e50",
    backgroundColor: "#ecf0f1",
  };

  const styles = StyleSheet.create({
    page: {
      textAlign: isArabic ? "right" : "left",
      padding: 20,
      backgroundColor: "#FFFFFF",
      fontFamily: "IBM Plex Sans Arabic",
      color: "#333",
    },
    header: {
      textAlign: "center",
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: theme.primaryColor,
      borderBottomStyle: "solid",
      paddingBottom: 10,
    },
    name: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.primaryColor,
    },
    jobTitle: {
      fontSize: 16,
      color: "#4a5568",
    },
    contact: {
      marginBottom: 20,
      fontSize: 12,
      textAlign: "center",
      flexDirection: isArabic ? "row-reverse" : "row",
      gap: 5,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    section: {
      marginBottom: 30,
      paddingTop: 20,
      position: "relative",
    },
    sectionTitleContainer: {
      position: "absolute",
      top: -15,
      left: isArabic ? "auto" : 20,
      right: isArabic ? 20 : "auto",
      paddingHorizontal: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primaryColor,
      textTransform: "uppercase",
    },
    sectionBorder: {
      borderTopWidth: 1,
      borderTopColor: theme.primaryColor,
      borderTopStyle: "solid",
    },
    text: {
      fontSize: 12,
      lineHeight: 1.5,
    },
    experienceItem: {
      marginBottom: 15,
    },
    jobHeader: {
      flexDirection: isArabic ? "row-reverse" : "row",
      justifyContent: "space-between",
    },
    company: {
      fontWeight: "bold",
      fontSize: 12,
    },
    dates: {
      fontSize: 10,
      color: "#666",
    },
    skillsContainer: {
      flexDirection: isArabic ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 5,
    },
    skillItem: {
      padding: 5,
      width: "30%",
      backgroundColor: "#f0f4f8",
      borderRadius: 4,
      fontSize: 10,
    },
    progressBarContainer: {
      width: "100%",
      height: 8,
      backgroundColor: "#e2e2e2",
      borderRadius: 4,
    },
    progressBar: {
      height: "100%",
      borderRadius: 2,
    },
    languageRow: {
      width: "45%",
      padding: 5,
      marginBottom: "10px",
    },
  });

  return (
    <Document>
      <Page wrap={false} size={"A4"} style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
          <Text style={styles.jobTitle}>
            {resumeData.personalInfo.jobTitle}
          </Text>
        </View>
        <View style={styles.contact}>
          {resumeData.personalInfo.contact.map((contact, index) => (
            <Text key={index}>{contact}</Text>
          ))}
        </View>
        {/* About Section */}
        <View style={[styles.section, styles.sectionBorder]}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{t.profile}</Text>
          </View>
          <Text style={styles.text}>{resumeData.personalInfo.summary}</Text>
        </View>

        {/* Education Section */}
        <View style={[styles.section, styles.sectionBorder]}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{t.education}</Text>
          </View>
          {resumeData.educations.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.jobHeader}>
                <Text>{edu.degree}</Text>
                <View>
                  <Text style={styles.dates}>
                    {formatDate(edu.graduationDate)}
                  </Text>
                  <Text style={styles.dates}>
                    {formatGPA(edu.gpaType, edu.numericGpa, t, isArabic)}
                  </Text>
                </View>
              </View>
              <Text style={styles.company}>{edu.institution}</Text>
            </View>
          ))}
        </View>

        {/* Work Experience Section */}
        <View style={[styles.section, styles.sectionBorder]}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{t.workExperience}</Text>
          </View>
          {resumeData.experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.jobHeader}>
                <View
                  style={{
                    flexDirection: isArabic ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <Text>{exp.company}</Text>
                  <Text>-</Text>
                  <Text style={styles.company}>{exp.jobTitle}</Text>
                </View>
                <View
                  style={{
                    flexDirection: isArabic ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.dates}>{formatDate(exp.startDate)}</Text>
                  <Text style={styles.dates}>-</Text>
                  <Text style={styles.dates}>
                    {formatDate(exp.endDate, lng)}
                  </Text>
                </View>
              </View>
              <Text style={styles.text}>{exp.responsibilities}</Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={[styles.section, styles.sectionBorder]}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{t.skills}</Text>
          </View>
          <View style={styles.skillsContainer}>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                {t.availableSkills[`${skill.name}`] || skill.name} -{" "}
                {t.levels[skill.level.toLowerCase()] || skill.level}
              </Text>
            ))}
          </View>
        </View>
        {resumeData.courses.length > 0 && (
          <View style={[styles.section, styles.sectionBorder]}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>{t.courses}</Text>
            </View>
            {resumeData.courses.map((course, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <Text>{course.name}</Text>
                  <View>
                    <Text style={styles.dates}>
                      {formatDate(course.completionDate)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.company}>{course.institution}</Text>
              </View>
            ))}
          </View>
        )}
        {/* Languages Section */}
        <View style={[styles.section, styles.sectionBorder]}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{t.languages}</Text>
          </View>
          <View style={styles.skillsContainer}>
            {resumeData.languages.map((lang, index) => (
              <View key={index} style={styles.languageRow}>
                <Text style={[styles.text, { paddingBottom: "3px" }]}>
                  {lang.name}
                </Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={{
                      ...styles.progressBar,
                      width:
                        lang.proficiency === "native"
                          ? "100%"
                          : lang.proficiency === "fluent"
                          ? "80%"
                          : lang.proficiency === "intermediate"
                          ? "60%"
                          : lang.proficiency === "beginner"
                          ? "40%"
                          : "20%",
                      backgroundColor: "#666",
                    }}
                  ></View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
