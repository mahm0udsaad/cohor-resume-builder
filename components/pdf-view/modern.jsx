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

// Create styles
const createStyles = (isRTL) =>
  StyleSheet.create({
    page: {
      fontFamily: isRTL ? "Cairo" : "",
      flexDirection: isRTL ? "row-reverse" : "row", // RTL Support
      backgroundColor: "white",
    },
    sidebar: {
      width: "8%",
      backgroundColor: "#F97316", // Default Fallback color
      height: "100%",
    },
    content: {
      width: "92%",
      padding: 30,
    },
    header: {
      marginBottom: 10,
      textAlign: isRTL ? "right" : "left", // RTL Alignment
    },
    name: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 5,
    },
    contactInfo: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      fontSize: 10,
      color: "grey",
      marginBottom: 10,
    },
    contactItem: {
      marginRight: 5,
    },
    section: {
      textAlign: isRTL ? "right" : "left", // RTL Alignment
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "grey",
      borderBottomWidth: 1,
      borderBottomColor: "#CBD5E0",
      marginTop: 5,
      paddingBottom: 5,
      marginBottom: 10,
      textAlign: isRTL ? "right" : "left", // RTL Support
    },
    experienceItem: {
      marginBottom: 10,
      textAlign: isRTL ? "right" : "left", // RTL Support
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 2,
    },
    companyInfo: {
      fontSize: 10,
      color: "grey",
      marginBottom: 5,
    },
    responsibilities: {
      fontSize: 10,
      marginTop: 5,
      color: "grey",
    },
    educationItem: {
      marginBottom: 8,
      textAlign: isRTL ? "right" : "left", // RTL Support
    },
    degree: {
      fontSize: 12,
      marginBottom: 5,
      fontWeight: "bold",
    },
    institution: {
      fontSize: 10,
      color: "grey",
    },
    skillsGrid: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      marginTop: 5,
    },
    skillItem: {
      display: "flex",
      gap: 2,
      flexDirection: isRTL ? "row-reverse" : "row",
      width: "50%",
      fontSize: 10,
      marginBottom: 5,
    },
  });

const Modern = ({ resumeData }) => {
  const t = translations[resumeData.lng] || translations.en; // Get translations
  const isRTL = resumeData.lng === "ar"; // Checking if the language is Arabic for RTL
  const styles = createStyles(isRTL); // Pass RTL flag to styles

  const selectedTheme = resumeData.theme || null;
  const primaryColor = selectedTheme?.primaryColor || "#F97316"; // Fallback color

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View
          fixed
          style={[styles.sidebar, { backgroundColor: primaryColor }]}
        />

        {/* Main Content */}
        <View style={styles.content}>
          {/* Header Section */}
          <View wrap={false} style={styles.header}>
            <Text style={styles.name}>{resumeData.personalInfo?.name}</Text>
            <View style={styles.contactInfo}>
              {resumeData.personalInfo?.contact?.map((contact, index) => (
                <Text key={index} style={styles.contactItem}>
                  {contact}
                  {index < resumeData.personalInfo.contact.length - 1
                    ? " | "
                    : ""}
                </Text>
              ))}
            </View>
          </View>

          <View wrap={false}>
            <Text style={styles.sectionTitle}>{t.profile}</Text>{" "}
            {/* Use translation */}
            <View style={styles.experienceItem}>
              <Text style={styles.responsibilities}>
                {resumeData.personalInfo?.summary}
              </Text>
            </View>
          </View>
          {/* Experience Section */}
          {resumeData.experiences?.length > 0 && (
            <View wrap={false}>
              <Text style={styles.sectionTitle}>{t.workExperience}</Text>{" "}
              {/* Use translation */}
              {resumeData.experiences.map((job, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.jobTitle}>{job.jobTitle}</Text>
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
          )}

          {/* Education Section */}
          {resumeData.educations?.length > 0 && (
            <View wrap={false}>
              <Text style={styles.sectionTitle}>{t.education}</Text>{" "}
              {/* Use translation */}
              {resumeData.educations.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>
                    {edu.institution} | {formatDate(edu.graduationDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Courses Section */}
          {resumeData.courses[0].name.trim() !== "" && (
            <View wrap={false}>
              <Text style={styles.sectionTitle}>{t.courses}</Text>
              {/* Use translation */}
              {resumeData.courses.map((course, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{course.name}</Text>
                  <Text style={styles.institution}>
                    {course.institution} | {formatDate(course.completionDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills Section */}
          {resumeData.skills?.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>{" "}
              {/* Use translation */}
              <View style={styles.skillsGrid}>
                {resumeData.skills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text>•</Text>
                    <Text>
                      {skill.name} - ({t[skill.level]})
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Languages Section */}
          {resumeData.languages[0]?.name.trim() !== "" && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>{t.languages}</Text>{" "}
              {/* Use translation */}
              <View style={styles.skillsGrid}>
                {resumeData.languages.map((lang, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text>•</Text>
                    <Text>
                      {lang.name} - ({lang.proficiency})
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default memo(Modern);
