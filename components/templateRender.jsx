import React, { useEffect, useState } from "react";

const JsonTemplateRenderer = ({ templateData, userData, selectedTheme }) => {
  const [appliedTheme, setAppliedTheme] = useState(templateData.theme);

  useEffect(() => {
    // Apply the selected theme if it exists, otherwise use the template theme
    if (selectedTheme && selectedTheme?.id !== templateData.theme.id) {
      setAppliedTheme(selectedTheme);
    } else {
      setAppliedTheme(templateData.theme);
    }
  }, [selectedTheme, templateData.theme]);

  const applyThemeColors = (style) => {
    return Object.entries(style).reduce((acc, [key, value]) => {
      if (typeof value === "object" && value !== null) {
        return { ...acc, [key]: applyThemeColors(value) };
      } else if (typeof value === "string" && value.startsWith("{theme.")) {
        const themeKey = value.slice(7, -1);
        return { ...acc, [key]: appliedTheme[themeKey] };
      }
      return { ...acc, [key]: value };
    }, {});
  };

  const applyBorderStyles = (style) => {
    const { border, ...restStyle } = style;
    if (border && typeof border === "object") {
      const { color, width, style: borderStyle } = border;
      return {
        ...restStyle,
        border: `${width} ${borderStyle} ${color}`,
      };
    }
    return style;
  };

  const combineStyles = (...styles) => {
    const combinedStyle = styles.reduce(
      (acc, style) => ({ ...acc, ...(style || {}) }),
      {},
    );
    const themeAppliedStyle = applyThemeColors(combinedStyle);
    return applyBorderStyles(themeAppliedStyle);
  };

  const renderSection = (section) => {
    const sectionStyle = combineStyles(section.style);

    switch (section.type) {
      case "header":
        return (
          <div style={sectionStyle}>
            <h1 style={combineStyles(section.style.nameStyle)}>
              {userData.personalInfo.name}
            </h1>
            <p style={combineStyles(section.style.contactStyle)}>
              {userData.personalInfo.email} | {userData.personalInfo.phone}
            </p>
          </div>
        );
      case "summary":
        return (
          <div style={sectionStyle}>
            <h2 style={combineStyles(section.style.titleStyle)}>
              {section.content.title}
            </h2>
            <p style={combineStyles(section.style.textStyle)}>
              {userData.personalInfo.summary}
            </p>
          </div>
        );
      case "experience":
        return (
          <div style={sectionStyle}>
            <h2 style={combineStyles(section.style.titleStyle)}>
              {section.content.title}
            </h2>
            {userData.experiences[0].jobTitle &&
              userData.experiences.map((exp, index) => (
                <div key={index} style={combineStyles(section.style.itemStyle)}>
                  <h3
                    style={combineStyles(section.content.style?.companyStyle)}
                  >
                    {exp.jobTitle} at {exp.company}
                  </h3>
                  <p
                    style={combineStyles(section.content.style?.positionStyle)}
                  >
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p
                    style={combineStyles(
                      section.content.style?.descriptionStyle,
                    )}
                  >
                    {exp.responsibilities}
                  </p>
                </div>
              ))}
          </div>
        );
      case "education":
        return (
          <div style={sectionStyle}>
            <h2 style={combineStyles(section.style.titleStyle)}>
              {section.content.title}
            </h2>
            {userData.educations.map((edu, index) => (
              <div key={index} style={combineStyles(section.style.itemStyle)}>
                <h3 style={combineStyles(section.content.style?.degreeStyle)}>
                  {edu.degree}
                </h3>
                <p
                  style={combineStyles(section.content.style?.institutionStyle)}
                >
                  {edu.institution}
                </p>
                <p style={combineStyles(section.content.style?.dateStyle)}>
                  {edu.graduationDate}
                </p>
              </div>
            ))}
          </div>
        );
      case "skills":
        return (
          <div style={sectionStyle}>
            <h2 style={combineStyles(section.style.titleStyle)}>
              {section.content.title}
            </h2>
            <ul style={combineStyles(section.style.listStyle)}>
              {userData.skills[0].name &&
                userData.skills.map((skill, index) => (
                  <li
                    key={index}
                    style={combineStyles(section.style.itemStyle)}
                  >
                    {skill.name} - {skill.level}
                  </li>
                ))}
            </ul>
          </div>
        );
      case "languages":
        return (
          <div style={sectionStyle}>
            <h2 style={combineStyles(section.style.titleStyle)}>
              {section.content.title}
            </h2>
            <ul style={combineStyles(section.style.listStyle)}>
              {userData.languages.map((lang, index) => (
                <li key={index} style={combineStyles(section.style.itemStyle)}>
                  {lang.name} - {lang.proficiency}
                </li>
              ))}
            </ul>
          </div>
        );
      case "courses":
        return (
          <div style={sectionStyle}>
            <h2 style={combineStyles(section.style.titleStyle)}>
              {section.content.title}
            </h2>
            {userData.courses.map((course, index) => (
              <div key={index} style={combineStyles(section.style.itemStyle)}>
                <h3
                  style={combineStyles(section.content.style?.courseNameStyle)}
                >
                  {course.name}
                </h3>
                <p
                  style={combineStyles(section.content.style?.institutionStyle)}
                >
                  {course.institution}
                </p>
                <p style={combineStyles(section.content.style?.dateStyle)}>
                  {course.completionDate}
                </p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl h-[90%] ">
      <div
        style={{
          backgroundColor: templateData.theme.backgroundColor && "#fffff",
        }}
      >
        {templateData.sections.map((section, index) => (
          <div key={index}>{renderSection(section)}</div>
        ))}
      </div>
    </div>
  );
};

export default JsonTemplateRenderer;
