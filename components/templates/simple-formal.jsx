import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

const SimpleFormalTemplate = ({ resumeData, selectedTheme, className }) => {
  const isArabic = resumeData.lng === "ar";
  const { lng } = resumeData;
  const direction = isArabic ? "rtl" : "ltr";
  const t = translations[lng] || translations["en"];
  const theme = selectedTheme || {
    primaryColor: "#666666",
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
      marginBottom: "15px",
      borderBottom: `1px solid ${theme.primaryColor}`,
    },
    experienceItem: {
      marginBottom: "20px",
      position: "relative",
    },
    skillItem: {
      backgroundColor: theme.backgroundColor,
      color: theme.primaryColor,
      padding: "5px 10px",
      borderRadius: "3px",
      fontSize: "14px",
      border: `1px solid ${theme.primaryColor}`,
    },
    row: {
      display: "flex",
      gap: "20px",
    },
    column: {
      flex: 1,
    },
    columnSmall: {
      flex: "0 0 30%",
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
      <div style={styles.row}>
        <div style={styles.column}>
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
        </div>
        <div style={styles.column}>
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
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.column}>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.skills}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {resumeData.skills.map((skill, index) => (
                <span key={index} style={styles.skillItem}>
                  {skill.name} ({skill.level})
                </span>
              ))}
            </div>
          </section>
        </div>

        <div style={styles.columnSmall}>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.languages}</h2>
            {resumeData.languages.map((lang, index) => (
              <p key={index}>
                <strong>{lang.name}:</strong> {lang.proficiency}
              </p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SimpleFormalTemplate;
