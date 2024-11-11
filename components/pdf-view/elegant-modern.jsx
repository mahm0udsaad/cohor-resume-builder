import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";
import {
  Page,
  View,
  Text,
  Document,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Define styles using react-pdf's StyleSheet
const createStyles = (theme, isArabic) =>
  StyleSheet.create({
    page: {
      fontSize: 10,
      fontFamily: isArabic ? "IBM Plex Sans Arabic" : "Helvetica",
      minHeight: 641.89,
    },
    header: {
      backgroundColor: "#3498db", // Primary color from your theme
      color: "white",
      padding: 20,
      flexDirection: isArabic ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    profileImage: {
      borderRadius: "50%",
      border: "3px solid #000000", // Accent color
      width: 60,
      height: 60,
    },
    twoColumnLayout: {
      flexDirection: isArabic ? "row-reverse" : "row",
      flexGrow: 1,
      padding: 20,
    },
    leftColumn: {
      flex: 1,
      paddingRight: isArabic ? 0 : 10,
      paddingLeft: isArabic ? 10 : 0,
      borderRight: isArabic ? "none" : "1px solid #2c3e50",
      borderLeft: isArabic ? "1px solid #2c3e50" : "none",
    },
    rightColumn: {
      flex: 2,
      paddingLeft: isArabic ? 0 : 10,
      paddingRight: isArabic ? 10 : 0,
    },
    section: {
      marginBottom: 20,
    },
    heading: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#3498db", // Primary color from your theme
      position: "relative",
      paddingRight: isArabic ? 10 : 0,
      paddingLeft: isArabic ? 0 : 10,
      marginBottom: 10,
      textAlign: isArabic ? "right" : "left",
    },
    headingBorder: {
      position: "absolute",
      left: isArabic ? "auto" : 0,
      right: isArabic ? 0 : "auto",
      width: 4,
      height: "100%",
      backgroundColor: "#3498db",
    },
    text: {
      fontSize: 10,
      textAlign: isArabic ? "right" : "left",
      lineHeight: 1.5,
    },
    listItem: {
      marginBottom: 5,
      gap: 4,
    },
    skillTag: {
      backgroundColor: "#3498db",
      color: "white",
      padding: 5,
      borderRadius: 4,
      marginRight: isArabic ? 0 : 5,
      marginLeft: isArabic ? 5 : 0,
      fontSize: 9,
    },
    date: {
      color: theme.primaryColor,
      paddingBottom: 5,
      paddingTop: 5,
      textAlign: isArabic ? "right" : "left",
    },
    sectionSubHeader: {
      fontWeight: "bold",
      fontSize: 12,
      textAlign: isArabic ? "right" : "left",
    },
  });

const ElegantModernResumeTemplatePDF = ({ resumeData }) => {
  const isArabic = resumeData.lng === "ar";
  const theme = resumeData.theme || {
    primaryColor: "#3498db",
    accentColor: "#000000",
    backgroundColor: "#2c3e50",
  };
  const styles = createStyles(theme, isArabic);
  const t = translations[resumeData.lng] || translations.en;
  if (isArabic) {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/Cairo-Medium.ttf",
    });
  }

  return (
    <Document>
      <Page wrap={false} style={styles.page} size="A4">
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 20, marginBottom: 5 }}>
              {resumeData.personalInfo.name}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {resumeData.personalInfo.jobTitle}
            </Text>
          </View>
          {resumeData.personalInfo.imageUrl && (
            <Image
              src={resumeData.personalInfo.imageUrl}
              style={styles.profileImage}
            />
          )}
        </View>

        {/* Main Content */}
        <View style={styles.twoColumnLayout}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Contact Information */}
            <View style={styles.section}>
              <View style={styles.heading}>
                <Text>{t.contactInformation}</Text>
                <View style={styles.headingBorder}></View>
              </View>
              {resumeData.personalInfo.contact?.map((item, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 10,
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  {item}
                </Text>
              ))}
            </View>

            {/* Skills */}
            <View style={styles.section}>
              <View style={styles.heading}>
                <Text>{t.skills}</Text>
                <View style={styles.headingBorder}></View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  flexDirection: isArabic ? "row-reverse" : "row",
                  gap: 4,
                }}
              >
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillTag}>
                    {t.availableSkills[`${skill.name}`]}
                  </Text>
                ))}
              </View>
            </View>

            {/* Languages */}
            <View style={styles.section}>
              <View style={styles.heading}>
                <Text>{t.languages}</Text>
                <View style={styles.headingBorder}></View>
              </View>
              {resumeData.languages.map((lang, index) => (
                <Text key={index} style={styles.text}>
                  <Text>{lang.name}:</Text> {t[lang.proficiency.toLowerCase()]}
                </Text>
              ))}
            </View>

            {/* Courses */}
            {resumeData.courses[0]?.name.trim() !== "" && (
              <View style={styles.section}>
                <View style={styles.heading}>
                  <Text>{t.courses}</Text>
                  <View style={styles.headingBorder}></View>
                </View>
                {resumeData.courses.map((course, index) => (
                  <View key={index}>
                    <Text style={styles.sectionSubHeader}>{course.name}</Text>
                    <Text>{course.institution}</Text>
                    <Text style={{ color: theme.primaryColor }}>
                      {formatDate(course.completionDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Professional Summary */}
            <View style={styles.section}>
              <View style={styles.heading}>
                <Text>{t.summary}</Text>
                <View style={styles.headingBorder}></View>
              </View>
              <Text style={styles.text}>{resumeData.personalInfo.summary}</Text>
            </View>

            {/* Professional Experience */}
            <View style={styles.section}>
              <View style={styles.heading}>
                <Text>{t.workExperience}</Text>
                <View style={styles.headingBorder}></View>
              </View>
              {resumeData.experiences.map((exp, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.sectionSubHeader}>
                    {exp.jobTitle} at {exp.company}
                  </Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} -{" "}
                    {formatDate(exp.endDate, resumeData.lng)}
                  </Text>
                  <Text style={styles.text}>{exp.responsibilities}</Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
              <View style={styles.heading}>
                <Text>{t.education}</Text>
                <View style={styles.headingBorder}></View>
              </View>
              {resumeData.educations.map((edu, index) => (
                <View key={index}>
                  <Text style={styles.sectionSubHeader}>{edu.degree}</Text>
                  <Text style={styles.text}>{edu.institution}</Text>
                  <Text style={{ textAlign: isArabic ? "right" : "left" }}>
                    {formatDate(edu.graduationDate)}
                  </Text>
                  {edu.gpaType === "numeric" && (
                    <Text style={styles.text}>GPA: {edu.numericGpa}</Text>
                  )}
                  {edu.gpaType === "descriptive" && (
                    <Text style={styles.text}>GPA: {edu.descriptiveGpa}</Text>
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

export default ElegantModernResumeTemplatePDF;
