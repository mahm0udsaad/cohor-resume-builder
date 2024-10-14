import React, { memo } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

// Create styles
const createStyles = (isArabic) =>
  StyleSheet.create({
    page: {
      backgroundColor: "white",
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      color: "#374151", // text-gray-700
      ...(isArabic
        ? {
            writingMode: "rtl",
            direction: "rtl",
            textAlign: "right",
          }
        : {}),
    },
    header: {
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      color: "white",
      flexDirection: isArabic ? "row-reverse" : "",
    },
    headerName: {
      fontSize: 20,
      fontWeight: "extrabold",
    },
    headerTitle: {
      fontSize: 14,
      marginTop: 4,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: 14,
      borderBottom: 1,
      borderBottomColor: "#D1D5DB", // border-gray-300
    },
    contactItem: {
      fontSize: 10,
      marginHorizontal: 4,
    },
    content: {
      padding: 16,
    },
    section: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      borderBottom: 1,
      borderBottomColor: "#9CA3AF", // border-gray-400
      paddingBottom: 4,
      marginBottom: 10,
    },
    summary: {
      fontSize: 10,
      lineHeight: 1.5,
    },
    experienceItem: {
      marginBottom: 10,
    },
    jobTitle: {
      fontSize: 14,
      fontWeight: "bold",
    },
    jobInfo: {
      fontSize: 10,
      fontWeight: "bold",
    },
    responsibilities: {
      fontSize: 10,
      marginTop: 4,
    },
    achievementsTitle: {
      fontSize: 10,
      fontWeight: "bold",
      textDecoration: "underline",
      marginTop: 12,
      marginBottom: 4,
    },
    achievementsList: {
      marginLeft: 12,
    },
    achievementItem: {
      fontSize: 10,
    },
    educationItem: {
      marginBottom: 5,
    },
    degree: {
      paddingBottom: 4,
      fontSize: 14,
      fontWeight: "bold",
    },
    institution: {
      fontSize: 10,
    },
    skillsList: {
      marginLeft: 12,
    },
    skillItem: {
      fontSize: 10,
      paddingTop: 4,
    },
    languageItem: {
      fontSize: 10,
    },
    courseItem: {
      marginTop: 8,
    },
    courseName: {
      fontSize: 10,
      fontWeight: "bold",
    },
    courseInfo: {
      fontSize: 10,
      color: "#4B5563", // text-gray-600
    },
  });
const BoldTemplate = ({ resumeData }) => {
  const selectedTheme = resumeData?.theme || null;
  // Get translations based on the current language
  const t = translations[resumeData.lng] || translations.en;
  const isArabic = resumeData.lng === "ar";
  const styles = createStyles(isArabic);
  return (
    <Document>
      <Page size="B4" style={styles.page}>
        <View
          style={[
            styles.header,
            { backgroundColor: selectedTheme?.primaryColor || "#1F2937" },
          ]}
        >
          <Text style={styles.headerName}>{resumeData.personalInfo.name}</Text>
          <Text style={styles.headerTitle}>
            {resumeData.personalInfo.jobTitle}
          </Text>
        </View>

        <View style={styles.contactInfo}>
          {resumeData.personalInfo.contact?.map((contact, index) => (
            <Text key={index} style={styles.contactItem}>
              {contact}
              {index < resumeData.personalInfo.contact.length - 1 ? " | " : ""}
            </Text>
          ))}
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.profile}</Text>
            <Text style={styles.summary}>
              {resumeData.personalInfo.summary}
            </Text>
          </View>

          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{t.workExperience}</Text>
            {resumeData.experiences?.map((job, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                <Text style={styles.jobInfo}>
                  {job.company} // {formatDate(job.startDate)} -{" "}
                  {formatDate(job.endDate, resumeData.lng)}
                </Text>
                <Text style={styles.responsibilities}>
                  {job.responsibilities}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{t.education}</Text>
            {resumeData.educations?.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>
                  {edu.institution} // {formatDate(edu.graduationDate)}
                </Text>
                {edu.gpaType === "numeric" && (
                  <Text style={styles.institution}>GPA: {edu.numericGpa}</Text>
                )}
                {edu.gpaType === "descriptive" && (
                  <Text style={styles.institution}>
                    GPA: {edu.descriptiveGpa}
                  </Text>
                )}
              </View>
            ))}
          </View>

          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{t.skills}</Text>
            <View style={styles.skillsList}>
              {resumeData.skills?.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  • {skill.name}
                </Text>
              ))}
            </View>
          </View>

          {resumeData.languages?.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              <View style={styles.skillsList}>
                {resumeData.languages?.map((lang, index) => (
                  <Text key={index} style={styles.languageItem}>
                    • {lang.name} - {lang.proficiency}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {resumeData.courses?.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>{t.courses}</Text>
              {resumeData.courses?.map((course, index) => (
                <View key={index} style={styles.courseItem}>
                  <Text style={styles.courseName}>{course.name}</Text>
                  <Text style={styles.courseInfo}>{course.institution}</Text>
                  <Text style={styles.courseInfo}>
                    {formatDate(course.completionDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default memo(BoldTemplate);
