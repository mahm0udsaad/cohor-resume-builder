"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Spinner from "../skeleton/spinner";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import React, { useRef } from "react";
import { getResumeTemplateView } from "@/helper/get-pdf-view";

export const DownloadBtn = ({ templateName, data, userName }) => {
  const ResumeTemplate = getResumeTemplateView(templateName);

  if (!ResumeTemplate) {
    return <div>Template not found</div>;
  }

  const pdfRef = useRef(null);

  return (
    <div className="w-full">
      <PDFDownloadLink
        document={<ResumeTemplate ref={pdfRef} resumeData={data} />}
        fileName={`${userName}-resume.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <Spinner />
          ) : (
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};
