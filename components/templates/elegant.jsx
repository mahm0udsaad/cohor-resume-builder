"use client";
import { translations } from "@/data/data";
import { formatDate } from "@/helper/date";
import { cn } from "@/lib/utils";

const ElegantResume = ({ resumeData, selectedTheme, className }) => {
  const theme = selectedTheme ?? {
    primaryColor: "#00000",
    backgroundColor: "#F4F4F9",
  };
  const { lng } = resumeData;

  // Determine whether the layout should be RTL based on the language
  const isRTL = lng === "ar"; // For Arabic (or any other RTL language)

  // Get translations based on the current language
  const t = translations[lng] || translations["en"]; // Default to English if no translation found

  return (
    <div
      id="resume-template"
      className={cn(
        "flex flex-col w-full mx-auto bg-white p-10 sm:px-6 sm:py-4",
        className,
        { rtl: isRTL }, // Apply RTL class if the language is RTL
      )}
      dir={isRTL ? "rtl" : "ltr"} // Apply RTL direction if needed
    >
      {/* Header Section */}
      <div
        style={{ backgroundColor: theme.backgroundColor }}
        className="w-full p-6 rounded-md mb-8 sm:p-4"
      >
        <h1
          style={{ color: theme.primaryColor }}
          className="text-4xl font-bold text-gray-800 mb-2 sm:text-3xl sm:mb-1"
        >
          {resumeData.personalInfo?.name}
        </h1>
        <h2 className="text-xl text-gray-600 mb-4 sm:text-lg sm:mb-2">
          {resumeData.personalInfo?.jobTitle}
        </h2>
        <div className="flex flex-wrap text-sm text-gray-500 sm:text-xs">
          {resumeData.personalInfo?.contact?.map((contact, index) => (
            <p key={index} className="mr-2">
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
                contact
              )}
              {index < resumeData.personalInfo.contact.length - 1 ? "|" : ""}
            </p>
          ))}
        </div>
      </div>

      <section className="mb-8">
        <h3
          style={{ color: theme.primaryColor }}
          className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-2 sm:text-xl sm:mb-4"
        >
          {t.profile}
        </h3>
        <div className="mb-2 sm:mb-4">
          <p className="text-sm text-gray-600 mt-2 sm:text-xs sm:mt-1">
            {resumeData.personalInfo?.summary}
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <h3
          style={{ color: theme.primaryColor }}
          className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 sm:text-xl sm:mb-4"
        >
          {t.experience}
        </h3>
        {resumeData.experiences?.map((job, index) => (
          <div key={index} className="mb-6 sm:mb-4">
            <h4 className="text-xl font-semibold text-gray-800 sm:text-lg">
              {job.jobTitle}
            </h4>
            <p className="text-sm text-gray-600 sm:text-xs">
              {job.company} | {formatDate(job.startDate)} -{" "}
              {job.isCurrentJob
                ? t.present
                : formatDate(job.endDate, resumeData.lng)}
            </p>
            <p className="text-sm text-gray-600 mt-2 sm:text-xs sm:mt-1">
              {job.responsibilities}
            </p>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h3
          style={{ color: theme.primaryColor }}
          className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 sm:text-xl sm:mb-4"
        >
          {t.education}
        </h3>
        {resumeData.educations?.map((edu, index) => (
          <div key={index} className="mb-4 sm:mb-2">
            <h4 className="text-xl font-semibold text-gray-800 sm:text-lg">
              {edu.degree}
            </h4>
            <p className="text-sm text-gray-600 sm:text-xs">
              {edu.institution} | {formatDate(edu.graduationDate)}
            </p>
            {edu.gpaType === "percentage" && (
              <p className="text-sm text-gray-300">
                {t.gpa}: {edu.numericGpa}%
              </p>
            )}
            {edu.gpaType === "outOf4" && (
              <p className="text-sm text-gray-300">
                {t.gpa}: {edu.numericGpa}/4
              </p>
            )}
            {edu.gpaType === "outOf5" && (
              <p className="text-sm text-gray-300">
                {t.gpa}: {edu.numericGpa}/5
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h3
          style={{ color: theme.primaryColor }}
          className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 sm:text-xl sm:mb-4"
        >
          {t.skills}
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-700 grid grid-cols-2 gap-2 sm:text-xs sm:gap-1">
          {resumeData.skills?.map((skill, index) => (
            <li key={index}>
              {t.availableSkills[`${skill.name}`] || skill.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Languages Section */}
      {resumeData.languages?.length > 0 && (
        <section className="mb-8">
          <h3
            style={{ color: theme.primaryColor }}
            className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 sm:text-xl sm:mb-4"
          >
            {t.languages}
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 grid grid-cols-2 gap-2 sm:text-xs sm:gap-1">
            {resumeData.languages?.map((lang, index) => (
              <li key={index}>{lang.name}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ElegantResume;
