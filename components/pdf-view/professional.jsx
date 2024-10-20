import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";
import { memo } from "react";

// Create styles for PDF rendering
const createStyles = (selectedTheme, isRTL) =>
  StyleSheet.create({
    page: {
      fontFamily: isRTL ? "IBM Plex Sans Arabic" : "",
      textAlign: isRTL ? "right" : "left", // RTL Alignment
      backgroundColor: selectedTheme?.backgroundColor || "#ffffff",
      paddingRight: 12,
      paddingLeft: 12,
      paddingTop: 5,
    },
    section: {
      paddingBottom: 15,
      borderBottom: `0.5 solid ${selectedTheme?.primaryColor}`,
      marginBottom: 10,
    },
    header: {
      flexDirection: isRTL ? "row-reverse" : "row", // RTL Support
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    name: {
      fontSize: 32,
      fontFamily: isRTL ? "IBM Plex Sans Arabic" : "Times-Bold",
      color: selectedTheme?.primaryColor,
    },
    jobTitle: {
      fontSize: 14,
      color: "gray",
      marginTop: 6,
      paddingLeft: 5,
      paddingRight: 5,
    },
    contactList: {
      width: "100%",
      flexDirection: isRTL ? "row-reverse" : "row", // RTL Support
      flexWrap: "wrap",
      gap: 4,
      marginBottom: 8,
    },
    contactItem: {
      fontSize: 12,
      color: "gray",
      marginRight: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: isRTL ? "IBM Plex Sans Arabic" : "Times-Bold",
      color: selectedTheme?.primaryColor,
      marginBottom: 8,
    },
    text: {
      fontSize: 8,
      color: "gray",
      marginBottom: 8,
    },
    experienceSection: {
      marginBottom: 8,
    },
    experienceTitle: {
      fontSize: 10,
      marginBottom: 3,
      fontWeight: "bold",
    },
    company: {
      fontSize: 10,
      fontWeight: "medium",
    },
    date: {
      fontSize: 12,
      color: "gray",
      marginBottom: 6,
    },
    skillBadge: {
      fontSize: 10,
      border: "1 solid gray",
      padding: 4,
      borderRadius: 5,
      marginRight: 8,
    },
  });

const FormalResumeTemplate = ({ resumeData, selectedTheme }) => {
  const isRTL = resumeData.lng === "ar";
  const styles = createStyles(selectedTheme, isRTL);
  const t = translations[resumeData.lng] || translations.en;

  return (
    <Document>
      <Page wrap={false} style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text style={styles.name}>{resumeData.personalInfo?.name}</Text>
            <Text style={styles.jobTitle}>
              {resumeData.personalInfo?.jobTitle}
            </Text>
          </View>
          {resumeData.personalInfo?.imageUrl && (
            <Image
              src={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: `2 solid ${selectedTheme?.primaryColor}`,
              }}
            />
          )}
        </View>

        {/* Contact Section */}
        <View style={styles.contactList}>
          {resumeData.personalInfo?.contact?.map((item, index) => (
            <Text key={index} style={styles.contactItem}>
              {item.startsWith("https") ? <Link src={item}>{item}</Link> : item}
            </Text>
          ))}
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.profile}</Text>
          <Text style={styles.text}>{resumeData.personalInfo?.summary}</Text>
        </View>

        {/* Work Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.workExperience}</Text>
          {resumeData.experiences?.map((exp, index) => (
            <View key={index} style={styles.experienceSection}>
              <Text style={styles.experienceTitle}>{exp.jobTitle}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.date}>
                {`${formatDate(exp.startDate, resumeData.lng)} - ${formatDate(
                  exp.endDate,
                  resumeData.lng,
                )}`}
              </Text>
              <Text style={styles.text}>{exp.responsibilities}</Text>
            </View>
          ))}
        </View>
        {/* Skills Section */}
        <View wrap={false} style={styles.section}>
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          <View
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {resumeData.skills?.map((skill, index) => (
              <Text key={index} style={styles.skillBadge}>
                {skill.name} - ({t[skill.level] || skill.level})
              </Text>
            ))}
          </View>
        </View>
        {/* Languages Section */}
        {resumeData.languages[0]?.name.trim() !== "" && (
          <View wrap={false} style={styles.section}>
            <Text style={styles.sectionTitle}>{t.languages}</Text>
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {resumeData.languages?.map((lang, index) => (
                <Text key={index} style={styles.skillBadge}>
                  {lang.name} - ({lang.proficiency})
                </Text>
              ))}
            </View>
          </View>
        )}
        {/* Education Section */}
        <View wrap={false} style={styles.section}>
          <Text style={styles.sectionTitle}>{t.education}</Text>
          {resumeData.educations?.map((edu, index) => (
            <View key={index} style={styles.experienceSection}>
              <Text style={styles.experienceTitle}>{edu.degree}</Text>
              <Text style={styles.company}>{edu.institution}</Text>
              <Text style={styles.date}>
                {formatDate(edu.graduationDate, resumeData.lng)}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default memo(FormalResumeTemplate);
