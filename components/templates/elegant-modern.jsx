import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ElegantModernResumeTemplate({
  resumeData,
  selectedTheme,
  className,
}) {
  const theme = selectedTheme || {
    id: "elegant",
    name: "Elegant",
    primaryColor: "#3498db",
    accentColor: "#000000",
    backgroundColor: "#2c3e50",
  };

  const t = translations[resumeData.lng] || translations.en;

  const sectionStyle = {
    marginBottom: "1.2rem",
  };

  const headingStyle = {
    color: theme.primaryColor,
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    position: "relative",
    paddingLeft: "1rem",
  };

  const headingBeforeStyle = {
    content: '""',
    position: "absolute",
    right: resumeData.lng === "ar" ? -10 : undefined,
    left: resumeData.lng === "ar" ? undefined : 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "4px",
    height: "1.5rem",
    backgroundColor: theme.primaryColor,
  };

  const subHeadingStyle = {
    color: "black",
    fontSize: "0.8rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };
  const text = {
    fontSize: "0.8rem",
    textAlign: "start",
  };

  return (
    <div
      id="resume-template"
      className={cn("w-full", className)}
      dir={resumeData.lng === "ar" ? "rtl" : "ltr"}
      style={{
        backgroundColor: "white",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: theme.primaryColor,
          color: "white",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "0.5rem",
              fontWeight: "300",
            }}
          >
            {resumeData.personalInfo.name}
          </h1>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "300" }}>
            {resumeData.personalInfo.jobTitle}
          </h2>
        </div>
        {resumeData.personalInfo.imageUrl && (
          <Image
            src={resumeData.personalInfo?.imageUrl}
            alt={resumeData.personalInfo?.name}
            width={120}
            height={120}
            style={{
              borderRadius: "50%",
              border: `3px solid ${theme.accentColor}`,
            }}
          />
        )}
      </header>

      {/* Main Content */}
      <main
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: resumeData.lng === "ar" ? "row-reverse" : "row",
        }}
      >
        {/* Left Column */}
        <div
          style={{
            flex: "1",
            paddingRight: "1rem",
            borderRight: `1px solid ${theme.backgroundColor}`,
          }}
        >
          {/* Contact Information */}
          <section style={sectionStyle}>
            <h3 style={headingStyle}>
              <span style={headingBeforeStyle}></span>
              {t.contactInformation}
            </h3>
            {resumeData.personalInfo.contact?.map((item, index) => (
              <p key={index} style={{ ...text, marginBottom: "0.5rem" }}>
                {item}
              </p>
            ))}
          </section>

          {/* Skills */}
          <section style={sectionStyle}>
            <h3 style={headingStyle}>
              <span style={headingBeforeStyle}></span>
              {t.skills}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: theme.primaryColor,
                    color: "white",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                  }}
                >
                  {t.availableSkills[`${skill.name}`] || skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section style={sectionStyle}>
            <h3 style={headingStyle}>
              <span style={headingBeforeStyle}></span>
              {t.languages}
            </h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {resumeData.languages.map((lang, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  <strong>{lang.name}:</strong>{" "}
                  {t[lang.proficiency.toLowerCase()]}
                </li>
              ))}
            </ul>
          </section>
          {/* Additional Courses */}
          {resumeData.courses[0]?.name.trim() !== "" && (
            <section style={sectionStyle}>
              <h3 style={headingStyle}>
                <span style={headingBeforeStyle}></span>
                {t.courses}
              </h3>
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                }}
              >
                {resumeData.courses.map((course, index) => (
                  <div key={index}>
                    <h4 style={{ ...subHeadingStyle, fontSize: "1rem" }}>
                      {course.name}
                    </h4>
                    <p>{course.institution}</p>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: theme.primaryColor,
                      }}
                    >
                      {formatDate(course.completionDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: "2", paddingLeft: "1rem" }}>
          {/* Professional Summary */}
          <section style={sectionStyle}>
            <h3 style={headingStyle}>
              <span style={headingBeforeStyle}></span>
              {t.summary}
            </h3>
            <p style={text}>{resumeData.personalInfo.summary}</p>
          </section>

          {/* Professional Experience */}
          <section style={sectionStyle}>
            <h3 style={headingStyle}>
              <span style={headingBeforeStyle}></span>
              {t.workExperience}
            </h3>
            {resumeData.experiences.map((exp, index) => (
              <div key={index} style={{ marginBottom: "1.5rem" }}>
                <h4 style={subHeadingStyle}>
                  {exp.jobTitle} at {exp.company}
                </h4>
                <p
                  style={{
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                    color: theme.primaryColor,
                  }}
                >
                  {formatDate(exp.startDate)} -{" "}
                  {formatDate(exp.endDate, resumeData.lng)}
                </p>
                <p style={text}>{exp.responsibilities}</p>
              </div>
            ))}
          </section>

          {/* Education */}
          <section style={sectionStyle}>
            <h3 style={headingStyle}>
              <span style={headingBeforeStyle}></span>
              {t.education}
            </h3>
            {resumeData.educations.map((edu, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <h4 style={subHeadingStyle}>{edu.degree}</h4>
                <p>{edu.institution}</p>
                <p style={{ fontSize: "0.9rem" }}>
                  {formatDate(edu.graduationDate)}
                </p>
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
      </main>
    </div>
  );
}
