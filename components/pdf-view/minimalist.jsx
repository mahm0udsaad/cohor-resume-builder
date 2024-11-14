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

export default function MinimalistModernResume({ resumeData }) {
  const theme = resumeData.theme || {
    primaryColor: "#3B51A3",
    backgroundColor: "#EBF8FF",
  };

  const isArabic = resumeData.lng === "ar";
  const t = translations[resumeData.lng] || translations["en"];
  if (isArabic) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/Cairo-Medium.ttf",
    });
  }
  const styles = StyleSheet.create({
    container: {
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      backgroundColor: "#ffffff",
    },
    header: {
      backgroundColor: theme.primaryColor,
      color: "#ffffff",
      padding: 20,
      textAlign: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: 16,
      marginBottom: 10,
    },
    contact: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
      fontSize: 12,
    },
    main: {
      display: "flex",
      flexDirection: isArabic ? "row-reverse" : "row",
      padding: 20,
      gap: 20,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.primaryColor,
      marginBottom: 10,
      paddingBottom: 5,
      borderBottom: `1px solid ${theme.primaryColor}`,
    },
    experienceItem: {
      marginBottom: 10,
    },
    experienceTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 3,
    },
    experienceCompany: {
      fontSize: 12,
      fontStyle: isArabic ? "" : "italic",
      marginBottom: 3,
    },
    experienceDate: {
      paddingVertical: 3,
      fontSize: 10,
      color: "#666",
    },
    skillsList: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
    },
    skillItem: {
      backgroundColor: theme.backgroundColor,
      color: theme.primaryColor,
      padding: 3,
      borderRadius: 5,
      fontSize: 10,
    },
    educationItem: {
      marginBottom: 5,
    },
    languageItem: {
      fontSize: 12,
      marginBottom: 3,
    },
    courseItem: {
      marginBottom: 5,
    },
    summary: {
      border: `2px solid ${theme.primaryColor}`,
      fontSize: 12,
    },
  });

  return (
    <Document>
      <Page wrap={false} style={styles.container}>
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

        <View style={styles.main}>
          {/* Left Section */}
          <View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              <View style={styles.skillsList}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {skill.name}
                  </Text>
                ))}
              </View>
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
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              {resumeData.languages.map((lang, index) => (
                <Text key={index} style={styles.languageItem}>
                  {lang.name} - {lang.proficiency}
                </Text>
              ))}
            </View>

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
                      Completed: {formatDate(course.completionDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Section */}
          <View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.profile}</Text>
              <Text style={styles.summary}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.workExperience}</Text>
              {resumeData.experiences.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.experienceTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.experienceCompany}>{exp.company}</Text>
                  <View
                    style={{
                      flexDirection: isArabic ? "row-reverse" : "row",
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Text style={styles.experienceDate}>
                      {formatDate(exp.startDate)}
                    </Text>
                    <Text style={styles.experienceDate}>-</Text>
                    <Text style={styles.experienceDate}>
                      {formatDate(exp.endDate, resumeData.lng)}
                    </Text>
                  </View>
                  <Text style={styles.summary}>{exp.responsibilities}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
