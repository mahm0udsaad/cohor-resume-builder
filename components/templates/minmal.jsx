"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data"; // Import the translations

const MinimalTemplate = ({ resumeData, className, selectedTheme }) => {
  const theme = selectedTheme ?? {
    primaryColor: "#00000",
    backgroundColor: "#00000",
  };
  const { lng } = resumeData;
  // Get the translations for the selected language (lng)
  const t = translations[lng] || translations["en"]; // Default to English if the language is not found
  const isArabic = resumeData.lng === "ar";
  const direction = isArabic ? "rtl" : "ltr";
  return (
    <div
      style={{ direction }}
      className={cn("w-full max-w-4xl mx-auto bg-white p-2", className)}
    >
      <header className="flex justify-between items-start mb-8 sm:text-sm">
        <div>
          <h1
            style={{ color: theme.primaryColor }}
            className="text-xl font-semibold mb-1 sm:text-4xl"
          >
            {resumeData.personalInfo.name}
          </h1>
          <p
            style={{ color: theme.primaryColor }}
            className="text-sm tracking-widest uppercase text-gray-600 sm:text-base"
          >
            {resumeData.personalInfo.jobTitle}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8 sm:text-sm">
        <div className="col-span-1">
          <section className="mb-6">
            <h2
              style={{ color: theme.primaryColor }}
              className="text-lg font-semibold mb-4 sm:text-base"
            >
              {t.contact}
            </h2>
            {resumeData.personalInfo.contact?.map((item, index) => (
              <p
                key={index}
                className="text-sm mb-2 flex items-center sm:text-[10px]"
              >
                <span className="mr-1 sm:hidden">•</span> {item}
              </p>
            ))}
          </section>

          <section className="mb-6">
            <h2
              style={{ color: theme.primaryColor }}
              className="text-lg font-semibold mb-4 sm:text-base"
            >
              {t.skills}
            </h2>
            <div>
              <ul className="list-none">
                {resumeData.skills?.map((skill, index) => (
                  <li key={index} className="text-sm mb-1 sm:text-xs">
                    • {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2
              style={{ color: theme.primaryColor }}
              className="text-lg font-semibold mb-4 sm:text-base"
            >
              {t.languages}
            </h2>
            {resumeData.languages?.map((lang, index) => (
              <div key={index} className="mb-4 flex items-center gap-2">
                <h3
                  style={{ color: theme.primaryColor }}
                  className="text-sm font-semibold sm:text-xs"
                >
                  {lang.name}
                </h3>
                -<p className="text-sm sm:text-xs">{lang.proficiency}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-2">
          <section className="mb-6">
            <h2
              style={{ color: theme.primaryColor }}
              className="text-lg font-semibold mb-4 sm:text-base"
            >
              {t.summary}
            </h2>
            <p className="text-sm sm:text-xs ">
              {resumeData.personalInfo.summary}
            </p>
          </section>

          <section>
            <h2
              style={{ color: theme.primaryColor }}
              className="text-lg font-semibold mb-4 sm:text-base"
            >
              {t.workExperience}
            </h2>
            {resumeData.experiences?.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    style={{ color: theme.primaryColor }}
                    className="text-sm font-semibold uppercase sm:text-xs"
                  >
                    {exp.jobTitle}
                  </h3>
                  <p className="text-sm text-gray-600 sm:text-xs">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>
                <p className="text-sm font-medium mb-2 sm:text-xs">
                  {exp.company}
                </p>
                <p>{exp.responsibilities}</p>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2
              style={{ color: theme.primaryColor }}
              className="text-lg font-semibold mb-4 sm:text-base"
            >
              {t.courses}
            </h2>
            {resumeData.courses?.map((course, index) => (
              <div key={index} className="mb-4">
                <h3
                  style={{ color: theme.primaryColor }}
                  className="text-sm font-semibold sm:text-xs"
                >
                  {course.name}
                </h3>
                <p className="text-sm sm:text-xs">{course.institution}</p>
                <p className="text-sm text-gray-600 sm:text-xs">
                  {formatDate(course.completionDate)}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;
