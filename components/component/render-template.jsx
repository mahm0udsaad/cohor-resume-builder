"use client";

import React from "react";
import dynamic from "next/dynamic";
import { getResumeTemplate } from "@/helper/get-resume-engin";

const ClientResumeTemplate = ({ templateName, data, list }) => {
  const ResumeTemplate = React.useMemo(() => {
    const Template = getResumeTemplate(templateName);
    return dynamic(() => Promise.resolve(Template), { ssr: false });
  }, [templateName]);

  return (
    <ResumeTemplate
      resumeData={data}
      className={
        list ? "max-h-[300px] overflow-hidden" : "h-full w-4/5 mx-auto "
      }
    />
  );
};

export default ClientResumeTemplate;
