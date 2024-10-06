import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";

// Define styles using react-pdf's StyleSheet
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    color: "#3B51A3", // Primary color
    marginBottom: 8,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 18,
    color: "#3B51A3",
    marginBottom: 6,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 4,
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

const Classic = ({ resumeData, selectedTheme }) => {
  let theme = selectedTheme || defaultTheme;

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
        <Text>{exp.company}</Text>
        <Text>
          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
        </Text>
        <Text>{exp.responsibilities}</Text>
      </View>
    ));

  const renderEducation = () =>
    resumeData.educations?.map((edu, index) => (
      <View key={index} style={styles.section}>
        <Text style={styles.bold}>{edu.degree}</Text>
        <Text>{edu.institution}</Text>
        <Text>{formatDate(edu.graduationDate)}</Text>
      </View>
    ));

  const renderSkills = () => (
    <View style={styles.section}>
      {resumeData.skills[0]?.name &&
        resumeData.skills.map((skill, index) => (
          <Text key={index}>
            {skill.name} - {skill.level}
          </Text>
        ))}
    </View>
  );

  const renderLanguages = () => (
    <View style={styles.section}>
      {resumeData.languages?.map((lang, index) => (
        <Text key={index}>
          {lang.name} - {lang.proficiency}
        </Text>
      ))}
    </View>
  );

  const renderCourses = () =>
    resumeData.courses?.map((course, index) => (
      <View key={index} style={styles.section}>
        <Text style={styles.bold}>{course.name}</Text>
        <Text>{course.institution}</Text>
        <Text>{formatDate(course.completionDate)}</Text>
      </View>
    ));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 2, marginRight: 20 }}>
            <Text style={[styles.header, { color: theme.primaryColor }]}>
              {resumeData.personalInfo?.name || "Your Name"}
            </Text>
            <Text style={styles.subheader}>
              {resumeData.personalInfo?.jobTitle || "Your Job Title"}
            </Text>

            {renderSection("Objective", <Text>{resumeData.objective}</Text>)}

            {renderSection("Experience", renderExperiences())}

            {renderSection("Education", renderEducation())}

            {renderSection("Courses", renderCourses())}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              {resumeData.personalInfo.contact?.map((contact, index) => (
                <Text key={index} style={styles.contact}>
                  {contact}
                </Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text>
                {resumeData.personalInfo.summary ||
                  "Write about yourself here..."}
              </Text>
            </View>

            {renderSection("Skills", renderSkills())}

            {renderSection("Languages", renderLanguages())}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Classic;
