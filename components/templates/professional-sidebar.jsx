import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";
import React from "react";

const ProfessionalSidebar = ({ resumeData, selectedTheme }) => {
  // Detect Arabic for RTL layout
  const isArabic = resumeData.lng === "ar";
  const { lng } = resumeData;

  // Use fallback to English if translation isn't available
  const t = translations[lng] || translations["en"];

  // RTL for Arabic, LTR for others
  const direction = isArabic ? "rtl" : "ltr";

  // Default theme values in case selectedTheme is undefined
  const defaultTheme = {
    primaryColor: "#009688",
    backgroundColor: "#ffffff",
    accentColor: "#495057",
  };

  const theme = selectedTheme || defaultTheme;

  return (
    <div
      className={`flex flex-col lg:flex-row mx-auto font-sans text-gray-800`}
      style={{ backgroundColor: theme.backgroundColor, direction: direction }}
    >
      {/* Sidebar */}
      <div
        className="lg:w-1/3 p-4"
        style={{
          backgroundColor: theme.primaryColor,
          color: "#fff", // Adjust text color for RTL if needed
        }}
      >
        <img
          src={resumeData.personalInfo.imageUrl}
          alt={resumeData.personalInfo.name}
          className="size-[150px] rounded-full object-cover mb-8 border-4 border-white"
        />
        {/* Contact */}
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-white">
          {t.contact}
        </h3>
        {resumeData.personalInfo.contact?.map((item, index) => (
          <div key={index} className="mb-4 text-sm">
            {item}
          </div>
        ))}

        {/* Education */}
        <h3 className="text-2xl font-bold mb-4 mt-8 border-b pb-2 border-white">
          {t.education}
        </h3>
        {resumeData.educations.map((edu, index) => (
          <div key={index} className="mb-6">
            <div className="font-bold">{edu.degree}</div>
            <div>{edu.institution}</div>
            <div>{formatDate(edu.graduationDate)}</div>
          </div>
        ))}

        {/* Skills */}
        <h3 className="text-2xl font-bold mb-4 mt-8 border-b pb-2 border-white">
          {t.skills}
        </h3>
        <div className="flex flex-wrap">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-white bg-opacity-20 text-white py-1 px-3 rounded-lg text-xs mr-2 mb-2"
            >
              {skill.name}
            </span>
          ))}
        </div>

        {/* Languages */}
        <h3 className="text-2xl font-bold mb-4 mt-8">{t.languages}</h3>
        {resumeData.languages.map((lang, index) => (
          <div key={index} className="mb-2">
            {lang.name} - {lang.proficiency}
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div
        className="lg:w-2/3 p-4"
        style={{ textAlign: isArabic ? "right" : "left" }}
      >
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: theme.primaryColor }}
        >
          {resumeData.personalInfo.name}
        </h1>
        <h2 className="text-2xl text-gray-600 mb-6">
          {resumeData.personalInfo.jobTitle}
        </h2>
        <p className="mb-8 leading-relaxed">
          {resumeData.personalInfo.summary}
        </p>

        {/* Experience Section */}
        <h3
          className="text-2xl font-bold mb-4"
          style={{ color: theme.primaryColor }}
        >
          {t.experience}
        </h3>
        {resumeData.experiences.map((exp, index) => (
          <div key={index} className="mb-6 relative">
            <div
              className={`absolute ${
                isArabic ? "right-0" : "left-0"
              } top-2 w-3 h-3 rounded-full bg-primary`}
            ></div>
            <div className="mx-8">
              <h4 className="text-lg font-bold">{exp.jobTitle}</h4>
              <h5 className="text-md mb-2">{exp.company}</h5>
              <p className="text-sm text-gray-600 mb-4">
                {formatDate(exp.startDate)} -{" "}
                {formatDate(exp.endDate, resumeData.lng)}
              </p>
              <p>{exp.responsibilities}</p>
            </div>
          </div>
        ))}

        {/* Courses Section */}
        <h3
          className="text-2xl font-bold mb-4 mt-8"
          style={{ color: theme.primaryColor }}
        >
          {t.courses}
        </h3>
        {resumeData.courses.map((course, index) => (
          <div key={index} className="mb-6">
            <div className="font-bold">{course.name}</div>
            <div>{course.institution}</div>
            <div>
              {t.completed}: {formatDate(course.completionDate)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSidebar;
