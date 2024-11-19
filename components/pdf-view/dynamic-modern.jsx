import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

// Register a custom font for Arabic text if needed
Font.register({
  family: "IBM Plex Sans Arabic",
  src: "/fonts/Rubik-Regular.ttf",
});

export default function DynamicModernResume({ resumeData }) {
  const theme = resumeData?.theme || {
    id: "original",
    name: "Original",
    primaryColor: "#3B51A3",
    backgroundColor: "#EBF8FF",
  };

  const isArabic = resumeData.lng === "ar";
  const t = translations[resumeData.lng] || translations.en;

  const styles = StyleSheet.create({
    container: {
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      direction: isArabic ? "rtl" : "ltr",
      backgroundColor: "#ffffff",
      color: "#333",
      padding: 20,
    },
    header: {
      flexDirection: "row",
      gap: 40,
      marginBottom: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: "50%",
      objectFit: "cover",
      border: `5px solid ${theme.primaryColor}`,
      borderColor: theme.primaryColor,
    },
    nameTitle: {
      flex: 1,
      textAlign: isArabic ? "right" : "left",
      borderLeft: `5px solid ${theme.primaryColor}`,
      paddingLeft: "20px",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.primaryColor,
      marginBottom: 5,
      textAlign: isArabic ? "right" : "left",
    },
    jobTitle: {
      fontSize: 14,
      color: "#666",
      marginBottom: 10,
      textAlign: isArabic ? "right" : "left",
    },
    contact: {
      flexDirection: isArabic ? "row-reverse" : "row",
      flexWrap: "wrap",
      fontSize: 10,
      color: "#666",
      gap: 10,
    },
    summary: {
      fontSize: 12,
      lineHeight: 1.6,
      marginBottom: 30,
      padding: 10,
      backgroundColor: theme.backgroundColor,
      borderRadius: 5,
      textAlign: isArabic ? "right" : "left",
    },
    experienceDot: {
      content: '""',
      position: "absolute",
      right: resumeData.lng === "ar" ? "0" : undefined,
      left: resumeData.lng === "ar" ? undefined : "0",
      top: "8px",
      width: "12px",
      height: "12px",
      backgroundColor: theme.primaryColor,
      borderRadius: "50%",
    },
    main: {
      flexDirection: isArabic ? "row-reverse" : "row",
      gap: 20,
    },
    section: {
      marginBottom: 20,
      textAlign: isArabic ? "right" : "left",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.primaryColor,
      marginBottom: 10,
      borderBottom: `1px solid ${theme.primaryColor}`,
      paddingBottom: 5,
    },
    experienceItem: {
      marginBottom: 10,
    },
    experienceTitle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 3,
    },
    experienceCompany: {
      fontSize: 10,
      marginBottom: 3,
    },
    experienceDate: {
      fontSize: 9,
      color: "#666",
      marginBottom: 5,
    },
    skillsList: {
      flexDirection: isArabic ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 5,
    },
    skillItem: {
      backgroundColor: theme.backgroundColor,
      color: theme.primaryColor,
      padding: "5px 10px",
      borderRadius: 10,
      fontSize: 10,
      fontWeight: "bold",
      textAlign: "center",
    },
    languageItem: {
      flexDirection: isArabic ? "row-reverse" : "row",
      justifyContent: "space-between",
      fontSize: 10,
      marginBottom: 5,
    },
    courseItem: {
      marginBottom: 5,
    },
    leftColumn: {
      width: "35%",
      order: isArabic ? 2 : 1,
      textAlign: isArabic ? "right" : "left",
    },
    rightColumn: {
      width: "65%",
      order: isArabic ? 1 : 2,
      textAlign: isArabic ? "right" : "left",
    },
    educationItem: {
      marginBottom: 5,
    },
  });

  return (
    <Document>
      <Page wrap={false} size="B4" style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            src={resumeData.personalInfo.imageUrl}
            style={styles.profileImage}
          />
          <View style={styles.nameTitle}>
            <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
            <Text style={styles.jobTitle}>
              {resumeData.personalInfo.jobTitle}
            </Text>
            <View style={styles.contact}>
              {resumeData.personalInfo.contact.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summary}>
          <Text>{resumeData.personalInfo.summary}</Text>
        </View>

        {/* Main Content Section */}
        <View style={styles.main}>
          {/* Left Column */}
          <View style={styles.rightColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.workExperience}</Text>
              {resumeData.experiences.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.experienceTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.experienceCompany}>{exp.company}</Text>
                  <View
                    style={{
                      flexDirection: isArabic ? "row-reverse" : "row",
                      gap: 2,
                    }}
                  >
                    <Text style={styles.experienceDate}>
                      {formatDate(exp.startDate)}
                    </Text>
                    <Text style={styles.experienceDate}>-</Text>
                    <Text style={styles.experienceDate}>
                      {exp.isCurrentJob
                        ? t.present
                        : formatDate(exp.endDate, resumeData.lng)}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 12, lineHeight: 1.4 }}>
                    {exp.responsibilities}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.education}</Text>
              {resumeData.educations.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.experienceTitle}>{edu.degree}</Text>
                  <Text style={styles.experienceCompany}>
                    {edu.institution}
                  </Text>
                  <Text style={styles.experienceDate}>
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
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              <View style={styles.skillsList}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {t.availableSkills[`${skill.name}`] || skill.name}
                  </Text>
                ))}
              </View>
            </View>

            {resumeData.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.languages}</Text>
                {resumeData.languages.map((lang, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text>{lang.name}</Text>
                    <Text>{t[lang.proficiency.toLowerCase()]}</Text>
                  </View>
                ))}
              </View>
            )}

            {resumeData.courses.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.courses}</Text>
                {resumeData.courses.map((course, index) => (
                  <View key={index} style={styles.courseItem}>
                    <Text style={styles.experienceTitle}>{course.name}</Text>
                    <Text style={styles.experienceCompany}>
                      {course.institution}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {formatDate(course.completionDate)}
                    </Text>
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
