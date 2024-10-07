import React, { memo } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";

// Create styles
const styles = StyleSheet.create({
  page: {
    height: "fit-content",
    flexDirection: "row",
    backgroundColor: "white",
  },
  sidebar: {
    width: "8%",
    height: "100%",
  },
  content: {
    width: "92%",
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 8,
    color: "grey",
  },
  contactItem: {
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E0",
    paddingBottom: 5,
    marginBottom: 10,
    marginTop: 15,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  companyInfo: {
    fontSize: 10,
    color: "grey",
  },
  responsibilities: {
    fontSize: 10,
    marginTop: 5,
    color: "grey",
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 12,
    fontWeight: "bold",
  },
  institution: {
    fontSize: 10,
    color: "grey",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    width: "50%",
    fontSize: 10,
    marginBottom: 5,
  },
});

const Modern = ({ resumeData }) => {
  const selectedTheme = resumeData.theme || null;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={[
            styles.sidebar,
            { backgroundColor: selectedTheme?.primaryColor || "#F97316" },
          ]}
        />

        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
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

          {/* Experience Section */}
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {resumeData.experiences?.map((job, index) => (
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

          {/* Education Section */}
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.educations?.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>
                  {edu.institution} | {formatDate(edu.graduationDate)}
                </Text>
              </View>
            ))}
          </View>

          {/* Courses Section */}
          {resumeData.courses && (
            <View>
              <Text style={styles.sectionTitle}>Courses</Text>
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
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {resumeData.skills?.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  • {skill.name}
                </Text>
              ))}
            </View>
          </View>

          {/* Languages Section */}
          {resumeData.languages?.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.skillsGrid}>
                {resumeData.languages?.map((lang, index) => (
                  <Text key={index} style={styles.skillItem}>
                    • {lang.name}
                  </Text>
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
