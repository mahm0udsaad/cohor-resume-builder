"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { templateComponents } from "@/helper/get-resume-engin";
import Confetti from "react-confetti";
import dynamic from "next/dynamic";

const DownloadBtn = dynamic(() => import("../btns/download-pdf"), {
  ssr: false,
});
// const DownloadWithWatermarkBtn = dynamic(
//   () =>
//     import("../btns/download-pdf-watermark").then(
//       (mod) => mod.DownloadWithWatermarkBtn,
//     ),
//   { ssr: false },
// );

const ResumePreviewSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 bg-gray-200 rounded w-1/3" />
    <div className="h-[800px] bg-gray-200 rounded-lg w-full" />
  </div>
);

export default function ClientResumeTemplate({
  template,
  resumeData,
  plan,
  lng,
}) {
  const ResumeComponent = templateComponents[template];
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth + 10,
        height: window.innerHeight + 100,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    setIsConfettiActive(true);
    const timer = setTimeout(() => {
      setIsConfettiActive(false);
    }, 10000);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const content = (
    <Suspense fallback={<ResumePreviewSkeleton />}>
      <div className="sm:w-[40rem] mx-auto relative">
        <ResumeComponent
          resumeData={resumeData}
          selectedTheme={resumeData.theme}
          className="sm:scale-[0.6] transform sm:translate-y-[-20%]"
        />
      </div>
    </Suspense>
  );

  return (
    <div className="sm:flex w-full items-start overflow-auto notfs bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg min-h-[80dvh] max-h-screen shadow-lg">
      <div className="flex justify-between items-start mb-4 sticky top-0">
        <div className="flex flex-col items-center gap-4 ">
          {/* {plan === "free" ? (
            <DownloadWithWatermarkBtn
              resumeData={resumeData}
              templateName={template}
            />
          ) : ( */}
          <DownloadBtn
            data={resumeData}
            lng={lng}
            templateName={template}
            userName={resumeData.personalInfo?.name}
          />
          {/* )} */}
        </div>
      </div>
      {isConfettiActive && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={1000}
        />
      )}
      {content}
    </div>
  );
}
