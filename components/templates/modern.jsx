"use client";
import { cn } from "@/lib/utils";
import { formatDate } from "@/helper/date";
import { memo } from "react";
import { translations } from "@/data/data";

const ModernTemplate = ({ resumeData, selectedTheme, className }) => {
  const isRTL = resumeData.lng === "ar"; // RTL detection for Arabic language

  const createStyles = (isRTL) => ({
    textDirection: isRTL ? "rtl" : "ltr", // Apply text direction based on RTL
  });

  const styles = createStyles(isRTL); // Pass the RTL flag to styles
  const t = translations[resumeData.lng] || translations.en;

  return (
    <div
      id="ResumePreview"
      className={cn("flex w-full mx-auto bg-white", className)}
      style={{ direction: styles.textDirection }} // Apply text direction
    >
      <div
        style={{ backgroundColor: selectedTheme?.primaryColor }}
        className="w-[8%] bg-orange-600 flex justify-center items-center text-white text-lg font-bold rounded-r-md"
      >
        {/* You can optionally add content here or keep it blank */}
      </div>
      {/* Main content area (85% width) */}
      <div className="w-11/12 p-8">
        <header className="mb-6">
          <h1 className="text-5xl font-bold text-gray-800">
            {resumeData.personalInfo?.name}
          </h1>
          <div className="flex flex-wrap">
            {resumeData.personalInfo?.contact?.map((contact, index) => (
              <p
                key={index}
                className="text-[11px] font-semibold pr-[3px] text-gray-600"
              >
                {contact.startsWith("https") ? (
                  <a
                    href={contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {contact}
                  </a>
                ) : (
                  `${contact} `
                )}

                {index < resumeData.personalInfo.contact.length - 1 ? "|" : ""}
              </p>
            ))}
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
            {t.profile} {/* Translated Work Experience */}
          </h2>
          <div className="mb-5">
            <p className="text-sm text-gray-600 mt-2">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
            {t.workExperience} {/* Translated Work Experience */}
          </h2>
          {resumeData.experiences?.map((job, index) => (
            <div key={index} className="mb-5">
              <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
              <p className="text-sm text-gray-600">
                {job.company} | {formatDate(job.startDate)} -{" "}
                {formatDate(job.endDate, resumeData.lng)}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {job.responsibilities}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
            {t.education} {/* Translated Education */}
          </h2>
          {resumeData.educations?.map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-600">
                {edu.institution} | {formatDate(edu.graduationDate)}
              </p>
            </div>
          ))}
        </section>

        {resumeData.courses[0].name.trim() !== "" && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
              {t.courses} {/* Translated Courses */}
            </h2>
            {resumeData.courses.map((course, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p className="text-sm text-gray-600">
                  {course.institution} | {formatDate(course.completionDate)}
                </p>
              </div>
            ))}
          </section>
        )}

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
            {t.skills} {/* Translated Skills */}
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 grid grid-cols-2 gap-2">
            {resumeData.skills?.map((skill, index) => (
              <li key={index}>
                {skill.name} - ({t[skill.level] || skill.level})
              </li>
            ))}
          </ul>
        </section>

        {resumeData.languages[0]?.name.trim() !== "" && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
              {t.languages} {/* Translated Languages */}
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 grid grid-cols-2 gap-2">
              {resumeData.languages?.map((lang, index) => (
                <li key={index}>
                  {lang.name} - ({lang.proficiency})
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default memo(ModernTemplate);
