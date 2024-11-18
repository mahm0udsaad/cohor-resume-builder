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
    <div className="w-full ">
      <PDFDownloadLink
        document={<ResumeTemplate ref={pdfRef} resumeData={data} />}
        fileName={`${userName}-resume.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <Button
              variant="outline"
              disabled={loading || error}
              className={`border shadow-lg hover:shadow-none flex h-fit items-center rounded-md px-2 hover:bg-[#3B51A3] hover:text-white`}
            >
              <Spinner />
              <span className="ml-2">Proccesing...</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              className={`border shadow-lg hover:shadow-none flex h-fit items-center rounded-md px-2 hover:bg-[#3B51A3] hover:text-white`}
            >
              <Download className="h-4 w-4" />
              <span className="ml-2">Download PDF</span>
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};
