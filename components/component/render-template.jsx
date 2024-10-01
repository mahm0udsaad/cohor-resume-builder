"use client";

import React from "react";
import dynamic from "next/dynamic";
import { getResumeTemplate } from "@/helper/get-resume-engin";
import { dummyData } from "@/data/data";

const ClientResumeTemplate = ({ templateName }) => {
  const ResumeTemplate = React.useMemo(() => {
    const Template = getResumeTemplate(templateName);
    return dynamic(() => Promise.resolve(Template), { ssr: false });
  }, [templateName]);

  return (
    <ResumeTemplate
      resumeData={dummyData}
      className="max-h-[300px] overflow-hidden"
    />
  );
};

export default ClientResumeTemplate;
