import Image from "next/image";
import { translations } from "@/data/data"; // Import translations
import { formatDate } from "@/helper/date"; // Import date formatter
import { cn } from "@/lib/utils";

function CreativeResumeTemplate({ resumeData, selectedTheme, className }) {
  const t = translations[resumeData.lng] || translations.en; // Apply translation based on language
  const theme = selectedTheme || {
    id: "original",
    name: "Original",
    primaryColor: "#3498db",
    secondaryColor: "#2c3e50",
    backgroundColor: "#ffffff",
  };

  return (
    <div
      id="resume-template"
      dir={resumeData.lng === "ar" ? "rtl" : "ltr"}
      className={cn("lg:w-full", className)}
      style={{
        backgroundColor: theme.backgroundColor,
        fontFamily: "Arial, sans-serif",
        color: theme.secondaryColor,
        lineHeight: "1.6",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          padding: "2.5rem 1.25rem",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
        }}
      >
        {/* Left Column */}
        <div
          style={{
            backgroundColor: theme.primaryColor,
            color: "white",
            padding: "1rem",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={resumeData.personalInfo?.imageUrl || "/placeholder.svg"}
              alt={resumeData.personalInfo?.name}
              width={150}
              height={150}
              style={{
                borderRadius: "50%",
                border: "4px solid white",
                marginBottom: "20px",
              }}
            />
          </div>

          <h1 style={{ fontSize: "1.5em", marginBottom: "10px" }}>
            {resumeData.personalInfo?.name}
          </h1>
          <h2 style={{ fontSize: "1em", marginBottom: "20px" }}>
            {resumeData.personalInfo?.jobTitle}
          </h2>

          {/* Contact Section */}
          <div style={{ marginBottom: "30px" }}>
            <h3
              style={{
                fontSize: "0.7em",
                borderBottom: "2px solid white",
                paddingBottom: "5px",
                marginBottom: "10px",
              }}
            >
              {t.contact}
            </h3>
            {resumeData.personalInfo?.contact.map((item, index) => (
              <p key={index} style={{ marginBottom: "5px" }}>
                {item}
              </p>
            ))}
          </div>

          {/* Skills Section */}
          <div style={{ marginBottom: "30px" }}>
            <h3
              style={{
                fontSize: "1.2em",
                borderBottom: "2px solid white",
                paddingBottom: "5px",
                marginBottom: "10px",
              }}
            >
              {t.skills}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {resumeData.skills?.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    fontSize: "0.9em",
                  }}
                >
                  {t.availableSkills[`${skill.name}`] || skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div>
            <h3
              style={{
                fontSize: "1.2em",
                borderBottom: "2px solid white",
                paddingBottom: "5px",
                marginBottom: "10px",
              }}
            >
              {t.languages}
            </h3>
            {resumeData.languages?.map((lang, index) => (
              <p key={index} style={{ marginBottom: "5px" }}>
                <strong>{lang.name}:</strong>{" "}
                {t[lang.proficiency.toLowerCase()]}
              </p>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Professional Summary */}
          <section style={{ marginBottom: "40px" }}>
            <h3
              style={{
                fontSize: "1.8em",
                borderBottom: `2px solid ${theme.primaryColor}`,
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              {t.profile}
            </h3>
            <p>{resumeData.personalInfo?.summary}</p>
          </section>

          {/* Professional Experience */}
          <section style={{ marginBottom: "40px" }}>
            <h3
              style={{
                fontSize: "1.8em",
                borderBottom: `2px solid ${theme.primaryColor}`,
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              {t.workExperience}
            </h3>
            {resumeData.experiences?.map((exp, index) => (
              <div key={index} style={{ marginBottom: "30px" }}>
                <h4 style={{ fontSize: "1.2em", marginBottom: "5px" }}>
                  {exp.jobTitle}
                </h4>
                <h5
                  style={{
                    fontSize: "1em",
                    color: theme.primaryColor,
                    marginBottom: "5px",
                  }}
                >
                  {exp.company}
                </h5>
                <p style={{ fontSize: "0.9em", marginBottom: "10px" }}>
                  {formatDate(exp.startDate, resumeData.lng)} -{" "}
                  {formatDate(exp.endDate, resumeData.lng)}
                </p>
                <p>{exp.responsibilities}</p>
              </div>
            ))}
          </section>

          {/* Education Section */}
          <section style={{ marginBottom: "40px" }}>
            <h3
              style={{
                fontSize: "1.8em",
                borderBottom: `2px solid ${theme.primaryColor}`,
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              {t.education}
            </h3>
            {resumeData.educations?.map((edu, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "1.2em", marginBottom: "5px" }}>
                  {edu.degree}
                </h4>
                <h5
                  style={{
                    fontSize: "1em",
                    color: theme.primaryColor,
                    marginBottom: "5px",
                  }}
                >
                  {edu.institution}
                </h5>
                <p style={{ fontSize: "0.9em" }}>
                  {formatDate(edu.graduationDate, resumeData.lng)}
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

          {/* Additional Courses */}
          {resumeData.courses[0]?.name.trim() !== "" && (
            <section>
              <h3
                style={{
                  fontSize: "1.8em",
                  borderBottom: `2px solid ${theme.primaryColor}`,
                  paddingBottom: "10px",
                  marginBottom: "20px",
                }}
              >
                {t.courses}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                {resumeData.courses?.map((course, index) => (
                  <div key={index}>
                    <h4 style={{ fontSize: "1.1em", marginBottom: "5px" }}>
                      {course.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.9em",
                        color: theme.primaryColor,
                      }}
                    >
                      {course.institution}
                    </p>
                    <p style={{ fontSize: "0.8em" }}>
                      {formatDate(course.completionDate, resumeData.lng)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreativeResumeTemplate;
