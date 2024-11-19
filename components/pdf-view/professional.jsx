import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Font,
} from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";
import { memo } from "react";

Font.register({
  family: "IBM Plex Sans Arabic",
  src: "/fonts/Rubik-Regular.ttf",
});

const createStyles = (selectedTheme, isRTL) =>
  StyleSheet.create({
    page: {
      fontFamily: isRTL ? "IBM Plex Sans Arabic" : "Times-Roman",
      textAlign: isRTL ? "right" : "left",
      backgroundColor: selectedTheme?.backgroundColor || "#ffffff",
      padding: 20,
    },
    header: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    name: {
      fontSize: 36,
      color: selectedTheme?.primaryColor,
      fontWeight: "bold",
    },
    jobTitle: {
      fontSize: 16,
      color: "gray",
      marginTop: 8,
    },
    contactList: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 16,
    },
    contactItem: {
      fontSize: 12,
      color: "#666",
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      color: selectedTheme?.primaryColor,
      fontWeight: "bold",
      marginBottom: 12,
    },
    text: {
      fontSize: 12,
      color: "#666",
      lineHeight: 1.5,
    },
    experienceSection: {
      marginBottom: 12,
    },
    experienceTitle: {
      fontSize: 14,
      fontWeight: "bold",
    },
    company: {
      fontSize: 12,
      color: "#444",
    },
    date: {
      fontSize: 10,
      color: "gray",
      marginTop: 4,
    },
    skillBadge: {
      fontSize: 12,
      padding: 6,
      border: `1 solid ${selectedTheme?.primaryColor || "gray"}`,
      borderRadius: 4,
      marginRight: 8,
      marginBottom: 8,
    },
    gridSection: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 20,
    },
    gridItem: {
      width: "60%",
    },
  });

const FormalResumeTemplate = ({ resumeData }) => {
  const isRTL = resumeData.lng === "ar";
  const styles = createStyles(resumeData.theme, isRTL);
  const t = translations[resumeData.lng] || translations.en;

  return (
    <Document>
      <Page wrap={false} style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{resumeData.personalInfo?.name}</Text>
            <Text style={styles.jobTitle}>
              {resumeData.personalInfo?.jobTitle}
            </Text>
          </View>
          {resumeData.personalInfo?.imageUrl && (
            <Image
              src={resumeData.personalInfo.imageUrl}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: `1 solid ${resumeData.theme?.primaryColor}`,
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
              <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
                <Text style={styles.date}>{formatDate(exp.startDate)}</Text>
                <Text style={styles.date}> - </Text>
                <Text style={styles.date}>
                  {exp.isCurrentJob
                    ? t.present
                    : formatDate(exp.endDate, resumeData.lng)}
                </Text>
              </View>
              <Text style={styles.text}>{exp.responsibilities}</Text>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.education}</Text>
          {resumeData.educations?.map((edu, index) => (
            <View key={index} style={styles.experienceSection}>
              <Text style={styles.experienceTitle}>{edu.degree}</Text>
              <Text style={styles.company}>{edu.institution}</Text>
              <Text style={styles.date}>
                {formatDate(edu.graduationDate, resumeData.lng)}
              </Text>
              {edu.gpaType === "percentage" && (
                <Text
                  style={{
                    fontSize: 10,
                    color: "#4B5563",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t.gpa}: {isRTL ? `%${edu.numericGpa}` : `${edu.numericGpa}%`}
                </Text>
              )}
              {edu.gpaType === "outOf4" && (
                <Text
                  style={{
                    fontSize: 10,
                    color: "#4B5563",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t.gpa}: {edu.numericGpa}/4
                </Text>
              )}
              {edu.gpaType === "outOf5" && (
                <Text
                  style={{
                    fontSize: 10,
                    color: "#4B5563",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t.gpa}: {edu.numericGpa}/5
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Skills & Languages Section */}
        <View style={styles.gridSection}>
          <View style={styles.gridItem}>
            <Text style={styles.sectionTitle}>{t.skills}</Text>
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                flexWrap: "wrap",
              }}
            >
              {resumeData.skills?.map((skill, index) => (
                <Text key={index} style={styles.skillBadge}>
                  {t.availableSkills[`${skill.name}`] || skill.name} - (
                  {t[skill.level] || skill.level})
                </Text>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.sectionTitle}>{t.languages}</Text>
            <View>
              {resumeData.languages?.map((lang, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  {lang.name} - ({t[lang.proficiency.toLowerCase()]})
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default memo(FormalResumeTemplate);
