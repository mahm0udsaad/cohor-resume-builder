import { cn } from "@/lib/utils";
import React from "react";

const defaultTheme = {
  id: "original",
  name: "Original",
  primaryColor: "#3B51A3",
  backgroundColor: "#EBF8FF",
};

const Resume = ({ resumeData, selectedTheme, className }) => {
  let theme = selectedTheme || defaultTheme;
  const renderSection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return null;
    }
    return (
      <section className="mt-8">
        <h3 style={{ color: theme.primaryColor }} className="font-bold">
          {title}
        </h3>
        {content}
      </section>
    );
  };
  const renderExperiences = () =>
    resumeData.experiences?.map((exp, index) => (
      <div key={index} className="mt-4 ">
        <h4 className="font-semibold text-gray-800">{exp.jobTitle}</h4>
        <p className="text-sm text-gray-600">{exp.company}</p>
        <p className="text-sm text-gray-600">
          {exp.startDate} - {exp.endDate}
        </p>
        <p className="text-gray-700 mt-2">{exp.responsibilities}</p>
      </div>
    ));
  const renderEducation = () =>
    resumeData.educations?.map((edu, index) => (
      <div key={index} className="mt-4">
        <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
        <p className="text-sm text-gray-600">{edu.institution}</p>
        <p className="text-sm text-gray-600">{edu.graduationDate}</p>
      </div>
    ));
  const renderSkills = () => (
    <ul className="text-gray-700 mt-2">
      {resumeData.skills[0]?.name &&
        resumeData.skills.map((skill, index) => (
          <li key={index}>
            {skill.name} - {skill.level}
          </li>
        ))}
    </ul>
  );
  const renderLanguages = () => (
    <ul className="text-gray-700 mt-2">
      {resumeData.languages?.map((lang, index) => (
        <li key={index}>
          {lang.name} - {lang.proficiency}
        </li>
      ))}
    </ul>
  );
  const renderCourses = () =>
    resumeData.courses?.map((course, index) => (
      <div key={index} className="mt-2">
        <h4 className="font-semibold text-gray-800">{course.name}</h4>
        <p className="text-sm text-gray-600">{course.institution}</p>
        <p className="text-sm text-gray-600">{course.completionDate}</p>
      </div>
    ));

  return (
    <div className={cn("bg-white w-full max-w-4xl p-6 ", className)}>
      <div className="flex justify-between items-start">
        {/* Left Column */}
        <div className="w-2/3 pr-6">
          <h1
            style={{ color: theme.primaryColor }}
            className="text-4xl font-bold"
          >
            {resumeData.personalInfo?.name || "Your Name"}
          </h1>
          <h2 className="text-xl font-semibold text-gray-600">
            {resumeData.personalInfo?.jobTitle || "Your Job Title"}
          </h2>

          {renderSection(
            "Objective",
            <p className="text-gray-700 mt-2">{resumeData.objective}</p>,
          )}

          {renderSection("Experience", renderExperiences())}

          {renderSection("Education", renderEducation())}

          {renderSection("Courses", renderCourses())}
        </div>

        {/* Right Column */}
        <div
          style={{ backgroundColor: theme.backgroundColor }}
          className="w-1/3 p-4 rounded-md text-[12px]"
        >
          <section className="mb-8">
            <h3 className="font-bold text-gray-800">Contact</h3>
            {resumeData.personalInfo?.contact.map((contact, index) => (
              <p key={index} className="text-gray-700 mt-1">
                {contact}
              </p>
            ))}
          </section>

          <section className="mb-8">
            <h3 className="font-bold text-gray-800">About Me</h3>
            <p className="text-gray-700 mt-2">
              {resumeData.personalInfo.summary ||
                "Write about yourself here..."}
            </p>
          </section>

          {renderSection("Skills", renderSkills())}

          {renderSection("Languages", renderLanguages())}
        </div>
      </div>
    </div>
  );
};

export default Resume;
