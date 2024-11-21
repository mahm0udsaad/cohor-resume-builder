"use client";
import React, { memo } from "react";
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
  src: "/fonts/Rubik-Regular.ttf",
});

const createStyles = (theme, isArabic) =>
  StyleSheet.create({
    page: {
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      textAlign: isArabic ? "right" : "left",
      padding: 20,
    },
    header: {
      backgroundColor: theme.backgroundColor || "#EAEAEA",
      padding: 10,
      borderRadius: 8,
      marginBottom: 16,
    },
    name: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.primaryColor || "#0000",
      marginBottom: 4,
    },
    jobTitle: {
      fontSize: 14,
      color: "#666",
      marginBottom: 4,
    },
    contactInfo: {
      flexDirection: isArabic ? "row-reverse" : "row",
      flexWrap: "wrap",
      fontSize: 10,
      color: "#21262f",
    },
    contactItem: {
      marginRight: isArabic ? 0 : 10,
      marginLeft: isArabic ? 10 : 0,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.primaryColor || "#0000",
      borderBottomWidth: 2,
      borderBottomColor: theme.backgroundColor || "#CCCCCC",
    },
    experienceItem: {
      marginBottom: 12,
    },
    experienceTitle: {
      fontSize: 12,
      marginBottom: 6,
      fontWeight: "bold",
      color: theme.primaryColor || "#0000",
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
      color: theme.primaryColor || "#0000",
    },
    institution: {
      fontSize: 10,
      color: "#555",
      marginBottom: 4,
    },
    skillsGrid: {
      flexDirection: isArabic ? "row-reverse" : "row",
      flexWrap: "wrap",
    },
    skillItem: {
      display: "flex",
      flexDirection: isArabic ? "row-reverse" : "row",
      fontSize: 10,
      gap: 2,
      padding: 2,
      width: "50%",
      color: "#666",
    },
  });

const ElegantResume = ({ resumeData }) => {
  const theme = resumeData.theme || {
    primaryColor: "#00000",
    backgroundColor: "#F4F4F9",
  };

  const isArabic = resumeData.lng === "ar";
  const styles = createStyles(theme, isArabic);
  // Get translations based on the current language
  const t = isArabic ? translations.ar : translations.en;

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
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

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.profile}</Text>
          <Text style={styles.responsibilities}>
            {resumeData.personalInfo?.summary}
          </Text>
        </View>
        {/* Experience Section */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.workExperience}</Text>
          {resumeData.experiences?.map((job, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>{job.jobTitle}</Text>
              <View
                style={{
                  flexDirection: isArabic ? "row-reverse" : "row",
                  display: "flex",
                  gap: 2,
                }}
              >
                <Text style={styles.companyInfo}>{job.company}</Text>
                <Text style={styles.companyInfo}>
                  {formatDate(job.startDate)}
                </Text>
                <Text style={styles.companyInfo}>-</Text>
                <Text style={styles.companyInfo}>
                  {job.isCurrentJob
                    ? t.present
                    : formatDate(job.endDate, resumeData.lng)}
                </Text>
              </View>
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
              <View
                style={{
                  flexDirection: isArabic ? "row-reverse" : "row",
                  display: "flex",
                  gap: 4,
                }}
              >
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.companyInfo}> |</Text>
                <Text style={styles.companyInfo}>
                  {formatDate(edu.graduationDate)}
                </Text>
              </View>
              {edu.gpaType === "percentage" && (
                <Text
                  style={{
                    fontSize: 10,
                    color: "#4B5563",
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  {t.gpa}:{" "}
                  {isArabic ? `%${edu.numericGpa}` : `${edu.numericGpa}%`}
                </Text>
              )}
              {edu.gpaType === "outOf4" && (
                <Text
                  style={{
                    fontSize: 10,
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
                    fontSize: 10,
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

        {/* Skills Secti  on */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          <View style={styles.skillsGrid}>
            {resumeData.skills?.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <Text>•</Text>
                <Text>{t.availableSkills[`${skill.name}`] || skill.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Languages Section */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.languages}</Text>
          <View style={styles.skillsGrid}>
            {resumeData.languages?.map((language, index) => (
              <View key={index} style={styles.skillItem}>
                <Text>•</Text>
                <Text>{language.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default memo(ElegantResume);
