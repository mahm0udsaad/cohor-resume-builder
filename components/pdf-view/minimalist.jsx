import React from "react";
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

Font.register({
  family: "IBM Plex Sans Arabic",
  src: "/fonts/Cairo-Medium.ttf",
});

export default function MinimalistModernResume({ resumeData }) {
  const theme = resumeData.theme || {
    id: "original",
    name: "Original",
    primaryColor: "#3B51A3",
    backgroundColor: "#EBF8FF",
  };

  const isArabic = resumeData.lng === "ar";
  const t = translations[resumeData.lng] || translations["en"];

  const styles = StyleSheet.create({
    container: {
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      backgroundColor: "#ffffff",
      borderRadius: 8,
    },
    header: {
      backgroundColor: theme.primaryColor,
      color: "#ffffff",
      padding: 20,
      textAlign: "center",
    },
    name: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: 16,
      fontWeight: "medium",
      marginBottom: 10,
    },
    contact: {
      flexDirection: isArabic ? "row-reverse" : "row",
      justifyContent: "center",
      fontSize: 10,
      gap: 10,
    },
    main: {
      flexDirection: isArabic ? "row-reverse" : "row",
      gap: 20,
      padding: 20,
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
      textAlign: isArabic ? "right" : "left",
    },
    skillItem: {
      backgroundColor: theme.backgroundColor,
      color: theme.primaryColor,
      padding: "5px 10px",
      borderRadius: 15,
      fontSize: 10,
      textAlign: isArabic ? "right" : "left",
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
    jobTitleBold: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: isArabic ? "right" : "left",
    },
    smallText: {
      fontSize: 10,
      color: "#555",
      textAlign: isArabic ? "right" : "left",
    },
    degree: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: isArabic ? "right" : "left",
    },
    institution: {
      fontSize: 12,
      textAlign: isArabic ? "right" : "left",
    },
    date: {
      fontSize: 10,
      color: "#777",
      textAlign: isArabic ? "right" : "left",
    },
  });

  return (
    <Document>
      <Page size="A4" wrap={false} style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
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

        {/* Main Content Section */}
        <View style={styles.main}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              <View
                style={{
                  flexDirection: isArabic ? "row-reverse" : "row",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {t.availableSkills?.[skill.name] || skill.name}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.education}</Text>
              {resumeData.educations.map((edu, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.date}>
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

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              {resumeData.languages.map((lang, index) => (
                <Text key={index} style={styles.jobTitleBold}>
                  {lang.name} -{" "}
                  <Text style={styles.smallText}>
                    {t[lang.proficiency.toLowerCase()] || lang.proficiency}
                  </Text>
                </Text>
              ))}
            </View>

            {resumeData.courses.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.courses}</Text>
                {resumeData.courses.map((course, index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={styles.degree}>{course.name}</Text>
                    <Text style={styles.institution}>{course.institution}</Text>
                    <Text style={styles.date}>
                      {formatDate(course.completionDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.profile}</Text>
              <Text style={styles.institution}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.workExperience}</Text>
              {resumeData.experiences.map((exp, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.jobTitleBold}>{exp.jobTitle}</Text>
                  <Text style={styles.institution}>{exp.company}</Text>
                  <View
                    style={{
                      flexDirection: isArabic ? "row-reverse" : "row",
                      gap: 2,
                    }}
                  >
                    <Text style={styles.date}>{formatDate(exp.startDate)}</Text>
                    <Text style={styles.date}>-</Text>
                    <Text style={styles.date}>
                      {formatDate(exp.endDate, resumeData.lng)}
                    </Text>
                  </View>
                  <Text style={styles.institution}>{exp.responsibilities}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
