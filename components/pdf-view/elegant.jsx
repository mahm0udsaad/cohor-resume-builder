"use client";
import React, { memo } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

// Create styles function for dynamic theming
const createStyles = (theme, isArabic) =>
  StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 40,
      fontFamily: isArabic ? "Cario" : "Helvetica",
    },
    header: {
      backgroundColor: theme.backgroundColor || "#EAEAEA",
      padding: 20,
      borderRadius: 8,
      marginBottom: 20,
    },
    name: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.primaryColor || "#333",
      marginBottom: 8,
    },
    jobTitle: {
      fontSize: 14,
      color: "#666",
      marginBottom: 10,
    },
    contactInfo: {
      flexDirection: "row",
      fontSize: 10,
      color: "#999",
    },
    contactItem: {
      marginRight: 10,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      color: theme.primaryColor || "#333",
      borderBottomWidth: 2,
      borderBottomColor: theme.primaryColor || "#CCCCCC",
      paddingBottom: 4,
    },
    experienceItem: {
      marginBottom: 10,
    },
    experienceTitle: {
      fontSize: 12,
      marginBottom: 4,
      fontWeight: "bold",
      color: theme.primaryColor || "#333",
    },
    companyInfo: {
      fontSize: 10,
      color: "#555",
      marginBottom: 4,
    },
    responsibilities: {
      fontSize: 10,
      color: "#666",
      lineHeight: 1.4,
    },
    educationItem: {
      marginBottom: 10,
    },
    degree: {
      marginBottom: 4,
      fontSize: 12,
      fontWeight: "bold",
      color: theme.primaryColor || "#333",
    },
    institution: {
      fontSize: 10,
      color: "#555",
      marginBottom: 4,
    },
    skillsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    skillItem: {
      fontSize: 10,
      padding: 2,
      width: "50%",
      color: "#666",
    },
    languagesGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    languageItem: {
      fontSize: 10,
      padding: 2,
      width: "50%",
      color: "#666",
    },
  });

const ElegantResume = ({ resumeData }) => {
  const theme = resumeData.theme || {
    primaryColor: "#6A1B9A",
    backgroundColor: "#F4F4F9",
  };

  const isArabic = resumeData.lng === "ar";
  const styles = createStyles(theme, isArabic);

  // Get translations based on the current language
  const directionStyle = isArabic ? styles.rtl : {};
  const t = isArabic ? translations.ar : translations.en;
  return (
    <Document>
      <Page size="A4" style={[styles.page, directionStyle]} wrap={true}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo?.name}</Text>
          <Text style={styles.jobTitle}>
            {resumeData.personalInfo?.jobTitle}
          </Text>
          <View style={styles.contactInfo}>
            {resumeData.personalInfo?.contact?.map((contact, index) => (
              <Text key={index} style={styles.contactItem}>
                {contact}
                {index < resumeData.personalInfo.contact.length - 1 && " | "}
              </Text>
            ))}
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.workExperience}</Text>
          {resumeData.experiences?.map((job, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>{job.jobTitle}</Text>
              <Text style={styles.companyInfo}>
                {job.company} | {formatDate(job.startDate)} -{" "}
                {formatDate(job.endDate)}
              </Text>
              <Text style={styles.responsibilities}>
                {job.responsibilities}
              </Text>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.education}</Text>
          {resumeData.educations?.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.institution}>
                {edu.institution} | {formatDate(edu.graduationDate)}
              </Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          <View style={styles.skillsGrid}>
            {resumeData.skills?.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                • {skill.name}
              </Text>
            ))}
          </View>
        </View>

        {/* Languages Section */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.languages}</Text>
          <View style={styles.languagesGrid}>
            {resumeData.languages?.map((language, index) => (
              <Text key={index} style={styles.languageItem}>
                • {language.name}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default memo(ElegantResume);
