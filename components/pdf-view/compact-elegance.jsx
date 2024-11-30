import React, { memo } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";
import { formatGPA } from "@/utils/gpa";

const createStyles = (isArabic, primaryColor) =>
  StyleSheet.create({
    page: {
      flexDirection: isArabic ? "row-reverse" : "row",
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      backgroundColor: "#F9FAFB",
      padding: 20,
    },
    leftColumn: {
      width: "65%",
      padding: isArabic ? "16px 0 16px 16px" : "16px 16px 16px 0",
    },
    rightColumn: {
      width: "35%",
      backgroundColor: primaryColor || "#2D3748",
      color: "white",
      padding: 16,
      borderRadius: 8,
      marginRight: isArabic ? 0 : 20,
      marginLeft: isArabic ? 20 : 0,
      marginTop: 40,
      position: "relative",
    },
    profileImageWrapper: {
      position: "absolute",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      top: "-35px",
      width: "8rem",
      height: "8rem",
      overflow: "hidden",
      zIndex: 10,
    },
    profileImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%",
      border: "4px solid white",
      marginBottom: 16,
    },
    header: {
      marginBottom: 18,
      textAlign: isArabic ? "right" : "left",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#374151",
      textAlign: isArabic ? "right" : "left",
    },
    jobTitle: {
      fontSize: 16,
      fontWeight: "medium",
      color: "#4B5563",
      marginBottom: 8,
      textAlign: isArabic ? "right" : "left",
    },
    summary: {
      fontSize: 12,
      color: "#4B5563",
      marginBottom: 16,
      textAlign: isArabic ? "right" : "left",
    },
    rightColSectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "white",
      marginBottom: 12,
      textTransform: "uppercase",
      textAlign: isArabic ? "right" : "left",
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: 12,
      textTransform: "uppercase",
      textAlign: isArabic ? "right" : "left",
    },
    itemWrapper: {
      borderLeftWidth: isArabic ? 0 : 4,
      borderRightWidth: isArabic ? 4 : 0,
      borderLeftColor: isArabic ? "transparent" : primaryColor || "#3B82F6",
      borderRightColor: isArabic ? primaryColor || "#3B82F6" : "transparent",
      paddingLeft: isArabic ? 0 : 8,
      paddingRight: isArabic ? 8 : 0,
      marginBottom: 18,
    },
    itemTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#374151",
      textAlign: isArabic ? "right" : "left",
    },
    itemSubtitle: {
      fontSize: 10,
      marginVertical: 8,
      color: "#6B7280",
      textAlign: isArabic ? "right" : "left",
    },
    itemDetails: {
      fontSize: 10,
      color: "#4B5563",
      textAlign: isArabic ? "right" : "left",
    },
    skillsList: {
      fontSize: 10,
      marginBottom: 6,
      textAlign: isArabic ? "right" : "left",
    },
    contactList: {
      fontSize: 10,
      marginBottom: 16,
      textAlign: isArabic ? "right" : "left",
    },
    languageItem: {
      fontSize: 10,
      marginBottom: 6,
      textAlign: isArabic ? "right" : "left",
    },
    courseItem: {
      marginTop: 8,
      fontSize: 10,
      textAlign: isArabic ? "right" : "left",
    },
  });

const CompactElegancePDF = ({ resumeData }) => {
  const selectedTheme = resumeData?.theme || null;
  const { imageUrl, name, jobTitle, summary, contact } =
    resumeData.personalInfo;
  const { experiences, educations, skills, languages, courses } = resumeData;
  const isArabic = resumeData.lng === "ar";
  const t = translations[resumeData.lng] || translations.en;
  const styles = createStyles(isArabic, selectedTheme?.primaryColor);

  Font.register({
    family: "IBM Plex Sans Arabic",
    src: "/fonts/Rubik-Regular.ttf",
  });

  return (
    <Document>
      <Page size="A4" wrap={false} style={styles.page}>
        {/* Left Col umn */}
        <View style={styles.leftColumn}>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.jobTitle}>{jobTitle}</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>

          {/* Education Section */}
          <Text style={styles.sectionTitle}>{t.education}</Text>
          {educations.map((edu, index) => (
            <View key={index} style={styles.itemWrapper}>
              <Text style={styles.itemTitle}>{edu.degree}</Text>
              <Text style={styles.itemSubtitle}>{edu.institution}</Text>
              <Text style={styles.itemDetails}>
                {formatDate(edu.graduationDate)} | {t.gpa}:{" "}
                {formatGPA(edu.gpaType, edu.numericGpa, t, isArabic)}
              </Text>
            </View>
          ))}

          {/* Experience Section */}
          <Text style={styles.sectionTitle}>{t.workExperience}</Text>
          {experiences.map((exp, index) => (
            <View key={index} style={styles.itemWrapper}>
              <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
              <Text style={styles.itemSubtitle}>
                {exp.company} | {formatDate(exp.startDate)} -{" "}
                {exp.isCurrentJob ? t.present : formatDate(exp.endDate)}
              </Text>
              <Text style={styles.itemDetails}>{exp.responsibilities}</Text>
            </View>
          ))}
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Profile Image */}
          {imageUrl && (
            <View style={styles.profileImageWrapper}>
              <Image
                src={imageUrl}
                alt={`${name}'s profile`}
                style={styles.profileImage}
              />
            </View>
          )}

          {/* Contact Info */}
          <Text style={[styles.rightColSectionTitle, { marginTop: "90px" }]}>
            {t.contact}
          </Text>
          {contact.map((item, index) => (
            <Text key={index} style={styles.contactList}>
              {item}
            </Text>
          ))}

          {/* Skills Section */}
          <Text style={styles.rightColSectionTitle}>{t.skills}</Text>
          {skills.map((skill, index) => (
            <Text key={index} style={styles.skillsList}>
              • {skill.name}
            </Text>
          ))}

          {/* Languages Section */}
          <Text style={styles.rightColSectionTitle}>{t.languages}</Text>
          {languages.map((language, index) => (
            <Text key={index} style={styles.languageItem}>
              • {language.name} - {t[language.proficiency.toLowerCase()]}
            </Text>
          ))}

          {/* Courses Section */}
          {courses.length > 0 && courses[0]?.name.trim() !== "" && (
            <>
              <Text style={styles.rightColSectionTitle}>{t.courses}</Text>
              {courses.map((course, index) => (
                <View key={index} style={styles.courseItem}>
                  <Text>{course.name}</Text>
                  <Text>{course.institution}</Text>
                  <Text>{formatDate(course.completionDate)}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default memo(CompactElegancePDF);
