import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";

// Assuming data, t, formatDate, and isArabic are passed in as props
export default function ModernFormalResumeTemplate({
  resumeData,
  selectedTheme,
}) {
  const isArabic = resumeData.lng === "ar";
  const t = isArabic ? translations.ar : translations.en;

  const getSkillLevel = (level) => {
    switch (level) {
      case "advanced":
        return 90;
      case "intermediate":
        return 70;
      case "basic":
        return 50;
      default:
        return 0;
    }
  };
  const theme = selectedTheme || {
    backgroundColor: "#ffffff",
    primaryColor: "#3498db",
  };
  return (
    <div
      id="resume-template"
      style={{
        fontFamily: isArabic ? "'Amiri', serif" : "Arial, sans-serif", // Adjust font for Arabic
        padding: "20px",
        backgroundColor: theme.backgroundColor,
        color: "#333",
        direction: isArabic ? "rtl" : "ltr", // Apply RTL for Arabic
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          borderBottom: `2px solid ${theme.primaryColor}`,
          paddingBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <h1
              style={{
                fontSize: "2.5em",
                margin: "0",
                color: theme.primaryColor,
              }}
            >
              {resumeData.personalInfo.name}
            </h1>
            <h2
              style={{
                fontSize: "1.5em",
                fontWeight: "normal",
                margin: "10px 0 0",
                color: "#7f8c8d",
              }}
            >
              {resumeData.personalInfo.jobTitle}
            </h2>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isArabic ? "flex-start" : "flex-end", // Adjust alignment for Arabic
          }}
        >
          {resumeData.personalInfo.contact?.map((item, index) => (
            <p key={index} style={{ margin: "5px 0" }}>
              {item}
            </p>
          ))}
        </div>
      </header>

      <main style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: "2" }}>
          <section style={{ marginBottom: "30px" }}>
            <h3
              style={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.primaryColor}`,
                paddingBottom: "10px",
              }}
            >
              {t.profile}
            </h3>
            <p>{resumeData.personalInfo.summary}</p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h3
              style={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.primaryColor}`,
                paddingBottom: "10px",
              }}
            >
              {t.workExperience}
            </h3>
            {resumeData.experiences.map((job, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h4 style={{ margin: "0", color: "#2c3e50" }}>
                  {job.jobTitle}
                </h4>
                <p
                  style={{
                    margin: "5px 0",
                    fontStyle: "italic",
                    color: "#7f8c8d",
                  }}
                >
                  {job.company} | {formatDate(job.startDate)} -{" "}
                  {formatDate(job.endDate, resumeData.lng)}
                </p>
                <p>{job.responsibilities}</p>
              </div>
            ))}
          </section>

          <section>
            <h3
              style={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.primaryColor}`,
                paddingBottom: "10px",
              }}
            >
              {t.education}
            </h3>
            {resumeData.educations.map((edu, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <h4 style={{ margin: "0", color: "#2c3e50" }}>{edu.degree}</h4>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  {edu.institution}, {formatDate(edu.graduationDate)}
                </p>
              </div>
            ))}
          </section>
        </div>

        <aside style={{ flex: "1" }}>
          <section style={{ marginBottom: "30px" }}>
            <h3
              style={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.primaryColor}`,
                paddingBottom: "10px",
              }}
            >
              {t.skills}
            </h3>
            {resumeData.skills.map((skill, index) => (
              <div key={index} style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span>{skill.name}</span>
                  <span>{t[skill.level]}</span>
                </div>
                <div
                  style={{
                    height: "10px",
                    backgroundColor: "#ecf0f1",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${getSkillLevel(skill.level)}%`,
                      height: "100%",
                      backgroundColor: theme.primaryColor,
                      transition: "width 0.5s ease-in-out",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h3
              style={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.primaryColor}`,
                paddingBottom: "10px",
              }}
            >
              {t.languages}
            </h3>
            {resumeData.languages.map((lang, index) => (
              <p key={index} style={{ margin: "5px 0" }}>
                <strong>{lang.name}:</strong> {lang.proficiency}
              </p>
            ))}
          </section>

          <section>
            <h3
              style={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.primaryColor}`,
                paddingBottom: "10px",
              }}
            >
              {t.courses}
            </h3>
            {resumeData.courses.map((course, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <h4 style={{ margin: "0", color: "#2c3e50" }}>{course.name}</h4>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  {course.institution}, {formatDate(course.completionDate)}
                </p>
              </div>
            ))}
          </section>
        </aside>
      </main>
    </div>
  );
}
