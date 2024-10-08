"use client";

import { getResumeTemplateView } from "@/helper/get-pdf-view";
import { PDFViewer } from "@react-pdf/renderer";

const ClientResumeTemplate = ({ templateName, data, list }) => {
  const ResumeTemplate = getResumeTemplateView(templateName);

  if (!ResumeTemplate) {
    return <div>Template not found</div>;
  }

  return (
    <div className="w-full h-screen overflow-auto">
      <PDFViewer className=" top-20 sticky " width="100%" height="100%">
        <ResumeTemplate resumeData={data} />
      </PDFViewer>
    </div>
  );
};

export default ClientResumeTemplate;
