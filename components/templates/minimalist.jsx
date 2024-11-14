import React from "react";
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";
export default function MinimalistModernResume({
  resumeData,
  selectedTheme,
  className,
}) {
  const theme = selectedTheme || {
    id: "original",
    name: "Original",
    primaryColor: "#3B51A3",
    backgroundColor: "#EBF8FF",
  };
  const styles = {
    container: {
      direction: resumeData.lng === "ar" ? "rtl" : "ltr",
      maxWidth: "1000px",
      margin: "0 auto",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      overflow: "hidden",
    },
    header: {
      backgroundColor: theme.primaryColor,
      color: "#ffffff",
      padding: "40px",
      textAlign: "center",
    },
    name: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    jobTitle: {
      fontSize: "18px",
      marginBottom: "20px",
    },
    contact: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      fontSize: "14px",
    },
    main: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: "40px",
      padding: "40px",
    },
    section: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: theme.primaryColor,
      marginBottom: "15px",
      paddingBottom: "5px",
      borderBottom: `1px solid ${theme.primaryColor}`,
    },
    experienceItem: {
      marginBottom: "20px",
    },
    experienceTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    experienceCompany: {
      fontSize: "16px",
      fontStyle: "italic",
      marginBottom: "5px",
    },
    experienceDate: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "10px",
    },
    skillsList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    skillItem: {
      backgroundColor: theme.backgroundColor,
      color: theme.primaryColor,
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "14px",
    },
    educationItem: {
      marginBottom: "15px",
    },
    languageItem: {
      marginBottom: "10px",
    },
    courseItem: {
      marginBottom: "15px",
    },
  };
  const t = translations[resumeData.lng] || translations["en"];

  return (
    <div className={className} style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.name}>{resumeData.personalInfo.name}</h1>
        <p style={styles.jobTitle}>{resumeData.personalInfo.jobTitle}</p>
        <div style={styles.contact}>
          {resumeData.personalInfo.contact.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </header>

      <main style={styles.main}>
        <div>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.skills}</h2>
            <div style={styles.skillsList}>
              {resumeData.skills.map((skill, index) => (
                <span key={index} style={styles.skillItem}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.education}</h2>
            {resumeData.educations.map((edu, index) => (
              <div key={index} style={styles.educationItem}>
                <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
                <div>{edu.institution}</div>
                <div>{formatDate(edu.graduationDate)}</div>
              </div>
            ))}
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.languages}</h2>
            {resumeData.languages.map((lang, index) => (
              <div key={index} style={styles.languageItem}>
                {lang.name} - {lang.proficiency}
              </div>
            ))}
          </section>

          {resumeData.courses.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>{t.courses}</h2>
              {resumeData.courses.map((course, index) => (
                <div key={index} style={styles.courseItem}>
                  <div style={{ fontWeight: "bold" }}>{course.name}</div>
                  <div>{course.institution}</div>
                  <div>Completed: {formatDate(course.completionDate)}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.profile}</h2>
            <p>{resumeData.personalInfo.summary}</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.workExperience}</h2>
            {resumeData.experiences.map((exp, index) => (
              <div key={index} style={styles.experienceItem}>
                <h3 style={styles.experienceTitle}>{exp.jobTitle}</h3>
                <p style={styles.experienceCompany}>{exp.company}</p>
                <p style={styles.experienceDate}>
                  {formatDate(exp.startDate)} -{" "}
                  {formatDate(exp.endDate, resumeData.lng)}
                </p>
                <p>{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
