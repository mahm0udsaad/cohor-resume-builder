import React from "react";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";
import { formatGPA } from "@/utils/gpa";

const CompactElegance = ({ resumeData, selectedTheme }) => {
  const { imageUrl, name, jobTitle, summary, contact } =
    resumeData.personalInfo;
  const { experiences, educations, skills, languages } = resumeData;
  const isArabic = resumeData.lng === "ar";
  const direction = isArabic ? "rtl" : "ltr";
  const t = translations[resumeData.lng] || translations["en"];

  return (
    <div
      style={{ direction }}
      className="bg-gray-50 flex  flex-row p-4 shadow-lg rounded-lg"
    >
      {/* Left Column */}
      <div className="w-[65%] p-4">
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <h2 className="text-xl font-medium text-gray-600 mb-4">{jobTitle}</h2>
        <p className="text-gray-700 mb-6">{summary}</p>

        {/* Education Section */}
        <h3
          style={{
            color: selectedTheme?.primaryColor
              ? selectedTheme.primaryColor
              : "",
          }}
          className="text-lg font-semibold mb-2"
        >
          {" "}
          {t.education}
        </h3>
        <div className="space-y-4">
          {educations.map((education, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-md font-semibold text-gray-700">
                {education.degree}
              </h4>
              <p className="text-sm text-gray-600 italic">
                {education.institution}
              </p>
              <p className="text-gray-600">
                {formatDate(education.graduationDate)} | {t.gpa}:
                {formatGPA(
                  education.gpaType,
                  education.numericGpa,
                  t,
                  isArabic,
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <h3
          style={{
            color: selectedTheme?.primaryColor
              ? selectedTheme.primaryColor
              : "",
          }}
          className="text-lg font-semibold mb-2"
        >
          {t.workExperience}
        </h3>
        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-md font-semibold text-gray-700">
                {experience.jobTitle}
              </h4>
              <p className="text-sm text-gray-600 italic">
                {experience.company} | {formatDate(experience.startDate)} -{" "}
                {experience.isCurrentJob
                  ? t.present
                  : formatDate(experience.endDate)}
              </p>
              <p className="text-gray-600">{experience.responsibilities}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div
        className="mt-9 text-white relative w-[35%] p-4 flex flex-col items-center rounded-lg"
        style={{ backgroundColor: selectedTheme?.primaryColor || "#2D3748" }}
      >
        {/* Profile Image */}
        <div className="absolute -top-16 w-32 h-32 rounded-full border-4 overflow-hidden shadow-lg">
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-20">
          {/* Contact Info */}
          <h3 className="text-lg font-semibold mb-2">{t.contact}</h3>
          <ul className="text-sm space-y-2">
            {contact.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Skills */}
          <h3 className="text-lg font-semibold mt-6 mb-2">{t.skills}</h3>
          <ul className="text-sm space-y-2">
            {skills.map((skill, index) => (
              <li key={index}>{skill.name}</li>
            ))}
          </ul>

          {/* Languages */}
          <h3 className="text-lg font-semibold mt-6 mb-2">{t.languages}</h3>
          <ul className="text-sm space-y-2">
            {languages.map((language, index) => (
              <li key={index}>
                {language.name} - {t[language.proficiency.toLowerCase()]}
              </li>
            ))}
          </ul>

          {resumeData.courses.length !== 0 &&
            resumeData.courses[0]?.name.trim() !== "" && (
              <>
                <h2 className=" text-lg font-semibold  mt-6 mb-2">
                  {t.courses} {/* Use translation */}
                </h2>
                {resumeData.courses?.map((course, index) => (
                  <div key={index} className="mt-2">
                    <h4 className="text-md">{course.name}</h4>
                    <p className="text-sm ">{course.institution}</p>
                    <p className="text-sm ">
                      {formatDate(course.completionDate)}
                    </p>
                  </div>
                ))}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default CompactElegance;
