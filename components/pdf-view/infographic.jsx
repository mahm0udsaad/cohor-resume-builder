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
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";

const getProficiencyWidth = (proficiency) => {
  switch (proficiency) {
    case "native":
      return "100%";
    case "fluent":
      return "90%";
    case "advanced":
      return "75%";
    case "intermediate":
      return "50%";
    case "beginner":
    default:
      return "25%";
  }
};
Font.register({
  family: "IBM Plex Sans Arabic",
  src: "/fonts/Rubik-Regular.ttf",
});
export default function InfographicResume({ resumeData }) {
  const theme = resumeData.theme || {
    id: "original",
    name: "Original",
    primaryColor: "#3B51A3",
    backgroundColor: "#EBF8FF",
  };
  const t = translations[resumeData.lng] || translations.en;
  const isArabic = resumeData.lng === "ar";
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      backgroundColor: "#f0f0f0",
      color: "#333",
      textAlign: isArabic ? "right" : "left",
    },
    header: {
      backgroundColor: theme.primaryColor,
      color: "#fff",
      padding: 20,
      flexDirection: isArabic ? "row-reverse" : "row",
      justifyContent: "space-between",
      borderRadius: 10,
      marginBottom: 20,
    },
    headerLeft: {
      flexDirection: isArabic ? "row-reverse" : "row",
      alignItems: "center",
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginRight: isArabic ? 0 : 15,
      marginLeft: isArabic ? 15 : 0,
    },
    name: {
      fontSize: 30,
      fontWeight: "bold",
    },
    jobTitle: {
      fontSize: 16,
      opacity: 0.8,
    },
    contact: {
      marginTop: 2,
      fontSize: 12,
      textAlign: isArabic ? "left" : "right",
    },
    main: {
      display: "flex",
      flexDirection: isArabic ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 10,
    },
    section: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      marginBottom: 30,
      width: "48%",
    },
    secondsection: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      marginBottom: 30,
      width: "100%",
    },
    sectionTitle: {
      flexDirection: isArabic ? "row-reverse" : "row",
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primaryColor,
      alignItems: "center",
      marginBottom: 10,
    },
    icon: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: theme.primaryColor,
      padding: 5,
      marginRight: isArabic ? 0 : 5,
      marginLeft: isArabic ? 5 : 0,
      fontSize: 16,
    },
    experienceItem: {
      borderLeft: isArabic ? undefined : `2px solid ${theme.primaryColor}`,
      borderRight: isArabic ? `2px solid ${theme.primaryColor}` : undefined,
      marginBottom: 10,
      paddingLeft: isArabic ? 0 : 5,
      paddingRight: isArabic ? 5 : 0,
    },
    experienceTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 3,
    },
    experienceCompany: {
      fontSize: 14,
      fontStyle: isArabic ? undefined : "italic",
      marginBottom: 3,
    },
    experienceDate: {
      fontSize: 12,
      color: "#666",
      marginBottom: 5,
      marginTop: 5,
    },
    educationItem: {
      marginBottom: 10,
      paddingLeft: isArabic ? 0 : 5,
      paddingRight: isArabic ? 5 : 0,
    },
    educationDegree: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 3,
    },
    educationInstitution: {
      fontSize: 14,
      fontStyle: isArabic ? undefined : "italic",
      marginBottom: 3,
    },
    educationDate: {
      fontSize: 12,
      color: "#666",
      marginBottom: 5,
    },
    skillsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: isArabic ? "flex-end" : "flex-start",
    },
    skillItem: {
      backgroundColor: theme.backgroundColor,
      color: theme.primaryColor,
      padding: 8,
      borderRadius: 20,
      fontSize: 12,
      fontWeight: "bold",
      margin: 5,
    },
    languageItem: {
      flexDirection: isArabic ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    proficiencyBar: {
      width: 100,
      height: 10,
      backgroundColor: "#e0e0e0",
      borderRadius: 5,
      overflow: "hidden",
    },
    proficiencyFill: (width) => ({
      width,
      height: "100%",
      backgroundColor: theme.primaryColor,
    }),
    courseItem: {
      padding: 10,
      backgroundColor: theme.backgroundColor,
      borderRadius: "5px",
      marginBottom: 10,
      paddingLeft: isArabic ? 0 : 5,
      paddingRight: isArabic ? 5 : 0,
    },
    courseName: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 3,
    },
    courseInstitution: {
      fontSize: 14,
      fontStyle: isArabic ? undefined : "italic",
      marginBottom: 3,
    },
    courseDate: {
      fontSize: 12,
      color: "#666",
      marginBottom: 5,
    },
    summary: {
      fontSize: 14,
      lineHeight: 1.6,
      marginBottom: 30,
      textAlign: isArabic ? "right" : "left",
    },
  });

  return (
    <Document>
      <Page size="A4" wrap={false} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              src={resumeData.personalInfo.imageUrl}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
              <Text style={styles.jobTitle}>
                {resumeData.personalInfo.jobTitle}
              </Text>
            </View>
          </View>
          <View>
            {resumeData.personalInfo.contact.map((item, index) => (
              <Text key={index} style={styles.contact}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>

        <View style={styles.main}>
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <View style={styles.icon}></View>
              <Text>{t.workExperience}</Text>
            </View>
            {resumeData.experiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{exp.jobTitle}</Text>
                <Text style={styles.experienceCompany}>{exp.company}</Text>
                <View
                  style={{
                    alignItems: "center",
                    gap: 2,
                    ...{
                      flexDirection:
                        resumeData.lng === "ar" ? "row-reverse" : "row",
                    },
                  }}
                >
                  <Text style={styles.experienceDate}>
                    {formatDate(exp.startDate)}
                  </Text>
                  <Text style={styles.experienceDate}>-</Text>
                  <Text style={styles.experienceDate}>
                    {exp.isCurrentJob
                      ? t.present
                      : formatDate(exp.endDate, resumeData.lng)}
                  </Text>
                </View>
                <Text style={styles.summary}>{exp.responsibilities}</Text>
              </View>
            ))}
          </View>
          <View style={{ width: "48%" }}>
            <View style={styles.secondsection}>
              <View style={styles.sectionTitle}>
                <View style={styles.icon}></View>
                <Text>{t.skills}</Text>
              </View>
              <View style={styles.skillsList}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {t.availableSkills[skill.name] || skill.name}
                  </Text>
                ))}
              </View>
            </View>
            {resumeData.languages.length > 0 && (
              <View style={styles.secondsection}>
                <View style={styles.sectionTitle}>
                  <View style={styles.icon}></View>
                  <Text>{t.languages}</Text>
                </View>
                {resumeData.languages.map((lang, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text>{lang.name}</Text>
                    <View style={styles.proficiencyBar}>
                      <View
                        style={styles.proficiencyFill(
                          getProficiencyWidth(lang.proficiency.toLowerCase()),
                        )}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}
            {resumeData.courses && resumeData.courses.length > 0 ? (
              <View style={styles.secondsection}>
                <View style={styles.sectionTitle}>
                  <View style={styles.icon}></View>
                  <Text>{t.courses}</Text>
                </View>
                {resumeData.courses.map((course, index) => (
                  <View style={styles.courseItem} key={index}>
                    <Text style={styles.experienceTitle}>{course.name}</Text>
                    <Text style={styles.experienceCompany}>
                      {course.institution}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {formatDate(course.completionDate)}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.secondsection}>
                <View style={styles.sectionTitle}>
                  <View style={styles.icon}></View>
                  <Text> {t.education}</Text>
                </View>
                {resumeData.educations.map((edu, index) => (
                  <View key={index}>
                    <Text style={styles.experienceTitle}>{edu.degree}</Text>
                    <Text style={styles.experienceCompany}>
                      {edu.institution}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {formatDate(edu.graduationDate)}
                    </Text>
                    {edu.gpaType === "percentage" && (
                      <Text
                        style={{
                          fontSize: 9,
                          color: "#4B5563",
                          textAlign: isArabic ? "right" : "left",
                        }}
                      >
                        {t.gpa}: {edu.numericGpa}%
                      </Text>
                    )}
                    {edu.gpaType === "outOf4" && (
                      <Text
                        style={{
                          fontSize: 9,
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
                          fontSize: 9,
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
            )}
          </View>
          {resumeData.courses.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <View style={styles.icon}></View>
                <Text>{t.education}</Text>
              </View>
              {resumeData.educations.map((edu, index) => (
                <View key={index}>
                  <Text style={styles.experienceTitle}>{edu.degree}</Text>
                  <Text style={styles.experienceCompany}>
                    {edu.institution}
                  </Text>
                  <Text style={styles.experienceDate}>
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
                      {t.gpa}: {edu.numericGpa}
                    </Text>
                  )}
                  {edu.gpaType === "descriptive" && (
                    <Text
                      style={{
                        fontSize: 8,
                        color: "#4B5563",
                        textAlign: resumeData.lng === "ar" ? "right" : "left",
                      }}
                    >
                      {t.gpas[edu.descriptiveGpa]}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
