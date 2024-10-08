"use client";

import React, { useRef } from "react";
import { getResumeTemplateView } from "@/helper/get-pdf-view";
import { PDFDownloadLink } from "@react-pdf/renderer";

export const DownloadBtn = ({ templateName, data }) => {
  const ResumeTemplate = getResumeTemplateView(templateName);

  if (!ResumeTemplate) {
    return <div>Template not found</div>;
  }

  const pdfRef = useRef(null);

  return (
    <div className="w-full h-screen">
      <PDFDownloadLink
        document={<ResumeTemplate ref={pdfRef} resumeData={data} />}
        fileName="resume.pdf"
      >
        {({ blob, url, loading, error }) => (
          <button
            ref={pdfRef}
            className="bg-main sticky top-12 text-white"
            disabled={loading || error}
          >
            Download PDF
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};
