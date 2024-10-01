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
import { Button } from "@/components/ui/button";
import { PlusCircle, Download, Trash2 } from "lucide-react";
import { getUserResumes } from "@/actions/resumes";
import { getCurrentUser } from "@/actions/userInfo/action";
import ClientResumeTemplate from "./render-template";

const ResumeList = async () => {
  const user = await getCurrentUser();
  const resumes = await getUserResumes(user.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {resumes &&
        resumes.map(({ name }) => (
          <Link href={`/builder/${name}`} key={name} className="block">
            <Card className=" bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-[#3b51a3]">Resume {name}</CardTitle>
                <CardDescription>
                  Last updated: {new Date().toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center  overflow-hidden">
                  <ClientResumeTemplate templateName={name} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      <Card className="bg-white shadow-md flex items-center justify-center">
        <Button
          variant="ghost"
          className="h-[200px] w-full flex flex-col items-center gap-2"
        >
          <PlusCircle size={48} className="text-[#3b51a3]" />
          <span className="text-[#3b51a3] font-semibold">
            Create New Resume
          </span>
        </Button>
      </Card>
    </div>
  );
};

export default ResumeList;
