"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

const defaultTheme = {
  id: "original",
  name: "Original",
  primaryColor: "#3B51A3",
  backgroundColor: "#EBF8FF",
};

const Resume = ({ resumeData, selectedTheme, className }) => {
  let theme = selectedTheme || defaultTheme;

  // Set direction based on the selected language
  const isArabic = resumeData.lng === "ar";
  const direction = isArabic ? "rtl" : "ltr";
  // Select appropriate translations based on language
  const t = translations[resumeData.lng] || translations.en;

  const renderSection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return null;
    }
    return (
      <section className="mt-8 sm:mt-6">
        <h3
          style={{ color: theme.primaryColor }}
          className="font-bold sm:text-sm"
        >
          {title}
        </h3>
        {content}
      </section>
    );
  };

  const renderExperiences = () =>
    resumeData.experiences?.map((exp, index) => (
      <div key={index} className="mt-4 sm:mt-3">
        <h4 className="font-semibold text-gray-800 sm:text-base">
          {exp.jobTitle}
        </h4>
        <p className="text-sm text-gray-600 sm:text-xs">{exp.company}</p>
        <p className="text-sm text-gray-600 sm:text-xs">
          {formatDate(exp.startDate)} -{" "}
          {exp.isCurrentJob
            ? t.present
            : formatDate(exp.endDate, resumeData.lng)}
        </p>
        <p className="text-gray-700 mt-2 sm:text-xs">{exp.responsibilities}</p>
      </div>
    ));

  const renderEducation = () =>
    resumeData.educations?.map((edu, index) => (
      <div key={index} className="mt-4 sm:mt-3">
        <h4 className="font-semibold text-gray-800 sm:text-base">
          {edu.degree}
        </h4>
        <p className="text-sm text-gray-600 sm:text-xs">{edu.institution}</p>
        <p className="text-sm text-gray-600 sm:text-xs">
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
    ));

  const renderSkills = () => (
    <ul className="text-gray-700 mt-2 sm:text-[12px] text-[8px]">
      {resumeData.skills?.map((skill, index) => (
        <li key={index}>
          {t.availableSkills[`${skill.name}`] || skill.name} - (
          {t.levels[skill.level.toLowerCase()]})
        </li>
      ))}
    </ul>
  );

  const renderLanguages = () => (
    <ul className="text-gray-700 mt-2 sm:text-[12px] text-[8px]">
      {resumeData.languages?.map((lang, index) => (
        <li key={index}>
          {lang.name} - {t[lang.proficiency.toLowerCase()]}
        </li>
      ))}
    </ul>
  );

  const renderCourses = () =>
    resumeData.courses?.map((course, index) => (
      <div key={index} className="mt-2 sm:mt-1">
        <h4 className="font-semibold text-gray-800 sm:text-base">
          {course.name}
        </h4>
        <p className="text-sm text-gray-600 sm:text-xs">{course.institution}</p>
        <p className="text-sm text-gray-600 sm:text-xs">
          {formatDate(course.completionDate)}
        </p>
      </div>
    ));

  return (
    <div
      id="resume-template"
      className={cn("bg-white w-full p-6 sm:p-4", className)}
      style={{ direction }} // Set direction based on language
    >
      <div className="flex justify-between items-start">
        {/* Left Column */}
        <div className="w-2/3 pr-6 sm:pr-4">
          <h1
            style={{ color: theme.primaryColor }}
            className="text-4xl font-bold sm:text-3xl"
          >
            {resumeData.personalInfo?.name || t.personalInfo}
          </h1>
          <h2 className="text-xl font-semibold text-gray-600 sm:text-lg">
            {resumeData.personalInfo?.jobTitle || t.personalInfo}
          </h2>

          {renderSection(
            t.personalInfo,
            <p className="text-gray-700 mt-2 sm:text-xs">
              {resumeData.personalInfo?.summary}
            </p>,
          )}

          {renderSection(t.workExperience, renderExperiences())}

          {renderSection(t.education, renderEducation())}

          {renderSection(t.courses, renderCourses())}
        </div>

        {/* Right Column */}
        <div
          style={{ backgroundColor: theme.backgroundColor }}
          className="w-1/3 p-2 min-h-screen rounded-md text-[12px] "
        >
          <section className="mb-8 sm:mb-6">
            <h3
              style={{ color: theme.primaryColor }}
              className="font-bold sm:text-sm"
            >
              {t.contactInformation}
            </h3>
            {resumeData.personalInfo?.contact?.map((contact, index) => (
              <p key={index} className="text-gray-700 mt-1 sm:text-[10px]">
                {contact}
              </p>
            ))}
          </section>

          {renderSection(t.skills, renderSkills())}

          {renderSection(t.languages, renderLanguages())}
        </div>
      </div>
    </div>
  );
};

export default Resume;
