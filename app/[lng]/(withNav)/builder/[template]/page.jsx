"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumeBuilder } from "@/components/resume-builder";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const { user } = session || {};
  if (!user) return;
  const TemplateComponent = templateComponents[template];
  if (!TemplateComponent) {
    return <div>Template not found</div>;
  }

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
