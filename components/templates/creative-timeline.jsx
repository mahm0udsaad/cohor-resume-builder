import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo } from "react";

function CreativeTimelineResumeTemplate({
  resumeData,
  selectedTheme,
  className,
}) {
  // Apply translation based on language
  const t = translations[resumeData.lng] || translations.en;
  const theme = selectedTheme || {
    id: "creative-timeline",
    name: "Creative Timeline",
    primaryColor: "#6b46c1",
    secondaryColor: "#9f7aea",
    backgroundColor: "#f7fafc",
    textColor: "#2d3748",
  };
  // Define styles
  const sectionStyle = {
    marginBottom: "2rem",
  };

  const headingStyle = {
    color: theme.primaryColor,
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
  };

  const timelineItemStyle = {
    position: "relative",
    paddingLeft: "2rem",
    paddingLeft: resumeData.lng === "ar" ? "" : "1.5rem",
    paddingRight: !resumeData.lng === "ar" ? "" : "1.5rem",
    paddingBottom: "2rem",
    borderLeft:
      resumeData.lng === "ar" ? "none" : `2px solid ${theme.secondaryColor}`,
    borderRight:
      resumeData.lng === "ar" ? `2px solid ${theme.secondaryColor}` : "none",
  };

  const timelineDotStyle = {
    position: "absolute",
    left: resumeData.lng === "ar" ? "" : "-0.5rem",
    right: !resumeData.lng === "ar" ? "" : "-0.5rem",
    width: "1rem",
    height: "1rem",
    borderRadius: "50%",
    backgroundColor: theme.primaryColor,
  };

  // Check if the language is Arabic for RTL layout
  const isRTL = resumeData.lng === "ar";

  return (
    <div
      id="resume-template"
      className={cn("w-full", className)}
      style={{
        color: theme.textColor,
        backgroundColor: "white",
        borderRadius: "8px",
        overflow: "hidden",
        direction: isRTL ? "rtl" : "ltr", // Apply RTL if language is Arabic
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: theme.primaryColor,
          color: "white",
          padding: "3rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            backgroundColor: theme.secondaryColor,
            transform: "rotate(-10deg)",
            zIndex: 1,
          }}
        ></div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
            alt={resumeData.personalInfo.name}
            width={150}
            height={150}
            style={{
              borderRadius: "50%",
              border: "4px solid white",
              marginBottom: "1rem",
            }}
          />
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "0.5rem",
              fontWeight: "300",
            }}
          >
            {resumeData.personalInfo.name}
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "300",
              marginBottom: "1rem",
            }}
          >
            {resumeData.personalInfo.jobTitle}
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {resumeData.personalInfo.contact?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: "2rem" }}>
        {/* Professional Summary */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.profile}</h3>
          <p>{resumeData.personalInfo.summary}</p>
        </section>

        {/* Experience Timeline */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.workExperience}</h3>
          <div style={{ position: "relative" }}>
            {resumeData.experiences.map((exp, index) => (
              <div key={index} style={timelineItemStyle}>
                <div style={timelineDotStyle}></div>
                <h4
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: theme.primaryColor,
                  }}
                >
                  {exp.jobTitle}
                </h4>
                <h5
                  style={{
                    fontSize: "1rem",
                    color: theme.secondaryColor,
                  }}
                >
                  {exp.company}
                </h5>
                <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  {formatDate(exp.startDate)} -{" "}
                  {formatDate(exp.endDate, resumeData.lng)}
                </p>
                <p>{exp.responsibilities}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.skills}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: theme.backgroundColor,
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                }}
              >
                {t.availableSkills[`${skill.name}`]}
              </span>
            ))}
          </div>
        </section>

        {/* Education and Courses */}
        <section style={{ ...sectionStyle, flex: "1", minWidth: "250px" }}>
          <h3 style={headingStyle}>{t.education}</h3>
          {resumeData.educations.map((edu, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: theme.primaryColor,
                }}
              >
                {edu.degree}
              </h4>
              <p>{edu.institution}</p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: theme.secondaryColor,
                }}
              >
                {formatDate(edu.graduationDate)}
              </p>
            </div>
          ))}
        </section>

        {/* Languages */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.languages}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {resumeData.languages.map((lang, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: theme.backgroundColor,
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <strong>{lang.name}:</strong>{" "}
                {t[lang.proficiency.toLowerCase()]}
              </div>
            ))}
          </div>
        </section>

        {resumeData.courses[0]?.name.trim() !== "" && (
          <section style={{ ...sectionStyle, flex: "1", minWidth: "250px" }}>
            <h3 style={headingStyle}>{t.courses}</h3>
            {resumeData.courses.map((course, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: theme.primaryColor,
                  }}
                >
                  {course.name}
                </h4>
                <p>{course.institution}</p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: theme.secondaryColor,
                  }}
                >
                  {formatDate(course.completionDate)}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default memo(CreativeTimelineResumeTemplate);
