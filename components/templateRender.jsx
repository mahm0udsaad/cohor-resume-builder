import React, { useState } from "react";
import ColorSelector from "./forms/colorSelection";
const colorOptions = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#800000",
  "#008000",
  "#000080",
  "#808000",
  "#800080",
  "#008080",
];

const JsonTemplateRenderer = ({ initialTemplateData, userData }) => {
  const [templateData, setTemplateData] = useState(initialTemplateData);

  const applyThemeColors = (style) => {
    return Object.entries(style).reduce((acc, [key, value]) => {
      if (typeof value === "string" && value.startsWith("{theme.")) {
        const themeKey = value.slice(7, -1);
        return { ...acc, [key]: templateData.theme[themeKey] };
      }
      return { ...acc, [key]: value };
    }, {});
  };

  const handleColorSelect = (color) => {
    setTemplateData((prevData) => ({
      ...prevData,
      theme: {
        ...prevData.theme,
        primaryColor: color,
      },
    }));
  };
  const renderSection = (section) => {
    const sectionStyle = applyThemeColors(section.style || {});

    switch (section.type) {
      case "header":
        return (
          <div style={sectionStyle}>
            <h1 style={applyThemeColors(section.style.nameStyle || {})}>
              {userData.personalInfo.name}
            </h1>
            <p style={applyThemeColors(section.style.contactStyle || {})}>
              {userData.personalInfo.email} | {userData.personalInfo.phone}
            </p>
          </div>
        );
      case "summary":
        return (
          <div style={sectionStyle}>
            <h2 style={applyThemeColors(section.style.titleStyle || {})}>
              {section.content.title}
            </h2>
            <p style={applyThemeColors(section.style.textStyle || {})}>
              {userData.personalInfo.summary}
            </p>
          </div>
        );
      case "experience":
        return (
          <div style={sectionStyle}>
            <h2 style={applyThemeColors(section.style.titleStyle || {})}>
              {section.content.title}
            </h2>
            {userData.experiences.map((exp, index) => (
              <div
                key={index}
                style={applyThemeColors(section.style.itemStyle || {})}
              >
                <h3
                  style={applyThemeColors(
                    section.content.style?.companyStyle || {},
                  )}
                >
                  {exp.jobTitle} at {exp.company}
                </h3>
                <p
                  style={applyThemeColors(
                    section.content.style?.positionStyle || {},
                  )}
                >
                  {exp.startDate} - {exp.endDate}
                </p>
                <p
                  style={applyThemeColors(
                    section.content.style?.descriptionStyle || {},
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
            <h2 style={applyThemeColors(section.style.titleStyle || {})}>
              {section.content.title}
            </h2>
            {userData.educations.map((edu, index) => (
              <div
                key={index}
                style={applyThemeColors(section.style.itemStyle || {})}
              >
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                <p>{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        );
      case "skills":
        return (
          <div style={sectionStyle}>
            <h2 style={applyThemeColors(section.style.titleStyle || {})}>
              {section.content.title}
            </h2>
            <ul>
              {userData.skills.map((skill, index) => (
                <li
                  key={index}
                  style={applyThemeColors(section.style.itemStyle || {})}
                >
                  {skill.name} - {skill.level}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ColorSelector
        colors={colorOptions}
        currentColor={templateData.theme.primaryColor}
        onColorSelect={handleColorSelect}
      />
      <div style={{ backgroundColor: templateData.theme.backgroundColor }}>
        {templateData.sections.map((section, index) => (
          <div key={index}>{renderSection(section)}</div>
        ))}
      </div>
    </>
  );
};

export default JsonTemplateRenderer;
