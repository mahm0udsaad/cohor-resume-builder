"use client";
import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DeleteConfirmation } from "../btns/delete-dialog";
import { Skeleton } from "../ui/skeleton";
import { getResumeTemplate } from "@/helper/get-resume-engin";
import { DownloadBtn } from "../btns/download-pdf";
import { useTranslation } from "@/app/i18n/client";
import { Font } from "@react-pdf/renderer";

const ResumeCard = ({ resume, user, isNewCard = false, list, lng }) => {
  const { t } = useTranslation(lng, "common");
  const [error, setError] = React.useState(false);

  const ResumeTemplate = React.useMemo(() => {
    if (isNewCard) return null;

    try {
      if (resume.lng === "ar") {
        Font.register({
          family: "IBM Plex Sans Arabic",
          src: "/fonts/ar.ttf",
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
    <Card className="block bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardDescription>
          {t("lastUpdated")}: {new Date().toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/review/${resume.name}`}>
          <div className="flex justify-center overflow-hidden">
            {error ? (
              <div className="text-red-500 p-4 text-center">
                {t("templateLoadError")}
              </div>
            ) : ResumeTemplate ? (
              <ResumeTemplate
                resumeData={resumeData}
                selectedTheme={resumeData.theme || null}
                className={
                  list
                    ? "max-h-[300px] overflow-hidden"
                    : "h-full w-4/5 mx-auto"
                }
              />
            ) : (
              <Skeleton className="w-full h-[300px]" />
            )}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between">
        <DownloadBtn
          templateName={resume.name}
          data={resumeData}
          userName={user.name.split(" ")[0]}
        />
        <DeleteConfirmation lng={lng} email={user.email} resumeId={resume.id} />
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;
