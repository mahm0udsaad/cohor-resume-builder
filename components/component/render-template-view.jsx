"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { templateComponents } from "@/helper/get-resume-engin";
import { DownloadBtn } from "../btns/download-pdf";
import Confetti from "react-confetti";

const ResumePreviewSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 bg-gray-200 rounded w-1/3" />
    <div className="h-[800px] bg-gray-200 rounded-lg w-full" />
  </div>
);

export default function ClientResumeTemplate({
  template,
  resumeData,
  selectedTheme,
  lng,
}) {
  // Memoize the ResumeComponent to prevent unnecessary re-renders
  const ResumeComponent = useMemo(
    () => templateComponents[template],
    [template],
  );
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    // Set dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth + 100,
        height: window.innerHeight + 1000,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Trigger confetti
    setIsConfettiActive(true);

    // Stop confetti after 1 second
    const timer = setTimeout(() => {
      setIsConfettiActive(false);
    }, 10000);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Memoize the content to prevent unnecessary re-renders
  const content = useMemo(() => {
    return (
      <Suspense fallback={<ResumePreviewSkeleton />}>
        <div className="resume-preview-container flex-1">
          <ResumeComponent
            resumeData={resumeData}
            selectedTheme={resumeData.theme}
            className="scale-[0.6] transfrom translate-y-[-20%]"
          />
        </div>
      </Suspense>
    );
  }, [ResumeComponent, resumeData, selectedTheme]);

  return (
    <div className="flex w-full items-start overflow-auto notfs bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg min-h-[90dvh] max-h-screen shadow-lg">
      <div className="flex justify-between items-start mb-4 sticky top-0">
        <div className="flex flex-col items-center gap-4 ">
          <DownloadBtn
            data={resumeData}
            lng={lng}
            templateName={template}
            userName={resumeData.personalInfo?.name}
          />
        </div>
      </div>
      {isConfettiActive && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      {content}
    </div>
  );
}
