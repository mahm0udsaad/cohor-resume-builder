import React from "react";
import { translations } from "@/data/data"; // Import your translations
import { formatDate } from "@/helper/date"; // Assume a date formatter utility

const ProfessionalResume = ({ resumeData, selectedTheme }) => {
  const isArabic = resumeData.lng === "ar"; // Detect Arabic for RTL layout
  const { lng } = resumeData;
  const t = translations[lng] || translations["en"]; // Use fallback to English if translation isn't available
  const direction = isArabic ? "rtl" : "ltr"; // RTL for Arabic, LTR for others

  // Default theme values in case selectedTheme is undefined
  const defaultTheme = {
    primaryColor: "#1E201E",
    backgroundColor: "#ECDFCC",
    accentColor: "#697565",
  };

  const theme = selectedTheme || defaultTheme; // Fallback to default theme if none selected

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#ffffff",
      color: theme.accentColor, // Use accent color for text
      borderRadius: "8px",
      overflow: "hidden",
    },
    header: {
      backgroundColor: theme.primaryColor,
      padding: "20px",
      borderBottom: `1px solid ${theme.accentColor}`,
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    avatar: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `2px solid ${theme.accentColor}`,
    },
    name: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "0",
      color: "#ffffff", // Ensure name is visible against the primaryColor
    },
    jobTitle: {
      fontSize: "18px",
      color: "#d1d5db", // Light gray for job title, good contrast against dark background
      margin: "5px 0",
    },
    contactInfo: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      fontSize: "14px",
      color: "#d1d5db", // Lighter shade for contact info to match theme
    },
    main: {
      padding: "20px",
    },
    section: {
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: theme.accentColor, // Section title uses accent color for better contrast
      borderBottom: `2px solid ${theme.accentColor}`,
      paddingBottom: "5px",
      marginBottom: "10px",
    },
    sectionContent: {
      fontSize: "16px",
      color: theme.accentColor, // Body text uses accent color
      lineHeight: "1.6",
    },
    experienceItem: {
      marginBottom: "15px",
    },
    experienceTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: theme.accentColor,
      margin: "0",
    },
    experienceDate: {
      fontSize: "14px",
      color: "#6c757d",
      margin: "5px 0",
    },
    skillsList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      listStyle: "none",
      padding: "0",
    },
    skillItem: {
      backgroundColor: theme.primaryColor, // Skills use primary color for background
      color: theme.backgroundColor, // Skills text uses the inverse color for better contrast
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    },
    languageItem: {
      display: "inline-block",
      backgroundColor: theme.primaryColor, // Languages also use primary color background
      color: theme.backgroundColor, // Inverse text color for contrast
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
      marginRight: "10px",
      marginBottom: "10px",
    },
  };

  return (
    <div
      style={{
        ...styles.container,
        direction: direction, // Set text direction based on language
      }}
    >
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img
            src={
              resumeData.personalInfo.imageUrl ||
              "/placeholder.svg?height=100&width=100"
            }
            alt={resumeData.personalInfo.name}
            style={styles.avatar}
          />
          <div>
            <h1 style={styles.name}>{resumeData.personalInfo.name}</h1>
            <p style={styles.jobTitle}>{resumeData.personalInfo.jobTitle}</p>
            <div style={styles.contactInfo}>
              {resumeData.personalInfo.contact.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </header>
      <main style={styles.main}>
        {/* Profile Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.profile}</h2>
          <p style={styles.sectionContent}>{resumeData.personalInfo.summary}</p>
        </section>

        {/* Experience Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.experience}</h2>
          {resumeData.experiences.map((exp, index) => (
            <div key={index} style={styles.experienceItem}>
              <h3 style={styles.experienceTitle}>
                {exp.jobTitle} - {exp.company}
              </h3>
              <p style={styles.experienceDate}>
                {formatDate(exp.startDate, resumeData.lng)} -{" "}
                {formatDate(exp.endDate, resumeData.lng)}
              </p>
              <p style={styles.sectionContent}>{exp.responsibilities}</p>
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.education}</h2>
          {resumeData.educations.map((edu, index) => (
            <div key={index} style={styles.experienceItem}>
              <h3 style={styles.experienceTitle}>{edu.degree}</h3>
              <p style={styles.sectionContent}>
                {edu.institution}, {t.graduated}{" "}
                {formatDate(edu.graduationDate, resumeData.lng)}
              </p>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.skills}</h2>
          <ul style={styles.skillsList}>
            {resumeData.skills.map((skill, index) => (
              <li key={index} style={styles.skillItem}>
                {skill.name} ({skill.level})
              </li>
            ))}
          </ul>
        </section>

        {/* Languages Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.languages}</h2>
          <ul style={styles.skillsList}>
            {resumeData.languages.map((lang, index) => (
              <li key={index} style={styles.languageItem}>
                {lang.name} - {lang.proficiency}
              </li>
            ))}
          </ul>
        </section>

        {/* Courses Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.courses}</h2>
          {resumeData.courses.map((course, index) => (
            <div key={index} style={styles.experienceItem}>
              <h4>{course.name}</h4>
              <p>{course.institution}</p>
              <p>{formatDate(course.completionDate, resumeData.lng)}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ProfessionalResume;
