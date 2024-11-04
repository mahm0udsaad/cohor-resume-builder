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
  const isArabic = resumeData.lng === "ar"; // Detect Arabic for RTL layout
  const { lng } = resumeData;
  const t = translations[lng] || translations["en"]; // Fallback to English if translation isn't available
  const direction = isArabic ? "rtl" : "ltr"; // RTL for Arabic, LTR for others

  if (isArabic) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/ar.ttf",
    });
  }
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
      flexDirection: "row",
      direction: direction,
      width: "100%",
      height: 841.89,
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
      padding: 20,
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
      case "advanced":
        return "100%";
      case "intermediate":
        return "70%";
      default:
        return "40%";
    }
  };

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
            {resumeData.personalInfo.name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: 500, marginBottom: 20 }}>
            {resumeData.personalInfo.jobTitle}
          </Text>

          {/* Contact Information */}
          <Text style={styles.sectionTitle}>{t.contactInformation}</Text>
          {resumeData.personalInfo.contact?.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item}
            </Text>
          ))}

          {/* Skills */}
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          {resumeData.skills.map((skill, index) => (
            <View key={index}>
              <Text style={styles.text}>{skill.name}</Text>
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
              {lang.proficiency}
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
              <Text style={{ fontSize: 14, fontWeight: 400 }}>
                {job.jobTitle}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 300 }}>
                {job.company}
              </Text>
              <Text style={{ fontSize: 12, paddingVertical: 4, color: "#666" }}>
                {formatDate(job.startDate)} -{" "}
                {formatDate(job.endDate, resumeData.lng)}
              </Text>
              <Text style={styles.text}>{job.responsibilities}</Text>
            </View>
          ))}

          {/* Education */}
          <Text style={styles.mainSectionTitle}>{t.education}</Text>
          {resumeData.educations.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={{ fontSize: 14, fontWeight: 400 }}>
                {edu.degree}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 300 }}>
                {edu.institution}
              </Text>
              <Text style={{ fontSize: 12, paddingVertical: 4, color: "#666" }}>
                {formatDate(edu.graduationDate)}
              </Text>
            </View>
          ))}

          {/* Courses */}
          <Text style={styles.mainSectionTitle}>{t.courses}</Text>
          {resumeData.courses.map((course, index) => (
            <View key={index} style={styles.courseItem}>
              <Text style={{ fontSize: 14, fontWeight: 400 }}>
                {course.name}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 400 }}>
                {course.institution}
              </Text>
              <Text style={{ fontSize: 12, paddingVertical: 4, color: "#666" }}>
                {t.completed}: {formatDate(course.completionDate)}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
