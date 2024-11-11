import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { memo } from "react";

const createStyles = (theme, rtl) =>
  StyleSheet.create({
    page: {
      backgroundColor: theme.backgroundColor,
      fontFamily: rtl ? "IBM Plex Sans Arabic" : "Times-Roman",
      padding: 15,
    },
    container: {
      display: "flex",
      flexDirection: rtl ? "row-reverse" : "row",
      justifyContent: "space-between",
    },
    leftColumn: {
      backgroundColor: theme.primaryColor,
      color: "white",
      padding: 20,
      borderRadius: 10,
      width: "35%",
      height: "100%",
    },
    rightColumn: {
      width: "75%",
      paddingLeft: rtl ? 0 : 20,
      paddingRight: rtl ? 20 : 0,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: "50%",
      border: "2px solid white",
      marginBottom: 20,
    },
    name: {
      fontSize: 28,
      marginBottom: 10,
      textAlign: rtl ? "right" : "left",
    },
    jobTitle: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: rtl ? "right" : "left",
    },
    sectionTitle: {
      fontSize: 16,
      marginBottom: 5,
      marginTop: 5,
      borderBottom: "2px solid white",
      paddingBottom: 5,
      textAlign: rtl ? "right" : "left",
    },
    contactItem: {
      fontSize: 12,
      marginBottom: 5,
      textAlign: rtl ? "right" : "left",
    },
    skillsContainer: {
      display: "flex",
      flexDirection: rtl ? "row-reverse" : "row",
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
      fontSize: 18,
      borderBottom: `1px solid ${theme.primaryColor}`,
      paddingBottom: 10,
      marginBottom: 14,
      textAlign: rtl ? "right" : "left",
    },
    experienceContainer: {
      marginBottom: 10,
    },
    experienceTitle: {
      fontSize: 16,
      marginBottom: 5,
      textAlign: rtl ? "right" : "left",
    },
    experienceCompany: {
      fontSize: 14,
      color: theme.primaryColor,
      marginBottom: 5,
      textAlign: rtl ? "right" : "left",
    },
    dateText: {
      fontSize: 12,
      marginBottom: 10,
      color: "gray",
      textAlign: rtl ? "right" : "left",
    },
    educationDateText: {
      fontSize: 12,
      color: "gray",
      textAlign: rtl ? "right" : "left",
    },
    responsibilityText: {
      fontSize: 12,
      textAlign: rtl ? "right" : "left",
    },
    courseContainer: {
      display: "grid",
      gridTemplateColumns: rtl ? "1fr 1fr" : "1fr 1fr",
      gap: 8,
    },
  });

const CreativeResumeTemplate = ({ resumeData }) => {
  const rtl = resumeData.lng === "ar";
  const theme = resumeData.theme || {
    id: "original",
    name: "Original",
    primaryColor: "#3498db",
    secondaryColor: "#2c3e50",
    backgroundColor: "#ffffff",
  };
  if (rtl) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/Cairo-Medium.ttf",
    });
  }
  const styles = createStyles(theme, rtl);
  const t = translations[resumeData.lng] || translations["en"];

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Column - static, doesn't wrap */}
          <View style={styles.leftColumn} wrap={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={resumeData.personalInfo.imageUrl}
                style={styles.profileImage}
              />
            </View>

            <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
            <Text style={styles.jobTitle}>
              {resumeData.personalInfo.jobTitle}
            </Text>

            {/* Contact Section */}
            <View>
              <Text style={styles.sectionTitle}>{t.contact}</Text>
              {resumeData.personalInfo.contact?.map((item, index) => (
                <Text key={index} style={styles.contactItem}>
                  {item}
                </Text>
              ))}
            </View>

            {/* Skills Section */}
            <View>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              <View style={styles.skillsContainer}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>
                    {t.availableSkills[`${skill.name}`]}
                  </Text>
                ))}
              </View>
            </View>

            {/* Languages Section */}
            <View>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              {resumeData.languages.map((lang, index) => (
                <Text key={index} style={styles.contactItem}>
                  {lang.name}: {t[lang.proficiency.toLowerCase()]}
                </Text>
              ))}
            </View>
            {resumeData.courses.length !== 0 &&
              resumeData.courses[0]?.name.trim() !== "" && (
                <View>
                  <Text style={styles.sectionTitle}>{t.courses}</Text>
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
              <Text style={styles.sectionHeading}>{t.profile}</Text>
              <Text style={styles.responsibilityText}>
                {resumeData.personalInfo.summary}
              </Text>
            </View>

            {/* Professional Experience */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>{t.workExperience}</Text>
              {resumeData.experiences.map((exp, index) => (
                <View key={index} style={styles.experienceContainer}>
                  <Text style={styles.experienceTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.experienceCompany}>{exp.company}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: rtl ? "row-reverse" : "row",
                    }}
                  >
                    <Text style={styles.dateText}>
                      {formatDate(exp.startDate, resumeData.lng)}
                    </Text>
                    <Text style={styles.dateText}> - </Text>
                    <Text style={styles.dateText}>
                      {formatDate(exp.endDate, resumeData.lng)}
                    </Text>
                  </View>
                  <Text style={styles.responsibilityText}>
                    {exp.responsibilities}
                  </Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}> {t.education}</Text>
              {resumeData.educations.map((edu, index) => (
                <View key={index} style={styles.experienceContainer}>
                  <Text style={styles.experienceTitle}>{edu.degree}</Text>
                  <Text style={styles.experienceCompany}>
                    {edu.institution}
                  </Text>
                  <Text style={styles.educationDateText}>
                    {formatDate(edu.graduationDate)}
                  </Text>
                  {edu.gpaType === "numeric" && (
                    <Text
                      style={{
                        ...styles.responsibilityText,
                        marginTop: 2,
                        fontSize: 10,
                      }}
                    >
                      GPA: {edu.numericGpa}
                    </Text>
                  )}
                  {edu.gpaType === "descriptive" && (
                    <Text
                      style={{
                        ...styles.responsibilityText,
                        marginTop: 2,
                        fontSize: 10,
                      }}
                    >
                      GPA: {edu.descriptiveGpa}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default memo(CreativeResumeTemplate);
