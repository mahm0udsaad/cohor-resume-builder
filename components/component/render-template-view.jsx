"use client";

import React, { Suspense } from "react";
import { getResumeTemplateView } from "@/helper/get-pdf-view";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
  },
);

const ClientResumeTemplate = ({ templateName, data, list }) => {
  const ResumeTemplate = getResumeTemplateView(templateName);

  if (!ResumeTemplate) {
    return <div>Template not found</div>;
  }

  return (
    <div className="w-full h-screen">
      <PDFViewer width="100%" height="100%">
        <ResumeTemplate resumeData={data} />
      </PDFViewer>
    </div>
  );
};

export default ClientResumeTemplate;
