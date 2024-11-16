import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

const ElegantFormalTemplate = ({ resumeData, selectedTheme, className }) => {
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
      backgroundColor: "#ffffff",
      padding: "20px",
      direction,
    },
    header: {
      borderBottom: `2px solid ${theme.primaryColor}`,
      paddingBottom: "20px",
      marginBottom: "30px",
    },
    name: {
      fontSize: "32px",
      fontWeight: "bold",
      color: theme.primaryColor,
      marginBottom: "5px",
    },
    jobTitle: {
      fontSize: "18px",
      color: "#7f8c8d",
      marginBottom: "15px",
    },
    contact: {
      fontSize: "14px",
      color: "#34495e",
    },
    section: {
      marginBottom: "25px",
    },
    sectionTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      color: theme.primaryColor,
      borderLeft: isArabic ? "none" : `4px solid ${theme.primaryColor}`,
      borderRight: isArabic ? `4px solid ${theme.primaryColor}` : "none",
      paddingLeft: isArabic ? "0" : "10px",
      paddingRight: isArabic ? "10px" : "0",
      marginBottom: "15px",
    },
    experienceItem: {
      marginBottom: "20px",
      position: "relative",
      paddingLeft: isArabic ? "0" : "20px",
      paddingRight: isArabic ? "20px" : "0",
    },
    bullet: {
      position: "absolute",
      left: resumeData.lng === "ar" ? "" : 0,
      right: resumeData.lng === "ar" ? 0 : "",
      top: "5px",
      width: "10px",
      height: "10px",
      backgroundColor: theme.primaryColor,
      borderRadius: "50%",
    },
    skillItem: {
      backgroundColor: theme.backgroundColor,
      color: theme.primaryColor,
      padding: "5px 10px",
      borderRadius: "3px",
      fontSize: "14px",
      border: `1px solid ${theme.primaryColor}`,
    },
  };

  return (
    <div className={className} style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.name}>{resumeData.personalInfo.name}</h1>
        <p style={styles.jobTitle}>{resumeData.personalInfo.jobTitle}</p>
        <div style={styles.contact}>
          {resumeData.personalInfo.contact.map((item, index) => (
            <span key={index}>
              {item}
              {index < resumeData.personalInfo.contact.length - 1 ? " | " : ""}
            </span>
          ))}
        </div>
      </header>

      <section style={styles.section}>
        <p>{resumeData.personalInfo.summary}</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.workExperience}</h2>
        {resumeData.experiences.map((exp, index) => (
          <div key={index} style={styles.experienceItem}>
            <div style={styles.bullet}></div>
            <h3>{exp.jobTitle}</h3>
            <p>{exp.company}</p>
            <p>
              {formatDate(exp.startDate)} - {formatDate(exp.endDate, lng)}
            </p>
            <p>{exp.responsibilities}</p>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.education}</h2>
        {resumeData.educations.map((edu, index) => (
          <div key={index}>
            <h3>{edu.degree}</h3>
            <p>{edu.institution}</p>
            <p>{formatDate(edu.graduationDate)}</p>
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
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.skills}</h2>
        <div>
          {resumeData.skills.map((skill, index) => (
            <span key={index} style={styles.skillItem}>
              {skill.name} ({skill.level})
            </span>
          ))}
        </div>
      </section>

      {resumeData.languages.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.languages}</h2>
          {resumeData.languages.map((lang, index) => (
            <p key={index}>
              <strong>{lang.name}:</strong> {lang.proficiency}
            </p>
          ))}
        </section>
      )}

      {resumeData.courses.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t.courses}</h2>
          {resumeData.courses.map((course, index) => (
            <div key={index}>
              <p>
                <strong>{course.name}</strong>
              </p>
              <p>
                {course.institution} - {formatDate(course.completionDate)}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ElegantFormalTemplate;
