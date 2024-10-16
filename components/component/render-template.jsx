"use client";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
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

const ResumeCard = ({ resume, user, isNewCard = false, list, lng }) => {
  const { t } = useTranslation(lng, "common");
  const ResumeTemplate = React.useMemo(() => {
    if (isNewCard) return null;
    const Template = getResumeTemplate(resume.name.toLowerCase());
    return dynamic(() => Promise.resolve(Template), {
      ssr: false,
      loading: () => <Skeleton className="w-full h-[300px]" />,
    });
  }, [isNewCard, resume?.name]);

  const resumeData = {
    personalInfo: resume.personalInfo || {},
    experiences: resume.experiences || [],
    educations: resume.educations || [],
    skills: resume.skills || [],
    languages: resume.languages || [],
    courses: resume.courses || [],
    theme: resume.theme || null,
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
            {ResumeTemplate && (
              <ResumeTemplate
                resumeData={resumeData}
                selectedTheme={resumeData.theme || null}
                className={
                  list
                    ? "max-h-[300px] overflow-hidden"
                    : "h-full w-4/5 mx-auto"
                }
              />
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
