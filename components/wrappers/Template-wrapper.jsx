"use client";
import { ResumeBuilder } from "@/components/resume-builder";
import { templateComponents } from "@/helper/get-resume-engin";

export default function ClientTemplateWrapper({ template, lng }) {
  const TemplateComponent = templateComponents[template];

  if (!TemplateComponent) {
    return <div>Template not found</div>;
  }

  return (
    <ResumeBuilder
      lng={lng}
      resumeName={template}
      ResumeComponent={TemplateComponent}
    />
  );
}
