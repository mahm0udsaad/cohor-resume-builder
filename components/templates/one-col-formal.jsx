import React from "react";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

export default function FormalOneColumnResume({ resumeData }) {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: '"Times New Roman", Times, serif',
      backgroundColor: "#ffffff",
      color: "#333",
      padding: "40px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      borderBottom: `2px solid ${resumeData.theme.primaryColor}`,
      paddingBottom: "20px",
    },
    name: {
      fontSize: "28px",
      fontWeight: "bold",
      color: resumeData.theme.primaryColor,
      marginBottom: "5px",
    },
    jobTitle: {
      fontSize: "18px",
      color: "#666",
      marginBottom: "10px",
    },
    contact: {
      fontSize: "14px",
    },
    section: {
      marginBottom: "25px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: resumeData.theme.primaryColor,
      borderBottom: `1px solid ${resumeData.theme.primaryColor}`,
      paddingBottom: "5px",
      marginBottom: "15px",
    },
    experienceItem: {
      marginBottom: "20px",
    },
    experienceTitle: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    experienceCompany: {
      fontSize: "14px",
      fontStyle: "italic",
    },
    experienceDate: {
      fontSize: "14px",
      color: "#666",
    },
    skillsList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "10px",
    },
    skillItem: {
      backgroundColor: resumeData.theme.backgroundColor,
      color: resumeData.theme.primaryColor,
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "14px",
    },
    educationItem: {
      marginBottom: "15px",
    },
    courseItem: {
      marginBottom: "10px",
    },
  };
  const isArabic = resumeData.lng === "ar";
  const { lng } = resumeData;
  const direction = isArabic ? "rtl" : "ltr";
  const t = translations[lng] || translations["en"];
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.name}>{resumeData.personalInfo.name}</h1>
        <p style={styles.jobTitle}>{resumeData.personalInfo.jobTitle}</p>
        <div style={styles.contact}>
          {resumeData.personalInfo.contact.map((item, index) => (
            <span key={index}>
              {item}{" "}
              {index < resumeData.personalInfo.contact.length - 1 ? " | " : ""}
            </span>
          ))}
        </div>
      </header>

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
              {exp.isCurrentJob ? t.present : formatDate(exp.endDate, lng)}
            </p>
            <p>{exp.responsibilities}</p>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.education}</h2>
        {resumeData.educations.map((edu, index) => (
          <div key={index} style={styles.educationItem}>
            <h3 style={styles.experienceTitle}>{edu.degree}</h3>
            <p>{edu.institution}</p>
            <p style={styles.experienceDate}>
              {formatDate(edu.graduationDate)}
            </p>
            {edu.gpaType === "percentage" && (
              <p className="text-sm text-gray-300">
                {t.gpa}: {edu.numericGpa}%
              </p>
            )}
            {edu.gpaType === "outOf4" && (
              <p className="text-sm text-gray-300">
                {t.gpa}: {edu.numericGpa}/4
              </p>
            )}
            {edu.gpaType === "outOf5" && (
              <p className="text-sm text-gray-300">
                {t.gpa}: {edu.numericGpa}/5
              </p>
            )}
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.skills}</h2>
        <div style={styles.skillsList}>
          {resumeData.skills.map((skill, index) => (
            <span key={index} style={styles.skillItem}>
              {t.availableSkills[`${skill.name}`] || skill.name} (
              {t.levels[skill.level.toLowerCase()]} )
            </span>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Languages</h2>
        {resumeData.languages.map((lang, index) => (
          <p key={index}>
            <strong>{lang.name}:</strong>{" "}
            {t[lang.proficiency.toLowerCase()] || lang.proficiency}
          </p>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.courses}</h2>
        {resumeData.courses.map((course, index) => (
          <div key={index} style={styles.courseItem}>
            <p>
              <strong>{course.name}</strong>
            </p>
            <p>
              {course.institution} - {formatDate(course.completionDate)}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
