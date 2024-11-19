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

const createStyles = (isArabic, theme) =>
  StyleSheet.create({
    page: {
      backgroundColor: "white",
      padding: 10,
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
    },
    header: {
      flexDirection: isArabic ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    headerLeft: {
      flexDirection: "column",
      alignItems: isArabic ? "flex-end" : "flex-start",
    },
    name: {
      color: theme?.primaryColor || "",
      fontSize: 36,
      fontWeight: 600,
      marginBottom: 4,
      textTransform: "uppercase",
      textAlign: isArabic ? "right" : "left",
    },
    jobTitle: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 2,
      color: "#4B5563",
      fontWeight: 300,
      textAlign: isArabic ? "right" : "left",
    },
    profileImage: {
      width: 72,
      height: 72,
      borderRadius: 36,
      objectFit: "cover",
    },
    placeholderImage: {
      width: 72,
      height: 72,
      backgroundColor: "#D1D5DB",
      borderRadius: 36,
    },
    sectionBorder: {
      borderTopWidth: 1,
      borderTopColor: "#E5E7EB",
      marginVertical: 16,
    },
    content: {
      flexDirection: isArabic ? "row-reverse" : "row",
      gap: 32,
    },
    leftColumn: {
      width: "35%",
      order: 1,
    },
    rightColumn: {
      width: "65%",
      order: 2,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      color: theme?.primaryColor || "",
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 12,
      textTransform: "uppercase",
      textAlign: isArabic ? "right" : "left",
    },
    contactItem: {
      flexDirection: isArabic ? "row-reverse" : "row",
      alignItems: "center",
      fontSize: 10,
      marginBottom: 8,
      color: "#6B7280",
    },
    icon: {
      marginRight: isArabic ? 0 : 8,
      marginLeft: isArabic ? 8 : 0,
    },
    subheading: {
      fontSize: 10,
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: 8,
      color: "#374151",
      textAlign: isArabic ? "right" : "left",
    },
    skillItem: {
      flexDirection: isArabic ? "row-reverse" : "row",
      fontSize: 10,
      marginBottom: 4,
    },
    educationItem: {
      marginBottom: 16,
    },
    institutionName: {
      fontSize: 10,
      fontWeight: "bold",
      textAlign: isArabic ? "right" : "left",
    },
    degree: {
      color: theme?.primaryColor || "",
      fontSize: 10,
      textAlign: isArabic ? "right" : "left",
    },
    date: {
      fontSize: 8,
      color: "#4B5563",
      textAlign: isArabic ? "right" : "left",
    },
    summary: {
      fontSize: 10,
      color: "#374151",
      lineHeight: 1.4,
      textAlign: isArabic ? "right" : "left",
    },
    experienceItem: {
      marginBottom: 24,
    },
    experienceHeader: {
      flexDirection: isArabic ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    jobTitleExp: {
      color: theme?.primaryColor || "",
      fontSize: 10,
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: isArabic ? "right" : "left",
    },
    company: {
      fontSize: 10,
      fontWeight: "medium",
      marginBottom: 4,
      textAlign: isArabic ? "right" : "left",
    },
    responsibilityItem: {
      flexDirection: isArabic ? "row-reverse" : "row",
      fontSize: 10,
      marginBottom: 4,
      color: "#6B7280",
    },
    bullet: {
      paddingLeft: isArabic ? 0 : 3,
      paddingRight: isArabic ? 3 : 0,
    },
  });

const MinimalTemplate = ({ resumeData }) => {
  const lng = resumeData.lng;
  const isArabic = lng === "ar";
  const styles = createStyles(isArabic, resumeData.theme);
  if (isArabic) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/Rubik-Regular.ttf",
    });
  }
  const t = translations[lng] || translations["en"]; // Default to English if the language is not found

  return (
    <Document>
      <Page wrap={false} size="A3" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
            <Text style={styles.jobTitle}>
              {resumeData.personalInfo.jobTitle}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.sectionBorder} />

        <View style={styles.content}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Contact Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.contact}</Text>
              {resumeData.personalInfo.contact?.map((item, index) => {
                return (
                  <View key={index} style={styles.contactItem}>
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>

            {/* Skills Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              {resumeData.skills?.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>
                    {t.availableSkills[`${skill.name}`] || skill.name}
                  </Text>
                </View>
              ))}
            </View>

            {/* Languages Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              {resumeData.languages?.map((lang, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text>{lang.name}</Text>
                  <Text>-</Text>
                  <Text>{t[lang.proficiency.toLowerCase()]}</Text>
                </View>
              ))}
            </View>

            {/* Education Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.education}</Text>
              {resumeData.educations?.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.institutionName}>{edu.institution}</Text>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.date}>
                    {formatDate(edu.graduationDate)}
                  </Text>
                  {edu.gpaType === "percentage" && (
                    <Text
                      style={{
                        fontSize: 8,
                        color: "#4B5563",
                        textAlign: resumeData.lng === "ar" ? "right" : "left",
                      }}
                    >
                      {t.gpa}:{" "}
                      {resumeData.lng === "ar"
                        ? `%${edu.numericGpa}`
                        : `${edu.numericGpa}%`}
                    </Text>
                  )}
                  {edu.gpaType === "outOf4" && (
                    <Text
                      style={{
                        fontSize: 8,
                        color: "#4B5563",
                        textAlign: resumeData.lng === "ar" ? "right" : "left",
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
                        textAlign: resumeData.lng === "ar" ? "right" : "left",
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
          <View style={styles.rightColumn}>
            {/* Summary Section */}
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>{t.profile}</Text>
              <Text style={styles.summary}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>

            {/* Experience Section */}
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>{t.workExperience}</Text>
              {resumeData.experiences?.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.jobTitleExp}>{exp.jobTitle}</Text>
                    <View
                      style={{
                        flexDirection: isArabic ? "row-reverse" : "row",
                        gap: 2,
                      }}
                    >
                      <Text style={styles.date}>
                        {formatDate(exp.startDate)}
                      </Text>
                      <Text style={styles.date}>-</Text>
                      <Text style={styles.date}>
                        {exp.isCurrentJob
                          ? t.present
                          : formatDate(exp.endDate, resumeData.lng)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.summary}>{exp.responsibilities}</Text>
                </View>
              ))}
            </View>

            {/* Courses Section */}
            {resumeData.courses?.length > 0 && (
              <View style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>{t.courses}</Text>
                {resumeData.courses?.map((course, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.jobTitleExp}>{course.name}</Text>
                    <Text style={styles.institutionName}>
                      {course.institution}
                    </Text>
                    <Text style={styles.date}>
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
};

export default MinimalTemplate;
