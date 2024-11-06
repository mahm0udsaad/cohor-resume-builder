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

// Create styles
const createStyles = (isArabic) =>
  StyleSheet.create({
    page: {
      backgroundColor: "white",
      padding: 40,
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32,
    },
    headerLeft: {
      flexDirection: "column",
    },
    name: {
      fontSize: 36,
      fontWeight: 600,
      marginBottom: 4,
      textTransform: "uppercase",
    },
    jobTitle: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 2,
      color: "#4B5563",
      fontWeight: 300,
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
      flexDirection: "row",
      gap: 32,
    },
    leftColumn: {
      width: "35%",
    },
    rightColumn: {
      width: "65%",
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 12,
      textTransform: "uppercase",
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      fontSize: 10,
      marginBottom: 8,
      color: "#6B7280",
    },
    icon: {
      marginRight: 8,
    },
    subheading: {
      fontSize: 10,
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: 8,
      color: "#374151",
    },
    skillItem: {
      flexDirection: "row",
      fontSize: 10,
      marginBottom: 4,
    },
    educationItem: {
      marginBottom: 16,
    },
    institutionName: {
      fontSize: 10,
      fontWeight: "bold",
    },
    degree: {
      fontSize: 10,
    },
    date: {
      fontSize: 8,
      color: "#4B5563",
    },
    summary: {
      fontSize: 10,
      color: "#374151",
      lineHeight: 1.4,
    },
    experienceItem: {
      marginBottom: 24,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    jobTitleExp: {
      fontSize: 10,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    company: {
      fontSize: 10,
      fontWeight: "medium",
      marginBottom: 4,
    },
    responsibilityItem: {
      flexDirection: "row",
      fontSize: 10,
      marginBottom: 4,
      color: "#6B7280",
    },
    bullet: {
      paddingLeft: 3,
      paddingRight: 3,
    },
  });

const MinimalTemplate = ({ resumeData }) => {
  const isArabic = resumeData?.lng === "ar";
  const styles = createStyles(isArabic);
  if (isArabic) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/ar.ttf",
    });
  }
  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
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
              <Text style={styles.sectionTitle}>Contact</Text>
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
              <Text style={styles.sectionTitle}>Skills</Text>
              {resumeData.skills?.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{t.availableSkills[`${skill.name}`]}</Text>
                </View>
              ))}
            </View>

            {/* Languages Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {resumeData.languages?.map((lang, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text>{lang.name}</Text>
                  <Text> - {lang.proficiency}</Text>
                </View>
              ))}
            </View>

            {/* Education Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.educations?.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.institutionName}>{edu.institution}</Text>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.date}>
                    {formatDate(edu.graduationDate)}
                  </Text>
                  {edu.gpaType === "numeric" && (
                    <Text style={styles.institution}>
                      GPA: {edu.numericGpa}
                    </Text>
                  )}
                  {edu.gpaType === "descriptive" && (
                    <Text style={styles.institution}>
                      GPA: {edu.descriptiveGpa}
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
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.summary}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>

            {/* Experience Section */}
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {resumeData.experiences?.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.jobTitleExp}>{exp.jobTitle}</Text>
                    <Text style={styles.date}>
                      {formatDate(exp.startDate)} -{" "}
                      {formatDate(exp.endDate, resumeData.lng)}
                    </Text>
                  </View>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.summary}>{exp.responsibilities}</Text>
                </View>
              ))}
            </View>

            {/* Courses Section */}
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Courses</Text>
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
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinimalTemplate;
