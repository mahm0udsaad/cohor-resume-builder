"use client";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, SquareX } from "lucide-react";
import { ThemeSelector } from "@/components/theme-selector";
import dynamic from "next/dynamic";
import { templateComponents } from "@/helper/get-resume-engin";

const DynamicTemplatesGallery = dynamic(
  () => import("@/components/templates-gallery"),
  {
    loading: () => <TemplateLoadingSkeleton />,
    ssr: false,
  },
);

const TemplateLoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[800px] bg-gray-200 rounded-lg w-full" />
  </div>
);

const ResumePreviewSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 bg-gray-200 rounded w-1/3" />
    <div className="h-[800px] bg-gray-200 rounded-lg w-full" />
  </div>
);

export function ResumePreview({
  template,
  resumeData,
  selectedTheme,
  setSelectedTheme,
  showTemplates,
  setShowTemplates,
}) {
  const ResumeComponent = templateComponents[template];
  return (
    <div className="overflow-auto notfs bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg min-h-[90dvh] max-h-screen shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-center gap-4">
          <ThemeSelector
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />

          <Button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className={`${
              showTemplates ? "bg-[#3B51A3] text-white" : "bg-white text-black"
            } border shadow-lg hover:shadow-none flex h-fit items-center rounded-md px-2 hover:bg-gray-200`}
          >
            {showTemplates ? (
              <SquareX className="size-5" />
            ) : (
              <LayoutTemplate className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {showTemplates ? (
        <DynamicTemplatesGallery />
      ) : (
        <Suspense fallback={<ResumePreviewSkeleton />}>
          <div className="resume-preview-container">
            <ResumeComponent
              resumeData={resumeData}
              selectedTheme={selectedTheme}
              className="scale-[0.6] transform -translate-y-[30%]"
            />
          </div>
        </Suspense>
      )}
    </div>
  );
}
