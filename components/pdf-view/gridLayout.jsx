import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";
import React from "react";

export default function GridLayoutResumePDF({ resumeData }) {
  const isArabic = resumeData.lng === "ar"; // Detect Arabic for RTL layout
  const { lng } = resumeData;
  const t = translations[lng] || translations["en"]; // Use fallback to English if translation isn't available
  const direction = isArabic ? "right" : "left"; // RTL for Arabic, LTR for others
  if (isArabic) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/ar.ttf",
    });
  }
  const theme = resumeData.theme || {
    primaryColor: "#000000cc",
    backgroundColor: "#ededed",
    accentColor: "#697565",
  };

  const styles = StyleSheet.create({
    page: {
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      padding: 10,
      textAlign: direction, // RTL or LTR
    },
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 20,
    },
    header: {
      flexDirection: "row",
      backgroundColor: theme.primaryColor,
      borderRadius: 8,
      padding: 20,
      alignItems: "center",
      marginBottom: 14,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      objectFit: "cover",
      border: `2px solid ${theme.accentColor}`,
    },
    headerInfo: {
      marginLeft: 20,
    },
    name: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#ffffff",
    },
    jobTitle: {
      fontSize: 18,
      color: "#d1d5db",
      marginTop: 5,
    },
    section: {
      backgroundColor: theme.backgroundColor,
      borderRadius: 8,
      padding: 15,
      marginBottom: 14,
    },
    sectionTitle: {
      textAlign: direction, // RTL or LTR
      fontSize: 20,
      fontWeight: "bold",
      color: theme.accentColor,
      borderBottom: `1px solid ${theme.primaryColor}`,
      paddingBottom: 10,
      marginBottom: 15,
    },
    sectionContent: {
      textAlign: direction,
      fontSize: 10,
      paddingTop: 2,
      paddingBottom: 2,
      color: theme.accentColor,
      lineHeight: 1.2,
    },
    subHeader: {
      textAlign: direction,
      fontSize: 12,
      color: theme.accentColor,
    },
    experienceItem: {
      marginBottom: 15,
    },
    skillsList: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
    },
    skillItem: {
      backgroundColor: theme.primaryColor,
      color: theme.backgroundColor,
      padding: "5px 10px",
      borderRadius: 15,
      fontSize: 9,
      fontWeight: "bold",
    },
    languageItem: {
      backgroundColor: theme.primaryColor,
      color: theme.backgroundColor,
      padding: 6,
      borderRadius: 15,
      fontSize: 9,
      fontWeight: "bold",
    },
    contactInfo: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      color: "#d1d5db",
      gap: 6,
      fontSize: 10,
    },
  });

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            src={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
            style={styles.avatar}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
            <Text style={styles.jobTitle}>
              {resumeData.personalInfo.jobTitle}
            </Text>
            <View style={styles.contactInfo}>
              {resumeData.personalInfo.contact?.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{ flex: 2 }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.profile}</Text>
              <Text style={styles.sectionContent}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.workExperience}</Text>
              {resumeData.experiences.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.subHeader}>
                    {exp.jobTitle} - {exp.company}
                  </Text>
                  <Text style={styles.sectionContent}>
                    {formatDate(exp.startDate, resumeData.lng)} -{" "}
                    {formatDate(exp.endDate, resumeData.lng)}
                  </Text>
                  <Text style={styles.sectionContent}>
                    {exp.responsibilities}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.courses}</Text>
              {resumeData.courses.map((course, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.subHeader}>{course.name}</Text>
                  <Text style={styles.sectionContent}>
                    {course.institution}
                  </Text>
                  <Text style={styles.sectionContent}>
                    {formatDate(course.completionDate)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.education}</Text>
              {resumeData.educations.map((edu, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.subHeader}>{edu.degree}</Text>
                  <Text style={styles.sectionContent}>{edu.institution}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              <View style={styles.skillsList}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {skill.name} ({skill.level})
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              <View style={styles.skillsList}>
                {resumeData.languages.map((lang, index) => (
                  <Text key={index} style={styles.languageItem}>
                    {lang.name} ({lang.proficiency})
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
