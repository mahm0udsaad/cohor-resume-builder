import React, { memo } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { Phone, Mail, MapPin, Globe } from "lucide-react"; // Import icons from lucide-react

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    padding: 40,
    fontFamily: "Helvetica",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  headerLeft: {
    flexDirection: "column",
  },
  name: {
    fontSize: 36,
    fontWeight: 600,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  jobTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#4B5563",
    fontWeight: 300,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    objectFit: "cover",
  },
  placeholderImage: {
    width: 72,
    height: 72,
    backgroundColor: "#D1D5DB",
    borderRadius: 36,
  },
  sectionBorder: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginVertical: 16,
  },
  content: {
    flexDirection: "row",
    gap: 32,
  },
  leftColumn: {
    width: "35%",
  },
  rightColumn: {
    width: "65%",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    marginBottom: 8,
    color: "#6B7280",
  },
  icon: {
    marginRight: 8,
  },
  subheading: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
    color: "#374151",
  },
  skillItem: {
    flexDirection: "row",
    fontSize: 10,
    marginBottom: 4,
  },
  educationItem: {
    marginBottom: 16,
  },
  institutionName: {
    fontSize: 10,
    fontWeight: "bold",
  },
  degree: {
    fontSize: 10,
  },
  date: {
    fontSize: 8,
    color: "#4B5563",
  },
  summary: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
  },
  experienceItem: {
    marginBottom: 24,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  jobTitleExp: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  company: {
    fontSize: 10,
    fontWeight: "medium",
    marginBottom: 4,
  },
  responsibilityItem: {
    flexDirection: "row",
    fontSize: 10,
    marginBottom: 4,
    color: "#6B7280",
  },
  bullet: {
    paddingLeft: 3,
    paddingRight: 3,
  },
});

const MinimalTemplate = ({ resumeData }) => {
  const selectedTheme = resumeData?.theme || null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
            <Text style={styles.jobTitle}>
              {resumeData.personalInfo.jobTitle}
            </Text>
          </View>
          {resumeData.personalInfo.image ? (
            <Image
              src={resumeData.personalInfo.image}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>

        <View style={styles.sectionBorder} />

        <View style={styles.content}>
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              {resumeData.personalInfo.contact?.map((item, index) => {
                const Icon =
                  index === 0
                    ? Phone
                    : index === 1
                    ? Mail
                    : index === 2
                    ? MapPin
                    : Globe;
                return (
                  <View key={index} style={styles.contactItem}>
                    <Icon size={10} style={styles.icon} />
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.subheading}>Professional</Text>
              {resumeData.skills?.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{skill.name}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.educations?.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.institutionName}>{edu.institution}</Text>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.date}>
                    {formatDate(edu.graduationDate)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.summary}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Working Experience</Text>
              {resumeData.experiences?.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.jobTitleExp}>{exp.jobTitle}</Text>
                    <Text style={styles.date}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </Text>
                  </View>
                  <Text style={styles.company}>{exp.company}</Text>
                  <View style={styles.responsibilityItem}>
                    <Text>{exp.responsibilities.trim()}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default memo(MinimalTemplate);
