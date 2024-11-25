import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";
import { formatGPA } from "@/utils/gpa";

export default function ElegantFormalTemplate({
  resumeData,
  selectedTheme,
  className,
}) {
  const isArabic = resumeData.lng === "ar";
  const { lng } = resumeData;
  const direction = isArabic ? "rtl" : "ltr";
  const t = translations[lng] || translations["en"];
  const theme = selectedTheme || {
    primaryColor: "#2c3e50",
    backgroundColor: "#ecf0f1",
  };
  const styles = {
    container: {
      direction: direction,
      padding: "20px",
      color: "#333",
      backgroundColor: "#FFFFFF",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      borderBottom: `2px solid ${theme.primaryColor}`,
    },
    name: {
      fontSize: "28px",
      color: theme.primaryColor,
      marginBottom: "10px",
    },
    jobTitle: {
      fontSize: "20px",
      color: "#4a5568",
      marginBottom: "15px",
    },
    contact: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "15px",
      flexWrap: "wrap",
      paddingBottom: "20px",
    },
    section: {
      marginBottom: "30px",
      borderTop: `1px solid ${theme.primaryColor}`,
      paddingTop: "30px",
      position: "relative",
    },
    sectionTitle: {
      fontSize: "18px",
      color: theme.primaryColor,
      backgroundColor: "white",
      padding: "0 10px",
      position: "absolute",
      top: "-12px",
      left: "20px",
      textTransform: "uppercase",
    },
    experienceItem: {
      marginBottom: "20px",
    },
    jobHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
    },
    company: {
      fontWeight: "bold",
    },
    dates: {
      color: "#666",
    },
    responsibilities: {
      marginTop: "5px",
      lineHeight: "1.5",
    },
    skillsGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    skillItem: {
      padding: "5px 10px",
      width: "30%",
      backgroundColor: "#f0f4f8",
      borderRadius: "4px",
      fontSize: "14px",
    },
    summary: {
      lineHeight: "1.6",
      marginBottom: "10px",
    },
    educationItem: {
      marginBottom: "15px",
    },
    languageItem: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    languageRow: {
      width: "45%",
      marginBottom: "10px",
    },
    languageName: {
      fontSize: "14px",
      marginBottom: "4px",
    },
    progressBarContainer: {
      width: "200px",
      height: "12px",
      backgroundColor: "#e2e2e2",
      position: "relative",
    },
    progressBar: {
      height: "100%",
      backgroundColor: "#d1d1d1",
    },
    languageLevel: {
      fontSize: "12px",
      color: "#666",
      marginTop: "4px",
    },
  };

  return (
    <div className={className} style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.name}>{resumeData.personalInfo.name}</h1>
        <h2 style={styles.jobTitle}>{resumeData.personalInfo.jobTitle}</h2>
      </header>
      <div style={styles.contact}>
        {resumeData.personalInfo.contact.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.profile}</h2>
        <p style={styles.summary}>{resumeData.personalInfo.summary}</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.education}</h2>
        {resumeData.educations.map((edu, index) => (
          <div key={index} style={styles.educationItem}>
            <div style={styles.jobHeader}>
              <div>
                <span style={styles.company}>{edu.degree}</span>
                <div>{edu.institution}</div>
              </div>
              <div style={styles.dates}>
                {formatDate(edu.graduationDate)}
                <div>{formatGPA(edu.gpaType, edu.numericGpa, t, isArabic)}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.workExperience}</h2>
        {resumeData.experiences.map((exp, index) => (
          <div key={index} style={styles.experienceItem}>
            <div style={styles.jobHeader}>
              <div>
                <span style={styles.company}>{exp.company}</span> -{" "}
                {exp.jobTitle}
              </div>
              <div style={styles.dates}>
                {formatDate(exp.startDate)} -{" "}
                {formatDate(exp.endDate, resumeData.lng)}
              </div>
            </div>
            <p style={styles.responsibilities}>{exp.responsibilities}</p>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.skills}</h2>
        <div style={styles.skillsGrid}>
          {resumeData.skills.map((skill, index) => (
            <div key={index} style={styles.skillItem}>
              {t.availableSkills[`${skill.name}`] || skill.name} -
              {t.levels[skill.level.toLowerCase()]}
            </div>
          ))}
        </div>
      </section>

      {resumeData.courses.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.courses}</h2>
          {resumeData.courses.map((course, index) => (
            <div key={index} style={styles.educationItem}>
              <div style={styles.jobHeader}>
                <div>
                  <span style={styles.company}>{course.name}</span>
                  <div>{course.institution}</div>
                </div>
                <div style={styles.dates}>
                  {formatDate(course.completionDate)}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Languages</h2>
        <div style={styles.skillsGrid}>
          {resumeData.languages.map((lang, index) => (
            <div key={index} style={styles.languageRow}>
              <div style={styles.languageName}>{lang.name}:</div>
              <div style={styles.progressBarContainer}>
                <div
                  style={{
                    ...styles.progressBar,
                    width:
                      lang.proficiency === "native"
                        ? "100%"
                        : lang.proficiency === "fluent"
                        ? "80%"
                        : lang.proficiency === "intermediate"
                        ? "60%"
                        : lang.proficiency === "beginner"
                        ? "40%"
                        : "20%",
                  }}
                ></div>
              </div>
              <div style={styles.languageLevel}>
                {t[lang.proficiency.toLowerCase()]}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
