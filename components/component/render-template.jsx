"use client";

import React from "react";
import dynamic from "next/dynamic";
import { getResumeTemplate } from "@/helper/get-resume-engin";
import { Skeleton } from "../ui/skeleton";

const ClientResumeTemplate = ({ templateName, data, list }) => {
  const ResumeTemplate = React.useMemo(() => {
    const Template = getResumeTemplate(templateName);
    return dynamic(() => Promise.resolve(Template), {
      ssr: false,
      loading: () => <Skeleton className={"w-full h-[300px]"} />,
    });
  }, [templateName]);

  return (
    <ResumeTemplate
      resumeData={data}
      selectedTheme={data?.theme || null}
      className={
        list ? "max-h-[300px] overflow-hidden" : "h-full w-4/5 mx-auto "
      }
    />
  );
};

export default ClientResumeTemplate;
