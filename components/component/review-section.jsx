import { Suspense, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Languages,
  LanguagesIcon,
  LayoutTemplate,
  LucideLanguages,
  SquareX,
} from "lucide-react";
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
  toggleLanguage,
  resumeData,
  selectedTheme,
  setSelectedTheme,
  showTemplates,
  setShowTemplates,
}) {
  // Memoize the ResumeComponent to prevent unnecessary re-renders
  const ResumeComponent = useMemo(
    () => templateComponents[template],
    [template],
  );

  // Memoize the handlers to prevent unnecessary re-renders
  const handleTemplateToggle = useCallback(() => {
    setShowTemplates((prev) => !prev);
  }, [setShowTemplates]);

  // Memoize the content to prevent unnecessary re-renders
  const content = useMemo(() => {
    if (showTemplates) {
      return <DynamicTemplatesGallery />;
    }
    return (
      <Suspense fallback={<ResumePreviewSkeleton />}>
        <div className="resume-preview-container flex-1">
          <ResumeComponent
            resumeData={resumeData}
            selectedTheme={selectedTheme}
            className="scale-[0.6] w-11/12 transfrom translate-y-[-20%]"
          />
        </div>
      </Suspense>
    );
  }, [showTemplates, ResumeComponent, resumeData, selectedTheme]);

  return (
    <div className="flex w-full items-start overflow-auto notfs bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg min-h-[90dvh] max-h-screen shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col items-center gap-4">
          <ThemeSelector
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />

          <Button
            type="button"
            onClick={handleTemplateToggle}
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

          <Button
            type="button"
            onClick={toggleLanguage}
            className={`${
              resumeData.lng === "ar"
                ? "bg-[#3B51A3] text-white"
                : "bg-white text-black"
            } border shadow-lg hover:shadow-none flex h-fit items-center rounded-md px-2 hover:bg-gray-200`}
          >
            <LanguagesIcon className="size-5" />
          </Button>
        </div>
      </div>

      {content}
    </div>
  );
}
