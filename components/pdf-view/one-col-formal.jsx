import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";
Font.register({
  family: "IBM Plex Sans Arabic",
  src: "/fonts/Cairo-Medium.ttf",
});
export default function FormalOneColumnResume({ resumeData }) {
  const isArabic = resumeData.lng === "ar";
  const t = translations[resumeData.lng] || translations.en;

  const styles = StyleSheet.create({
    container: {
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      backgroundColor: "#fff",
      padding: 20,
    },
    summary: {
      fontSize: 10,
      lineHeight: 1.5,
    },
    header: {
      textAlign: "center",
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: resumeData.theme.primaryColor,
      paddingBottom: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: resumeData.theme.primaryColor,
    },
    jobTitle: {
      fontSize: 14,
      color: "#666",
    },
    contact: {
      fontSize: 10,
      marginTop: 5,
    },
    section: {
      marginBottom: 15,
      textAlign: isArabic ? "right" : "left",
    },
    sectionTitle: {
      fontSize: 16,
      textAlign: isArabic ? "right" : "left",
      fontWeight: "bold",
      color: resumeData.theme.primaryColor,
      borderBottomWidth: 1,
      borderBottomColor: resumeData.theme.primaryColor,
      paddingBottom: 5,
      marginBottom: 10,
    },
    experienceItem: {
      marginBottom: 10,
    },
    titleText: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 3,
    },
    subTitleText: {
      fontSize: 11,
      fontStyle: isArabic ? undefined : "italic",
      marginBottom: 3,
    },
    dateText: {
      fontSize: 10,
      color: "#666",
      marginBottom: 5,
    },
    skillsList: {
      display: "flex",
      flexDirection: isArabic ? "row-reverse" : "row",
      flexWrap: "wrap",
    },
    skillItem: {
      backgroundColor: resumeData.theme.backgroundColor,
      color: resumeData.theme.primaryColor,
      padding: "2px 5px",
      borderRadius: 3,
      fontSize: 10,
      marginRight: 5,
      marginBottom: 5,
    },
  });

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
          <Text style={styles.jobTitle}>
            {resumeData.personalInfo.jobTitle}
          </Text>
          <Text style={styles.contact}>
            {resumeData.personalInfo.contact.join(" | ")}
          </Text>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.profile}</Text>
          <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.workExperience}</Text>
          {resumeData.experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.titleText}>{exp.jobTitle}</Text>
              <Text style={styles.subTitleText}>{exp.company}</Text>
              <Text style={styles.dateText}>
                {formatDate(exp.startDate)} -{" "}
                {exp.isCurrentJob
                  ? t.present
                  : formatDate(exp.endDate, resumeData.lng)}
              </Text>
              <Text style={styles.summary}>{exp.responsibilities}</Text>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.education}</Text>
          {resumeData.educations.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.titleText}>{edu.degree}</Text>
              <Text style={styles.subTitleText}>{edu.institution}</Text>
              <Text style={styles.dateText}>
                {formatDate(edu.graduationDate)}
              </Text>
              {edu.gpaType === "numeric" && (
                <Text
                  style={{
                    fontSize: 8,
                    color: "#4B5563",
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  {t.gpa}: {edu.numericGpa}
                </Text>
              )}
              {edu.gpaType === "descriptive" && (
                <Text
                  style={{
                    fontSize: 8,
                    color: "#4B5563",
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  {t.gpas[edu.descriptiveGpa]}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          <View style={styles.skillsList}>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                {t.availableSkills[skill.name] || skill.name} (
                {t.levels[skill.level.toLowerCase()]})
              </Text>
            ))}
          </View>
        </View>

        {/* Languages Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.languages}</Text>
          {resumeData.languages.map((lang, index) => (
            <Text style={styles.titleText} key={index}>
              {lang.name}: {t[lang.proficiency.toLowerCase()]}
            </Text>
          ))}
        </View>

        {/* Courses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.courses}</Text>
          {resumeData.courses.map((course, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.titleText}>{course.name}</Text>
              <Text style={styles.subTitleText}>{course.institution}</Text>
              <Text style={styles.dateText}>
                {formatDate(course.completionDate)}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
