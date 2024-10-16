"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";
import { memo } from "react";

const FormalResumeTemplate = ({ resumeData, selectedTheme, className }) => {
  const isRTL = resumeData.lng === "ar"; // RTL detection for Arabic language

  const createStyles = (isRTL) => ({
    textDirection: isRTL ? "rtl" : "ltr", // Apply text direction based on RTL
  });

  const styles = createStyles(isRTL); // Pass the RTL flag to styles
  const t = translations[resumeData.lng] || translations.en;

  return (
    <div
      style={{
        direction: styles.textDirection,
        backgroundColor: selectedTheme?.backgroundColor || "#ffffff",
      }}
      className={cn(" px-4 ", className)}
    >
      <div className="p-3" style={{ borderColor: selectedTheme?.primaryColor }}>
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-4xl font-serif font-bold"
              style={{ color: selectedTheme?.primaryColor }}
            >
              {resumeData.personalInfo?.name}
            </h1>
            <h2 className="text-xl mt-2 text-gray-600">
              {resumeData.personalInfo?.jobTitle}
            </h2>
          </div>
          <Image
            src={resumeData.personalInfo.imageUrl || "/placeholder.svg"}
            alt={resumeData.personalInfo?.name}
            width={120}
            height={120}
            className="rounded-full object-cover border-2"
            style={{ borderColor: selectedTheme?.primaryColor }}
          />
        </div>
      </div>
      <ul className="px-4 list-none flex flex-wrap  gap-3">
        {resumeData.personalInfo?.contact?.map((item, index) => (
          <li key={index} className="text-gray-700 mb-1 text-sm">
            {item.startsWith("https") ? (
              <a href={item} target="_blank" className="hover:underline">
                {item}
              </a>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
      <div className="my-2 border-b border-3" />

      <div className="p-3">
        <section className="mb-8">
          <h2
            className="text-2xl font-serif mb-4"
            style={{ color: selectedTheme?.primaryColor }}
          >
            {t.profile}
          </h2>
          <p className="text-gray-700 text-sm">
            {resumeData.personalInfo?.summary}
          </p>
        </section>

        <div className="my-8 border-b border-3" />

        <section className="mb-8">
          <h2
            className="text-2xl font-serif mb-4"
            style={{ color: selectedTheme?.primaryColor }}
          >
            {t.workExperience}
          </h2>
          {resumeData.experiences?.map((exp, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
              <h4 className="text-md font-medium">{exp.company}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {`${formatDate(exp.startDate, resumeData.lng)} - ${formatDate(
                  exp.endDate,
                  resumeData.lng,
                )}`}
              </p>
              <p className="text-gray-700">{exp.responsibilities}</p>
              {index < resumeData.experiences.length - 1 && (
                <div className="my-8 border-b border-3" />
              )}
            </div>
          ))}
        </section>

        <div className="my-8 border-b border-3" />

        <section className="mb-8">
          <h2
            className="text-2xl font-serif mb-4"
            style={{ color: selectedTheme?.primaryColor }}
          >
            {t.education}
          </h2>
          {resumeData.educations?.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <h4 className="text-md">{edu.institution}</h4>
              <p className="text-sm text-gray-600">
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
              {index < resumeData.educations.length - 1 && (
                <div className="my-4 border-3 border-b" />
              )}
            </div>
          ))}
        </section>

        <div className="my-8 border-b border-3" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2
              className="text-2xl font-serif mb-4"
              style={{ color: selectedTheme?.primaryColor }}
            >
              {t.skills}
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills?.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {skill.name} - ({t[skill.level] || skill.level})
                </Badge>
              ))}
            </div>
          </section>

          {resumeData.languages[0]?.name.trim() !== "" && (
            <section>
              <h2
                className="text-2xl font-serif mb-4"
                style={{ color: selectedTheme?.primaryColor }}
              >
                {t.languages}
              </h2>
              <ul className="list-none">
                {resumeData.languages?.map((lang, index) => (
                  <li key={index} className="text-gray-700">
                    {lang.name} - ({lang.proficiency})
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(FormalResumeTemplate);
