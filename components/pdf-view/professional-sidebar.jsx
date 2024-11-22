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

Font.register({
  family: "IBM Plex Sans Arabic",
  src: "/fonts/Rubik-Regular.ttf",
});
export default function ProfessionalSidebarPDF({ resumeData }) {
  const isArabic = resumeData.lng === "ar"; // Detect Arabic for RTL layout
  const { lng } = resumeData;
  const t = translations[lng] || translations["en"]; // Fallback to English if translation isn't available

  const defaultTheme = {
    primaryColor: "#009688",
    backgroundColor: "#ffffff",
    accentColor: "#495057",
  };

  const theme = resumeData.theme || defaultTheme;

  const styles = StyleSheet.create({
    page: {
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      backgroundColor: theme.backgroundColor,
      flexDirection: isArabic ? "row-reverse" : "row",
    },
    sidebar: {
      textAlign: isArabic ? "right" : "left",
      width: "35%",
      padding: 15,
      backgroundColor: theme.primaryColor,
      color: "#fff",
    },
    main: {
      width: "65%",
      padding: 10,
      textAlign: isArabic ? "right" : "left",
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid white",
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      marginTop: 14,
      borderBottom: "1px solid white",
      paddingBottom: 5,
      textAlign: isArabic ? "right" : "left",
    },
    text: {
      fontSize: 12,
      lineHeight: 1.5,
      marginBottom: 8,
      marginTop: 8,
      textAlign: isArabic ? "right" : "left",
    },
    skillItem: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: 10,
      fontSize: 10,
      marginRight: isArabic ? 0 : 5,
      marginLeft: isArabic ? 5 : 0,
      marginBottom: 5,
    },
    experienceItem: {
      marginBottom: 8,
      textAlign: isArabic ? "right" : "left",
    },
    heading: {
      fontSize: 20,
      color: theme.primaryColor,
      marginBottom: 5,
      textAlign: isArabic ? "right" : "left",
    },
  });

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.sectionTitle}>{t.contactInformation}</Text>
          {resumeData.personalInfo.contact?.map((item, index) => (
            <Text
              key={index}
              style={{
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              {item}
            </Text>
          ))}

          <Text style={styles.sectionTitle}>{t.education}</Text>
          {resumeData.educations.map((edu, index) => (
            <View key={index}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "extrabold",
                  marginBottom: 4,
                  marginTop: 2,
                }}
              >
                {edu.degree}
              </Text>
              <Text style={{ fontSize: 14, marginBottom: 4 }}>
                {edu.institution}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginBottom: 2,
                  marginTop: 2,
                }}
              >
                {formatDate(edu.graduationDate)}
              </Text>
              {edu.gpaType === "percentage" && (
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 8,
                    color: "#e5e7eb",
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  {t.gpa}: {edu.numericGpa}%
                </Text>
              )}
              {edu.gpaType === "outOf4" && (
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 8,
                    color: "#e5e7eb",
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  {t.gpa}: {edu.numericGpa}/4
                </Text>
              )}
              {edu.gpaType === "outOf5" && (
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 8,
                    color: "#e5e7eb",
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  {t.gpa}: {edu.numericGpa}/5
                </Text>
              )}
            </View>
          ))}

          <Text style={styles.sectionTitle}>{t.skills}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                {t.availableSkills[`${skill.name}`] || skill.name}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>{t.languages}</Text>
          {resumeData.languages.map((lang, index) => (
            <Text
              key={index}
              style={{
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              {lang.name} - {t[lang.proficiency.toLowerCase()]}
            </Text>
          ))}
        </View>

        {/* Main Section */}
        <View style={styles.main}>
          <Text
            style={{
              fontSize: 32,
              color: theme.primaryColor,
              marginBottom: 6,
            }}
          >
            {resumeData.personalInfo.name}
          </Text>
          <Text style={{ fontSize: 24, color: "#6b7280", marginBottom: 15 }}>
            {resumeData.personalInfo.jobTitle}
          </Text>
          <Text style={styles.text}>{resumeData.personalInfo.summary}</Text>

          <Text style={styles.heading}>{t.workExperience}</Text>
          {resumeData.experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 4,
                }}
              >
                {exp.jobTitle}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 6 }}>{exp.company}</Text>
              <View
                style={{
                  flexDirection: lng === "ar" ? "row-reverse" : "row",
                  marginTop: 8,
                  alignItems: "center",
                  color: "#6b7280",
                  fontSize: 12,
                }}
              >
                <Text>{formatDate(exp.startDate)}</Text>
                <Text>-</Text>
                <Text>
                  {exp.isCurrentJob ? t.present : formatDate(exp.endDate, lng)}
                </Text>
              </View>
              <Text style={styles.text}>{exp.responsibilities}</Text>
            </View>
          ))}
          {resumeData.courses.length !== 0 &&
            resumeData.courses[0]?.name.trim() !== "" && (
              <>
                <Text style={styles.heading}>{t.courses}</Text>
                {resumeData.courses.map((course, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                      {course.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        marginTop: 6,
                      }}
                    >
                      {course.institution}
                    </Text>
                    <Text
                      style={{
                        marginTop: 8,
                        color: "#6b7280",
                        fontSize: 12,
                      }}
                    >
                      {formatDate(course.completionDate)}
                    </Text>
                  </View>
                ))}
              </>
            )}
        </View>
      </Page>
    </Document>
  );
}
