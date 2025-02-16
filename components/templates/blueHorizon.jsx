import React from "react";
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";

export default function BlueHorizon({ resumeData, selectedTheme, className }) {
  const isArabic = resumeData.lng === "ar";

  const { lng } = resumeData;
  const t = translations[lng] || translations["en"]; // Fallback to English if translation isn't available
  const direction = isArabic ? "rtl" : "ltr"; // RTL for Arabic, LTR for others

  // Default theme values in case selectedTheme is undefined
  const defaultTheme = {
    primaryColor: "#2b2d2e",
    backgroundColor: "#ffffff",
    accentColor: "#343a40",
  };

  const theme = selectedTheme || defaultTheme;
  const getSkillWidth = (level) => {
    switch (level) {
      case "expert":
        return "100%";
      case "experienced":
        return "70%";
      case "skillful":
        return "50%";
      default:
        return "30%";
    }
  };
  return (
    <div
      className={className}
      id="resume-template"
      dir={direction}
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        backgroundColor: theme.backgroundColor,
      }}
    >
      {/* Left Column */}
      <div
        style={{
          backgroundColor: theme.primaryColor,
          color: "white",
          padding: "20px",
          width: "30%",
        }}
      >
        <h1
          style={{
            fontSize: "1.5em",
            marginBottom: "10px",
            fontWeight: 700,
          }}
        >
          {resumeData.personalInfo.name}
        </h1>
        <h2
          style={{
            fontSize: "1em",
            fontWeight: 500,
            marginBottom: "20px",
          }}
        >
          {resumeData.personalInfo.jobTitle}
        </h2>
        <section style={{ marginBottom: "20px" }}>
          <h3
            style={{
              borderBottom: "1px solid white",
              paddingBottom: "5px",
              fontWeight: 600,
            }}
          >
            {t.contactInformation}
          </h3>
          {resumeData.personalInfo.contact?.map((item, index) => (
            <p key={index} style={{ margin: "5px 0", fontSize: "0.6em" }}>
              {item}
            </p>
          ))}
        </section>

        <section>
          <h3
            style={{
              borderBottom: "1px solid white",
              paddingBottom: "5px",
              fontWeight: 600,
            }}
          >
            {t.skills}
          </h3>
          {resumeData.skills.map((skill, index) => (
            <div key={index} style={{ marginBottom: "6px" }}>
              <p
                style={{
                  paddingBottom: "10px",
                }}
              >
                {t.availableSkills[`${skill.name}`] || skill.name}
              </p>
              <div
                style={{
                  backgroundColor: "white",
                  height: "10px",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: getSkillWidth(skill.level),
                    backgroundColor: "#4caf50",
                    height: "100%",
                    transition: "width 0.5s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: "20px" }}>
          <h3
            style={{
              borderBottom: "1px solid white",
              paddingBottom: "5px",
              fontWeight: 600,
            }}
          >
            {t.languages}
          </h3>
          {resumeData.languages.map((lang, index) => (
            <p key={index} style={{ margin: "5px 0" }}>
              <strong>{lang.name}:</strong> {t[lang.proficiency.toLowerCase()]}
            </p>
          ))}
        </section>
      </div>

      {/* Right Column */}
      <div
        style={{
          padding: "20px",
          width: "70%",
        }}
      >
        <section style={{ marginBottom: "20px" }}>
          <h3
            style={{
              color: theme.primaryColor,
              borderBottom: `1px solid ${theme.primaryColor}`,
              paddingBottom: "8px",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            {t.profile}
          </h3>
          <p style={{ fontSize: "0.8em" }}>{resumeData.personalInfo.summary}</p>
        </section>

        <section style={{ marginBottom: "20px" }}>
          <h3
            style={{
              color: theme.primaryColor,
              borderBottom: `1px solid ${theme.primaryColor}`,
              paddingBottom: "8px",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            {t.workExperience}
          </h3>
          {resumeData.experiences.map((job, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <h4 style={{ margin: "0", fontWeight: 600 }}>{job.jobTitle}</h4>
              <p style={{ margin: "0", fontWeight: 500 }}>{job.company}</p>
              <p style={{ margin: "0", color: "#666" }}>
                {formatDate(job.startDate)} -{" "}
                {job.isCurrentJob
                  ? t.present
                  : formatDate(job.endDate, resumeData.lng)}
              </p>
              <p>{job.responsibilities}</p>
            </div>
          ))}
        </section>

        {resumeData.educations[0]?.degree.trim("") !== "" && (
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.primaryColor}`,
                paddingBottom: "8px",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              {t.education}
            </h3>
            {resumeData.educations.length > 0 &&
              resumeData.educations.map((edu, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <h4 style={{ margin: "0", fontWeight: 600 }}>{edu.degree}</h4>
                  <p style={{ margin: "0", fontWeight: 500 }}>
                    {edu.institution}
                  </p>
                  <p style={{ margin: "0", color: "#666" }}>
                    {formatDate(edu.graduationDate)}
                  </p>
                  {edu.gpaType === "percentage" && (
                    <p className="text-sm text-gray-600">
                      {t.gpa}: {edu.numericGpa}%
                    </p>
                  )}
                  {edu.gpaType === "outOf4" && (
                    <p className="text-sm text-gray-600">
                      {t.gpa}: `4/{edu.numericGpa}`
                    </p>
                  )}
                  {edu.gpaType === "outOf5" && (
                    <p className="text-sm text-gray-600">
                      {t.gpa}: `5/{edu.numericGpa}`
                    </p>
                  )}
                </div>
              ))}
          </section>
        )}

        {resumeData.courses.length !== 0 &&
          resumeData.courses[0]?.name.trim("") !== "" && (
            <section>
              <h3
                style={{
                  color: theme.primaryColor,
                  borderBottom: `1px solid ${theme.primaryColor}`,
                  paddingBottom: "8px",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                {t.courses}
              </h3>
              {resumeData.courses.map((course, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <h4 style={{ margin: "0", fontWeight: 600 }}>
                    {course.name}
                  </h4>
                  <p style={{ margin: "0" }}>{course.institution}</p>
                  <p style={{ margin: "0", color: "#666" }}>
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
