import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download, Trash2 } from "lucide-react";
import { deleteResume, getUserResumes } from "@/actions/resumes";
import ClientResumeTemplate from "./render-template";
import { auth } from "@/lib/auth";
import { DeleteConfirmation } from "../btns/delete-dialog";

const ResumeList = async () => {
  const { user } = await auth();
  const resumes = await getUserResumes(user.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {resumes &&
        resumes.map((resume) => {
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
            <Card
              key={resume.id}
              className="block bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-[#3b51a3]">
                  Resume {resume.name}
                </CardTitle>
                <CardDescription>
                  Last updated: {new Date().toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/review/${resume.name}`}>
                  <div className="flex justify-center  overflow-hidden">
                    <ClientResumeTemplate
                      list
                      templateName={resume.name}
                      data={resumeData}
                    />
                  </div>
                </Link>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <DeleteConfirmation email={user.email} resumeId={resume.id} />
              </CardFooter>
            </Card>
          );
        })}
      <Card className="hover:bg-accent hover:text-accent-foreground bg-white shadow-md flex items-center justify-center">
        <Link
          href="/gallery"
          className="justify-center whitespace-nowrap rounded-md text-sm font-medium  px-4 py-2 h-[200px] w-full flex flex-col items-center gap-2"
        >
          <PlusCircle size={48} className="text-[#3b51a3]" />
          <span className="text-[#3b51a3] font-semibold">
            Create New Resume
          </span>
        </Link>
      </Card>
    </div>
  );
};

export default ResumeList;
