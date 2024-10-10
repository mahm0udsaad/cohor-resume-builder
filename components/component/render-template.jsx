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
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { DeleteConfirmation } from "../btns/delete-dialog";
import { Skeleton } from "../ui/skeleton";
import { getResumeTemplate } from "@/helper/get-resume-engin";
import { DownloadBtn } from "../btns/download-pdf";

const ResumeCard = ({ resume, user, isNewCard = false, list }) => {
  const ResumeTemplate = React.useMemo(() => {
    if (isNewCard) return null;

    const Template = getResumeTemplate(resume.name);
    return dynamic(() => Promise.resolve(Template), {
      ssr: false,
      loading: () => <Skeleton className="w-full h-[300px]" />,
    });
  }, [isNewCard, resume?.name]);

  if (isNewCard) {
    return (
      <Card className="hover:bg-accent hover:text-accent-foreground bg-white shadow-md flex items-center justify-center">
        <Link
          href="/gallery"
          className="justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2 h-[200px] w-full flex flex-col items-center gap-2"
        >
          <PlusCircle size={48} className="text-[#3b51a3]" />
          <span className="text-[#3b51a3] font-semibold">
            Create New Resume
          </span>
        </Link>
      </Card>
    );
  }

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
        <CardTitle className="text-[#3b51a3]">Resume {resume.name}</CardTitle>
        <CardDescription>
          Last updated: {new Date().toLocaleDateString()}
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
        <DeleteConfirmation email={user.email} resumeId={resume.id} />
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;
