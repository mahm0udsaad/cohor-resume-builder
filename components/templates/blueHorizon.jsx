import React from "react";
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";

export default function BlueHorizon({ resumeData, selectedTheme }) {
  const isArabic = resumeData.lng === "ar";

  const { lng } = resumeData;
  const t = translations[lng] || translations["en"]; // Fallback to English if translation isn't available
  const direction = isArabic ? "rtl" : "ltr"; // RTL for Arabic, LTR for others

  // Default theme values in case selectedTheme is undefined
  const defaultTheme = {
    primaryColor: "#2b2d2e",
    backgroundColor: "#fffff",
    accentColor: "#343a40",
  };

  const theme = selectedTheme || defaultTheme;

  return (
    <div
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
                {skill.name}
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
                    width:
                      skill.level === "advanced"
                        ? "100%"
                        : skill.level === "intermediate"
                        ? "70%"
                        : "40%",
                    backgroundColor: "#4caf50",
                    height: "100%",
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
              <strong>{lang.name}:</strong> {lang.proficiency}
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
              paddingBottom: "5px",
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
              paddingBottom: "5px",
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
                {formatDate(job.endDate, resumeData.lng)}
              </p>
              <p>{job.responsibilities}</p>
            </div>
          ))}
        </section>

        {resumeData.educations[0].degree.trim("") !== "" && (
          <section style={{ marginBottom: "20px" }}>
            <h3
              style={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.primaryColor}`,
                paddingBottom: "5px",
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
                </div>
              ))}
          </section>
        )}

        {resumeData.courses[0].name.trim("") !== "" && (
          <section>
            <h3
              style={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.primaryColor}`,
                paddingBottom: "5px",
                fontWeight: 600,
              }}
            >
              {t.courses}
            </h3>
            {resumeData.courses.map((course, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <h4 style={{ margin: "0", fontWeight: 600 }}>{course.name}</h4>
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
