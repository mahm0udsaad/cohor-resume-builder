import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";
import { formatGPA } from "@/utils/gpa";

function SkillLevel({ level }) {
  const levels = {
    basic: 1,
    intermediate: 2,
    advanced: 3,
    beginner: 1,
    native: 3,
  };
  const dots = Array(3)
    .fill(0)
    .map((_, i) => i < levels[level]);

  return (
    <View style={styles.skillLevel}>
      {dots.map((filled, i) => (
        <View
          key={i}
          style={[
            styles.skillDot,
            filled ? styles.skillDotFilled : styles.skillDotEmpty,
          ]}
        />
      ))}
    </View>
  );
}

export default function DotedTemplate({ resumeData }) {
  const isArabic = resumeData.lng === "ar";
  const t = translations[resumeData.lng] || translations["en"];

  return (
    <Document>
      <Page size="A4" style={styles.page} direction={isArabic ? "rtl" : "ltr"}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <Image
                src={resumeData.personalInfo.imageUrl}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
                <Text style={styles.jobTitle}>
                  {resumeData.personalInfo.jobTitle}
                </Text>
                <View style={styles.contact}>
                  {resumeData.personalInfo.contact?.map((contact, index) => (
                    <Text key={index} style={styles.contactText}>
                      {contact}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 16,
                backgroundColor: "#ffffff",
                borderTopLeftRadius: "50%",
                borderTopRightRadius: "50%",
              }}
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* About Me */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.aboutMe}</Text>
                <Text style={styles.paragraph}>
                  {resumeData.personalInfo.summary}
                </Text>
              </View>

              {/* Experience */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.experience}</Text>
                {resumeData.experiences.map((exp, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <Text style={styles.timelineTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.companyName}>{exp.company}</Text>
                    <Text style={styles.timelineDate}>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.isCurrentJob
                        ? t.present
                        : formatDate(exp.endDate, resumeData.lng)}
                    </Text>
                    <Text style={styles.paragraph}>{exp.responsibilities}</Text>
                  </View>
                ))}
              </View>

              {/* Education */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.education}</Text>
                {resumeData.educations.map((edu, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <Text style={styles.timelineTitle}>{edu.degree}</Text>
                    <Text style={styles.companyName}>{edu.institution}</Text>
                    <Text style={styles.timelineDate}>
                      {formatDate(edu.graduationDate, resumeData.lng)}
                    </Text>
                    <Text style={styles.paragraph}>
                      {formatGPA(edu.gpaType, edu.numericGpa, t, isArabic)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              {/* Skills */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.skills}</Text>
                {resumeData.skills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <SkillLevel level={skill.level} />
                  </View>
                ))}
              </View>

              {/* Languages */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.languages}</Text>
                {resumeData.languages.map((lang, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillName}>{lang.name}</Text>
                    <SkillLevel level={lang.proficiency} />
                  </View>
                ))}
              </View>

              {/* Courses */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.courses}</Text>
                {resumeData.courses.map((course, index) => (
                  <View key={index} style={styles.courseItem}>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.companyName}>{course.institution}</Text>
                    <Text style={styles.timelineDate}>
                      {formatDate(course.completionDate, resumeData.lng)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
  },
  container: {
    backgroundColor: "#1E293B",
  },
  header: {
    color: "#FFF",
    padding: 20,
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: "50%",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  contact: {
    marginTop: 5,
    gap: 5,
  },
  contactText: {
    fontSize: 10,
  },
  content: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    flexDirection: "row",
    gap: 20,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    width: "30%",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 10,
    color: "#374151",
  },
  timelineItem: {
    borderLeft: "2px solid #E5E7EB",
    paddingLeft: 10,
    marginBottom: 10,
  },
  timelineTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  companyName: {
    fontSize: 10,
    color: "#6B7280",
  },
  timelineDate: {
    fontSize: 9,
    color: "#9CA3AF",
  },
  skillItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  skillName: {
    fontSize: 10,
  },
  skillLevel: {
    flexDirection: "row",
    gap: 2,
  },
  skillDot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
  },
  skillDotFilled: {
    backgroundColor: "#1E293B",
  },
  skillDotEmpty: {
    borderColor: "#6B7280",
    borderWidth: 1,
  },
  courseItem: {
    marginBottom: 5,
  },
  courseName: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
