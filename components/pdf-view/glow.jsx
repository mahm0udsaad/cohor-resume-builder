import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";

// Define the styles for React-PDF
const styles = (theme, lng) =>
  StyleSheet.create({
    page: {
      backgroundColor: "white",
      fontFamily: lng === "ar" ? "IBM Plex Sans Arabic" : "Helvetica", // Manually adjust for RTL
    },
    header: {
      backgroundColor: theme.primaryColor,
      color: "white",
      padding: 20,
      flexDirection: lng === "ar" ? "row-reverse" : "row", // Adjust layout direction
      justifyContent: "space-between",
      alignItems: "center",
    },
    main: {
      padding: 20,
    },
    section: {
      marginBottom: 10,
    },
    heading: {
      textAlign: lng === "ar" ? "right" : "left",
      color: theme.primaryColor,
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.primaryColor,
      paddingBottom: 5,
    },
    subHeading: {
      textAlign: lng === "ar" ? "right" : "left",
      color: theme.primaryColor,
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 5,
    },
    text: {
      textAlign: lng === "ar" ? "right" : "left",
      fontSize: 10,
      fontWeight: "light",
      marginBottom: 5,
    },
    contactInfo: {
      flexDirection: lng === "ar" ? "row-reverse" : "row", // Adjust for RTL
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    skill: {
      border: `1px solid ${theme.primaryColor}`,
      color: theme.primaryColor,
      padding: "4px 8px",
      borderRadius: 4,
      fontSize: 10,
      marginBottom: 5,
    },
    list: {
      flexDirection: lng === "ar" ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 5,
    },
  });

export default function MinimalistTwoColorResumeTemplate({ resumeData }) {
  const theme = resumeData.theme || {
    id: "minimalist",
    name: "Minimalist",
    primaryColor: "#2c3e50",
    backgroundColor: "#f5f5f5",
  };
  if (resumeData.lng === "ar") {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "/fonts/ar.ttf",
    });
  }
  const t = translations[resumeData.lng] || translations.en; // Translation handling

  const lng = resumeData.lng;

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles(theme, lng).page}>
        {/* Header */}
        <View style={styles(theme, lng).header}>
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {resumeData.personalInfo.name}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {resumeData.personalInfo.jobTitle}
            </Text>
          </View>
          <Image
            src={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
            alt={resumeData.personalInfo.name}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "3px solid white",
            }}
          />
        </View>

        {/* Main Content */}
        <View style={styles(theme, lng).main}>
          {/* Contact Information */}
          <View style={styles(theme, lng).section}>
            <Text style={styles(theme, lng).heading}>
              {t.contactInformation}
            </Text>
            <View style={styles(theme, lng).contactInfo}>
              {resumeData.personalInfo.contact?.map((item, index) => (
                <Text key={index} style={styles(theme, lng).text}>
                  {item}
                </Text>
              ))}
            </View>
          </View>

          {/* Professional Summary */}
          <View style={styles(theme, lng).section}>
            <Text style={styles(theme, lng).heading}>{t.profile}</Text>
            <Text style={styles(theme, lng).text}>
              {resumeData.personalInfo.summary}
            </Text>
          </View>

          {/* Work Experience */}
          <View style={styles(theme, lng).section}>
            <Text style={styles(theme, lng).heading}>{t.workExperience}</Text>
            {resumeData.experiences.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles(theme, lng).subHeading}>
                  {exp.jobTitle} {t.at} {exp.company}
                </Text>
                <Text style={{ ...styles(theme, lng).text, fontSize: 10 }}>
                  {formatDate(exp.startDate)} -{" "}
                  {formatDate(exp.endDate, resumeData.lng)}
                </Text>
                <Text style={styles(theme, lng).text}>
                  {exp.responsibilities}
                </Text>
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={styles(theme, lng).section}>
            <Text style={styles(theme, lng).heading}>{t.education}</Text>
            {resumeData.educations.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles(theme, lng).subHeading}>{edu.degree}</Text>
                <Text style={styles(theme, lng).text}>{edu.institution}</Text>
                <Text style={{ fontSize: 10 }}>
                  {formatDate(edu.graduationDate)}
                </Text>
              </View>
            ))}
          </View>

          {/* Skills */}
          <View style={styles(theme, lng).section}>
            <Text style={styles(theme, lng).heading}>{t.skills}</Text>
            <View
              style={{
                flexDirection: lng === "ar" ? "row-reverse" : "row",
                flexWrap: "wrap",
                gap: 5,
              }}
            >
              {resumeData.skills.map((skill, index) => (
                <Text key={index} style={styles(theme, lng).skill}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>

          {/* Languages */}
          <View wrap={false} style={styles(theme, lng).section}>
            <Text style={styles(theme, lng).heading}>{t.languages}</Text>
            <View style={styles(theme, lng).list}>
              {resumeData.languages.map((lang, index) => (
                <Text key={index}>
                  <Text>{lang.name}:</Text>{" "}
                  <Text style={styles(theme, lng).text}>
                    {lang.proficiency}
                  </Text>
                </Text>
              ))}
            </View>
          </View>

          {/* Courses */}
          <View wrap={false} style={styles(theme, lng).section}>
            <Text style={styles(theme, lng).heading}>{t.courses}</Text>
            <View>
              {resumeData.courses.map((course, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      textAlign: lng === "ar" ? "right" : "left",
                    }}
                  >
                    {course.name}
                  </Text>
                  <Text style={styles(theme, lng).text}>
                    {course.institution}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: lng === "ar" ? "right" : "left",
                    }}
                  >
                    {formatDate(course.completionDate)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
