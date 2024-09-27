"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumeBuilder } from "@/components/resume-builder";

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
};

const TemplatePage = ({ params: { template } }) => {
  const TemplateComponent = templateComponents[template];

  if (!TemplateComponent) {
    return <div>Template not found</div>;
  }

  return (
    <div className="bg-gray-25">
      <ResumeBuilder ResumeComponent={TemplateComponent} />
    </div>
  );
};

export default TemplatePage;
