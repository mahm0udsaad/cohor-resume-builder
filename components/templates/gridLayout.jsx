import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";
import React from "react";

export default function GridLayoutResume({
  resumeData,
  selectedTheme,
  className,
}) {
  const isArabic = resumeData.lng === "ar"; // Detect Arabic for RTL layout
  const { lng } = resumeData;
  const t = translations[lng] || translations["en"]; // Use fallback to English if translation isn't available
  const direction = isArabic ? "rtl" : "ltr"; // RTL for Arabic, LTR for others
  const theme = selectedTheme || {
    primaryColor: "#000000cc",
    backgroundColor: "#ededed",
    accentColor: "#697565",
  }; // Fallback to default theme if none selected
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#ffffff",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridGap: "20px",
      padding: "10px",
      color: theme.accentColor, // Use accent color for general text
    },
    header: {
      gridColumn: "1 / -1",
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      alignItems: "center",
      gap: "20px",
      marginBottom: "10px",
      backgroundColor: theme.primaryColor, // Primary color for header background
      padding: "20px",
      borderRadius: "8px",
    },
    avatar: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `2px solid ${theme.accentColor}`, // Accent color for avatar border
    },
    headerInfo: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontSize: "32px",
      fontWeight: "bold",
      margin: "0",
      color: "#ffffff", // Name text visible on primary color background
    },
    jobTitle: {
      fontSize: "18px",
      color: "#d1d5db", // Light gray text for job title
      margin: "5px 0",
    },
    contactInfo: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      fontSize: "14px",
      color: theme.backgroundColor, // Background color for contact info text
    },
    mainContent: {
      gridColumn: "1 / 3",
      display: "grid",
      gridGap: "20px",
    },
    sidebar: {
      gridColumn: "3 / 4",
      display: "grid",
      gridGap: "20px",
    },
    section: {
      backgroundColor: theme.backgroundColor, // Section background uses theme background color
      padding: "20px",
      borderRadius: "8px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: theme.accentColor, // Accent color for section titles
      borderBottom: `2px solid ${theme.accentColor}`,
      paddingBottom: "10px",
      marginBottom: "15px",
    },
    sectionContent: {
      fontSize: "14px",
      color: theme.accentColor, // Accent color for body text
      lineHeight: "1.6",
    },
    experienceItem: {
      marginBottom: "15px",
    },
    experienceTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: theme.accentColor, // Accent color for experience titles
      margin: "0 0 5px 0",
    },
    experienceDate: {
      fontSize: "14px",
      color: "#7f8c8d",
      marginBottom: "5px",
    },
    skillsList: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
      listStyle: "none",
      padding: "0",
    },
    skillItem: {
      backgroundColor: theme.primaryColor, // Primary color for skill item background
      color: theme.backgroundColor, // Inverse text color for contrast
      padding: "5px 5px",
      borderRadius: "15px",
      fontSize: "12px",
      textAlign: "center",
    },
    languageItem: {
      textAlign: "center",
      backgroundColor: theme.primaryColor, // Primary color for language item background
      color: theme.backgroundColor, // Inverse text color for contrast
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "12px",
      marginBottom: "5px",
      display: "inline-block",
      marginRight: "5px",
    },
  };

  return (
    <div
      className={className}
      id="resume-template"
      dir={direction}
      style={styles.container}
    >
      <header style={styles.header}>
        <img
          src={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
          alt={resumeData.personalInfo.name}
          style={styles.avatar}
        />
        <div style={styles.headerInfo}>
          <h1 style={styles.name}>{resumeData.personalInfo.name}</h1>
          <p style={styles.jobTitle}>{resumeData.personalInfo.jobTitle}</p>
          <div style={styles.contactInfo}>
            {resumeData.personalInfo.contact?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>
      </header>

      <div style={styles.mainContent}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.profile}</h2>
          <p style={styles.sectionContent}>{resumeData.personalInfo.summary}</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.workExperience}</h2>
          {resumeData.experiences.map((exp, index) => (
            <div key={index} style={styles.experienceItem}>
              <h3 style={styles.experienceTitle}>
                {exp.jobTitle} - {exp.company}
              </h3>
              <p style={styles.experienceDate}>
                {formatDate(exp.startDate)} -{" "}
                {formatDate(exp.endDate, resumeData.lng)}
              </p>
              <p style={styles.sectionContent}>{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      </div>

      <div style={styles.sidebar}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.education}</h2>
          {resumeData.educations.map((edu, index) => (
            <div key={index} style={styles.experienceItem}>
              <h3 style={styles.experienceTitle}>{edu.degree}</h3>
              <p style={styles.sectionContent}>
                {edu.institution}, Graduated {formatDate(edu.graduationDate)}
              </p>
              {edu.gpaType === "numeric" && (
                <p className="text-sm text-gray-600">GPA: {edu.numericGpa}</p>
              )}
              {edu.gpaType === "descriptive" && (
                <p className="text-sm text-gray-600">
                  GPA: {edu.descriptiveGpa}
                </p>
              )}
            </div>
          ))}
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.skills}</h2>
          <ul style={styles.skillsList}>
            {resumeData.skills.map((skill, index) => (
              <li key={index} style={styles.skillItem}>
                {t.availableSkills[`${skill.name}`] || skill.name} (
                {t.levels[skill.level.toLowerCase()]})
              </li>
            ))}
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.languages}</h2>
          <div style={styles.skillsList}>
            {resumeData.languages.map((lang, index) => (
              <span key={index} style={styles.languageItem}>
                {lang.name} ({t[lang.proficiency.toLowerCase()]})
              </span>
            ))}
          </div>
        </section>

        {resumeData.courses[0]?.name.trim() !== "" && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.courses}</h2>
            {resumeData.courses.map((course, index) => (
              <div key={index} style={styles.experienceItem}>
                <h3 style={styles.experienceTitle}>{course.name}</h3>
                <p style={styles.sectionContent}>
                  {course.institution}, Completed{" "}
                  {formatDate(course.completionDate)}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
