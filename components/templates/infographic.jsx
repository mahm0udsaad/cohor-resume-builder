import React from "react";
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";

const getProficiencyWidth = (proficiency) => {
  switch (proficiency) {
    case "native":
      return "100%";
    case "fluent":
      return "90%";
    case "advanced":
      return "75%";
    case "intermediate":
      return "50%";
    case "beginner":
    default:
      return "25%";
  }
};

export default function InfographicResume({
  className,
  resumeData,
  selectedTheme,
}) {
  const theme = selectedTheme || {
    id: "original",
    name: "Original",
    primaryColor: "#3B51A3",
    backgroundColor: "#EBF8FF",
  };
  const t = translations[resumeData.lng] || translations.en;
  const dir = resumeData.lng === "ar" ? "rtl" : "ltr";

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: '"Roboto", sans-serif',
      backgroundColor: "#f0f0f0",
      color: "#333",
      padding: "10px",
    },
    header: {
      backgroundColor: theme.primaryColor,
      color: "#fff",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
    },
    profileImage: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "5px solid #fff",
      marginRight: "15px",
      marginLeft: "15px",
    },
    name: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    jobTitle: {
      fontSize: "20px",
      opacity: 0.8,
    },
    contact: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      fontSize: "14px",
    },
    main: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },
    section: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: theme.primaryColor,
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      width: "10px",
      height: "10px",
      backgroundColor: theme.primaryColor,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "5px",
      marginRight: "5px",
      color: "#fff",
      fontSize: "16px",
    },
    experienceItem: {
      marginBottom: "20px",
      position: "relative",
      paddingLeft: "5px",
      paddingRight: "5px",
      borderLeft:
        resumeData.lng === "en" ? `2px solid ${theme.primaryColor}` : undefined,
      borderRight:
        resumeData.lng === "ar" ? `2px solid ${theme.primaryColor}` : undefined,
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
      alignItems: "center",
    },
    proficiencyBar: {
      width: "100px",
      height: "10px",
      backgroundColor: "#e0e0e0",
      borderRadius: "5px",
      overflow: "hidden",
    },
    proficiencyFill: {
      height: "100%",
      backgroundColor: theme.primaryColor,
    },
    courseItem: {
      marginBottom: "15px",
      padding: "10px",
      backgroundColor: theme.backgroundColor,
      borderRadius: "5px",
    },
    summary: {
      fontSize: "16px",
      lineHeight: "1.6",
      marginBottom: "30px",
    },
  };

  return (
    <div dir={dir} className={`${className}`} style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <img
            src={resumeData.personalInfo.imageUrl}
            alt={resumeData.personalInfo.name}
            style={styles.profileImage}
          />
          <div style={styles.nameTitle}>
            <h1 style={styles.name}>{resumeData.personalInfo.name}</h1>
            <p style={styles.jobTitle}>{resumeData.personalInfo.jobTitle}</p>
          </div>
        </div>
        <div style={styles.contact}>
          {resumeData.personalInfo.contact.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </header>

      <div style={styles.summary}>{resumeData.personalInfo.summary}</div>

      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.icon}></span>
            {t.workExperience}
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

        <div className="">
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.icon}></span>
              {t.skills}
            </h2>
            <div style={styles.skillsList}>
              {resumeData.skills.map((skill, index) => (
                <span key={index} style={styles.skillItem}>
                  {t.availableSkills[skill.name] || skill.name}
                </span>
              ))}
            </div>
          </section>

          {resumeData.languages.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <span style={styles.icon}></span>
                {t.languages}
              </h2>
              {resumeData.languages.map((lang, index) => (
                <div key={index} style={styles.languageItem}>
                  <span>{lang.name}</span>
                  <div style={styles.proficiencyBar}>
                    <div
                      style={{
                        ...styles.proficiencyFill,
                        width: getProficiencyWidth(
                          lang.proficiency.toLowerCase(),
                        ),
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {resumeData.courses.length > 0 ? (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <span style={styles.icon}></span>
                {t.courses}
              </h2>
              {resumeData.courses.map((course, index) => (
                <div key={index} style={styles.courseItem}>
                  <div style={{ fontWeight: "bold" }}>{course.name}</div>
                  <div>{course.institution}</div>
                  <div>{formatDate(course.completionDate)}</div>
                </div>
              ))}
            </section>
          ) : (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <span style={styles.icon}></span>
                {t.education}
              </h2>
              {resumeData.educations.map((edu, index) => (
                <div key={index} style={styles.educationItem}>
                  <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
                  <div>{edu.institution}</div>
                  <div>{formatDate(edu.graduationDate)}</div>
                  <div>
                    {edu.gpaType === "percentage" && (
                      <p className="text-sm text-gray-600">
                        {t.gpa}: {edu.numericGpa}%
                      </p>
                    )}
                    {edu.gpaType === "descriptive" && (
                      <p className="text-sm text-gray-600">
                        {t.gpas[edu.descriptiveGpa]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {resumeData.courses.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.icon}></span>
              {t.education}
            </h2>
            {resumeData.educations.map((edu, index) => (
              <div key={index} style={styles.educationItem}>
                <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
                <div>{edu.institution}</div>
                <div>{formatDate(edu.graduationDate)}</div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
