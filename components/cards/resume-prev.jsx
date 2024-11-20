import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteConfirmation } from "../btns/delete-dialog";

export default function ResumePreviewCard({ lng, resume, user, content }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {resume.name.toUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-72 overflow-hidden text-sm">
          <div className="absolute inset-0 overflow-hidden">{content}</div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/edit/${resume.name}`}>
          <Button variant="outline" className="mx-2">
            <Edit className="size-6" />
          </Button>
        </Link>
        <DeleteConfirmation lng={lng} email={user.email} resumeId={resume.id} />
      </CardFooter>
    </Card>
  );
}
