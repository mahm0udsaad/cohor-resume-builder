"use client";
import React from "react";
import { getResumeTemplate } from "@/helper/get-resume-engin";
import { useTranslation } from "@/app/i18n/client";
import { Font } from "@react-pdf/renderer";
import ResumePreviewCard from "./../cards/resume-prev";

const ResumeCard = ({ resume, user, isNewCard = false, list, lng }) => {
  const { t } = useTranslation(lng, "common");
  const [error, setError] = React.useState(false);

  const ResumeTemplate = React.useMemo(() => {
    if (isNewCard) return null;

    try {
      if (resume.lng === "ar") {
        Font.register({
          family: "IBM Plex Sans Arabic",
          src: "/fonts/Rubik-Regular.ttf",
          fonts: [{ src: "/fonts/ar-bold.ttf", fontWeight: "bold" }],
        });
      }

      const templateName = resume.name.toLowerCase();
      const Template = getResumeTemplate(templateName);

      if (!Template) {
        console.error(`Template not found for name: ${templateName}`);
        setError(true);
        return null;
      }

      return Template;
    } catch (err) {
      console.error("Error in template initialization:", err);
      setError(true);
      return null;
    }
  }, [isNewCard, resume?.name]);

  const resumeData = {
    personalInfo: resume.personalInfo || {},
    experiences: resume.experiences || [],
    educations: resume.educations || [],
    skills: resume.skills || [],
    languages: resume.languages || [],
    courses: resume.courses || [],
    theme: resume.theme || null,
    lng: lng,
  };

  return (
    <dev className=" block bg-white shadow-md hover:shadow-lg transition-shadow">
      <ResumePreviewCard
        lng={lng}
        user={user}
        resume={resume}
        content={
          <ResumeTemplate
            resumeData={resumeData}
            selectedTheme={resumeData.theme || null}
            className={
              list ? "max-h-[300px] overflow-hidden" : "h-full w-4/5 mx-auto"
            }
          />
        }
      />
    </dev>
  );
};

export default ResumeCard;
