"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Spinner from "../skeleton/spinner";
import { Button } from "../ui/button";
import { Download, RefreshCw, AlertTriangle } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getResumeTemplateView } from "@/helper/get-pdf-view";
import { useTranslation } from "@/app/i18n/client";

const DownloadBtn = ({ lng, templateName, data, userName }) => {
  const { t } = useTranslation(lng, "forms");
  const router = useRouter();
  const [hasError, setHasError] = useState(false);

  // Use useMemo to memoize the template creation
  const ResumeTemplate = useMemo(() => {
    return getResumeTemplateView(templateName);
  }, [templateName]);

  // Handle retry by refreshing the page
  const handleRetry = () => {
    setHasError(false);
    router.refresh();
  };

  // If no template is found
  if (!ResumeTemplate) {
    return (
      <Button variant="destructive" className="w-full">
        <AlertTriangle className="mr-2 h-4 w-4" />
        Template Not Found
      </Button>
    );
  }

  return (
    <div className="w-full">
      <PDFDownloadLink
        document={<ResumeTemplate resumeData={data} />}
        fileName={`${userName}-resume.pdf`}
        onError={() => setHasError(true)}
      >
        {({ blob, url, loading, error }) => {
          // Error state
          if (hasError || error) {
            return (
              <div className="flex items-center space-x-2 w-full">
                <Button
                  variant="destructive"
                  className="flex-grow flex items-center"
                  onClick={handleRetry}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  {t("Error Loading PDF")}
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            );
          }

          // Loading state
          if (loading) {
            return (
              <Button
                variant="outline"
                disabled
                className={`border shadow-lg hover:shadow-none flex h-fit items-center rounded-md px-2 hover:bg-[#3B51A3] hover:text-white`}
              >
                <Spinner />
              </Button>
            );
          }

          // Success state
          return (
            <Button
              variant="outline"
              className={`border shadow-lg hover:shadow-none flex h-fit items-center rounded-md px-2 hover:bg-[#3B51A3] hover:text-white`}
            >
              <Download className="h-4 w-4" />
            </Button>
          );
        }}
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadBtn;
