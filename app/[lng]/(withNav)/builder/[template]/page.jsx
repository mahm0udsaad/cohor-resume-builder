"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumeBuilder } from "@/components/resume-builder";
import { useEffect } from "react";
import { addResumeToUser } from "@/actions/resumes";
import { useAuth } from "@/context/auth";

// Create a mapping of template names to their respective components
const templateComponents = {
  classic: dynamic(() => import("@/components/templates/classic"), {
    loading: () => <Skeleton className="w-full h-full" />,
    ssr: false,
  }),
  modern: dynamic(() => import("@/components/templates/modern"), {
    loading: () => <Skeleton className="w-full h-full" />,
    ssr: false,
  }),
  bold: dynamic(() => import("@/components/templates/bold"), {
    loading: () => <Skeleton className="w-full h-full" />,
    ssr: false,
  }),
};

const TemplatePage = ({ params: { template, lng } }) => {
  const TemplateComponent = templateComponents[template];
  const { user } = useAuth();

  if (!TemplateComponent) {
    return <div>Template not found</div>;
  }

  useEffect(() => {
    if (user) {
      addResumeToUser(user.email, template)
        .then((response) => {
          if (!response.success) {
            console.error("Error adding resume:", response.error);
          } else {
            console.log("Resume added successfully:", response.resume);
          }
        })
        .catch((error) => console.error("Error adding resume:", error));
    }
  }, [user, template]);

  return (
    <div className="bg-gray-25">
      <ResumeBuilder
        lng={lng}
        resumeName={template}
        ResumeComponent={TemplateComponent}
      />
    </div>
  );
};

export default TemplatePage;
