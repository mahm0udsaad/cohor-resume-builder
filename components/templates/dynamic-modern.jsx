import React from "react";
import { formatDate } from "@/helper/date";

const DynamicModernResume = ({ resumeData, selectedTheme, className }) => {
  const theme = selectedTheme || {
    id: "original",
    name: "Original",
    primaryColor: "#3B51A3",
    backgroundColor: "#EBF8FF",
  };
  const styles = {
    container: {
      direction: resumeData.lng === "ar" ? "rtl" : "ltr",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: '"Poppins", sans-serif',
      backgroundColor: "#ffffff",
      color: "#333",
      padding: "40px",
      boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
    },
    header: {
      display: "flex",
      flexDirection: resumeData.lng === "ar" ? "row-reverse" : "row",
      gap: "40px",
      marginBottom: "40px",
      alignItems: "center",
    },
    profileImage: {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `5px solid ${theme.primaryColor}`,
    },
    nameTitle: {
      borderLeft: `5px solid ${theme.primaryColor}`,
      paddingLeft: "20px",
    },
    name: {
      fontSize: "48px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: theme.primaryColor,
    },
    jobTitle: {
      fontSize: "24px",
      color: "#666",
      marginBottom: "20px",
    },
    contact: {
      display: "flex",
      gap: "20px",
      fontSize: "14px",
      color: "#666",
    },
    main: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "40px",
    },
    section: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: theme.primaryColor,
      marginBottom: "20px",
      position: "relative",
      paddingLeft: resumeData.lng === "ar" ? undefined : "20px",
      paddingRight: resumeData.lng === "ar" ? "20px" : undefined,
    },
    sectionTitleBefore: {
      content: '""',
      position: "absolute",
      top: "50%",
      right: resumeData.lng === "ar" ? "0" : undefined,
      left: resumeData.lng === "ar" ? undefined : "0",
      transform: "translateY(-50%)",
      width: "10px",
      height: "10px",
      backgroundColor: theme.primaryColor,
      borderRadius: "50%",
    },
    experienceItem: {
      marginBottom: "30px",
      position: "relative",
      paddingLeft: "30px",
    },
    experienceDot: {
      content: '""',
      position: "absolute",
      right: resumeData.lng === "ar" ? "0" : undefined,
      left: resumeData.lng === "ar" ? undefined : "0",
      top: "8px",
      width: "12px",
      height: "12px",
      backgroundColor: theme.primaryColor,
      borderRadius: "50%",
    },
    experienceTitle: {
      fontSize: "20px",
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
      padding: "8px 15px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "bold",
    },
    educationItem: {
      marginBottom: "20px",
    },
    languageItem: {
      marginBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
    },
    courseItem: {
      marginBottom: "15px",
    },
    summary: {
      fontSize: "16px",
      lineHeight: "1.6",
      marginBottom: "30px",
      padding: "20px",
      backgroundColor: theme.backgroundColor,
      borderRadius: "10px",
    },
  };

  return (
    <div className={className} style={styles.container}>
      <header style={styles.header}>
        <img
          src={resumeData.personalInfo.imageUrl}
          alt={resumeData.personalInfo.name}
          style={styles.profileImage}
        />
        <div style={styles.nameTitle}>
          <h1 style={styles.name}>{resumeData.personalInfo.name}</h1>
          <p style={styles.jobTitle}>{resumeData.personalInfo.jobTitle}</p>
          <div style={styles.contact}>
            {resumeData.personalInfo.contact.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>
      </header>

      <div style={styles.summary}>{resumeData.personalInfo.summary}</div>

      <main style={styles.main}>
        <div>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionTitleBefore}></span>
              Experience
            </h2>
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

        <div>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionTitleBefore}></span>
              Skills
            </h2>
            <div style={styles.skillsList}>
              {resumeData.skills.map((skill, index) => (
                <span key={index} style={styles.skillItem}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionTitleBefore}></span>
              Education
            </h2>
            {resumeData.educations.map((edu, index) => (
              <div key={index} style={styles.educationItem}>
                <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
                <div>{edu.institution}</div>
                <div>{formatDate(edu.graduationDate)}</div>
              </div>
            ))}
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionTitleBefore}></span>
              Languages
            </h2>
            {resumeData.languages.map((lang, index) => (
              <div key={index} style={styles.languageItem}>
                <span>{lang.name}</span>
                <span>{lang.proficiency}</span>
              </div>
            ))}
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionTitleBefore}></span>
              Courses
            </h2>
            {resumeData.courses.map((course, index) => (
              <div key={index} style={styles.courseItem}>
                <div style={{ fontWeight: "bold" }}>{course.name}</div>
                <div>{course.institution}</div>
                <div>Completed: {formatDate(course.completionDate)}</div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DynamicModernResume;
