import React, { memo } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

// Define styles using react-pdf's StyleSheet
const createStyles = (isArabic) =>
  StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 12,
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      textAlign: isArabic ? "right" : "left",
    },
    section: {
      marginBottom: 12,
    },
    header: {
      fontSize: 24,
      color: "#3B51A3",
      marginBottom: 4,
      fontWeight: "bold",
    },
    subheader: {
      fontSize: 16,
      color: "#3B51A3",
      marginBottom: 14,
      fontWeight: "semibold",
    },
    text: {
      marginBottom: 4,
    },
    summary: {
      fontSize: 10,
      color: "#666",
      lineHeight: 1.4,
    },
    contact: {
      marginBottom: 8,
      fontSize: 10,
    },
    rightColumn: {
      backgroundColor: "#EBF8FF",
      width: "30%",
      padding: 10,
      borderRadius: 8,
      fontSize: 10,
    },
    bold: {
      fontWeight: "bold",
    },
    title: {
      fontSize: 20,
      marginBottom: 4,
      fontWeight: "bold",
    },
    primaryColor: {
      color: "#3B51A3",
    },
    sectionTitle: {
      fontSize: 16,
      color: "#3B51A3",
      fontWeight: "bold",
      marginBottom: 4,
    },
  });
// Default theme configuration
const defaultTheme = {
  id: "original",
  name: "Original",
  primaryColor: "#3B51A3",
  backgroundColor: "#EBF8FF",
};

const Classic = ({ resumeData }) => {
  const theme = resumeData.theme || defaultTheme;
  const isArabic = resumeData.lng === "ar";
  const styles = createStyles(isArabic); // Pass RTL flag to styles

  if (isArabic) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/Cairo-Medium.ttf",
    });
  }
  // Get translations based on the current language
  const t = isArabic ? translations.ar : translations.en;

  const renderSection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return null;
    }
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {content}
      </View>
    );
  };

  const renderExperiences = () =>
    resumeData.experiences?.map((exp, index) => (
      <View key={index} style={styles.section}>
        <Text style={styles.bold}>{exp.jobTitle}</Text>
        <View
          style={{
            flexDirection: isArabic ? "row-reverse" : "row",
            display: "flex",
            gap: 4,
          }}
        >
          <Text>{exp.company}</Text>
          <Text>
            {formatDate(exp.startDate)} -{" "}
            {formatDate(exp.endDate, resumeData.lng)}
          </Text>
        </View>
        <Text style={styles.summary}>{exp.responsibilities}</Text>
      </View>
    ));

  const renderEducation = () =>
    resumeData.educations?.map((edu, index) => (
      <View key={index} style={styles.section}>
        <Text style={styles.bold}>{edu.degree}</Text>
        <View
          style={{
            flexDirection: isArabic ? "row-reverse" : "row",
            display: "flex",
            gap: 4,
          }}
        >
          <Text>{edu.institution}</Text> -
          <Text>{formatDate(edu.graduationDate)}</Text>
          {edu.gpaType === "numeric" && (
            <Text style={styles.institution}>GPA: {edu.numericGpa}</Text>
          )}
          {edu.gpaType === "descriptive" && (
            <Text style={styles.institution}>GPA: {edu.descriptiveGpa}</Text>
          )}
        </View>
      </View>
    ));

  const renderSkills = () => (
    <View style={styles.section}>
      {resumeData.skills[0]?.name &&
        resumeData.skills.map((skill, index) => (
          <Text key={index}>
            {t.availableSkills[`${skill.name}`]} - {skill.level}
          </Text>
        ))}
    </View>
  );

  const renderLanguages = () => (
    <View wrap={false} style={styles.section}>
      {resumeData.languages?.map((lang, index) => (
        <Text key={index}>
          {lang.name} - {t[lang.proficiency.toLowerCase()]}
        </Text>
      ))}
    </View>
  );

  const renderCourses = () =>
    resumeData.courses?.map((course, index) => (
      <View wrap={false} key={index} style={styles.section}>
        <Text style={styles.bold}>{course.name}</Text>
        <View
          style={{
            flexDirection: isArabic ? "row-reverse" : "row",
            display: "flex",
            gap: 4,
          }}
        >
          <Text>{course.institution}</Text> -
          <Text>{formatDate(course.completionDate)}</Text>
        </View>
      </View>
    ));

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        {/* Left Column */}
        <View
          style={{
            flexDirection: isArabic ? "row-reverse" : "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 2, marginRight: 20 }}>
            <Text style={[styles.header, { color: theme.primaryColor }]}>
              {resumeData.personalInfo?.name}
            </Text>
            <Text style={styles.subheader}>
              {resumeData.personalInfo?.jobTitle}
            </Text>

            {renderSection(
              t.profile,
              <Text style={styles.summary}>
                {resumeData.personalInfo?.summary}
              </Text>,
            )}

            {renderSection(t.workExperience, renderExperiences())}

            {renderSection(t.education, renderEducation())}

            {renderSection(t.courses, renderCourses())}
          </View>

          {/* Right Column */}
          <View wrap={false} style={styles.rightColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.profile}</Text>
              {resumeData.personalInfo?.contact?.map((contact, index) => (
                <Text key={index} style={styles.contact}>
                  {contact}
                </Text>
              ))}
            </View>

            {renderSection(t.skills, renderSkills())}

            {renderSection(t.languages, renderLanguages())}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default memo(Classic);
