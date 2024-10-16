import { formatDate } from "@/helper/date";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { memo } from "react";

const createStyles = (resumeData, rtl) =>
  StyleSheet.create({
    page: {
      backgroundColor: resumeData.theme.backgroundColor,
      fontFamily: rtl ? "IBM Plex Sans Arabic" : "Times-Roman",
      padding: 15,
    },
    container: {
      display: "flex",
      flexDirection: rtl ? "row-reverse" : "row",
      justifyContent: "space-between",
    },
    leftColumn: {
      backgroundColor: resumeData.theme.primaryColor,
      color: "white",
      padding: 20,
      borderRadius: 10,
      width: "35%",
      height: "100%",
    },
    rightColumn: {
      width: "75%",
      paddingLeft: rtl ? 0 : 40,
      paddingRight: rtl ? 40 : 0,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: "50%",
      border: "4 solid white",
      marginBottom: 20,
    },
    name: {
      fontSize: 28,
      marginBottom: 10,
    },
    jobTitle: {
      fontSize: 16,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      marginBottom: 5,
      marginTop: 5,
      borderBottom: "2 solid white",
      paddingBottom: 5,
    },
    contactItem: {
      fontSize: 12,
      marginBottom: 5,
    },
    skillsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 15,
    },
    skillBadge: {
      backgroundColor: "rgba(255,255,255,0.2)",
      padding: "5px 10px",
      borderRadius: 15,
      fontSize: 10,
    },
    sectionContainer: {
      marginBottom: 14,
    },
    sectionHeading: {
      fontSize: 24,
      borderBottom: `2px solid ${resumeData.theme.primaryColor}`,
      paddingBottom: 10,
      marginBottom: 14,
    },
    experienceContainer: {
      marginBottom: 10,
    },
    experienceTitle: {
      fontSize: 16,
      marginBottom: 5,
    },
    experienceCompany: {
      fontSize: 14,
      color: resumeData.theme.primaryColor,
      marginBottom: 5,
    },
    dateText: {
      fontSize: 12,
      marginBottom: 10,
      color: "gray",
    },
    educationDateText: {
      fontSize: 12,
      color: "gray",
    },
    responsibilityText: {
      fontSize: 12,
    },
    courseContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
    },
  });

const CreativeResumeTemplate = ({ resumeData }) => {
  const rtl = resumeData.lng === "ar";
  const styles = createStyles(resumeData, rtl);

  return (
    <Document>
      <Page size="B4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Column - static, doesn't wrap */}
          <View style={styles.leftColumn} wrap={false}>
            <Image
              src={resumeData.personalInfo.imageUrl}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
            <Text style={styles.jobTitle}>
              {resumeData.personalInfo.jobTitle}
            </Text>

            {/* Contact Section */}
            <View>
              <Text style={styles.sectionTitle}>Contact</Text>
              {resumeData.personalInfo.contact.map((item, index) => (
                <Text key={index} style={styles.contactItem}>
                  {item}
                </Text>
              ))}
            </View>

            {/* Skills Section */}
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>

            {/* Languages Section */}
            <View>
              <Text style={styles.sectionTitle}>Languages</Text>
              {resumeData.languages.map((lang, index) => (
                <Text key={index} style={styles.contactItem}>
                  {lang.name}: {lang.proficiency}
                </Text>
              ))}
            </View>
            {resumeData.courses[0]?.name.trim() !== "" && (
              <View>
                <Text style={styles.sectionTitle}>Additional Courses</Text>
                <View style={styles.courseContainer}>
                  {resumeData.courses.map((course, index) => (
                    <View key={index}>
                      <Text style={styles.contactItem}>{course.name}</Text>
                      <Text style={styles.contactItem}>
                        {course.institution}
                      </Text>
                      <Text style={styles.dateText}>
                        {course.completionDate}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column - can wrap to next page */}
          <View style={styles.rightColumn}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>Professional Summary</Text>
              <Text style={styles.responsibilityText}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>

            {/* Professional Experience */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>Professional Experience</Text>
              {resumeData.experiences.map((exp, index) => (
                <View key={index} style={styles.experienceContainer}>
                  <Text style={styles.experienceTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.experienceCompany}>{exp.company}</Text>
                  <Text style={styles.dateText}>
                    {formatDate(exp.startDate)} -{" "}
                    {formatDate(exp.endDate, resumeData.lng)}
                  </Text>
                  <Text style={styles.responsibilityText}>
                    {exp.responsibilities}
                  </Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>Education</Text>
              {resumeData.educations.map((edu, index) => (
                <View key={index} style={styles.experienceContainer}>
                  <Text style={styles.experienceTitle}>{edu.degree}</Text>
                  <Text style={styles.experienceCompany}>
                    {edu.institution}
                  </Text>
                  <Text style={styles.educationDateText}>
                    {formatDate(edu.graduationDate)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Additional Courses */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default memo(CreativeResumeTemplate);
