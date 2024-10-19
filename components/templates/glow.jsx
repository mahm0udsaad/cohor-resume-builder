import { translations } from "@/data/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function MinimalistTwoColorResumeTemplate({
  resumeData,
  className,
  selectedTheme,
}) {
  const theme = selectedTheme || {
    id: "minimalist",
    name: "Minimalist",
    primaryColor: "#2c3e50",
    backgroundColor: "#f5f5f5",
  };

  const t = translations[resumeData.lng] || translations.en;

  const sectionStyle = {
    marginBottom: "2rem",
  };

  const headingStyle = {
    color: theme.primaryColor,
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    borderBottom: `1px solid ${theme.primaryColor}`,
    paddingBottom: "0.5rem",
  };

  const subHeadingStyle = {
    color: theme.primaryColor,
    fontSize: "0.9rem",
    fontWeight: 500,
    marginBottom: "0.5rem",
  };

  const textStyle = {
    fontSize: "0.8rem",
  };

  return (
    <div
      className={cn("lg:w-full", className)}
      style={{
        margin: "0 auto",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
        direction: resumeData.lng === "ar" ? "rtl" : "ltr", // Set direction based on language
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
              fontSize: "1.8rem",
              fontWeight: "bold",
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
        <Image
          src={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
          alt={resumeData.personalInfo.name}
          width={120}
          height={120}
          style={{
            borderRadius: "50%",
            border: "3px solid white",
          }}
        />
      </header>

      {/* Main Content */}
      <main
        style={{
          padding: "1.3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Contact Information */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.contactInformation}</h3>{" "}
          {/* Translated */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {resumeData.personalInfo.contact?.map((item, index) => (
              <span
                key={index}
                style={{ ...textStyle, marginBottom: "0.5rem" }}
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Professional Summary */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.profile}</h3> {/* Translated */}
          <p style={textStyle}>{resumeData.personalInfo.summary}</p>
        </section>

        {/* Professional Experience */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.workExperience}</h3> {/* Translated */}
          {resumeData.experiences?.map((exp, index) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <h4 style={subHeadingStyle}>
                {exp.jobTitle} {t.at} {exp.company} {/* Translated */}
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                  fontStyle: "italic",
                }}
              >
                {exp.startDate} - {exp.endDate}
              </p>
              <p style={textStyle}>{exp.responsibilities}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.education}</h3> {/* Translated */}
          {resumeData.educations?.map((edu, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <h4 style={subHeadingStyle}>{edu.degree}</h4>
              <p style={textStyle}>{edu.institution}</p>
              <p style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
                {edu.graduationDate}
              </p>
              {edu.gpaType === "numeric" && (
                <p className="text-sm text-gray-600">GPA: {edu.numericGpa}</p>
              )}
              {edu.gpaType === "descriptive" && (
                <p className="text-sm text-gray-600">
                  GPA: {edu.descriptiveGpa}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.skills}</h3> {/* Translated */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {resumeData.skills?.map((skill, index) => (
              <span
                key={index}
                style={{
                  border: `1px solid ${theme.primaryColor}`,
                  color: theme.primaryColor,
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.languages}</h3> {/* Translated */}
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {resumeData.languages?.map((lang, index) => (
              <li key={index}>
                <strong>{lang.name}:</strong> {lang.proficiency}
              </li>
            ))}
          </ul>
        </section>

        {/* Additional Courses */}
        <section style={sectionStyle}>
          <h3 style={headingStyle}>{t.courses}</h3> {/* Translated */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {resumeData.courses?.map((course, index) => (
              <div key={index}>
                <h4 style={{ ...subHeadingStyle, fontSize: "1rem" }}>
                  {course.name}
                </h4>
                <p style={textStyle}>{course.institution}</p>
                <p style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
                  {course.completionDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
