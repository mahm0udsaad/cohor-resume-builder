import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { translations } from "@/data/data"; // Import your translations
import { formatDate } from "@/helper/date"; // Assume a date formatter utility

const ProfessionalResume = ({ resumeData, selectedTheme }) => {
  const isArabic = resumeData.lng === "ar";
  const { lng } = resumeData;
  const t = translations[lng] || translations["en"];
  const direction = isArabic ? "rtl" : "ltr";

  const defaultTheme = {
    primaryColor: "#1E201E",
    backgroundColor: "#ECDFCC",
    accentColor: "#697565",
  };
  if (isArabic) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/Cairo-Medium.ttf",
    });
  }
  const theme = selectedTheme || defaultTheme;

  // React PDF styles
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.primaryColor,
      width: "100%",
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      color: theme.accentColor,
    },
    header: {
      backgroundColor: theme.primaryColor,
      padding: 18,
      textAlign: isArabic ? "right" : "left",
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      objectFit: "cover",
      border: `2pt solid ${theme.accentColor}`,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#ffffff",
    },
    jobTitle: {
      fontSize: 18,
      color: "#d1d5db",
      marginVertical: 5,
    },
    contactInfo: {
      flexDirection: "row",
      gap: 10,
      fontSize: 14,
      color: "#d1d5db",
    },
    main: {
      textAlign: isArabic ? "right" : "left",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: "#FFFFFF",
      padding: 20,
    },
    section: {
      textAlign: isArabic ? "right" : "left",
      marginTop: 10,
    },
    sectionTitle: {
      textAlign: isArabic ? "right" : "left",
      fontSize: 20,
      fontWeight: "bold",
      color: theme.accentColor,
      borderBottomWidth: 1,
      borderBottomColor: theme.accentColor,
      paddingBottom: 5,
      marginBottom: 10,
    },
    sectionContent: {
      fontSize: 12,
      color: theme.accentColor,
    },
    experienceItem: {
      marginBottom: 8,
    },
    experienceTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.accentColor,
    },
    experienceDate: {
      fontSize: 14,
      color: "#6c757d",
      marginVertical: 5,
    },
    skillsList: {
      flexDirection: isArabic ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 10,
    },
    skillItem: {
      backgroundColor: theme.primaryColor,
      color: theme.backgroundColor,
      padding: 5,
      borderRadius: 15,
      fontSize: 14,
    },
    languageItem: {
      backgroundColor: theme.primaryColor,
      color: theme.backgroundColor,
      padding: 5,
      borderRadius: 15,
      fontSize: 14,
      marginRight: 10,
      marginBottom: 8,
    },
  });

  return (
    <Document>
      <Page
        wrap={false}
        size="A4"
        style={styles.container}
        direction={direction}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              src={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
              style={styles.avatar}
            />
            <View>
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
        </View>

        <View style={styles.main}>
          {/* Profile Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.profile}</Text>
            <Text style={styles.sectionContent}>
              {resumeData.personalInfo.summary}
            </Text>
          </View>

          {/* Experience Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.workExperience}</Text>
            {resumeData.experiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>
                  {exp.jobTitle} - {exp.company}
                </Text>
                <Text style={styles.experienceDate}>
                  {formatDate(exp.startDate, resumeData.lng)} -{" "}
                  {formatDate(exp.endDate, resumeData.lng)}
                </Text>
                <Text style={styles.sectionContent}>
                  {exp.responsibilities}
                </Text>
              </View>
            ))}
          </View>

          {/* Education Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.education}</Text>
            {resumeData.educations.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{edu.degree}</Text>
                <Text style={styles.sectionContent}>
                  {edu.institution}, {t.graduated}{" "}
                  {formatDate(edu.graduationDate, resumeData.lng)}
                </Text>
              </View>
            ))}
          </View>

          {/* Skills Section */}
          <View wrap={false} style={styles.section}>
            <Text style={styles.sectionTitle}>{t.skills}</Text>
            <View style={styles.skillsList}>
              {resumeData.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  {t.availableSkills[`${skill.name}`] || skill.name} (
                  {t.levels[skill.level.toLowerCase()]})
                </Text>
              ))}
            </View>
          </View>

          {/* Languages Section */}
          <View wrap={false} style={styles.section}>
            <Text style={styles.sectionTitle}>{t.languages}</Text>
            <View style={styles.skillsList}>
              {resumeData.languages.map((lang, index) => (
                <Text key={index} style={styles.languageItem}>
                  {lang.name} - {t[lang.proficiency.toLowerCase()]}
                </Text>
              ))}
            </View>
          </View>

          {/* Courses Section */}
          {resumeData.courses[0]?.name.trim() !== "" && (
            <View wrap={true} style={styles.section}>
              <Text style={styles.sectionTitle}>{t.courses}</Text>
              {resumeData.courses.map((course, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text>{course.name}</Text>
                  <Text>{course.institution}</Text>
                  <Text>
                    {formatDate(course.completionDate, resumeData.lng)}
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

export default ProfessionalResume;
